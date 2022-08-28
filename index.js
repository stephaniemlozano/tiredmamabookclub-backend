import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'


/*----- DATABASE CONNECTION -----*/
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('reviews')
const books = database.collection('books')
client.connect()
console.log('connected to mdb!')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('we runnin on port', PORT))


/*----- GET ALL BOOKS -----*/
app.get('/', async (request, response) => {
  const allBooks = await books.find().toArray()
  response.send(allBooks)
})


/*----- POST/ADD A BOOK -----*/
app.post('/', async (request, response) => {
  await books.insertOne(request.body)
  response.send('book added')
})


/*----- UPDATE A BOOK -----*/
app.put('/', async (request, response) => {
  await books.findOneAndUpdate(request.query, {$set: request.body})
  response.json('book updated')
})


/*----- DELETE A BOOK -----*/
app.delete('/', async (request, response) => {
  await books.findOneAndDelete(request.query)
  response.send('book deleted')
})