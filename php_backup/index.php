<!DOCTYPE html>
<html>
<body>

<script>
    function getMapInfo(subdir, fileName){
        $.get(subdir + "/" + fileName, function(result) {
            if (result == 'ON') {
                console.log('ON');
            } else if (result == 'OFF') {
                console.log('OFF');
            } else {
            	//you will have "Uncaught SyntaxError: Unexpected token e" here if the JSON does not parse correctly.
		var map = JSON.parse(result);
                mapData.push(map);
            }
        });
    }
    //get info from php:
    var fileNames;
    var mapData = [];
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        console.log(this.responseText); 
        fileNames = JSON.parse(this.responseText);
        for(var i = 0; i < fileNames.length; i++){
            console.log("get file: " + fileNames[i]);
            //getMapInfo("community_maps", fileNames[i]);
        }
    };
    oReq.open("get", "community_maps/get-data.php", true);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to 
    //                                 continue.
    oReq.send();
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

</body>
</html>