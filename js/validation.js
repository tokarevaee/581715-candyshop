'use strict';

(function () {
// функция disable неактивных input-ов
  var disableField = function (element, isDisable) {
    var inputs = element.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.disabled = isDisable;
    });
  };
  var orderField = document.querySelector('#order');

  // Доставка

  var deliverWrap = orderField.querySelector('.deliver');
  var deliverCourier = deliverWrap.querySelector('.deliver__courier');
  var deliverStore = deliverWrap.querySelector('.deliver__store');
  var textareaDeliver = deliverCourier.querySelector('textarea');

  // Оплата
  var payment = orderField.querySelector('.payment');
  var paymentCashWrap = payment.querySelector('.payment__cash-wrap');
  var paymentCardWrap = payment.querySelector('.payment__card-wrap');

  // доставка

  var toggleDelivery = function (evt) {
    var inputsChecked = deliverStore.querySelector('input[checked]');
    if (evt.target.id === 'deliver__courier') {
      deliverCourier.classList.remove('visually-hidden');
      deliverStore.classList.add('visually-hidden');
      textareaDeliver.disabled = false;
      disableField(deliverCourier, false);

      inputsChecked.setAttribute('disabled', 'true');

    } else if (evt.target.id === 'deliver__store') {
      deliverStore.classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
      disableField(deliverCourier, true);
      textareaDeliver.disabled = true;
      inputsChecked.removeAttribute('disabled', 'false');
    }
  };

  // Переключение способа оплаты
  var togglePayment = function (evt) {
    if (evt.target.id === 'payment__cash') {
      paymentCashWrap.classList.remove('visually-hidden');
      paymentCardWrap.classList.add('visually-hidden');
      disableField(paymentCardWrap, true);
    } else if (evt.target.id === 'payment__card') {
      paymentCardWrap.classList.remove('visually-hidden');
      paymentCashWrap.classList.add('visually-hidden');
      disableField(paymentCardWrap, false);
    }
  };

  deliverWrap.addEventListener('click', toggleDelivery);
  payment.addEventListener('click', togglePayment);

  // валидация имени владельца карты

  var contactData = document.querySelector('.contact-data');
  var userNameInput = contactData.querySelector('#contact-data__name');


  var userNameInputHandler = function (input) {
    if (input.validity.tooShort) {
      input.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (input.validity.tooLong) {
      input.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (input === 0) {
      input.setCustomValidity('Обязательное поле');
    } else {
      input.setCustomValidity('');
    }
  };

  userNameInput.addEventListener('invalid', userNameInputHandler(userNameInput));

  // Проверка статусы карты

  var cardNumber = payment.querySelector('#payment__card-number');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var cardholder = payment.querySelector('#payment__cardholder');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardStatus = payment.querySelector('.payment__card-status');

  var validationCardStatus = function () {
    var number = cardNumber.checkValidity();
    var cvc = cardCvc.checkValidity();
    var name = cardholder.checkValidity();
    var date = cardDate.checkValidity();
    if (number && cvc && name && date) {
      cardStatus.textContent = 'Определен';
    } else {
      cardStatus.textContent = 'Не определен';
    }
  };

  // держатель карты

  cardholder.addEventListener('input', function () {
    validationCardStatus();
  });

  // валидация формы order.js


  var formPayment = document.querySelector('.payment');

  // валидация даты действия карты

  var paymentCardDate = formPayment.querySelector('#payment__card-date');

  var paymentCardDateValidate = function () {
    if (paymentCardDate.value.length !== 0) {
      var paymentDateValue = paymentCardDate.value.split('/');

      if (!paymentDateValue[0] || paymentDateValue[0].length !== 2) {
        paymentCardDate.setCustomValidity('месяц не корректен');
      } else if (paymentDateValue[0] === '00' || paymentDateValue[0] > 12) {
        paymentCardDate.setCustomValidity('месяц не корректен. Диапазон от 01 до 12');
      } else if (!paymentDateValue[1] || paymentDateValue[1].length !== 2 || paymentDateValue[1] < 18) {
        paymentCardDate.setCustomValidity('год не корректен');
      } else {
        paymentCardDate.setCustomValidity('');
        return true;
      }
    }
    validationCardStatus();
    return false;
  };

  cardDate.addEventListener('input', paymentCardDateValidate);


  // Проверка введенного номера карты
  // 6011000990139424 валидация номера карты

  var paymentCardNumber = formPayment.querySelector('#payment__card-number');
  var MAX_CARD_LENGTH = 16;

  var validationCardNumber = function () {
    var cardValue = paymentCardNumber.value;
    var charLess = cardValue.replace(/\D/g, '');
    var checkSum = 0;
    if (charLess.length !== 0) {
      var arrayNumber = charLess.split('');

      if (arrayNumber.length === MAX_CARD_LENGTH) {
        var value;

        for (var i = 0; i < arrayNumber.length; i++) {
          var number = parseInt(arrayNumber[i], 10);
          if (i % 2 === 0) {
            value = number * 2;
            if (value > 9) {
              value -= 9;
            }
            checkSum += value;
          } else {
            checkSum += number;
          }
        }
      }
    }
    return (checkSum % 10 === 0);
  };

  cardNumber.addEventListener('input', function () {
    if (validationCardNumber() === false) {
      cardNumber.setCustomValidity('Введен неверный номер');
    } else {
      cardNumber.setCustomValidity('');
    }
    validationCardStatus();
  });

  // валидация CVC

  var validationCardCvc = function () {
    var arrayCardCvc = cardCvc.value.split('');
    if (cardCvc.value.length !== 0) {
      if (arrayCardCvc[0] > 0) {
        cardCvc.setCustomValidity('');
        return true;
      }
    } cardCvc.setCustomValidity('Диапазон значений должен быть от 100 до 999');
    validationCardStatus();
    return false;
  };

  cardCvc.addEventListener('input', validationCardCvc);

  // доставка

  var deliverFloor = deliverWrap.querySelector('#deliver__floor');

  deliverFloor.addEventListener('input', function () {
    var valueDeliverFloor = deliverFloor.value;
    if (isNaN(valueDeliverFloor)) {
      deliverFloor.setCustomValidity('Поле должно содержать только числа');
    } else {
      deliverFloor.setCustomValidity('');
    }
  });

  // При клике на input изменение изображения

  var choseMapImg = function (evt) {
    var storeMapImage = deliverWrap.querySelector('.deliver__store-map-img');
    if (evt.target.name === 'store') {
      storeMapImage.src = 'img/map/' + evt.target.value + '.jpg';
    }
  };

  deliverStore.addEventListener('click', choseMapImg);
})();
