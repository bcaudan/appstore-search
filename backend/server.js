const http = require('http');

const routes = require('./routes/routes');
const { port } = require('./config/config');

const server = http.createServer(routes);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
