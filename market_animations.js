///Header center
$(document).ready(function() {
  var width = $(window).width();
	if(width < 750){
    $("#howtouse").remove();
    $("#bcenter").css('right','');
	} else {
    width = width/2 - 150;
    $("#bcenter").css('right', width);
    if(!$("#howtouse").length){
        $("#userdiv img").after("<button type=\"button\" id=\"howtouse\" class=\"medium-b grey-b\">How to use Nearbuy?</button>");
    }
  }
  $(".disabledblue-b").css('opacity', '0.7');
});

$(window).resize(function() {
  var width = $(window).width();
	if(width < 850){
    $("#howtouse").remove();
    $("#bcenter").css('right','');
	} else {
    width = (width - $("#bcenter").width())/2;
    $("#bcenter").css('right', width);
    if(!$("#howtouse").length){
        $("#userdiv img").after("<button type=\"button\" id=\"howtouse\" class=\"medium-b grey-b\">How to use Nearbuy?</button>");
    }
  }
});

/// Open create new post
$('#aitems .blue-b').click(function() {
  $.ajax({
      type: 'POST',
      url: "http://52.60.155.161/php/loginlock.php",
      data: "",
      success:function(data){
        if(data){
          window.location.replace("http://52.60.155.161/signupandlogin.html");
        } else {
          var height = $(document).height() + 100;
          $("#newpost").modal();
        }
      }
    });
});

/// Input change for Market Items
$("#searchc input").focus(function(){
	$("#searchc input").val("");
	$("#searchc input").css('color', '#495057');
});

$("#searchc input").blur(function(){
	$("#searchc input").val("search");
  $("#searchc input").css('color', '#dce0e3');
});

///Input change for Log In
$("#inputUsernameorEmail").focus(function(){
	if($("#inputUsernameorEmail").val() === "@linanayvelt or lina@gmail.com"){
		$("#inputUsernameorEmail").val("");
		$("#inputUsernameorEmail").css('color', '#495057');
	}
});

$("#inputUsernameorEmail").blur(function(){
	if($("#inputUsernameorEmail").val() === ""){
		$("#inputUsernameorEmail").val("@linanayvelt or lina@gmail.com");
		$("#inputUsernameorEmail").css('color', '#dce0e3');
	}
});

$("#inputLoginPassword").focus(function(){
		$("#inputLoginPassword").css('color', '#495057');
});

$("#inputLoginPassword").blur(function(){
	if($("#inputLoginPassword").val() === ""){
		$("#inputLoginPassword").css('color', '#dce0e3');
	}
});

///Input change for Sign Up
$("#inputName").focus(function(){
	if($("#inputName").val() === "First"){
		$("#inputName").val("");
		$("#inputName").css('color', '#495057');
	}
});

$("#inputName").blur(function(){
	if($("#inputName").val() === ""){
		$("#inputName").val("First");
		$("#inputName").css('color', '#dce0e3');
	}
});

$("#inputLastName").focus(function(){
	if($("#inputLastName").val() === "Last"){
		$("#inputLastName").val("");
		$("#inputLastName").css('color', '#495057');
	}
});

$("#inputLastName").blur(function(){
	if($("#inputLastName").val() === ""){
		$("#inputLastName").val("Last");
		$("#inputLastName").css('color', '#dce0e3');
	}
});

$("#inputUsername").focus(function(){
	if($("#inputUsername").val() === "eg. linanayvelt"){
		$("#inputUsername").val("");
		$("#inputUsername").css('color', '#495057');
	}
});

$("#inputUsername").blur(function(){
	if($("#inputUsername").val() === ""){
		$("#inputUsername").val("eg. linanayvelt");
		$("#inputUsername").css('color', '#dce0e3');
	}
});

$("#inputEmail").focus(function(){
	if($("#inputEmail").val() === "lina@nayvelt.com"){
		$("#inputEmail").val("");
		$("#inputEmail").css('color', '#495057');
	}
});

$("#inputEmail").blur(function(){
	if($("#inputEmail").val() === ""){
		$("#inputEmail").val("lina@nayvelt.com");
		$("#inputEmail").css('color', '#dce0e3');
	}
});

$("#inputPassword").focus(function(){
		$("#inputPassword").css('color', '#495057');
});

$("#inputPassword").blur(function(){
	if($("#inputPassword").val() === ""){
		$("#inputPassword").css('color', '#dce0e3');
	}
});

$("#inputConfirmPassword").focus(function(){
		$("#inputConfirmPassword").css('color', '#495057');
});

$("#inputConfirmPassword").blur(function(){
	if($("#inputConfirmPassword").val() === ""){
		$("#inputConfirmPassword").css('color', '#dce0e3');
	}
});
///Input change for Post Item
$("#inputTitle").focus(function(){
	if($("#inputTitle").val() === "eg. Pearson Chemistry 12"){
		$("#inputTitle").val("");
		$("#inputTitle").css('color', '#495057');
	}
});

$("#inputTitle").blur(function(){
	if($("#inputTitle").val() === ""){
		$("#inputTitle").val("eg. Pearson Chemistry 12");
		$("#inputTitle").css('color', '#dce0e3');
	}
});

$("#inputPrice").focus(function(){
	$("#inputPrice").css('color', '#495057');
});

$("#inputPrice").blur(function(){
	if($("#inputPrice").val() === ""){
		$("#inputPrice").val("0");
	}
});

