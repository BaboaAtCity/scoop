## Scoop |  API for Live Sneaker Payout Prices
This was built as a part of my disseration project. The goal was to provide accurate payout prices for UK based sneaker resellers. I used ExpressJS to make the server and open the port and in lacedscraper.js you can see the methods I used to scrape the data. Instead of scraping from the seller side of Laced I used the buyer's side data and deduct the fees, returning a complete {size : payout} response from one request. For eBay I followed the same approach with applying filters through the search url and getting a median on the sold listings.