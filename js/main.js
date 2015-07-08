require.config({
  baseUrl: 'js',

  paths: {
    jquery: 'libs/jquery-1.11.3',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min'
  }
});

require([
  'app'
], function(App){
  App.initialize();
});
