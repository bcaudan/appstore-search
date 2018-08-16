const config = {
  port: process.env.PORT || 4000,
  indexName: 'prod_appstore-search-desc',
  applicationId: 'BTXKPPT0IV',
  adminKey: process.env.ALGOLIA_ADMIN_KEY
};

if (process.env.NODE_ENV === 'TEST') {
  config.port = 1234;
  config.indexName = 'test_appstore-search';
}

module.exports = config;
