import base from './base';

export default {
    ...base,
    env: 'production',

    maindb: process.env['MONGODB_URI'],
    maindbLog: process.env['MONGO_LOG'],

    app1db: process.env['APP1_DB_URI'],
    app1dbLog: process.env['APP1_DB_URI_LOG'],

    adminAccount: process.env['ADMIN_ACCOUNT'],
    adminPrivateKey: process.env['ADMIN_PRIVATE_KEY'],

    googleClientId: process.env['GOOGLE_CLIENT_ID'],
    googleClientSecret: process.env['GOOGLE_CLIENT_SECRET'],

    migrateSetting: process.env['MIGRATE_SETTING'],

    wepAppUrl: process.env['WEP_APP_URI'],

    smtp: {
        host: process.env['SMTP_HOST'],
        port: process.env['SMTP_PORT'],
        auth: {
            user: process.env['SMTP_USER'],
            pass: process.env['SMTP_PASS'],
        },
    },

    debug: false,
};
