import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import * as awilix from 'awilix';
import { HelloService } from './services/hello-service.js';
import { HelloController } from './controllers/hello-controller.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
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
    });

const port = process.env.NODE_PORT || 3000;
httpServer.listen(port);
console.log(`Listening on http://localhost:${port}`);

// Setup routes
router.get('/test', async (req, res) => await container.cradle.helloController.sayHi(req, res));
