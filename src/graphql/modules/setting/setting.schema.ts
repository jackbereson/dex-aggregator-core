import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllSetting(q: QueryGetListInput, projection: String): SettingPageData
        getOneSetting(id: NonEmptyString!): Setting
        getOneSettingByKey(key: String!): Setting
    }

    extend type Mutation {
        createSetting(data: CreateSettingInput!): Setting
        updateSetting(id: NonEmptyString!, data: UpdateSettingInput!): Setting
        deleteOneSetting(id: NonEmptyString!): Setting
        deleteManySetting(ids: [ID]): Int
    }

    input CreateSettingInput {
        type: String
        name: String
        key: String
        value: Mixed
        isActive: Boolean
        isPrivate: Boolean
        readOnly: Boolean
        groupId: String
    }

    input UpdateSettingInput {
        type: String
        name: String
        key: String
        value: Mixed
        isActive: Boolean
        isPrivate: Boolean
        readOnly: Boolean
        groupId: String
    }

    type Setting {
        id: String
        type: String
        name: String
        key: String
        value: Mixed
        isActive: Boolean
        isPrivate: Boolean
        readOnly: Boolean
        groupId: String
        editMode: String
        createdAt: DateTime
        updatedAt: DateTime
        group: SettingGroup
    }

    type SettingPageData {
        data: [Setting]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
