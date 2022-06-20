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