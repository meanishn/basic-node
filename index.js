const http = require('http');

var routes = {
  '/api/posts': function (req, res) {
    var posts = "1, 2, 3";
    res.status(200).send(posts);
  }
}

//create a server object:
http.createServer((req, res) => {
  var url = req.url;
  
  res.status = (statusCode) => {
    res.writeHeader(statusCode);
    return res;
  }

  res.send = (data) => {
    res.write(data);
    res.end();
  }

  var handler = routes[url];

  if (!handler) {
    res.end(400);
    return;
  }

  try {
    handler(req, res);
  } catch (err) {
    res.write("your request is not succeeded.");
    res.end();
  }


  // if (req.url === '/') {
  //   res.write("You are in home page.");
  //   res.end();    
  // } 
  // if (req.url === '/edit') {
  //   renderContactUsHtml(res);
  // }
  // else {
  //   res.writeHeader(200);
  //   res.end();
  // }
  
}).listen(8080); //the server object listens on port 8080

function renderContactUsHtml(res) {
  var html = '<h2>Hello sir</h2>';
  res.writeHeader(200, {"Content-Type": "text/html"});  
  res.write(html);  
  res.end();  
}