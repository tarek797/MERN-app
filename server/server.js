const express = require('express')
const app = express()
const port = 5000
const request = require('request')
const MongoClient = require('mongodb').MongoClient

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

app.listen(port, () => {console.log(`server is running on port ${5000}`)})
