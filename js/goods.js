'use strict';

var basketGoods = [];
var basketCards = document.querySelector('.goods__cards');


//  функция  генерации случайного boolean
function getRandomBool() {
  return Math.random() >= 0.5;
}
// Случайное целое между min и max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  функция  генерации случайных данных
var getRandomAttribute = function (arr) {
  var randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
};


var CATALOG_NAMES = [
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

// адрес изображения для товара. Случайное значение из массива, содержащего пути до изображений, лежащих в папке img/cards

var CATALOG_PICTURE = [
  './img/cards/gum-cedar.jpg',
  './img/cards/gum-chile.jpg',
  './img/cards/gum-eggplant.jpg',
  './img/cards/gum-mustard.jpg',
  './img/cards/gum-portwine.jpg',
  './img/cards/gum-wasabi.jpg',
  './img/cards/ice-cucumber.jpg',
  './img/cards/ice-eggplant.jpg',
  './img/cards/ice-garlic.jpg',
  './img/cards/ice-italian.jpg',
  './img/cards/ice-mushroom.jpg',
  './img/cards/ice-pig.jpg',
  './img/cards/marmalade-beer.jpg',
  './img/cards/marmalade-caviar.jpg',
  './img/cards/marmalade-corn.jpg',
  './img/cards/marmalade-new-year.jpg',
  './img/cards/marmalade-sour.jpg',
  './img/cards/marshmallow-bacon.jpg',
  './img/cards/marshmallow-beer.jpg',
  './img/cards/marshmallow-shrimp.jpg',
  './img/cards/marshmallow-spicy.jpg',
  './img/cards/marshmallow-wine.jpg',
  './img/cards/soda-bacon.jpg',
  './img/cards/soda-celery.jpg',
  './img/cards/soda-cob.jpg',
  './img/cards/soda-garlic.jpg',
  './img/cards/soda-peanut-grapes.jpg',
  './img/cards/soda-russian.jpg'
];

var catalog = {
  numbers: {
    MAX: 27
  },
  amount: {
    MIN: 0,
    MAX: 20
  },
  price: {
    MIN: 100,
    MAX: 1500
  },
  weight: {
    MIN: 100,
    MAX: 300
  },
  raitingValue: {
    MIN: 1,
    MAX: 5
  },
  raitingNumber: {
    MIN: 10,
    MAX: 900
  },
  nutritionEnergy: {
    MIN: 70,
    MAX: 500
  }
};

var CATALOG_NUTRITION_COMMENTS = [
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
  'виллабаджо',
];

var ratingClasses = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var similarCatalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

//  функция создания DOM-элемента на основе JS-объекта
var catalogCardsArr = [];

var getCharactersCatalog = function () {
  for (var i = 0; i < catalog.numbers.MAX; i++) {
    catalogCardsArr.push({
      id: i,
      name: getRandomAttribute(CATALOG_NAMES),
      picture: getRandomAttribute(CATALOG_PICTURE),
      amount: getRandomInt(catalog.amount.MIN, catalog.amount.MAX),
      price: getRandomInt(catalog.price.MIN, catalog.price.MAX),
      weight: getRandomInt(catalog.weight.MIN, catalog.weight.MAX),
      rating: {
        value: getRandomInt(catalog.raitingValue.MIN, catalog.raitingValue.MAX),
        number: getRandomInt(catalog.raitingNumber.MIN, catalog.raitingNumber.MAX)
      },
      nutritionFacts: {
        sugar: getRandomBool(),
        energy: getRandomInt(catalog.nutritionEnergy.MIN, catalog.nutritionEnergy.MAX),
        contents: getRandomAttribute(CATALOG_NUTRITION_COMMENTS)
      }
    });
  }
};

getCharactersCatalog();

// Отрисовывает карточки по шаблону

var renderCatalogElement = function (catalogItem) {
  var catalogElement = similarCatalogTemplate.cloneNode(true);
  catalogElement.querySelector('.card__title').textContent = catalogItem.name;
  similarCatalogTemplate.setAttribute('id', catalogItem.id);
  var goodsImage = catalogElement.querySelector('.card__img');
  goodsImage.src = catalogItem.picture;
  goodsImage.alt = catalogItem.name;
  var AMOUNT_MEDIUM = 5;
  if (catalogItem.amount > AMOUNT_MEDIUM) {
    catalogElement.classList.add('card--in-stock');
  } else if (catalogItem.amount >= 1 && catalogItem.amount <= AMOUNT_MEDIUM) {
    catalogElement.classList.add('card--little');
  } else if (catalogItem.amount === 0) {
    catalogElement.classList.add('card--soon');
  }
  catalogElement.querySelector('.card__price').innerHTML = catalogItem.price + '<span class="card__currency">&#x20BD;</span> <span class="card__weight">/' + catalogItem.weight + 'Г</span>';
  var starsRating = catalogElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  starsRating.classList.add('stars__rating--' + ratingClasses[catalogItem.rating.value]);
  catalogElement.querySelector('.star__count').textContent = catalogItem.rating.number;
  catalogElement.querySelector('.card__characteristic').textContent = catalogItem.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
  catalogElement.querySelector('.card__composition-list').textContent = catalogItem.nutritionFacts.contents;
  var addBasketBtn = catalogElement.querySelector('.card__btn');
  addBasketBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    addBasket(catalogItem);
  });
  return catalogElement;
};

