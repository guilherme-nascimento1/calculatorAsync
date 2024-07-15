const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB");

        const database = client.db("testDB");
        const collection = database.collection("testCollection");
        const doc = { name: "test", value: 1 };

        const result = await collection.insertOne(doc);
        console.log(`Documento inserido com o _id: ${result.insertedId}`);
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB ou ao inserir documento:", err);
    } finally {
        await client.close();
    }
}

run();
