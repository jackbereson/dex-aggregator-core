import { Currency, CurrencyModel, CurrencyTypes } from '@/graphql/modules/currency/currency.model';
import {
    CurrencyNetwork,
    CurrencyNetworkModel,
} from '@/graphql/modules/currencyNetwork/currencyNetwork.model';

export async function currencySeed() {
    const currencies: Currency[] = [
        {
            name: 'TetherUS',
            symbol: 'USDT',
            imageUrl: '/images/crypto/usdt.svg',
            isFeatured: true,
            isStableCoin: true, // Added isStableCoin
            type: CurrencyTypes.TOKEN,
            currentPrice: 1.0,
            marketCap: 83000000000,
            totalSupply: 85000000000,
            circulatingSupply: 83000000000,
            releaseDate: new Date('2014-10-06'),
            description:
                'Tether is a blockchain-based cryptocurrency backed by fiat currencies like USD.',
            website: 'https://tether.to',
            dailyChangePercent: 0.02,
            tradingVolume: 4100000000,
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            imageUrl: '/images/crypto/sol.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 24.5,
            marketCap: 9600000000,
            totalSupply: 500000000,
            circulatingSupply: 360000000,
            releaseDate: new Date('2020-03-20'),
            description: 'Solana is a high-performance blockchain supporting developers worldwide.',
            website: 'https://solana.com',
            dailyChangePercent: 3.12,
            tradingVolume: 600000000,
        },
        {
            name: 'Bitcoin',
            symbol: 'BTC',
            imageUrl: '/images/crypto/btc.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 36900.45,
            marketCap: 720000000000,
            totalSupply: 21000000,
            circulatingSupply: 19300000,
            releaseDate: new Date('2009-01-03'),
            description:
                'Bitcoin is the first decentralized cryptocurrency created by Satoshi Nakamoto.',
            website: 'https://bitcoin.org',
            dailyChangePercent: 1.99,
            tradingVolume: 29000000000,
        },
        {
            name: 'BNB',
            symbol: 'BNB',
            imageUrl: '/images/crypto/bnb.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 697.11,
            marketCap: 115000000000,
            totalSupply: 200000000,
            circulatingSupply: 168137036,
            releaseDate: new Date('2017-07-25'),
            description:
                'BNB powers the Binance ecosystem and is used to pay transaction fees on Binance.',
            website: 'https://www.binance.com',
            dailyChangePercent: 0.98,
            tradingVolume: 3500000000,
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            imageUrl: '/images/crypto/eth.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 3210.45,
            marketCap: 384000000000,
            totalSupply: 120000000,
            circulatingSupply: 120000000,
            releaseDate: new Date('2015-07-30'),
            description:
                'Ethereum is a decentralized platform that enables smart contracts and DApps.',
            website: 'https://ethereum.org',
            dailyChangePercent: 1.68,
            tradingVolume: 14000000000,
        },
        {
            name: 'Cardano',
            symbol: 'ADA',
            imageUrl: '/images/crypto/ada.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 1.25,
            marketCap: 40000000000,
            totalSupply: 45000000000,
            circulatingSupply: 32000000000,
            releaseDate: new Date('2017-09-29'),
            description:
                'Cardano is a blockchain platform for changemakers, innovators, and visionaries.',
            website: 'https://cardano.org',
            dailyChangePercent: 2.45,
            tradingVolume: 1200000000,
        },
        {
            name: 'Ripple',
            symbol: 'XRP',
            imageUrl: '/images/crypto/xrp.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 0.75,
            marketCap: 35000000000,
            totalSupply: 100000000000,
            circulatingSupply: 46000000000,
            releaseDate: new Date('2012-08-01'),
            description:
                'Ripple is a digital payment protocol for fast, low-cost cross-border payments.',
            website: 'https://ripple.com',
            dailyChangePercent: 1.12,
            tradingVolume: 800000000,
        },
        {
            name: 'Dogecoin',
            symbol: 'DOGE',
            imageUrl: '/images/crypto/doge.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 0.25,
            marketCap: 32000000000,
            totalSupply: 130000000000,
            circulatingSupply: 130000000000,
            releaseDate: new Date('2013-12-06'),
            description: 'Dogecoin is a fun and friendly internet currency.',
            website: 'https://dogecoin.com',
            dailyChangePercent: 1.99,
            tradingVolume: 1200000000,
        },
        {
            name: 'Polkadot',
            symbol: 'DOT',
            imageUrl: '/images/crypto/dot.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 23.45,
            marketCap: 24000000000,
            totalSupply: 1100000000,
            circulatingSupply: 1100000000,
            releaseDate: new Date('2020-05-26'),
            description: 'Polkadot is a scalable, interoperable, and secure network protocol.',
            website: 'https://polkadot.network',
            dailyChangePercent: 2.45,
            tradingVolume: 800000000,
        },
        {
            name: 'Litecoin',
            symbol: 'LTC',
            imageUrl: '/images/crypto/ltc.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 150.45,
            marketCap: 10000000000,
            totalSupply: 84000000,
            circulatingSupply: 66000000,
            releaseDate: new Date('2011-10-07'),
            description: 'Litecoin is a peer-to-peer cryptocurrency created by Charlie Lee.',
            website: 'https://litecoin.org',
            dailyChangePercent: 1.45,
            tradingVolume: 1200000000,
        },
        {
            name: 'Chainlink',
            symbol: 'LINK',
            imageUrl: '/images/crypto/link.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 25.45,
            marketCap: 12000000000,
            totalSupply: 1000000000,
            circulatingSupply: 1000000000,
            releaseDate: new Date('2017-09-19'),
            description: 'Chainlink is a decentralized oracle network.',
            website: 'https://chain.link',
            dailyChangePercent: 3.45,
            tradingVolume: 800000000,
        },
        {
            name: 'Stellar',
            symbol: 'XLM',
            imageUrl: '/images/crypto/xlm.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 0.35,
            marketCap: 8000000000,
            totalSupply: 50000000000,
            circulatingSupply: 23000000000,
            releaseDate: new Date('2014-07-31'),
            description: 'Stellar is an open network for storing and moving money.',
            website: 'https://stellar.org',
            dailyChangePercent: 2.45,
            tradingVolume: 600000000,
        },
        {
            name: 'Uniswap',
            symbol: 'UNI',
            imageUrl: '/images/crypto/uni.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 20.45,
            marketCap: 11000000000,
            totalSupply: 1000000000,
            circulatingSupply: 1000000000,
            releaseDate: new Date('2020-09-17'),
            description: 'Uniswap is a decentralized finance protocol.',
            website: 'https://uniswap.org',
            dailyChangePercent: 3.45,
            tradingVolume: 700000000,
        },
        {
            name: 'Filecoin',
            symbol: 'FIL',
            imageUrl: '/images/crypto/fil.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 45.45,
            marketCap: 9000000000,
            totalSupply: 2000000000,
            circulatingSupply: 2000000000,
            releaseDate: new Date('2020-10-15'),
            description: 'Filecoin is a decentralized storage network.',
            website: 'https://filecoin.io',
            dailyChangePercent: 4.45,
            tradingVolume: 500000000,
        },
        {
            name: 'Avalanche',
            symbol: 'AVAX',
            imageUrl: '/images/crypto/avax.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 50.45,
            marketCap: 10000000000,
            totalSupply: 720000000,
            circulatingSupply: 720000000,
            releaseDate: new Date('2020-09-21'),
            description:
                'Avalanche is an open-source platform for launching decentralized applications.',
            website: 'https://avax.network',
            dailyChangePercent: 3.45,
            tradingVolume: 400000000,
        },
        {
            name: 'Tezos',
            symbol: 'XTZ',
            imageUrl: '/images/crypto/xtz.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 4.45,
            marketCap: 3000000000,
            totalSupply: 800000000,
            circulatingSupply: 800000000,
            releaseDate: new Date('2018-06-30'),
            description: 'Tezos is a self-amending blockchain platform.',
            website: 'https://tezos.com',
            dailyChangePercent: 2.45,
            tradingVolume: 300000000,
        },
        {
            name: 'Cosmos',
            symbol: 'ATOM',
            imageUrl: '/images/crypto/atom.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 12.45,
            marketCap: 3000000000,
            totalSupply: 250000000,
            circulatingSupply: 200000000,
            releaseDate: new Date('2019-03-13'),
            description: 'Cosmos is a decentralized network of independent parallel blockchains.',
            website: 'https://cosmos.network',
            dailyChangePercent: 2.45,
            tradingVolume: 200000000,
        },
        {
            name: 'Algorand',
            symbol: 'ALGO',
            imageUrl: '/images/crypto/algo.svg',
            isFeatured: true,
            isStableCoin: false, // Added isSt
            type: CurrencyTypes.COIN,
            currentPrice: 1.45,
            marketCap: 3000000000,
            totalSupply: 1000000000,
            circulatingSupply: 1000000000,
            releaseDate: new Date('2019-06-19'),
            description: 'Algorand is a scalable, secure, and decentralized digital currency.',
            website: 'https://algorand.com',
            dailyChangePercent: 2.45,
            tradingVolume: 200000000,
        },
        {
            name: 'Kusama',
            symbol: 'KSM',
            imageUrl: '/images/crypto/ksm.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 200.45,
            marketCap: 2000000000,
            totalSupply: 10000000,
            circulatingSupply: 10000000,
            releaseDate: new Date('2019-12-19'),
            description: 'Kusama is a scalable network of specialized blockchains.',
            website: 'https://kusama.network',
            dailyChangePercent: 2.45,
            tradingVolume: 100000000,
        },
        {
            name: 'Compound',
            symbol: 'COMP',
            imageUrl: '/images/crypto/comp.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 300.45,
            marketCap: 1000000000,
            totalSupply: 10000000,
            circulatingSupply: 10000000,
            releaseDate: new Date('2019-06-15'),
            description: 'Compound is an algorithmic, autonomous interest rate protocol.',
            website: 'https://compound.finance',
            dailyChangePercent: 2.45,
            tradingVolume: 100000000,
        },
        {
            name: 'Maker',
            symbol: 'MKR',
            imageUrl: '/images/crypto/mkr.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 4000.45,
            marketCap: 4000000000,
            totalSupply: 1000000,
            circulatingSupply: 1000000,
            releaseDate: new Date('2017-12-27'),
            description: 'Maker is a decentralized autonomous organization.',
            website: 'https://makerdao.com',
            dailyChangePercent: 2.45,
            tradingVolume: 100000000,
        },
        {
            name: 'Synthetix',
            symbol: 'SNX',
            imageUrl: '/images/crypto/snx.svg',
            isFeatured: true,
            isStableCoin: false, // Added isStableCoin
            type: CurrencyTypes.COIN,
            currentPrice: 10.45,
            marketCap: 1000000000,
            totalSupply: 200000000,
            circulatingSupply: 200000000,
            releaseDate: new Date('2018-02-01'),
            description: 'Synthetix is a decentralized synthetic asset issuance protocol.',
            website: 'https://synthetix.io',
            dailyChangePercent: 2.45,
            tradingVolume: 100000000,
        },
    ];

    await CurrencyModel.insertMany(currencies);
}

