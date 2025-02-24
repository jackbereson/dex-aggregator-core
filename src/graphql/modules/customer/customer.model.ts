import mongoose from 'mongoose';

import { MainConnection } from '../../../loaders/database.loader';
import { BaseDocument, ModelLoader, ModelHook } from '../../../base/baseModel';

const Schema = mongoose.Schema;

export enum CustomerStatuses {
    ACTIVE = 'ACTIVE', // Đã kích hoạt
    VERIFYING = 'VERIFYING', // Đang chờ xác thực
    INACTIVE = 'INACTIVE', // Chưa kích hoạt
}

// enum phuong thuc dang nhap
export enum CustomerLoginMethods {
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    EMAIL = 'EMAIL',
}

export type Customer = {
    uid?: string;
    phoneNumber?: string;
    username?: string;
    email?: string;
    password?: string;

    role?: string;
    addressIp?: string;

    customerLoginMethod?: CustomerLoginMethods;
    verifyToken?: string;
    referralCode?: string;
    referrenceId?: string;
    activeAt?: Date;
    status?: CustomerStatuses;

    loginOTPCode?: string;
    loginOTPCodeExpiredAt?: Date;

    resetPasswordOTPCode?: string;
    resetPasswordOTPCodeExpiredAt?: Date;
};

export type ICustomer = BaseDocument & Customer;

const customerSchema = new Schema(
    {
        uid: { type: String },
        username: { type: String },
        phoneNumber: { type: String },
        email: { type: String },
        password: { type: String },

        role: { type: String },
        addressIp: { type: String },

        customerLoginMethod: {
            type: String,
            enum: CustomerLoginMethods,
            default: CustomerLoginMethods.EMAIL,
        },
        verifyToken: { type: String },
        resetPasswordToken: { type: String },
        referralCode: { type: String },
        referrenceId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        activeAt: { type: Date },
        status: { type: String, enum: CustomerStatuses, default: CustomerStatuses.VERIFYING },

        loginOTPCode: { type: String },
        loginOTPCodeExpiredAt: { type: Date },

        resetPasswordOTPCode: { type: String },
        resetPasswordOTPCodeExpiredAt: { type: Date },
    },
    { timestamps: true },
);

customerSchema.index(
    { id: 'text', addressIp: 'text', firstname: 'text', lastname: 'text', email: 'text' },
    { weights: { id: 1, addressIp: 2, firstname: 3, lastname: 4, email: 5 } },
);

export const CustomerHook = new ModelHook<ICustomer>(customerSchema);
export const CustomerModel: mongoose.Model<ICustomer> = MainConnection.model(
    'Customer',
    customerSchema,
);

export const CustomerLoader = ModelLoader<ICustomer>(CustomerModel, CustomerHook);
