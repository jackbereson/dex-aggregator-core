import { CustomerModel } from '../../../customer.model';
import { CustomerHelper } from '../../../customer.helper';

import { Context } from '@/core/context';
import { encryptionHelper, ErrorHelper } from '@/helpers';
import { ROLES } from '@/constants/role.const';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetPassword: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.CUSTOMER]);

        const { pass, code } = args;

        console.log('context.id', context.id);
        const customer = await CustomerModel.findById(context.id);

        if (!customer) {
            throw ErrorHelper.error('Invalid OTP code.');
        }

        await CustomerHelper.validCustomer(customer);

        if (customer.resetPasswordOTPCode !== code) {
            throw ErrorHelper.error('Invalid OTP code.');
        }

        const newPassword = CustomerHelper.combinePassword(pass, customer.email);

        const password = encryptionHelper.createPassword(newPassword);
        // console.log(2222, password)

        await CustomerModel.findByIdAndUpdate(customer.id, {
            $set: { password },
            $unset: { resetPasswordOTPCodeExpiredAt: '', resetPasswordOTPCode: '' },
        });

        return {
            success: true,
        };
    },
};

export default { Mutation };
