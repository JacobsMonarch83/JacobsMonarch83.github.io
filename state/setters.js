/* 
3. Сеттеры в состояние
Функции, обновляющие значения в объекте состояния. Например, могут быть такие функции:

- setGameStatus(status)
- setFallenCubes(matrix)
- removeFullRows()
- resetGame()
- setDoubleSpeed()
- и т.д */

import {
  state,
  figure,
  coordField,
  demoCoordField,
  deadField,
} from "/state/object_state.js";
import { addTagLive, addTagDemo } from "/output/output.js";

function setGameStatus(status) {
  // запись статуса
  state.gameStatus = status;
}

function refreshState() {
  // обновление state
  state.activeFigure = figure.liveFigure.name;
  state.demoFigure = figure.demoFigure.name;
}

function setFigureType() {
  // назначение типа новой фигуры
  figure.randomFigureType =
    figure.figureTypeArray[
      Math.floor(Math.random() * figure.figureTypeArray.length)
    ];
}

function setScore(score) {
  state.score += score;
}

function setLevel() {
  ++state.level;
  console.log("Level UP! (" + state.level + ")");
  console.log("state.level % 5 (" + (state.level % 5) + ")");
}

function setSpeed() {
  if (state.speed > 200) {
    state.speed = state.speed - 200;
  } else {
    state.speed = state.speed - 50;
  }
  console.log("Speed UP! (" + state.speed + ")");
}

//________________________________________________________________________________
//
//                                     БЛОК 1
//                          ОПЕРАЦИИ С АКТИВНОЙ ФИГУРОЙ
//________________________________________________________________________________

function addLive(type) {
  // клонирование Live
  let obj = figure.figureArray.find((figureType) => figureType.name === type);
  for (let key in obj) {
    figure.liveFigure[key] = obj[key];
  }
  addTagLive(); // добавление тегов
  (figure.liveFigure.elem1 = document.getElementById(
    figure.liveFigure.html_IDs.elem1Id
  )), // добавление элементов в объект
    (figure.liveFigure.elem2 = document.getElementById(
      figure.liveFigure.html_IDs.elem2Id
    )),
    (figure.liveFigure.elem3 = document.getElementById(
      figure.liveFigure.html_IDs.elem3Id
    )),
    (figure.liveFigure.elem4 = document.getElementById(
      figure.liveFigure.html_IDs.elem4Id
    ));
}

// конструктор нового "live"
function Live(name, numberOfPixels, x, y) {
  this.name = name;
  this.numberOfPixels = numberOfPixels;
  this.x = x; // Координаты базового пикселя, от которых отсчитываются
  this.y = y; //  относительные координаты других пикселей (элементов)
  this.orientation = 0;
}

function drawLive(type) {
  // отрисовка: применение стилей (top, left) к пикселям
  defineFigure(type);
  figure.liveFigure.elem1.style.left =
    coordField.x[figure.liveFigure.x + figure.liveFigure.elem1.position[0]] +
    "px";
  figure.liveFigure.elem1.style.top =
    coordField.y[figure.liveFigure.y + figure.liveFigure.elem1.position[1]] +
    "px";
  figure.liveFigure.elem2.style.left =
    coordField.x[figure.liveFigure.x + figure.liveFigure.elem2.position[0]] +
    "px";
  figure.liveFigure.elem2.style.top =
    coordField.y[figure.liveFigure.y + figure.liveFigure.elem2.position[1]] +
    "px";
  figure.liveFigure.elem3.style.left =
    coordField.x[figure.liveFigure.x + figure.liveFigure.elem3.position[0]] +
    "px";
  figure.liveFigure.elem3.style.top =
    coordField.y[figure.liveFigure.y + figure.liveFigure.elem3.position[1]] +
    "px";
  figure.liveFigure.elem4.style.left =
    coordField.x[figure.liveFigure.x + figure.liveFigure.elem4.position[0]] +
    "px";
  figure.liveFigure.elem4.style.top =
    coordField.y[figure.liveFigure.y + figure.liveFigure.elem4.position[1]] +
    "px";
}

