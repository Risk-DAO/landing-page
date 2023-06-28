const express = require('express')
const axios = require('axios')


const app = express()

const cache = {
    json: null,
    lastUpdate: 0
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/medium', async (req, res) => {
    try {
        if (!cache.json || cache.lastUpdate < Date.now() - 1000 * 3600) {
            console.log('calling medium');
            const mediumJson = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Frisk-dao");
            cache.json = mediumJson.data;
            cache.lastUpdate = Date.now();
        }
        else { console.log('retrieving from cache') };
        res.json(cache.json);
    }
    catch (e) {
        console.error(e);
        res.status(503).json({ error: 'api error', message: e })
    }
})

const PORT = process.env.PORT || 4050
app.listen(PORT, () => console.log(`listening on ${PORT}`))