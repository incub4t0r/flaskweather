const key = '1d51f32b7f1bdace2aa7b9a20cbabb66';
if(key=='') document.getElementById('temp').innerHTML = ('Remember to add your api key!');

function weatherBalloon( cityID ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key+"&units=imperial")  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		parseWeather(data);
	})
	.catch(function() {
		// catch any errors
	});
}

function isDayOrNight(d) {
    var currDate = new Date(),
        currTime = currDate.getTime(),
        sunriseTime = d.sys.sunrise * 1000,	// owm states time is unix, that is measured in s rather than ms
        sunsetTime = d.sys.sunset * 1000;
    if (currTime >= sunriseTime && currTime < sunsetTime) {
        return "day";
    } 
    else 
        return "night";
}

function parseWeather( d ) {
    var temp = Math.round(parseFloat(d.main.temp));
    var tempmin = Math.round(d.main.temp_min) + '&deg;';
    var tempmax = Math.round(d.main.temp_max) + '&deg;';
    var weatherID = d.weather[0].id;
    var weatherIcon = document.getElementById("curr-weather-icon")

    document.getElementById('tempmain').innerHTML = temp + '&deg;';
    document.getElementById('tempmin').innerHTML = tempmin;
    document.getElementById('tempmax').innerHTML = tempmax;
    weatherIcon.setAttribute("class","wi wi-owm-" + isDayOrNight(d)+"-"+weatherID+"");
}

function updateHighLow(){
    // future function to update the high low only once per day
}

weatherBalloon( 5004062 );
setInterval(weatherBalloon,1000*60*60);
