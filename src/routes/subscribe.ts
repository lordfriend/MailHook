import { Request, Response, Router } from 'express';
import { configManager } from '../utils/config-manager';
import { lokiDB } from '../persistent/loki-db';

const router = Router();

router.get('', (req: Request, res: Response) => {
    const siteName = configManager.getConfig('siteName');

    res.render('index', {siteName: siteName});
});

router.post('/subscribe', (req: Request, res: Response) => {
    const tokenId = lokiDB.generateToken();
    const webHookId = lokiDB.getWebHookId();
    const siteHost = configManager.getConfig('siteHost');
    res.redirect(`${siteHost}/settings/user?web_hook_id=${webHookId}&token_id=${tokenId}`);
});

router.get('/test', (req: Request, res: Response) => {
    let episode = {"status": 2, "episode_no": 7, "update_time": 1511076393445, "watch_progress": {"user_id": "497fc98a-9a96-4d6a-912f-6563629245cd", "last_watch_position": 94.911689, "bangumi_id": "da171239-3803-4eeb-99d3-9f0db4b81230", "watch_status": 3, "episode_id": "49d705ed-32aa-41a9-aaeb-f7cc1bf12269", "percentage": 0.0654524476506833, "last_watch_time": 1512286821000, "id": "c3e5a8f6-d43c-4895-b848-2efd5031a2b6"}, "name": "Talk of the devil, and he is sure to appear.", "video_files": [{"torrent_id": "2bff5a835205fe4c5ab62708e969a05c08fe639c", "status": 3, "url": "https://static.suki.moe/video/da171239-3803-4eeb-99d3-9f0db4b81230/[DMG][Mahou_Tsukai_no_Yome][07][720P][GB].mp4", "bangumi_id": "da171239-3803-4eeb-99d3-9f0db4b81230", "resolution_w": 1280, "download_url": "magnet:?xt=urn:btih:FP7VVA2SAX7EYWVWE4EOS2NALQEP4Y44&dn=&tr=http%3A%2F%2F104.238.198.186%3A8000%2Fannounce&tr=udp%3A%2F%2F104.238.198.186%3A8000%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.prq.to%2Fannounce&tr=http%3A%2F%2Fopen.acgtracker.com%3A1096%2Fannounce&tr=http%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=https%3A%2F%2Ft-115.rhcloud.com%2Fonly_for_ylbud&tr=http%3A%2F%2Fbtfile.sdo.com%3A6961%2Fannounce&tr=http%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=https%3A%2F%2Ftr.bangumi.moe%3A9696%2Fannounce&tr=http%3A%2F%2Ft.acg.rip%3A6699%2Fannounce&tr=http%3A%2F%2Ft.nyaatracker.com%2Fannounce&tr=http%3A%2F%2Ftracker.kisssub.org%3A2015%2Fannounce&tr=http%3A%2F%2Ftracker.kamigami.org%3A2710%2Fannounce&tr=http%3A%2F%2Fmgtracker.org%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=http%3A%2F%2Ftracker2.itzmx.com%3A6961%2Fannounce&tr=http%3A%2F%2Ftracker3.itzmx.com%3A6961%2Fannounce&tr=http%3A%2F%2Ftracker4.itzmx.com%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.ipv6tracker.org%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.ipv6tracker.org%2Fannounce&tr=http%3A%2F%2F121.14.98.151%3A9090%2Fannounce&tr=http%3A%2F%2F94.228.192.98%2Fannounce&tr=http%3A%2F%2Ftracker.btcake.com%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A6868%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A7070%2Fannounce&tr=http%3A%2F%2Fbt.sc-ol.com%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker3.torrentino.com%2Fannounce&tr=http%3A%2F%2Ftracker2.torrentino.com%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Fbigfoot1942.sektori.org%3A6969%2Fannounce", "episode_id": "49d705ed-32aa-41a9-aaeb-f7cc1bf12269", "file_path": "[DMG][Mahou_Tsukai_no_Yome][07][720P][GB].mp4", "resolution_h": 720, "file_name": null, "duration": 1450085, "label": null, "id": "aa64c3b2-41ce-4740-b2c5-06272754ce6c"}], "airdate": "2017-11-18", "bangumi_id": "da171239-3803-4eeb-99d3-9f0db4b81230", "bgm_eps_id": 705748, "thumbnail_color": "#040404", "name_cn": "\u8bf4\u66f9\u64cd \u66f9\u64cd\u5230", "thumbnail": "https://static.suki.moe/pic/da171239-3803-4eeb-99d3-9f0db4b81230/thumbnails/7.png", "delete_mark": null, "create_time": 1507263316510, "thumbnail_image": {"url": "https://static.suki.moe/pic/da171239-3803-4eeb-99d3-9f0db4b81230/thumbnails/7.png", "width": 1280, "dominant_color": "#040404", "height": 720}, "bangumi": {"image": "http://lain.bgm.tv/pic/cover/l/7c/ba/210864_XHHsK.jpg", "eps": 24, "create_time": 1507263316503, "eps_no_offset": null, "id": "da171239-3803-4eeb-99d3-9f0db4b81230", "bgm_id": 210864, "name_cn": "\u9b54\u6cd5\u4f7f\u7684\u65b0\u5a18", "bangumi_moe": null, "type": 2, "status": 1, "update_time": 1507975842828, "air_date": "2017-10-07", "cover_color": "#cd9256", "delete_mark": null, "acg_rip": null, "cover_image": {"url": "https://static.suki.moe/pic/da171239-3803-4eeb-99d3-9f0db4b81230/cover.jpg", "width": 800, "dominant_color": "#cd9256", "height": 1129}, "maintained_by_uid": "61a7f95e-3d70-4844-85a7-2fccbfa3a91b", "rss": null, "eps_regex": null, "name": "\u9b54\u6cd5\u4f7f\u3044\u306e\u5ac1", "alert_timeout": 2, "cover": "https://static.suki.moe/pic/da171239-3803-4eeb-99d3-9f0db4b81230/cover.jpg", "created_by_uid": "e4258a28-c9f7-47b6-9240-51230540eab5", "summary": "\u7fbd\u9e1f\u667a\u4e16\u662f15\u5c81\u7684\u5c11\u5973\u3002\r\n\u4e0d\u8bba\u662f\u80fd\u591f\u56de\u53bb\u7684\u5730\u65b9\uff0c\u8fd8\u662f\u751f\u5b58\u7684\u7406\u7531\uff0c\u4ea6\u6216\u662f\u6d3b\u4e0b\u53bb\u7684\u624b\u6bb5\uff0c\u5979\u90fd\u4e00\u65e0\u6240\u6709\u3002\u9664\u4e86\u4e00\u79cd\u5979\u4e0e\u751f\u4ff1\u6765\u7684\u7279\u522b\u529b\u91cf\u4e4b\u5916\u3002\r\n\u5c06\u8fd9\u6837\u7684\u667a\u4e16\u6536\u4e3a\u5f1f\u5b50\uff0c\u4ee5\u53ca\u8fce\u4f5c\u672a\u6765\u65b0\u5a18\u7684\u662f\uff0c\u5f02\u5f62\u7684\u9b54\u6cd5\u4f7f\u00b7\u827e\u5229\u4e9a\u65af\u3002\r\n\u5728\u878d\u5165\u81ea\u7136\u3001\u751f\u6d3b\u4e86\u60a0\u4e45\u65f6\u65e5\u7684\u9b54\u6cd5\u4f7f\u751f\u6d3b\u5f53\u4e2d\uff0c\u667a\u4e16\u4e00\u70b9\u4e00\u70b9\u5730\u53d6\u56de\u5979\u6240\u91cd\u89c6\u7684\u67d0\u4e9b\u4e1c\u897f\u2026\u2026\r\n\u8fd9\u662f\u4e00\u4e2a\u4e3a\u4e86\u77e5\u6653\u4e16\u95f4\u7f8e\u4e3d\uff0c\u800c\u7f16\u7ec7\u7684\u6545\u4e8b\u3002", "air_weekday": 6, "libyk_so": null, "dmhy": "10\u6708\u65b0\u756a \u9b54\u6cd5\u4f7f\u7684\u65b0\u5a18 \u7b80\u4f53"}, "duration": "24:10", "id": "49d705ed-32aa-41a9-aaeb-f7cc1bf12269"}
    let subject = `${episode.bangumi.name}更新了第${episode.episode_no}话，快去看看吧`;
    // let content = `${episode.bangumi.name} (${episode.bangumi.name_cn}) 更新了第${episode.episode_no}话：${episode.name}
    //                     快去 ${episode.id} 观看。`;
    res.render('email', {
        subject: subject,
        siteName: 'suki.moe',
        siteHost: 'https://suki.moe',
        episode: episode
    });
});


export default router;