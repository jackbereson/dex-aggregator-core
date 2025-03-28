import { configs } from '../configs';
import DatabaseLoader from '../core/dbLoader';

const dbLoader = new DatabaseLoader(configs.maindb, configs.maindbLog);

export const MainDb = dbLoader;
export const MainConnection: any = dbLoader.getConnection();
