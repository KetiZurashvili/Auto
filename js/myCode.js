// slider
$(document).ready(function(){
	$('.toggleIcon').on('click', function(){
		$('nav').toggleClass('open');
	})

});

// icon change
$(document).ready(function(){
	$('.toggleIcon').click(function(){
		$('.toggleIcon').toggleClass('active');
	});
});

//  scroll

$(document).ready(function(){

    var scrollLink = $(".scroll");

    //Smooth scrolling
    scrollLink.click(function(e){
      e.preventDefault();
      $('body,html').animate({
        scrollTop: $(this.hash).offset().top 

      }, 1000 );

    });


});
