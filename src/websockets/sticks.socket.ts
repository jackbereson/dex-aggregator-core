/* eslint-disable no-console */
import WebSocket from 'ws';

import { pairService } from '@/matchingEngine/services/pairs.service';
import { productService } from '@/graphql/modules/product/product.service';
import { IProduct } from '@/graphql/modules/product/product.model';

// import { stickService } from '../graphql/modules/stick/stick.service';

export async function handleStickSocket(ws: WebSocket, productCode: string) {
    const product: IProduct = await productService.findOne({ code: productCode ?? 'BTC_USDT' });

    if (!product) return;

    if (!pairService) return;

    const pair = pairService.getPair(product.code);

    if (!pair) return;

    const intervalSticks = setInterval(async () => {
        // console.log('symbol', symbol);

        const sticks = pair.stickChart.getChartData();

        const lastStick = sticks[sticks.length - 1];

        // console.log('lastStick', lastStick);

        ws.send(JSON.stringify(lastStick));

        // console.log(responseMessage.timeStamp);
    }, 1000); // 1 phút

    // Hàm này được gọi khi kết nối bị đóng
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalSticks); // Xóa bộ đếm thời gian khi kết nối đóng
    });
}
