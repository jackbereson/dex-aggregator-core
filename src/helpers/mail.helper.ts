/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { configs } from '../configs';

class EmailService {
    transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
    constructor({
        host, // SMTP server
        port, // SMTP port (SSL)
        user, // Địa chỉ email của bạn
        pass, // Mật khẩu email của bạn
    }: {
        host: string;
        port: number;
        user: string;
        pass: string;
    }) {
        // Cấu hình transporter với SMTP thông thường
        const transporterParams = {
            host, // SMTP server
            port, // SMTP port (SSL)
            secure: true, // true for 465, false for other ports
            auth: {
                user, // Địa chỉ email của bạn
                pass, // Mật khẩu email của bạn
            },
        };
        // console.log('transporterParams:', transporterParams);

        this.transporter = nodemailer.createTransport(transporterParams);
    }

    // Hàm để gửi email
    async sendEmail({
        to,
        subject,
        text,
        html,
    }: {
        to: string;
        subject: string;
        text: string;
        html: string;
    }) {
        const mailOptions = {
            from: configs.smtp.auth.user, // Địa chỉ email người gửi
            to: to, // Địa chỉ email người nhận
            subject: subject, // Tiêu đề email
            text: text, // Nội dung văn bản của email
            html: html, // Nội dung HTML của email
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log('Mailing error:', error);
        }
    }
}

// console.log(2222, configs.wepAppUrl)

export const mailHelper = new EmailService({
    host: configs.smtp.host,
    port: parseInt(configs.smtp.port),
    user: configs.smtp.auth.user,
    pass: configs.smtp.auth.pass,
});
