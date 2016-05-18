function mainSlider(){
    if( $('.goods-items width-slider').length ){
        $('.goods-items width-slider').each(function(index, el) {
            $(window).resize(function(event) {
                setTimeout(function(){
                    if( !$(el).hasClass('slick-slider') && $(window).width() <= 666){
                      sliker();
                    }else if( $(el).hasClass('slick-slider') ){
                      $(el).slick("unslick");
                    }
                },500)

            });
              function sliker(){
                $(el).slick({
                  infinite: true,
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  swipeToSlide:true,
                  adaptiveHeight:true,
                  arrows: true,
                  draggable:true,
                  focusOnSelect:false,
                  prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
                  nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
                  responsive: [
                      {
                        breakpoint: 478,
                        settings: {
                          slidesToShow: 1
                        }
                      }
                    ]
                });
              }
              if( $(window).width() <= 666){
                sliker();
              }
        });
    }
}

function sliderBends(){
    if( $('.brends-slider-wrap').length ){
        $('.brends-slider-wrap').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          swipeToSlide:true,
          adaptiveHeight:true,
          arrows: true,
          draggable:true,
          focusOnSelect:false,
          prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
          nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
          responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 478,
                settings: {
                  slidesToShow: 1
                }
              },
              {
                breakpoint: 666,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 1
                }
              }

            ]
        });
    }

}
function ratingScript(){
    $(document).on('mouseenter', '.rating label', function(){
        var parent=$(this).parent();
        parent.find('.form-input').removeClass('hovered');
        var index=$(this).index();
        for(var i=0;i<=index;i++){
            parent.find('label').eq(i).find('.form-input').addClass('hovered');
        }
    });
    $(document).on('mouseleave', '.rating:not(.static) label', function(){
        var parent=$(this).parent();
        parent.find('.form-input').removeClass('hovered');
    });

    $(document).on('change','.rating input', function(){
        var parent=$(this).parents('.rating');
        parent.find('.form-input').removeClass('active');
        var index=$(this).parents('label').index();

        for(var i=0;i<=index;i++){
            parent.find('label').eq(i).find('.form-input').addClass('active');
        }

        $.ajax({
          url: footerStarRating,
          type: 'POST',
          data: parseFloat(index+1)
        })
        .done(function(data) {
          console.log("rating "+ parseFloat(index+1) );
        });
    });
}

function showMoreCatalog(){
  $(document).on('click', '.catalog-goods .show-more-wrap', function(event) {
    event.preventDefault();
    var button = $(this).parent();
    var id = button.data('id');

    $.ajax({
      url: showMoreCat,
      type: 'POST',
      data: id
    })
    .done(function(data) {
      button.remove();
      $('.catalog-goods .goods-items').append(data);
    })
    .fail(function() {
      console.log("error");
      alert('Ошибка загрузки');
    });

  });
}

$(document).ready(function(){
  showMoreCatalog();
  mainSlider();
  sliderBends();
  ratingScript();
});

$(window).load(function(){

});

$(window).resize(function(){

});
