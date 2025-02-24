import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        registerCustomer(data: RegisterCustomerInput!): Customer
    }

    input RegisterCustomerInput {
        email: NonEmptyString
        password: NonEmptyString
        invitationCode: String
    }
`;

export default schema;
