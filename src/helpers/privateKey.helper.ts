// Hàm mã hóa privateKey
export function encryptPrivateKey(privateKey: string): string {
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const key = process.env.ENCRYPTION_KEY; // Đảm bảo lưu khóa này an toàn
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptPrivateKey(encrypted: string): string {
    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    const key = process.env.ENCRYPTION_KEY; // Đảm bảo khóa giống với lúc mã hóa

    // Tách chuỗi IV và dữ liệu mã hóa
    const [ivHex, encryptedData] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex'); // Chuyển đổi IV về Buffer

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted; // Trả về privateKey gốc
}
