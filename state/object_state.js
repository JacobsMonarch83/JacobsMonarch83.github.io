/* ОБЪЕКТ СОСТОЯНИЯ: 
Единый объект, состояние приложения в любой момент времени
 */

import { Live } from "/state/setters.js";

let figureO,
  figureT,
  figureZ,
  figureZZ,
  figureL,
  figureLL,
  figureI,
  coordX = 7, // назначение начальных координат
  coordY = 4;

let figure = {
  figureTypeArray: ["O", "T", "Z", "ZZ", "LL", "L", "I"],
  randomFigureType: undefined,
  figureArray: [
    // массив возможных живых
    (figureO = new Live("O", 4, coordX, coordY)),
    (figureT = new Live("T", 4, coordX, coordY)),
    (figureZ = new Live("Z", 4, coordX, coordY)), // конструктор живых
    (figureZZ = new Live("ZZ", 4, coordX, coordY)),
    (figureL = new Live("L", 4, coordX, coordY)),
    (figureLL = new Live("LL", 4, coordX, coordY)),
    (figureI = new Live("I", 4, coordX, coordY)),
  ],
  posArr: ["UP", "RIGHT", "DOWN", "LEFT"], // возможные позиции для перебора
  liveFigure: {
    html_IDs: {
      elem1Id: "livePix1",
      elem2Id: "livePix2",
      elem3Id: "livePix3",
      elem4Id: "livePix4",
    },
  },
  demoFigure: {
    html_IDs: {
      elem1Id: "demoPix1",
      elem2Id: "demoPix2",
      elem3Id: "demoPix3",
      elem4Id: "demoPix4",
    },
  },
  deadFigure: {
    numberDead: 0,
  },
  deadLays: {
    // заполненные слои
    fullLays: [], // кол-во полных слоев
    elemsInFullLays: [], // кол-во пикселей в них
    dropLays: [], // сдвигаемые слои
    dropElems: [], // пиксели в сдвигаемых слоях
  },
};
window.figure = figure;

/* "field" - сетка координат. Содержит остальные объекты
            координатная сетка описывает множество возможных положений 
            элементарного кубика, служит для упрощения описания движения и поиска
            положения фигур в рабочем поле, реализует переход от пикселей к координатам

            формат задания координат: x = 1; y = 1
            переменные x и y - содержат координаты "нуля" в пикселях + шаг в пикселях

Демо-поле - область показа следующей фигуры
*/
let step = 20, // цена деления
  xMin = 0 - 40, //крайние координаты
  yMin = 0,
  demoXMin = 150, // для демо-поля
  demoYMin = 0;
let coordField = {
  // объект "сетка координат"
  x: {
    1: xMin,
    2: xMin + step,
    3: xMin + 2 * step,
    4: xMin + 3 * step,
    5: xMin + 4 * step,
    6: xMin + 5 * step,
    7: xMin + 6 * step,
    8: xMin + 7 * step,
    9: xMin + 8 * step,
    10: xMin + 9 * step,
    11: xMin + 10 * step,
    12: xMin + 11 * step,
  },
  y: {
    1: yMin,
    2: yMin + step,
    3: yMin + 2 * step,
    4: yMin + 3 * step,
    5: yMin + 4 * step,
    6: yMin + 5 * step,
    7: yMin + 6 * step,
    8: yMin + 7 * step,
    9: yMin + 8 * step,
    10: yMin + 9 * step,
    11: yMin + 10 * step,
    12: yMin + 11 * step,
    13: yMin + 12 * step,
    14: yMin + 13 * step,
    15: yMin + 14 * step,
    16: yMin + 15 * step,
    17: yMin + 16 * step,
    18: yMin + 17 * step,
    19: yMin + 18 * step,
    20: yMin + 19 * step,
    21: yMin + 20 * step,
    22: yMin + 21 * step,
    23: yMin + 22 * step,
    24: yMin + 23 * step,
    25: yMin + 24 * step,
  },
};

let demoCoordField = {
  // объект "сетка координат" демо-поля
  x: {
    1: demoXMin,
    2: demoXMin + step,
    3: demoXMin + 2 * step,
    4: demoXMin + 3 * step,
    5: demoXMin + 4 * step,
    6: demoXMin + 5 * step,
    7: demoXMin + 6 * step,
    8: demoXMin + 7 * step,
    9: demoXMin + 8 * step,
    10: demoXMin + 9 * step,
    11: demoXMin + 10 * step,
    12: demoXMin + 11 * step,
  },
  y: {
    1: demoYMin,
    2: demoYMin + step,
    3: demoYMin + 2 * step,
    4: demoYMin + 3 * step,
    5: demoYMin + 4 * step,
    6: demoYMin + 5 * step,
    7: demoYMin + 6 * step,
    8: demoYMin + 7 * step,
    9: demoYMin + 8 * step,
    10: demoYMin + 9 * step,
    11: demoYMin + 10 * step,
    12: demoYMin + 11 * step,
  },
};

let deadField = {}; // множество координат пикселей в осадке
window.deadField = deadField;

let state = {
  /* 
Статус игры:
'not-started', 'active', 'paused', 'stopped', 'failed'
 */
  gameStatus: undefined,

  /* 
Рабочее поле:
множество координат, где могут находиться единичные пиксели
принимает coordField
 */
  field: coordField,

  /* 
Мертвое поле:
множество координат мертвых пикселей
принимает deadField из модулей
 */
  deadField: deadField,

  /* 
Активная фигура:
падающая фигура, состоит из пикселей, всего 7 типов, 3 степени свободы
принимает liveFigure из модулей
 */
  activeFigure: figure.liveFigure.name,

  /* 
Демо-фигура:
тип следующей фигуры демонстрируется вне рабочего поля
принимает demoFigure из модулей
 */
  demoFigure: figure.demoFigure.name,

  liveFigure: figure.liveFigure,


  /* 
Мертвая фигура:
осадок на дне рабочего поля, состоит из множества единичных пикселей,
ранее принадлежащих Активной фигуре (до выпадения ее в осадок)
принимает deadFigure из модулей
 */
  deadFigure: figure.deadFigure,

  /* 
Скорость:
 */
  speed: 1000,

  /* 
Счет:
 */
  score: 0,

  /* 
Прогресс:
 */
  level: 0,
};
window.state = state;

export { state, figure, coordField, demoCoordField, deadField };
