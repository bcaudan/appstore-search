const { add, remove } = require('./index');

const routes = (request, response) => {
  if (request.method === 'POST' && request.url === '/api/1/apps') {
    // parse body
    // add
    // response 201 + id
  } else if (request.method === 'DELETE' && request.url.test('^/api/1/apps/[\d]+$')) {
    // parse id
    // delete
    // response 204 or api result
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
};

module.exports = routes;
