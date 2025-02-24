import { Job } from 'agenda';

import { Agenda } from '../agenda';
import { LogHelper } from '../../core/logger';

// import { bscTestnetInstance } from '@/smartContract/ethInstances';nb n  t l

export class ListenETHTranferingFromBSCJob {
    static jobName = 'Listen ETH Tranfering From BSC chain';
    static create(data: any) {
        return Agenda.create(this.jobName, data);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async execute(job: Job) {
        LogHelper.runningJobLog(ListenETHTranferingFromBSCJob.jobName);
        // await bscTestnetInstance.onEtherReceivedMultiple({
        //     callback: async (data) => {
        //         console.log('data', data);
        //     },
        // });
    }
}

export default ListenETHTranferingFromBSCJob;
