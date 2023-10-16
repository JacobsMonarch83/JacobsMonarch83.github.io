/* 
II. Подписки на хоткеи и нажатия кнопок

Тут будут сгруппированы все (или большинство) addEventListener и onClick.

Используй тут функции-обработчики событий, которые ты импортируешь из модуля состояния:

```jsx
import { handleRotate, handleMove, handleSpeedUp } from './state'

// И потом:
case " ":
    handleRotate();
    break;
case "ArrowLeft":
    handleMove('left');
    break;
case "ArrowRight":
    handleMove('right');
    break;
case "ArrowDown":
    handleSpeedUp();
    break;
```
Представляй это, как “input” в рантайме твоего приложения.
 */

import { startGame, continueGame, actionLiveFigure } from "/state/handlers.js";

let start = document.getElementById("start"),
  continueBtn = document.getElementById("continue"),
  pauseBtn = document.getElementById("pause");

function input() {
  start.onclick = function () {
    // старт игры
    start.blur();
    start.setAttribute("disabled", "");
    startGame();
  };
  continueBtn.setAttribute("disabled", "");
  continueBtn.onclick = function () {
    // продолжение игры
    continueBtn.blur();
    continueBtn.setAttribute("disabled", "");
    pauseBtn.removeAttribute("disabled");
    continueGame();
  };
  document.addEventListener("keydown", function () {
    actionLiveFigure(event.key); // управление фигурой
  });

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchend", handleTouchEnd, false);
  var x1 = null;
  var y1 = null;

  function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  }

  function handleTouchEnd(event) {
    const lasttouch = event.changedTouches[event.changedTouches.length - 1];
    if (!x1 || !y1) {
      return;
    }

    var x2 = lasttouch.clientX;
    var y2 = lasttouch.clientY;

    var xDiff = x1 - x2;
    var yDiff = y1 - y2;

    if (Math.abs(xDiff) & Math.abs(yDiff)) {
      /* отлавливаем разницу в движении */
      if (xDiff > 0) {
        /* swipe влево */
        actionLiveFigure('ArrowLeft');
      } else {
        /* swipe вправо */
        actionLiveFigure('ArrowRight');
      }
    } else {
      if (yDiff > 0) {
        /* swipe вверх */
      } else {
        /* swipe вниз */
        for (let i = 0; i===50; i++) {
          console.log(123);
          actionLiveFigure('ArrowDown');
        }
      }
    }
    /* свайп был, обнуляем координаты */
    x2 = null;
    y2 = null;
  }
}

export { input };
