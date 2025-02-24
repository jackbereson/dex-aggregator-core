export type TokenTransferEventLog = {
    address: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    logIndex: number;
    removed: boolean;
    id: string;
    returnValues: {
        [key: string]: string; // Để hỗ trợ các khóa số như '0', '1', '2'
        from: string;
        to: string;
        value: string;
    };
    event: string;
    signature: string;
    raw: {
        data: string;
        topics: string[];
    };
};
