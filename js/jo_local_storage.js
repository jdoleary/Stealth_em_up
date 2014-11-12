/*
Stats:
Per Level:
Wins
Loses
In General:
Guards Shot
Guards choked
Time Played
*/
function jo_store(name,value){
    if(localStorage[name]){
        localStorage[name] = value;
        console.log("localStorage: " + name + " is now " + value);
    }else{
        console.log("localStorage " + name + " not found.");
    }
}
function jo_store_inc(name){
    //increment
    if(localStorage[name]){
        localStorage[name]++;
        console.log("localStorage: " + name + " is now " + localStorage[name]);
    }else {
            localStorage[name] = 1;
    }
}
function jo_store_get(name){
    if(localStorage[name]){
        return localStorage[name];
    }else{
        console.log("localStorage " + name + " not found.");
    }
}