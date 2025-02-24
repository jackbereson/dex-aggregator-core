import { TokenModel } from './token.model';

import { CrudService } from '../../../base/crudService';

class TokenService extends CrudService<typeof TokenModel> {
    constructor() {
        super(TokenModel);
    }

    getContractByCode = async ({ chainId, code }: { chainId: string; code: string }) => {
        const contracts = await this.model.find({ chainId });

        return contracts.find((c) => c.code === code);
    };
}

const tokenService = new TokenService();

export { tokenService };
