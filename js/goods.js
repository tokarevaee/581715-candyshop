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

var CATALOG_NUMBERS_MAX = 26;

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
  '../img/cards/gum-cedar.jpg',
  '../img/cards/gum-chile.jpg',
  '../img/cards/gum-eggplant.jpg',
  '../img/cards/gum-mustard.jpg',
  '../img/cards/gum-portwine.jpg',
  '../img/cards/gum-wasabi.jpg',
  '../img/cards/ice-cucumber.jpg',
  '../img/cards/ice-eggplant.jpg',
  '../img/cards/ice-garlic.jpg',
  '../img/cards/ice-italian.jpg',
  '../img/cards/ice-mushroom.jpg',
  '../img/cards/ice-pig.jpg',
  '../img/cards/marmalade-beer.jpg',
  '../img/cards/marmalade-caviar.jpg',
  '../img/cards/marmalade-corn.jpg',
  '../img/cards/marmalade-new-year.jpg',
  '../img/cards/marmalade-sour.jpg',
  '../img/cards/marshmallow-bacon.jpg',
  '../img/cards/marshmallow-beer.jpg',
  '../img/cards/marshmallow-shrimp.jpg',
  '../img/cards/marshmallow-spicy.jpg',
  '../img/cards/marshmallow-wine.jpg',
  '../img/cards/soda-bacon.jpg',
  '../img/cards/soda-celery.jpg',
  '../img/cards/soda-cob.jpg',
  '../img/cards/soda-garlic.jpg',
  '../img/cards/soda-peanut-grapes.jpg',
  '../img/cards/soda-russian.jpg'
];

//  catalogAmount от 0 до 20 Количетсво
var CATALOG_AMOUNT_MIN = 0;
var CATALOG_AMOUNT_MAX = 20;

// console.log(catalogAmount);


// catalogPrice от 100 до 1500, Стоимость

var CATALOG_PRICE_MIN = 100;
var CATALOG_PRICE_MAX = 1500;

// catalogWeight  от 30 до 300, вес в граммах

var CATALOG_WEIGHT_MIN = 30;
var CATALOG_WEIGHT_MAX = 300;

// catalogRating  рейтинг: объект

var CATALOG_RAITING_VALUE_MIN = 30;
var CATALOG_RAITING_VALUE_MAX = 300;

var CATALOG_RAITING_NUMBER_MIN = 10;
var CATALOG_RAITING_NUMBER_MAX = 900;

var catalogRating = {
  value: getRandomInt(CATALOG_RAITING_VALUE_MIN, CATALOG_RAITING_VALUE_MAX),
  number: getRandomInt(CATALOG_RAITING_NUMBER_MIN, CATALOG_RAITING_NUMBER_MAX)
};

var CATALOG_NUTRITION_ENERGY_MIN = 70;
var CATALOG_NUTRITION_ENERGY_MAX = 500;
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


// состав: объект
var CatalogNutritionFacts = {
  //  булево значение — содержание сахара. Значение генерируется случайным образом
  sugar: getRandomBool(),

  // число — энергетическая ценность: целое число от 70 до 500
  energy: getRandomInt(CATALOG_NUTRITION_ENERGY_MIN, CATALOG_NUTRITION_ENERGY_MAX),

  // строка — состав: сгенерированная случайным образом Для генерации состава нужно выбрать произвольное количество значений, перечисленных ниже и соединить их через запятую
  contents: getRandomAttribute(CATALOG_NUTRITION_COMMENTS)
};


//  функция создания DOM-элемента на основе JS-объекта

var getCharactersCatalog = function () {
  var catalogCardsArr = [];
  for (var catalogNumbersMin = 0; catalogNumbersMin < CATALOG_NUMBERS_MAX; catalogNumbersMin++) {
    catalogCardsArr.push({
      name: getRandomAttribute(CATALOG_NAMES),
      picture: getRandomAttribute(CATALOG_PICTURE),
      amount: getRandomInt(CATALOG_AMOUNT_MIN, CATALOG_AMOUNT_MAX),
      price: getRandomInt(CATALOG_PRICE_MIN, CATALOG_PRICE_MAX),
      weight: getRandomInt(CATALOG_WEIGHT_MIN, CATALOG_WEIGHT_MAX),
      rating: catalogRating,
      nutritionFacts: CatalogNutritionFacts
    });
  }
  return catalogCardsArr;
};

var catalogCardsArr = getCharactersCatalog();


var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');


var catalogCard = catalogCards.querySelector('.catalog__card');

var similarCatalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');


// наполнение блока по шаблону
function renderCatalogElement(element) {
  var catalogElement = similarCatalogTemplate.cloneNode(true);
  catalogElement.querySelector('.card__title').textContent = element.name;

  if (element.amount > 5) {
    catalogElement.querySelector('.card--in-stock').textContent = element.amount;
  } else if (element.amount < 5) {
    catalogElement.querySelector('.card--little').textContent = element.amount;
  } else if (element.amount === 0) {
    catalogElement.querySelector('.card--soon').textContent = element.amount;
  }

  catalogElement.querySelector('.card__currency').textContent = element.price;
  catalogElement.querySelector('.card__weight').textContent = element.weight;

  if (element.rating === 1) {
    catalogElement.querySelector('.stars__rating--one').textContent = element.rating;
  } else if (element.rating === 2) {
    catalogElement.querySelector('.stars__rating--two').textContent = element.rating;
  } else if (element.rating === 3) {
    catalogElement.querySelector('.stars__rating--three').textContent = element.rating;
  } else if (element.rating === 4) {
    catalogElement.querySelector('.stars__rating--four').textContent = element.rating;
  } else if (element.rating === 5) {
    catalogElement.querySelector('.stars__rating--five').textContent = element.rating;
  }

  catalogElement.querySelector('.star__count').textContent = element.rating.number;


  // переделать

  if (element.nutritionFacts.sugar === true) {
    // catalogElement.querySelector('.card__characteristic').textContent = element.nutritionFacts.sugar;
    catalogElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
  } else {
    // catalogElement.querySelector('.card__characteristic').textContent = element.nutritionFacts.sugar;
    catalogElement.querySelector('.card__characteristic').textContent = 'Без сахара';
  }

  catalogElement.querySelector('.card__composition-list').textContent = element.nutritionFacts.contents;

  return catalogElement;
}

var fragment = document.createDocumentFragment();
var appendCatalog = function () {

  for (var i = 0; i < catalogCardsArr.length; i++) {
    fragment.appendChild(renderCatalogElement(catalogCardsArr[i]));
  }
};
appendCatalog();

// вставляем fragment в setup-similar-list


catalogCard.appendChild(fragment);

catalogCards.querySelector('.goods__cards').classList.remove('goods__cards--empty');
catalogCards.querySelector('.goods__cards').classList.remove('goods__card-empty');
