function circle_linesetment_intersect(circle,linestart,lineend){
    //http://stackoverflow.com/questions/1073336/circle-line-collision-detection
    //linestart and lineend in form {x: #, y: #}
    var E = linestart;
    var L = lineend;
    var C = circle.center;
    var r = circle.radius;
    
    var d = {x: L.x - E.x, y: L.y - E.y};
    var f = {x: E.x - C.x, y: E.y - C.y};
    
    var a = dot([d.x,d.y],[d.x,d.y]);
    var b = 2*dot([f.x,f.y],[d.x,d.y]);
    var c = dot([f.x,f.y],[f.x,f.y]) - r*r;
    var discriminant = b*b-4*a*c;
    if (discriminant < 0){
        //no intersection
        return false;
    }
    else{
        discriminant = Math.sqrt(discriminant);
        var t1 = (-b - discriminant)/(2*a);
        var t2 = (-b + discriminant)/(2*a);
        
        
        // 3x HIT cases:
        //          -o->             --|-->  |            |  --|->
        // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

        // 3x MISS cases:
        //       ->  o                     o ->              | -> |
        // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

        if( t1 >= 0 && t1 <= 1 )
        {
        // t1 is the intersection, and it's closer than t2
        // (since t1 uses -b - discriminant)
        // Impale, Poke
        return true;
        }

        // here t1 didn't intersect so we are either started
        // inside the sphere or completely past it
        if( t2 >= 0 && t2 <= 1 )
        {
        // ExitWound
        return true;
        }

        // no intn: FallShort, Past, CompletelyInside
        return false;
    }
    
    
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
    this.set = function(x1,y1,x2,y2){
        this.start.x = x1;
        this.start.y = y1;
        this.end.x = x2;
        this.end.y = y2;
    };
}

function get_distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function findAngleBetweenPoints(start,end){
    var opp = end.y - start.y;
    var adj = end.x - start.x;
    var ang = Math.atan2(opp,adj);
    return ang; //In radians
}