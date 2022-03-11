// const cron = require("cron");
window.onload = function(){
    const owmkey = '1d51f32b7f1bdace2aa7b9a20cbabb66'; // You can get your own, free openweathermap api key at http://openeweathermap.org
    // const geocodekey ='AIzaSyDehmKEAjLxQgYbX7pY9_3rQSCvktvHg6M'; // You can get your own, free Google Maps api https://console.cloud.google.com
    var cityID = document.getElementById("cityID").getAttribute( "data_id" );

    // function to retrieve data from openweathermap and parse with jquery
    function getMainWeather(newDay){
        if (newDay){
            console.log("getting main weather, setting high and low")
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + cityID+ '&appid=' + owmkey+'&units=imperial', function(data) {
                var temp = Math.round(parseFloat(data.main.temp));
                var tempmin = Math.round(data.main.temp_min) + '&deg;';
                var tempmax = Math.round(data.main.temp_max) + '&deg;';
                var weatherID = data.weather[0].id;
                weatherIcon = document.getElementById("curr-weather-icon");
                document.getElementById('tempmain').innerHTML = temp + '&deg;';
                document.getElementById('tempmin').innerHTML = tempmin;
                document.getElementById('tempmax').innerHTML = tempmax;
                weatherIcon.setAttribute("class","wi wi-owm-" + isDayOrNight(data)+"-"+weatherID+"");
            });
        }
        else{
            console.log("getting main weather only")
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + cityID+ '&appid=' + owmkey+'&units=imperial', function(data) {
                var temp = Math.round(parseFloat(data.main.temp));
                var weatherID = data.weather[0].id;
                weatherIcon = document.getElementById("curr-weather-icon");
                document.getElementById('tempmain').innerHTML = temp + '&deg;';
                weatherIcon.setAttribute("class","wi wi-owm-" + isDayOrNight(data)+"-"+weatherID+"");
            });
        }
    }
    // test link
    // https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=1d51f32b7f1bdace2aa7b9a20cbabb66&units=imperial

    // function to determine whether it is day or night for the correct icon to show
    function isDayOrNight(data) { 
            currDate = new Date(),
            currTime = currDate.getTime(),
            sunriseTime = data.sys.sunrise * 1000,
            sunsetTime = data.sys.sunset * 1000;
        if (currTime >= sunriseTime && currTime < sunsetTime) {return "day";} 
        else {return "night"};
    }

    // internet connection is available
    // function yesConn(newDay) {
    //     // document.getElementById("demo").innerHTML="You have internet connectivity"
    //     getMainWeather(newDay);
    //     // console.log("internet connection available")
    // }
    // internet connection is not available
    function noConn() {
        // void function, do not update the weather data
    }
    // check internet connection by attempting to load an image
    function checkNetConn(newDay){
        var i = new Image();
        i.onload = getMainWeather(newDay);
        i.onerror = noConn;
        i.src = 'https://www.google.com/images/nav_logo242.png?d=' + escape(Date());
    }

    // fill in min and max temps on first load
    checkNetConn(true);
    // https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
    // need to pass parameters in an anonymous function
    setInterval(function(){checkNetConn(false)}, 1000*60*60);
    // setInterval(getMainWeather,1000*60*60); // original interval call
    setInterval(function(){
        console.log("checking if midnight");
        var date = new Date();
        // if (date.getHours() == 0 && date.getMinutes()==0){
        if (date.getHours() == 0){
            checkNetConn(true);
        }
    },1000*60*30); 
    // },1000*60*30); 
    // check if midnight every 30 minutes (need to improve this) 
    // 1000*60*60*30
}