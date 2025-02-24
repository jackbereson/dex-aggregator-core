/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomerModel, CustomerStatuses } from '../../../customer.model';

import { Context } from '@/core/context';
import { ErrorHelper } from '@/helpers';

const Mutation = {
    verifyToken: async (root: any, args: any, context: Context) => {
        const { code } = args;

        const customer = await CustomerModel.findOne({
            verifyToken: code,
        });

        if (!customer) {
            throw ErrorHelper.error('Verify code not existed');
        }

        await CustomerModel.findByIdAndUpdate(customer.id, {
            $set: {
                activeAt: new Date(),
                status: CustomerStatuses.ACTIVE,
            },
            $unset: {
                verifyToken: '',
            },
        });

        customer.status = CustomerStatuses.ACTIVE;
        await customer.save();

        return {
            success: true,
        };
    },
};

export default { Mutation };
