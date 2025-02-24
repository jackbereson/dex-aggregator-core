import { set } from 'lodash';
import md5 from 'md5';

import { UserHelper } from './user.helper';
import { userService } from './user.service';
import { IUser, UserStatuses } from './user.model';

import { ROLES } from '../../../constants/role.const';
import { onActivity } from '../../../events/onActivity.event';
import { encryptionHelper } from '../../../helpers';
import { Context } from '../../../core/context';
import { ActivityTypes, ChangedFactors } from '../activity/activity.model';

const Query = {
    getAllUser: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN, ROLES.EDITOR]);

        return userService.fetch(args.q);
    },
    getOneUser: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN, ROLES.EDITOR]);
        const { id } = args;

        return await userService.findOne({ _id: id });
    },
};

const Mutation = {
    createUser: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { data } = args;

        data.code = await UserHelper.generateCode();
        // console.log("data", data);

        const hashPassword = encryptionHelper.createPassword(md5(data.password));

        set(data, 'status', UserStatuses.ACTIVE);
        set(data, 'password', hashPassword);

        return await userService.create(data).then(async (result) => {
            onActivity.next({
                userId: context.id,
                factorId: result.id,
                type: ActivityTypes.CREATE,
                changedFactor: ChangedFactors.USER,
            });

            return result;
        });
    },

    updateUser: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);
        const { id, data } = args;

        if (context.tokenData.role !== ROLES.ADMIN) context.isOwner(id);

        if (data.password) {
            const hashPassword = encryptionHelper.createPassword(md5(data.password));

            set(data, 'password', hashPassword);
        } else {
            delete data.password;
        }

        return await userService.updateOne(id, data).then(async (result: IUser) => {
            onActivity.next({
                userId: context.id,
                factorId: result.id,
                type: ActivityTypes.UPDATE,
                changedFactor: ChangedFactors.USER,
            });

            return result;
        });
    },

    deleteOneUser: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { id } = args;

        return await userService.deleteOne(id).then((res) => {
            onActivity.next({
                userId: context.id,
                factorId: res.id,
                type: ActivityTypes.DELETE,
                changedFactor: ChangedFactors.USER,
            });

            return res;
        });
    },
};

const User = {};

export default {
    Query,
    Mutation,
    User,
};
