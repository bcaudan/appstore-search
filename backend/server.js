const http = require('http');

const routes = require('./routes');
const port = 3000;

const server = http.createServer(routes);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
