function addButton(img,imgOver, clickFunction){
    console.log('ADD BUTTON');
    //clickFunction is the function that is called whent this button is clicked.
    var textureButton = PIXI.Texture.fromImage(img);
    var textureButtonOver = PIXI.Texture.fromImage(imgOver);
    button = new PIXI.Sprite(textureButton);
    button.anchor.x = 0.5;
    button.anchor.y = 0.5;		
    button.x = window_properties.width/2;
    button.y = window_properties.height/2;
    button.setInteractive(true);
    

    // set the mouseup and touchend callback..
    button.mouseup = button.touchend = function(data){
        this.isdown = false;
        
        if(this.isOver)
        {
            this.setTexture(textureButtonOver);
        }
        else
        {
            this.setTexture(textureButton);
        }
    }
    
    // set the mouseover callback..
    button.mouseover = function(data){
        
        this.isOver = true;
        
        if(this.isdown)return
        
        this.setTexture(textureButtonOver)
    }
    // set the mouseout callback..
    button.mouseout = function(data){
        
        this.isOver = false;
        if(this.isdown)return
        this.setTexture(textureButton)
    }
    
    button.click = function(data){
        clickFunction();
    }
    
    stage.addChild(button);

}