export class HelloController {
    constructor({ helloService }) {
        this.service = helloService;
    }

    sayHi(req, res) {
        try {
            res.send(this.service.sayHi(`${req.protocol}://${req.hostname}:${req.socket.localPort}/api/test`));
        } catch (err) {
            console.err(err);
            res.sendStatus(500);
        }
    }
}
