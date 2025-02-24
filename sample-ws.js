/* eslint-disable no-console */
const WebSocket = require('ws');

const PORT = 8080;
const websocketURL = `ws://localhost:${PORT}`;

// Hiển thị URL WebSocket đầy đủ
console.log(`WebSocket Server is running at ${websocketURL}`);
// Tạo một WebSocket server lắng nghe cổng 8080
const wss = new WebSocket.Server({ port: PORT });

// Hàm này sẽ được gọi mỗi khi có một kết nối mới từ một client
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Gửi tin nhắn ban đầu khi có kết nối
    const initialMessage = {
        channel: '/topic/ticks/BNB-VIC/FIFTEEN_MIN',
    };

    ws.send(JSON.stringify(initialMessage));
    ws.send(JSON.stringify(genData()));

    // Gửi dữ liệu phản hồi ngẫu nhiên mỗi phút
    const intervalId = setInterval(() => {
        const responseMessage = generateRandomData();

        ws.send(JSON.stringify(responseMessage));
        // console.log(responseMessage.timeStamp);
    }, 1000); // 1 phút

    // Hàm này được gọi khi kết nối bị đóng
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Xóa bộ đếm thời gian khi kết nối đóng
    });
});
