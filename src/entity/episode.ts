export interface ImageInfo {
    url: string;
    dominant_color: string;
    width: number;
    height: number;
}

export interface Bangumi {
    id: string;
    bgm_id: number;
    name: string;
    name_cn: string;
    summary: string;
    image: string;
    cover_image: ImageInfo;
    type: number;
    status: number;
    air_date: string;
    air_weekday: number;
    eps: number;
}

export class Episode {
    id: string;
    url: string;
    bgm_eps_id: number;
    name: string;
    name_cn: string;
    status: number;
    episode_no: number;
    airdate: string;
    thumbnail_image: ImageInfo;
    bangumi: Bangumi;
}