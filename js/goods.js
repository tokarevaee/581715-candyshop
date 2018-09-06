'use strict';

//  функция  генерации случайных данных
var getRandomAttribute = function (arr) {
  var randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
};

var catalogNumbers = 26;

var catalogNames = [
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

// var catalogPicture = [img/cards];

//  catalogAmount от 0 до 20 Количетсво

var catalogAmount = [];
var catalogAmountMax = 20;
for (var catalogAmountMin = 0; catalogAmountMin < catalogAmountMax; catalogAmountMin++) {
  catalogAmount.push(catalogAmountMin);
}

// catalogPrice от 100 до 1500, Стоимость

var catalogPrice = [];
var catalogPriceMax = 1500;
for (var catalogPriceMin = 100; catalogPriceMin <= catalogPriceMax; catalogPriceMin++) {
  catalogAmount.push(catalogPriceMin);
}


// catalogWeight  от 30 до 300, вес в граммах

var catalogWeight = [];
var catalogWeightMax = 300;
for (var catalogWeightMin = 30; catalogWeightMin <= catalogWeightMax; catalogWeightMin++) {
  catalogAmount.push(catalogWeightMin);
}


// catalogRating  рейтинг: объект

var catalogRating = {
  value: [],
  number: []
};
// var CatalogRaitingValue = CatalogRaiting.value;

var CatalogRaitingValue = [];
var CatalogRaitingValueMax = 300;
for (var CatalogRaitingValueMin = 30; CatalogRaitingValueMin <= CatalogRaitingValueMax; CatalogRaitingValueMin++) {
  CatalogRaitingValue.push(CatalogRaitingValueMin);
}


// состав: объект
var CatalogNutritionFacts = {
  //  булево значение — содержание сахара. Значение генерируется случайным образом
  sugar: [],

  // число — энергетическая ценность: целое число от 70 до 500
  energy: [],

  // строка — состав: сгенерированная случайным образом Для генерации состава нужно выбрать произвольное количество значений, перечисленных ниже и соединить их через запятую
  contents: [
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
  ]
};


//  функция создания DOM-элемента на основе JS-объекта

var getCharactersCatalog = function () {
  var catalogCards = [];
  for (var i = 0; i < catalogNumbers; i++) {
    catalogCards.push({
      name: getRandomAttribute(catalogNames),
      // picture: getRandomAttribute(catalogPicture),
      amount: getRandomAttribute(catalogAmount),
      price: getRandomAttribute(catalogPrice),
      weight: getRandomAttribute(catalogWeight),
      rating: getRandomAttribute(catalogRating),
      nutritionFacts: getRandomAttribute(CatalogNutritionFacts)
    });
  }
  return catalogCards;
};

// var catalogCards =
getCharactersCatalog();

//  наполнение блока по шаблону
// function renderWizard(wizard) {
//   var wizardElement = similarWizardTemplate.cloneNode(true);
//
//   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//   wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
//
//   return wizardElement;
// }
