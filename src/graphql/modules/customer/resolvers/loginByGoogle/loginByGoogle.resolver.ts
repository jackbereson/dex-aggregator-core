import { onActivity } from '../../../../../events/onActivity.event';
import { ROLES } from '../../../../../constants/role.const';
import { Context } from '../../../../../core/context';
import { ErrorHelper } from '../../../../../helpers';
import { ActivityTypes, ChangedFactors } from '../../../activity/activity.model';
import { CustomerHelper } from '../../customer.helper';
import {
    Customer,
    CustomerLoginMethods,
    CustomerModel,
    CustomerStatuses,
} from '../../customer.model';

import { customerWalletService } from '@/graphql/modules/customerWallet/customerWallet.service';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginByGoogle: async (root: any, args: any, context: Context) => {
        const { idToken } = args;

        const email = await CustomerHelper.getEmailByOAUTH2(idToken);

        let customer = await CustomerModel.findOne({
            email,
        });

        if (customer) {
            if (customer.status === CustomerStatuses.INACTIVE) {
                throw ErrorHelper.permissionDeny();
            }

            if (customer.customerLoginMethod !== CustomerLoginMethods.GOOGLE) {
                throw ErrorHelper.error('User not using google register');
            }

            onActivity.next({
                customerId: customer.id,
                factorId: customer.id,
                type: ActivityTypes.CUSTOMER_SIGNING,
                changedFactor: ChangedFactors.CUSTOMER,
            });
        } else {
            const data: Customer = {
                email,
                activeAt: new Date(),
                role: ROLES.CUSTOMER,
                customerLoginMethod: CustomerLoginMethods.GOOGLE,
                referralCode: await CustomerHelper.generateReferralCode(),
            };

            customer = await CustomerModel.create(data);

            await customerWalletService.initBasicWallets(customer.id);

            onActivity.next({
                customerId: customer.id,
                factorId: customer.id,
                type: ActivityTypes.CUSTOMER_REGISTER,
                changedFactor: ChangedFactors.CUSTOMER,
            });
        }

        return {
            customer,
            token: new CustomerHelper(customer).getToken(),
        };
    },
};

export default { Mutation };
