import express from 'express'
import request from 'request'
import cors from 'cors'
import {MongoClient} from 'mongodb'

const uri  = 'mongodb+srv://Siciliamia:Siciliamia@cluster0.p50nxkz.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const port = 3000
const app = express()
 
app.use(cors)
app.use(express.json())

app.get('/', function (req, res) {
    res.send("Hello from the server");
})

app.use("*", (req, res) => res.status(404).json({error: "not found"}))

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

async function findAPIByName(client, APIName) {
    await client.connect()
    const result = await client.db('APIsdb').collection('APIsCollection')
    .findOne({API: APIName})

    console.log(result)
}

async function findAPIdata(client) {
    await client.connect()
    const result = await client.db('APIsdb').collection('APIsCollection')
    .find({}).sort({length: -1}).limit(20).toArray()
    console.log(result)
}

app.get('/', (req, res) => {
    res.send('welcome')
})

findAPIByName(client, 'Axolotl')

findAPIdata(client)

app.listen(port, () => {console.log(`Server running at https://${hostname}:${port}/`)})
