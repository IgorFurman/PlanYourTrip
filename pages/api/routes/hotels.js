const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    let allResults = [];
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+hotels&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`;

    while (url) {
      const response = await axios.get(url);
      allResults.push(...response.data.results);

      if (response.data.next_page_token) {
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${response.data.next_page_token}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        url = null;
      }
    }

    res.send({ results: allResults });
  } catch (error) {
    console.error('Error searching Google Places API:', error);
    res.status(500).send('Error searching Google Places API');
  }
})

module.exports = router;
