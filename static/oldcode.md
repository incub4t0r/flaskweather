```js
// function to get the temperature min and max per day
// DISABLED, GOOGLE GEOCODER API IS NO LONGER FREE
function getHighLow(){
    console.log("getting high and low")
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
```