function defineFigure(type) {
  // назначение типа фигуры для отрисовки
  switch (type) {
    case "O":
      positions.O.CONST();
      break;
    case "T":
      positions.T[figure.posArr[figure.liveFigure.orientation]]();
      break;
    case "Z":
      positions.Z[figure.posArr[figure.liveFigure.orientation]]();
      break;
    case "ZZ":
      positions.ZZ[figure.posArr[figure.liveFigure.orientation]]();
      break;
    case "L":
      positions.L[figure.posArr[figure.liveFigure.orientation]]();
      break;
    case "LL":
      positions.LL[figure.posArr[figure.liveFigure.orientation]]();
      break;
    case "I":
      positions.I[figure.posArr[figure.liveFigure.orientation]]();
      break;
  }
}

// набор функций для изменения позиций фктивной фигуры (вращение):
// определяют относительные координаты для каждого пикселя
let positions = { O: {}, T: {}, Z: {}, ZZ: {}, L: {}, LL: {}, I: {} };
positions.O.CONST = function () {
  // O
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [-1, 0];
};
positions.T.UP = function () {
  // T
  figure.liveFigure.elem1.position = [0, -1];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, 0];
  figure.liveFigure.elem4.position = [1, -1];
};
positions.T.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, -1];
  figure.liveFigure.elem2.position = [0, -2];
  figure.liveFigure.elem3.position = [0, 0];
  figure.liveFigure.elem4.position = [-1, -1];
};
positions.T.DOWN = function () {
  figure.liveFigure.elem1.position = [0, -1];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, -2];
  figure.liveFigure.elem4.position = [1, -1];
};
positions.T.LEFT = function () {
  figure.liveFigure.elem1.position = [0, -1];
  figure.liveFigure.elem2.position = [0, -2];
  figure.liveFigure.elem3.position = [0, 0];
  figure.liveFigure.elem4.position = [1, -1];
};
positions.Z.UP = function () {
  // Z
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [1, 0];
};
positions.Z.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, 1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [-1, 0];
};
positions.ZZ.UP = function () {
  // ZZ
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [0, -1];
  figure.liveFigure.elem3.position = [1, -1];
  figure.liveFigure.elem4.position = [-1, 0];
};
positions.ZZ.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, 1];
  figure.liveFigure.elem4.position = [-1, 0];
};
positions.L.UP = function () {
  // L
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [-1, 0];
  figure.liveFigure.elem4.position = [1, 0];
};
positions.L.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [1, -1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [0, 1];
};
positions.L.DOWN = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [1, 1];
  figure.liveFigure.elem3.position = [-1, 0];
  figure.liveFigure.elem4.position = [1, 0];
};
positions.L.LEFT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, 1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [0, 1];
};
positions.LL.UP = function () {
  // LL
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [1, 0];
  figure.liveFigure.elem3.position = [1, -1];
  figure.liveFigure.elem4.position = [-1, 0];
};
positions.LL.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [1, 1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [0, 1];
};
positions.LL.DOWN = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, 1];
  figure.liveFigure.elem3.position = [-1, 0];
  figure.liveFigure.elem4.position = [1, 0];
};
positions.LL.LEFT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, -1];
  figure.liveFigure.elem3.position = [0, -1];
  figure.liveFigure.elem4.position = [0, 1];
};
positions.I.UP = function () {
  // I
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [-1, 0];
  figure.liveFigure.elem3.position = [1, 0];
  figure.liveFigure.elem4.position = [2, 0];
};
positions.I.RIGHT = function () {
  figure.liveFigure.elem1.position = [0, 0];
  figure.liveFigure.elem2.position = [0, -1];
  figure.liveFigure.elem3.position = [0, 1];
  figure.liveFigure.elem4.position = [0, 2];
};

function moveLiveFigure(dx, dy) {
  // движение
  figure.liveFigure.x += dx;
  figure.liveFigure.y += dy;
}

