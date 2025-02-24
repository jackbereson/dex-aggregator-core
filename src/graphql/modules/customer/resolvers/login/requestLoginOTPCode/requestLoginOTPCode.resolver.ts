import { CustomerHelper } from '../../../customer.helper';
import { customerService } from '../../../customer.service';

import { Context } from '@/core/context';
import { ROLES } from '@/constants/role.const';
import { ErrorHelper } from '@/helpers';

const Mutation = {
    requestLoginOTPCode: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.CUSTOMER]);
        // code here

        const customer = await CustomerHelper.validContextAsCustomer(context.id);

        // check if the loginOTPCodeExpiredAt is expired, if not, throw error
        if (customer.loginOTPCodeExpiredAt && customer.loginOTPCodeExpiredAt > new Date()) {
            throw ErrorHelper.error('Please wait for 1 minute before requesting a new OTP code.');
        }

        customer.loginOTPCode = await CustomerHelper.generateloginOTPCode();
        customer.loginOTPCodeExpiredAt = new Date(Date.now() + 60000); // 1 minute
        await customer.save();
        await customerService.sendEmailLoginOTPCode(customer);

        return {
            success: true,
        };
    },
};

export default { Mutation };
