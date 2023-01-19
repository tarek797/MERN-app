import express from 'express'
import request from 'request'
import cors from 'cors'
import {MongoClient} from 'mongodb'

const uri  = 'mongodb+srv://Siciliamia:Siciliamia@cluster0.p50nxkz.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const host = '127.0.0.1'
const port = 3000
const app = express()
 
app.use(express.json())

app.get('/', async function (req, res) {
    res.json(await findAPIdata(client)
    );
})

const APIName = 'Axolotl'

app.get('/target', async function (req, res) {
    res.json(await findAPIByName(client, APIName));
})

app.use("*", (req, res) => res.status(404).json({error: "not found"}))

async function findAPIByName(client, APIName) {
    await client.connect()
    const result = await client.db('APIsdb').collection('APIsCollection')
    .findOne({API: APIName})
    return result
}

async function findAPIdata(client) {
    await client.connect()
    const result = await client.db('APIsdb').collection('APIsCollection')
    .find({}).sort({length: -1}).limit(20).toArray()
    return result
}

function saveDataToMongodb() {
    async function createAPIsCollection(client, APIsArray) {
        const result = await client.db("APIsdb").collection('APIsCollection').insertMany(APIsArray)
        console.log(`${result.insertedCount} new documents with ids`)
        console.log(result.insertedIds)
    }
    
    request({
        url: 'https://api.publicapis.org/entries',
        json: true
    }, (err, response, body) => {
         const data = body.entries
         const uri  = 'mongodb+srv://Siciliamia:Siciliamia@cluster0.p50nxkz.mongodb.net/?retryWrites=true&w=majority'
         const client = new MongoClient(uri);
         createAPIsCollection(client, data)
    })
}

app.listen(port, host, () => {console.log(`Server running at ${host}:${port}/`)})
