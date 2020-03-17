const amqp = require('amqplib');
console.log(process.argv);

const connstr = `amqp://${process.argv[4]}:${process.argv[5]}@${process.argv[2]}/${process.argv[3]}`;
amqp.connect(connstr).then(conn => {
    conn.createChannel().then(ch => {
        console.log(ch);
        process.exit(0);
    });
});