/*  проверка на границы field
        Для поворота фигуры  необходмо, чтобы следующее положение
        фигуры лежало внутри field:
        liveFigure.x + liveFigure.elem1.position[0]]         - координата х пикселя1
        liveFigure.y + liveFigure.elem1.position[1]]         - координата y пикселя1

            координаты каждого пикселя проверяются на макс и мин значение х и у
            перебираются массивы х и у
            минимальные значения х и у - 0
            максимальные - длина массива ключей coordField.x и coordField.y

        При нарушения условия находжения всех пикселей внутри field, фигура смещается 
        на 1 координату от границы
        */

function changeOrientation(type) {
  // вращение
  if (type === "T" || type === "L" || type === "LL") {
    // несимметричные фигуры имеют 4 положения
    if (figure.liveFigure.orientation === 3) {
      figure.liveFigure.orientation = 0;
    } else {
      figure.liveFigure.orientation++; // назначение ориентации для фигуры
    }
  }
  if (type === "Z" || type === "ZZ" || type === "I") {
    // симметричные фигуры имеют 2 положения
    if (figure.liveFigure.orientation === 1) {
      figure.liveFigure.orientation = 0;
    } else {
      figure.liveFigure.orientation++;
    }
  }
  defineFigure(type); // назначение положения для пикселей
}

function setNewPosition(checkResult) {
  // (setter) после проверки
  switch (checkResult) {
    case "x+":
      ++figure.liveFigure.x;
      break;
    case "x-":
      --figure.liveFigure.x;
      break;
    case "y+":
      ++figure.liveFigure.y;
      break;
    case "y-":
      --figure.liveFigure.y;
      break;
    case "noRotateble": // возвращает исходную ориентацию
      changeOrientation(figure.liveFigure.name);
      changeOrientation(figure.liveFigure.name);
      changeOrientation(figure.liveFigure.name);
      break;
  }
}

function clearLiveFigure() {
  // удаление живой фигуры
  figure.liveFigure.elem1 = undefined;
  figure.liveFigure.elem2 = undefined;
  figure.liveFigure.elem3 = undefined;
  figure.liveFigure.elem4 = undefined;
  figure.liveFigure.name = undefined;
  figure.liveFigure.numberOfPixels = undefined;
  figure.liveFigure.orientation = undefined;
  figure.liveFigure.x = undefined;
  figure.liveFigure.y = undefined;
}
//-----------------------------------------------------------------------------
//                                   конец блока 1
//-----------------------------------------------------------------------------

//________________________________________________________________________________
//
//                                       БЛОК 2
//                              ОПЕРАЦИИ С ДЕМО-ФИГУРОЙ
//________________________________________________________________________________

function addDemo(type) {
  // главная функция - клонирование Live
  let obj = figure.figureArray.find((figureType) => figureType.name === type);
  for (let key in obj) {
    figure.demoFigure[key] = obj[key];
  }
  figure.demoFigure.x = 4;
  figure.demoFigure.y = 4;
  addTagDemo(); // добавление тегов
  //definePositions();      // определить положение пикселей
  (figure.demoFigure.elem1 = document.getElementById(
    figure.demoFigure.html_IDs.elem1Id
  )), // добавление элементов в объект
    (figure.demoFigure.elem2 = document.getElementById(
      figure.demoFigure.html_IDs.elem2Id
    )),
    (figure.demoFigure.elem3 = document.getElementById(
      figure.demoFigure.html_IDs.elem3Id
    )),
    (figure.demoFigure.elem4 = document.getElementById(
      figure.demoFigure.html_IDs.elem4Id
    ));
  state.demoFigure = figure.demoFigure.name;
}

