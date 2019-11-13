'use strict';

(function () {
  var mapFilter = window.data.map.querySelector('.map__filters-container');
  var offerInfoModalTemplate = document.querySelector('#card').content;

  var getOfferModal = function (object) {
    var modal = offerInfoModalTemplate.cloneNode(true);
    var modalTitle = modal.querySelector('.popup__title');

    if (object.offer.title) {
      modalTitle.textContent = object.offer.title;
    } else {
      modalTitle.classList.add('hidden');
    }

    var modalAddress = modal.querySelector('.popup__text--address');

    if (object.offer.address) {
      modalAddress.textContent = object.offer.address;
    } else {
      modalAddress.classList.add('hidden');
    }

    var modalPrice = modal.querySelector('.popup__text--price');

    if (object.offer.price) {
      modalPrice.textContent = object.offer.price + '₽/ночь';
    } else {
      modalPrice.classList.add('hidden');
    }

    var modalType = modal.querySelector('.popup__type');

    if (object.offer.type) {
      modalType.textContent = window.data.types[object.offer.type].ru;
    } else {
      modalType.classList.add('hidden');
    }

    var modalCapacity = modal.querySelector('.popup__text--capacity');

    if (object.offer.rooms && object.offer.guests) {
      modalCapacity.textContent = object.offer.rooms + ' комнат для ' + object.offer.guests + ' гостей';
    } else if (object.offer.rooms) {
      modalCapacity.textContent = object.offer.rooms + ' комнат';
    } else if (object.offer.guests) {
      modalCapacity.textContent = object.offer.guests + ' гостей';
    } else {
      modalCapacity.classList.add('hidden');
    }

    var modalTimeAction = modal.querySelector('.popup__text--time');

    if (object.offer.checkin && object.offer.checkout) {
      modalTimeAction.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
    } else if (object.offer.checkin) {
      modalTimeAction.textContent = 'Заезд после ' + object.offer.checkin;
    } else if (object.offer.checkout) {
      modalTimeAction.textContent = 'Выезд до ' + object.offer.checkout;
    } else {
      modalTimeAction.classList.add('hidden');
    }
    var modalFeatures = modal.querySelector('.popup__features');
    var modalDescription = modal.querySelector('.popup__description');

    if (object.offer.description) {
      modalDescription.textContent = object.offer.description;
    } else {
      modalDescription.classList.add('hidden');
    }

    var modalPhotos = modal.querySelector('.popup__photos');
    var modalUserAvatar = modal.querySelector('.popup__avatar');

    if (object.author.avatar) {
      modalUserAvatar.src = object.author.avatar;
    } else {
      modalUserAvatar.classList.add('hidden');
    }

    var addFeatures = function (array) {
      var children = Array.from(modalFeatures.querySelectorAll('.popup__feature'));
      children.forEach(function (feature, index) {
        var featureName = feature.classList[1].replace('popup__feature--', '');
        if (array.indexOf(featureName) === -1) {
          children[index].remove();
        }
      });
    };
    addFeatures(object.offer.features);

    var addPhoto = function (array) {
      var photosWrapImage = modalPhotos.querySelector('.popup__photo');
      if (array.length > 0) {
        photosWrapImage.src = '' + array[0];
        array.slice(1).forEach(function (photo) {
          var newImage = photosWrapImage.cloneNode(true);
          newImage.src = photo;
          modalPhotos.appendChild(newImage);
        });
      } else {
        photosWrapImage.remove();
      }
    };
    addPhoto(object.offer.photos);

    window.pin.removeModal();

    window.data.map.insertBefore(modal, mapFilter);
  };

  window.card = {
    getOfferModal: getOfferModal
  };
})();
