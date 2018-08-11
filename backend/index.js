const algoliasearch = require('algoliasearch');
const client = algoliasearch('EYVD6N6UFE', process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('appstore-search');

/**
 * Add an app to the Algolia apps index and return its id
 * @param app
 */
function add(app) {
  let appId;
  let taskId;
  return index.addObject(app)
              .then(({objectID, taskID}) => {
                appId = objectID;
                taskId = taskID;
              })
              .then(() => index.waitTask(taskId))
              .then(() => appId);
}

/**
 * Delete an app from the Algolia index
 */
function remove(appId) {
  return index.deleteObject(appId)
              .then(({taskID}) => index.waitTask(taskID))
}

module.exports = { add, remove };
