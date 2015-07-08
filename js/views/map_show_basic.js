define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var BasicMapShowView = Backbone.View.extend({
    id: 'map-canvas',

    el: $("#container"),

    render: function () {
      var mapOptions = {
        center: { lat: 37.7833, lng: -122.4167 },
        zoom: 12
      };

      this._map = new google.maps.Map(this.el, mapOptions);
    }
  });

  return BasicMapShowView;
});
