const url = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books';
const options = {
  headers: { 'Authorization': `Basic ${Buffer.from('admin:hvgX8KlVEa').toString('base64')}` }
};
require('node-fetch')(url, options)
.then(data=>{
  if(data.status === 200)
    return data.json();
  throw new Error(data.statusText);
})
.then(json=> console.log(json))
.catch(console.error);
