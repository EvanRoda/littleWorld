var draw = SVG('drawing').size(500, 500);



var $spawn = draw.symbol();
$spawn.rect(15, 15).radius(3).attr({ fill: '#faff23' });
$spawn.circle(10).center(7, 7).attr({ fill: '#686868' });

var $food = draw.symbol();
$food.rect(15, 15).radius(3).attr({ fill: '#7FFF00' });

var $unit = draw.symbol();
$unit.circle(15).attr({ fill: '#2b2b2b' });

/*var rect = draw.rect(100, 100).attr({ fill: '#f06' });
rect.radius(10);
var circle = draw.circle(50);
circle.center(50, 50).style('cursor', 'pointer');

var unit = draw.group();
unit.add(rect);
unit.add(circle);

unit.animate(3000).center(150, 150);*/

/*var ellipse = draw.ellipse(100, 100).attr({ fill: '#fff' });

var line = draw.line(0, 0, 100, 150).stroke({ width: 6 });
line.plot(50, 30, 100, 150); //update line

var polyline = draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 2 });
polyline.animate(3000).plot([[0,0], [100,50], [50,100], [150,50], [200,50], [250,100], [300,50], [350,50]]);

var polygon = draw.polygon('0,0 100,50 50,100').fill('none').stroke({ width: 1 });
polygon.plot([[0,0], [100,50], [50,100], [150,50], [200,50]]);

draw.path('M 100 200 C 200 100 300  0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100');*/

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
 * Создание
 * @param map
 * @returns {{}}
 */
function createObject(map, type){
    var x= 0, y= 0, spawn = {};
    while(!spawn._id){
        x = _.random(map[0].length);
        y = _.random(map.length);
        //todo: Добавить проверку нет ли в этой точке какого либо объекта
        if(map[y] && typeof map[y][x] === 'number' && map[y][x] === 0){

            if(type == 'spawn'){
                spawn = {
                    _id: 1,
                    coordinates: [x, y],
                    view: draw.use($spawn).move(x*15, y*15)
                };
            }else if(type == 'food'){
                spawn = {
                    _id: 2,
                    coordinates: [x, y],
                    view: draw.use($food).move(x*15, y*15)
                };
            }else if(type == 'unit'){
                spawn = {
                    _id: 3,
                    coordinates: [x, y],
                    view: draw.use($unit).move(x*15, y*15)
                };
            }

        }
    }
    return spawn;
}

function Unit(object){
    this._id = object._id;
    this.coordinates = object.coordinates;
    this.view = object.view ;
    


    this.decision = {
        resolve: false
    };

    this.getDecision = function(){

    };


}


var map = createNewMap(33, 33, 20);

map.forEach(function(row, h){
    row.forEach(function(cell, w){
        if(cell){
            draw.rect(15, 15).
                radius(3).
                attr({ fill: '#657586' }).
                move(w*15, h*15);
        }
    })
});

var spawn1 = createObject(map, 'spawn');
var food1 = createObject(map, 'food');
var unit1 = createObject(map, 'unit');

var grid = new PF.Grid(map[0].length, map.length, map);

var ID = setInterval(function(){
    gameLoop();
}, 1000);


function gameLoop(){




}

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');