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

for (var j = 0; j < btnFavorite.length; j++) {
  btnFavorite[j].addEventListener('click', btnFavoriteHandler);
}

// функция выбора

var toggleClass = function (element, add, name) {
  if (add) {
    element.classList.remove(name);
  } else {
    element.classList.add(name);
  }
};

// функция выбора метода платежа

var paymentType = document.querySelector('.payment__method');
var paymentWrap = document.querySelector('.payment');

var paymentCardWrap = paymentWrap.querySelector('.payment__card-wrap');
var paymentCashWrap = paymentWrap.querySelector('.payment__cash-wrap');
var paymentCardBtn = document.querySelector('#payment__card');
var paymentCashBtn = document.querySelector('#payment__cash');
var inputCardWrap = paymentCardWrap.querySelectorAll('input');

paymentType.addEventListener('click', function () {
  toggleClass(paymentCardWrap, paymentCardBtn.checked, 'visually-hidden');
  toggleClass(paymentCashWrap, paymentCashBtn.checked, 'visually-hidden');
  if (paymentCashBtn.checked) {
    for (var i = 0; i < inputCardWrap.length; i++) {
      inputCardWrap[i].setAttribute('disabled', '');
    }
  }
});

// функция выбора доставки

var deliverType = document.querySelector('.deliver__toggle');
var deliverWrap = document.querySelector('.deliver');
var deliverStoredWrap = deliverWrap.querySelector('.deliver__store');
var deliverCourierWrap = deliverWrap.querySelector('.deliver__courier');
var deliverStoreBtn = document.querySelector('#deliver__store');
var deliverCourierBtn = document.querySelector('#deliver__courier');


deliverType.addEventListener('click', function () {
  toggleClass(deliverStoredWrap, deliverStoreBtn.checked, 'visually-hidden');
  toggleClass(deliverCourierWrap, deliverCourierBtn.checked, 'visually-hidden');
});

// валидация формы order.js

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

var formPayment = document.querySelector('.payment');
var paymentCardNumber = formPayment.querySelector('#payment__card-number');
var MAX_CARD_LENGTH = 16;

var validationCardNumber = function () {
  var cardValue = paymentCardNumber.value;
  var charLess = cardValue.replace(/\D/g, '');

  if (charLess.length !== 0) {
    var arrayNumber = charLess.split('');

    if (arrayNumber.length === MAX_CARD_LENGTH) {
      var value;
      var checkSum = 0;
      for (var i = 0; i < cardValue.length; i++) {
        var number = +arrayNumber[i];
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

// добавим валидацию карты на поле с номером карты

paymentCardNumber.addEventListener('blur', function () {
  if (validationCardNumber()) {
    document.querySelector('.payment__card-status').textContent = 'одобрен';
  } else {
    document.querySelector('.payment__card-status').textContent = 'не определен';
  }
});

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
