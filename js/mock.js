'use strict';
(function () {
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

  var CATALOG_COUNT = 26;

  window.candyGoods = [];
  // Массив корзины
  // Заполнение массива товаров случайными данными
  var makeRandomGoods = function () {
    for (var i = 0; i < CATALOG_COUNT; i++) {
      window.candyGoods.push({
        name: window.utils.getRandomAttribute(NAMES),
        picture: './img/cards/' + window.utils.getRandomAttribute(PICTURES) + '.jpg',
        amount: window.utils.getRandomNumber(amount.MIN, amount.MAX),
        price: window.utils.getRandomNumber(price.MIN, price.MAX),
        weight: window.utils.getRandomNumber(weight.MIN, weight.MAX),
        rating: {
          value: window.utils.getRandomNumber(rating.value.MIN, rating.value.MAX),
          number: window.utils.getRandomNumber(rating.number.MIN, rating.number.MAX)
        },
        nutritionFacts: {
          sugar: window.utils.getRandomBoolean(),
          energy: window.utils.getRandomNumber(nutritionFacts.energy.MIN, nutritionFacts.energy.MAX),
          contents: window.utils.getRandomAttribute(CONTENTS)
        }
      });
    }
  };

  makeRandomGoods();
})();
