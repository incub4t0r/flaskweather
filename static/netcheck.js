// var cityID = document.getElementById("cityID").getAttribute( "data_id" );
function yesConn(newDay) {
    document.getElementById("demo").innerHTML="You have internet connectivity"
    getMainWeather(newDay);
    console.log("internet connection available")
}
function noConn() {
    document.getElementById("demo").innerHTML="You do not have internet connectivity"
    console.log("internet connection unavailable")
}

function checkNetConn(){
    var i = new Image();
    i.onload = yesConn(false);
    i.onerror = noConn;
    i.src = 'https://www.google.com/images/nav_logo242.png?d=' + escape(Date());
    // console.log("Ran network check")
}
setInterval(checkNetConn,1000*60*30);