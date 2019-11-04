'use strict';

(function () {
  var formFilter = window.data.map.querySelector('.map__filters');
  var filterRule = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    }
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
  };

  formFilter.addEventListener('change', onFormFilterChange);
})();
