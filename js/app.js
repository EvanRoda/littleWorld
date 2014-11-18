var GL = {};

var draw = SVG('drawing').size(1888, 928);

var tileWidth = 16;

var $cityHall = draw.symbol();
$cityHall.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$cityHall.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $mine = draw.symbol();
$mine.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$mine.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $forge = draw.symbol();
$forge.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$forge.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $house= draw.symbol();
$house.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$house.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $tower= draw.symbol();
$tower.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$tower.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $spawn = draw.symbol();
$spawn.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#faff23' });
$spawn.circle(10).center(tileWidth/2, tileWidth/2).attr({ fill: '#686868' });

var $food = draw.symbol();
$food.rect(tileWidth, tileWidth).radius(3).attr({ fill: '#7FFF00' });

var $unit = draw.symbol();
$unit.circle(tileWidth).attr({ fill: '#2b2b2b' });

var map = createNewMap(118, 58, 20);

GL.spawn1 = createObject(map, 'spawn');
GL.food1 = createObject(map, 'food');
GL.units = [];
GL.units.push(new Unit(createObject(map, 'unit')));
GL.units.push(new Unit(createObject(map, 'unit')));

map.forEach(function(row, h){
    row.forEach(function(cell, w){
        if(cell){
            draw.rect(tileWidth, tileWidth).
                radius(3).
                attr({ fill: '#657586' }).
                move(w*tileWidth, h*tileWidth);
        }
    })
});

GL.grid = new PF.Grid(map[0].length, map.length, map);
GL.inc = 0;

var ID = setInterval(function(){
    gameLoop();
}, 1000);

function gameLoop(){
    GL.units.forEach(function(unit){
        unit.thinking();
    });
    GL.units.forEach(function(unit){
        unit.view.animate(800).move(unit.point[0]*tileWidth, unit.point[1]*tileWidth);
    });
}

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