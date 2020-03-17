import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import amqp from 'amqplib';
import * as awilix from 'awilix';
import { MongoClient } from 'mongodb';
import { HelloService } from './services/hello-service.js';
import { HelloController } from './controllers/hello-controller.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    mongodbProvider: awilix.asFunction(() => {
        if (!process.env.MONGODB_HOST || !process.env.MONGODB_LOGINDB || !process.env.MONGODB_USER || !process.env.MONGODB_PASS) {
            throw new Error('MongoDB env vars are required: MONGODB_HOST & MONGODB_LOGINDB & MONGODB_USER & MONGODB_PASS');
        }
        return {
            connect: async () => {
                return new Promise((res, rej) => {
                    try {
                        const connstr = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_LOGINDB}?retryWrites=true&=majority`;
                        console.log(`Connecting to DB with connstr: ${connstr}`);
                        MongoClient.connect(
                            connstr,
                            {
                                useUnifiedTopology: true
                            },
                            (err, client) => {
                                if (err) rej(err);
                                else {
                                    res(client.db(process.env.MONGODB_NAME || 'database'));
                                }
                            }
                        );
                    } catch (err) {
                        rej(err);
                    }
                });
            }
        };
    }),
    pubSubQueueProvider: awilix.asFunction(() => {
        if (!process.env.RABBITMQ_HOST || !process.env.RABBITMQ_USER || !process.env.RABBITMQ_PASS) {
            throw new Error(
                'RabbitMQ env vars are required: RABBITMQ_HOST & RABBITMQ_USER & RABBITMQ_PASS (RABBITMQ_VHOST is available, but optional)'
            );
        }
        return {
            connect: async () => {
                const connstr = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}/${process.env
                    .RABBITMQ_VHOST || ''}`;
                console.log(`Connecting to Queue with connstr: ${connstr}`);
                const conn = await amqp.connect(connstr);
                return await conn.createChannel();
            }
        };
    }),
    helloController: awilix.asClass(HelloController),
    helloService: awilix.asClass(HelloService)
});

const app = express();
const router = express.Router();
const httpServer = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }))
    .use(
        cors({
            origin: process.env.ORIGINS || '*'
        })
    )
    .use(bodyParser.json())
    .use('/api', router)
    .get('/', (req, res) => {
        const pkg = require('../package.json');
        res.send(`<h1>${pkg.name}</h1>
        <h2>Version: ${pkg.version}</h2>`);
    })
    .get('/status', async (req, res) => {
        let result = '';
        try {
            await container.cradle.mongodbProvider.connect();
            result += 'DB connection: Successful<br />';
        } catch (err) {
            result += `DB connection: Error: ${err}<br />`;
            console.error('DB connection failed', err);
        }

        try {
            var channel = await container.cradle.pubSubQueueProvider.connect();
            if (channel) {
                result += 'Queue channel connection: Successful<br />';
            } else {
                result += 'Queue channel connection: Failed<br />';
            }
            channel.close();
        } catch (err) {
            result += `Queue channel connection: ${err}<br />`;
            console.error('Queue connection failed', err);
        }
        res.send(result);
    });

const port = process.env.NODE_PORT || 3000;
httpServer.listen(port);
console.log(`Listening on http://localhost:${port}`);

// Setup routes
router.get('/test', async (req, res) => await container.cradle.helloController.sayHi(req, res));
