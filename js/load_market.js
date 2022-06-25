//Search bar
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const marketid = urlParams.get('market');

$(document).ready(function(){
$.ajax({
    url:"http://52.60.155.161/php/load_market.php",
    type:'POST',
    data: "marketid=" + marketid,
    success:function(data){
      var marketname = JSON.parse(data);
      for (const name in marketname) {
          $("#maintitle").append("<p>" + marketname[name]["name"] + "</p>");
          $("#marketbanner img").attr("src", "http://52.60.155.161/" + marketname[name]["image"].substring(2));
          $(".subscribe-b").attr('id', "subscribe-b" + marketname[name]["id"]);
          $("#buttons").append("<a id=\"newpostbutton\" href=\"http://52.60.155.161/nearbuy_createnewpost.html?market=" + marketid + "\">Create New Post</a>");
}
}
});

$.ajax({
    url:"http://52.60.155.161/php/load_marketitems.php",
    type:'POST',
    data: "marketid=" + marketid,
    success:function(data){
      var marketitems = JSON.parse(data);
      var counter = 0;
      for (const item in marketitems) {
        counter = counter + 1;
        $("#center").append("<div class=\"box\" id=\"box" + counter + "\"><div class=\"imageh\"></div><div id=\"rarrow" + counter + "\" class=\"arrow rarrow\"></div><div id=\"larrow" + counter + "\" class=\"arrow larrow\"></div><div id=\"uppertab" + counter + "\" class=\"uppertab\"><p class=\"tinyf\">@" + marketitems[item]["username"] + "</p></div>");
          // append to imageh <img src="books/IMG_1511 2.png" alt="" class="image" width="250" height="240">
          // append to box1 <div class="fright"><p class="title">Short Stories by Roxanne Gay</p><p class="price">$19000</p></div>
          // append to box2 <div class="fright"><button class="small-b blue-b">Message</button><button class="small-b grey-b">View</button></div>
          // contains marketitems[item]["name"], marketitems[item]["price"], marketitems[item]["quality"], marketitems[item]["description"], marketitems[item]["datenow"]

        if (marketitems[item]["image1"]){
          marketitems[item]["image1"] = marketitems[item]["image1"].substring(2);
          $("#box" + counter + " .imageh").append("<img src=\"http://52.60.155.161" + marketitems[item]["image1"] + "\" alt=\"\" class=\"image image1\" width=\"250\" height=\"240\">");
        }

        if (marketitems[item]["image2"]){
          marketitems[item]["image2"] = marketitems[item]["image2"].substring(2);
          $("#box" + counter + " .imageh").append("<img src=\"http://52.60.155.161" + marketitems[item]["image2"] + "\" alt=\"\" class=\"image image2\" width=\"250\" height=\"240\">");
          $("#box" + counter + " .image2").hide();
        }

        if (marketitems[item]["image3"]){
          marketitems[item]["image3"] = marketitems[item]["image3"].substring(2);
          $("#box" + counter + " .imageh").append("<img src=\"http://52.60.155.161" + marketitems[item]["image3"] + "\" alt=\"\" class=\"image image3\" width=\"250\" height=\"240\">");
          $("#box" + counter + " .image3").hide();
        }

        $('#box' + counter + ' .larrow').click(function() {
          var boxid = $(this).attr('id').substring($(this).attr('id').length - 1);
          moveImageleft("#box" + boxid);
        });

        $('#box' + counter + ' .rarrow').click(function() {
          var boxid = $(this).attr('id').substring($(this).attr('id').length - 1);
          moveImageright("#box" + boxid);
        });

          $("#box" + counter).append("<div class=\"fright\"><p class=\"title\">" + marketitems[item]["name"] + "</p><p class=\"price\">$" + marketitems[item]["price"] + "</p></div>");
          $("#box" + counter).append("<div class=\"fright\"><button id=\"startm" + counter + "\" class=\"small-b blue-b\">Message</button><button class=\"small-b grey-b\">View</button></div>");
          $("#box" + counter).append("<input value=\"" + marketitems[item]["itemid"] + "\"readonly></div>");
          $('#box' + counter + " input").hide();

          $(document).on('click','#box' + counter + " .grey-b",function(e) {
            var itemid = $(this).closest(".fright").closest(".box").find('input').val();
            e.preventDefault();
            $("#viewitem").modal();
            $("#viewitem .image").remove();
            $("#mhashtags").empty();
            if (marketitems[item]["image1"]){
              $("#viewitem .imageh").prepend("<img src=\"http://52.60.155.161" + marketitems[item]["image1"] + "\" alt=\"\" class=\"image image1\" width=\"350\" height=\"330\">");
            }

            if (marketitems[item]["image2"]){
              $("#viewitem .imageh").prepend("<img src=\"http://52.60.155.161" + marketitems[item]["image2"] + "\" alt=\"\" class=\"image image2\" width=\"350\" height=\"330\">");
              $("#viewitem .image2").hide();
            }

            if (marketitems[item]["image3"]){
              $("#viewitem .imageh").prepend("<img src=\"http://52.60.155.161" + marketitems[item]["image3"] + "\" alt=\"\" class=\"image image3\" width=\"350\" height=\"330\">");
              $("#viewitem .image3").hide();
            }
            $('#mlarrow').click(function() {
              moveImageleft('#viewitem');
            });
            $('#mrarrow').click(function() {
              moveImageright('#viewitem');
            });
            $("#viewitem .title").text(marketitems[item]["name"] + " by");
            $("#viewitem .username").text("@" + marketitems[item]["username"]);
            $("#viewitem .price").text(marketitems[item]["price"]);
            $("#viewitem .quality").text(marketitems[item]["quality"]);
            $("#viewitem .details").text(marketitems[item]["description"]);
            $("#mhashtags").append("<div id=\"inputmTag1\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag1"] + "</span></div>");
            $("#mhashtags").append("<div id=\"inputmTag2\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag2"] + "</span></div>");
            $("#mhashtags").append("<div id=\"inputmTag3\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag3"] + "</span></div>");
            $("#mhashtags").append("<div id=\"inputmTag4\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag4"] + "</span></div>");
            $("#mhashtags").append("<div id=\"inputmTag5\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag5"] + "</span></div>");
            $("#viewitem input").hide();
            $("#viewitem .blue-b").attr('id', 'sendm-b' + itemid);
            $("#viewitem .blue-b").text("Message");
            $("#viewitem .blue-b").removeClass("send-b");
            if($("#viewitem").width() > 800){
              $(".mrow").css('width', $("#viewitem").width() - 250);
            }
            // window.location.replace("http://52.60.155.161/nearbuy_viewprofile.html");

          });
}
}
});
});