function drawDemo(type) {
  // отрисовка: применение стилей (top, left) к пикселям
  defineDemoFigure(type);
  figure.demoFigure.elem1.style.left =
    demoCoordField.x[
      figure.demoFigure.x + figure.demoFigure.elem1.position[0]
    ] + "px";
  figure.demoFigure.elem1.style.top =
    demoCoordField.y[
      figure.demoFigure.y + figure.demoFigure.elem1.position[1]
    ] + "px";
  figure.demoFigure.elem2.style.left =
    demoCoordField.x[
      figure.demoFigure.x + figure.demoFigure.elem2.position[0]
    ] + "px";
  figure.demoFigure.elem2.style.top =
    demoCoordField.y[
      figure.demoFigure.y + figure.demoFigure.elem2.position[1]
    ] + "px";
  figure.demoFigure.elem3.style.left =
    demoCoordField.x[
      figure.demoFigure.x + figure.demoFigure.elem3.position[0]
    ] + "px";
  figure.demoFigure.elem3.style.top =
    demoCoordField.y[
      figure.demoFigure.y + figure.demoFigure.elem3.position[1]
    ] + "px";
  figure.demoFigure.elem4.style.left =
    demoCoordField.x[
      figure.demoFigure.x + figure.demoFigure.elem4.position[0]
    ] + "px";
  figure.demoFigure.elem4.style.top =
    demoCoordField.y[
      figure.demoFigure.y + figure.demoFigure.elem4.position[1]
    ] + "px";
}

function defineDemoFigure(type) {
  // определение типа фигуры для отрисовки
  switch (type) {
    case "O":
      demoPositions.O.CONST();
      break;
    case "T":
      demoPositions.T.CONST();
      break;
    case "Z":
      demoPositions.Z.CONST();
      break;
    case "ZZ":
      demoPositions.ZZ.CONST();
      break;
    case "L":
      demoPositions.L.CONST();
      break;
    case "LL":
      demoPositions.LL.CONST();
      break;
    case "I":
      demoPositions.I.CONST();
      break;
  }
}

// набор функций для изменения позиций:
// определяют относительные координаты для каждого пикселя
let demoPositions = { O: {}, T: {}, Z: {}, ZZ: {}, L: {}, LL: {}, I: {} };
demoPositions.O.CONST = function () {
  // O
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [-1, -1];
  figure.demoFigure.elem3.position = [0, -1];
  figure.demoFigure.elem4.position = [-1, 0];
};
demoPositions.T.CONST = function () {
  // T
  figure.demoFigure.elem1.position = [0, -1];
  figure.demoFigure.elem2.position = [-1, -1];
  figure.demoFigure.elem3.position = [0, 0];
  figure.demoFigure.elem4.position = [1, -1];
};
demoPositions.Z.CONST = function () {
  // Z
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [-1, -1];
  figure.demoFigure.elem3.position = [0, -1];
  figure.demoFigure.elem4.position = [1, 0];
};
demoPositions.ZZ.CONST = function () {
  // ZZ
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [0, -1];
  figure.demoFigure.elem3.position = [1, -1];
  figure.demoFigure.elem4.position = [-1, 0];
};
demoPositions.L.CONST = function () {
  // L
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [-1, -1];
  figure.demoFigure.elem3.position = [-1, 0];
  figure.demoFigure.elem4.position = [1, 0];
};
demoPositions.LL.CONST = function () {
  // LL
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [1, 0];
  figure.demoFigure.elem3.position = [1, -1];
  figure.demoFigure.elem4.position = [-1, 0];
};
demoPositions.I.CONST = function () {
  // I
  figure.demoFigure.elem1.position = [0, 0];
  figure.demoFigure.elem2.position = [-1, 0];
  figure.demoFigure.elem3.position = [1, 0];
  figure.demoFigure.elem4.position = [2, 0];
};

function clearDemoFigure() {
  // удаление demo фигуры
  figure.demoFigure.elem1 = undefined;
  figure.demoFigure.elem2 = undefined;
  figure.demoFigure.elem3 = undefined;
  figure.demoFigure.elem4 = undefined;
  figure.demoFigure.name = undefined;
  figure.demoFigure.numberOfPixels = undefined;
  figure.demoFigure.orientation = undefined;
  figure.demoFigure.x = undefined;
  figure.demoFigure.y = undefined;
  for (let i = 1; i <= 4; i++) {
    // очистка тегов
    document.getElementById("demoPix" + i).remove();
  }
  document.getElementById("demoText").remove();
}
//-----------------------------------------------------------------------------
//                                конец блока 2
//-----------------------------------------------------------------------------

