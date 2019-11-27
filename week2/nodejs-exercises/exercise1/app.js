const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const {getOne, getAll, createOne, updateOne, deleteOne} =  require('./blog.controller.js')

app.use(express.json());

app.route('/blogs')
  .get(getAll)
  .post(createOne);

app.route('/blogs/:blogID')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne);

app.listen(PORT, ()=>{
  console.log("Listening on: " + PORT);
});
