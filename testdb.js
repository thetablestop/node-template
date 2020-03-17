const MongoClient = require('mongodb');
console.log(process.argv);

const connstr = `mongodb+srv://${process.argv[4]}:${process.argv[5]}@${process.argv[2]}/${process.argv[3]}?retryWrites=true&=majority`;
MongoClient.connect(
    connstr,
    {
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) console.error(err);
        else {
            const conn = client.db(process.env.MONGODB_NAME || 'database');
            console.log(conn.databaseName);
            process.exit(0);
        }
    }
);
