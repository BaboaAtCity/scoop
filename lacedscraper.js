const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    // retrieve payouts of all sizes of a product
    getPayoutAll: function(input) {
      return new Promise((resolve, reject) => {
        const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
        const searchurl = base + encodeURIComponent(input);
        request({
          url: searchurl,
          timeout: 10000
        }, (error, response) => {
          if (!error && response.statusCode == 200) {
            const rep = JSON.parse(response.body);
            const firstProduct = rep.products[0];
            const href = firstProduct.href;
            console.log(href);

            const productUrl = "https://www.laced.com" + href;
            request({
              url: productUrl,
              timeout: 10000
            }, (error, response , html) => {
              if (!error && response.statusCode == 200) {
                console.log(productUrl);
                const $ = cheerio.load(html);
                const prod = $('.product-hero__info > div:first-child')[0];
                const prodData = JSON.parse(prod.attribs['data-react-props']);
                const priceObj = prodData.sizeConversionIdsAndPrices;
                const sizeObj = prodData.allSizeConversions;

                const sizes = [];
                const prices = [];

                for (let i = 0; i < sizeObj.length; i++) {
                  const sizeId = sizeObj[i].id.toString();
                  const matchingPrice = priceObj.find(item => item.size_conversion_id.toString() === sizeId);
                  
                  if (matchingPrice) {
                    sizes.push(sizeObj[i].uk);
                    prices.push(matchingPrice.price);
                  }
                }

/*                 console.log(sizes);
                console.log(prices); */

                const sizePrice = {};
                for (let i = 0; i < sizes.length; i++) {
                  sizePrice[sizes[i]] = prices[i];
                }

                const sizePriceWithFee = {};
                const handlingFee = 0.12;
                const paymentFee = 0.03;
                const shippingFee = 6.99;


                for (const size in sizePrice) {
                  const originalPrice = parseFloat(sizePrice[size]);
                  const priceWithFee = originalPrice - (originalPrice * handlingFee) - (originalPrice * paymentFee) - shippingFee;
                  sizePriceWithFee[size] = priceWithFee.toFixed(2);
                }

                console.log(sizePriceWithFee);

                
                resolve({productUrl , sizePrice, sizePriceWithFee});
              } else {
                reject(error);
              }
            });
            






    
            
          } else {
            reject(error);
          }
        });
      });
    },
    // retrieve payout of a single size from laced
    getPayout: function(input,size) {
      return new Promise((resolve, reject) => {
        //the base for a search where the shoe being search can be appended onto the end
        const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=${size}&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
        const searchurl = base + encodeURIComponent(input);
        request({
          url: searchurl,
          timeout: 10000
        }, (error, response) => {
          if (!error && response.statusCode == 200) {
    
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
    // retrieve product info of first search result
    getAll: function(name, size) {
        return new Promise((resolve, reject) => {
            const base = `https://www.laced.com/search.json?search%5Bsizes%5D%5B%5D=${size}&search%5Bsorted_by%5D=relevance&search%5Bterm%5D=`;
            const searchurl = base + encodeURIComponent(name);
          
            request({
                url: searchurl,
                timeout: 10000 
              }, (error, response, html) => {
                if (!error && response.statusCode == 200) {
          
                  
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
    //retrieve  the ebay average price sold 
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
    // retrieve the ebay median price sold
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
