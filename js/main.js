'use strict';

var MIN_ADS_PRICE = 1000;
var MAX_ADS_PRICE = 10000;
var COUNT_OFFERS = 8;
var MAP_ADS_HEIGHT = 630;
var MAP_ADS_Y_START_POINTS = 130;
var MAP_ADS_X_START_POINTS = 1;
var ads = [];
var map = document.querySelector('.map');
var itemContainer = map.querySelector('.map__pins');
var mapWidth = itemContainer.offsetWidth;
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
  return {
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
};

getAds(COUNT_OFFERS);

var getNewMarkers = function (object) {
  var item = adsMarkerTemplate.cloneNode(true);
  var itemButton = item.querySelector('.map__pin');
  var markerImage = itemButton.querySelector('img');
  itemButton.style.left = object.location.x - MARKER_WIDTH / 2 + 'px';
  itemButton.style.top = object.location.y - MARKER_HEIGHT + 'px';
  markerImage.src = object.author.avatar;
  itemContainer.appendChild(item);

  return item;
};

for (var i = 0; i < COUNT_OFFERS; i++) {
  getNewMarkers(ads[i]);
}
