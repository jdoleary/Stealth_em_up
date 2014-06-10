function circle_ray_intersect(circle,ray){
    //http://stackoverflow.com/questions/1073336/circle-line-collision-detection
    var E = ray.start;
    var L = ray.end;
    var C = circle.center;
    var r = circle.radius;
    
    var d = {x: L.x - E.x, y: L.y - E.y};
    var f = {x: E.x - C.x, y: E.y - C.y};
    
    var a = dot([d.x,d.y],[d.x,d.y]);
    var b = 2*dot([f.x,f.y],[d.x,d.y]);
    var c = dot([f.x,f.y],[f.x,f.y]) - r*r;
    var discriminant = b*b-4*a*c;
    if (discriminant < 0) return false;
    else return true;
    
    
    function dot(a,b) {
        var n = 0, lim = Math.min(a.length,b.length);
        for (var i = 0; i < lim; i++) n += a[i] * b[i];
        return n;
    }
    
}

//var cir = {'center': {x:50,y:50}, 'radius': 10};
//var ray = {'start': {x:0,y:0}, 'end': {x:40,y:39}};

function Ray(x1,y1,x2,y2){
    this.start = {x:x1,y:y1};
    this.end = {x:x2,y:y2};
}

function get_distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}