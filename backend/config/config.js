const config = {
  port: process.env.PORT || 4000,
  indexName: 'appstore-search',
  applicationId: 'EYVD6N6UFE',
  adminKey: process.env.ALGOLIA_ADMIN_KEY
};

if (process.env.NODE_ENV === 'TEST') {
  config.port = 1234;
  config.indexName = 'test-index';
}

module.exports = config;
