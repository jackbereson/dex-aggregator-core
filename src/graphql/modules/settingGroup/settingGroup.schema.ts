import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllSettingGroup(q: QueryGetListInput): SettingGroupPageData
        getOneSettingGroup(id: NonEmptyString!): SettingGroup
    }

    extend type Mutation {
        createSettingGroup(data: CreateSettingGroupInput!): SettingGroup
        updateSettingGroup(id: NonEmptyString!, data: UpdateSettingGroupInput!): SettingGroup
        resetSettingGroup(id: NonEmptyString!): SettingGroup
        deleteOneSettingGroup(id: NonEmptyString!): SettingGroup
        deleteManySettingGroup(ids: [ID]): Int
    }

    input CreateSettingGroupInput {
        slug: String!
        name: String!
        desc: String
        icon: String
        readOnly: Boolean
    }

    input UpdateSettingGroupInput {
        name: String
        desc: String
        icon: String
        readOnly: Boolean
    }

    type SettingGroup {
        id: String
        slug: String
        name: String
        desc: String
        icon: String
        readOnly: Boolean
        createdAt: DateTime
        updatedAt: DateTime

        settings: [Setting]
    }

    type SettingGroupPageData {
        data: [SettingGroup]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
