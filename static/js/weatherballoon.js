window.onload = function() {
    const owmkey = '1d51f32b7f1bdace2aa7b9a20cbabb66'; // You can get your own, free openweathermap api key at http://openeweathermap.org
    const cityID = document.getElementById("cityID").getAttribute("data_id");

    // Function to retrieve data from openweathermap and parse with jquery
    // Parameters: newDay = boolean to update the data accordingly with new mins and max. true or false.
    function getMainWeather(newDay) {
        const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&appid=' + owmkey + '&units=imperial';
        console.log(newDay ? "getting main weather, setting high and low" : "getting main weather only");

        $.getJSON(api_url, data => {
            const temp = Math.round(parseFloat(data.main.temp));
            const weatherID = data.weather[0].id;
            $('#tempmain').html(temp + '&deg;');
            // document.getElementById('tempmain').innerHTML = temp + '&deg;';
            getIconName(weatherID, isDayOrNight(data));
            if (newDay) {
                $('#tempmin').html(Math.round(data.main.temp_min) + '&deg;');
                $('#tempmax').html(Math.round(data.main.temp_max) + '&deg;');
                // document.getElementById('tempmin').innerHTML = Math.round(data.main.temp_min) + '&deg;';
                // document.getElementById('tempmax').innerHTML = Math.round(data.main.temp_max) + '&deg;';
            }
        });
    }

    // Function to retrieve the correct icon from the server
    function getIcon(icon) {
        $.ajax({
            url: "/static/icons/" + icon + ".svg",
            type: "GET",
            dataType: "html",
            success: function(data, status){
                $("#curr-weather-icon").html(data);
            },
            error: function(data, status){
                console.log("error");
                window.location.reload(); // reload the page if the icon is not found
            }
        });
    }

    // Function to retrieve the correct icon name from the server
    function getIconName(req_icon, req_icon_time){
        $.ajax({
            url: "/icon",
            type:"GET",
            data: {
                req_icon: req_icon,
                req_icon_time: req_icon_time
            },
            success: function(data, status){
                icon = data.icon;
                getIcon(icon);
            },
            error: function(data, status){
                console.log("error, no such icon found, default was not found either");
                window.location.reload();
            }
        })
    }
    // Function to determine whether it is day or night for the correct icon to show
    function isDayOrNight(data) {
        const currDate = new Date();
        const currTime = currDate.getTime();
        const sunriseTime = data.sys.sunrise * 1000;
        const sunsetTime = data.sys.sunset * 1000;
        return (currTime >= sunriseTime && currTime < sunsetTime) ? "day" : "night";
    }

    // Function to check internet connection by attempting to load an image
    function checkNetConn(newDay) {
        const i = new Image();
        i.onload = () => getMainWeather(newDay);
        i.onerror = () => console.error("No internet connection");
        i.src = 'https://www.google.com/images/nav_logo242.png?d=' + encodeURIComponent(Date());
    }

    checkNetConn(true); // Fill in min and max temps on first load
    setInterval(() => checkNetConn(false), 1000 * 60 * 60); // Set intervals to run the network check function every hour.
    setInterval(() => { // Check if midnight every 30 minutes (need to improve this)
        console.log("checking if midnight");
        const date = new Date();
        if (date.getHours() == 0) checkNetConn(true);
    }, 1000 * 60 * 30);
}