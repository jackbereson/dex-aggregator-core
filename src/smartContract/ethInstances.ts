import Contract from './main.contract';

const bscTestnetInstance = new Contract(process.env.TESTNET_BSC_RPC_URL);

export { bscTestnetInstance };
