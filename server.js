const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());

app.get('/api/place/hotels', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+hotels&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
    );
    res.send(response.data);
  } catch (error) {
    console.error('Error searching Google Places API:', error);
    res.status(500).send('Error searching Google Places API');
  }
});

app.get('/api/place/restaurants', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+restaurants&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
    );
    res.send(response.data);
  } catch (error) {
    console.error('Error searching Google Places API:', error);
    res.status(500).send('Error searching Google Places API');
  }
});

app.get('/api/place/attractions', async (req, res) => {
  try {
    const { query } = req.query;
    const placeTypes = ['museum', 'park', 'art_gallery', 'church', 'zoo'];
    const allResults = [];

    for (let i = 0; i < placeTypes.length; i++) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+${placeTypes[i]}&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
      );
      allResults.push(...response.data.results);
    }
    res.send({ results: allResults });
  } catch (error) {
    console.error('Error searching Google Places API:', error);
    res.status(500).send('Error searching Google Places API');
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
