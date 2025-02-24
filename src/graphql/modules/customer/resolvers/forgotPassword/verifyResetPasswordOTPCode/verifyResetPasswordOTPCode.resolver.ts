import { CustomerModel } from '../../../customer.model';
import { CustomerHelper } from '../../../customer.helper';

import { Context } from '@/core/context';
import { ErrorHelper } from '@/helpers';
import { ROLES } from '@/constants/role.const';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verifyResetPasswordOTPCode: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.CUSTOMER]);
        const { code } = args;

        const customer = await CustomerModel.findById(context.id);

        if (!customer) {
            throw ErrorHelper.error('Invalid OTP code.');
        }

        await CustomerHelper.validCustomer(customer);

        // check if the resetPasswordOTPCodeExpiredAt is expired
        if (
            !customer.resetPasswordOTPCodeExpiredAt ||
            customer.resetPasswordOTPCodeExpiredAt < new Date()
        ) {
            throw ErrorHelper.error('OTP code expired.');
        }

        if (customer.resetPasswordOTPCode !== code) {
            throw ErrorHelper.error('Invalid OTP code.');
        }

        return {
            resetToken: new CustomerHelper(customer).getOTPToken(),
        };
    },
};

export default { Mutation };
