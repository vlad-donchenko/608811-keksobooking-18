'use strict';

(function () {
  var LOAD_TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;
  var COUNT_OFFERS = 8;
  var MAP_ADS_HEIGHT = 630;
  var MAP_ADS_Y_START_POINTS = 130;
  var map = document.querySelector('.map');
  var itemContainer = map.querySelector('.map__pins');
  var mapWidth = itemContainer.offsetWidth;
  var types = {
    palace: {
      eng: 'palace',
      ru: 'дворец',
      startPrice: 10000
    },
    flat: {
      eng: 'flat',
      ru: 'квартира',
      startPrice: 1000
    },
    house: {
      eng: 'house',
      ru: 'дом',
      startPrice: 5000
    },
    bungalo: {
      eng: 'bungalo',
      ru: 'бунгало',
      startPrice: 0
    }
  };

  var loadRequest = {
    url: 'https://js.dump.academy/keksobooking/data',
    method: 'GET'
  };

  var saveRequest = {
    url: 'https://js.dump.academy/keksobooking',
    method: 'POST'
  };

  var request = function (onSuccess, onError, object, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка загрузки объявления');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LOAD_TIMEOUT; // 10s

    xhr.open(object.method, object.url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.data = {
    MAP_ADS_Y_START_POINTS: MAP_ADS_Y_START_POINTS,
    MAP_ADS_HEIGHT: MAP_ADS_HEIGHT,
    COUNT_OFFERS: COUNT_OFFERS,
    mapWidth: mapWidth,
    map: map,
    types: types,
    itemContainer: itemContainer,
    loadRequest: loadRequest,
    saveRequest: saveRequest,
    load: request,
    save: request
  };
})();
