let coords = [19.641128214718364, -98.99283154520714];

// V 2.1.79

ymaps.ready(function () {

    var contactsMap = new ymaps.Map("contacts-map", {
        center: coords,
        zoom: 18
    });

    var contactsMapGeocoder = ymaps.geocode(coords, { kind: 'street' });

    contactsMapGeocoder.then(
        function (res) {
            contactsMap.geoObjects.add(res.geoObjects.get(0));
        },
    );
});



//let coords = [55.754952, 37.615319];

// V 3

/* ymaps3.ready.then(() => {
    const map = new ymaps3.YMap(document.getElementById('YMapsID'), {
        location: {
            center: [37.64, 55.76],
            zoom: 10
        }
    });
    map.addChild(new ymaps3.YMapDefaultSchemeLayer())
});
 */

// V 3

/* async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('contacts-map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 10
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
}

initMap(); */


