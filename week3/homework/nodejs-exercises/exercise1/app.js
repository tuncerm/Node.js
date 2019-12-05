require('node-fetch')('http://api.icndb.com/jokes/random')
.then(data=>{
  if(data.status === 200)
    return data.json();
  throw new Error(data.statusText);
})
.then(json=> console.log(json.value.joke))
.catch(console.error);