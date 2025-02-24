/* eslint-disable no-console */
import WebSocket from 'ws';

import { productService } from '@/graphql/modules/product/product.service';
import { IProduct } from '@/graphql/modules/product/product.model';
import { pairService } from '@/matchingEngine/services/pairs.service';

export async function handleMarketTradesSocket(ws: WebSocket, productCode?: string) {
    const product: IProduct = await productService.findOne({ code: productCode ?? 'BTC_USDT' });

    if (!product) return;

    if (!pairService) return;

    const pair = pairService.getPair(product.code);

    if (!pair) return;

    const interval = setInterval(async () => {
        const topOrders = pair.getTopOrders(200);

        const responseMessage = {
            data: {
                orders: topOrders,
                productCode: productCode,
            },
        };

        ws.send(JSON.stringify(responseMessage));
    }, 1000);

    // Hàm này được gọi khi kết nối bị đóng
    ws.on('close', () => {
        console.log('Client disconnected from orderbook');
        clearInterval(interval);
    });
}