$(document).on('click', '#viewitem .blue-b', function() {
  $.ajax({
      type: 'POST',
      url: "http://52.60.155.161/php/loginlock.php",
      data: "",
      success:function(data){
        if(data){
          window.location.replace("http://52.60.155.161/signupandlogin.html");
        } else {
          $("#viewitem .blue-b").css('margin-top', '20px');
          $("#viewitem input").show(0);
          $("#viewitem .blue-b").text("Send Message");
          $("#viewitem .blue-b").addClass('send-b');
          $("#viewitem .blue-b").attr('id', "send-b" + $("#viewitem .blue-b").attr('id').substring(7));
        }
      }
    });
});

$(document).on('click', '#viewitem .send-b', function(e) {
  var itemid = $(this).attr('id').substring(6);
  e.preventDefault();
  // window.location.replace("http://52.60.155.161/nearbuy_viewprofile.html");
  var form = $('#viewitem form')[0];
  var formData = new FormData(form);
  formData.append('itemid', itemid);
  $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      url: "http://52.60.155.161/php/new_messagechat.php",
      data: formData,
      success:function(data){
            if(data){
              $("#itemlist").append("<p id=\"createnewchat\">" + data + "</p>");
            } else {
              window.location.replace("http://52.60.155.161/nearbuy_messages.html");
            }
      }
    });
});

$('#viewitem .imageh').mouseover(function(){
  $('#mlarrow').css('background-position', '10px 0px');
  $('#mrarrow').css('background-position', '0px 0px');
});

$('#viewitem .imageh').mouseout(function(){
  $('#mlarrow').css('background-position', '-30px 0px');
  $('#mrarrow').css('background-position', '40px 0px');
});

function moveImageleft(id){
    var images = [];
    var position = 0;
    if($(id + " .image1").length){
      images.push(id + " .image1")
    }
    if($(id + " .image2").length){
      images.push(id + " .image2")
    }
    if($(id + " .image3").length){
      images.push(id + " .image3")
    }

    if($(id + " .image1").is(":visible")){
      position = 0;
    }
    if($(id + " .image2").is(":visible")){
      position = 1;
    }
    if($(id + " .image3").is(":visible")){
      position = 2;
    }

    if(position === 0){
      position = images.length - 1;
      $(id + " .image").hide(0);
      $(images[position]).show(0);
    } else {
      position = position - 1;
      $(id + " .image").hide(0);
      $(images[position]).show(0);
    }
}


