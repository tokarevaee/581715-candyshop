'use strict';

(function () {

  var STARS_RATING = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five'
  ];

  // Массив корзины
  var basketGoods = [];

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');

  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  // Корзина

  var basketCards = document.querySelector('.goods__cards');
  window.basketCards = basketCards;
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

    for (var i = 0; i < window.candyGoods.length; i++) {
      if (window.candyGoods[i].name + '_' + window.candyGoods[i].amount === candy.id) {
        index = i;
        break;
      }
    }

    cardBasketElement.querySelector('.card-order__title').textContent = window.candyGoods[index].name;
    cardBasketElement.querySelector('.card-order__img').src = window.candyGoods[index].picture;
    cardBasketElement.querySelector('.card-order__price').textContent = window.candyGoods[index].price + ' ₽';
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
      }
      renderBasketGoods();
      if (basketGoods.length === 0) {
        showEmptyBasket();
      }

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
    var candyElement = cardTemplate.cloneNode(true);
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

    starsRating.classList.add(window.utils.getRandomAttribute(STARS_RATING));

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

    for (var i = 0; i < window.candyGoods.length; i++) {
      fragment.appendChild(renderCandy(window.candyGoods[i]));
    }

    catalogCards.appendChild(fragment);
  };
  appendCandy();
})();
