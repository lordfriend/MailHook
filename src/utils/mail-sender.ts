import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as Mail from 'nodemailer/lib/mailer';
import { Episode } from '../entity/episode';
import * as ejs from 'ejs';
import { configManager } from './config-manager';

export class MailSender {

    SMTPConfig: any;
    transport: Mail;
    senderAddress: string;
    siteName: string;
    siteHost: string;

    emailTemplate: string;

    constructor() {
        // read sender info
        let config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../config/sender.yml'), 'utf8'));
        this.SMTPConfig = Object.assign({}, {
            pool: true
        }, config.options);
        this.transport = nodemailer.createTransport(this.SMTPConfig);
        this.senderAddress = config.address;
        this.siteName = configManager.getConfig('siteName');
        this.siteHost = configManager.getConfig('siteHost');
        this.emailTemplate = fs.readFileSync(path.join(__dirname, '../../templates/email.ejs'), 'utf8');
    }

    sendMail(toAddress: string, episode: Episode) {
        let subject = `${episode.bangumi.name}更新了第${episode.episode_no}话，快去看看吧`;
        let content = `
                        ${episode.bangumi.name} (${episode.bangumi.name_cn}) 更新了第${episode.episode_no}话：${episode.name}
                        快去 ${episode.url} 观看。 
                    `;
        let htmlContent = ejs.render(this.emailTemplate, {
            subject: subject,
            siteName: this.siteName,
            siteHost: this.siteHost,
            episode: episode
        });
        let message = {
            from: this.senderAddress,
            to: toAddress,
            subject: subject,
            text: content,
            html: htmlContent
        };
        this.transport.sendMail(message, (err) => {
            console.error(err);
        })
    }

    verifySMTPConnection() {
        this.transport.verify((error, success) =>{
            if (error) {
                console.error(error);
            } else {
                console.log(success);
                console.log('Server is ready to send mails');
            }
        });
    }
}

export const mailSender = new MailSender();

mailSender.verifySMTPConnection();