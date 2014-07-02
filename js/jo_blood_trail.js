function jo_blood_trail(centerx,centery){
    this.snap_count = 0;
    this.painting;
    this.death_coords = {x: centerx+32, y :centery+32};//32 is half of the blood.png image size
    //Draw a rectangle
    var rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xFFFFFF);
    rectangle.drawRect(0, 0, window_properties.width, window_properties.height);
    rectangle.endFill();
    rectangle.boundsPadding = 0;
    
     // create a texture from an image path
    var texture = PIXI.Texture.fromImage("blood.png");
 
    // create a new Sprite using the texture
    this.thing = new PIXI.Sprite(texture);


    
    this.snap = function(){
        this.snap_count++;
        //the blood will fade as you continue to drag
        if(this.thing.alpha > .5){
            this.thing.alpha -= 0.009;
        }else if (this.thing.alpha > .25){
            this.thing.alpha -= 0.004;
        }else {
            this.thing.alpha -= 0.002;
        }
        if(this.thing.alpha > 0){
            var snapshot = this.painting.sprite.generateTexture();
            this.painting.sprite.setTexture(snapshot);
        }
    };

    //Generate a texture from the rectangle
    var rectangleTexture = rectangle.generateTexture();


    //Use the texture to create a `painting` sprite
    this.painting = new jo_sprite(new PIXI.Sprite(rectangleTexture),display_blood);//add to the display_blood layer
    this.painting.x = centerx;
    this.painting.y = centery;
    this.painting.sprite.alpha = 0;//this gets rid of the black rectangle
    this.snap();//this gets rid of the black rectangle
    this.painting.sprite.alpha = 1;//this gets rid of the black rectangle
    this.thing.x = -32;
    this.thing.y = -32;
    this.painting.sprite.addChild(this.thing);
    
    
    this.prepare_for_draw = function(){
        this.painting.prepare_for_draw();
    };
    
}