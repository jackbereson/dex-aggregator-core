import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllAgendaJob(q: QueryGetListInput): AgendaJobPageData
        getOneAgendaJob(id: NonEmptyString!): AgendaJob
    }

    extend type Mutation {
        updateAgendaJob(id: NonEmptyString!, data: UpdateAgendaJobInput!): AgendaJob
        deleteOneAgendaJob(id: NonEmptyString!): AgendaJob
    }

    input UpdateAgendaJobInput {
        priority: Int
        disabled: Boolean
    }

    type AgendaJob {
        id: String
        createdAt: DateTime
        updatedAt: DateTime
        # model

        name: String
        data: Mixed
        type: String
        priority: Int
        nextRunAt: DateTime
        lastModifiedBy: String
        lockedAt: DateTime
        lastRunAt: DateTime
        lastFinishedAt: DateTime
        disabled: Boolean

        failCount: Int
        failReason: String
        failedAt: DateTime

        lastModifiedByUser: User
    }

    type AgendaJobPageData {
        data: [AgendaJob]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
