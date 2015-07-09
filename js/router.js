define([
  'jquery',
  'underscore',
  'backbone',
  'collections/listings',
  'models/listing',
  'views/map_show_basic'
], function($, _, Backbone, BasicMapShowView,
            ListingCollection, ListingModel){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '' : 'searchShow',
      'show' : 'basicMapShow'
    },

    searchShow: function () {
      var listings = new ListingCollection();
      listings.fetch();
      var view = new ListingModel({
        collection: listings
      });
      this._swapView(view);
    },

    basicMapShow: function () {
      var view = new BasicMapShowView();
      this._swapView(view);
      view.initMap();
    },

    _swapView: function (view) {
      this._currentView && this._currentView.remove();
      this._currentView = view;

      // Because of how the Google Map resizes, we must insert the view's `$el`
      // before initializing the map object. Beware of this in any views that
      // contain a map subview.
      this.$rootEl.html(view.$el);
      view.render();
    }
  });

  var initialize = function () {
    var router = new AppRouter();
    router.$rootEl = $('#container');
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
