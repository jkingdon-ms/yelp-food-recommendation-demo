const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const YELP_API_KEY = 'YOUR_YELP_API_KEY';
const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';

app.get('/restaurants', async (req, res) => {
    const { location, cuisine, limit } = req.query;

    try {
        const response = await axios.get(YELP_API_URL, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            },
            params: {
                location,
                term: cuisine,
                limit
            }
        });

        const restaurants = response.data.businesses.map(business => ({
            name: business.name,
            rating: business.rating,
            price: business.price,
            url: business.url
        }));

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});