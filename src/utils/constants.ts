export class EventType {
    static TYPE_EPISODE_DOWNLOADED = 'EPISODE_DOWNLOADED';
    static TYPE_USER_FAVORITE = 'USER_FAVORITE_CHANGED';
    static TYPE_KEEP_ALIVE = 'KEEP_ALIVE';
    static TYPE_INITIAL = 'INITIAL';
    static TYPE_TOKEN_ADDED = 'TOKEN_ADDED';
}

export class Status {
    static STATUS_IS_ALIVE = 1;
    static STATUS_HAS_ERROR = 2;
    static STATUS_IS_DEAD = 3;
    static STATUS_INITIAL = 4;
}