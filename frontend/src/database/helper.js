import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const client = algoliasearch('EYVD6N6UFE', '7287a3dbe0d1cb5879f60deb0586ac6f');
const helper = algoliasearchHelper(client, 'appstore-search', {
  facets: ['category']
});

export default helper;
