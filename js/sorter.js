'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var formFilter = window.data.map.querySelector('.map__filters');
  var priceMap = {
    'low': {
      start: 0,
      end: 1000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var filterRule = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return data.offer.rooms.toString() === filter.value;
    },
    'housing-guests': function (data, filter) {
      return data.offer.guests.toString() === filter.value;
    },
    'housing-features': function (data, filter) {
      var checkedInputs = Array.from(filter.querySelectorAll('.map__checkbox:checked'));
      return checkedInputs.every(function (element) {
        return data.offer.features.some(function (features) {
          return features === element.value;
        });
      });
    }
  };

  var resetFormFilter = function () {
    formFilter.reset();
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRule[filter.id](item, filter);
      });
    });
  };

  var onFormFilterChange = function () {
    var filterElements = Array.from(formFilter.children);
    window.map.removeMarker();
    var filterOffers = getFilterData(window.map.getOffers().slice(), filterElements).slice(0, window.data.COUNT_OFFERS);
    window.map.renderMarkers(filterOffers);
  };

  formFilter.addEventListener('change', debounce(onFormFilterChange));

  window.sorter = {
    resetFormFilter: resetFormFilter
  };
})();
