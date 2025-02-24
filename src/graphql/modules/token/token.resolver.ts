import { tokenService } from './token.service';

import { ROLES } from '../../../constants/role.const';
import { Context } from '../../../core/context';

const Query = {
    getAllToken: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);

        return tokenService.fetch(args.q);
    },
    getOneToken: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);
        const { id } = args;

        return await tokenService.findOne({ _id: id });
    },
};

const Token = {};

export default {
    Query,
    Token,
};
