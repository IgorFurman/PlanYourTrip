const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());


const hotelsRouter = require('./routes/hotels');
const restaurantsRouter = require('./routes/restaurants');
const attractionsRouter = require('./routes/attractions');
const detailsRouter = require('./routes/details');


app.use('/api/place/hotels', hotelsRouter);
app.use('/api/place/restaurants', restaurantsRouter);
app.use('/api/place/attractions', attractionsRouter);
app.use('/api/place/details', detailsRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
