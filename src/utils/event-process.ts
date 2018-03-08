import { EventType, Status } from './constants';
import { lokiDB } from '../persistent/loki-db';
import { Favorite } from '../entity/favorite';
import { Episode } from '../entity/episode';
import { mailSender } from './mail-sender';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { configManager } from './config-manager';
import { calHMAC } from './hash';
import * as util from 'util';


function reviveCall(tokenIdList: string[] = []) {
    const siteHost = configManager.getConfig('siteHost');
    const webHookId = lokiDB.getWebHookId();
    const tokenIdListJson = tokenIdList.join(',');
    console.log('serialized token_id_list ', tokenIdListJson);
    const signature = calHMAC(`web_hook_id=${webHookId}&token_id_list=${tokenIdListJson}`);
    console.log('signature ', signature);
    Axios.post(`${siteHost}/api/web-hook/revive`, {
        web_hook_id: webHookId,
        token_id_list: tokenIdList,
        signature: signature
    })
        .then((response: AxiosResponse<{data: Favorite[]}>) => {
            if (tokenIdList.length > 0) {
                lokiDB.updateFavorite(response.data.data);
            }
        }, (error: AxiosError) => {
            console.error(error.response ? error.response.data : error);
        });
}

function onInitial(webHookId: string) {
    lokiDB.setWebHookId(webHookId);
    reviveCall();
}

function onKeepAlive(status: string) {
    if (parseInt(status) !== Status.STATUS_IS_ALIVE) {
        let tokenIdList = lokiDB.getUserTokenList();
        reviveCall(tokenIdList);
    }
}

function onTokenAdded(favoriteList: Favorite[], email: string, tokenId: string) {
    lokiDB.updateUser(email, tokenId);
    lokiDB.updateFavorite(favoriteList);
}

function onTokenRemoved(tokenId: string) {
    lokiDB.removeUser(tokenId);
}

function onEpisodeDownloaded(episode: Episode) {
    console.log(util.inspect(episode, {depth: null}));
    let favoriteList = lokiDB.getFavoriteListByBangumiId(episode.bangumi.id);
    if (favoriteList.length > 0) {
        favoriteList
            .filter(favorite => favorite.status === Favorite.WATCHING)
            .map(favorite => {
                return lokiDB.getUserEmail(favorite.token_id);
            })
            .forEach(email => {
                if (email) {
                    mailSender.sendMail(email, episode);
                }
            });
    }
}

function onUserFavoriteChange(favoriteList: Favorite[]) {
    lokiDB.updateFavorite(favoriteList);
}

export function eventProcess(eventType: string, event: any) {
    switch(eventType) {
        case EventType.TYPE_INITIAL:
            onInitial(event.web_hook_id);
            break;
        case EventType.TYPE_KEEP_ALIVE:
            console.log(event);
            onKeepAlive(event.status);
            break;
        case EventType.TYPE_TOKEN_ADDED:
            onTokenAdded(event.favorites, event.email, event.token_id);
            break;
        case EventType.TYPE_TOKEN_REMOVED:
            onTokenRemoved(event.token_id);
            break;
        case EventType.TYPE_EPISODE_DOWNLOADED:
            onEpisodeDownloaded(event.episode);
            break;
        case EventType.TYPE_USER_FAVORITE:
            onUserFavoriteChange(event.favorites);
            break;
    }
}
