import * as crypto from 'crypto';
import { configManager } from './config-manager';

export function verifyEventSignature(eventTime: number | string, webHookId: string, signature: string): boolean {
    let msg = `web_hook_id=${webHookId}&event_time=${eventTime}`;
    return calHMAC(msg) === signature;
}

export function calHMAC(message: string) {
    const sharedSecret = configManager.getConfig('sharedSecret');
    const hash = crypto.createHmac('sha256', sharedSecret);
    hash.update(message);
    return hash.digest('hex');
}