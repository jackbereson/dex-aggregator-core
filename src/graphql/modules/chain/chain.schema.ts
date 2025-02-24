import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllChain(q: QueryGetListInput): ChainPageData
        getOneChain(id: ID!): Chain
        # Add Query
    }

    type Chain {
        id: String
        createdAt: DateTime
        updatedAt: DateTime

        chainNumber: Int
        status: String
        code: String
        imgUrl: String
        network: Mixed
        minFaucetFee: Float
        maxFaucetFee: Float
        minDepositFee: Float
        maxDepositFee: Float
        minWithdrawFee: Float
        maxWithdrawFee: Float

        minGasFee: Float
        maxGasFee: Float

        price: Float

        contracts: [NetworkContract]
    }

    type ChainPageData {
        data: [Chain]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
