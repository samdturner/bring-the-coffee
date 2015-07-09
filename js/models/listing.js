define([
  'backbone'
], function () {
  var ListingModel = Backbone.Model.extend({
    urlRoot: 'api/listings'
  });

  return ListingModel;
});
