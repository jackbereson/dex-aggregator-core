import { SettingGroupModel } from './settingGroup.model';

import { CrudService } from '../../../base/crudService';

class SettingGroupService extends CrudService<typeof SettingGroupModel> {
    constructor() {
        super(SettingGroupModel);
    }
}

const settingGroupService = new SettingGroupService();

export { settingGroupService };
