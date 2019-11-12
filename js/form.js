'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PREVIEW_ROOM_IMG_SIZE = 70;
  var mainForm = window.map.notice.querySelector('.ad-form');
  var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
  var roomNumberSelect = window.map.notice.querySelector('#room_number');
  var capacitySelect = window.map.notice.querySelector('#capacity');
  var priceInput = window.map.notice.querySelector('#price');
  var typeSelect = window.map.notice.querySelector('#type');
  var checkInSelect = window.map.notice.querySelector('#timein');
  var checkOutSelect = window.map.notice.querySelector('#timeout');
  var resetFormButton = window.map.notice.querySelector('.ad-form__reset');
  var userAvatarFileChooser = mainForm.querySelector('#avatar');
  var userAvatarPreview = mainForm.querySelector('.ad-form-header__preview');
  var roomImageFileChooser = mainForm.querySelector('#images');
  var roomImagePreview = mainForm.querySelector('.ad-form__photo');
  var RoomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var disabledPreviewUserAvatar = function () {
    var image = userAvatarPreview.querySelector('img');
    image.src = DEFAULT_AVATAR;
  };

  var disabledPreviewRoom = function () {
    var image = roomImagePreview.querySelector('img');
    if (image) {
      image.remove();
    }
  };

  var getNewPreviewContainer = function (src) {
    var image = document.createElement('img');
    image.src = src;
    image.alt = 'Фото жилья';
    image.width = PREVIEW_ROOM_IMG_SIZE;
    image.height = PREVIEW_ROOM_IMG_SIZE;
    roomImagePreview.appendChild(image);
  };

  var getPreview = function (fileChooser, containerPreview) {

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (imgName) {
          return fileName.endsWith(imgName);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            if (!containerPreview.classList.contains('ad-form__photo')) {
              var image = containerPreview.querySelector('img');
              image.src = reader.result;
            } else {
              getNewPreviewContainer(reader.result, containerPreview);
            }
          });

          reader.readAsDataURL(file);
        }
      }
    });
  };

  getPreview(userAvatarFileChooser, userAvatarPreview);
  getPreview(roomImageFileChooser, roomImagePreview);

  window.map.writeCoordinates();

  var disabledNoticeForm = function () {
    for (var i = 0; i < mainFormFieldsets.length; i++) {
      mainFormFieldsets[i].disabled = true;
    }
  };

  var activeNoticeForm = function () {
    for (var i = 0; i < mainFormFieldsets.length; i++) {
      mainFormFieldsets[i].disabled = false;
    }

    mainForm.classList.remove('ad-form--disabled');
  };

  var onRoomNumberChange = function () {
    if (capacitySelect.options.length > 0) {
      [].forEach.call(capacitySelect.options, function (item) {
        var status = !(RoomsCapacity[roomNumberSelect.value].indexOf(item.value) >= 0);
        item.selected = (RoomsCapacity[roomNumberSelect.value][0] === item.value);
        item.hidden = status;
        item.disabled = status;
      });
    }
  };

  var onTypeValidationChange = function () {
    priceInput.min = window.data.types[typeSelect.value].startPrice;
    priceInput.placeholder = window.data.types[typeSelect.value].startPrice;
    priceInput.value = '';
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
  roomNumberSelect.addEventListener('change', onRoomNumberChange);
  typeSelect.addEventListener('change', onTypeValidationChange);
  checkInSelect.addEventListener('change', onCheckInChange);
  checkOutSelect.addEventListener('change', onCheckOutChange);

  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.save(window.map.deActivatePage, window.map.showLoadErrorMassage, window.data.saveRequest, new FormData(mainForm));
  });

  resetFormButton.addEventListener('click', function () {
    window.map.deActivatePage();
  });

  window.form = {
    activeNoticeForm: activeNoticeForm,
    disabledNoticeForm: disabledNoticeForm,
    mainForm: mainForm,
    onTypeValidationChange: onTypeValidationChange,
    disabledPreviewUserAvatar: disabledPreviewUserAvatar,
    disabledPreviewRoom: disabledPreviewRoom
  };
})();
