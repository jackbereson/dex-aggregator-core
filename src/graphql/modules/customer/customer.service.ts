import { CustomerModel, ICustomer } from './customer.model';

import { CrudService } from '../../../base/crudService';
import { SettingHelper } from '../setting/setting.helper';

import { SettingKey } from '@/configs/settingData';
import { mailHelper } from '@/helpers/mail.helper';
import { configs } from '@/configs';

class CustomerService extends CrudService<typeof CustomerModel> {
    constructor() {
        super(CustomerModel);
    }
    notResponsed = `<p>Register by Email The verification link is valid for 10 minutes, please do not disclose it to others!<br/>
This Register by Email mail is Fan Frenzy sent automatically at ${new Date().toLocaleString()}, <br/>
if it is not your own operation, please contact the official customer service immediately.</p>`;

    sendEmailVerification = async (customer: ICustomer) => {
        const domain = await SettingHelper.load(SettingKey.WEBSITE_DOMAIN);

        const verifyLink = `${domain}/verify-email/${customer.verifyToken}`;

        await mailHelper.sendEmail({
            to: customer.email,
            subject: '[Fan Frenzy] Email Verification For Registration',
            text: `Go to this link to verify your email address: ${verifyLink}`,
            html: `
    <p style="margin:0">Hello user ${customer.username},</p>
    <p style="margin:24px 0">
      <a href="${verifyLink}">Click here to verify your email address.</a>
    </p>
    ${this.notResponsed}
    `,
        });
    };

    sendEmailLoginOTPCode = async (customer: ICustomer) => {
        await mailHelper.sendEmail({
            to: customer.email,
            subject: '[Fan Frenzy] Email Verification For Login',
            text: `Your verification code is: ${customer.loginOTPCode}`,
            html: `
    <p style="margin:0">Hello user ${customer.username},</p>
    <p style="margin:24px 0">
      Your verification code is: <br/>
      <b>${customer.loginOTPCode}</b>
    </p>
    ${this.notResponsed}
    `,
        });
    };

    sendResetPasswordOTPCode = async (customer: ICustomer) => {
        await mailHelper.sendEmail({
            to: customer.email,
            subject: '[Fan Frenzy] Password Recovery',
            text: `Your Reset password code is: ${customer.resetPasswordOTPCode}`,
            html: `
    <p style="margin:0">Hello user ${customer.username},</p>
    <p style="margin:24px 0">
      Your Reset password code is: <br/>
      <b>${customer.resetPasswordOTPCode}</b>
    </p>
    ${this.notResponsed}
    `,
        });
    };
}

const customerService = new CustomerService();

export { customerService };

// (async () => {
//   await customerService.updateReferal();
// })();
