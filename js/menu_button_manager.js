/*******************************************************\
Copyright 2014,2015, Jordan O'Leary, All rights reserved.
If you would like to copy or use my code, you may contact
me at jdoleary@gmail.com
/*******************************************************/

var buttons = [];
function addButton(text,x,y, clickFunction){
    //clickFunction is the function that is called whent this button is clicked.
    //var textureButton = PIXI.Texture.fromImage(img);
    //var textureButtonOver = PIXI.Texture.fromImage(imgOver);
    
    var textureButton = PIXI.Texture.fromImage("button.png");
    var textureButtonOver = PIXI.Texture.fromImage("button2.png");
    
    var textforbutton = new PIXI.Text(text, { font: "30px Arial", fill: "#000000", align:"left", stroke: "#FFFFFF", strokeThickness: 4 });
    textforbutton.anchor.x = 0.5;//centered
    
    var button = new PIXI.Sprite(textureButton);
    button.anchor.x = 0.5;
    button.anchor.y = 0.5;		
    button.x = x;
    button.y = y;
    button.interactive = true;
    //button.setInteractive(true);
    
    button.addChild(textforbutton);
    

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
        //disable once clicked
        this.interactive = false;
        clickFunction();
    }
    
    buttons.push(button);
    stage.addChild(button);

}