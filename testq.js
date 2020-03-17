const amqp = require('amqplib');

const connstr = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}/${process.env
    .RABBITMQ_VHOST || ''}`;
amqp.connect(connstr).then(conn => {
    conn.createChannel().then(ch => {
        console.log(ch);
        process.exit(0);
    });
});
