'use strict';

var NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var PICTURES = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

var amount = {
  MIN: 0,
  MAX: 20
};

var price = {
  MIN: 100,
  MAX: 1500
};

var weight = {
  MIN: 30,
  MAX: 300
};

var rating = {
  value: {
    MIN: 1,
    MAX: 5
  },
  number: {
    MIN: 10,
    MAX: 900
  }
};

var nutritionFacts = {
  energy: {
    MIN: 70,
    MAX: 500
  }
};

var CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var STARS_RATING = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

var CATALOG_COUNT = 26;

// Функция генерации рандомного значения Boolean
function getRandomBoolean() {
  return Math.random() >= 0.5;
}
// Функция генерации рандомного значения между MIN и MAX
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция рандомного значения данных
function getRandomAttribute(arr) {
  var randomInteger = Math.floor(Math.random() * arr.length);
  return arr[randomInteger];
}

// Массив товаров
var candyGoods = [];

// Массив корзины
var basketGoods = [];

// Заполнение массива товаров случайными данными
var makeRandomGoods = function () {
  for (var i = 0; i < CATALOG_COUNT; i++) {
    candyGoods.push({
      name: getRandomAttribute(NAMES),
      picture: './img/cards/' + getRandomAttribute(PICTURES) + '.jpg',
      amount: getRandomNumber(amount.MIN, amount.MAX),
      price: getRandomNumber(price.MIN, price.MAX),
      weight: getRandomNumber(weight.MIN, weight.MAX),
      rating: {
        value: getRandomNumber(rating.value.MIN, rating.value.MAX),
        number: getRandomNumber(rating.number.MIN, rating.number.MAX)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomNumber(nutritionFacts.energy.MIN, nutritionFacts.energy.MAX),
        contents: getRandomAttribute(CONTENTS)
      }
    });
  }
};

makeRandomGoods();


var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');

var cardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');


// Корзина
var basketCards = document.querySelector('.goods__cards');

var basketCount = function () {
  var countObject = {
    count: 0,
    price: 0
  };
  for (var i = 0; i < basketGoods.length; i++) {
    countObject.count += basketGoods[i].count;
    countObject.price += basketGoods[i].price * basketGoods[i].count;
  }
  return countObject;
};

var basketHeaderTitle = function (num, expressions) {
  var result;
  var count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expressions['2'];
  } else {
    count = count % 10;
    if (count === 1) {
      result = expressions['0'];
    } else if (count >= 2 && count <= 4) {
      result = expressions['1'];
    } else {
      result = expressions['2'];
    }
  }
  return result;
};

var changeMainBasketHeader = function () {
  var mainBasketHeaderElement = document.querySelector('.main-header__basket');

  var countObject = basketCount();

  if (countObject.count > 0) {
    mainBasketHeaderElement.innerHTML = 'В корзине ' + countObject.count + basketHeaderTitle(countObject.count, [' товар', ' товара', ' товаров']) + ' на сумму ' + countObject.price + ' ₽';
  } else {
    mainBasketHeaderElement.innerHTML = 'В корзине ничего нет';
  }
};

var showEmptyBasket = function () {
  basketCards.innerHTML = '<div class="goods__card-empty"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
};

var renderBasket = function (candy, basketIndex) {
  var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
  var index = null;

  for (var i = 0; i < candyGoods.length; i++) {
    if (candyGoods[i].name + '_' + candyGoods[i].amount === candy.id) {
      index = i;
      break;
    }
  }

  cardBasketElement.querySelector('.card-order__title').textContent = candyGoods[index].name;
  cardBasketElement.querySelector('.card-order__img').src = candyGoods[index].picture;
  cardBasketElement.querySelector('.card-order__price').textContent = candyGoods[index].price + ' ₽';
  cardBasketElement.querySelector('.card-order__count').value = candy.count;

  var closeButton = cardBasketElement.querySelector('.card-order__close');

  closeButton.addEventListener('click', function (evt) {
    // удалить элемент из массива basketGoods
    evt.preventDefault();
    basketGoods.splice(basketIndex, 1);

    renderBasketGoods();
    if (basketGoods.length === 0) {
      showEmptyBasket();
    }
  });

  // обработку кнопок +/-
  var increaseButton = cardBasketElement.querySelector('.card-order__btn--increase');
  var decreaseButton = cardBasketElement.querySelector('.card-order__btn--decrease');

  increaseButton.addEventListener('click', function (evt) {
    // увеличивает количество товаров в корзине
    evt.preventDefault();

    if (basketGoods[basketIndex].count < basketGoods[basketIndex].amount) {
      basketGoods[basketIndex].count += 1;
    }

    renderBasketGoods();
  });

  decreaseButton.addEventListener('click', function (evt) {
    // уменьшает количество товаров в корзине
    evt.preventDefault();

    if (basketGoods[basketIndex].count > 1) {
      basketGoods[basketIndex].count -= 1;
    } else {
      basketGoods.splice(basketIndex, 1);
      showEmptyBasket();
    }

    renderBasketGoods();
  });

  basketCards.appendChild(cardBasketElement);
};

var renderBasketGoods = function () {
  basketCards.innerHTML = '';
  for (var i = 0; i < basketGoods.length; i++) {
    renderBasket(basketGoods[i], i);
  }

  changeMainBasketHeader();
};

