const express = require('express');
const app = express();
const lacedscraper = require('./lacedscraper.js');
let port = process.env.PORT || 3000;

app.get('/api/search', (req, res) => {
    const input = req.query.name;
    const size = req.query.size;
    lacedscraper.getPayout(input ,size)  
    .then(price => {
      res.send({ price });
    })
    .catch(error => {
      res.send({ error });
    });
  });

  app.get('/api/searchAll', (req, res) => {
    const input = req.query.name;
    const size = req.query.size;
    lacedscraper.getAll(input ,size)  
    .then(data => {
      res.send({ data });
    })
    .catch(error => {
      res.send({ error });
    });
  });
  
  

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
  