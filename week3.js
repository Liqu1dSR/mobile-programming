$(document).ready(function () {
    const $navLinks = $("#navLinks");
    const $hamburger = $("#hamburgerBtn");
    const $closeBtn = $("#closeBtn");
    
    $hamburger.click(function () {
        $navLinks.toggleClass("active");
    });
    

    $closeBtn.click(function () {
        $navLinks.removeClass("active");
    });
    
    // Close menu when clicking on any nav link
    $navLinks.find("a").click(function () {
        if ($(window).width() <= 700) {
            $navLinks.removeClass("active");
        }
    });
    
    // Close menu when clicking outside of it
    $(document).click(function (event) {
        if ($(window).width() <= 700) {
            // Check if click is outside menu and hamburger button
            if (!$(event.target).closest('.nav-links').length && 
                !$(event.target).closest('.hamburger').length) {
                $navLinks.removeClass("active");
            }
        }
    });
    
    // on resize ensure proper layout:
    function onResize() {
        if ($(window).width() > 700) {
            // show and ensure horizontal layout
            $navLinks.show();
            $navLinks.removeClass("active");
            $navLinks.css({
                "display": "flex",
                "flex-direction": "",
                "position": "",
                "top": "",
                "right": ""
            });
        } else {
            // smaller screens: show but positioned off-screen
            $navLinks.show();
            $navLinks.css({
                "display": "flex",
                "flex-direction": "column"
            });
        }
    }
    
    // run once on load and on resize
    onResize();
    $(window).on("resize", function () {
        onResize();
    });
    
    // ---------- Image animation (runs once per click) ----------
    const imgA = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500";
    const imgB = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500";
    let toggleImage = false;
    let animating = false;
    
    $("#animateBtn").click(function () {
        if (animating) return;
        animating = true;
        $("#animateBtn").prop("disabled", true);
        const $photo = $("#photo");
        
        $photo.css({
            left: $photo.css("left") || "0px",
            width: $photo.width() + "px",
            height: $photo.height() + "px",
            opacity: 1
        });
        
        $photo
            .animate({ left: "+=200px" }, 1500)
            .animate({ width: "400px", height: "400px" }, 1500)
            .queue(function (next) {
                if (!toggleImage) {
                    $photo.attr("src", imgB);
                } else {
                    $photo.attr("src", imgA);
                }
                toggleImage = !toggleImage;
                next();
            })
            .animate({ opacity: 0.3, width: "150px", height: "150px" }, 1500)
            .animate({
                left: "0px",
                width: "250px",
                height: "250px",
                opacity: 1
            }, 1500, function () {
                animating = false;
                $("#animateBtn").prop("disabled", false);
            });
    });
});