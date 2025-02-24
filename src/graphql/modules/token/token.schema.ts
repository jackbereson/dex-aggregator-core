import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllToken(q: QueryGetListInput): TokenPageData
        getOneToken(id: ID!): Token
        # Add Query
    }

    type Token {
        id: String
        createdAt: DateTime
        updatedAt: DateTime

        name: String
        code: String
        contractAddress: String
        contractABI: String
        providerUrl: String
        chainCode: String
        chainId: String
        status: String
    }

    type TokenPageData {
        data: [Token]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
