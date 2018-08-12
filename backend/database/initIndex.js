const algoliasearch = require('algoliasearch');
const { applicationId, adminKey, indexName } = require('../config/config');
const client = algoliasearch(applicationId, adminKey);

module.exports = client.initIndex(indexName);
