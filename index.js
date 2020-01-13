// install express and cors (npm packages)
// STEP 1: flesh out a dummy server
// STEP 2: flesh out the five endpoints (will use those helpers)

// imports
const express = require('express') // commonjs equivalent to "import express from 'express'"
const cors = require('cors')

const { find, findById, add, remove, update } = require('./data/hubs-model')

// instantiate an express app
const app = express()

// plug extra functionality to our app
// we need to be able to read req.body
app.use(express.json())
// we need to enable CORS so this server works for all origins
app.use(cors())

app.get('/hubs', (req, res) => {
  // GET all hubs, no extra info needed (id etc)
  find()
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      })
    })
})

app.get('/hubs/:id', (req, res) => {
  // GET a hub by its id, which is a parameter of the path
  const { id } = req.params
  findById(id)
    .then(data => {
      // two things can happen: id exists or not
      // id exists: we just res.json the data
      // id does not exist: we just res.json a 404
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'we can not find that hub'})
      }
    })
    .catch(error => {
      // crashes and such
      // res.json the error message and stack
      console.log(error);
    })
})

app.post("/hubs", (req, res) => {
  // POST a new hub using the request body
  const newHub = req.body
})

app.delete("/hubs/:id", (req, res) => {
  // DELETE a hub by its id
  const { id } = req.params
});

app.put("/hubs/:id", (req, res) => {
  // PUT a hub by id using the request body
  const { id } = req.params
  const replacementHub = req.body
});

// write a dummy endpoint
app.get('/', (req, res) => {
  // callback takes two args:
  // req -> object from which we can gather all details about the request
  // res -> object with useful methods (for example to respond!!)
  // end() send(ANYTHING) json(JSON)
  res.json('this is the response')
})

// we need code to spin up the server and just have it listen for incoming
app.listen(6000, () => {
  console.log('listening on 6000');
})