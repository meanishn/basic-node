const http = require('http');
const { IncomingMessage, ServerResponse } = require('http');

class Request extends IncomingMessage {
    constructor(socket) {
        super(socket);
        this.params = {};
        this.payload = {};
    }
    setPayload(payload = {}) {
        this.payload = payload;
    }
    setParams(params = {}) {
        super.setParams();      
        this.params = params;
    }
}

class Response extends ServerResponse {
    constructor(req) {
        super(req);
    }
    status(code) {
        this.writeHeader(code);
        return this;
    }
    send(data) {
        if (data) {
            this.write(data);
        }        
        this.end();
    }
}

class HttpServer {
    
  constructor(port = 3000) {
    this.port = port;
    this.handlers = {
        get: {},
        post: {}, 
        put: {}, 
        delete: {}
    };
    this.createServer();
  }

  // path: string, handler: Function
  get(path, handler) {
    this.handlers.get[path] = handler
  }

  post(path, handler) {
    this.handlers.post[path] = handler
  }

  delete(path, handler) {
      this.handlers.delete[path] = handler
  }

  put(path, handler) {
    this.handlers.put[path] = handler
  }

  listen() {
    this._server.listen(this.port, () => {
        console.log(`server listening on port ${this.port}`)
    })
  }

  _handleRequest(req, res) {
    const method = req.method.toLowerCase();
    var methodHandler = this.handlers[method];
    if (!methodHandler) {
        console.error(`Method ${method} is not handled.`)
        res.status(501).send();
        return;
    }

    var routeFunction = methodHandler[req.url];
    
    if (!routeFunction) {
        console.log(`No route handler found for the path ${req.url}`);
        res.status(400).send();
        return;
    } 
    
    try {
      routeFunction(req, res);
    } catch (err) {
      res.status(500).send("Unexpected error occured");
    }
  }

  createServer() {
    var options = {
        "IncomingMessage": Request,
        "ServerResponse": Response
    };

    this._server = http.createServer(options, (req, res) => {    
      let buffer = '';
      req.on("data", (chunk) => {
          buffer += chunk;
      });

      req.on("end", () => {
          req.payload = buffer;
          this._handleRequest(req, res);
      });
    });
  }  
}

module.exports = HttpServer;