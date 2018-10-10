'use strict';

(function () {
//  функция  генерации случайного boolean
  function getRandomBoolean() {
    return Math.random() >= 0.5;
  }
  // Случайное целое между min и max
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // функция  генерации случайных данных
  var getRandomAttribute = function (arr) {
    var randInt = Math.floor(Math.random() * arr.length);
    return arr[randInt];
  };

  var DEBOUNCE_INTERVAL = 500;
  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomBoolean: getRandomBoolean,
    getRandomAttribute: getRandomAttribute,
    getRandomNumber: getRandomNumber,
    debounce: debounce
  };


  window.KEYCODE = {
    ESC: 27,
    ENTER: 13
  };
})();
