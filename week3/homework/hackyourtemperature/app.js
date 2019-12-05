const express = require('express');
const ehb = require('express-handlebars');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.engine('handlebars', ehb());
app.set('view engine', 'handlebars');

const PORT = 3000;

const {getHome, getData, handleRest, errorHandler} = require('./controller');

app.route('/')
  .get(getHome)
  .post(getData);

app.get('*', handleRest);

app.use(errorHandler);

app.listen(PORT, ()=>{
  console.log("Started Listening On: " + PORT);
});