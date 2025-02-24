import { set } from 'lodash';
import md5 from 'md5';

import { CustomerHelper } from '../../../customer.helper';
import {
    Customer,
    CustomerLoginMethods,
    CustomerModel,
    CustomerStatuses,
} from '../../../customer.model';
import { customerService } from '../../../customer.service';

import { customerWalletService } from '@/graphql/modules/customerWallet/customerWallet.service';
import { onActivity } from '@/events/onActivity.event';
import { ActivityTypes, ChangedFactors } from '@/graphql/modules/activity/activity.model';
import { Context } from '@/core/context';
import { ROLES } from '@/constants/role.const';
import { ErrorHelper, encryptionHelper } from '@/helpers';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerCustomer: async (root: any, args: any, context: Context) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, password, invitationCode } = args.data;
        // console.log('args.data', args.data);

        // check email format
        if (!CustomerHelper.validateEmail(email)) {
            throw ErrorHelper.error('Invalid email format.');
        }

        const customer = await CustomerModel.findOne({
            email,
        });

        if (customer) {
            throw ErrorHelper.error('Email is already exist.');
        }

        if (invitationCode) {
            const inviter = await CustomerModel.findOne({ referralCode: invitationCode });

            if (!inviter) {
                throw ErrorHelper.error('Invalid invitation code.');
            }
        }

        const newPassword = CustomerHelper.combinePassword(password, email);

        const encrypedPassword = encryptionHelper.createPassword(newPassword);

        const username = await CustomerHelper.generateCode();

        const newCustomer: Customer = {
            email,
            username,
            customerLoginMethod: CustomerLoginMethods.EMAIL,
            role: ROLES.CUSTOMER,

            password: encrypedPassword,
            status: CustomerStatuses.VERIFYING,
            verifyToken: md5(email + new Date().getTime()),
            referralCode: await CustomerHelper.generateReferralCode(),
        };

        if (invitationCode) {
            set(newCustomer, 'referrenceId', invitationCode);
        }

        return await CustomerModel.create(newCustomer).then(async (customer) => {
            await customerService.sendEmailVerification(customer);
            await customerWalletService.initBasicWallets(customer._id);

            onActivity.next({
                customerId: customer.id,
                factorId: customer.id,
                type: ActivityTypes.CUSTOMER_REGISTER,
                changedFactor: ChangedFactors.CUSTOMER,
            });

            return customer;
        });
    },
};

export default { Mutation };
