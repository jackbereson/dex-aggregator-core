import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        verifyResetPasswordOTPCode(code: NonEmptyString!): VerifyResetPasswordOTPCodeData
    }

    type VerifyResetPasswordOTPCodeData {
        resetToken: String
    }
`;

export default schema;
