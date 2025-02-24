import { SettingTypes } from '../graphql/modules/setting/setting.model';

export enum SettingGroupSlug {
    COMMON = 'COMMON',
}
export enum SettingKey {
    TITLE = 'TITLE',
    WEBSITE_DOMAIN = 'WEBSITE_DOMAIN',
    API_DOMAIN = 'API_DOMAIN',
    MEDIA_DOMAIN = 'MEDIA_DOMAIN',
    MAINTENANCE = 'MAINTENANCE',
}

export const SETTING_DATA = [
    {
        slug: SettingGroupSlug.COMMON,
        name: 'Common setting',
        desc: 'Common setting here',
        icon: 'FcSettings',
        readOnly: true,
        settings: [
            {
                type: SettingTypes.string,
                name: 'Website Title',
                key: SettingKey.TITLE,
                value: 'We Huddle',
                isActive: true,
                isPrivate: false,
                readOnly: false,
            },
            {
                type: SettingTypes.string,
                name: 'Website Domain',
                key: SettingKey.WEBSITE_DOMAIN,
                value: 'http://localhost:3000',
                isActive: true,
                isPrivate: false,
                readOnly: false,
            },
            {
                type: SettingTypes.string,
                name: 'API Domain',
                key: SettingKey.API_DOMAIN,
                value: 'http://localhost:4444',
                isActive: true,
                isPrivate: false,
                readOnly: false,
            },
            {
                type: SettingTypes.string,
                name: 'Media Domain',
                key: SettingKey.MEDIA_DOMAIN,
                value: 'http://localhost:4444',
                isActive: true,
                isPrivate: false,
                readOnly: false,
            },
            {
                type: SettingTypes.boolean,
                name: 'Maintenance',
                key: SettingKey.MAINTENANCE,
                value: false,
                isActive: true,
                isPrivate: false,
                readOnly: false,
            },
        ],
    },
];
