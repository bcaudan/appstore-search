const http = require('http');

const routesMatcher = require('./routes/routes');
const { port } = require('./config/config');

const server = http.createServer(routesMatcher);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
