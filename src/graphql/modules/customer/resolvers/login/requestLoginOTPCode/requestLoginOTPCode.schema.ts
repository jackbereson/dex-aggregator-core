import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Mutation {
        requestLoginOTPCode: RequestLoginOTPCodeData
    }

    type RequestLoginOTPCodeData {
        success: Boolean
    }
`;

export default schema;
