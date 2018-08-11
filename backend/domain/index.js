const algoliasearch = require('algoliasearch');
const { applicationId, adminKey, indexName } = require('../config/config');
const client = algoliasearch(applicationId, adminKey);
const index = client.initIndex(indexName);

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
