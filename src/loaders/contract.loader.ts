import abi from '../contracts/abi-erc20.json';

import {
    BlockchainTypes,
    BlockchainWalletModel,
} from '@/graphql/modules/blockchainWallet/blockchainWallet.model';
import { LogHelper } from '@/core/logger';
import { CurrencyNetworkCodes } from '@/graphql/modules/currencyNetwork/currencyNetwork.model';
import { Currencies, WalletTypes } from '@/graphql/modules/customerWallet/customerWallet.model';
import { customerWalletService } from '@/graphql/modules/customerWallet/customerWallet.service';
import { bscTestnetInstance } from '@/smartContract/ethInstances';

const loadBSCTestnet = async () => {
    try {
        const wallets = await BlockchainWalletModel.find({
            blockChainType: BlockchainTypes.ETHEREUM,
        });
        const userAddresses = wallets
            .map((wallet) => wallet.address)
            .filter((address) => !!address);
        // add user addresses for ETH transfer listening

        // console.log('userAddresses', userAddresses);
        bscTestnetInstance.addAddresses(userAddresses);

        LogHelper.log('\n🚀  BSC Testnet Contract loaded\n');

        // // listen for USDT transfer events
        await bscTestnetInstance.onTransferTokenEvents({
            abi,
            address: process.env.TESTNET_USDT_CONTRACT_ADDRESS,
            callback: async (data) => {
                await customerWalletService.updateWalletByETHWalletTransfering({
                    logData: data,
                    currency: Currencies.USDT,
                    network: CurrencyNetworkCodes.BSC,
                    walletType: WalletTypes.P2P,
                });
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
    }
};

(async () => {
    loadBSCTestnet();
})();
