/* eslint-disable no-console */
import { Kafka, Producer, EachMessagePayload, Consumer, Partitioners } from 'kafkajs';
import mongoose from 'mongoose';

import { spotOrderService } from '@/graphql/modules/spotOrder/spotOrder.service';
import { SpotOrderStatus } from '@/graphql/modules/spotOrder/spotOrder.model';
import { SpotTransactionModel } from '@/graphql/modules/spotTransaction/spotTransaction.model';
import { Logger } from '@/core/logger';

class KafkaService {
    private kafka: Kafka;
    private producer: Producer;
    private pendingConsumer: Consumer;
    private completeConsumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'default-client-id',
            brokers: (process.env.KAFKA_BROKERS || '').split(','),
        });

        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner,
        });

        this.pendingConsumer = this.kafka.consumer({
            groupId: process.env.KAFKA_TOPIC_SPOT_ORDER_GROUP || 'default-group',
            heartbeatInterval: 3000,
            sessionTimeout: 30000,
        });

        this.completeConsumer = this.kafka.consumer({
            groupId: `${process.env.KAFKA_TOPIC_SPOT_ORDER_GROUP || 'default-group'}-complete`,
        });
    }

    async sendMessage(topic: string, messages: string[]): Promise<void> {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic,
                messages: messages.map((msg) => ({ value: msg })),
            });
        } catch (error) {
            console.error('Error sending Kafka message:', error);
        }
    }

    async subscribeAndProcessPendingTopic(): Promise<void> {
        try {
            const pendingTopic =
                process.env.KAFKA_TOPIC_SPOT_ORDER_PENDING || 'default-pending-topic';

            await this.pendingConsumer.connect();
            await this.pendingConsumer.subscribe({ topic: pendingTopic, fromBeginning: true });

            await this.pendingConsumer.run({
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                    const rawData = message.value?.toString() || '';

                    try {
                        const processedData = rawData;

                        await this.sendMessage(pendingTopic, [processedData]);
                    } catch (error) {
                        console.error('[PendingConsumer] Error processing message:', error);
                    }
                },
            });
        } catch (error) {
            console.error('Error in subscribeAndProcessPendingTopic:', error);
        }
    }

    async subscribeAndProcessCompleteTopic(): Promise<void> {
        try {
            const completeTopic =
                process.env.KAFKA_TOPIC_SPOT_ORDER_COMPLETE || 'default-complete-topic';

            await this.completeConsumer.connect();
            await this.completeConsumer.subscribe({ topic: completeTopic, fromBeginning: true });

            await this.completeConsumer.run({
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                    const messageValue = message.value?.toString();

                    if (!messageValue) return;

                    try {
                        const resolvedData = JSON.parse(messageValue);

                        if (!resolvedData) return;

                        const { status, transaction } = resolvedData;
                        const orderId = new mongoose.Types.ObjectId(transaction.id);

                        if (status === 'done') {
                            const order: any = await spotOrderService.updateOne(orderId, {
                                status: SpotOrderStatus.FILLED,
                                size: transaction.origSize,
                                makerQty: transaction.makerQty,
                                takerQty: transaction.takerQty,
                            });

                            await SpotTransactionModel.create({
                                orderId,
                                customerId: order.customerId,
                                size: transaction.size,
                                origSize: transaction.origSize,
                                price: transaction.price,
                                makerQty: transaction.makerQty,
                                takerQty: transaction.takerQty,
                            });
                        } else if (status === 'partial') {
                            const order: any = await spotOrderService.updateOne(orderId, {
                                $set: {
                                    status: SpotOrderStatus.PARTIAL,
                                    makerQty: transaction.makerQty,
                                    takerQty: transaction.takerQty,
                                },
                                $inc: {
                                    size: transaction.partialQuantityProcessed,
                                },
                            });

                            await SpotTransactionModel.create({
                                orderId,
                                customerId: order.customerId,
                                size: transaction.partialQuantityProcessed,
                                origSize: transaction.origSize,
                                price: transaction.price,
                                makerQty: transaction.makerQty,
                                takerQty: transaction.takerQty,
                            });
                        }
                    } catch (error) {}
                },
            });
        } catch (error) {
            console.error('Error in subscribeAndProcessCompleteTopic:', error);
        }
    }
}

const kafkaServiceInstance = new KafkaService();

export default kafkaServiceInstance;

export const startKafkaService = async () => {
    try {
        await kafkaServiceInstance.subscribeAndProcessPendingTopic();

        await kafkaServiceInstance.subscribeAndProcessCompleteTopic();
    } catch (error) {
        Logger.error('❌ Error starting Kafka Service:', error);
        // process.exit(1);
    }
};

(async () => {
    await startKafkaService();
})();
