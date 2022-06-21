
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


$( ".info" ).click(function() {
    var selectInfo = $(this).attr('class').split(' ')[1];
    $('.extra-info .title-bar-text').append(selectInfo + " images")
    var tackify = "<div class='graphic-cont'> <div class='img-cont'> <img src='assets/images/tackify/dashboard.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackify/task-list.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackify/time.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackify/task-info.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackify/project-list.png' alt='Illustration of a barista'/> </div></div>";
    var tackui = "<div class='graphic-cont'> <div class='img-cont'> <img src='assets/images/tackui/landing.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackui/components.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/tackui/colors.png' alt='Illustration of a barista'/> </div></div>";
    var docs = "<div class='graphic-cont'> <div class='img-cont'> <img src='assets/images/docs/home.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/docs/edit.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/docs/index.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/docs/search.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/docs/settings.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/docs/workflow.png' alt='Illustration of a barista'/> </div></div>";
    var outlook = "<div class='graphic-cont'> <div class='img-cont'> <img src='assets/images/outlook/outlook-home.png' alt='Illustration of a barista'/> </div></div>";
    var robal = "<div class='graphic-cont robal'> <div class='img-cont'> <img src='assets/images/robal/Landing Screen.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/robal/My Jobs Upcoming.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/robal/Job Details.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/robal/Company Profile.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/robal/Settings Flyout.png' alt='Illustration of a barista'/> </div><div class='img-cont'> <img src='assets/images/robal/Wallet Debit-Credit Card.png' alt='Illustration of a barista'/> </div></div>";
    switch (selectInfo) {
        case 'tackify':
          $('.extra-info').removeClass('d-none');
          $('.extra-info .card-body').append(tackify);
          $( ".img-cont" ).click(function() {
            var imgElement = $(this).find("img").first();
                if (imgElement.length){
                var fullPath = imgElement.attr('src');
            }
            $('.lightbox').find('img').attr('src', fullPath);
            $('.lightbox').removeClass('d-none');
        });
          break;
        case "robal":
            $('.extra-info').removeClass('d-none');
            $('.extra-info .card-body').append(robal);
            $( ".img-cont" ).click(function() {
              var imgElement = $(this).find("img").first();
                  if (imgElement.length){
                  var fullPath = imgElement.attr('src');
              }
              $('.lightbox').find('img').attr('src', fullPath);
              $('.lightbox').removeClass('d-none');
          });
          break;
        case "tackui":
            $('.extra-info').removeClass('d-none');
            $('.extra-info .card-body').append(tackui);
            $( ".img-cont" ).click(function() {
              var imgElement = $(this).find("img").first();
                  if (imgElement.length){
                  var fullPath = imgElement.attr('src');
              }
              $('.lightbox').find('img').attr('src', fullPath);
              $('.lightbox').removeClass('d-none');
          });
          break;
        case "docs":
            $('.extra-info').removeClass('d-none');
            $('.extra-info .card-body').append(docs);
            $( ".img-cont" ).click(function() {
              var imgElement = $(this).find("img").first();
                  if (imgElement.length){
                  var fullPath = imgElement.attr('src');
              }
              $('.lightbox').find('img').attr('src', fullPath);
              $('.lightbox').removeClass('d-none');
          });
          break;
        case "outlook":
            $('.extra-info').removeClass('d-none');
            $('.extra-info .card-body').append(outlook);
            $( ".img-cont" ).click(function() {
              var imgElement = $(this).find("img").first();
                  if (imgElement.length){
                  var fullPath = imgElement.attr('src');
              }
              $('.lightbox').find('img').attr('src', fullPath);
              $('.lightbox').removeClass('d-none');
          });
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
});
$( ".info-close" ).click(function() {
    $('.extra-info').addClass('d-none');
    $('.extra-info .card-body').empty();
    $('.extra-info .title-bar-text').empty();
});

$( ".img-cont" ).click(function() {
    var imgElement = $(this).find("img").first();
        if (imgElement.length){
        var fullPath = imgElement.attr('src');
    }
    $('.lightbox').find('img').attr('src', fullPath);
    $('.lightbox').removeClass('d-none');
});
