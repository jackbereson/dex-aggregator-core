import { settingGroupService } from './settingGroup.service';

import { ROLES } from '../../../constants/role.const';
import { Context } from '../../../core/context';
import { SettingModel } from '../setting/setting.model';

const Query = {
    getAllSettingGroup: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR_CUSTOMER);

        return settingGroupService.fetch(args.q);
    },
    getOneSettingGroup: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR_CUSTOMER);
        const { id } = args;

        return await settingGroupService.findOne({ _id: id });
    },
};

const Mutation = {
    createSettingGroup: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { data } = args;

        return await settingGroupService.create(data);
    },
    updateSettingGroup: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { id, data } = args;

        return await settingGroupService.updateOne(id, data);
    },
    deleteOneSettingGroup: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { id } = args;

        return await settingGroupService.deleteOne(id);
    },
    deleteManySettingGroup: async (root: any, args: any, context: Context) => {
        context.auth([ROLES.ADMIN]);
        const { ids } = args;
        let result = await settingGroupService.deleteMany(ids);

        return result;
    },
};

const SettingGroup = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    settings: async (root: any, args: any, context: Context) => {
        return await SettingModel.find({ groupId: root['id'] });
    },
};

export default {
    Query,
    Mutation,
    SettingGroup,
};
