jQuery(document).ready(function ($) {
    // SERVICE SLICK SLIDER
    $("#service-list").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
        adaptiveHeight: false,
        variableWidth: true,
        arrows: true,
        focusOnSelect: true,
        asNavFor: "#service-focus",
    });

    $("#service-focus").slick({
        infinite: true,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true,
        fade: true,
        slidesToScroll: 1,
        centerMode: true,
        asNavFor: "#service-list",
    });

    var select = $("#service-select");
    $(select).change(function () {
        goTo = select.val();
        // console.log( goTo );
        $("#service-focus").slick("goTo", goTo - 1);
        $("#service-list").slick("goTo", goTo - 1);
    });

    $(".slick-current .service-bg-shape, .slick-current .service-type-img").addClass("fadeInRight");
    $(".slick-current .new-service-summary").addClass("slideInRight");
    $(".slick-current .new-service-summary *").addClass("fadeInRight");

    $("#service-focus").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        $("#service-select").val(nextSlide + 1);
        // console.log(nextSlide);

        $("service-info.slick-slide img").each(function () {
            $(this).removeClass("fadeInRight");
        });
        $("div[data-slick-index=" + nextSlide + "] img").addClass("fadeInRight");

        $("service-info.slick-slide .new-service-summary").removeClass("slideInRight");
        $("div[data-slick-index=" + nextSlide + "] .new-service-summary").addClass("slideInRight");

        $("service-info.slick-slide .new-service-summary *").removeClass("fadeInRight");
        $("div[data-slick-index=" + nextSlide + "] .new-service-summary *").addClass("fadeInRight");
    });
});
