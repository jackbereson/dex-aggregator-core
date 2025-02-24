/* eslint-disable no-console */
import axios from 'axios';

import { GRANULARITY } from '../graphql/modules/stick/stick.model';

export async function getBinanceHistoricalData(symbol, interval, startTime, endTime) {
    try {
        const url = `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`;
        const response = await axios.get(url);

        console.log('url', url);
        const historicalData = response.data.map((data) => ({
            timestamp: new Date(data[0]).getTime(),
            open: parseFloat(data[1]),
            high: parseFloat(data[2]),
            low: parseFloat(data[3]),
            close: parseFloat(data[4]),
            volume: parseFloat(data[5]),
            turnover: parseFloat(data[7]),
        }));

        return historicalData;
    } catch (error) {
        console.log('error', error);
        console.error('Đã xảy ra lỗi khi lấy dữ liệu từ Binance:', error.message);

        return null;
    }
}

export enum TOKEN_PAIRS {
    ETH_USDT = 'ETH_USDT',
    BTC_USDT = 'BTC_USDT',
    SOL_USDT = 'SOL_USDT',
    BNB_USDT = 'BNB_USDT',
    DOGE_USDT = 'DOGE_USDT',
    ETC_USDT = 'ETC_USDT',
}

export enum TOKEN_SYMBOL {
    ETH_USDT = 'ETHUSDT',
    BTC_USDT = 'BTCUSDT',
    SOL_USDT = 'SOLUSDT',
    BNB_USDT = 'BNBUSDT',
    DOGE_USDT = 'DOGEUSDT',
    ETC_USDT = 'ETCUSDT',
}

export const basicTokensForUSDT = {
    ETH_USDT: {
        _1Y: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_WEEK),
        _1d: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_DAY),
        _4h: async () => (await historycall('ETHUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('ETHUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('ETHUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('ETHUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('ETHUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('ETHUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
    },
    BTC_USDT: {
        _1Y: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_WEEK),
        _1d: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_DAY),
        _4h: async () => (await historycall('BTCUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('BTCUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('BTCUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('BTCUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('BTCUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('BTCUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
    },
    SOL_USDT: {
        _1Y: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_WEEK),
        _4h: async () => (await historycall('SOLUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('SOLUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('SOLUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('SOLUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('SOLUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
        _1d: async () => (await historycall('SOLUSDT'))(GRANULARITY.ONE_DAY),
    },
    BNB_USDT: {
        _1Y: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_WEEK),
        _4h: async () => (await historycall('BNBUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('BNBUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('BNBUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('BNBUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('BNBUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
        _1d: async () => (await historycall('BNBUSDT'))(GRANULARITY.ONE_DAY),
    },
    DOGE_USDT: {
        _1Y: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_WEEK),
        _4h: async () => (await historycall('DOGEUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('DOGEUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('DOGEUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('DOGEUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('DOGEUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
        _1d: async () => (await historycall('DOGEUSDT'))(GRANULARITY.ONE_DAY),
    },
    ETC_USDT: {
        _1Y: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_YEAR),
        _1M: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_MONTH),
        _1w: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_WEEK),
        _4h: async () => (await historycall('ETCUSDT'))(GRANULARITY.FOUR_HOURS),
        _2h: async () => (await historycall('ETCUSDT'))(GRANULARITY.TWO_HOURS),
        _5m: async () => (await historycall('ETCUSDT'))(GRANULARITY.FIVE_MINUTE),
        _1m: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_MINUTE),
        _1h: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_HOUR),
        _30m: async () => (await historycall('ETCUSDT'))(GRANULARITY.THIRTY_MINUTE),
        _15m: async () => (await historycall('ETCUSDT'))(GRANULARITY.FIXTEEN_MINUTE),
        _1d: async () => (await historycall('ETCUSDT'))(GRANULARITY.ONE_DAY),
    },
};

export const historycall = async (symbol: string) => async (interval: GRANULARITY) => {
    const endTime = Date.now(); // Lấy ngày hiện tại
    const startTime = endTime - 365 * 24 * 60 * 60 * 1000; // Lấy dữ liệu từ 1 năm trước

    return await getBinanceHistoricalData(symbol, interval, startTime, endTime);
};
