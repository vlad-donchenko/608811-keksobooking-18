'use strict';

(function () {
  var mapFilter = window.data.map.querySelector('.map__filters-container');
  var offerInfoModalTemplate = document.querySelector('#card').content;

  var removeModal = function () {
    var modal = window.data.map.querySelector('.popup');
    if (modal) {
      modal.remove();
    }
  };

  var getOfferModal = function (object) {
    var modal = offerInfoModalTemplate.cloneNode(true);
    var modalTitle = modal.querySelector('.popup__title');
    modalTitle.textContent = object.offer.title;
    var modalAddress = modal.querySelector('.popup__text--address');
    modalAddress.textContent = object.offer.address;
    var modalPrice = modal.querySelector('.popup__text--price');
    modalPrice.textContent = object.offer.price + '₽/ночь';
    var modalType = modal.querySelector('.popup__type');
    modalType.textContent = window.data.types[object.offer.type].ru;
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
      if (array.length > 0) {
        photosWrapImage.src = '' + array[0];
        for (var i = 1; i < array.length; i++) {
          var newImage = photosWrapImage.cloneNode(true);
          newImage.src = array[i];
          modalPhotos.appendChild(newImage);
        }
      } else {
        photosWrapImage.remove();
      }
    };
    addPhoto(object.offer.photos);

    removeModal();

    window.data.map.insertBefore(modal, mapFilter);
  };

  window.card = {
    getOfferModal: getOfferModal
  };
})();