$("#inputAdditionalInformation").focus(function(){
	if($("#inputAdditionalInformation").val() === "Are there notes in the book? Missing pages? Describe here."){
		$("#inputAdditionalInformation").val("");
		$("#inputAdditionalInformation").css('color', '#495057');
	}
});

$("#inputAdditionalInformation").blur(function(){
	if($("#inputAdditionalInformation").val() === ""){
		$("#inputAdditionalInformation").val("Are there notes in the book? Missing pages? Describe here.");
		$("#inputAdditionalInformation").css('color', '#dce0e3');
	}
});

/// Post Title and Price length
var price = $(".box .price").text().length;

if(price >= 5){
	$(".box .title").css('width', '15ch');
}

if(price < 5 && price >= 4){
	$(".box .title").css('width', '16.5ch');
}

if(price <= 3){
	$(".box .title").css('width', '18ch');
}


var value = $(".box .title").text().length;

if(value > 17){
	$(".box .title").css('box-shadow', 'inset -10px 0 7px -7px rgba(196,198,203,0.1),inset -10px 0 7px -5px rgba(196,198,203,0.6),inset -10px 0 7px -3px rgba(196,198,203,0.2)');
}

/// Window resize adapt
$(document).ready(function() {
    var width = $(window).width();
	if(width > 550){
		width = $(window).width() - 250;
		$("#itemc").css('width', width);
		$("#requestc").css('width', width);
	} else {
		$("#itemc").css('width', width);
		$("#requestc").css('width', width);
	}
});

$(window).resize(function() {
    var width = $(window).width();
	if(width > 550){
		width = $(window).width() - 250;
		$("#itemc").css('width', width);
		$("#requestc").css('width', width);
	} else {
		$("#itemc").css('width', width);
		$("#requestc").css('width', width);
	}
});

/// Show hide posts requests
$(document).ready(function() {
    $("#requestc").hide(0);
});

$('.channelr #requests').click(function() {
	$(".channelr #requests").css('background', '#f7f9ff');
	$(".channelr #requests").css('z-index', '998');
	$(".channelr #requests").css('border', '1px solid #f7f9ff');
	$(".channelr #requests").css('box-shadow', '5px 5px 9px #c4c6cb, -5px -5px 9px #ffffff');

	$(".channelr #posts").css('background', '#f2f4fa');
	$(".channelr #posts").css('z-index', '997');
	$(".channelr #posts").css('border', '1px solid #f2f4fa');
	$(".channelr #posts").css('box-shadow', '5px 5px 9px #e1e3e8, -5px -5px 9px #ffffff');

	$("#itemc").hide(0);
	$("#requestc").show(0);
});

$('.channelr #posts').click(function() {
	$(".channelr #posts").css('background', '#f7f9ff');
	$(".channelr #posts").css('z-index', '997');
	$(".channelr #posts").css('border', '1px solid #f7f9ff');
	$(".channelr #posts").css('box-shadow', '5px 5px 9px #c4c6cb, -5px -5px 9px #ffffff');

	$(".channelr #requests").css('background', '#f2f4fa');
	$(".channelr #requests").css('z-index', '998');
	$(".channelr #requests").css('border', '1px solid #f2f4fa');
	$(".channelr #requests").css('box-shadow', '5px 5px 9px #e1e3e8, -5px -5px 9px #ffffff');

	$("#requestc").hide(0);
	$("#itemc").show(0);
});

///Sign in show and hide
$("#fsignup").hide(0);
//
$("#floginb").click(function(){
  $("#flogin").show(0);
  $("#fsignup").hide(0);
});

$("#fsignupb").click(function(){
  $("#flogin").hide(0);
  $("#fsignup").show(0);
});

///New post show and hide
$("#frequest").hide(0);
$("#requestb").css('background', '#e9ecef');

$("#requestb").click(function(){
  $("#requestb").css('background', 'white');
  $("#itemb").css('background', '#e9ecef');
  $("#newpost").css('top', 'unset');
  $("#frequest").show(0);
  $("#fpost").hide(0);
});

$("#itemb").click(function(){
  $("#requestb").css('background', '#e9ecef');
  $("#itemb").css('background', 'white');
  $("#newpost").css('top', '100px');
  $("#frequest").hide(0);
  $("#fpost").show(0);
});

///Generate and size post hashtags
//$(".hashtag").each(function(){
//	var length = $(this).text().length*8 + 10 + "px";
//	$(this).css('width', length);
//});

/// Form resize center functions
$(document).ready(function() {
    var height = $(window).height() - 50;
	var eheight = $('#box').height();
	if(height > 2.3*eheight){
		$("#fcenter").css('height', height);
	}
});

$(window).resize(function() {
    var height = $(window).height() - 50;
		var eheight = $('#box').height();
	if(height > 2.4*eheight){
		$("#fcenter").css('height', height);
	}
});

/// Message resize functions
// $(document).ready(function() {
//   var height = $(window).height() - 70;
//   var width = $(window).width() - 300;
//    // - $('.tmessage').height();
// 	$("#conversationsb").css('height', height);
//   $("#messagesb").css('height', height);
//   $("#messagesb").css('width', width);
// });

// $(document).on('click', '.cuser', function() {
//   alert("success");
//   var height = $(window).height() - 70;
//   var width = $(window).width() - 300;
//   var fheight = height - $('.imessage').height();
//    // - $('.tmessage').height();
// 	$("#conversationsb").css('height', height);
//   $("#messagesb").css('height', height);
//   $("#messagesb").css('width', width);
//   $(".cmessage").css('height', fheight);
//   $(".message").css('max-width', width/2);
// });
