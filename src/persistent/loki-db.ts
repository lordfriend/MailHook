import * as Loki from 'lokijs';
import * as LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import { Favorite } from '../entity/favorite';
import * as shortid from 'shortid';

export class COLLECTION_NAME {
    static FAVORITE_COLLECTION = 'favorite';
    static USER_COLLECTION = 'user';
    static META_COLLECTION = 'meta';
}

export class META_TYPE {
    static WEB_HOOK_ID = 'web_hook_id';
}

export class LokiDB {
    private loki: Loki;

    constructor() {
        const adapter = new LokiFsStructuredAdapter();
        this.loki = new Loki('database/MailHook.db', {
            adapter: adapter,
            autoload: true,
            autoloadCallback: () => {console.log('db loaded')},
            autosave: true,
            autosaveInterval: 4000
        });
    }

    createIfNotExists(): void {
        let favoriteCollection = this.loki.getCollection(COLLECTION_NAME.FAVORITE_COLLECTION);
        if (!favoriteCollection) {
            this.loki.addCollection(COLLECTION_NAME.FAVORITE_COLLECTION, {
                unique: ['token_fav_id']
            });
        }

        let userCollection = this.loki.getCollection(COLLECTION_NAME.USER_COLLECTION);
        if (!userCollection) {
            this.loki.addCollection(COLLECTION_NAME.USER_COLLECTION, {
                unique: ['token_id']
            });
        }

        let metaCollection = this.loki.getCollection(COLLECTION_NAME.META_COLLECTION);
        if (!metaCollection) {
            metaCollection = this.loki.addCollection(COLLECTION_NAME.META_COLLECTION, {
                unique: ['type']
            });
            metaCollection.insert({type: META_TYPE.WEB_HOOK_ID, webHookId: ''});
        }
    }

    getWebHookId(): string | null {
        let metaCollection = this.loki.getCollection(COLLECTION_NAME.META_COLLECTION);
        let result = metaCollection.findOne({type: META_TYPE.WEB_HOOK_ID}) as any;
        if (result && result.webHookId) {
            return result.webHookId as string;
        } else {
            return null;
        }
    }

    setWebHookId(webHookId: string): void {
        let metaCollection = this.loki.getCollection(COLLECTION_NAME.META_COLLECTION);
        let result = metaCollection.findOne({type: META_TYPE.WEB_HOOK_ID}) as any;
        result.webHookId = webHookId;
        metaCollection.update(result);
    }

    getFavoriteListByBangumiId(bangumiId: string): Favorite[] {
        const favoriteCollection = this.loki.getCollection<Favorite>(COLLECTION_NAME.FAVORITE_COLLECTION);
        return favoriteCollection.find({bangumi_id: bangumiId});
    }

    updateFavorite(favorite_list: Favorite[]): void {
        favorite_list = favorite_list.map(favorite => {
            favorite.token_fav_id = favorite.token_id + favorite.id;
            return favorite
        });
        let tokenIdMap: {[tokenId: string]: Favorite[]} = {};
        let tokenIdDBMap: {[tokenId: string]: Favorite[]} = {};
        let favoriteCollection = this.loki.getCollection<Favorite>(COLLECTION_NAME.FAVORITE_COLLECTION);
        favorite_list.forEach(favorite => {
            let tokenId =  favorite.token_id;
            if (!tokenIdMap[tokenId]) {
                tokenIdMap[tokenId] = [];
                console.log(favoriteCollection.find({token_id: tokenId}));
                tokenIdDBMap[tokenId] = favoriteCollection.find({token_id: tokenId});
            }
            tokenIdMap[favorite.token_id].push(favorite);
        });
        Object.keys(tokenIdMap).forEach(tokenId => {
            let favoriteListOfDB = tokenIdDBMap[tokenId];
            let favoriteList = tokenIdMap[tokenId];
            favoriteList.forEach(favorite => {
                let favoriteOfDB = favoriteListOfDB.find((f) => f.id === favorite.id);
                if (favoriteOfDB) {
                    if (favoriteOfDB.status !== favorite.status) {
                        favoriteOfDB.status = favorite.status;
                        favoriteCollection.update(favoriteOfDB);
                    }
                } else {
                    favoriteCollection.insert(favorite);
                }
            });
        });
    }

    generateToken(): string {
        let tokenId = shortid.generate();
        const userCollection = this.loki.getCollection(COLLECTION_NAME.USER_COLLECTION);
        userCollection.insert({
            token_id: tokenId
        });
        return tokenId;
    }

    updateUser(email: string, tokenId: string): void {
        const userCollection = this.loki.getCollection(COLLECTION_NAME.USER_COLLECTION);
        try {
            // remove same email users.
            userCollection.findAndRemove({email: email});

            let user = userCollection.findOne({token_id: tokenId}) as any;
            user.email = email;
            userCollection.update(user);
        } catch (error) {
            console.error(error);
        }
    }

    getUserEmail(tokenId: string): string | null {
        const userCollection = this.loki.getCollection(COLLECTION_NAME.USER_COLLECTION);
        try {
            let user = userCollection.findOne({token_id: tokenId}) as any;
            return user.email;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getUserTokenList(): string[] {
        const userCollection = this.loki.getCollection(COLLECTION_NAME.USER_COLLECTION);
        try {
            let userList = userCollection.find().filter((user:any) => !!user.email);
            return userList.map((user: any) => user.token_id);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export const lokiDB = new LokiDB();

lokiDB.createIfNotExists();