window.onload = function(){
    const owmkey = '1d51f32b7f1bdace2aa7b9a20cbabb66'; // You can get your own, free openweathermap api key at http://openeweathermap.org
    const geocodekey ='AIzaSyDehmKEAjLxQgYbX7pY9_3rQSCvktvHg6M'; // You can get your own, free Google Maps api https://console.cloud.google.com
    var cityID = document.getElementById("cityID").getAttribute( "data_id" );

    function getMainWeather(){
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

    function isDayOrNight(d) {
            currDate = new Date(),
            currTime = currDate.getTime(),
            sunriseTime = d.sys.sunrise * 1000,
            sunsetTime = d.sys.sunset * 1000;
        if (currTime >= sunriseTime && currTime < sunsetTime) {
            return "day";
        } 
        else 
            return "night";
    }
    getMainWeather();
    setInterval(getMainWeather(),1000*60*60);

    function getHighLow(){
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + cityID + '&key=' + geocodekey, function(data){
            const latitude = data.results[0].geometry.location.lat;
            const longitude = data.results[0].geometry.location.lng;
            $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+ longitude +'&exclude={alerts,minutely,hourly}&appid='+ owmkey + '&units=imperial', function(data){
                var tempmin = Math.round(data.daily[0].temp.min) + '&deg;';
                var tempmax = Math.round(data.daily[0].temp.max) + '&deg;';
                document.getElementById('tempmin').innerHTML = tempmin;
                document.getElementById('tempmax').innerHTML = tempmax;
            }); 
        });
    }

    getHighLow();
    setInterval(function(){
        var date = new Date();
        if (date.getHours() == 0 && date.getMinutes()==0){
            getHighLow();
        }
    },1000*60*60*30); // check if midnight every 30 minutes (need to improve this)
}
