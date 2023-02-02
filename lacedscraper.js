const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    getPayout: function(input,size) {
      return new Promise((resolve, reject) => {
        //the base for a search where the shoe being search can be appended onto the end
        const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=${size}&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
        const searchurl = base + encodeURIComponent(input);
        request({
          url: searchurl
        }, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            // Find the script element that contains the JSON-LD object
            //console.log(searchurl);
            //console.log(response.body);
            const rep = JSON.parse(response.body);
            const firstProduct = rep.products[0];
            const price = firstProduct.price;

            // Extract the text content of the element
    
            //const jsonLdText = jsonLdElement.text();
    
            // Parse the text as JSON
    
            //const jsonLd = JSON.parse(jsonLdText);
    
            // Extract the price from the JSON object
            //const price = jsonLd.offers.price - jsonLd.offers.price * 0.12 - jsonLd.offers.price * 0.03 - 6.99;


    
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
                url: searchurl
              }, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                  const $ = cheerio.load(html);
          
                  // Find the script element that contains the JSON-LD object
                  
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
    }
};
