/**
 * Listen to scroll to change header opacity class
 */
function checkScroll(){
    var startY = $('.navbar').height() * 1.5; //The point where the navbar changes in px

    if($(window).scrollTop() > startY){
        $('.navbar').addClass("scrolled");
        $('.navbar').addClass("bg-dark");
    }
    else{
        $('.navbar').removeClass("scrolled");
        $('.navbar').removeClass("bg-dark");
    }
}

function adjustAboutBio() {
    //Adjust about paragraph classes based on window width
    if (window.innerWidth < 840) {
        $('#about-bio').removeClass("col-8");
        $('#about-bio').addClass("col");
    }
    else {
        $('#about-bio').addClass("col-8");
        $('#about-bio').removeClass("col");
    }
}

// Add active class if in that section of website
function addActive() {
    $('body').scrollspy({
        target: '#navigationBar'
    });
}

if($('.navbar').length > 0){
    $(window).on("scroll load resize", function(){
        if (window.innerWidth > 840) {
            checkScroll();
        }
        adjustAboutBio();
        addActive();
    });
}

$('.sendEmail').click(function (event) {
    var email = 'cole.t.harr@gmail.com'
    var subject = $('#ContactSubject').val()
    var emailBody = $('#ContactMessage').val().replace(/\n/g, "%0D%0A")
    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody
});



