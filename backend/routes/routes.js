const {
  parsePathParameter,
  parseBody,
  sendNotFound,
  sendClientError,
  sendNoContent,
  sendOK,
  sendServerError,
  sendResourceCreated,
} = require('./httpUtils');
const { validateApp, validateAppId } = require('./validators');
const { add, remove } = require('../domain/index');

const routes = (request, response) => {
  const deleteRoute = /^\/api\/1\/apps\/(.*)$/;
  if (request.method === 'DELETE' && deleteRoute.test(request.url)) {
    parsePathParameter(request, deleteRoute)
      .then(validateAppId)
      .then(appId => remove(appId)
        .then(sendNoContent(response))
        .catch(sendServerError(response)))
      .catch(sendClientError(response))
  } else if (request.method === 'POST' && request.url === '/api/1/apps') {
    parseBody(request)
      .then(validateApp)
      .then(app => add(app)
        .then(sendResourceCreated(response))
        .catch(sendServerError(response)))
      .catch(sendClientError(response))
  } else if (request.method === 'GET' && request.url === '/healthcheck') {
    sendOK(response)();
  } else {
    sendNotFound(response)();
  }
};

module.exports = routes;
