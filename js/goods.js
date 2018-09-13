'use strict';
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
  'Острый язычок]'
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
    MAX: 26
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

//  функция создания DOM-элемента на основе JS-объекта
var catalogCardsArr = [];

var getCharactersCatalog = function () {
  for (var catalogNumbersMin = 0; catalogNumbersMin < catalog.numbers.MAX; catalogNumbersMin++) {
    catalogCardsArr.push({
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

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var similarCatalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var RatingClasses = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

// наполнение блока по шаблону
function renderCatalogElement(catalogItem) {
  var catalogElement = similarCatalogTemplate.cloneNode(true);
  catalogElement.querySelector('.card__title').textContent = catalogItem.name;

  var goodsImage = catalogElement.querySelector('.card__img');
  goodsImage.src = catalogItem.picture;
  goodsImage.alt = catalogItem.name;
  var AMOUNT_MEDIUM = 5;
  if (catalogItem.amount > AMOUNT_MEDIUM) {
    catalogElement.classList.add('.card--in-stock');
  } else if (catalogItem.amount >= 1 && catalogItem.amount <= AMOUNT_MEDIUM) {
    catalogElement.classList.add('.card--little');
  } else if (catalogItem.amount === 0) {
    catalogElement.classList.add('.card--soon');
  }

  catalogElement.querySelector('.card__price').innerHTML = catalogItem.price + '<span class="card__currency">&#x20BD;</span> <span class="card__weight">/' + catalogItem.weight + 'Г</span>';

  var starsRating = catalogElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');

  starsRating.classList.add('stars__rating--' + RatingClasses[catalogItem.rating.value]);

  catalogElement.querySelector('.star__count').textContent = catalogItem.rating.number;

  catalogElement.querySelector('.card__characteristic').textContent = catalogItem.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

  catalogElement.querySelector('.card__composition-list').textContent = catalogItem.nutritionFacts.contents;

  return catalogElement;
}

var fragment = document.createDocumentFragment();
var appendCatalog = function () {

  for (var i = 0; i < catalogCardsArr.length; i++) {
    fragment.appendChild(renderCatalogElement(catalogCardsArr[i]));
  }

  catalogCards.appendChild(fragment);
};
appendCatalog();

// var BASKET_MAX = 3;
// var startIndex = getRandomInt(catalog.numbers.MAX - BASKET_MAX, BASKET_MAX);
// var basketGoods = catalogCardsArr.slice(startIndex, (startIndex + BASKET_MAX));

// var basketGoods = catalogCardsArr.slice(getRandomInt(catalog.numbers.MAX - BASKET_MAX), BASKET_MAX);

var basketCards = document.querySelector('.goods__cards');
basketCards.classList.remove('goods__cards--empty');

var cardEmpty = document.querySelector('.goods__card-empty');
cardEmpty.classList.add('visually-hidden');
var similarBasketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
// наполнение блока по шаблону

function renderBasketElement(catalogItem) {
  var basketElement = similarBasketTemplate.cloneNode(true);
  basketElement.querySelector('.card-order__title').textContent = catalogItem.name;

  var goodsImage = basketElement.querySelector('.card-order__img');
  goodsImage.src = catalogItem.picture;
  goodsImage.alt = catalogItem.name;
  basketElement.querySelector('.card-order__price').innerHTML = catalogItem.price + '<span class="card__currency">&#x20BD;</span>';
  return basketElement;
}

function basketHeaderTitle(num, expressions) {
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
}

// Добавление товара в корзину

var basketGoods = [];
var fragmentBasket = document.createDocumentFragment();

var appendBasket = function () {

  for (var i = 0; i < basketGoods.length; i++) {

    fragmentBasket.appendChild(renderBasketElement(basketGoods[i]));
  }
  basketCards.appendChild(fragmentBasket);
};
appendBasket();

// var btnCard = catalogCards.querySelectorAll('.card__btn');
//
// var btnCardHandler = function () {
//   this.style.backgroundColor = 'red';
// };

// for (var i = 0; i < btnCard.length; i++) {
//   btnCard[i].addEventListener('click', btnCardHandler);
// }


var basketHeader = document.querySelector('.main-header__basket');
if (basketGoods.length > 0) {
  basketHeader.innerHTML = 'В козине ' + basketGoods.length + basketHeaderTitle(basketGoods.length, [' позиция', ' позиции', ' позиций']);
}


// Добавление в Избранное

// var btnFavorite = catalogCards.querySelectorAll('.card__btn-favorite');

// var btnFavoriteHandler = function () {
//   this.style.backgroundColor = (this.style.backgroundColor === 'red') ? '#e8e8e8' : 'red';
// };
//
// for (var j = 0; j < btnFavorite.length; j++) {
//   btnFavorite[j].addEventListener('click', btnFavoriteHandler);
// }
//