function moveImageright(id){
    var images = [];
    var position = 0;
    if($(id + " .image1").length){
      images.push(id + " .image1")
    }
    if($(id + " .image2").length){
      images.push(id + " .image2")
    }
    if($(id + " .image3").length){
      images.push(id + " .image3")
    }

    if($(id + " .image1").is(":visible")){
      position = 0;
    }
    if($(id + " .image2").is(":visible")){
      position = 1;
    }
    if($(id + " .image3").is(":visible")){
      position = 2;
    }

    if(position === images.length - 1){
      position = 0;
      $(id + " .image").hide(0);
      $(images[position]).show(0);
    } else {
      position = position + 1;
      $(id + " .image").hide(0);
      $(images[position]).show(0);
    }
}

$.ajax({
    url:"http://52.60.155.161/php/load_marketrequests.php",
    type:'POST',
    data: "marketid=" + marketid,
    success:function(data){
      var marketrequests = JSON.parse(data);
      for (const request in marketrequests) {
        ///contains marketrequests[request]["name"], marketrequests[request]["datenow"], marketrequests[request]["hashtag1"], marketrequests[request]["hashtag2"], marketrequests[request]["hashtag3"], marketrequests[request]["hashtag4"], marketrequests[request]["hashtag5"]
          $("#requestc").append("<div class=\"rbox\"><p class=\"title\">" + marketrequests[request]["name"] + "</p><p class=\"username\">@" + marketrequests[request]["username"] + "</p><button class=\"small-b blue-b\">Message</button></div>");
}
}
});


$("#inputTags").focus(function(){
	if($("#inputTags").val() === "eg. aptextbook"){
		$("#inputTags").val("");
		$("#inputTags").css('color', '#495057');
	}
});

$("#inputTags").blur(function(){
	if($("#inputTags").val() === ""){
		$("#inputTags").val("eg. aptextbook");
		$("#inputTags").css('color', '#dce0e3');
	}
});

var unused = ["inputTag1", "inputTag2", "inputTag3", "inputTag4", "inputTag5"];
var used = [];
$("#inputTags").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if($("#inputTags").val() !== "eg. aptextbook" && $("#inputTags").val() !== ""){
			var stag = unused[0];
			$("#hashtags").append("<div id=\"" + stag + "\" class=\"hashtag\"><div class=\"cross\"></div><span>" + $("#inputTags").val().trim() + "</span></div>");
			$("#inputTags").val("");

			used.push(stag);
			unused.shift();
		}
	}
	tagCheck();
});

$(document).on('mouseenter', '#inputTag1 .cross' ,function() {
	$('#inputTag1').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag1 .cross' ,function() {
	$('#inputTag1').css('opacity', '1');
});

$(document).on('click', '#inputTag1 .cross' ,function() {
	$('#inputTag1').remove();
	if(unused.indexOf('inputTag1') === -1){
		unused.push('inputTag1');
	}
	var index = used.indexOf('inputTag1');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag2 .cross' ,function() {
	$('#inputTag2').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag2 .cross' ,function() {
	$('#inputTag2').css('opacity', '1');
});

$(document).on('click', '#inputTag2 .cross' ,function() {
	$('#inputTag2').remove();
	if(unused.indexOf('inputTag2') === -1){
		unused.push('inputTag2');
	}
	var index = used.indexOf('inputTag2');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag3 .cross' ,function() {
	$('#inputTag3').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag3 .cross' ,function() {
	$('#inputTag3').css('opacity', '1');
});

$(document).on('click', '#inputTag3 .cross' ,function() {
	$('#inputTag3').remove();
	if(unused.indexOf('inputTag3') === -1){
		unused.push('inputTag3');
	}
	var index = used.indexOf('inputTag3');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag4 .cross' ,function() {
	$('#inputTag4').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag4 .cross' ,function() {
	$('#inputTag4').css('opacity', '1');
});

$(document).on('click', '#inputTag4 .cross' ,function() {
	$('#inputTag4').remove();
	if(unused.indexOf('inputTag4') === -1){
		unused.push('inputTag4');
	}
	var index = used.indexOf('inputTag4');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag5 .cross' ,function() {
	$('#inputTag5').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag5 .cross' ,function() {
	$('#inputTag5').css('opacity', '1');
});

