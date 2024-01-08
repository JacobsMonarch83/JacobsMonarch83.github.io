/* 
4. Обработчики событий. 

Пусть в этих функциях будет логика обработки событий: 

`handleRotate()`, `handleMove(’left’ | ‘right)`, `handleResetGame()`, и т.д.
 */

import {
  setGameStatus,
  refreshState,
  setFigureType,
  addLive,
  drawLive,
  addDemo,
  drawDemo,
  moveLiveFigure,
  changeOrientation,
  killLiveFigure,
  changeTagId,
  clearLiveFigure,
  addDeadField,
  writeLays,
  checkLays,
  deleteLay,
  dropUpperLays,
  rewriteDeadFigure,
  clearDemoFigure,
  setScore,
  setLevel,
  setSpeed,
} from "/state/setters.js";
import {
  checkFieldBorder,
  checkRotation,
  isLoser,
  isAnyLayIsFull,
} from "/state/getters.js";
import { showScore, updateScore, gameOver, vanishPix } from "/output/output.js";

function startGame() {
  setGameStatus("Started"); // (setter) запись статуса
  setScore(0); // (setter) обновить счет
  showScore(); // (output) показать счет
  handleAddFirstLive(); // (Блок 1) создание Live
  handleDemoNext(); // (Блок 1) создание Demo
  refreshState(); // (setter) обновление статуса
  handleFallFigure(); // (Блок 2) падение Live
}

function continueGame() {
  setGameStatus("Continued"); // (setter) запись статуса
  handleFallFigure(); // (Блок 2) падение Live
}
//________________________________________________________________________________
//
//                                     БЛОК 1
//                                 СОЗДАНИЕ ФИГУР
//________________________________________________________________________________

function handleAddFirstLive() {
  // вызывается на старте, затем из dead при каждом умерщвлении
  setFigureType(); // (setter) назначение типа новой фигуры
  addLive(figure.randomFigureType); // (setter) добавление фигуры
  drawLive(figure.liveFigure.name); // (setter) применение стилей
}

function handleDemoNext() {
  //
  setFigureType(); // (setter) назначение типа новой фигуры
  addDemo(figure.randomFigureType); // (setter) добавление фигуры
  drawDemo(figure.demoFigure.name); // (setter) применение стилей
}

function addDead() {
  //
  killLiveFigure(); // (setter) пополнение dead за счет live
  changeTagId(); // (setter) замена id тегов пикселей на "мертвые"
  clearLiveFigure(); // (setter) обнуление live
  addDeadField(); // (setter) запись координат в мертвое поле
  laysOperation(); // (setter) блок операция со слоями (перезапись, проверка на заполненность, удаление)
  addNextLive(); // создание следующей живой фигуры
}

function addNextLive() {
  // вызывается после очередного умерщвления
  addLive(figure.demoFigure.name); // (setter) добавить фигуру на основании demo
  drawLive(figure.demoFigure.name); // (setter) отрисовка
  clearDemoFigure(); // (setter) удаление demo
  handleDemoNext(); // (setter) показать следующую
  setLevel(); // (setter) счетчик фигур
  state.level % 3 === 0 && setSpeed();
}
//-----------------------------------------------------------------------------
//                                   конец блока 1
//-----------------------------------------------------------------------------

//________________________________________________________________________________
//
//                                       БЛОК 2
//                              ДВИЖЕНИЕ АКТИВНОЙ ФИГУРЫ
//________________________________________________________________________________

function handleFallFigure() {
  // падение
  //let interval = 1000;
  let timerId = setInterval(() => {
    checkFieldBorder(0, 1); // (getter) проверка на пересечения (dx, dy)
    move(0, 1); // (setter) единичное падение (dx, dy)
    drawLive(); // (output) отрисовка
  }, state.speed);

  document.getElementById("pause").onclick = function () {
    setGameStatus("Paused"); // (setter) запись статуса
    clearInterval(timerId);
    document.getElementById("pause").setAttribute("disabled", "");
    document.getElementById("continue").removeAttribute("disabled");
  };
}

function actionLiveFigure(key) {
  // управление
  switch (key) {
    case " ":
      console.log("Rotate");
      rotation(figure.liveFigure.name);
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      move(-1, 0);
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      move(1, 0);
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      move(0, 1);
      break;
    /*         case "ArrowUp":
            move(0, -1);
            break;
 */
    /*          case "Enter":
            setTimeout(() => {clearInterval(timerId); alert('stop'); }, 5000);
            alert();
            fallLiveFigure();
            break;
 */
  }
}

function move(dx, dy) {
  // смещение стрелками
  checkFieldBorder(dx, dy) == "death" && // проверка на дно
    addDead(); // добавление мертвой
  checkFieldBorder(dx, dy) == false || // (getter) проверка на пересечения
    moveLiveFigure(dx, dy) || // (setter) изменение координат
    drawLive(); // (setter) применение стилей
}

function rotation(type) {
  // вращение
  changeOrientation(type); // (setter) установить следующее положение
  checkRotation(type); // (getter) проверка, смещение
  drawLive(type); // (setter) применение стилей
}
//-----------------------------------------------------------------------------
//                                   конец блока 2
//-----------------------------------------------------------------------------

//________________________________________________________________________________
//
//                                       БЛОК 3
//                                 ОПЕРАЦИИ СО СЛОЯМИ
//________________________________________________________________________________

function laysOperation() {
  rewriteDeadFigure(); // обновление "мертвого массива"
  writeLays(); // (setter) заполнение мертвых слоев
  checkLays(); // (setter) проверка слоя на заполненность
  isLoser() && gameOver(); // (getter, output)проверка на проигрыш
  if (isAnyLayIsFull()) {
    // (getter) проверка на наличие полного слоя
    setScore(figure.deadLays.elemsInFullLays.length); // (setter) обновить счет
    updateScore(); // (output) показать счет
    let promiseVanish = new Promise(function(resolve) {
      vanishPix(figure.deadLays.elemsInFullLays); // (output) эффект удаления слоев
      setTimeout(() => resolve(), 1000);
    });
    promiseVanish.then(deleteLay);
    promiseVanish.then(dropUpperLays);
    promiseVanish.then(rewriteDeadFigure);
  } else {
    rewriteDeadFigure(); // обновление "мертвого массива"
  }
}
//-----------------------------------------------------------------------------
//                                   конец блока 3
//-----------------------------------------------------------------------------

export { startGame, continueGame, actionLiveFigure, handleFallFigure };