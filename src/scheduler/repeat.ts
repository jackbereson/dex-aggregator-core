/* eslint-disable no-console */

import chalk from 'chalk';

import ListenETHTranferingFromBSCJob from './jobs/listenETHTranferingFromBSC.job';

import ProductJob from '@/scheduler/jobs/productJob.job';

export function InitRepeatJobs() {
    console.log(chalk.redBright('\n🚣 Generate Repeat Jobs'));

    ProductJob.create({}).repeatEvery('* * * * *').unique({ name: ProductJob.jobName }).save();

    ListenETHTranferingFromBSCJob.create({})
        .repeatEvery('1 minutes')
        .unique({ name: ListenETHTranferingFromBSCJob.jobName })
        .save();
}
