/* eslint-disable no-console */
import axios from 'axios';
import chalk from 'chalk';

import { Product, ProductModel } from '../graphql/modules/product/product.model';
import { Currencies } from '../graphql/modules/customerWallet/customerWallet.model';
import { TOKEN_PAIRS } from '../helpers/crypto.helper';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const BINANCE_KLINES_URL = 'https://api.binance.com/api/v3/klines';

async function fetchMonthlyPrices(symbol: string, months: number = 12) {
    const monthlyPrices: number[] = [];
    const currentDate = new Date();

    for (let i = 0; i < months; i++) {
        const startTime = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1,
        ).getTime();
        const endTime = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i + 1,
            1,
        ).getTime();

        try {
            const response = await axios.get(BINANCE_KLINES_URL, {
                params: {
                    symbol,
                    interval: '1M',
                    startTime,
                    endTime,
                    limit: 1,
                },
            });

            const kline = response.data[0]; // Get the first data entry (one month)

            if (kline) {
                const closePrice = parseFloat(kline[4]); // Closing price

                monthlyPrices.unshift(closePrice); // Add to the start of the array
            } else {
                monthlyPrices.unshift(0); // Default if no data
            }
        } catch (error: any) {
            console.error(`Failed to fetch monthly price for ${symbol}:`, error.message);
            monthlyPrices.unshift(0); // Default if error occurs
        }
    }

    return monthlyPrices;
}
async function fetchBinanceData(symbol: string, name: string) {
    try {
        const response = await axios.get(`${BINANCE_API_URL}?symbol=${symbol}`);
        const data = response.data;

        const monthlyPrices = await fetchMonthlyPrices(symbol);

        return {
            lastPrice: parseFloat(data.lastPrice),
            volume: parseFloat(data.volume),
            priceChange: parseFloat(data.priceChange),
            priceChangePercent: parseFloat(data.priceChangePercent),
            weightedAvgPrice: parseFloat(data.weightedAvgPrice),
            prevClosePrice: parseFloat(data.prevClosePrice),
            lastQty: parseFloat(data.lastQty),
            bidPrice: parseFloat(data.bidPrice),
            bidQty: parseFloat(data.bidQty),
            askPrice: parseFloat(data.askPrice),
            askQty: parseFloat(data.askQty),
            openPrice: parseFloat(data.openPrice),
            highPrice: parseFloat(data.highPrice),
            lowPrice: parseFloat(data.lowPrice),
            quoteVolume: parseFloat(data.quoteVolume),
            openTime: data.openTime,
            closeTime: data.closeTime,
            firstId: data.firstId,
            lastId: data.lastId,
            count: data.count,
            icon: `/assets/icons/${symbol}.png`,
            href: `/trade?trade=${name}`,
            monthlyPrices,
        };
    } catch (error: any) {
        console.error(`Failed to fetch Binance data for ${symbol}:`, error.message);

        return {};
    }
}

export const seedingProduct = async () => {
    const collections: Product[] = [
        {
            baseCurrency: Currencies.ETH,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.ETH_USDT,
        },
        {
            baseCurrency: Currencies.BTC,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.BTC_USDT,
        },
        {
            baseCurrency: Currencies.SOL,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.SOL_USDT,
        },
        {
            baseCurrency: Currencies.BNB,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.BNB_USDT,
        },
        {
            baseCurrency: Currencies.DOGE,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.DOGE_USDT,
        },
        {
            baseCurrency: Currencies.ETC,
            quoteCurrency: Currencies.USDT,
            code: TOKEN_PAIRS.ETC_USDT,
        },
    ];

    for (const item of collections) {
        const existed = await ProductModel.findOne({ code: item.code });
        const symbol = `${item.baseCurrency}${item.quoteCurrency}`;
        const name = `${item.baseCurrency}_${item.quoteCurrency}`;
        const productData = await fetchBinanceData(symbol, name);

        if (!existed) {
            await ProductModel.create({
                ...item,
                ...productData,
                status: 'ACTIVE',
            });
            console.log(`${chalk.green('🔗‍💥🔗‍💥 Define Product ')} ${item.code} - 🔥🔥🔥 NEW`);
        } else {
            await ProductModel.updateOne({ code: item.code }, { $set: productData });
            console.log(`${chalk.green('🔗‍💥🔗‍💥 Define Product ')} ${item.code}`);
        }
    }
};
