'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MARKER_WIDTH = 50;
  var MARKER_HEIGHT = 70;
  var adsMarkerTemplate = document.querySelector('#pin').content;

  var removeModal = function () {
    var modal = window.data.map.querySelector('.popup');
    if (modal) {
      modal.remove();
    }
  };

  var getNewMarkers = function (object) {
    var item = adsMarkerTemplate.cloneNode(true);
    var itemButton = item.querySelector('.map__pin');
    var markerImage = itemButton.querySelector('img');
    itemButton.style.left = object.location.x - MARKER_WIDTH / 2 + 'px';
    itemButton.style.top = object.location.y - MARKER_HEIGHT + 'px';
    markerImage.src = object.author.avatar;
    window.data.itemContainer.appendChild(item);

    var closeModal = function () {
      var modal = window.data.map.querySelector('.popup');
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
      window.card.getOfferModal(object);
      closeModal();
    });

    itemButton.addEventListener('keyup', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.card.getOfferModal(object);
        closeModal();
      }
    });

    return item;
  };

  window.pin = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getNewMarkers: getNewMarkers
  };
})();
