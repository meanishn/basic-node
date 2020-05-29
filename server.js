import http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

export default class HttpServer {
    
  constructor(port = 3000) {
    this.port = port;
    this.handlers = {};    
  }

  get(path, handler) {
    this.handlers[path] = handler;
  }

  post(path, handler) {
    this.handlers[path] = handler;
  }

  delete(path, handler) {}

  put(path, handler) {
    // Your code here
  }

  listen() {
    http.createServer((req, res) => {
        console.log("Server listening at port " + this.port);
        this.handleRequest(req, res);
    });
  }

  handleRequest(req, res) {
    var handler = this.handlers[url];

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
  }
}