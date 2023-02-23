const express = require('express');
console.log('require express');
const app = express();
console.log('app = express');
const lacedscraper = require('./lacedscraper.js');
console.log('laced scraper require');
let port = process.env.PORT || 3000;
console.log('ported');
console.log('imported');

app.get('/api/search', (req, res) => {
    const input = req.query.name;
    const size = req.query.size;
    console.log("handling query");
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

  app.get('/api/searchEbay', (req, res) => {
    const input = req.query.name;
    const size = req.query.size;
    console.log("handling query");
    lacedscraper.getEbay(input ,size)  
    .then(price => {
      res.send({ price });
    })
    .catch(error => {
      res.send({ error });
    });
  });
  
  

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
  