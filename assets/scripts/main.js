document.addEventListener('DOMContentLoaded', function() {
    $(document).ready(function(){
        //<menu>

        //declara controlador de scroll da navegacao do menu
        var navigation_scroll_controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onCenter",
            }
        });
        
        navigation_scroll_controller.scrollTo(function (new_position, callback) {
            TweenMax.to(window, 1, { scrollTo: { y: new_position, ease: Expo.easeInOut, onComplete: callback } });
        });

        function urlChange(href) {
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, href);
            }
        }

        /*function breadcrumbChange(href) {
            $(".runners-ins--menu a:not([href='" + href + "'])").removeClass("active");
            $(".runners-ins--menu a[href='" + href + "']").addClass("active");
        }*/

        $(document).on("click", ".top .menu a, [data-scroll]", function (e) {
            var href = $(this).attr("href");

            e.preventDefault();

            if ( typeof( $(this).attr("data-scroll") ) == "undefined" ) {
                /*breadcrumbChange(href);*/
                urlChange(href);
            }

            $('.menu').trigger("click");

            navigation_scroll_controller.scrollTo(href);
        });
        //</menu>


        //<boost-talks-2>

        //define a boost talk aberta inicialmente como a atual
        var dynamic_current_boost_talk = 0;

        //reconhece cada link da navegação boost talks
        $.each($("a.dynamic-link[id^='boost_talks_link_'"), function(i){
            i++;
            //reconhece objetos relacionados à navegação boost talks
            var dynamic_boost_talks_content_0 = $(".boost-talks-2 .dynamic-content#boost_talks_content_0");
            var dynamic_link = $(this);
            var dynamic_content = $(".boost-talks-2 .dynamic-content#boost_talks_content_"+i);
            href = dynamic_link.attr("href");

            //clique em um link do menu de boost talks
            dynamic_link.click(function(e){
                $(".boost-talks-2 .dynamic-link").removeClass("active");
                e.preventDefault();
                e.stopPropagation();
                navigation_scroll_controller.scrollTo(href);


                // caso clique no tema que já está aberto
                if(dynamic_current_boost_talk == i){
                    TweenMax.to(dynamic_boost_talks_content_0, .4, {
                        className:"dynamic-content active",
                        onComplete: function(){
                            dynamic_current_boost_talk = 0;
                            dynamic_link.removeClass("active");
                        }
                    });
                    TweenMax.to(dynamic_content, .4, {
                        className:"dynamic-content backwards",
                        onComplete:function(){
                            dynamic_content.removeClass("backwards");
                        }
                    });
                //caso contrário
                }else{
                    TweenMax.to($(".boost-talks-2 .dynamic-content:not(#boost_talks_content_"+i+")"), .4, {
                        className:"dynamic-content inactive",
                        onComplete:function(){
                            dynamic_link.addClass("active");
                            $(".boost-talks-2 .dynamic-content:not(#boost_talks_content_"+i+"):not(#boost_talks_content_0)").removeClass("inactive");
                        }
                    });
                    TweenMax.to(dynamic_content, .4, {
                        className:"dynamic-content active",
                        onComplete:function(){
                            dynamic_current_boost_talk = i;
                        }
                    });
                }
            });
        });
        //</boost-talks-2>


        //<cadastro>

            //campo sexo

            /*var $field_sexo = $('#field_sexo');
            var $field_sexo_outro = $('#field_sexo_outro');

            $field_sexo.bind('change', function(){
                $this = $(this);
                if($this.val() == 'outro'){
                    $field_sexo.addClass('none').removeAttr('required');
                    $field_sexo_outro.removeClass('none').attr('required', 'required');
                }
            });*/

            //******

            //campo evento

            //reconhece objetos relacionados à escolha do evento
            var $field_evento = $('input[name=field_evento]');
            var $label_for_field_evento = $('label[for^=field_evento]');

            //aciona função ao mudar input radio do form
            $field_evento.bind('change', function(){
                $this = $(this);
                escolheEvento($this,'id');
            });

            // escolha do evento vindo de fora do form
            $('a[data-for^=field_evento]').click(function(){
                $this = $(this);
                escolheEvento($this,'data-for');
            });

            //função de retorno mostrando o campo dropbox do evento
            function escolheEvento(obj,attr){
                $this = obj;
                val = $this.attr(attr).replace('field_evento_','');

                $('.field-main').addClass('none');
                $label_for_field_evento.addClass('none');
                $('[data-evento-select='+val+']:not(a)').removeClass('none');

                //caso exista escolha pré-definida de data no link, cria a var
                evento_select = $this.attr('data-evento-select') || false;

                //define a data da var no campo do form
                if(evento_select){
                    $('select[data-evento-select='+val+']').attr('required','required').find('option[value='+evento_select+']').attr('selected', 'selected');
                }
            }

        //</cadastro>
    });
});