/* 
2. Геттеры из состояния
Функции, возвращающие другие важные данные, 
вычисляя их из объекта состояния. 
Например, могут быть такие функции.

**getFullRows()** — функция, которая проверяет, 
есть ли полные строки в state.fallenCubes и возвращающая 
массив индексов таких строк. 
Поможет понять, какие строки нужно удалить.

**isGameOver()** — функция возвращает true|false, 
проверяющая, не достал ли осадок до верха экрана

Геттеров, будет наверное немного. 
Там где не надо вычислять, читай из состояния напрямую. 
Но то, что можно вычислить, выноси в геттер. 
*/

import { figure, coordField } from "/state/object_state.js";
import { setNewPosition, changeOrientation } from "/state/setters.js";

function checkFieldBorder(dx, dy) {
  // проверка границы поля/осадка

  let arrPosX = [],
    arrPosY = [],
    isPosX = true,
    isPosY = true,
    isDead = false;

  for (let i = 1; i <= figure.liveFigure.numberOfPixels; i++) {
    // создание массива координат пикселей
    arrPosX[i - 1] =
      figure.liveFigure.x + figure.liveFigure["elem" + i].position[0];
    arrPosY[i - 1] =
      figure.liveFigure.y + figure.liveFigure["elem" + i].position[1];
  }

  for (let i = 1; i < arrPosX.length + 1; i++) {
    // перебор массивов координат пикселей и сравнение с границами
    // границы: 0 и кол-во ключей в объекте field
    let isPosXmin = arrPosX[i - 1] + dx > 0, // логическое выражение, проверка левой границы
      isPosXmax = arrPosX[i - 1] + dx <= Object.keys(coordField.x).length, // правая граница
      isPosYmin = arrPosY[i - 1] + dy > 0, // верхняя граница
      isPosYmax = arrPosY[i - 1] + dy <= Object.keys(coordField.y).length; // нижняя граница
    isPosX = isPosXmin && isPosXmax,
    isPosY = isPosYmin && isPosYmax;

    if (typeof deadField.numberDead !== 'undefined') { // проверка на существование осадка
      for (let j = 1; j <= deadField.numberDead; j++) {
        // проверка на пересечение live и dead
        let isDeadX = arrPosX[i - 1] + dx === deadField["elem" + j][0], // логическое выражение, по X
          isDeadY = arrPosY[i - 1] + dy === deadField["elem" + j][1]; // проверка по Y
        isDead = isDeadX && isDeadY;
        if (isDead === true) {
          break;
        }
      }
    }
    if (!isPosX || !isPosY || ((typeof isDead !== 'undefined') && isDead)) {
      break;
    }
  }

  if (!isPosX) {
    return false;
  }
  if (!isPosY) {
    return "death";
  }
  if ((typeof isDead !== 'undefined') && isDead) {
    if (dx != 0) {
      return false;
    }
    if (dy != 0) {
      return "death";
    }
  }
}

function checkRotation(type) {
  // проверка на границы при вращении

  let isPosXmin = false,
    isPosXmax = false,
    isPosYmin = false,
    isPosYmax = false,
    isDead = false;

  // смещение фигуры от границы на необходимое расстояние
  for (
    let i = 1;
    (isPosXmin && isPosXmax && isPosYmin && isPosYmax) === false;
    i++
  ) {
    let arrPosX = [],
      arrPosY = [];

    for (let i = 1; i <= figure.liveFigure.numberOfPixels; i++) {
      // создание массива координат пикселей
      arrPosX[i - 1] =
        figure.liveFigure.x + figure.liveFigure["elem" + i].position[0];
      arrPosY[i - 1] =
        figure.liveFigure.y + figure.liveFigure["elem" + i].position[1];
    }

    // перебор массивов координат пикселей и сравнение с границами
    for (let j = 1; j < arrPosX.length + 1; j++) {
      (isPosXmin = arrPosX[j - 1] > 0),
        (isPosXmax = arrPosX[j - 1] <= Object.keys(coordField.x).length),
        (isPosYmin = arrPosY[j - 1] > 0),
        (isPosYmax = arrPosY[j - 1] <= Object.keys(coordField.y).length);

      if (typeof deadField.numberDead !== 'undefined') { // проверка на существование осадка
        for (let k = 1; k <= deadField.numberDead; k++) {
          // проверка на пересечение live и dead

          let isDeadX = arrPosX[j - 1] === deadField["elem" + k][0], // логическое выражение, по X
            isDeadY = arrPosY[j - 1] === deadField["elem" + k][1]; // проверка по Y
          isDead = isDeadX && isDeadY;

          if (isDead === true) {
            break;
          }
        }
      }

      if (!isPosXmin || !isPosXmax || !isPosYmin || !isPosYmax || ((typeof isPosX !== 'undefined') && isDead)) {
        break;
      }
    }

    !isPosXmin && setNewPosition("x+");
    !isPosXmax && setNewPosition("x-");
    !isPosYmin && setNewPosition("y+");
    !isPosYmax && setNewPosition("y-");

    // если рассматриваемое положение live пересекает dead, вращения не происходит
    if ((typeof isDead !== 'undefined') && isDead) {
      changeOrientation(type);
      changeOrientation(type);
      changeOrientation(type);
    }
    if (i === 5) {
      break;
    } // защита от зацикливания
  }
}

function isLoser() {
  // при ззаполнении контейнера игра заканчивается (слой №5 не пустой)
  if (figure.deadLays.lay5.length > 0) {
    return true;
  }
}

function isAnyLayIsFull() {
  // проверка на наличие полного слоя
  if (figure.deadLays.fullLays[0] > 0) {
    return true;
  }
}

export { checkFieldBorder, checkRotation, isLoser, isAnyLayIsFull };
