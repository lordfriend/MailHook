export class Favorite {
    id: string;
    token_id: string;
    // token_id + id
    token_fav_id?: string;
    bangumi_id: string;
    status: number;

    static WISH = 1;
    static WATCHED = 2;
    static WATCHING = 3;
    static PAUSE = 4;
    static ABANDONED = 5;
}