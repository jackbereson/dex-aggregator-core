/* eslint-disable no-console */
import express from 'express';
import WebSocket from 'ws';

import http from 'http';

import { handleStickSocket } from '../websockets/sticks.socket';
import { handleOrdebookSocket } from '../websockets/orderbooks.socket';

import { handleMarketTradesSocket } from '@/websockets/marketTrades.socket';
import { UtilsHelper } from '@/helpers';

class WebsocketLoader {
    public app: express.Express;
    private server: http.Server;
    private wss: WebSocket.Server;
    public ws: WebSocket;
    private subscriptions: Map<WebSocket, Set<string>>;

    constructor(app: express.Express) {
        this.app = app;
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.subscriptions = new Map();
    }

    public configure(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            this.subscriptions.set(ws, new Set());
            ws.on('message', (message: string) => {
                try {
                    if (!UtilsHelper.isJSON(message)) return;

                    const parsedMessage = JSON.parse(message);
                    const { type, channel } = parsedMessage;

                    switch (type) {
                        case 'subscribe':
                            if (channel) {
                                this.subscribe(ws, channel);
                            }
                            break;
                        case 'unsubscribe':
                            if (channel) {
                                this.unsubscribe(ws, channel);
                            }
                            break;
                        default:
                            console.log('Unknown message type');
                    }
                } catch (error) {
                    console.log(error, 'Error');
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    private subscribe(ws: WebSocket, channel: string): void {
        const clientSubscriptions = this.subscriptions.get(ws);

        if (ws.readyState !== WebSocket.OPEN) {
            return;
        }

        if (clientSubscriptions) {
            clientSubscriptions.add(channel);
            // console.log('channel', channel);
            // Handle different channel subscriptions
            if (channel.startsWith(SOCKET_PATHS.STICKS)) {
                const [, symbol] = channel.split(SOCKET_PATHS.STICKS);

                // console.log('symbol', symbol);
                handleStickSocket(ws, symbol);
            } else if (channel.startsWith(SOCKET_PATHS.ORDERBOOK)) {
                const [, symbol] = channel.split(SOCKET_PATHS.ORDERBOOK);

                // console.log('symbol', symbol);
                handleOrdebookSocket(ws, symbol);
            } else if (channel.startsWith(SOCKET_PATHS.MARKET_TRADES)) {
                const [, symbol] = channel.split(SOCKET_PATHS.MARKET_TRADES);

                // console.log('symbol', symbol);
                handleMarketTradesSocket(ws, symbol);
            }

            ws.send(
                JSON.stringify({
                    type: 'subscription_success',
                    channel,
                    message: `Subscribed to ${channel}`,
                }),
            );
        }
    }

    private unsubscribe(ws: WebSocket, channel: string): void {
        const clientSubscriptions = this.subscriptions.get(ws);

        if (clientSubscriptions && clientSubscriptions.has(channel)) {
            clientSubscriptions.delete(channel);
            ws.send(
                JSON.stringify({
                    type: 'unsubscription_success',
                    channel,
                    message: `Unsubscribed from ${channel}`,
                }),
            );
        }
    }

    public startServer(port: number): void {
        this.server.listen(port, () => {
            const websocketURL = `ws://localhost:${port}`;

            console.log(`WebSocket Server is running at ${websocketURL}`);
        });
    }
}

export default WebsocketLoader;

const SOCKET_PATHS = {
    STICKS: '/topic/ticks/',
    ORDERBOOK: '/orderbook_depth/orderbook/trade/',
    MARKET_TRADES: '/orderbook_depth/orderbook/market/',
};
