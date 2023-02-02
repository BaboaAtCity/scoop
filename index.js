const express = require('express');
const app = express();
const lacedscraper = require('./lacedscraper.js');

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
  
  

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
