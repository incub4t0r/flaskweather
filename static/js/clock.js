var tday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var tmonth = ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
function clock(){
    var d = new Date();
    var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate();
    var nhour=d.getHours(),nmin=d.getMinutes(), ap;

    if(nhour == 0){ap = " AM";nhour = 12;}
    else if(nhour < 12){ap = " AM";}
    else if(nhour == 12){ap = " PM";}
    else if(nhour > 12){ap = " PM";nhour -= 12;}

    if(nmin<=9){nmin = "0"+nmin};

    var timetext = ""+nhour+":"+nmin+"";
    var datetext = ""+tmonth[nmonth]+" "+ndate+"";
    var daytext = ""+tday[nday]+"";

    document.getElementById('timebox').innerHTML = timetext;
    document.getElementById('daybox').innerHTML=daytext;
    document.getElementById('datebox').innerHTML=datetext;
}
clock();
setInterval(clock,1000);
