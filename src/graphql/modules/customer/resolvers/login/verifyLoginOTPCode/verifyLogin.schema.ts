import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        verifyLoginOTPCode(code: NonEmptyString!): VerifyLoginOTPData
    }

    type VerifyLoginOTPData {
        token: String
        customer: Customer
    }
`;

export default schema;