//________________________________________________________________________________
//
//                                       БЛОК 3
//                                 ОПЕРАЦИИ С ОСАДКОМ
//________________________________________________________________________________

function killLiveFigure() {
  // превращение в осадок
  for (let i = 1; i <= figure.liveFigure.numberOfPixels; i++) {
    // присвоение пикселей
    figure.deadFigure["elem" + (figure.deadFigure.numberDead + i)] =
      figure.liveFigure["elem" + i];
    // переназначение координат пикселей:
    //  в live координаты пикселей относительны координат live,
    //  однако для описания dead необходимо иметь абсолютные координаты
    //  каждого пикселя (координаты в системе field)
    figure.deadFigure[
      "elem" + (figure.deadFigure.numberDead + i)
    ].position[0] += figure.liveFigure.x;
    figure.deadFigure[
      "elem" + (figure.deadFigure.numberDead + i)
    ].position[1] += figure.liveFigure.y;
  }
  state.deadFigure = figure.deadFigure;
}

function changeTagId() {
  // замена id тегов пикселей на "мертвые"
  for (let i = 1; i <= figure.liveFigure.numberOfPixels; i++) {
    figure.deadFigure["elem" + (figure.deadFigure.numberDead + i)].id =
      "deadPix" + (figure.deadFigure.numberDead + i);
    figure.deadFigure["elem" + (figure.deadFigure.numberDead + i)].className =
      "dead";
  }
}

function addDeadField() {
  // создание мертвого поля - массив координат мертвых пикселей
  // копирование массива координат из deadFigure в deadField
  for (let key in figure.deadFigure) {
    deadField[key] = figure.deadFigure[key].position;
  }
  deadField.numberDead = figure.deadFigure.numberDead;
  state.deadField = deadField;
}

function writeLays() {
  for (let i = Object.keys(coordField.y).length; i >= 1; i--) {
    // перебор всех Y

    figure.deadLays["lay" + i] = {};
    figure.deadLays["lay" + i].length = 0;

    for (let j = 1; j <= deadField.numberDead; j++) {
      // перебор мертвых пикселей
      if (deadField["elem" + j][1] === i) {
        figure.deadLays["lay" + i]["elem" + j] = deadField["elem" + j];
        figure.deadLays["lay" + i].length++;
      }
    }
  }
  figure.deadLays.fullLays = [];
  figure.deadLays.elemsInFullLays = [];
  figure.deadLays.dropLays = [];
  figure.deadLays.dropElems = [];
}

function checkLays() {
  // проверка на заполненность
  for (let i = Object.keys(coordField.y).length; i >= 1; i--) {
    // перебор всех слоев
    if (
      figure.deadLays[["lay" + i]].length === Object.keys(coordField.x).length
    ) {
      figure.deadLays.fullLays.push(i);
    }
  }
  let arr = []; // временный вспомогательный массив
  // запись элементов из полных слоя в массив
  figure.deadLays.fullLays.forEach(function (fullLay) {
    // для каждого номера слоя вывести массив ключей
    arr = Object.keys(figure.deadLays["lay" + fullLay]); // массив ключей очередного полного слоя
    arr.shift();
    figure.deadLays.elemsInFullLays =
      figure.deadLays.elemsInFullLays.concat(arr); // массив ключей всех полных слоев
  });
}

function deleteLay() {
  // удаление полных слоев
  figure.deadLays.elemsInFullLays.forEach(function (elem) {
    delete deadField[elem];
    delete figure.deadFigure[elem];
    let elemNum = elem.replace("elem", ""); // номер элемента
    document.getElementById("deadPix" + elemNum).remove(); // удаляем теги
  });
  figure.deadFigure.numberDead -= figure.deadLays.elemsInFullLays.length;
  deadField.numberDead = figure.deadFigure.numberDead;
}

