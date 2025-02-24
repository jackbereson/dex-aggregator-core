import mongoose from 'mongoose';

// import { seedingSetting } from './setting.seed';
// import { seedingAdmin } from './admin.seed';
import { seedingProduct } from './product.seed';
import { currencyNetworksSeed, currencySeed } from './currency.seed';
// import { seedingSticks } from './stick.seed';

(async () => {
    if (mongoose.connections.length > 0) {
        const {
            // MIGRATE_SETTING,
            // MIGRATE_ADMIN,
            // MIGRATE_CHAIN_TOKEN,
            MIGRATE_PRODUCT,
            // MIGRATE_STICKS,
        } = process.env;
        // if (MIGRATE_SETTING) {
        //     await seedingSetting();
        // }
        //
        // if (MIGRATE_ADMIN) {
        //     await seedingAdmin();
        // }
        //
        //
        // if (MIGRATE_CHAIN_TOKEN) {
        //     await seedingChains();
        //     await seedingTokens();
        // }

        if (MIGRATE_PRODUCT) {
            await seedingProduct();
        }

        // if (MIGRATE_STICKS) {
        // await seedingSticks();
        // }

        // currencySeed();

        // currencyNetworksSeed();
    }
})();
