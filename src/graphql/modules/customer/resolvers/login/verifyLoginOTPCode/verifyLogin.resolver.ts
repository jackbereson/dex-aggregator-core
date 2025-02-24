import { ROLES } from '../../../../../../constants/role.const';
import { Context } from '../../../../../../core/context';
import { CustomerHelper } from '../../../customer.helper';
import { CustomerModel } from '../../../customer.model';

import { ErrorHelper } from '@/helpers';

const Mutation = {
    verifyLoginOTPCode: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.CUSTOMER]);
        const { code } = args;
        // code here

        const customer = await CustomerModel.findById(context.id);

        if (!customer) {
            throw ErrorHelper.error('Invalid OTP code.');
        }

        await CustomerHelper.validCustomer(customer);

        // check if the loginOTPCodeExpiredAt is expired
        if (!customer.loginOTPCodeExpiredAt || customer.loginOTPCodeExpiredAt < new Date()) {
            throw ErrorHelper.error('OTP code expired.');
        }

        if (customer.loginOTPCode !== code) {
            throw ErrorHelper.error('Invalid OTP code.');
        }
        // unset loginOTPCode and loginOTPCodeExpiredAt
        await CustomerModel.findByIdAndUpdate(customer._id, {
            $unset: {
                loginOTPCode: '',
                loginOTPCodeExpiredAt: '',
            },
        });

        return {
            customer,
            token: new CustomerHelper(customer).getToken(),
        };
    },
};

export default { Mutation };
