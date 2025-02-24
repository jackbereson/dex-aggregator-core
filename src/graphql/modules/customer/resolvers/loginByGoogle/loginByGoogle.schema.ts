import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        loginByGoogle(idToken: NonEmptyString!): CustomerLoginData
    }

    type CustomerLoginData {
        token: String
        customer: Customer
    }
`;

export default schema;
