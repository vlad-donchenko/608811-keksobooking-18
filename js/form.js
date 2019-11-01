'use strict';

(function () {
  var mainForm = window.map.notice.querySelector('.ad-form');
  var mainFormFieldsets = mainForm.querySelectorAll('fieldset');
  var roomNumberSelect = window.map.notice.querySelector('#room_number');
  var capacitySelect = window.map.notice.querySelector('#capacity');
  var priceInput = window.map.notice.querySelector('#price');
  var typeSelect = window.map.notice.querySelector('#type');
  var checkInSelect = window.map.notice.querySelector('#timein');
  var checkOutSelect = window.map.notice.querySelector('#timeout');
  var resetFormButton = window.map.notice.querySelector('.ad-form__reset');
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  window.map.writeCoordinates();

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
    onTypeValidationChange: onTypeValidationChange
  };
})();
