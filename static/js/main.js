requirejs(['jquery','tether','bootstrap','googleSignIn','login'], function(jquery, tether, bootstrap, googleSignIn, login){
  console.log("Require Loaded");

  // Make table rows clickable by responding to the data-href attribute
  $(function(){
      $('.table tbody tr[data-href]').each(function(){
        $(this).css('cursor','pointer').hover(
          function(){ 
            $(this).addClass('active'); 
          },  
          function(){ 
            $(this).removeClass('active'); 
          }).click( function(){ 
            document.location = $(this).attr('data-href'); 
          }
        );
      });
   });

  login.initialize();
});
