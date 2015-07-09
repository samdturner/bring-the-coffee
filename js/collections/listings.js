define([
  'backbone',
  'models/listing'
], function (ListingModel) {
  var ListingCollection = Backbone.Collection.extend({
    model: ListingModel,

    url: 'api/listings/search'
  })

  return ListingCollection;
});
