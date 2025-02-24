/* eslint-disable no-console */
import WebSocket from 'ws';

import { productService } from '@/graphql/modules/product/product.service';
import { IProduct } from '@/graphql/modules/product/product.model';
import { pairService } from '@/matchingEngine/services/pairs.service';

export async function handleOrdebookSocket(ws: WebSocket, productCode?: string) {
    const product: IProduct = await productService.findOne({ code: productCode ?? 'BTC_USDT' });

    if (!product) return;

    if (!pairService) return;

    const pair = pairService.getPair(product.code);

    if (!pair) return;

    const interval = setInterval(async () => {
        const orderbook = pairService.getPair(product.code).getOrderBookStats();

        const responseMessage = {
            data: {
                asks: orderbook.asks
                    .map((ask) => [
                        ask.price,
                        ask.orders.reduce((acc, order) => acc + order.size, 0),
                    ])
                    .sort((a, b) => a[0] - b[0]),
                bids: orderbook.bids
                    .map((bid) => [
                        bid.price,
                        bid.orders.reduce((acc, order) => acc + order.size, 0),
                    ])
                    .sort((a, b) => b[0] - a[0]),
                productCode: productCode,
            },
            type: 'orderbook_depth',
        };

        ws.send(JSON.stringify(responseMessage));
    }, 1000);

    // Hàm này được gọi khi kết nối bị đóng
    ws.on('close', () => {
        console.log('Client disconnected from orderbook');
        clearInterval(interval);
    });
}
