'use strict';

var wrapper = document.querySelector('.wrapper');
var deck = ['0C', '0D', '0H', '0S', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', 'AC', 'AD', 'AH', 'AS', 'JC', 'JD', 'JH', 'JS', 'KC', 'KD', 'KH', 'KS', 'QC', 'QD', 'QH', 'QS'];
var activeDeck = []; // Массив для взятых из колоды карт, которые лягут на стол
var arrCompare = []; // Массив для сравнения 2-х карт


// Берем случайные 10 карт из колоды. arrowDeck - массив из которого берем. number - кол-во карт, которые берем
var randomCardsTake = function(arrowDeck, number) {
  for (var i = 0; i < number; i++) {
    var randCard = Math.floor(Math.random() * arrowDeck.length);
    activeDeck.push(arrowDeck[randCard]); // Добавляем объект дважды в массив чтобы была пара
    activeDeck.push(arrowDeck[randCard]);
  }
}

randomCardsTake(deck, 10); // Берем случайные 10 карт из колоды. arrowDeck - массив из которого берем. number - кол-во карт, которые берем


// Вернем случайный результат сравнения
var compareRandom = function(a, b) {
  return Math.random() - 0.5;
}

// Перемешиваем массив с взятыми картами
activeDeck.sort(compareRandom);

console.log(activeDeck);

// Создание объекта
var cardGenerate = function(value) {
  var cardObject = {};
  cardObject.id = value;
  cardObject.img = 'img/' + value + '.png';

  return cardObject;
}

cardGenerate('0C');
console.log(cardGenerate('0C'));


// Создание элемента по тегу и классу
var elementCreate = function(tag, tagClass) {
  var newElement = document.createElement(tag);
  newElement.classList.add(tagClass);

  return newElement;
}

// Создание объекта-карты на столе
var cardsCreate = function(cardName) {
  // Создание ячейки под карту
  var newCardCell = elementCreate('li', 'card-cell');

  // Создание карты
  var newCard = elementCreate('a', cardName);
  newCard.href = '#';

  // Создание картинки карты
  var newCardImg = elementCreate('img');
  newCardImg.src = 'img/' + cardName + '.png';

  newCard.appendChild(newCardImg);
  newCardCell.appendChild(newCard);
  return newCardCell;
  // wrapper.appendChild(newCardCell);
}

// Создаем все активные карты и выводим их на экран
var cardsCreateFragment = function(arrActiveDack) {
  var cardsFragment = document.createDocumentFragment();

  for (var i = 0; i < arrActiveDack.length; i++) {
    cardsFragment.appendChild(cardsCreate(arrActiveDack[i])); // Создаем карту в цикле с помощью функции cardsCreate, передавая ей название карты в виде '2С', и помещаем ее в фрагмент
  }

  var cardsList = elementCreate('ul', 'card-list'); // Создаем элемент ul
  cardsList.appendChild(cardsFragment); // Помещаем содержимое фрагмента в ul

  wrapper.appendChild(cardsList); // Выводим полученный список внутрь wrapper

}



cardsCreateFragment(activeDeck); // Создаем все активные карты и выводим их на экран

// Функцуция снятия активного класса (перевернутой карты) со всех карт
var allCardsHide = function (arrAllCards) {
  for (var i = 0; i < arrAllCards.length; i++) {
    arrAllCards[i].classList.remove('active');
  }
}


// Обработчик клина по карте
var cardClickHandler = function(e) {
  e.preventDefault();

  if (arrCompare.length < 2) {

    var targetCard = e.target;
    var cardsListNew = document.querySelector('.card-list');

    while (targetCard !== cardsListNew) {
      if (targetCard.tagName === 'A') {
        targetCard.childNodes[0].classList.add('active');
        var targetCardClass = targetCard.getAttribute('class'); // Получаем класс-id карты
        arrCompare.push(targetCardClass); // Добавляем класс элемента в массив для сравнения
        console.log('arrCompare: ' + arrCompare);

        if (arrCompare.length == 2) {
          cardsClassCompare(arrCompare[0], arrCompare[1]);
        }

        return;
      }

      targetCard = targetCard.parentNode;
    }
  } else {
    //allCardsHide(allCardsImg);

  }

}



// Функция сравнения 2 классов(карт) в массиве
var cardsClassCompare = function(card1, card2) {
  if (card1 === card2) {
    return true;
  }
}

// Вешаем обработчик клика на все карты-ссылки
var getCardLinks = function() {
  var arrCardsLink = [];
  arrCardsLink = document.querySelectorAll('.card-cell a');
  for (var i = 0; i < arrCardsLink.length; i++) {
    arrCardsLink[i].addEventListener('click', cardClickHandler);
  }
}

getCardLinks(); // Вешаем обработчик клика на все карты-ссылки
