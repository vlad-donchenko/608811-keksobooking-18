'use strict';

var MAIN_MARKER_HEIGHT = 80;
var MAIN_MARKER_WIDTH = 65;
var MIN_ADS_PRICE = 1000;
var MAX_ADS_PRICE = 10000;
var COUNT_OFFERS = 8;
var MAP_ADS_HEIGHT = 630;
var MAP_ADS_Y_START_POINTS = 130;
var MAP_ADS_X_START_POINTS = 1;
var MARKER_WIDTH = 50;
var MARKER_HEIGHT = 70;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var ads = [];
var map = document.querySelector('.map');
var itemContainer = map.querySelector('.map__pins');
var mapWidth = itemContainer.offsetWidth;
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesNames = ['palace', 'flat', 'house', 'bungalo'];
var adsMarkerTemplate = document.querySelector('#pin').content;
var offerInfoModalTemplate = document.querySelector('#card').content;
var mapFilter = map.querySelector('.map__filters-container');
var mainMarker = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var startMainMarkerPositionX = Math.round(mainMarker.offsetLeft + MAIN_MARKER_WIDTH / 2);
var startMainMarkerPositionY = Math.round(mainMarker.offsetTop + MAIN_MARKER_HEIGHT);
notice.querySelector('#address').value = startMainMarkerPositionX + ', ' + startMainMarkerPositionY;
var roomNumberSelect = notice.querySelector('#room_number');
var capacitySelect = notice.querySelector('#capacity');
var mainForm = notice.querySelector('.ad-form');
var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
var typeSelect = notice.querySelector('#type');
var priceInput = notice.querySelector('#price');
var checkInSelect = notice.querySelector('#timein');
var checkOutSelect = notice.querySelector('#timeout');
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

var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
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
};

getAds(COUNT_OFFERS);

var removeModal = function () {
  var modal = map.querySelector('.popup');
  if (modal) {
    modal.remove();
  }
};

var getofferModal = function (object) {
  var modal = offerInfoModalTemplate.cloneNode(true);
  var modalTitle = modal.querySelector('.popup__title');
  modalTitle.textContent = object.offer.title;
  var modalAddress = modal.querySelector('.popup__text--address');
  modalAddress.textContent = object.offer.address;
  var modalPrice = modal.querySelector('.popup__text--price');
  modalPrice.textContent = object.offer.price + '₽/ночь';
  var modalType = modal.querySelector('.popup__type');
  modalType.textContent = types[object.offer.type].ru;
  var modalCapacity = modal.querySelector('.popup__text--capacity');
  modalCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  var modalTimeAction = modal.querySelector('.popup__text--time');
  modalTimeAction.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  var modalFeatures = modal.querySelector('.popup__features');
  var modalDescription = modal.querySelector('.popup__description');
  modalDescription.textContent = object.offer.description;
  var modalPhotos = modal.querySelector('.popup__photos');
  var modalUserAvatar = modal.querySelector('.popup__avatar');
  modalUserAvatar.src = object.author.avatar;

  var addFeatures = function (array) {
    var childrens = modalFeatures.querySelectorAll('.popup__feature');
    for (var i = 0; i < childrens.length; i++) {
      var featureName = childrens[i].classList[1].replace('popup__feature--', '');
      if (array.indexOf(featureName) === -1) {
        childrens[i].remove();
      }
    }
  };
  addFeatures(object.offer.features);

  var addPhoto = function (array) {
    var photosWrapImage = modalPhotos.querySelector('.popup__photo');
    photosWrapImage.src = '' + array[0];
    if (array.length > 0) {
      for (var i = 1; i < array.length; i++) {
        var newImage = photosWrapImage.cloneNode(true);
        newImage.src = array[i];
        modalPhotos.appendChild(newImage);
      }
    }
  };
  addPhoto(object.offer.photos);

  removeModal();

  map.insertBefore(modal, mapFilter);
};

var getNewMarkers = function (object) {
  var item = adsMarkerTemplate.cloneNode(true);
  var itemButton = item.querySelector('.map__pin');
  var markerImage = itemButton.querySelector('img');
  itemButton.style.left = object.location.x - MARKER_WIDTH / 2 + 'px';
  itemButton.style.top = object.location.y - MARKER_HEIGHT + 'px';
  markerImage.src = object.author.avatar;
  itemContainer.appendChild(item);

  var closeModal = function () {
    var modal = map.querySelector('.popup');
    var buttonClose = modal.querySelector('.popup__close');

    buttonClose.addEventListener('click', function () {
      removeModal();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeModal();
      }
    });
  };


  itemButton.addEventListener('click', function () {
    getofferModal(object);
    closeModal();
  });

  itemButton.addEventListener('keyup', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getofferModal(object);
      closeModal();
    }
  });

  return item;
};

var disabledNoticeForm = function () {
  for (var i = 0; i < mainFormFieldsets.length; i++) {
    mainFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

var activeNoticeForm = function () {
  for (var i = 0; i < mainFormFieldsets.length; i++) {
    mainFormFieldsets[i].removeAttribute('disabled');
  }

  mainForm.classList.remove('ad-form--disabled');
};

var onMainMarkerMouseDown = function () {
  map.classList.remove('map--faded');
  for (var i = 0; i < COUNT_OFFERS; i++) {
    getNewMarkers(ads[i]);
  }
  activeNoticeForm();
  mainMarker.removeEventListener('mousedown', onMainMarkerMouseDown);
  mainMarker.removeEventListener('keydown', onMainMarkerKeydown);
};

var onMainMarkerKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onMainMarkerMouseDown();
  }
};

var onRoomNumberChange = function () {

  if (capacitySelect.options.length > 0) {
    [].forEach.call(capacitySelect.options, function (item) {
      var status = !(ROOMS_CAPACITY[roomNumberSelect.value].indexOf(item.value) >= 0);
      item.selected = (ROOMS_CAPACITY[roomNumberSelect.value][0] === item.value);
      item.hidden = status;
      item.disabled = status;
    });
  }
};

var onTypeValidationChange = function () {
  priceInput.min = types[typeSelect.value].startPrice;
  priceInput.placeholder = types[typeSelect.value].startPrice;
};

var onCheckInChange = function () {
  for (var i = 0; i < checkOutSelect.options.length; i++) {
    checkOutSelect.options[i].selected = (checkInSelect.value === checkOutSelect.options[i].value);
  }
};

var onCheckOutChange = function () {
  for (var i = 0; i < checkInSelect.options.length; i++) {
    checkInSelect.options[i].selected = (checkOutSelect.value === checkInSelect.options[i].value);
  }
};

disabledNoticeForm();
onRoomNumberChange();
mainMarker.addEventListener('mousedown', onMainMarkerMouseDown);
mainMarker.addEventListener('keydown', onMainMarkerKeydown);
roomNumberSelect.addEventListener('change', onRoomNumberChange);
typeSelect.addEventListener('change', onTypeValidationChange);
checkInSelect.addEventListener('change', onCheckInChange);
checkOutSelect.addEventListener('change', onCheckOutChange);
