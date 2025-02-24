import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        requestResetPasswordOTPCode(email: NonEmptyString!): RequestResetPasswordOTPCodeData
    }

    type RequestResetPasswordOTPCodeData {
        token: String
    }
`;

export default schema;
