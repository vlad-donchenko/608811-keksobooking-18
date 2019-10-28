'use strict';

(function () {
  var MAIN_MARKER_HEIGHT = 80;
  var MAIN_MARKER_WIDTH = 65;
  var notice = document.querySelector('.notice');
  var locationInput = notice.querySelector('#address');
  var mainMarker = window.data.map.querySelector('.map__pin--main');
  var mainHtmlContent = document.querySelector('main');
  var Limit = {
    top: window.data.MAP_ADS_Y_START_POINTS - MAIN_MARKER_HEIGHT,
    bottom: window.data.MAP_ADS_HEIGHT - MAIN_MARKER_HEIGHT,
    left: -MAIN_MARKER_WIDTH / 2,
    right: window.data.mapWidth - MAIN_MARKER_WIDTH / 2
  };

  var showLoadErrorMassage = function (errorContent) {
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


  var renderMarkers = function (array) {
    for (var i = 0; i < window.data.COUNT_OFFERS; i++) {
      window.pin.getNewMarkers(array[i]);
    }
  };

  var onMainMarkerMouseDown = function () {
    window.data.map.classList.remove('map--faded');
    window.data.load(renderMarkers, showLoadErrorMassage);
    window.form.activeNoticeForm();
    mainMarker.removeEventListener('mousedown', onMainMarkerMouseDown);
    mainMarker.removeEventListener('keydown', onMainMarkerKeydown);
  };

  var onMainMarkerKeydown = function (evt) {
    if (evt.keyCode === window.pin.ENTER_KEYCODE) {
      onMainMarkerMouseDown();
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
    mainMarker: mainMarker,
    correctMarkerAddress: correctMarkerAddress
  };

})();
