function jo_cam(window_properties){
    this.x = 0;
    this.y = 0;
    this.objScreenCorner = function(){
        return {x: this.x-window_properties.width/2,y: this.y-window_properties.height/2};
    
    };
    this.relativePoint = function(objectivePoint){
        var screenCorner = this.objScreenCorner();
        //pass sprite properties to this method to get the relative point where they are drawn on the screen.
        return {x: objectivePoint.x - screenCorner.x, y: objectivePoint.y - screenCorner.y};
    };
    this.objectivePoint = function(relativePoint){
        //used for mouse translating to obj coords:
        var screenCorner = this.objScreenCorner();
        return {x: relativePoint.x + screenCorner.x, y: relativePoint.y + screenCorner.y};
    }
}