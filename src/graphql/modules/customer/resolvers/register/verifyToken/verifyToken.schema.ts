import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        verifyToken(code: NonEmptyString!): VerifyTokenData
    }

    type VerifyTokenData {
        success: Boolean
    }
`;

export default schema;
