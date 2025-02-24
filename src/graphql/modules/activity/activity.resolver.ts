import { activityService } from './activity.service';

import { ROLES } from '../../../constants/role.const';
import { GraphLoader } from '../../../core/loader';
import { Context } from '../../../core/context';
import { UserLoader } from '../user/user.model';
import { CustomerLoader } from '../customer/customer.model';

const Query = {
    getAllActivity: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR);

        return activityService.fetch(args.q);
    },
    getOneActivity: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR);
        const { id } = args;

        return await activityService.findOne({ _id: id });
    },
};

const Mutation = {
    deleteOneActivity: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { id } = args;

        return await activityService.deleteOne(id);
    },
};

const Activity = {
    user: GraphLoader.loadById(UserLoader, 'userId'),
    customer: GraphLoader.loadById(CustomerLoader, 'customerId'),
};

export default {
    Query,
    Mutation,
    Activity,
};
