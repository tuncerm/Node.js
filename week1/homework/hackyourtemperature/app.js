const express = require('express');
const ehb = require('express-handlebars');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.engine('handlebars', ehb());
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
  res.status(200).json("hello from backend to frontend!");
});

app.listen(PORT, ()=>{
  console.log(`Listening on port: ${PORT}!`);
});