$(document).on('click', '#inputTag5 .cross' ,function() {
	$('#inputTag5').remove();
	if(unused.indexOf('inputTag5') === -1){
		unused.push('inputTag5');
	}
	var index = used.indexOf('inputTag5');
	used.splice(index, 1);
	tagCheck();
});

function tagCheck(){
	if(unused.length === 0){
		$("#inputTags").attr("readonly", true);
		$("#inputTags").css('background', '#e9ecef');
	} else {
		$("#inputTags").attr("readonly", false);
		$("#inputTags").css('background', 'white');
	}
}


$("#inputRequestags").focus(function(){
	if($("#inputRequestags").val() === "eg. aptextbook"){
		$("#inputRequestags").val("");
		$("#inputRequestags").css('color', '#495057');
	}
});

$("#inputRequestags").blur(function(){
	if($("#inputRequestags").val() === ""){
		$("#inputRequestags").val("eg. aptextbook");
		$("#inputRequestags").css('color', '#dce0e3');
	}
});


var runused = ["inputRequestag1", "inputRequestag2", "inputRequestag3", "inputRequestag4", "inputRequestag5"];
var rused = [];
$("#inputRequestags").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if($("#inputRequestags").val() !== "eg. aptextbook" && $("#inputRequestags").val() !== ""){
			var stag = runused[0];
			$("#rhashtags").append("<div id=\"" + stag + "\" class=\"hashtag\"><div class=\"cross\"></div><span>" + $("#inputRequestags").val().trim() + "</span></div>");
			$("#inputRequestags").val("");

			rused.push(stag);
			runused.shift();
		}
	}
	tagrCheck();
});

$(document).on('mouseenter', '#inputRequestag1 .cross' ,function() {
	$('#inputRequestag1').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputRequestag1 .cross' ,function() {
	$('#inputRequestag1').css('opacity', '1');
});

$(document).on('click', '#inputRequestag1 .cross' ,function() {
	$('#inputRequestag1').remove();
	if(runused.indexOf('inputRequestag1') === -1){
		runused.push('inputRequestag1');
	}
	var index = rused.indexOf('inputRequestag1');
	rused.splice(index, 1);
	tagrCheck();
});

$(document).on('mouseenter', '#inputRequestag2 .cross' ,function() {
	$('#inputRequestag2').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputRequestag2 .cross' ,function() {
	$('#inputRequestag2').css('opacity', '1');
});

$(document).on('click', '#inputRequestag2 .cross' ,function() {
	$('#inputRequestag2').remove();
	if(runused.indexOf('inputRequestag2') === -1){
		runused.push('inputRequestag2');
	}
	var index = rused.indexOf('inputRequestag2');
	rused.splice(index, 1);
	tagrCheck();
});

$(document).on('mouseenter', '#inputRequestag3 .cross' ,function() {
	$('#inputRequestag3').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputRequestag3 .cross' ,function() {
	$('#inputRequestag3').css('opacity', '1');
});

$(document).on('click', '#inputRequestag3 .cross' ,function() {
	$('#inputRequestag3').remove();
	if(runused.indexOf('inputRequestag3') === -1){
		runused.push('inputRequestag3');
	}
	var index = rused.indexOf('inputRequestag3');
	rused.splice(index, 1);
	tagrCheck();
});

$(document).on('mouseenter', '#inputRequestag4 .cross' ,function() {
	$('#inputRequestag4').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputRequestag4 .cross' ,function() {
	$('#inputRequestag4').css('opacity', '1');
});

$(document).on('click', '#inputRequestag4 .cross' ,function() {
	$('#inputRequestag4').remove();
	if(runused.indexOf('inputRequestag4') === -1){
		runused.push('inputRequestag4');
	}
	var index = rused.indexOf('inputRequestag4');
	rused.splice(index, 1);
	tagrCheck();
});

$(document).on('mouseenter', '#inputRequestag5 .cross' ,function() {
	$('#inputRequestag5').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputRequestag5 .cross' ,function() {
	$('#inputRequestag5').css('opacity', '1');
});

$(document).on('click', '#inputRequestag5 .cross' ,function() {
	$('#inputRequestag5').remove();
	if(runused.indexOf('inputRequestag5') === -1){
		runused.push('inputRequestag5');
	}
	var index = rused.indexOf('inputRequestag5');
	rused.splice(index, 1);
	tagrCheck();
});

function tagrCheck(){
	if(runused.length === 0){
		$("#inputRequestags").attr("readonly", true);
		$("#inputRequestags").css('background', '#e9ecef');
	} else {
		$("#inputRequestags").attr("readonly", false);
		$("#inputRequestags").css('background', 'white');
	}
}
