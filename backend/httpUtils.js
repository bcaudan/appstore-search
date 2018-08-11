function parseBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = '';
    request.on('data', chunk => {
      rawBody += chunk.toString();
    });
    request.on('end', () => {
      let body;
      try {
        body = JSON.parse(rawBody);
      } catch (e) {
        reject('Invalid JSON');
      }
      resolve(body);
    });
    request.on('error', reject);
  });
}

function parsePathParameter(request, routeDefinition) {
  return new Promise((resolve) => {
    const match = routeDefinition.exec(request.url);
    resolve(match[1]);
  })
}

function sendClientError(response) {
  return error => {
    response.statusCode = 400;
    response.end(error);
  }
}

function sendServerError(response) {
  return error => {
    console.log(error);
    response.statusCode = 500;
    response.end('Server error');
  }
}

function sendResourceCreated(response) {
  return object => {
    response.statusCode = 201;
    response.end(object);
  }
}

function sendNoContent(response) {
  return () => {
    response.statusCode = 204;
    response.end();
  }
}

function sendNotFound(response) {
  return () => {
    response.statusCode = 404;
    response.end('Not found');
  }
}

module.exports = {
  parsePathParameter,
  parseBody,
  sendNotFound,
  sendClientError,
  sendNoContent,
  sendServerError,
  sendResourceCreated
};
