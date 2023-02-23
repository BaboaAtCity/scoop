const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    getPayout: function(input,size) {
      return new Promise((resolve, reject) => {
        //the base for a search where the shoe being search can be appended onto the end
        const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=${size}&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
        const searchurl = base + encodeURIComponent(input);
        request({
          url: searchurl,
          timeout: 10000
        }, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            //const $ = cheerio.load(html);
    
            const rep = JSON.parse(response.body);
            const firstProduct = rep.products[0];
            const price = firstProduct.price;



    
            resolve(price);
          } else {
            reject(error);
          }
        });
      });
    },
    getAll: function(name, size) {
        return new Promise((resolve, reject) => {
            const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=${size}&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
            const searchurl = base + encodeURIComponent(name);
          
            request({
                url: searchurl,
                timeout: 10000 
              }, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                  //const $ = cheerio.load(html);
          
                  
                  const rep = JSON.parse(response.body);
                  const data = rep.products[0];
                  console.log(rep);
                  console.log(data);

                  resolve(data);
                } else {
                  reject(error);
                }
            });
        });
    },
    getEbay: function(name, size) {
      return new Promise((resolve, reject) => {
        const q = name.replace(/\s+/g, '+');
        const searchurl = `https://www.ebay.co.uk/sch/i.html?_from=R40&_nkw=${q}&_sacat=0&LH_TitleDesc=0&LH_PrefLoc=1&LH_ItemCondition=3&LH_Complete=1&LH_Sold=1&rt=nc&UK%2520Shoe%2520Size=${size}&_dcat=15709`;
    
        request({
          url: searchurl,
          timeout: 10000 
        }, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const elements = $(".s-item__price .POSITIVE");
            const prices = [];
            elements.each((i, el) => {
              const price = parseInt($(el).text().replace("£", ""));
              if (!isNaN(price)) {
                prices.push(price);
              }
            });
            const avgPrice = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    
            resolve(avgPrice);
          } else {
            reject(error);
          }
        });
      });
    },
    getEbayMedian: function(name, size) {
      return new Promise((resolve, reject) => {
        const q = name.replace(/\s+/g, '+');
        const searchurl = `https://www.ebay.co.uk/sch/i.html?_from=R40&_nkw=${q}&_sacat=0&LH_TitleDesc=0&LH_PrefLoc=1&LH_ItemCondition=3&LH_Complete=1&LH_Sold=1&rt=nc&UK%2520Shoe%2520Size=${size}&_dcat=15709`;
    
        request({
          url: searchurl,
          timeout: 10000 
        }, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
        
            const elements = $(".s-item__price .POSITIVE");
            const prices = [];
            elements.each((i, el) => {
              const price = parseInt($(el).text().replace("£", ""));
              if (!isNaN(price)) {
                prices.push(price);
              }
            });
            prices.sort((a, b) => a - b);
            const medianPrice = (prices[Math.floor(prices.length / 2)] + prices[Math.ceil(prices.length / 2) - 1]) / 2;
        
            resolve(medianPrice);
          } else {
            reject(error);
          }
        });        
      });
    }
    
};
