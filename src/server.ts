/* eslint-disable no-console */
import 'module-alias/register'; // 👈 add this one
import express from 'express';

import { LogHelper, Logger } from './core/logger';
import ExpressLoader from './loaders/express.loader';
import ApolloServerLoader from './graphql';
// import WebsocketLoader from './loaders/webSocket.loader';

class Server {
    constructor() {
        this.setupApp();
    }

    async setupApp() {
        const { app } = new ExpressLoader(express());

        LogHelper.getHeading();
        Logger.info('🐵🐵🐵 Load Source Successfully 🐵🐵🐵 \n');

        const apolloLoader = new ApolloServerLoader(app);

        apolloLoader.startGraphql();

        app.listen(app.get('port'), () => {
            LogHelper.logString(
                `\n🚀 App is running in ${app.get('env')} mode at`,
                `http://localhost:${app.get('port')}/graphql \n`,
            );
            console.log('  Press CTRL-C to stop\n');
        });

        // const wsLoader = new WebsocketLoader(app);

        // wsLoader.startServer(5555);
        // wsLoader.configure();
    }
}

// Usage
new Server();
import './loaders/contract.loader';
// import './init';
import './scheduler';
