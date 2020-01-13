const express = require('express');
const server = express();
const Hubs = require('./data/hubs-model.js');


//Middle Ware 
server.use(express.json());

server.get('/', function(request, response) {
response.send({ hello: "Web 25!"})
})

server.get('/api/hubs', (req, res) => {
  Hubs.find()
  .then(hubs => {
      console.log('where am i')
      res.status(200).json(hubs);
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: "sorry there was a problem getting the list of Hubs"})
  })
})

server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
      .then(hub => {
        res.status(201).json(hub);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error creating the hub',
        });
      });
  });

  server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(deleted => {
        // res.status(204).end();
        res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n `));