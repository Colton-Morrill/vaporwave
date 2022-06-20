$( ".img-cont" ).click(function() {
    var imgElement = $(this).find("img").first();
        if (imgElement.length){
        var fullPath = imgElement.attr('src');
        console.log(fullPath);
    }
    $('.lightbox').find('img').attr('src', fullPath);
    $('.lightbox').removeClass('d-none');
});
$( ".lightbox-close" ).click(function() {
    $('.lightbox').addClass('d-none');
});

$( ".mobile-option.personal" ).click(function() {
    $('.popup3').removeClass('d-none');
});
$( ".mobile-option.work" ).click(function() {
    $('.popup').removeClass('d-none');
});
$( ".mobile-option.about" ).click(function() {
    $('.popup2').removeClass('d-none');
});