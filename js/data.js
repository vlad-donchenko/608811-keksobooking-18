'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var COUNT_OFFERS = 8;
  var MAP_ADS_HEIGHT = 630;
  var MAP_ADS_Y_START_POINTS = 130;
  var map = document.querySelector('.map');
  var itemContainer = map.querySelector('.map__pins');
  var mapWidth = itemContainer.offsetWidth;
  var mainHtmlContent = document.querySelector('main');
  var ads = [];
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

  var showLoadErrorMassage = function (errorContent) {
    var errorTemplate = document.querySelector('#error').content;
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorContent;
    mainHtmlContent.prepend(errorElement);
  };

  var getAds = function (array) {
    for (var i = 0; i < COUNT_OFFERS; i++) {
      ads.push(array[i]);
    }

    return ads;
  };

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  load(LOAD_URL, getAds, showLoadErrorMassage);

  window.data = {
    MAP_ADS_Y_START_POINTS: MAP_ADS_Y_START_POINTS,
    MAP_ADS_HEIGHT: MAP_ADS_HEIGHT,
    mapWidth: mapWidth,
    map: map,
    types: types,
    itemContainer: itemContainer,
    COUNT_OFFERS: COUNT_OFFERS,
    ads: ads
  };
})();
