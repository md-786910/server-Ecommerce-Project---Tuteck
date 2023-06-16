const express = require("express");
const request = require("request-promise");

const productRouter = express.Router();
const returnScraperApiUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Welcome route
const api_key = process.env.API_KEY_SCRAPPER;

productRouter.get("/", async (req, res) => {
  res.send("Welcome to Amazon Scraper API!");
});

// Get product details
productRouter.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  //   const { api_key } = req.query;

  try {
    const response = await request(
      `${returnScraperApiUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get search results
productRouter.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  //   const { api_key } = req.query;
  try {
    const response = await request(
      `${returnScraperApiUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

module.exports = productRouter;
