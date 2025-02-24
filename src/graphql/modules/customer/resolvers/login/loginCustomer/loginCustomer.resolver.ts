import { Context } from '../../../../../../core/context';
import { encryptionHelper, ErrorHelper } from '../../../../../../helpers';
import { CustomerHelper } from '../../../customer.helper';
import { CustomerModel } from '../../../customer.model';
import { customerService } from '../../../customer.service';

const Mutation = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginCustomer: async (root: any, args: any, context: Context) => {
        const { email, pass } = args.data;

        if (!CustomerHelper.validateEmail(email)) {
            throw ErrorHelper.error('Invalid email format.');
        }

        const customer = await CustomerModel.findOne({ email });

        if (!customer) {
            throw ErrorHelper.unauthorized();
        }

        CustomerHelper.validCustomer(customer);

        const newPassword = CustomerHelper.combinePassword(pass, email);

        console.log('newPassword', newPassword);
        const encrypedPassword = customer.password;

        console.log('customer', customer);
        const validPassword = encryptionHelper.comparePassword(newPassword, encrypedPassword);

        console.log('validPassword', validPassword);
        if (!validPassword) {
            throw ErrorHelper.unauthorized();
        }

        customer.loginOTPCode = await CustomerHelper.generateloginOTPCode();
        customer.loginOTPCodeExpiredAt = new Date(Date.now() + 60000); // 1 minute
        // user Promise.all to run all promises in parallel
        await Promise.all([customer.save(), customerService.sendEmailLoginOTPCode(customer)]);

        return {
            // customer,
            token: new CustomerHelper(customer).getOTPToken(),
        };
    },
};

export default { Mutation };
