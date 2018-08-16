import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import config from './config';

const client = algoliasearch(config.applicationID, config.apiKey);
const helper = algoliasearchHelper(client, config.indexes.desc, {
  facets: [config.facet],
});

export default helper;