function dropUpperLays() {
  // падение полных слоев
  let sliceFloor = Math.min(...figure.deadLays.fullLays), // нижняя границы смещаемой фигуры
    arr = []; // массив непустых слоев выше удаляемого
  for (let i = 1; i < sliceFloor; i++) {
    figure.deadLays["lay" + i].length > 0 && figure.deadLays.dropLays.push(i);
  }
  figure.deadLays.dropLays.forEach(function (dropLay) {
    // для каждого номера слоя вывести массив ключей
    arr = Object.keys(figure.deadLays["lay" + dropLay]); // массив ключей очередного полного слоя
    arr.shift();
    figure.deadLays.dropElems = figure.deadLays.dropElems.concat(arr); // массив ключей всех полных слоев
  });
  figure.deadLays.dropElems.forEach(function (elem) {
    // смещение вниз
    deadField[elem][1] = deadField[elem][1] + figure.deadLays.fullLays.length;
    let elemNum = elem.replace("elem", ""); // номер элемента
    document.getElementById("deadPix" + elemNum).style.top =
      coordField.y[deadField[elem][1]] + "px"; // правим стили
  });
}

function rewriteDeadFigure() {
  /* после удаления полных слоев для корректного управления живой фигурой необходимо 
перезаписать свойства deadField и deadfigure: все элементы пронумеровать 
по порядку начиная с единицы для этого используем копии объектов и перезапишем 
оригиналы, нумеруя свойства начиная с 1

кроме того, после умерщвления каждой живой фигуры, необходимо также
перезаписать массив мертвых пикселей со сквозной нумерацией начиная с 1
    */

  let copyDeadFigure = {}, // объекты-копии как буфер обмена
    copyDeadField = {},
    // массивы ключей объектов для перебора свойств копий
    keysDeadFigure = Object.keys(figure.deadFigure),
    keysDeadField = Object.keys(deadField);

  // удаляем лишнее (numberDead)
  keysDeadFigure.splice(keysDeadFigure.indexOf("numberDead"), 1);
  keysDeadField.splice(keysDeadField.indexOf("numberDead"), 1);

  // deadFigure
  for (let key in figure.deadFigure) {
    // копируем deadFigure
    copyDeadFigure[key] = figure.deadFigure[key];
    delete figure.deadFigure[key];
  }
  copyDeadFigure.numberDead = keysDeadFigure.length;

  for (let i = 1; i <= copyDeadFigure.numberDead; i++) {
    // перезапись
    figure.deadFigure["elem" + i] = copyDeadFigure[keysDeadFigure[i - 1]];
  }
  figure.deadFigure.numberDead = copyDeadFigure.numberDead;

  // deadField
  for (let key in deadField) {
    // копируем deadField
    copyDeadField[key] = deadField[key];
    delete deadField[key];
  }
  copyDeadField.numberDead = keysDeadField.length;

  for (let i = 1; i <= copyDeadField.numberDead; i++) {
    // перезапись
    deadField["elem" + i] = copyDeadField[keysDeadField[i - 1]];
  }
  deadField.numberDead = copyDeadField.numberDead;

  // теги
  for (let i = 0; i < figure.deadLays.dropElems.length; i++) {
    figure.deadFigure["elem" + (i + 1)].id = "deadPix" + (i + 1);
  }
  for (let i = 0; i < figure.deadFigure.numberDead; i++) {
    figure.deadFigure["elem" + (i + 1)].id = "deadPix" + (i + 1);
  }

  writeLays(); // перезапись мертвых слоев
}
//-----------------------------------------------------------------------------
//                                конец блока 3
//-----------------------------------------------------------------------------

export {
  setGameStatus,
  refreshState,
  setFigureType,
  Live,
  addLive,
  drawLive,
  addDemo,
  drawDemo,
  moveLiveFigure,
  changeOrientation,
  setNewPosition,
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
};
