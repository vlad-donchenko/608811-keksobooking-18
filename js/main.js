'use strict';

var MIN_ADS_PRICE = 1000;
var MAX_ADS_PRICE = 10000;
var COUNT_OFFERS = 8;
var MAP_ADS_HEIGHT = 630;
var MAP_ADS_Y_START_POINTS = 130;
var MAP_ADS_X_START_POINTS = 1;
var map = document.querySelector('.map');
var itemContainer = map.querySelector('.map__pins');
var MAP_ADS_WIDTH = itemContainer.offsetWidth;
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesNames = ['palace', 'flat', 'house', 'bungalo'];
var adsMarkerTemplate = document.querySelector('#pin').content;
var MARKER_WIDTH = 65;
var MARKER_HEIGHT = 87;
var types = {
  palace: {
    eng: 'palace',
    ru: 'дворец'
  },
  flat: {
    eng: 'flat',
    ru: 'квартира'
  },
  house: {
    eng: 'house',
    ru: 'дом'
  },
  bungalo: {
    eng: 'bungalo',
    ru: 'бунгало'
  }
};

var activateMap = function (element) {
  element.classList.remove('map--faded');
};

activateMap(map);

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
  var ads = {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': 'Уютное гнездышко',
      'address': getLocation().x[index] + ', ' + getLocation().y[index],
      'price': randomInteger(MIN_ADS_PRICE, MAX_ADS_PRICE),
      'type': types[typesNames[randomInteger(0, typesNames.length - 1)]].eng,
      'rooms': index,
      'guests': index,
      'checkin': times[randomInteger(0, 2)],
      'checkout': times[randomInteger(0, 2)],
      'features': shuffleArray(features.slice(0, randomInteger(1, features.length))),
      'description': 'Сдается в аренду ',
      'photos': shuffleArray(photos.slice(0, randomInteger(1, photos.length)))
    },
    'location': {
      x: randomInteger(MAP_ADS_X_START_POINTS, MAP_ADS_WIDTH),
      y: randomInteger(MAP_ADS_Y_START_POINTS, MAP_ADS_HEIGHT)
    }
  };

  ads.offer.description = 'По адресу ' + ads.offer.address + ' по цене: ' + ads.offer.price + ' сдам ' + types[ads.offer.type].ru + ' количество комнат: ' + ads.offer.rooms + ' рассчитано на количество гостей: ' + ads.offer.guests + ' заехать можно в - ' + ads.offer.checkin + ' сдать ключи в - ' + ads.offer.checkout;

  return ads;
};

var getAds = function (count) {
  var ads = [];

  for (var i = 0; i < count; i++) {
    ads.push(getAdsTemplate(i));
  }

  return ads;
};

var getNewMarkers = function (template, index) {
  var adsItems = getAds(COUNT_OFFERS);
  var item = template.cloneNode(true);
  var itemButton = item.querySelector('.map__pin');
  var markerImage = itemButton.querySelector('img');
  itemButton.style.left = adsItems[index].location.x - MARKER_WIDTH / 2 + 'px';
  itemButton.style.top = adsItems[index].location.y - MARKER_HEIGHT + 'px';
  markerImage.src = adsItems[index].author.avatar;
  itemContainer.appendChild(item);

  return item;
};

for (var i = 0; i < COUNT_OFFERS; i++) {
  getNewMarkers(adsMarkerTemplate, i);
}
