import mongoose from 'mongoose';

import { MainConnection } from '../../../loaders/database.loader';
import { BaseDocument, ModelLoader, ModelHook } from '../../../base/baseModel';
import { Token } from '../token/token.model';

export enum ChainStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVED = 'DEACTIVED',
}

export declare enum ChainCodes {
    won = 'won',
    polygon = 'polygon',
    polygonTestnet = 'polygonTestnet',
    bsc = 'bsc',
    bscTestnet = 'bscTestnet',
    celoTestnet = 'celoTestnet',
    ganache = 'ganache',
    ropsten = 'ropsten',
    arbitrumRinkeby = 'arbitrumRinkeby',
    arbitrum = 'arbitrum',
    mintme = 'mintme',
    celo = 'celo',
    avax = 'avax',
    coredao = 'coredao',
    moonriver = 'moonriver',
    harmony = 'harmony',
    fantom = 'fantom',
    bitgert = 'bitgert',
    fuse = 'fuse',
    doge = 'doge',
}

export type Chain = {
    chainNumber?: number;
    status?: ChainStatus;
    code?: ChainCodes;
    imgUrl?: string;
    network?: {
        chainId?: string;
        chainName?: string;
        nativeCurrency?: {
            name?: string;
            symbol?: string;
            decimals?: number;
        };
        rpcUrls?: string[];
        blockExplorerUrls?: string[];
    };
    minFaucetFee?: number;
    maxFaucetFee?: number;
    minDepositFee?: number;
    maxDepositFee?: number;
    minWithdrawFee?: number;
    maxWithdrawFee?: number;
    minGasFee?: number;
    maxGasFee?: number;
    price?: number;
    tokens?: Token[];
};

const Schema = mongoose.Schema;

export type IChain = BaseDocument & Chain;

const chainSchema = new Schema(
    {
        chainNumber: { type: Number },
        status: { type: String, enum: ChainStatus, default: ChainStatus.ACTIVE },
        code: { type: String, enum: ChainCodes },
        imgUrl: { type: String },
        network: {
            chainId: { type: String },
            chainName: { type: String },
            nativeCurrency: {
                name: { type: String },
                symbol: { type: String },
                decimals: { type: Number },
            },
            rpcUrls: { type: [String] },
            blockExplorerUrls: { type: [String] },
        },
        minFaucetFee: { type: Number },
        maxFaucetFee: { type: Number },
        minDepositFee: { type: Number },
        maxDepositFee: { type: Number },
        minWithdrawFee: { type: Number },
        maxWithdrawFee: { type: Number },
        minGasFee: { type: Number },
        maxGasFee: { type: Number },
        price: { type: Number },
        tokens: [{ type: Schema.Types.ObjectId, ref: 'Token' }],
    },
    { timestamps: true },
);

// chainSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ChainHook = new ModelHook<IChain>(chainSchema);
export const ChainModel: mongoose.Model<IChain> = MainConnection.model('Chain', chainSchema);

export const ChainLoader = ModelLoader<IChain>(ChainModel, ChainHook);
