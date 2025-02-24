import { chainService } from './chain.service';

import { ROLES } from '../../../constants/role.const';
import { Context } from '../../../core/context';
import { TokenModel } from '../token/token.model';

const Query = {
    getAllChain: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);

        return chainService.fetch(args.q);
    },
    getOneChain: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);
        const { id } = args;

        return await chainService.findOne({ _id: id });
    },
};

const Chain = {
    contracts: async (root: any, args: any, context: Context) => {
        const contracts = await TokenModel.find(
            {
                networkId: root['id'],
            },
            'code contractAddress contractABI',
        );
        // console.log("contracts", contracts)

        return contracts;
    },
};

export default {
    Query,
    Chain,
};
