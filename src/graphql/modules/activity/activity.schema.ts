import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllActivity(q: QueryGetListInput): ActivityPageData
        getOneActivity(id: NonEmptyString!): Activity
    }

    extend type Mutation {
        deleteOneActivity(id: NonEmptyString!): Activity
    }

    type Activity {
        id: String
        createdAt: DateTime
        updatedAt: DateTime

        userId: String
        customerId: String
        factorId: String
        message: String
        type: String
        changedFactor: String

        user: User
        customer: Customer
    }

    type ActivityPageData {
        data: [Activity]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
