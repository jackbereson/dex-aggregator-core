import mongoose from 'mongoose';

import { MainConnection } from '../../../loaders/database.loader';
import { BaseDocument, ModelLoader, ModelHook } from '../../../base/baseModel';

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER',
}

export type Transaction = {
    currency?: string;
    amount?: number;
    value?: number;
    status?: TransactionStatus;
    type?: TransactionType;
    network?: string;
    address?: string;
    txHash?: string;
    depositWallet?: string;
    customerId?: string;
    createdAt?: Date;
    networkId?: string;
    blockchainWalletId?: string;
};

const Schema = mongoose.Schema;

export type ITransaction = BaseDocument & Transaction;

const transactionSchema = new Schema(
    {
        currency: { type: String }, // Ví dụ: USDT, BTC, ETH
        amount: { type: Number }, // Ví dụ: 5 USDT
        value: { type: Number }, // Ví dụ: 5 USDT
        status: { type: String, enum: TransactionStatus, default: TransactionStatus.COMPLETED },
        type: { type: String, enum: TransactionType },
        network: { type: String }, // Ví dụ: ETH, BSC, TRX
        address: { type: String }, // Địa chỉ ví blockchain
        txHash: { type: String }, // Mã giao dịch trên blockchain
        depositWallet: { type: String }, // Ví dụ: Spot Wallet, P2P Wallet
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        networkId: { type: Schema.Types.ObjectId, ref: 'CurrencyNetwork' },
        blockchainWalletId: { type: Schema.Types.ObjectId, ref: 'BlockchainWallet' },
    },
    { timestamps: true },
);

// transactionSchema.index({ name: "text" }, { weights: { name: 2 } });

export const TransactionHook = new ModelHook<ITransaction>(transactionSchema);
export const TransactionModel: mongoose.Model<ITransaction> = MainConnection.model(
    'Transaction',
    transactionSchema,
);

export const TransactionLoader = ModelLoader<ITransaction>(TransactionModel, TransactionHook);
