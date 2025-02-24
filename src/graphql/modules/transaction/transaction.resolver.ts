import { set } from 'lodash';

import { transactionService } from './transaction.service';

import { ROLES } from '../../../constants/role.const';
import { Context } from '../../../core/context';
import { CustomerHelper } from '../customer/customer.helper';

const Query = {
    getAllTransaction: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_CUSTOMER);
        if (context.isCustomer()) {
            const customer = await CustomerHelper.validContextAsCustomer(context.id);

            set(args.q, 'filter.customerId', customer.id);
        }

        return transactionService.fetch(args.q);
    },
    getOneTransaction: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_CUSTOMER);
        const { id } = args;
        const params = { _id: id };

        if (context.isCustomer()) {
            const customer = await CustomerHelper.validContextAsCustomer(context.id);

            set(params, 'customerId', customer.id);
        }

        return await transactionService.findOne(params);
    },
};

const Transaction = {};

export default {
    Query,
    Transaction,
};
