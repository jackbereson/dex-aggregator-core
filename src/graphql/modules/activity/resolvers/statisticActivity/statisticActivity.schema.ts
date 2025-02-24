import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        getStatisticTableLoginTraffic: LoginTrafficActivitySummary
        getStatisticCardDailyActiveUser(fromDate: Date!): StatisticCardLoginData
    }

    type StatisticCardLoginData {
        customerDailyActiveUsersCount: Int
    }

    type LoginTrafficActivitySummary {
        dataset: [CustomerLoginMethodData]
    }

    type CustomerLoginMethodData {
        customerLoginMethod: String
        loginMethodCount: Int
        loginMethodPercentage: Float
    }
`;

export default schema;
