import { ROLES } from '../../../../../constants/role.const';
import { Context } from '../../../../../core/context';
import { ActivityModel } from '../../activity.model';

const Query = {
    getStatisticTableLoginTraffic: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_MEMBER_EDITOR); // Add authentication if needed

        const pipeline = [
            {
                $match: {
                    changedFactor: 'CUSTOMER', // Filter activities where the changedFactor is CUSTOMER
                },
            },
            {
                // Join the Customer collection using customerId
                $lookup: {
                    from: 'customers', // Assuming your customer collection is named "customers"
                    let: { customerId: '$customerId' }, // Let customerId be passed into the lookup pipeline
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id', // Customer's _id is ObjectId
                                        { $toObjectId: '$$customerId' }, // Convert customerId in Activity to ObjectId before comparing
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'customer', // Output field for the joined data
                },
            },
            {
                // Unwind the customer array (because $lookup returns an array)
                $unwind: '$customer',
            },
            {
                // Group by customerLoginMethod and count occurrences
                $group: {
                    _id: '$customer.customerLoginMethod', // Group by the login method
                    loginMethodCount: { $sum: 1 }, // Count the occurrences of each login method
                },
            },
            {
                $group: {
                    _id: null,
                    totalNumberOfActivities: { $sum: '$loginMethodCount' }, // Sum the total activities
                    dataset: {
                        $push: {
                            customerLoginMethod: '$_id', // Push the login method and count into dataset
                            loginMethodCount: '$loginMethodCount',
                        },
                    },
                },
            },
            {
                // Add the percentage calculation for each login method
                $unwind: '$dataset', // Unwind to access each dataset element
            },
            {
                $addFields: {
                    'dataset.loginMethodPercentage': {
                        $multiply: [
                            { $divide: ['$dataset.loginMethodCount', '$totalNumberOfActivities'] },
                            100,
                        ], // Calculate percentage
                    },
                },
            },
            {
                // Regroup the dataset back together
                $group: {
                    _id: null,
                    dataset: { $push: '$dataset' }, // Keep only dataset and remove totalNumberOfActivities
                },
            },
        ];

        // Perform the aggregation on the ActivityModel
        const [result] = await ActivityModel.aggregate(pipeline);

        // If no result, return default values
        const response = result || {
            dataset: [],
        };

        return response;
    },
};

export default {
    Query,
};
