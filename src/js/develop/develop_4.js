function mainSlider(){
    if( $('.goods-items').length ){
        $('.goods-items').each(function(index, el) {
            console.log('el ' , el);
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


$(document).ready(function(){
     mainSlider();
});

$(window).load(function(){

});

$(window).resize(function(){

});
