import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        loginCustomer(data: LoginCustomerInput!): LoginCustomerData
    }

    input LoginCustomerInput {
        email: NonEmptyString!
        pass: NonEmptyString!
    }

    type LoginCustomerData {
        token: String
        # customer: Customer
    }
`;

export default schema;
