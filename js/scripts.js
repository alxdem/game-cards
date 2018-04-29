'use strict';

var wrapper = document.querySelector('.wrapper');
var deck = ['c0C', 'c0D', 'c0H', 'c0S', 'c2C', 'c2D', 'c2H', 'c2S', 'c3C', 'c3D', 'c3H', 'c3S', 'c4C', 'c4D', 'c4H', 'c4S', 'c5C', 'c5D', 'c5H', 'c5S', 'c6C', 'c6D', 'c6H', 'c6S', 'c7C', 'c7D', 'c7H', 'c7S', 'c8C', 'c8D', 'c8H', 'c8S', 'c9C', 'c9D', 'c9H', 'c9S', 'cAC', 'cAD', 'cAH', 'cAS', 'cJC', 'cJD', 'cJH', 'cJS', 'cKC', 'cKD', 'cKH', 'cKS', 'cQC', 'cQD', 'cQH', 'cQS'];
var activeDeck = []; // Массив для взятых из колоды карт, которые лягут на стол
var arrCompare = []; // Массив для сравнения 2-х карт


// Берем случайные 10 карт из колоды. arrowDeck - массив из которого берем. number - кол-во карт, которые берем
var randomCardsTake = function(arrowDeck, number) {
  for (var i = 0; i < number; i++) {
    var randCard = Math.floor(Math.random() * arrowDeck.length);

    var doubleCards = false; // Дубль карт

    if(!activeDeck.length) {
      activeDeck.push(arrowDeck[randCard]); // Добавляем объект дважды в массив чтобы была пара
      activeDeck.push(arrowDeck[randCard]);
    } else {
      for (var j = 0; j < activeDeck.length; j++) {
        if (arrowDeck[randCard] === activeDeck[j]) {
          doubleCards = true; // Дубль карт
        }
      }

      if (doubleCards) {
        i--;
      } else {
        activeDeck.push(arrowDeck[randCard]); // Добавляем объект дважды в массив чтобы была пара
        activeDeck.push(arrowDeck[randCard]);
      }
    }

  }
}

randomCardsTake(deck, 10); // Берем случайные 10 карт из колоды. arrowDeck - массив из которого берем. number - кол-во карт, которые берем

for(var i = 0; i < activeDeck.length; i++){
  console.log('d ' + activeDeck[i]);
}

// Вернем случайный результат сравнения
var compareRandom = function(a, b) {
  return Math.random() - 0.5;
}

// Перемешиваем массив с взятыми картами
activeDeck.sort(compareRandom);


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
  newCardImg.src = 'img/' + cardName.slice(1,3) + '.png'; // slice чтобы удалить у названия картинки первую буквы c. Ее добавил чтобы класс не начинался с цифры

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

// Массив ссылок с картами на столе
var arrCardsLink = [];
arrCardsLink = document.querySelectorAll('.card-cell a');


// Функцуция удаления класса у дочерних эелементов (массив в котором удаляем, класс который удаляем) (удаляем класс у картинки)
var allCardsHide = function (arrAllCards, removeClass) {
  for (var i = 0; i < arrAllCards.length; i++) {
    arrAllCards[i].childNodes[0].classList.remove(removeClass);
  }
}

// Функцуция удаления класса (массив в котором удаляем, класс который удаляем) (удаляем класс у картинки)
var classRemove = function (arrAllCards, removeClass) {
  for (var i = 0; i < arrAllCards.length; i++) {
    arrAllCards[i].classList.remove(removeClass);
  }
}


// Функцуция удаления ID (массив в котором удаляем, класс который удаляем) (удаляем класс у картинки)
var idRemove = function (arrAllCards, removeId) {
  for (var i = 0; i < arrAllCards.length; i++) {
    arrAllCards[i].removeAttribute('id');
  }
}

// Обработчик клика по карте
var cardClickHandler = function(e) {
  e.preventDefault();

  if (arrCompare.length < 2) {

    var targetCard = e.target;
    var cardsListNew = document.querySelector('.card-list');

    while (targetCard !== cardsListNew) {
      if ((targetCard.tagName === 'A') && (!targetCard.hasAttribute('id'))) {
        targetCard.id = 'target'; // Добавляем ID, чтобы при повторном клике на этой карте она не удалялась
        targetCard.childNodes[0].classList.add('active');
        var targetCardClass = targetCard.getAttribute('class'); // Получаем класс-id карты
        arrCompare.push(targetCardClass); // Добавляем класс элемента в массив для сравнения
        console.log('arrCompare: ' + arrCompare);

        if (arrCompare.length == 2) {
          // Функция сравнения 2 классов(карт) в массиве
          if( cardsClassCompare(arrCompare[0], arrCompare[1])) {
            //alert('da');
            var arrCompareIndex = cardIndexFind(activeDeck, arrCompare[0]);
            console.log('arrCompareIndex: ' + arrCompareIndex);
            idRemove(arrCardsLink, 'target'); // Удаляем ID, который не дает кликать дважды по одной и той же карте
            setTimeout(function() {
              cardRemove(arrCompare[0]);
              arrCompare = []; // Очищаем массив сравнения
            }, 1000);

            return;
          }

          // Переворачиваем обратно просмотренные карты, черех определенное время
          setTimeout(function() {
            idRemove(arrCardsLink, 'target'); // Удаляем класс, который не дает кликать дважды по одной и той же карте
            allCardsHide(arrCardsLink, 'active');
            arrCompare = []; // Очищаем массив сравнения
          }, 1500);

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


// Функция поиска индекса совпавших карт (массив в котором ищем, значение карты, которое ищем)
var cardIndexFind = function(arrMain, idCard) {
  if([].indexOf) {
    return arrMain.indexOf(idCard);
  } else {
    for (var i = 0; i < arrMain.length; i++) {
      if (arrMain[i] === idCard) return i;
    }
  }

  return -1;
}


// Функция удаления карты со стола (id удаляемой карты)
var cardRemove = function(idCard) {
  var cardRemoveItem = document.querySelectorAll('.' + idCard);
  for(var i = 0; i < cardRemoveItem.length; i++) {
    console.log('cardRemoveItem ' + idCard);
  }

  cardRemoveItem[0].classList.add('delete'); // Удаляем пару совпавших элементов, поэтому 2 remove
  cardRemoveItem[1].classList.add('delete');
}


// Вешаем обработчик клика на все карты-ссылки
var getCardLinks = function() {

  for (var i = 0; i < arrCardsLink.length; i++) {
    arrCardsLink[i].addEventListener('click', cardClickHandler);
  }
}

getCardLinks(); // Вешаем обработчик клика на все карты-ссылки

// Кнопка запуска игры
var startGameBtnHandler = function() {
  alert('f');
}

var startGameBtn = document.querySelector('.button-start'); // Кнопка запуска игры
startGameBtn.addEventListener('click', startGameBtnHandler);
