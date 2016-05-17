function mainSlider(){
    if( $('.goods-items').length ){
        $('.goods-items').each(function(index, el) {
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
    if( $('.brends-wrap').length ){
        $('.brends-wrap').slick({
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


$(document).ready(function(){
     mainSlider();
     sliderBends();
});

$(window).load(function(){

});

$(window).resize(function(){

});
