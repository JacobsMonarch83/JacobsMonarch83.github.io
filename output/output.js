/* 
III. Функции, меняющие что-то в UI.
Представляй этот слой как “output” твоего приложения.

В нём будут находиться функции, которые добавляют, удаляют и 
редактируют объекты в DOM. Постарайся больше ничего не делать.

Например:

- updateFallingFigureCoordinates(newCoordinates)
- removeFullRows()
- showGameOverPopup()

Можешь дёргать эти функции из функций-обработчиков из модуля состояния.

Вообще, функции-обработчики, получатся жирными и содержать бОльшую 
часть бизнес логики, просто пока прими это. Потом можно порефакторить, 
и может быть применить новые паттерны.


В функциях для UI избегай расчётов со state, 
а в геттерах не меняй напрямую UI. 
Делай так, чтобы у каждой функции была своя зона ответственности.
 */

import { state, figure } from "/state/object_state.js";

function showScore() {
  let tag = '<p>СЧЕТ</p><p id ="scoreTable">' + state.score + "</p>";
  score.insertAdjacentHTML("afterbegin", tag);
}

function updateScore() {
  document.getElementById("scoreTable").textContent = state.score;
}

function addTagLive() {
  let addElemTag =
    "<div id=" +
    figure.liveFigure.html_IDs.elem1Id +
    ' class="live">1</div>' + // содержание тега пикселя
    "<div id=" +
    figure.liveFigure.html_IDs.elem2Id +
    ' class="live">2</div>' +
    "<div id=" +
    figure.liveFigure.html_IDs.elem3Id +
    ' class="live">3</div>' +
    "<div id=" +
    figure.liveFigure.html_IDs.elem4Id +
    ' class="live">4</div>';
  field = document.getElementById("field");

  field.insertAdjacentHTML("beforeend", addElemTag); // добавление тегов пикселей  в HTML
}

function addTagDemo() {
  let text = '<p id="demoText">Следующая фигура</p>',
    addElemTag =
      "<div id=" +
      figure.demoFigure.html_IDs.elem1Id +
      ' class="demo">1</div>' + // содержание тега пикселя
      "<div id=" +
      figure.demoFigure.html_IDs.elem2Id +
      ' class="demo">2</div>' +
      "<div id=" +
      figure.demoFigure.html_IDs.elem3Id +
      ' class="demo">3</div>' +
      "<div id=" +
      figure.demoFigure.html_IDs.elem4Id +
      ' class="demo">4</div>';

  addElem.insertAdjacentHTML("beforeend", addElemTag); // добавление тегов пикселей
  addElem.insertAdjacentHTML("afterbegin", text);
}

function gameOver() {
  console.log("YOU LOSER");
  document.getElementById("pause").click();
  body.insertAdjacentHTML("beforeend", '<p id="banner">ТЫ ПРОИГРАЛ</p>');
}

function vanishPix(elems) {
  // эффект удаления слоев
  let i = 1; // счетчик пикселей
  //timerId;

  elems.forEach(function (elem) {
    // перебор массива пикселей
    setTimeout(opacityPIX, 15 * i, elem);
    i++;
  });

  function opacityPIX(elem) {
    // запуск функции для каждого пикселя с таймаутом
    figure.deadFigure[elem].style.opacity = 1;
    let timerId = setInterval(opacityPix, 15, elem);

    function opacityPix(elem) {
      // применение стиля к одному пикселю с интервалом
      figure.deadFigure[elem].style.opacity -= 0.1;
      figure.deadFigure[elem].style.opacity == 0 && clearInterval(timerId);
    }
  }
}

export { showScore, updateScore, addTagLive, addTagDemo, gameOver, vanishPix };