import mongoose from 'mongoose';

import { MainConnection } from '../../../loaders/database.loader';
import { BaseDocument, ModelLoader, ModelHook } from '../../../base/baseModel';

const Schema = mongoose.Schema;

export enum UserRoles {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    MEMBER = 'MEMBER',
}

export enum UserStatuses {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum UserServiceStatus {
    FREE = 'FREE',
    EXPIRED = 'EXPIRED',
    PAID = 'PAID',
}

export type User = {
    code?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRoles;
    avatar?: string;
    lastLoginAt?: Date;
    status?: UserStatuses;
};

export type IUser = BaseDocument & User;

const userSchema = new Schema(
    {
        code: { type: String, unique: true },
        name: { type: String },
        email: { type: String },
        password: { type: String },
        role: { type: String, enum: Object.values(UserRoles) },
        avatar: { type: String },
        lastLoginAt: { type: Date },
        status: { type: String, enum: Object.values(UserStatuses), default: UserStatuses.ACTIVE },
    },
    { timestamps: true, collation: { locale: 'vi' } },
);

userSchema.index({ code: 1 });
userSchema.index({ email: 'text' }, { weights: { email: 2 } });

export const UserHook = new ModelHook<IUser>(userSchema);
export const UserModel: mongoose.Model<IUser> = MainConnection.model('User', userSchema);

export const UserLoader = ModelLoader<IUser>(UserModel, UserHook);
