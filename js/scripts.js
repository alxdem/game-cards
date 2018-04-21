'use strict';

var wrapper = document.querySelector('.wrapper');
var deck = ['0C', '0D', '0H', '0S'];


// Создание объектов-карт на столе
var cartsCreate = function() {
  // Создание ячейки под карту
  var newCardCell = document.createElement('li');
  newCardCell.classList.add('card-cell');

  // Создание карты
  var newCard = document.createElement('a');
  newCard.classList.add('card');

  // Создание картинки карты
  var newCardImg = document.createElement('img');
  newCardImg.src = 'img/0C.png';

  newCard.appendChild(newCardImg);
  newCardCell.appendChild(newCard);
  wrapper.appendChild(newCardCell);
}

console.log(deck);
cartsCreate();
