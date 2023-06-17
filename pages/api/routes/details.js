const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async(req, res) =>{
  try {
    const { placeId } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}&language=en`
    );
    res.send(response.data.result);
  } catch (error) {
    console.error('Error fetching place details from Google Places API:', error);
    res.status(500).send('Error fetching place details');
  }
})



module.exports = router;