// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)

// imports
const express = require('express') // commonjs equivalent to "import express from 'express'"
const cors = require('cors')

// instantiate an express app
const app = express()

// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json())
// we need to enable CORS so this server works for all origins
app.use(cors())

// write a dummy endpoint
app.get('/', (req, res) => {
  // callback takes two args:
  // req -> object from which we can gather all details about the request
  // res -> object with useful methods (for example to respond!!)
  // end() send() json()
  res.json('this is the response')
})

// we need code to spin up the server and just have it listen for incoming
app.listen(6000, () => {
  console.log('listening on 6000');
})