import axios from 'axios';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

class Contract {
    private providerUrl: string;
    private web3Instance: Web3 | null = null;
    private contractInstances: Map<string, any> = new Map();
    private addressSet: Set<string> = new Set();

    constructor(provider: string | any) {
        this.providerUrl = provider;
        this.web3Instance = this.createWeb3Instance();
    }

    private createWeb3Instance(): Web3 {
        return new Web3(
            new Web3.providers.WebsocketProvider(this.providerUrl, {
                // clientConfig: {
                //     keepalive: true,
                //     keepaliveInterval: 60000, // Ping server mỗi 60 giây để giữ kết nối
                // },
                // reconnect: {
                //     auto: true,
                //     delay: 5000, // 5 giây trước khi thử lại
                //     maxAttempts: 5, // Tối đa 5 lần thử lại
                // },
            }),
        );
    }

    private getWeb3(): Web3 {
        if (!this.web3Instance) {
            this.web3Instance = this.createWeb3Instance();
        }

        return this.web3Instance;
    }

    public getContract({ address, abi }: { address: string; abi: any }): any {
        const contractKey = `${address}_${JSON.stringify(abi)}`;

        if (!this.contractInstances.has(contractKey)) {
            const contract = new (this.getWeb3().eth.Contract)(abi, address);

            this.contractInstances.set(contractKey, contract);
        }

        return this.contractInstances.get(contractKey);
    }

    public async onEvents({
        name,
        abi,
        address,
        eventName,
        callback,
    }: {
        name: string;
        abi: any;
        address: string;
        eventName: string;
        callback: (data: any) => void;
    }): Promise<void> {
        try {
            console.log(`Connecting to Blockchain Event - ${name}`);
            const web3 = this.getWeb3();

            const isListening = await web3.eth.net.isListening();

            if (!isListening) {
                throw new Error('Web3 provider is not connected.');
            }

            const contract = this.getContract({ address, abi });

            contract.events[eventName]({}, (error: Error, eventData: any) => {
                if (error) {
                    console.error('Error while listening to event:', error.message);

                    return;
                }
                callback(eventData);
            });
        } catch (error) {
            console.error('Error in onEvents method:', error);
        }
    }

    public async createWallet(): Promise<{ address: string; privateKey: string }> {
        try {
            const web3 = this.getWeb3();
            const account = web3.eth.accounts.create();

            return { address: account.address, privateKey: account.privateKey };
        } catch (error) {
            return null;
        }
    }

    public async sendCoin({
        from,
        to,
        value,
        privateKey,
    }: {
        from: string;
        to: string;
        value: string;
        privateKey: string;
    }): Promise<TransactionReceipt> {
        try {
            const web3 = this.getWeb3();
            const tx = {
                from,
                to,
                value: web3.utils.toWei(value, 'ether'),
                gas: 21000,
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            if (!signedTx.rawTransaction) {
                throw new Error('Failed to sign transaction');
            }

            const receipt = await web3.eth
                .sendSignedTransaction(signedTx.rawTransaction)
                .on('transactionHash', (hash) => console.log(`Tx hash: ${hash}`))
                .on('error', (error) => {
                    throw new Error('Transaction failed: ' + error.message);
                });

            console.log('Transaction successful with hash:', receipt.transactionHash);

            return receipt;
        } catch (error) {
            console.error('Error sending coin:', error);
            throw error;
        }
    }

    public async onTransferTokenEvents({
        abi,
        address,
        callback,
    }: {
        abi: any;
        address: string;
        callback: (data: any) => void;
    }): Promise<void> {
        try {
            console.log(`Listening for transfer events on contract at ${address}`);
            const contract = this.getContract({ address, abi });

            contract.events.Transfer({}, (error: Error, eventData: any) => {
                if (error) {
                    console.error('Error while listening to Transfer event:', error.message);

                    return;
                }
                callback(eventData);
            });
        } catch (error) {
            console.error('Error in onTransferEvents method:', error);
        }
    }
    public addAddress(address: string): void {
        if (!this.isValidAddress(address)) {
            console.error(`Invalid address: ${address}`);

            return;
        }

        if (!this.addressSet.has(address.toLowerCase())) {
            this.addressSet.add(address.toLowerCase());
            console.log(`Address added: ${address}`);
        }
    }

    public addAddresses(addresses: string[]): void {
        const validAddresses = addresses.filter((address) => this.isValidAddress(address));

        validAddresses.forEach((address) => {
            if (!this.addressSet.has(address.toLowerCase())) {
                this.addressSet.add(address.toLowerCase());
            }
        });
    }

    private isValidAddress(address: string): boolean {
        const web3 = this.getWeb3();

        return web3.utils.isAddress(address);
    }
    public removeAddress(address: string): void {
        this.addressSet.delete(address.toLowerCase());
        console.log(`Address removed: ${address}`);
    }

    public async onEtherReceivedMultiple({
        callback,
    }: {
        callback: (data: any) => void;
    }): Promise<void> {
        try {
            const endpoint = 'https://go.getblock.io/6d07172e212f4455a9d851c262033aeb';

            const query = `
            query GetBalances($addresses: [String!]!) {
                ethereum {
                    address(addresses: $addresses) {
                        balance
                        transactionCount
                    }
                }
            }
        `;

            const variables = {
                addresses: Array.from(this.addressSet), // Chuyển Set thành mảng
            };

            const response = await axios.post(
                endpoint,
                {
                    query,
                    variables,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data.errors) {
                throw new Error(`GraphQL Error: ${JSON.stringify(response.data.errors)}`);
            }

            callback(response.data.data);
        } catch (error) {
            console.error('Error in onEtherReceivedMultiple method:', error);
        }
    }
}

export default Contract;
