const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// import { questions } from './routes/questions'
// import cors from 'cors'
// import * as dotenv from 'dotenv'

//import Routes
const questions = require('./routes/questions/services')
mongoose.connect("mongodb+srv://testboy:Rhino94@restapi.6e8x1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))
const app = express()
app.use(cors())
app.use('/posts', questions);

app.listen("5000", () => {
    console.log("The API is running...")
})