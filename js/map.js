'use strict';

(function () {
  var MAIN_MARKER_HEIGHT = 80;
  var MAIN_MARKER_WIDTH = 65;
  var notice = document.querySelector('.notice');
  var locationInput = notice.querySelector('#address');
  var mainMarker = window.data.map.querySelector('.map__pin--main');
  var mainHtmlContent = document.querySelector('main');
  var startMainMarkerPositionX = Math.round(mainMarker.offsetLeft + MAIN_MARKER_WIDTH / 2);
  var startMainMarkerPositionY = Math.round(mainMarker.offsetTop + MAIN_MARKER_HEIGHT);
  var offers = [];
  var Limit = {
    top: window.data.MAP_ADS_Y_START_POINTS - MAIN_MARKER_HEIGHT,
    bottom: window.data.MAP_ADS_HEIGHT - MAIN_MARKER_HEIGHT,
    left: -MAIN_MARKER_WIDTH / 2,
    right: window.data.mapWidth - MAIN_MARKER_WIDTH / 2
  };
  var StartPosition = {
    x: window.getComputedStyle(mainMarker, null).getPropertyValue('left'),
    y: window.getComputedStyle(mainMarker, null).getPropertyValue('top')
  };

  var writeCoordinates = function () {
    locationInput.value = startMainMarkerPositionX + ', ' + startMainMarkerPositionY;
  };

  var showErrorMassage = function (errorContent) {
    var errorTemplate = document.querySelector('#error').content;
    var errorElement = errorTemplate.cloneNode(true);
    var closeButton = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__message').textContent = errorContent;
    mainHtmlContent.prepend(errorElement);

    var closeError = function () {
      document.querySelector('.error').remove();
      document.removeEventListener('keydown', onCloseErrorPress);
      document.removeEventListener('click', onCloseArbitraryAreaClick);
    };

    var onCloseErrorPress = function (evt) {
      if (evt.keyCode === window.pin.ESC_KEYCODE) {
        closeError();
      }
    };

    var onCloseArbitraryAreaClick = function (evt) {
      if (!evt.target.classList.contains('error__message')) {
        closeError();
      }
    };

    closeButton.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', onCloseErrorPress);
    document.addEventListener('click', onCloseArbitraryAreaClick);
  };

  var showMassageSuccess = function () {
    var template = document.querySelector('#success').content;
    var templateElement = template.cloneNode(true);
    mainHtmlContent.prepend(templateElement);

    var closeMassageSuccess = function () {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', onCloseMassageSuccessPress);
      document.removeEventListener('click', onCloseArbitraryAreaClick);
    };

    var onCloseMassageSuccessPress = function (evt) {
      if (evt.keyCode === window.pin.ESC_KEYCODE) {
        closeMassageSuccess();
      }
    };

    var onCloseArbitraryAreaClick = function (evt) {
      if (!evt.target.classList.contains('success__message')) {
        closeMassageSuccess();
      }
    };

    document.addEventListener('keydown', onCloseMassageSuccessPress);
    document.addEventListener('click', onCloseArbitraryAreaClick);
  };

  var renderMarkers = function (array) {
    array.forEach(function (item) {
      window.pin.getNewMarkers(item);
    });
  };

  var successLoad = function (data) {
    offers = data.slice();
    renderMarkers(data.slice(0, window.data.COUNT_OFFERS));
  };

  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    window.data.load(successLoad, showErrorMassage, window.data.loadRequest);
    window.form.activeNoticeForm();
    mainMarker.removeEventListener('mousedown', onMainMarkerMouseDown);
    mainMarker.removeEventListener('keydown', onMainMarkerKeydown);
  };

  var deActiveNoticeForm = function () {
    window.form.mainForm.reset();
    writeCoordinates();
    window.form.onTypeValidationChange();
    window.form.disabledNoticeForm();
    window.form.mainForm.classList.add('ad-form--disabled');
    showMassageSuccess();
  };

  var removeMarker = function () {
    var items = window.data.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var modal = window.data.map.querySelector('.map__card');

    if (modal) {
      modal.remove();
    }

    items.forEach(function (item) {
      item.remove();
    });
  };

  var deActivateMap = function () {
    removeMarker();
    mainMarker.style.top = StartPosition.y;
    mainMarker.style.left = StartPosition.x;
  };

  var deActivatePage = function () {
    window.data.map.classList.add('map--faded');
    deActiveNoticeForm();
    window.filter.resetFormFilter();
    deActivateMap();
    window.form.disabledPreviewUserAvatar();
    window.form.disabledPreviewRoom();
    mainMarker.addEventListener('mousedown', onMainMarkerMouseDown);
    mainMarker.addEventListener('keydown', onMainMarkerKeydown);
  };

  var onMainMarkerMouseDown = function () {
    activatePage();
  };

  var onMainMarkerKeydown = function (evt) {
    if (evt.keyCode === window.pin.ENTER_KEYCODE) {
      activatePage();
    }
  };

  var correctMainMarkerMoveVertical = function () {
    if (mainMarker.offsetTop < Limit.top) {
      mainMarker.style.top = Limit.top + 'px';
    } else if (mainMarker.offsetTop > Limit.bottom) {
      mainMarker.style.top = Limit.bottom + 'px';
    }
  };

  var correctMarkerAddress = function (x, y) {
    var pointX = parseInt(x, 10) + Math.round(MAIN_MARKER_WIDTH / 2);
    var pointY = parseInt(y, 10) + Math.round(+MAIN_MARKER_HEIGHT);
    if (pointX > window.data.mapWidth - MAIN_MARKER_WIDTH / 2) {
      pointX = window.data.mapWidth;
    }
    locationInput.value = pointX + ', ' + pointY;
  };

  var correctMainMarkerMoveHorizontal = function () {
    if (mainMarker.offsetLeft < Limit.left) {
      mainMarker.style.left = Limit.left + 'px';
    } else if (mainMarker.offsetLeft > Limit.right) {
      mainMarker.style.left = Limit.right + 'px';
    }
  };

  mainMarker.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMarker.style.top = (mainMarker.offsetTop - shift.y) + 'px';
      mainMarker.style.left = (mainMarker.offsetLeft - shift.x) + 'px';

      correctMainMarkerMoveVertical();
      correctMainMarkerMoveHorizontal();
      correctMarkerAddress(mainMarker.offsetLeft, mainMarker.offsetTop);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainMarker.addEventListener('mousedown', onMainMarkerMouseDown);
  mainMarker.addEventListener('keydown', onMainMarkerKeydown);

  window.map = {
    MAIN_MARKER_HEIGHT: MAIN_MARKER_HEIGHT,
    MAIN_MARKER_WIDTH: MAIN_MARKER_WIDTH,
    notice: notice,
    getOffers: function () {
      return offers;
    },
    mainMarker: mainMarker,
    correctMarkerAddress: correctMarkerAddress,
    showLoadErrorMassage: showErrorMassage,
    deActivatePage: deActivatePage,
    writeCoordinates: writeCoordinates,
    renderMarkers: renderMarkers,
    removeMarker: removeMarker
  };

})();
