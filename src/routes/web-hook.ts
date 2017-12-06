import { Request, Response, Router } from 'express';
import { verifyEventSignature } from '../utils/hash';
import { EventType } from '../utils/constants';
import { eventProcess } from '../utils/event-process';
import { lokiDB } from '../persistent/loki-db';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    const eventType = req.get('X-Web-Hook-Event-Type');
    const eventTime = req.get('X-Web-Hook-Event-Time');
    const signature = req.get('X-Web-Hook-Signature');
    let webHookId;
    if (!eventType || !eventTime || !signature) {
        throw Error('Invalid header');
    }
    console.log(eventType, eventType, signature);
    if (eventType === EventType.TYPE_INITIAL) {
        webHookId = req.body.web_hook_id
    } else {
        webHookId = lokiDB.getWebHookId();
    }

    if (!webHookId) {
        throw new Error('cannot retrieve web hook id');
    }

    if (verifyEventSignature(eventTime, webHookId, signature)) {
        eventProcess(eventType, req.body);
        res.send(webHookId);
    } else {
        res.status(404);
        res.send('NOT FOUND');
    }
});

export default router;