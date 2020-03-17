const MongoClient = require('mongodb');

const connstr = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_LOGINDB}?retryWrites=true&=majority`;
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
