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
    console.log("handling query for laced price, name: "+ req.query.name +", size:" + req.query.size + ", from: " + req.ip );
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
    console.log("handling query for laced first result, name: "+ req.query.name +", size:" + req.query.size + ", from: " + req.ip );
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
    console.log("handling query for ebay mean price, name: "+ req.query.name +", size:" + req.query.size + ", from: " + req.ip );
    lacedscraper.getEbay(input ,size)  
    .then(price => {
      res.send({ price });
    })
    .catch(error => {
      res.send({ error });
    });
  });

  app.get('/api/searchEbayMedian', (req, res) => {
    const input = req.query.name;
    const size = req.query.size;
    console.log("handling query for ebay median price, name: "+ req.query.name +", size:" + req.query.size + ", from: " + req.ip );
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
  