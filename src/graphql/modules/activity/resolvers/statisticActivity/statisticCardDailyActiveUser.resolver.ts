import { ROLES } from '../../../../../constants/role.const';
import { Context } from '../../../../../core/context';
import { ActivityModel } from '../../activity.model';

// Query the unique Customer who signing on a selected day
const Query = {
    getStatisticCardDailyActiveUser: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR);

        const { fromDate } = args;

        // Set start and end date to cover the entire day
        const startDate = new Date(fromDate);

        startDate.setUTCHours(0, 0, 0, 0); // Start of the day

        const endDate = new Date(fromDate);

        endDate.setUTCHours(23, 59, 59, 999); // End of the day

        // Define the aggregation pipeline
        const pipeline = [
            {
                $match: {
                    changedFactor: 'CUSTOMER', // Match the activity type
                    createdAt: { $gte: startDate, $lte: endDate }, // Match the date range
                },
            },
            {
                $group: {
                    _id: '$customerId', // Group by unique customerId
                },
            },
            {
                $group: {
                    _id: null,
                    customerDailyActiveUsersCount: {
                        $sum: 1, // Count the unique customerIds
                    },
                },
            },
        ];

        const [result] = await ActivityModel.aggregate(pipeline);

        // If result is undefined, default to 0
        const { customerDailyActiveUsersCount } = result || { customerDailyActiveUsersCount: 0 };

        return {
            customerDailyActiveUsersCount,
        };
    },
};

export default {
    Query,
};
