import _ from 'lodash';

import fs from 'fs';
import path from 'path';

export class UtilsHelper {
    constructor() {}
    static toBoolean(value: string) {
        return _.upperCase(value) === 'TRUE';
    }
    static walkSyncFiles(dir: string, filelist: string[] = []) {
        const files = fs.readdirSync(dir);

        files.forEach(function (file: any) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = UtilsHelper.walkSyncFiles(path.join(dir, file), filelist);
            } else {
                filelist.push(path.join(dir, file));
            }
        });

        return filelist;
    }
    static parsePhone(phone: string, pre: string) {
        if (!phone) return phone;
        let newPhone = '' + phone;

        newPhone = newPhone
            .replace(/^\+84/i, pre)
            .replace(/^\+0/i, pre)
            .replace(/^0/i, pre)
            .replace(/^84/i, pre);

        return newPhone;
    }

    static isEmail(email: string) {
        const re =
            // eslint-disable-next-line max-len
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
    }
    static parseObjectWithInfo(params: { object: any; info: any }) {
        const { info, object } = params;
        let encodeData = JSON.stringify(object);

        encodeData = this.parseStringWithInfo({ data: encodeData, info });
        try {
            return JSON.parse(encodeData);
        } catch (err) {
            return object;
        }
    }
    static parseStringWithInfo(params: { data: string; info: any }) {
        const { data, info } = params;
        let messageText = '' + data;
        const stringRegex = /{{(.*?)}}/g;

        messageText = messageText.replace(stringRegex, (m: any, field: string) => {
            let data = _.get(info, field.trim());

            if (
                (data !== null && typeof data.valueOf() === 'string') ||
                typeof data.valueOf() === 'number'
            ) {
                data = JSON.stringify(data)
                    .replace(/\\n/g, '\\n')
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, '\\&')
                    .replace(/\\r/g, '\\r')
                    .replace(/\\t/g, '\\t')
                    .replace(/\\b/g, '\\b')
                    .replace(/\\f/g, '\\f')
                    .replace(/^\"(.*)\"$/g, '$1');
            } else if (_.isObject(data) || _.isBoolean(data)) {
                data = `<<Object(${JSON.stringify(data)})Object>>`;
            }

            return data || '';
        });

        return messageText.replace(
            /\:\"(?: +)?<<Object\((true|false|[\{|\[].*?[\}|\]])\)Object>>(?: +)?\"/g,
            ':$1',
        );
    }
    static timeZoneCode: string = 'Asia/Ho_Chi_Minh';
    static random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    static getColor = () => colors[this.random(0, colors.length - 1)];

    static isJSON = (str: string) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    };
}
