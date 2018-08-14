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
const { validateApp, validateAppId } = require('../domain/validators');
const { add, remove } = require('../domain/applications');

const ROUTES = {
  DELETE_APP: {
    match(request) {
      return request.method === 'DELETE' && this.regex.test(request.url);
    },
    regex: /^\/api\/1\/apps\/(.*)$/
  },
  ADD_APP: {
    match(request) {
      return request.method === 'POST' && request.url === '/api/1/apps';
    }
  },
  HEALTH_CHECK: {
    match(request) {
      return request.method === 'GET' && request.url === '/healthcheck';
    }
  }
};

const routesMatcher = (request, response) => {
  if (ROUTES.DELETE_APP.match(request)) {
    parsePathParameter(request, ROUTES.DELETE_APP.regex)
      .then(validateAppId)
      .then(appId => remove(appId)
        .then(sendNoContent(response))
        .catch(sendServerError(response)))
      .catch(sendClientError(response))
  } else if (ROUTES.ADD_APP.match(request)) {
    parseBody(request)
      .then(validateApp)
      .then(app => add(app)
        .then(sendResourceCreated(response))
        .catch(sendServerError(response)))
      .catch(sendClientError(response))
  } else if (ROUTES.HEALTH_CHECK.match(request)) {
    sendOK(response)();
  } else {
    sendNotFound(response)();
  }
};

module.exports = routesMatcher;
