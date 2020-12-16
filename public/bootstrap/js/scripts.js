(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });

    $('#send-mail').click(function() {
        $('#alertModal > div > div > div > h2').html('Sending');
        $('#alertModal > div > div > div > p').html('Please wait...');
        var company = $('input[name="company"]').val();
        var email = $('input[name="email"]').val();
        var phone = $('input[name="phone"]').val();
        var text = $('textarea[name="text"]').val();
        if(text.length < 5 || (phone.length < 1 || email.length < 1)) {
            $('#alertModal > div > div > div > h2').html('Error');
            $('#alertModal > div > div > div > p').html('Please fill in the entire form');
        } else {
            var obj = {
                company: company,
                email: email,
                phone: phone,
                text: text
            };
            
            $.post('/mail', obj, function() {
                $('#alertModal > div > div > div > h2').html('Message Sent');
                $('#alertModal > div > div > div > p').html('Thank you for your inquiry, we\'ll get back to you as soon as possible');

                $('input[name="company"]').val('');
                $('input[name="email"]').val('');
                $('input[name="phone"]').val('');
                $('textarea[name="text"]').val('');
            });
            
        }

    });

})(jQuery);