import { CustomerModel } from '../../../customer.model';
import { CustomerHelper } from '../../../customer.helper';
import { customerService } from '../../../customer.service';

import { Context } from '@/core/context';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestResetPasswordOTPCode: async (root: any, args: any, context: Context) => {
        const { email } = args;

        const customer = await CustomerModel.findOne({
            email,
        });

        await CustomerHelper.validCustomer(customer);

        customer.resetPasswordOTPCode = await CustomerHelper.generateResetPasswordOTPCode();
        customer.resetPasswordOTPCodeExpiredAt = new Date(Date.now() + 60000); // 1 minute

        await customer.save();

        await customerService.sendResetPasswordOTPCode(customer);

        return {
            token: new CustomerHelper(customer).getOTPToken(),
        };
    },
};

export default {
    Mutation,
};
