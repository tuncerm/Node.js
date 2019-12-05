const fetch = require('node-fetch');
// REQUIRES ./sources/secrets.json <= secrets.sample.json
const API_KEY = require('./sources/secrets.json').API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

exports.getHome = function(req, res, next){
  res.render('home');
};

exports.getData = function(req, res, next){
  const city = req.body.city;
  fetch(url + city)
  .then(data => data.json())
  .then(data => {
    if(data.cod === 200)
      return res.status(data.cod).json({
        city: `${data.name}, ${data.sys.country}`,
        temp: data.main.temp
      });
    const e = new Error(data.message);
    e.status = data.cod;
    throw e;
  })
  .catch(err => res.status(err.status || 400).json({message: err.message || "Unknown Parameter"}));
};

exports.handleRest = function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
};

exports.errorHandler = function(err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.render('error', {code: err.statusCode, message: err.message});
};