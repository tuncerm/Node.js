const url = 'https://reservation100-sandbox.mxapps.io/api/reservations';
const options = {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Jack Sparrow',
    numberOfPeople: 35
  })
};
require('node-fetch')(url, options)
.then(data => {
  if(data.status === 200)
    return data.text();
  throw new Error(data.statusText);
})
.then(json => console.log(json))
.catch(console.error);