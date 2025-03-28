/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';
// import Raven from 'raven';

// import { config } from '..';

dotenv.config();

// let sentry: Raven.Client;
// if (config.enableSentry) {
//   if (!process.env.SENTRY_CONNECTION_STRING) throw new Error('Missing config SENTRY_CONNECTION_STRING');
//   sentry = Raven.config(process.env.SENTRY_CONNECTION_STRING).install();
// }

export interface IErrorInfo {
    status: number;
    code: string;
    message: string;
    data?: any;
}

export class BaseError extends Error {
    constructor(status: number, code: string, message: string, data?: any) {
        super(message);
        this.info = { status, code, message, data };
    }
    info: IErrorInfo;
}
export class BaseErrorHelper {
    static handleError(func: (req: express.Request, rep: express.Response) => Promise<any>) {
        return (req: express.Request, res: express.Response) =>
            func
                .bind(this)(req, res)
                .catch((error: any) => {
                    if (!error.info) {
                        const err = this.somethingWentWrong();

                        res.status(err.info.status).json(err.info);
                        this.logUnknownError(error);
                    } else {
                        res.status(error.info.status).json(error.info);
                    }
                });
    }
    static logUnknownError(error: Error) {
        console.log('*** UNKNOWN ERROR ***');
        console.log(error);
        console.log('********************');
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
    static logError(prefix: string, logOption = true) {
        return (error: any) => {
            console.log(prefix, error.message || error, logOption ? error.options : '');
        };
    }
    // Unknown
    static somethingWentWrong(message?: string) {
        return new BaseError(500, '500', message || 'Sorry, errors. Please visit next times');
    }
    // Auth
    static unauthorized() {
        return new BaseError(401, '401', 'Error, Unverified account');
    }

    static blockedAccount() {
        return new BaseError(401, '401', 'Error, Account blocked');
    }

    static banAccount() {
        return new BaseError(401, '401', 'Error, Account banned');
    }

    static badToken() {
        return new BaseError(401, '-1', 'Not have access because of the expired token');
    }
    static tokenExpired() {
        return new BaseError(401, '-2', 'The access code has expired');
    }
    static permissionDeny() {
        return new BaseError(405, '-3', 'Insufficient permission to access');
    }
    static insufficientBalance(message: string) {
        return new BaseError(403, '-3', 'Insufficient ' + message);
    }
    // Request
    static requestDataInvalid(message: string) {
        return new BaseError(403, '-4', 'Request data is invalid ' + message);
    }
    // External Request
    static externalRequestFailed(message: string) {
        return new BaseError(500, '-5', message);
    }

    // Mongo
    static mgRecordedNotFound(objectName: string = 'The data required') {
        return new BaseError(404, '-7', 'Not found  ' + objectName);
    }
    static mgQueryFailed(message: string) {
        return new BaseError(403, '-8', message || 'Query failed');
    }
    static branchNotWorking() {
        return new BaseError(403, '-9', 'The branch is not open on this day');
    }
    static recordNotFound(message: string) {
        return new BaseError(404, '-10', `Requested data not found: ${message}`);
    }
    static spinError(message: string) {
        return new BaseError(403, '-115', message);
    }
    static validateJSONError(message: string = '') {
        return new BaseError(500, '-117', message);
    }
    static invalid(message: string) {
        return new BaseError(403, '-118', `Invalid ${message}`);
    }
    static error(message: string) {
        return new BaseError(403, '-118', message);
    }
    static userNotExist() {
        return new BaseError(403, '-103', 'User does not exist');
    }
    static userExisted() {
        return new BaseError(403, '-104', 'User already exists');
    }
    static userRoleNotSupported() {
        return new BaseError(401, '-105', 'User is not authorized');
    }
    static userError(message: string) {
        return new BaseError(403, '-106', 'User error:  ' + message);
    }
    static duplicateError(key: string) {
        return new BaseError(403, '-107', `${key} has been duplicated.`);
    }
    static readOnlyError(key: string) {
        return new BaseError(403, '-108', `${key} is read only.`);
    }
    static createUserError(message: string) {
        return new BaseError(401, '-109', `User creation error: ${message}`);
    }
    static updateUserError(message: string) {
        return new BaseError(401, '-110', `User update error: ${message}`);
    }
    static userPasswordNotCorrect() {
        return new BaseError(403, '-111', 'Incorrect password.');
    }
    static farmerPinNotCorrect() {
        return new BaseError(403, '-112', 'Pin code is incorrect.');
    }
    static deliveryStatusWrong() {
        return new BaseError(403, '-113', 'Order status is incorrect.');
    }
    static invalidPin() {
        return new BaseError(403, '-116', 'Pin code must be 6 digits.');
    }
    static logUnknowError(error: any) {
        console.log('Unknow error', error);
    }
}
