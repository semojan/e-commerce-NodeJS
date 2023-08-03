const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDB (){
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    database = client.db("online-shop");
}

function getDb (){
    if (!database) {
        throw new Error('You must connect first!');
    }
    
    return database;
}

module.exports = {
    connectToDB: connectToDB,
    getDb: getDb
};
