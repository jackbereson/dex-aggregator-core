import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getAllTransaction(q: QueryGetListInput): TransactionPageData
        getOneTransaction(id: ID!): Transaction
        # Add Query
    }

    type Transaction {
        id: String
        createdAt: DateTime
        updatedAt: DateTime

        currency: String
        amount: Float
        value: Float
        status: String
        type: String
        network: String
        address: String
        txHash: String
        depositWallet: String
        customerId: String
        networkId: String
        blockchainWalletId: String
    }

    type TransactionPageData {
        data: [Transaction]
        total: Int
        pagination: Pagination
    }
`;

export default schema;
