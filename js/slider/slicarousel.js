(function($){
    
    $.fn.my_slider=function(options){
        
        let default_options = {
            "nbr_slides" : 5,               // The number of slides 
            "class_name_prefix" : "s_",     // Avoid CSS classes mixed up
            "arrows" : true,                // Enable the arrows navigation 
            "dot_nav": true,                // Enable the dots navigation
            "full_width": true              // width: 100%
        }

        let params = $.extend(default_options, options);
        
        this.append("<div class='" + params.class_name_prefix + "slider_container'></div>")
        $(this.children()[0]).css({
            "width": ((params.nbr_slides+1)*100) + "%"
        })

        let i = 0
        while(i < params.nbr_slides){
            $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_"+ i +"'></div>")
            i++
        }
        $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_0'></div>")

        $("." + params.class_name_prefix + "slide").css({
            "width": (100/(params.nbr_slides+1))+"%"
        })

        let current_slide = 0           // the slide number where the mouse is in 
        let mousedown_position = 0      // the silde number where the mouse starts grabbing 
        let mouseup_position = 0        // the slide number where the mouse finished grabbing
        let direction = true            // false: from the left to the right // true: means from the right to the left
        let parent_offset_left = 0

        $(this.children()[0]).mousedown((e)=>{
            is_down = true

            parent_offset_left = $(this).offset().left            
            mousedown_position = e.pageX - parent_offset_left
        }).mouseup((e)=>{
            is_down = false

            parent_offset_left = $(this).offset().left            
            mouseup_position = e.pageX - parent_offset_left

            if((mouseup_position - mousedown_position) >  0){

                if((mouseup_position - mousedown_position) > 30) // test if the user really wants to smipe  
                    direction = true
                else
                    direction = null
            }else{
                
                if((mouseup_position - mousedown_position) < -30) // test if the user really wants to smipe  
                    direction = false
                else
                    direction = null
            }
  
            if(direction != null){
                if(!direction){

                    if(current_slide < params.nbr_slides){
                        
                        current_slide++ 
                        if (current_slide == params.nbr_slides ){
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, 250, function(){
                                $(this).css({"left" : "0%"})
                            })

                            current_slide = 0
                        }else{
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, 250)
                        }

                    }
    
                }else{

                    if(current_slide >= 0){

                        current_slide-- 
                        if (current_slide == -1 ){
                            $(this.children()[0]).css({"left" : "-" + (params.nbr_slides * 100) + "%"})
                            current_slide = params.nbr_slides - 1 

                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, 250)

                        }else{
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, 250)
                        }
                        
                    }

                }
            }  
            

            // If the dots navigation is enabled
            if(params.dot_nav){
                $(".dot").each(function(){
                    if($(this).hasClass('active'))
                        $(this).removeClass('active')
                })

                $(".dot-"+current_slide).addClass("active")
            }

        })


        // Adding the arrows functionality.
        if(params.arrows) {

            let next = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 210"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:red;}</style></defs><title>Artboard 1</title><path class="cls-1" d="M104.8,208.6A103.8,103.8,0,0,1,104.8,1"/><path class="cls-2" d="M85.86,109.08,69.15,91.32a1.09,1.09,0,0,0-1.49,0,1.11,1.11,0,0,0,0,1.49l15,16H34.93a1,1,0,0,0,0,2.09H82.66l-15,16a1.11,1.11,0,0,0,0,1.49,1.08,1.08,0,0,0,1.49-.05l16.71-17.76a1.13,1.13,0,0,0,0-1.44Z"/></svg>'
            let prev = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 210"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:red;}</style></defs><title>Artboard 1</title><path class="cls-1" d="M.7.6a104,104,0,0,1,0,208"/><path class="cls-2" d="M22.13,111.29l16,17a1,1,0,0,0,1.43.05,1,1,0,0,0,0-1.42L25.2,111.61H70.88a1,1,0,0,0,0-2H25.2L39.6,94.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.43,0l-16,17a1.07,1.07,0,0,0,0,1.37Z"/></svg>'
            this.append("<div class='"+params.class_name_prefix +"arrows arrows'><span class='prev'>"+ prev +"</span><span class='next'>"+ next +"</span></div>")
        
            let _this = $(".the_slider")

            $(".arrows .next").on("click", function(){
                if(current_slide < params.nbr_slides){

                    current_slide++ 
                    if (current_slide == params.nbr_slides ){
                        $(_this.children()[0]).animate({
                            "left": - (current_slide * 100) + "%"
                        }, 250, function(){
                            $(this).css({"left" : "0%"})
                        })

                        current_slide = 0
                    }else{
                        $(_this.children()[0]).animate({
                            "left": - (current_slide * 100) + "%"
                        }, 250)
                    }

                    // If the dots navigation is enabled
                    if(params.dot_nav){
                        $(".dot").each(function(){
                            if($(this).hasClass('active'))
                                $(this).removeClass('active')
                        })

                        $(".dot-"+current_slide).addClass("active")
                    }
                }
            })


            $(".arrows .prev").on("click", function(){
                if(current_slide >= 0){
                        
                    current_slide-- 
                    if (current_slide == -1 ){
                        $(_this.children()[0]).css({"left" : "-" + (params.nbr_slides * 100) + "%"})
                        current_slide = params.nbr_slides - 1 

                        $(_this.children()[0]).animate({
                            "left": - (current_slide * 100) + "%"
                        }, 250)

                    }else{
                        $(_this.children()[0]).animate({
                            "left": - (current_slide * 100) + "%"
                        }, 250)
                    }

                   
                }
            })
        }

        // handling the full width option
        if(!params.full_width){
            $(this).css({"width": "100%"})

            $(".s_slide").css({
                "width": "12%",
                "margin": "0 2.333%"
            })
        }
    }

    return this;
})(jQuery);