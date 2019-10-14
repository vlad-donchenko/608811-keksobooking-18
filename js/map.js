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

  mainMarker.addEventListener('mousedown', onMainMarkerMouseDown);
  mainMarker.addEventListener('keydown', onMainMarkerKeydown);

  window.map = {
    notice: notice,
    mainMarker: mainMarker
  };

})();