// Заполнение шаблона
var renderCandy = function (candy) {
  var candyElement = cardTamplate.cloneNode(true);
  var amountClass;

  if (candy.amount === 0) {
    amountClass = 'card--soon';
  } else if (candy.amount >= 1 && candy.amount <= 5) {
    amountClass = 'card--little';
  } else if (candy.amount > 5) {
    amountClass = 'card--in-stock';
  }

  candyElement.className = 'card catalog__card ' + amountClass;
  candyElement.querySelector('.card__title').textContent = candy.name;

  var candyImage = candyElement.querySelector('.card__img');
  candyImage.src = candy.picture;
  candyImage.alt = candy.name;

  var cardPrice = candyElement.querySelector('.card__price');
  cardPrice.childNodes[0].textContent = candy.price;
  cardPrice.querySelector('.card__currency').textContent = ' ₽';
  cardPrice.querySelector('.card__weight').textContent = '/ ' + candy.weight + 'Г';

  var starsRating = candyElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');

  starsRating.classList.add(getRandomAttribute(STARS_RATING));

  candyElement.querySelector('.star__count').textContent = candy.rating.number;

  candyElement.querySelector('.card__characteristic').textContent = candy.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

  candyElement.querySelector('.card__composition-list').textContent = candy.nutritionFacts.contents;

  var compositionButton = candyElement.querySelector('.card__btn-composition');
  var composition = candyElement.querySelector('.card__composition');

  // Показывает и скрывает состав
  compositionButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    composition.classList.toggle('card__composition--hidden');
  });

  var favoriteBtn = candyElement.querySelector('.card__btn-favorite');

  favoriteBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__btn-favorite--selected');
    favoriteBtn.blur();
  });

  var addButton = candyElement.querySelector('.card__btn');

  addButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    var candyId = candy.name + '_' + candy.amount;
    var inBasket = false;

    for (var i = 0; i < basketGoods.length; i++) {
      if (basketGoods[i].id === candyId) {
        inBasket = true;
        break;
      }
    }

    if (!inBasket) {
      basketGoods.push({id: candyId, amount: candy.amount, count: 1, price: candy.price});
    } else {
      if (basketGoods[i].count < basketGoods[i].amount) {
        basketGoods[i].count += 1;
      } else {
        candyElement.classList.remove('card--in-stock');
        candyElement.classList.add('card--soon');
      }
    }
    renderBasketGoods();
  });

  return candyElement;
};

var fragment = document.createDocumentFragment();
var appendCandy = function () {

  for (var i = 0; i < candyGoods.length; i++) {
    fragment.appendChild(renderCandy(candyGoods[i]));
  }

  catalogCards.appendChild(fragment);
};
appendCandy();


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

deliverFloor.addEventListener('blur', function () {
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

// ОБРАБАТЫВАЕМ  .range__btn в фильтре по цене://///////////////////////////////////////////////////////

var priceRangeBar = document.querySelector('.range__filter');
var priceRangeBtnLeft = priceRangeBar.querySelector('.range__btn--left');
var priceRangeBtnRight = priceRangeBar.querySelector('.range__btn--right');
var priceBtnWidth = priceRangeBtnLeft.offsetWidth;
var priceRangeLine = priceRangeBar.querySelector('.range__fill-line');
var priceRangeBarWidth = priceRangeBar.offsetWidth - priceBtnWidth;
var leftEdge = priceRangeBar.getBoundingClientRect().left;
var rightEdge = priceRangeBar.getBoundingClientRect().right - priceBtnWidth;
var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');
var MIN_PRICE = 60;
var MAX_PRICE = 230;
var positionBtnLeft = 0;
var positionBtnRight = rightEdge - leftEdge;
priceRangeBtnLeft.style.left = positionBtnLeft + 'px';
priceRangeBtnRight.style.left = positionBtnRight + 'px';
priceRangeLine.style.left = positionBtnLeft + priceBtnWidth / 2 + 'px';
priceRangeLine.style.right = priceRangeBarWidth - positionBtnRight + priceBtnWidth / 2 + 'px';


var calcPriceValue = function (positionBtn) {
  return Math.round(positionBtn / priceRangeBarWidth * (MAX_PRICE - MIN_PRICE) + MIN_PRICE);
};

rangePriceMin.textContent = calcPriceValue(positionBtnLeft);
rangePriceMax.textContent = calcPriceValue(positionBtnRight);

var priceRangeBtnHandler = function (evt, buttonElement, minLeft, maxRight, priceEl, isLeftBtn) {
  var shiftX = evt.clientX - buttonElement.getBoundingClientRect().left;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    var newLeft = event.clientX - shiftX - leftEdge;

    if (newLeft < minLeft) {
      newLeft = minLeft;
    } else if (newLeft > maxRight) {
      newLeft = maxRight;
    }

    buttonElement.style.left = newLeft + 'px';
    priceEl.textContent = calcPriceValue(newLeft);

    if (isLeftBtn) {
      priceRangeLine.style.left = newLeft + shiftX + 'px';
      positionBtnLeft = newLeft;
    } else {
      priceRangeLine.style.right = priceRangeBarWidth - newLeft + shiftX + 'px';
      positionBtnRight = newLeft;
    }
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
};


priceRangeBtnLeft.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  priceRangeBtnHandler(evt, priceRangeBtnLeft, 0, positionBtnRight, rangePriceMin, true);
});

priceRangeBtnRight.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  priceRangeBtnHandler(evt, priceRangeBtnRight, positionBtnLeft, priceRangeBarWidth, rangePriceMax, false);
});
