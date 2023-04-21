const express = require('express');
const morgan = require('morgan')
const axios = require('axios');
let cache = {};



//---create my express server
const app = express();



//--- Put my middleware here
app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
    //res.send(200)
    if(!cache[req.url]) {
        axios.get('http://www.omdbapi.com' + req.url + '&apikey=a7a9001f')
        .then(response =>  {
            cache[req.url] = response.data;
            res.send(response.data);
         //    console.log(JSON.stringify(cache))
         // return cache 
        })
        .catch(error => res.send(error.message)); 
     } else {
         res.send(cache[req.url]);
         // console.log(JSON.stringify(cache))
     }
});

module.exports = app;

// http://www.omdbapi.com/?i=tt3896198&apikey=a7a9001f
//- remember to use the && 
//look up .send 
//look up a way to call axios in server
//server module GET /?i=tt3896198 responds with movie data:
//.catch syntax 