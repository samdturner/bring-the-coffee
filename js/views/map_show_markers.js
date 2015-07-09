define([
  'jquery',
  'underscore',
  'backbone',
  'collections/listing'
], function ($, _, Backbone, ListingCollection) {
    var MapMarkerView = Backbone.View.extend({
      id: "map-canvas",

      el: $("#container"),

      initialize: function () {
        this._markers = {};

        this.listenTo(this.collection, 'add', this.addMarker);
        this.listenTo(this.collection, 'remove', this.removeMarker);
      },

      initMap: function () {
        var mapOptions = {
          center: { lat: 37.7833, lng: -122.4167 },
          zoom: 12
        };

        this._map = new google.maps.Map(this.el, mapOptions);

        this.collection.each(this.addMarker.bind(this));
      },

      // Event handlers
      addMarker: function (listing) {
        if (this._markers[listing.id]) { return };
        var view = this;

        var marker = new google.maps.Marker({
          position: { lat: listing.get('lat'), lng: listing.get('lng') },
          map: this._map,
          title: listing.get('name')
        });

        google.maps.event.addListener(marker, 'click', function (event) {
          view.showMarkerInfo(event, marker);
        });

        this._markers[listing.id] = marker;
      },

      removeMarker: function (listing) {
        var marker = this._markers[listing.id];
        marker.setMap(null);
        delete this._markers[listing.id];
      },

      showMarkerInfo: function (event, marker) {
        // This event will be triggered when a marker is clicked. Right now it
        // simply opens an info window with the title of the marker. However, you
        // could get fancier if you wanted (maybe use a template for the content of
        // the window?)

        var infoWindow = new google.maps.InfoWindow({
          content: marker.title
        });

        infoWindow.open(this._map, marker);
      }
    })

    return MapMarkerView;
  }
)
