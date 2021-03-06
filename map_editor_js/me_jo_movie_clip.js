/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/
function jo_movie_clip(path, name, frames, type){
    //returns a movie_clip, pass paramaters of clip "explosion_7.png" as jo_movie_clip("movie_clips\","explosion_",7,".png");
    var movie_textures = [];
    
    for (var i=0; i < frames; i++) 
    {
        var texture = PIXI.Texture.fromImage(path + name + (i) + type);
        movie_textures.push(texture);
    };
    return new PIXI.MovieClip(movie_textures);
}





