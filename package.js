Package.describe({
  name: 'serocash:tools',
  summary: 'Helper functions for dapps',
  version: '0.2.3',
  git: 'http://github.com/ethereum/meteor-package-tools'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('underscore', ['client', 'server']);
  api.use('mongo@1.1.7', ['client', 'server']);
  api.use('http@1.2.10', ['client', 'server']);

  api.use('spacebars', 'client');
  api.use('templating', 'client');
  api.use('tracker', 'client');

  //api.use('numeral:numeral@1.5.3', ['client', 'server']);
  api.use('3stack:bignumber@2.0.0', 'client');

  api.use('serocash:web3@0.2.6', ['client', 'server']);
  api.use('frozeman:persistent-minimongo@0.1.8', 'client');
  api.use('frozeman:storage@0.1.8', 'client');

  api.export(['SeroTools'], ['client', 'server']);

  api.addFiles('serotools.js', ['client', 'server']);
  api.addFiles('ticker.js', ['client', 'server']);

  api.addFiles('globalHelpers.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('serocash:tools');
  api.addFiles('ethtools-tests.js', ['client', 'server']);
});
