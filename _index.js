// import HttpServer from './server';

// const server = new HttpServer(3000);

// server.get('/', (req, res) => {
//     res.status(200).send('Home page')
//   })
  
// server.get('/api/posts', (req, res) => {
//     var posts = "p1, p2, p3";
//     res.status(200).send(posts);
// })
//   server.post('/api/posts', (req, res) => {
//     const post = req.payload
//     res.status(200).send(post)
//   })
  
//   server.delete('/api/posts/:postId', (req, res) => {
//     const postId = req.params.postId
//     res.status(200).send(`Deleted ${postId}`)
//   })
  
//   server.put('/api/posts/:postId', (req, res) => {
//     const postId = req.params.postId
//     res.status(200).send(`Updated ${postId}`)
//   })
  
//   server.listen()