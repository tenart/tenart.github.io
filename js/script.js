$(function () {

    var mainWidth;
    var currentCubeRotation = "translateZ(-250px) rotateY(0deg)";

    $("#settings").click(function () {
        $(this).toggleClass("active");
        $("#sidebar").toggleClass("active");
    })

    $("#spin_check").click(function () {
        $("#cube_group").toggleClass("spin");
    })

    $("nav button").click(function () {
        var number = $(this).attr("data-number");
        var faceID = "#cube_" + number;
        $(".face").removeClass("active");
        $(faceID).addClass("active");
    })

    $("#face_1").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateY(0deg)";
    })

    $("#face_2").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateY(-90deg) rotateX(180deg)";
    })

    $("#face_3").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateY(180deg) rotateZ(90deg)";
    })

    $("#face_4").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateY(90deg) rotateX(90deg)";
    })

    $("#face_5").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateX(90deg) rotateZ(180deg) rotateY(180deg)";
    })

    $("#face_6").click(function () {
        currentCubeRotation = "translateZ(-250px) rotateX(90deg) rotateY(90deg)";
    })

    $("figure").mouseenter(function () {
        var index = parseInt($(this).index());
        
        if (mainWidth >= 550) {
            $("#schools_long_container").css("margin-left", (index * -1 * (500 - 40)));
            $("#pinion").css("margin-left", ((index * 150) + (75 - 8) + (index * 5)));
        } else {
            $("#schools_long_container").css("margin-left", (index * -1 * (mainWidth - 40)));
            $("#pinion").css("margin-left", (index * Math.floor((mainWidth - 50) / 3) + ((mainWidth - 50) / 6)) + ( index * 5 ) - 8 );
        }

    })

    $("#arrange").click(function () {
        arrange();
    })

    $(".interests_thumb img").click(function () {
        $(this).parent().addClass("grow");
        $(this).parent().css("transform", "none");
    })

    $(".close_int").click(function () {
        $(this).parents(".interests_thumb").removeClass("grow");

        $(this).parents(".contact_window").fadeOut(200);
        $("#contact_wrap").removeClass("blur");

        arrange();
    })

    $(".jobs_button").click(function () {
        $(this).parents(".jobs_content").toggleClass("active");
        $(this).children(".less").toggle();
        $(this).children(".more").toggle();
    })

    $(".contact_thumb").mouseenter(function () {
        if (!$(this).hasClass("contact_icon")) {
            $("#lcd_front").append($(this).attr("data-pad"));
        } else {
            $("#lcd_front").text($(this).attr("data-pad"));
        }

    })

    $(".contact_open").click(function () {
        var window = "#" + $(this).attr("data-pad");
        $(".contact_window").hide();
        $(window).fadeIn(200);
        $("#contact_wrap").addClass("blur");
    })

    arrange();

    function arrange() {
        var num = parseInt($("#int_circle").children().length);
        var ang = 360 / num;

        for (i = 0; i < num; i++) {
            var transform = "rotate(" + (ang * i) + "deg) translateY(-110px) rotate(" + (ang * -i) + "deg)";
            $(".interests_thumb:nth-child(" + (i + 1) + ")").css("transform", transform);
        }
    }

    function update() {
        mainWidth = parseInt($("body").width());
        if( mainWidth < 550 ) {
            $("#cube_group").css("transform", "none");
        } else {
            $("#cube_group").css("transform", currentCubeRotation);
        }
    }

    setInterval(update, 100);

})