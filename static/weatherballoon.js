window.onload = function(){
    const owmkey = '1d51f32b7f1bdace2aa7b9a20cbabb66'; // You can get your own, free openweathermap api key at http://openeweathermap.org
    var cityID = document.getElementById("cityID").getAttribute( "data_id" );

    // function to retrieve data from openweathermap and parse with jquery
    // parameters
    // newDay = boolean to update the data accordingly with new mins and max. true or false.
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

    // function to determine whether it is day or night for the correct icon to show
    function isDayOrNight(data) { 
            currDate = new Date(),
            currTime = currDate.getTime(),
            sunriseTime = data.sys.sunrise * 1000,
            sunsetTime = data.sys.sunset * 1000;
        if (currTime >= sunriseTime && currTime < sunsetTime) {return "day";} 
        else {return "night"};
    }
    // null function to not update the weather data
    function noConn() {}

    // function to check internet connection by attempting to load an image
    function checkNetConn(newDay){
        var i = new Image();
        i.onload = getMainWeather(newDay);
        i.onerror = noConn;
        i.src = 'https://www.google.com/images/nav_logo242.png?d=' + escape(Date());
    }

    // fill in min and max temps on first load
    checkNetConn(true);
    // sets intervals to run the network check function every hour.
    setInterval(function(){checkNetConn(false)}, 1000*60*60);
    setInterval(function(){
        console.log("checking if midnight");
        var date = new Date();
        if (date.getHours() == 0){
            checkNetConn(true);
        }
    },1000*60*30); 
    // check if midnight every 30 minutes (need to improve this) 
}
// https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
// https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=1d51f32b7f1bdace2aa7b9a20cbabb66&units=imperial
