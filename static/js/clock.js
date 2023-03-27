var interval = 1000; // ms
var expected = Date.now() + interval;
var day, monthyear, time;
setTimeout(step, interval);
function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) { // something really bad happened. Maybe the browser (tab) was inactive?
        console.log("Reloading page, drift is too high");
        window.location.reload();
    }
    fulldate = dayjs(); // set day, monthyear, and time from dayjs
    day = fulldate.format('dddd');
    monthyear = fulldate.format('MMM. D');
    time = fulldate.format('h:mm');
    document.getElementById("day").innerHTML = day;
    document.getElementById("monthyear").innerHTML = monthyear;
    document.getElementById("time").innerHTML = time;

    expected += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}

// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
