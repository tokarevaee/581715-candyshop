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

  window.utils = {
    getRandomBoolean: getRandomBoolean,
    getRandomAttribute: getRandomAttribute,
    getRandomNumber: getRandomNumber,
  };

  window.KEYCODE = {
    ESC: 27,
    ENTER: 13
  };
})();
