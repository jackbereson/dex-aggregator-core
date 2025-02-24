import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllCustomer(q: QueryGetListInput): CustomerPageData
        getOneCustomer(id: ID!): Customer
        # Add Query
        customerGetMe: Customer
    }

    extend type Mutation {
        updateCustomer(id: ID!, data: UpdateCustomerInput!): Customer
        deleteOneCustomer(id: ID!): Customer
    }

    input UpdateCustomerInput {
        status: String
    }

    type Customer {
        id: String
        createdAt: DateTime
        updatedAt: DateTime

        uid: String
        phoneNumber: String
        username: String
        email: String

        role: String
        addressIp: String

        customerLoginMethod: String
        verifyToken: String
        resetPasswordToken: String
        referralCode: String
        referrenceId: String
        activeAt: DateTime
        status: String
    }

    type CustomerPageData {
        data: [Customer]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
