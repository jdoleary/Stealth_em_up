<?php
/**
 * Sample PHP code to use reCAPTCHA V2.
 *
 * @copyright Copyright (c) 2014, Google Inc.
 * @link      http://www.google.com/recaptcha
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
try {
	require_once "recaptchalib.php";
	// Register API keys at https://www.google.com/recaptcha/admin
	$siteKey = "6LdYuwITAAAAAMiYItyy2FZxM9RkKopkt_edj647";
	$secret = "6LdYuwITAAAAAFJC0pMbDFr4ulPkt4VSRxpV49S8";
	// reCAPTCHA supported 40+ languages listed here: https://developers.google.com/recaptcha/docs/language
	$lang = "en";
	// The response from reCAPTCHA
	$resp = null;
	// The error code from reCAPTCHA, if any
	$error = null;
	$reCaptcha = new ReCaptcha($secret);
	// Was there a reCAPTCHA response?
	if ($_POST["g-recaptcha-response"]) {
	    $resp = $reCaptcha->verifyResponse(
	        $_SERVER["REMOTE_ADDR"],
	        $_POST["g-recaptcha-response"]
	    );
	}
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>
<html>
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
	<title>STEALTH em UP</title>
	<style>

        body{
            margin: 0px;
        }
        canvas {
            padding-left: 0;
            padding-right: 0;
            margin-left: auto;
            margin-right: auto;
            display: block;
        
        }
        .captcha{
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -50px;
          margin-left: -100px;
          border:5px solid black;
          border-radius: 5px;
        }
        #map_size_controls{
            position: absolute;
            width:100%;
            height:100%;
        }
        #map_size_controls > div{
          width: 300px;
          height: 100px;
          padding: 20px;

          position: absolute;
          top: 50%;
          left: 50%;

          margin: -70px 0 0 -170px;
        }
	</style>

    <link rel="stylesheet" type="text/css" href="buttons.css">
	<script src="bin/pixi.dev.js"></script>
	
</head>
    <body>
    
    <?php



    function super_sanitize($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data,ENT_NOQUOTES);
      return $data;
    }

    if ($resp != null && $resp->success) {
        echo "You got it!";

        $myfile = fopen("maps/".$_POST['filename'].".jomap", "w") or die("Unable to open file!");
        $map_data = super_sanitize($_POST['map_data']);
        echo "MAP DATA: " . $map_data;
        fwrite($myfile, $map_data);
        
        fclose($myfile);
        
        echo json_encode($_POST);
        
    }else{
        echo "Fail to send to server";
    }
    ?>
    <div id="map_size_controls">
        <div>
            Choose Map Size:
            <br>
            <span id="map_width_slider_text">40 blocks wide.</span><input type="range" id="map_width_slider" value="40" min="20" max="120" onchange="updateSliders();">
            <br>
            <span id="map_heigh_slider_text">40 blocks high.</span><input type="range" id="map_height_slider" value="40" min="20" max="120" onchange="updateSliders();">
        </div>
    </div>
    
    <div id="buttons"  style="display:none;position:absolute;top:20px;right:20px;" onmouseover="disableGridClick();" onmouseout="enableGridClick()">
        <button id="button_single_block" class="pure-button pure-button-active" onclick="change_tool('single');" style="width:100%">Single Block Tool</button>
        <br>   
        <button id="button_fill" class="pure-button" onclick="change_tool('fill');" style="width:100%">Fill Tool</button>
        <br>   
        <button id="button0" class="pure-button pure-button-active" onclick="changePaletteNum(0);" style="width:100%">Wall</button>
        <br>    
        <button id="button1"  class="pure-button" onclick="changePaletteNum(1);" style="width:100%">Floor</button>
        <br>  
        <button id="button2"  class="pure-button" onclick="changePaletteNum(2);" style="width:100%">Desk</button>
        <br>  
        <button id="button4"  class="pure-button" onclick="changePaletteNum(4);" style="width:100%">Floor(Restricted)</button>
        <br>  
        <button id="button5"  class="pure-button" onclick="changePaletteNum(5);"  style="width:100%">Door (Vert)</button>
        <br>    
        <button id="button6"  class="pure-button" onclick="changePaletteNum(6);"  style="width:100%">Door (Horiz)</button>
        <br>    
        <button id="button7"  class="pure-button" onclick="changePaletteNum(7);" style="width:100%">Money</button>
        <br>  
        <button id="button8"  class="pure-button" onclick="changePaletteNum(8);" style="width:100%">Escape Car</button>
        <br>    
        <button id="button9"  class="pure-button" onclick="changePaletteNum(9);"  style="width:100%">Computer</button> 
        <br>   
        <button id="button10"  class="pure-button" onclick="changePaletteNum(10);"  style="width:100%">Player Spawn</button>
        <br>   
        <button id="button11"  class="pure-button" onclick="changePaletteNum(11);"  style="width:100%">Guard Backup Spawn</button>
        <br>   
        <button id="button13"  class="pure-button" onclick="changePaletteNum(13);"  style="width:100%">Guard</button>
        <br>   
        <button id="button12"  class="pure-button" onclick="changePaletteNum(12);"  style="width:100%">Security Camera</button>
        <br>
        <div id="SecurityCameraRotationSelector" style="border-style:solid;border-color:#ff0000;display:none;">
            <svg width="180" height="180" xmlns:xlink="http://www.w3.org/1999/xlink viewBox="180 180 360 360">
             <g transform="translate(100,100) scale(0.25,0.25)" id="quarter_pies">
              <path id="pie1" onclick="pie(this,4)" d="M0,0 L0,-200  A200,200 0 0,1  200,000  z" 
                style="fill:white;fill-opacity: 1;stroke:black;stroke-width: 1"/>
              <path id="pie2" onclick="pie(this,3)" d="M0,0 L-200,0  A200,200 0 0,1    0,-200 z" 
                style="fill:white;fill-opacity: 1;stroke:black;stroke-width: 1"/>
              <path id="pie3" onclick="pie(this,2)" d="M0,0 L0,200   A200,200 0 0,1 -200,0    z" 
                style="fill:white;fill-opacity: 1;stroke:black;stroke-width: 1"/>
              <path id="pie4" onclick="pie(this,1)" d="M0,0 L200,0   A200,200 0 0,1    0,200  z" 
                style="fill:white;fill-opacity: 1;stroke:black;stroke-width: 1"/>
             </g>
            </svg>
        </div>
        <br>   
        <button id="button14"  class="pure-button" onclick="changePaletteNum(14);"  style="width:100%">Erase Objects</button>
        <br>
        <button id="button_publish" class="pure-button" onclick="publish();" style="width:100%">Publish</button>
        <br><br>
        <button id="button_captcha" class="captcha">
            <h2>Please verify that you are not a robot in order to publish your map to the server.</h2>
            <form method="post">
                <input id="input_filename" name="filename">
                <input id="input_map_data" name="map_data">
              <div class="g-recaptcha" data-sitekey="<?php echo $siteKey;?>"></div>
              <script type="text/javascript"
                  src="https://www.google.com/recaptcha/api.js?hl=<?php echo $lang;?>">
              </script>
              <br/>
              <input type="submit" value="submit" />
            </form>
        </button>
        
    
    </div>
    <div id="buttons"  style="position:absolute;top:20px;left:20px;" onmouseover="disableGridClick();" onmouseout="enableGridClick()">
    
    </div>
    
    <div id="canvas_holder"></div>
    
    <script src="map_editor_js/me_images.js"></script>
    <script src="map_editor_js/me_menu_button_manager.js"></script>
    <script src="map_editor_js/me_jo_debug.js"></script>
    <script src="map_editor_js/me_jo_door.js"></script>
    <script src="map_editor_js/me_jo_math.js"></script>
	<script src="map_editor_js/me_jo_sprite.js"></script>
	<script src="map_editor_js/me_jo_cam.js"></script>
	<script src="map_editor_js/me_jo_utility.js"></script>
    <script src="map_editor_js/me_jo_doodad.js"></script>
	<script src="map_editor_js/me_jo_wall.js"></script>
	<script src="map_editor_js/me_jo_grid.js"></script>
	<script src="map_editor_js/me_astar.js"></script>
	<script src="map_editor_js/me_jo_raycast.js"></script>
	<script src="map_editor_js/me_jo_security_camera.js"></script>
	<script src="map_editor_js/me_sprite_hero.js"></script>
	<script src="map_editor_js/me_sprite_guard.js"></script>
	<script src="map_editor_js/me_sprite_civ.js"></script>
    <script src="map_editor_js/me_jo_movie_clip.js"></script>
    <script src="map_editor_js/me_sound_manager.js"></script>
    <script src="map_editor_js/me_jo_progress_bar.js"></script>
    <script src="map_editor_js/me_jo_local_storage.js"></script>
    <script src="map_editor_js/me_main.js"></script>
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script>

        $('#input_filename').hide();
        $('#input_map_data').hide();
        $('#button_captcha').hide();
        
        function updateSliders(){
            $('#map_width_slider_text').text($('#map_width_slider').val() + " blocks wide");
            $('#map_height_slider_text').text($('#map_height_slider').val() + " blocks high");
        }
        
        var tool = 'single';
        function change_tool(tool_type){
            $('#button_single_block').removeClass("pure-button-active");
            $('#button_fill').removeClass("pure-button-active");
            tool = tool_type;
            if(tool == 'single'){
                $('#button_single_block').addClass("pure-button-active");
                
            }else{
                $('#button_fill').addClass("pure-button-active");
                
            }
        }
        
        //the number type of tile to place when clicking
        var palette_number = 0;
        function changePaletteNum(num){
            $(".pure-button").removeClass("pure-button-active");
            $("#button" + num).addClass("pure-button-active");
            console.log("change palette: " + num);
            palette_number = num;
            change_tool(tool);//reset tool css (this is a bad shortcut but it works)
            if(num === 12){
                $('#SecurityCameraRotationSelector').show();
            }else{
                $('#SecurityCameraRotationSelector').hide();
            }
        }
        var gridClickEnabled = true;
        function disableGridClick(){
            gridClickEnabled=false;
        }
        function enableGridClick(){
            gridClickEnabled=true;
        
        }
        var map_data_to_save;
        //save, submit, publish
        function publish(){
            //if anything is in this list give error
            var fail_list = [];
            /*if(computer_for_security_cameras.x == 0 || computer_for_security_cameras.y == 0){
                fail_list.push("Computer");
            }
            if(loot[0].x == 0 || loot[0].y == 0){
                fail_list.push("Money");
            }
            if(getawaycar.x == 0 || getawaycar.y == 0){
                fail_list.push("Escape Car");
            }
            if(hero_spawn_icon.x == 0 || hero_spawn_icon.y == 0){
                fail_list.push("Player Spawn");
            }
            if(guard_spawn_icon.x == 0 || guard_spawn_icon.y == 0){
                fail_list.push("Guard Backup Spawn");
            }
            console.log('fail: ' + fail_list.length);*/
            if(fail_list.length != 0){
                fail_to_publish(fail_list);
            }else{
                map_data_to_save = {};
                map_data_to_save["data"] = [];
                //fill data:
                for(var i = 0; i < grid.cells.length; i++){
                    var origNum = grid.cells[i].image_number;
                    //note: because of the silly way that I made the grid logic, I have to change these numbers:
                    var newNum = origNum;
                    switch(origNum){
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            newNum = origNum+1;
                            break;
                            
                    }
                    map_data_to_save["data"].push(newNum);
                }
                map_data_to_save["height"] = grid.height;
                map_data_to_save["width"] = grid.width;
                map_data_to_save["objects"] ={};
                map_data_to_save["objects"]["hero"] = [Math.round(hero_spawn_icon.x),Math.round(hero_spawn_icon.y)];
                map_data_to_save["objects"]["guards"] = [];
                for(var g = 0; g < guards.length; g++){
                    map_data_to_save["objects"]["guards"].push([Math.round(guards[g].x),Math.round(guards[g].y)]);
                }
                map_data_to_save["objects"]["guard_backup_spawn"] = [Math.round(guard_spawn_icon.x),Math.round(guard_spawn_icon.y)];
                map_data_to_save["objects"]["security_cams"] = [];
                for(var s = 0; s < security_cameras.length; s++){
                    map_data_to_save["objects"]["security_cams"].push({"swivel_max":security_cameras[s].max,"swivel_min":security_cameras[s].min,"pos":[Math.round(security_cameras[s].x),Math.round(security_cameras[s].y)]});
                }
                map_data_to_save["objects"]["computer"] = [Math.round(computer_for_security_cameras.x),Math.round(computer_for_security_cameras.y)];
                map_data_to_save["objects"]["van"] = [Math.round(getawaycar.x),Math.round(getawaycar.y)];
                map_data_to_save["objects"]["loot"] = [Math.round(loot[0].x),Math.round(loot[0].y)];
                var string_map_data = JSON.stringify(map_data_to_save);
                //push data to server
                //map name is uniquified with date time later
                var map_name = prompt("Enter the name of your level");
                //Show the captcha:
                $('#button_captcha').show();
                var date = new Date();
                $('#input_filename').val(map_name + "_" + date.getTime());
                $('#input_map_data').val(string_map_data);
                //OLD
                /*if(map_name != null){
                    $.ajax({
                      type: "POST",
                      dataType: "json",
                      url: "maps/map_editor.php", //Relative or absolute path to response.php file
                      data: {"filename":map_name + "_" + Date().getTime(),"map_data":string_map_data},
                      success: function(data) {
                        test = data;
                        console.log(data);//prints the echo from r2015.php
                        console.log("Push data to server worked.");

                      },
                      fail: function(){
                        console.log("Push data to server failed.");
                      }
                    });
                }else{
                    alert("Map not published, please try again.");
                }*/
            }
        
        }
        function fail_to_publish(list){
            var message = "Your map is missing: ";
            for(var i = 0; i < list.length; i++){
                if(i!=0)message += ",";
                message += list[i];
            }
            alert(message);
        
        }
    </script>
	</body>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-56798370-1', 'auto');
      ga('send', 'pageview');

    </script>
</html>