var fragment = document.createDocumentFragment();

var appendCatalog = function () {

  for (var i = 0; i < catalogCardsArr.length; i++) {
    fragment.appendChild(renderCatalogElement(catalogCardsArr[i]), i);
  }
  catalogCards.appendChild(fragment);
};

appendCatalog();

// Добавление товара в корзину
var fragmentBasket = document.createDocumentFragment();

var removeBasket = function (id) {
  var newBasket = [];
  for (var i = 0; i < basketGoods.length; i++) {
    if (basketGoods[i].id !== id) {
      newBasket.push(basketGoods[i]);
    }
  }
  basketGoods = newBasket.slice();
};

// clearCard();
var renderBasket = function () {
  basketCards.innerHTML = '';
  for (var i = 0; i < basketGoods.length; i++) {
    fragmentBasket.appendChild(renderBasketElement(basketGoods[i]));
  }
  basketCards.appendChild(fragmentBasket);
};

var renderBasketElement = function (catalogItem) {
  var basketElement = similarBasketTemplate.cloneNode(true);
  basketElement.querySelector('.card-order__title').textContent = catalogItem.name;
  var goodsImage = basketElement.querySelector('.card-order__img');
  goodsImage.src = catalogItem.picture;
  goodsImage.alt = catalogItem.name;
  basketElement.querySelector('.card-order__price').innerHTML = catalogItem.price + '<span class="card__currency">&#x20BD;</span>';
  var cardOrderAmount = basketElement.querySelector('.card-order__amount');
  var btnIncrease = cardOrderAmount.querySelector('.card-order__btn--increase');
  var btnDecrease = cardOrderAmount.querySelector('.card-order__btn--decrease');
  var basketAmount = basketElement.querySelector('.card-order__count');
  basketAmount.value = 1;

  var cardOrderAmountHandler = function (evt) {

    evt.preventDefault();
    var currentValue = parseInt(basketAmount.value, 10);
    if (evt.target === btnIncrease) {
      currentValue++;
      basketAmount.value = currentValue;
    }
    if (evt.target === btnDecrease) {
      if (currentValue > 1) {
        currentValue--;
        basketAmount.value = currentValue;
      } else {
        removeBasket(catalogItem.id);
        renderBasket();
      }
    }
  };

  cardOrderAmount.addEventListener('click', cardOrderAmountHandler);

  var orderClose = basketElement.querySelector('.card-order__close');

  orderClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    removeBasket(catalogItem.id);
    renderBasket();
    basketCounting();
  });
  return basketElement;
};


// Функция увеличения:

var incCount = function (index) {
  if (basketGoods[index].amount === basketGoods[index].count) {
    return;
  }
  basketGoods[index].count += 1;
  basketCounting();
};

var addBasket = function (item) {
  var index = basketGoods.indexOf(item);
  if (index === -1) {
    basketGoods.push(item);
    index = basketGoods.indexOf(item);
    basketGoods[index].count = 0;
  }
  incCount(index);
  renderBasket();
  basketCounting();
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

var basketCounting = function () {
  var basketHeader = document.querySelector('.main-header__basket');
  var basketParams = {
    count: 0,
    price: 0
  };

  if (basketGoods.length > 0) {
    for (var i = 0; i < basketGoods.length; i++) {
      basketParams.count += basketGoods[i].count;
      basketParams.price += basketGoods[i].price * basketGoods[i].count;
    }
    basketHeader.innerHTML = basketParams.count + ' ' + basketHeaderTitle(basketParams.count, ['товар', 'товара', 'товаров']) + ' на сумму ' + basketParams.price + '₽';
  } else {
    basketHeader.textContent = 'В корзине ничего нет';
  }
  renderBasket();
};

basketCounting();

var similarBasketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

// Добавление в Избранное

var btnFavorite = catalogCards.querySelectorAll('.card__btn-favorite');

var btnFavoriteHandler = function (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-favorite--selected');
};
btnFavorite.forEach(function (btn) {
  btn.addEventListener('click', btnFavoriteHandler);
});

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
