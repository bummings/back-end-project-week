const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());

// R O O T
server.get('/', (req, res) => {
  res.send('This is the API root route.');
});

// G E T   A L L   N O T E S
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json(err));
});

// P O S T
server.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db('notes')
    .insert({ title, content })
    .then(() => {
      res.status(201).json({ message: 'successfully added note' });
    })
    .catch(err => res.send(err));
});

module.exports = server;