export async function currencyNetworksSeed() {
    // Add currency networks seed here
    const usdt = await CurrencyModel.findOne({ symbol: 'USDT' });
    const btc = await CurrencyModel.findOne({ symbol: 'BTC' });
    const eth = await CurrencyModel.findOne({ symbol: 'ETH' });
    const bnb = await CurrencyModel.findOne({ symbol: 'BNB' });

    const usdtNets: CurrencyNetwork[] = [
        {
            currency: usdt.symbol,
            currencyId: usdt.id,
            name: 'ETH',
            label: 'Ethereum (ERC20)',
            confirmations: 12,
            estimatedTime: '≈ 2 min',
            isUserSpecific: false,
            hostAddress: '0x8c501e30d4ae5e9665ef1e775b28f453b529dad2',
            contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            scanUrl: 'https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        {
            currency: usdt.symbol,
            currencyId: usdt.id,
            name: 'BSC',
            label: 'Binance Smart Chain (BEP20)',
            confirmations: 12,
            estimatedTime: '≈ 2 min',
            isUserSpecific: false,
            hostAddress: '0x8c501e30d4ae5e9665ef1e775b28f453b529dad2',
            contractAddress: '0x55d398326f99059ff775485246999027b3197955',
            scanUrl: 'https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955',
        },
        {
            currency: usdt.symbol,
            currencyId: usdt.id,
            name: 'MATIC',
            label: 'Polygon POS',
            estimatedTime: '≈ 2 min',
            confirmations: 2,
            isUserSpecific: false,
            hostAddress: '0x8c501e30d4ae5e9665ef1e775b28f453b529dad2',
            contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
            scanUrl: 'https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        },
    ];

    console.log('Add USDT networks');
    await CurrencyNetworkModel.insertMany(usdtNets);

    // Add more currency networks seed here

    const btcNets: CurrencyNetwork[] = [
        {
            currency: btc.symbol,
            currencyId: btc.id,
            name: 'BTC',
            label: 'Bitcoin',
            confirmations: 6,
            estimatedTime: '≈ 1 minute',
            isUserSpecific: false,
            hostAddress: '1LFdfiC1KSJsRccghpEwToSENMAG4cgWHx',
        },
    ];

    console.log('Add BTC networks');
    await CurrencyNetworkModel.insertMany(btcNets);

    const ethNets: CurrencyNetwork[] = [
        {
            currency: eth.symbol,
            currencyId: eth.id,
            name: 'ETH',
            label: 'Ethereum',
            confirmations: 12,
            estimatedTime: '≈ 2 minutes',
            isUserSpecific: false,
            hostAddress: '0x8c501e30d4ae5e9665ef1e775b28f453b529dad2',
        },
    ];

    console.log('Add ETH networks');
    await CurrencyNetworkModel.insertMany(ethNets);

    const bnbNets: CurrencyNetwork[] = [
        {
            currency: bnb.symbol,
            currencyId: bnb.id,
            name: 'BSC',
            label: 'BNB Smart Chain (BEP 20)',
            confirmations: 15,
            estimatedTime: '≈ 1 minutes',
            isUserSpecific: false,
            hostAddress: '0x8c501e30d4ae5e9665ef1e775b28f453b529dad2',
        },
    ];

    console.log('Add BNB networks');
    await CurrencyNetworkModel.insertMany(bnbNets);
}
