/* eslint-disable no-console */
import { Response } from 'express';

import { Logger } from '../core/logger';
import { ErrorHelper } from '../core/error';

export function resError(res: Response, error: any) {
    if (!error.info) {
        const err = ErrorHelper.somethingWentWrong();

        res.status(err.info.status).json(err.info);
        logUnknowError(error);
    } else {
        res.status(error.info.status).json(error.info);
    }
}

function logUnknowError(error: Error) {
    console.log('*** UNKNOW ERROR ***');
    console.log(error);
    console.log('********************');

    Logger.error(error.toString(), {
        metadata: {
            stack: error.stack,
            name: error.name,
            message: error.message,
        },
    });

    // if (sentry) {
    //   try {
    //     sentry.captureException(error);
    //   } catch (err) {
    //     console.log('*** CANNOT CAPTURE EXCEPTION TO SENTRY ***');
    //     console.log(err.message);
    //     console.log('******************************************');
    //   }
    // }
}
