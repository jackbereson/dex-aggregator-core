/* eslint-disable no-console */
import dotenv from 'dotenv';
import { compact, get } from 'lodash';

import path from 'path';
import fs from 'fs';

import { UtilsHelper } from '../helpers/utils.helper';

const pjson = require('../../package.json');

if (fs.existsSync(path.join(__dirname, '../../.env'))) {
    console.log('.env exists');
    dotenv.config({ path: path.join(__dirname, '../../.env') });
} else if (fs.existsSync(path.join(__dirname, '../../.env.example'))) {
    console.log('.env not exists');
    dotenv.config({ path: path.join(__dirname, '../../.env.example') }); // you can delete this after you create your own .env file!
} else {
    console.log('.env.example not exists');
}

export default {
    name: pjson.name,
    version: pjson.version,
    description: pjson.description,
    port: process.env.PORT || 3000,
    basicAuth: {
        users: { mcom: 'mcom@123' },
    },
    winston: {
        db: process.env.MONGO_LOG || '',
        level: process.env.LOG_LEVEL || 'silly',
    },
    query: {
        limit: 10,
    },
    secretKey: process.env.SECRET || 'HkQlTCrDfYWezqEp494TjDUqBhSzQSnn',
    timezone: 'Asia/Ho_Chi_Minh',
    domain: 'http://localhost:' + process.env.PORT || 3000,
    redis: {
        enable: false,
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT || 6379),
        password: process.env.REDIS_PASS,
    },
    domainName: process.env.DOMAIN_NAME || 'http://localhost:5555',
    nextDev: UtilsHelper.toBoolean(process.env.NEXT_DEV || 'FALSE'),
    scheduler: {
        includes: compact(get(process.env, 'SCHEDULER_INCLUDES', '').split(',')),
        excludes: compact(get(process.env, 'SCHEDULER_EXCLUDES', '').split(',')),
    },
    googleClientId: process.env.YOUR_CLIENT_ID,
    googleClientSecret: process.env.YOUR_CLIENT_SECRET,
    pairs: process.env.PAIRS,
};
