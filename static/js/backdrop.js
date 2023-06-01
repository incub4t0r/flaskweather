// const default_backdrop = "#1f1f1f";
const default_backdrop = "#000000";

$(window).on('load', function() {
    $('html').addClass('hidden');
    if (localStorage.getItem("backdrop_url") === null) {
        // reset_backdrop();
        set_backdrop_black();
    } 
    else {
        var backdrop = $('body');
        if (localStorage.getItem("backdrop_url") === default_backdrop) {
            backdrop.css({'background-color':default_backdrop});
        }
        else {
            const backdrop_val = localStorage.getItem("backdrop_url");
            if (backdrop_val.length == 6) {
                backdrop.css({'background-color': `#${backdrop_val}`});
            }
            else {
                backdrop.css({'background':"url(" + backdrop_val + ") no-repeat center center fixed", "background-size":"cover"});
            }
            // backdrop.css({'background':"url(" + localStorage.getItem("backdrop_url") + ") no-repeat center center fixed", "background-size":"cover"});
        }
    }

    $(document).ready(function() {  
        $('html').removeClass('hidden');  // EDIT: Can also use $('html').removeClass('hidden'); 
    });
    $('#fileInput').on('change', function selectedFileChanged() {
        if (this.files.length === 0) {
            console.log('No file selected.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function fileReadCompleted() {
            var body = $('body');
            body.css({'background':"url(" + reader.result + ") no-repeat center center fixed", "background-size":"cover"});
            localStorage.setItem("backdrop_url", reader.result);
        };
        reader.readAsDataURL(this.files[0]);
    });
});

function set_backdrop() {
    event.preventDefault();
    var backdrop = $("#custom_backdrop").val();
    var body = $('body');
    if (backdrop.length == 6) {
        body.css({'background-color': `#${backdrop}`});
        console.log("Backdrop value is a hex code, setting background-color: " + backdrop);
        localStorage.setItem("backdrop_url", backdrop);
    }
    else {
        body.css({'background':"url(" + backdrop + ") no-repeat center center fixed", "background-size":"cover"});
        console.log("url(" + backdrop + ")");
        localStorage.setItem("backdrop_url", backdrop);
    }
    $("#custom_backdrop").val('');
}

function set_backdrop_black() {
    try {
        // swal_confirm();
        var backdrop = $('body');
        backdrop.css({'background-color':default_backdrop});
        localStorage.setItem("backdrop_url",default_backdrop);
    }
    catch (error) {
        console.log("error: " + error);
    }
}

function reset_backdrop(){
    try {
        localStorage.setItem("backdrop_url", "../static/img/blob-scene-haikei-sunset.svg");
        var backdrop = $('body');
        backdrop.css({'background':"url(../static/img/blob-scene-haikei-sunset.svg) no-repeat center center fixed", "background-size":"cover"});
    } 
    catch (error) {
        console.log("error: " + error);
    }
}

function swal_reset_backdrop() {
    event.preventDefault();
    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            set_backdrop_black();
            // reset_backdrop();
            swal("Poof! Your backdrop has been reset.", {
                icon: "success",
            });
        } else {
            swal("Your backdrop is safe!");
        }
    });
}