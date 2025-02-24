/* eslint-disable no-console */

import { ProductModel } from '../graphql/modules/product/product.model';
import { GRANULARITY, Stick } from '../graphql/modules/stick/stick.model';
import { TOKEN_PAIRS, basicTokensForUSDT } from '../helpers/crypto.helper';

export const seedingSticks = async () => {
    await createData(TOKEN_PAIRS.BTC_USDT);
    // await createData(TOKEN_PAIRS.ETH_USDT);
    // await createData(TOKEN_PAIRS.BNB_USDT);
    // await createData(TOKEN_PAIRS.ETC_USDT);
    // await createData(TOKEN_PAIRS.MATIC_USDT);
    // await createData(TOKEN_PAIRS.CELO_USDT);

    console.log('seedingSticks done');
};

const createData = async (name: string) => {
    const product = await ProductModel.findOne({ code: TOKEN_PAIRS[name] });
    const sticks = basicTokensForUSDT[name];

    // const _1m = (await sticks._1m()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_MINUTE;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _5m = (await sticks._5m()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.FIVE_MINUTE;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _15m = (await sticks._15m()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.FIXTEEN_MINUTE;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _30m = (await sticks._30m()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.THIRTY_MINUTE;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _1h = (await sticks._15m()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_HOUR;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    const _4h = (await sticks._4h()).map((stick: Stick) => {
        stick.granularity = GRANULARITY.FOUR_HOURS;
        stick.productId = product.id;
        stick.productCode = product.code;

        return stick;
    });

    console.log(_4h);

    // const _1d = (await sticks._1d()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_DAY;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _1w = (await sticks._1w()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_WEEK;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _1M = (await sticks._1M()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_MONTH;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;

    //     return stick;
    // });

    // const _1y = (await sticks._1Y()).map((stick: Stick) => {
    //     stick.granularity = GRANULARITY.ONE_YEAR;
    //     stick.productId = product.id;
    //     stick.productCode = product.code;
    //     return stick
    // });

    console.log(`Add ${name}`);
    // console.log("add year ...")
    // await StickModel.insertMany(_1y);

    // console.log("add month ...")
    // await StickModel.insertMany(_1M);

    // console.log("add week ...")
    // await StickModel.insertMany(_1w);

    // console.log("add day ...")
    // await StickModel.insertMany(_1d);

    // console.log("add 4h ...")
    // await StickModel.insertMany(_4h);

    // console.log("add 1h ...")
    // await StickModel.insertMany(_1h);

    // console.log("add 30m ...")
    // await StickModel.insertMany(_30m);

    // console.log("add 15m ...")
    // await StickModel.insertMany(_15m);

    // console.log("add 5m ...")
    // await StickModel.insertMany(_5m);

    // console.log("add 1m ...")
    // await StickModel.insertMany(_1m);

    console.log(`Added ${name} ----> OK`);
};
