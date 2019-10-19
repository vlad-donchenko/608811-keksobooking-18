'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var mainMarker = window.data.map.querySelector('.map__pin--main');

  var onMainMarkerMouseDown = function () {
    window.data.map.classList.remove('map--faded');
    for (var i = 0; i < window.data.COUNT_OFFERS; i++) {
      window.pin.getNewMarkers(window.data.ads[i]);
    }
    window.form.activeNoticeForm();
    mainMarker.removeEventListener('mousedown', onMainMarkerMouseDown);
    mainMarker.removeEventListener('keydown', onMainMarkerKeydown);
  };

  var onMainMarkerKeydown = function (evt) {
    if (evt.keyCode === window.pin.ENTER_KEYCODE) {
      onMainMarkerMouseDown();
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
    notice: notice,
    mainMarker: mainMarker
  };

})();
