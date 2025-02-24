import { UserModel } from './user.model';

import { CrudService } from '../../../base/crudService';

class UserService extends CrudService<typeof UserModel> {
    constructor() {
        super(UserModel);
    }
}

const userService = new UserService();

export { userService };
