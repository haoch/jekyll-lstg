/*! Plugin options and other jQuery stuff */

/*! Global JavaScript Initialize */
var Global={
  DEBUG:true,
  log:function(m){
    if(Global.DEBUG){
      console.log(m);
    }
  },
  init:function(){
    Global.log("loading global")
    Global.img();
    Global.article();
  },
  img:function(){
    Global.log("\tloading img")
    // *** Magnific-Popup options ***
    // Add lightbox class to all image links
    $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");
    $('.image-popup').magnificPopup({
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
      },
      removalDelay: 300, // Delay in milliseconds before popup is removed
      // Class that is added to body when popup is open. 
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade'
    });

    // Lazy Load  
    $("img.load").show().lazyload({ 
        effect : "fadeIn"
    });
  },
  article:function(){
    Global.log("\tloading article")
    // FitVids options
    $("article").fitVids();
  }
}/*-End of Global -*/

/*! Page JavaScript Initialize */
var Page = {
  init:function(){
    Global.log("loading page")
    Page.home()
  },
  home:function(){
    Global.log("\tloading home")
    // home page latest articels arrow event
    $('#latest_articles_arrow').click(function(e){
      e.preventDefault()
      Global.log("toggle latest articles")
      if($(this).children("i").hasClass("icon-arrow-down")){
        $("#latest_articles").slideDown('slow')
        $(this).children("i").removeClass("icon-arrow-down")
        $(this).children("i").addClass("icon-angle-up")
      }else{
        $("#latest_articles").slideUp('slow')
        $(this).children("i").removeClass("icon-angle-up")
        $(this).children("i").addClass("icon-arrow-down")
      }
    })
  }
}/*- End of Page -*/

// ===============================
// Main Entry
// *** When document ready    ***
// ===============================
$(document).ready(function() {
  Global.init();
  Page.init();
});