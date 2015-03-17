
function showMenuScreen(id,link){
    console.log('show: ' + id);
    //set active css:
    
    $('li.active').removeClass('active');
    link.parent().addClass('active');
    //window.history.pushState("object or string", "Title", "./?m=" + id);
    $('.menuWindow').hide();
    
    $("#"+id).show();
    history.pushState({}, id, "#"+id);
    /*
    //set no buttons to currentMenuItem
    $("#button_startScreen").removeClass("currentMenuItem");
    $("#button_levelSelect").removeClass("currentMenuItem");
    $("#button_achievements").removeClass("currentMenuItem");
    $("#button_mailingList").removeClass("currentMenuItem");
    $("#button_feedback").removeClass("currentMenuItem");
    //Set the currentMenuItem
    $("#button_"+id).addClass("currentMenuItem");*/

}

window.onhashchange = function() {
    //on back button or regular hash change
    if(location.hash.substring(0,1)=='#')showMenuScreen(location.hash.substring(1),$('a[href$="'+location.hash.substring(1)+'"'));
}

//a refresh or regular navigation to the page will show the correct div.
if(location.hash.substring(0,1)=='#')showMenuScreen(location.hash.substring(1),$('a[href$="'+location.hash.substring(1)+'"'));
else showMenuScreen("Home",$('a[href$="Home"'));
