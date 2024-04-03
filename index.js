const express = require('express');
const app=express();
const Datastore = require('nedb');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(3000, ()=>{
console.log(`starting server at ${port}`);
});

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore ('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
    
});

app.post('/api', (request, response) =>{
    console.log('i got a request')
    const data=request.body;
    const timestamp = Date.now();
    data.timestamp=timestamp;
    database.insert(data);
    response.json(data);
});

app.get('/weather/:latlon', async (request, response) =>{
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat= latlon[0];
    const lon= latlon[1];
    console.log(lat , lon);
    const api_key = process.env.API_KEY;
    const weather_url=`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${lat},${lon}&days=3&aqi=yes&alerts=yes`;
    const weather_response = await fetch (weather_url);
    const weather_data = await weather_response.json();
    
    const aq_url=`https://api.openaq.org/v3/locations?order_by=id&sort_order=asc&coordinates=${lat}%2C${lon}&radius=25000&limit=100&page=1`;
    const aq_response = await fetch (aq_url);
    const aq_data = await aq_response.json();
    
    const data = {
        weather: weather_data,
        air_quality: aq_data,
    }
    response.json(data);
});