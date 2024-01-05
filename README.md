## Scoop |  API for Live Sneaker Payout Prices
This repository serves as a solution developed as a part of my dissertation project, focusing on providing accurate payout prices for sneaker resellers based in the UK. The project utilizes ExpressJS's API capabilities, with the core scraping functionality encapsulated in lacedscraper.js. Notably, the method used isn't simply scraping the sale page. Instead I have parsed the React prop on the product page to be able to access the entire {size : price} map. A similar strategy is applied to eBay, where filters are applied through the search URL, and cheerio is used to extract the price of the sold listings by the use of a CSS Selector.

### How to Use

1. **Clone the Repository:**
    ```
    git clone https://github.com/BaboaAtCity/scoop.git
    ```

2. **Install Dependencies:**
    ```
    npm install
    ```

3. **Run the Server:**
    ```
    node .
    ```

4. **Access the API:**
    Open your browser and navigate to `http://localhost:3000`.

> [!WARNING]
> The scraping methods may no longer be working due to site changes from Laced or eBay.
