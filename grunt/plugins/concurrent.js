module.exports = {
  bower: ['wiredep', 'bowersync'],
  devBuild: ['sync', 'html', 'scripts', 'styles'],
  prodBuild: ['sync', 'html', 'scripts:prod', 'styles:prod', 'images']
};
