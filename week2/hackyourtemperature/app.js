const express = require('express');
const ehbs = require('express-handlebars');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/weather', (req, res)=>{
  console.log(req.body);
  res.status(200).json({cityName: req.body.cityName});
});

app.set('view engine', 'handlebars');
app.engine('handlebars', ehbs({defaultLayout: 'main'}));

app.listen(PORT, ()=>{
  console.log(`Listening on: ${PORT}`);
});