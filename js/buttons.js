
var about = document.getElementsByClassName('inner')[0].children[1].children[0];
var showAbout = 0;
var contact = document.getElementsByClassName('inner')[0].children[1].children[2];
var showContact = 0;

$( about ).click(function() {
  showAbout=showAbout^1;
  if(showContact == 1){
    showContact = showContact^1;
    $("#contact").fadeOut( 500 );
  }
  $("#about").delay(700).fadeToggle( "slow", "linear" );
});

if(showAbout == 1){
  $( about ).css("opacity", "green");
  console.log("1");
}

$( contact ).click(function() {
  showContact=showContact^1;
  if(showAbout == 1){
    showAbout = showAbout^1;
    $("#about").fadeOut( 500 );
  }
  $("#contact").delay(500).fadeToggle( "slow", "linear" );
});
