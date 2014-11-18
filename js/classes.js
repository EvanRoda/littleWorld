function Unit(object){
    this._id = object._id;
    this.point = object.point;
    this.view = object.view;

    this.finder = new PF.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true
    });

    this.curAction = 'stay';
    this.target = null;
    this.path = [];

    this.getPath = function(point){
        return this.finder.findPath(this.point[0], this.point[1], point[0], point[1], GL.grid.clone());
    };

    this.simpleMove = function(){
        if(this.path.length){
            this.point = this.path[0];
            this.path.shift();
        }else{
            this.curAction = 'stay';
        }
    };

    this.decision = {
        resolve: false
    };

    this.getDecision = function(){

    };

    /**
     * Основная ф-ция юнита
     * На каждом такте запускается именно она
     */
    this.thinking = function(){
        //console.log(this);
        if(this.curAction == 'move'){
            this.simpleMove();
        }else if(this.curAction == 'stay'){
            //Генерация чего-то новинького
            var range = getDistance(this.point, GL.spawn1.point);

            this.target = range > 1 ? GL.spawn1 : GL.food1;

            this.path = this.getPath(this.target.point);
            //debugger;
            this.curAction = 'move';
        }
    };
}