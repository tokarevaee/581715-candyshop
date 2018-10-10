'use strict';

(function () {
  // var catalogSidebar = document.querySelector('.catalog__sidebar');
  // var showAll = catalogSidebar.querySelector('.catalog__submit');

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

  // var filtersSidebars = function (response) {
  //
  //   // var filtersGoods = window.candyGoods.slice(window.successHandler(response));
  //   // console.log(filtersGoods);
  // };
  //
  // filtersSidebars();

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

  // // фильтр по типу продукта
  // var filterByKind = function (evt, items) {
  //   var target = evt.target.innerText;
  //   removeItems();
  //   Object.keys(items)
  //     .forEach(function (id) {
  //       if (items[id].good.kind === target) {
  //         addCardToFragment(items[id].good, fragment);
  //       }
  //     });
  //   catalogCards.appendChild(fragment);
  // };
  //
  // var filterBtnsHandler = function (evt) {
  //   evt.preventDefault();
  //   var target = evt.target.innerText;
  //   if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
  //     filterByKind(evt, window.data.catalog);
  //   }
  // };
  //
  // catalogSidebar.addEventListener('click', filterBtnsHandler);

})();
