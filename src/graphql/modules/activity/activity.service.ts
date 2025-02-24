import { ActivityModel } from './activity.model';

import { CrudService } from '../../../base/crudService';

class ActivityService extends CrudService<typeof ActivityModel> {
    constructor() {
        super(ActivityModel);
    }
}

const activityService = new ActivityService();

export { activityService };
