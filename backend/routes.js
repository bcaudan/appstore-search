const {
  parsePathParameter,
  parseBody,
  sendNotFound,
  sendClientError,
  sendNoContent,
  sendServerError,
  sendResourceCreated
} = require('./httpUtils');
const { add, remove } = require('./index');

const routes = (request, response) => {
  const deleteRoute = /^\/api\/1\/apps\/([\d]+)$/;
  if (request.method === 'DELETE' && deleteRoute.test(request.url)) {
    parsePathParameter(request, deleteRoute)
      .then(appId => remove(appId))
      .then(sendNoContent(response))
      .catch(sendServerError(response));
  } else if (request.method === 'POST' && request.url === '/api/1/apps') {
    parseBody(request)
      .catch(sendClientError(response))
      .then(app => add(app))
      .then(sendResourceCreated(response))
      .catch(sendServerError(response));
  } else {
    sendNotFound(response)();
  }
};

module.exports = routes;
