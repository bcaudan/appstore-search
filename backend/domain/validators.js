function validateApp(app) {
  return new Promise((resolve, reject) => {
    if (app instanceof Object && !(app instanceof Array)) {
      resolve(app);
    }
    reject('Invalid app')
  });
}

function validateAppId(appId) {
  return new Promise((resolve, reject) => {
    if (Number.isInteger(parseInt(appId, 10))) {
      resolve(appId);
    }
    reject('Invalid app id')
  });
}

module.exports = { validateApp, validateAppId };
