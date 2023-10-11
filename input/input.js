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

import {
  startGame,
  continueGame,
  actionLiveFigure,  
} from "/state/handlers.js";

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
}

export { input };