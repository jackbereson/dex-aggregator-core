import { Job } from 'agenda';

import { Agenda } from '../agenda';
import { LogHelper } from '../../core/logger';

export class ProductJob {
    static jobName = 'HelloWorld';
    static create(data: any) {
        return Agenda.create(this.jobName, data);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static execute(job: Job) {
        LogHelper.runningJobLog(ProductJob.jobName);
    }
}

export default ProductJob;
