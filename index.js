const http = require('http');
const HttpServer = require('./server');

const server = new HttpServer(8080);

  server.get('/', (req, res) => {
    res.status(200).send("test test")
  });

  server.get('/api/posts', (req, res) => {
      var posts = "p1, p2, p3";
      res.status(200).send(posts);
  });

  server.post('/api/posts', (req, res) => {
    const post = req.payload
    res.status(200).send(post)
  });
  
  server.listen();
  

  