import { eventErrorService } from './eventError.service';

import { ROLES } from '../../../constants/role.const';
import { Context } from '../../../core/context';

const Query = {
    getAllEventError: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);

        return await eventErrorService.fetch(args.q);
    },
    getOneEventError: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { id } = args;

        return await eventErrorService.findOne({ _id: id });
    },
};

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveEventError: async (root: any, args: any, context: Context) => {
        return await eventErrorService.resolveEventError(args);
    },
};

const EventError = {};

export default {
    Query,
    Mutation,
    EventError,
};
