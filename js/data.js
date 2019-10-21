'use strict';

(function () {
  var COUNT_OFFERS = 8;
  var MIN_ADS_PRICE = 1000;
  var MAX_ADS_PRICE = 10000;
  var MAP_ADS_HEIGHT = 630;
  var MAP_ADS_Y_START_POINTS = 130;
  var MAP_ADS_X_START_POINTS = 1;
  var map = document.querySelector('.map');
  var itemContainer = map.querySelector('.map__pins');
  var mapWidth = itemContainer.offsetWidth;
  var typesNames = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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

  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  var getLocation = function () {
    var location = {
      x: ['100', '250', '400', '550', '700', '850', '1000', '1100'],
      y: ['100', '150', '200', '250', '300', '350', '400', '450']
    };

    return location;
  };

  var shuffleArray = function (array) {
    var j;
    var x;
    var i;

    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }

    return array;
  };

  var getAdsTemplate = function (index) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },
      'offer': {
        'title': 'Уютное гнездышко',
        'address': getLocation().x[index] + ', ' + getLocation().y[index],
        'price': randomInteger(MIN_ADS_PRICE, MAX_ADS_PRICE),
        'type': types[typesNames[randomInteger(0, typesNames.length - 1)]].eng,
        'rooms': randomInteger(1, 10),
        'guests': randomInteger(1, 10),
        'checkin': times[randomInteger(0, 2)],
        'checkout': times[randomInteger(0, 2)],
        'features': shuffleArray(features.slice(0, randomInteger(1, features.length))),
        'description': 'Произвольный текст',
        'photos': shuffleArray(photos.slice(0, randomInteger(1, photos.length)))
      },
      'location': {
        x: randomInteger(MAP_ADS_X_START_POINTS, mapWidth),
        y: randomInteger(MAP_ADS_Y_START_POINTS, MAP_ADS_HEIGHT)
      }
    };
  };

  var getAds = function (count) {
    for (var i = 0; i < count; i++) {
      ads.push(getAdsTemplate(i));
    }

    return ads;
  };

  getAds(COUNT_OFFERS);

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
