'use strict';

(function () {
  var formFilter = window.data.map.querySelector('.map__filters');

  var priceMap = {
    'low': {
      start: 0,
      end: 1000
    },
    'midle': {
      start: 10000,
      end: 50000
    },
    'hight': {
      start: 50000,
      end: Infinity
    }
  };

  var filterRule = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      console.log(filter.value);
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return parseInt(data.offer.rooms, 10) === filter.value;
    },
    'housing-guests': function (data, filter) {
      return parseInt(data.offer.guests, 10) === filter.value;
    },
    'housing-features': function (data, filter) {
      var checkedInputs = Array.from(filter.querySelectorAll('.map__checkbox:checked'));
      checkedInputs.every(function (element) {
        return data.offer.features.some(function (features) {
          return features === element.value;
        });
      });
    }
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        console.log((filter.value === 'any') ? true : filterRule[filter.id](item, filter));
        return (filter.value === 'any') ? true : filterRule[filter.id](item, filter);
      });
    });
  };

  var onFormFilterChange = function () {
    var filterElements = Array.from(formFilter.children);
    console.log(getFilterData(window.map.offers().slice(), filterElements));
    //window.map.renderMarkers(filterOffers);
  };

  formFilter.addEventListener('change', onFormFilterChange);

})();
