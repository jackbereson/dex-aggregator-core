import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        resetPassword(pass: NonEmptyString!, code: NonEmptyString!): ResetPasswordData
    }

    type ResetPasswordData {
        success: Boolean
    }
`;

export default schema;
