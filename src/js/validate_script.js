/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form-input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form-row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form-row').is('.error')){
                    $(element).closest('.form-row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : rewiev_Pop,
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}


function popNext(popupId, popupWrap){

    $.fancybox.open(popupId,{
        padding:0,
        fitToView:false,
        wrapCSS:popupWrap,
        autoSize:true,
        'closeBtn' : false,
        afterClose: function(){
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;

    timer = setTimeout(function(){
        $('form').trigger("reset");
        $.fancybox.close(popupId);
    },2000);

}


/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}

/*fansybox на форме*/
function fancyboxForm(){
  $('.fancybox-form').fancybox({
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    padding:'0',
    fitToView:true,
    autoSize:true,
  });
}



$(document).ready(function(){

   validate('#rewievPopup form', {submitFunction:validationCall});

   validate('.login-form-enter');
   validate('.login-form-enter-mobile');
   validate('.search-form');
   validate('.comment form');

   Maskedinput();
   fancyboxForm();

});