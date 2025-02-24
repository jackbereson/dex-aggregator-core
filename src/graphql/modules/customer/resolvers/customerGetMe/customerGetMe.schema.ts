import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        customerGetMe: Customer
    }
`;

export default schema;
