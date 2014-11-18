/**
 * Генерация карты
 * @param width     .. Ширина в улах
 * @param height    .. Высота в узах
 * @param repeat    .. Количество проходов при прокапывании туннелей
 * @returns {Array} .. Возвращает матрицу карты
 */
function createNewMap(width, height, repeat){
    var map = [], c = {}, i = 0;
    var wCenter = Math.round(width/2);
    var hCenter = Math.round(height/2);
    var tunnelLength = 4 * (width + height);
    for(var y=0;y<height; y++){
        map[y] = [];
        for(var x=0; x<width; x++){
            map[y][x] = 1;
        }
    }
    for(var j=0; j<repeat; j++){
        c = {x:wCenter, y:hCenter};
        for(i=0; i<tunnelLength; i++){
            if(map[c.y] && typeof map[c.y][c.x] === 'number'){
                map[c.y][c.x] = 0;
                c = _.random(0, 1) ? {y: c.y + _.random(-1, 1), x: c.x} : {y: c.y, x: c.x + _.random(-1, 1)};
            }else{
                i = tunnelLength;
            }
        }
    }
    return map;
}

/**
 * Создание игровых объектов
 * @param map
 * @param type
 * @returns {{}}
 */
function createObject(map, type){
    var x= 0, y= 0, obj = {};
    while(!obj._id){
        x = _.random(map[0].length);
        y = _.random(map.length);
        //todo: Добавить проверку нет ли в этой точке какого либо объекта
        if(map[y] && typeof map[y][x] === 'number' && map[y][x] === 0){

            if(type == 'spawn'){
                obj = {
                    _id: createId(),
                    point: [x, y],
                    view: draw.use($spawn).move(x*tileWidth, y*tileWidth)
                };
            }else if(type == 'food'){
                obj = {
                    _id: createId(),
                    point: [x, y],
                    view: draw.use($food).move(x*tileWidth, y*tileWidth)
                };
            }else if(type == 'unit'){
                obj = {
                    _id: createId(),
                    point: [x, y],
                    view: draw.use($unit).move(x*tileWidth, y*tileWidth)
                };
            }

        }
    }
    return obj;
}

/**
 * Генератор id
 * @returns {string}
 */
function createId(){
    return '' + (new Date()).getTime() + (GL.inc++);
}

/**
 * Расстояние между двумя точками
 * @param point1
 * @param point2
 * @returns {number}
 */
function getDistance(point1, point2){
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
}