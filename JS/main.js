jQuery(document).ready(function ($) {
    // CHAT
    document.addEventListener("chatlio.ready", function (e) {
        if (_chatlio.isOnline()) {
            $("#chat-trigger").on("click", function (e) {
                e.preventDefault();
                _chatlio.showOrHide();
            });
            $("#chat-trigger").attr("title", "Online, Chat Now!");
            $("#chat-trigger span").text("Let's Chat");
            $("#online-dot").addClass("online");
        } else {
            $("#chat-trigger").attr("title", "Offline. Leave a Message!");
        }
    });
    // Scroll effects header
    var header = $("#header");
    callButton = $("#call-button");
    $(window).scroll(function () {
        check();
    });
    check();
    function check() {
        var st = $(window).scrollTop();
        if (st > 0) {
            if (!$(header).hasClass("st")) {
                $(header).addClass("st");
                $(header).removeClass("sth");
                $(callButton).removeClass("wobblez");
            }
        } else {
            if ($(header).hasClass("st")) {
                $(header).removeClass("st");
                $(header).addClass("sth");
                $(callButton).addClass("wobblez");
            }
            setTimeout(function () {
                $(header).removeClass("sth");
            }, 250);
            setTimeout(function () {
                $(callButton).removeClass("wobblez");
            }, 750);
        }
    }

    // HEADER SCROLL EFFECTS
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 0;

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);

    function hasScrolled() {
        var st = $(this).scrollTop();
        var delta = 1;

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $("header").removeClass("scroll-up").addClass("scroll-down");
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $("header").removeClass("scroll-down").addClass("scroll-up");
            }
        }
        if ((didScroll = false)) {
            $("header").removeClass("scroll-down").addClass("scroll-up trans");
        } else {
            $("header").removeClass("trans");
        }
        lastScrollTop = st;
    }

    $("#menu-toggle").click(function (event) {
        event.preventDefault();
        $(this).toggleClass("open");

        var fullScreenNav = $("#fullScreenNav");
        var navbar = $("#header");

        fullScreenNav.toggleClass("overlay-active");

        $("body").toggleClass("overflowHidden");

        if (fullScreenNav.hasClass("overlay-active")) {
            navbar.addClass("menu-open");
            // $('body').addClass('overflow-hidden');
            fullScreenNav.removeClass("closed");
        } else {
            // Hide the particle animation before we start the nav's "closing" transition to
            // keep things smooth on older devices.
            document.querySelector("#particle-animation-nav").classList.add("d-none");
            //navbar.removeClass('menu-open');
            // $('body').removeClass('overflow-hidden');
            fullScreenNav.addClass("closed");
        }
    });

    window.fyresite_full_nav_open = false;

    // Add transitionend listener to the fullscreen nav element so we
    // can trigger animations after the transition animation is completed
    document.querySelector("#fullScreenNav").addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("overlay-active")) {
            if (!window.fyresite_full_nav_open) {
                window.fyresite_full_nav_open = true;

                // Start animation here
                // Show the particle animation after the nav's "opening" transition is finished to
                // keep things smooth on older devices.
                document.querySelector("#particle-animation-nav").classList.remove("d-none");
            }
        } else {
            window.fyresite_full_nav_open = false;
        }
    });
});
