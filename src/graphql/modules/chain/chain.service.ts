import { ChainModel } from './chain.model';

import { CrudService } from '../../../base/crudService';

class ChainService extends CrudService<typeof ChainModel> {
    constructor() {
        super(ChainModel);
    }
}

const chainService = new ChainService();

export { chainService };
