const http = require('http');
const path = require('path');
const PORT = 3000;


const server = http.createServer((req, res)=>{
  if(req.url === '/'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(
    `<html>
      <head>
        <title>My First Web Server</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
      </head>
      <body>
        <h1>Hello, anyone there?</h1>
        <div id="content"></div>
        <script src="script.js"></script>
      </body>
    </html>`
    );
  } else if(req.url === '/script.js') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/javascript');
    res.write(`
      document
        .getElementById('content')
        .appendChild(document.createTextNode('Welcome to Server-land!'));
    `);
  } else if(req.url === '/style.css') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/stylesheet');
    res.write(`
      #content { color: blue }
    `);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.write("Not Found!");
  }
  res.end();
});

server.listen(PORT, ()=>{
  console.log(`Listening on port: ${PORT}`);
})