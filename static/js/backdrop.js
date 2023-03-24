$(window).on('load', function() {
    $('html').addClass('hidden');
    if (localStorage.getItem("backdrop_url") === null) {
        reset_backdrop();
    } else {
        var backdrop = $('body');
        backdrop.css({'background':"url(" + localStorage.getItem("backdrop_url") + ") no-repeat center center fixed", "background-size":"cover"});
    }
    $(document).ready(function() {  
        $('html').removeClass('hidden');  // EDIT: Can also use $('html').removeClass('hidden'); 

    });
});

function set_backdrop() {
    event.preventDefault();
    var backdrop = $("#custom_backdrop").val()
    var body = $('body');
    body.css({'background':"url(" + backdrop + ") no-repeat center center fixed", "background-size":"cover"});
    console.log("url(" + backdrop + ")");
    localStorage.setItem("backdrop_url", backdrop);
    $("#custom_backdrop").val('');
}

function reset_backdrop(){
    try {
        localStorage.setItem("backdrop_url", "../static/img/blob-scene-haikei-sunset.svg");
        var backdrop = $('body');
        backdrop.css({'background':"url(../static/img/blob-scene-haikei-sunset.svg) no-repeat center center fixed", "background-size":"cover"});
    } catch (error) {
        console.log("error: " + error);
    }
}

function swal_confirm() {
    event.preventDefault();
    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            reset_backdrop();
            swal("Poof! Your backdrop has been reset.", {
                icon: "success",
            });
        } else {
            swal("Your backdrop is safe!");
        }
    });
}