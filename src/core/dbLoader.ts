import mongoose, { Connection } from 'mongoose';
import MongoTransport from 'winston-mongodb';

class DatabaseLoader {
    private connection: Connection | null = null;
    private dbUri: string = null;
    private logDbUri: string = null;

    constructor(dbUri: string, logDbUri: string) {
        if (typeof dbUri !== 'string') {
            throw new Error('Invalid database URI');
        }

        this.dbUri = dbUri;
        this.logDbUri = logDbUri;
        this.connection = mongoose.createConnection(this.dbUri, {
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        // LogHelper.getHeading("----- Db Connected -----");
    }

    public getConnection() {
        return this.connection;
    }

    public transportLog = () =>
        new MongoTransport.MongoDB({
            db: this.logDbUri,
            collection: 'errorlog',
            level: 'error',
            tryReconnect: true,
            options: { useUnifiedTopology: true },
        });
}

export default DatabaseLoader;
