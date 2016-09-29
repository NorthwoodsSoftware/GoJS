function showSummaries(yesNo) {
    if (yesNo) {
      $("span.details").hide();
      $("div.details").hide();
      $("span.nodetails").show();
    }
    else {
      $("span.details").show();
      $("div.details").show();
      $("span.nodetails").hide();
    }
    try {
        localStorage.setItem("showSummaries", yesNo);
    } catch (e) {}
}

$(document).ready(function(){
  $("#buttonShow").click(function(){
    showSummaries(false);
  });
  $("#buttonHide").click(function(){
    showSummaries(true);
  });

 try {
    if (localStorage.getItem("showSummaries") ===  "true") {
       $("span.details").toggle();
       $("span.nodetails").toggle(); // the "More..." button
       $("div.details").toggle();
    }
 } catch (e) {};

});


function hst(section) {
  $("#"+section).toggle(500); // span details
  $("#d"+section).toggle(500); // div details
  $("#x"+section).toggle(); // "More..."

}

$('#bluecss').click(function (){
   $('link[title="colorful"]').attr('rel','alternate stylesheet');
   $('link[title="blue"]').attr('rel','stylesheet');
});
$('#colorfulcss').click(function (){
   $('link[title="colorful"]').attr('rel','stylesheet');
   $('link[title="blue"]').attr('rel','alternate stylesheet');
});

var hash = null;
function changeHash() {
  if (hash !== null) $(hash).css('background-color', '');
  hash = window.location.hash.replace("#.", "#\\.");
  $(hash).css('background-color', '#feffd3'); // light yellow
}
$(document).ready(changeHash);
$(window).on('hashchange', changeHash);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'auto');
ga('send', 'pageview');