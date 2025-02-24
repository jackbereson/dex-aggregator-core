import mongoose from 'mongoose';

import { MainConnection } from '../../../loaders/database.loader';
import { BaseDocument, ModelLoader, ModelHook } from '../../../base/baseModel';
import { ChainCodes } from '../chain/chain.model';

export enum TokenStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVED = 'DEACTIVED',
}

export enum ContractCodes {
    usdc = 'usdc',
    weth = 'weth',
    usdt = 'usdt',
    deposit = 'deposit',
    withdraw = 'withdraw',
    confirmWithdraw = 'confirmWithdraw',
    bridge = 'bridge',
}

const Schema = mongoose.Schema;

export type Token = {
    name?: string;
    code?: string;
    contractAddress?: string;
    contractABI?: string;
    providerUrl?: string;
    chainCode?: ChainCodes;
    chainId?: string;
    status?: TokenStatus;
};

export type IToken = BaseDocument & Token;

const tokenSchema = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: TokenStatus, default: TokenStatus.ACTIVE },
        code: { type: String },
        contractAddress: { type: String },
        contractABI: { type: String },
        providerUrl: { type: String },
        chainCode: { type: String, enum: ChainCodes },
        chainId: { type: String },
    },
    { timestamps: true },
);

// tokenSchema.index({ name: "text" }, { weights: { name: 2 } });

export const TokenHook = new ModelHook<IToken>(tokenSchema);
export const TokenModel: mongoose.Model<IToken> = MainConnection.model('Token', tokenSchema);

export const TokenLoader = ModelLoader<IToken>(TokenModel, TokenHook);
