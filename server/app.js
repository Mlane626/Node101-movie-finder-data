const express = require('express');
const morgan = require('morgan')
const axios = require('axios');
let cache = {};

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {

    if(!cache[req.url]) {
        axios.get('http://www.omdbapi.com' + req.url + '&apikey=a7a9001f')
        .then(response =>  {
            cache[req.url] = response.data;
            res.send(response.data);
        })
        .catch(error => res.send(error.message)); 
     } else {
         res.send(cache[req.url]);
     }
});

module.exports = app;

