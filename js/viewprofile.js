var itemload = 0;
var requestload = 0;
var marketitems = 0;
var changeaction = "prt";

$(document).ready(function() {
  $.ajax({
      type: 'POST',
      url: "http://52.60.155.161/php/loginlock.php",
      data: "",
      success:function(data){
        if(data){
          window.location.replace("http://52.60.155.161/signupandlogin.html");
        }
      }
    });
  $("#itemc").css('width', $(window).width());
  $("#requestc").css('width', $(window).width());
  $("#fpost").css('display', 'none');
  $("#itemc").css('display', 'none');
  $("#frequest").css('display', 'none');
  $("#fprofile").css('display', 'none');
  if($(window).width() <= 700){
    $(".channelr .medium-b").eq(0).hide();
    $(".channelr .medium-b").eq(1).show();
    $(".channelr .medium-b").eq(1).css('margin', '13px 0px 0px 30px');
    $("#cname").css('margin', '0px 0px 0px 30px');
  } else if($(window).width() > 700){
    $(".channelr .medium-b").eq(1).hide();
    $(".channelr .medium-b").eq(0).show();
  }

  $.ajax({
      url:"http://52.60.155.161/php/display_user.php",
      type:'POST',
      data: "marketid=" + marketid,
      success:function(data){
        var users = JSON.parse(data);
        $("#maintitle").text("@" + users["username"]);
        $("#cname").text(users["name"] + " " + users["lastname"]);
  }
  });
  $("#aitems").hide(0);
});

$(window).resize(function() {
  $("#itemc").css('width', $(window).width());
  $("#requestc").css('width', $(window).width());
  if($(window).width() <= 700){
    $(".channelr .medium-b").eq(0).hide();
    $(".channelr .medium-b").eq(1).show();
    $(".channelr .medium-b").eq(1).css('margin', '13px 0px 0px 30px');
    $("#cname").css('margin', '0px 0px 0px 30px');
  } else if($(window).width() > 700){
    $(".channelr .medium-b").eq(1).hide();
    $(".channelr .medium-b").eq(0).show();
  }
});

$('#marketbanner .edit-b').click(function(){
  $("#pbox").modal();
  $("#pbox").css('max-width', '680px');
  $("#fprofile").css('display', 'block');
  $("#fpost").css('display', 'none');
  $("#frequest").css('display', 'none');
});

$('.channelr #requests').click(function() {
  $("#tabgroup .tab").css('background', '#f2f4fa');
	$("#tabgroup .tab").css('z-index', '997');
	$("#tabgroup .tab").css('border', '1px solid #f2f4fa');
	$("#tabgroup .tab").css('box-shadow', '5px 5px 9px #e1e3e8, -5px -5px 9px #ffffff');

	$(".channelr #requests").css('background', '#f7f9ff');
	$(".channelr #requests").css('z-index', '998');
	$(".channelr #requests").css('border', '1px solid #f7f9ff');
	$(".channelr #requests").css('box-shadow', '5px 5px 9px #c4c6cb, -5px -5px 9px #ffffff');

  $("#subscriptionsc").hide(0);
	$("#itemc").hide(0);
  $("#aitems").show(0);
	$("#requestc").show(0);

  if(!requestload){
    loadRequests();
    requestload++;
  }
});

$('.channelr #posts').click(function() {
  $("#tabgroup .tab").css('background', '#f2f4fa');
	$("#tabgroup .tab").css('z-index', '997');
	$("#tabgroup .tab").css('border', '1px solid #f2f4fa');
	$("#tabgroup .tab").css('box-shadow', '5px 5px 9px #e1e3e8, -5px -5px 9px #ffffff');

	$(".channelr #posts").css('background', '#f7f9ff');
	$(".channelr #posts").css('z-index', '997');
	$(".channelr #posts").css('border', '1px solid #f7f9ff');
	$(".channelr #posts").css('box-shadow', '5px 5px 9px #c4c6cb, -5px -5px 9px #ffffff');

  $("#subscriptionsc").hide(0);
	$("#requestc").hide(0);
  $("#aitems").show(0);
	$("#itemc").show(0);

  if(!itemload){
    loadPosts();
    itemload++;
  }
});

$('.channelr #subscriptions').click(function() {
  $("#tabgroup .tab").css('background', '#f2f4fa');
	$("#tabgroup .tab").css('z-index', '997');
	$("#tabgroup .tab").css('border', '1px solid #f2f4fa');
	$("#tabgroup .tab").css('box-shadow', '5px 5px 9px #e1e3e8, -5px -5px 9px #ffffff');

	$(".channelr #subscriptions").css('background', '#f7f9ff');
	$(".channelr #subscriptions").css('z-index', '997');
	$(".channelr #subscriptions").css('border', '1px solid #f7f9ff');
	$(".channelr #subscriptions").css('box-shadow', '5px 5px 9px #c4c6cb, -5px -5px 9px #ffffff');

	$("#requestc").hide(0);
	$("#itemc").hide(0);
  $("#aitems").hide(0);
  $("#subscriptionsc").show(0);
});

$('.close-modal').click(function() {
  $("#fpost").css('display', 'none');
  $("#frequest").css('display', 'none');
  $("#fprofile").css('display', 'none');
});

function loadPosts(){
  $.ajax({
      url:"http://52.60.155.161/php/load_useritems.php",
      type:'POST',
      data: "",
      success:function(data){
        var marketitems = JSON.parse(data);
        var counter = 0;
        for (const item in marketitems) {
          counter = counter + 1;
          if (marketitems[item]["image1"]){
            marketitems[item]["image1"] = "<img src=\"http://52.60.155.161/" + marketitems[item]["image1"].substring(2) + "\" alt=\"\" class=\"image image1\" width=\"250\" height=\"240\">";
          }
          if (marketitems[item]["image2"]){
            marketitems[item]["image2"] = "<img src=\"http://52.60.155.161/" + marketitems[item]["image2"].substring(2) + "\" alt=\"\" class=\"image image2\" width=\"250\" height=\"240\">";
          }
          if (marketitems[item]["image3"]){
            marketitems[item]["image3"] = "<img src=\"http://52.60.155.161/" + marketitems[item]["image3"].substring(2) + "\" alt=\"\" class=\"image image3\" width=\"250\" height=\"240\">";
          }
          createPost("#center", counter, marketitems[item]["username"], marketitems[item]["itemid"], marketitems[item]["image1"], marketitems[item]["image2"], marketitems[item]["image3"], marketitems[item]["name"], marketitems[item]["price"]);
  }
  }
  });
}

function createPost(appendTo, counter, username, itemid, image1, image2, image3, name, price){
  $(appendTo).append("<div class=\"box\" id=\"box" + counter + "\"><div class=\"imageh\"></div><div id=\"rarrow" + counter + "\" class=\"arrow rarrow\"></div><div id=\"larrow" + counter + "\" class=\"arrow larrow\"></div><div class=\"utools\"><div class=\"uremove\"></div><div class=\"uedit\"></div><p class=\"tinyf\">@" + username + "</p></div>");

  $(document).on('click','#box' + counter + ' .uedit',function(e) {
    $("#pbox").modal();
    $("#fpost").css('display', 'block');
    $("#frequest").css('display', 'none');
    $("#fprofile").css('display', 'none');
    editPost(itemid);
  });

  $(document).on('click','#box' + counter + ' .uremove',function(e) {
    confirmChange(true);
    $('#modalyes').click(function(){
      removePost(itemid);
    });
    $('#modalno').click(function(){
      $.modal.close();
    });
  });

  if (image1){
    $("#box" + counter + " .imageh").append(image1);
  }

  if (image2){
    $("#box" + counter + " .imageh").append(image2);
    $("#box" + counter + " .image2").hide();
  }

  if (image3){
    $("#box" + counter + " .imageh").append(image3);
    $("#box" + counter + " .image3").hide();
  }

  $('#box' + counter + ' .larrow').click(function() {
    var boxid = $(this).attr('id').substring($(this).attr('id').length - 1);
    var images = [];
    var position = 0;
    if($("#box" + boxid + " .image1").length){
      images.push("#box" + boxid + " .image1")
    }
    if($("#box" + boxid + " .image2").length){
      images.push("#box" + boxid + " .image2")
    }
    if($("#box" + boxid + " .image3").length){
      images.push("#box" + boxid + " .image3")
    }

    if($("#box" + boxid + " .image1").is(":visible")){
      position = 0;
    }
    if($("#box" + boxid + " .image2").is(":visible")){
      position = 1;
    }
    if($("#box" + boxid + " .image3").is(":visible")){
      position = 2;
    }

    if(position === 0){
      position = images.length - 1;
      $("#box" + boxid + " .image").hide(0);
      $(images[position]).show(0);
    } else {
      position = position - 1;
      $("#box" + boxid + " .image").hide(0);
      $(images[position]).show(0);
    }
  });

  $('#box' + counter + ' .rarrow').click(function() {
    var boxid = $(this).attr('id').substring($(this).attr('id').length - 1);
    var images = [];
    var position = 0;
    if($("#box" + boxid + " .image1").length){
      images.push("#box" + boxid + " .image1")
    }
    if($("#box" + boxid + " .image2").length){
      images.push("#box" + boxid + " .image2")
    }
    if($("#box" + boxid + " .image3").length){
      images.push("#box" + boxid + " .image3")
    }

    if($("#box" + boxid + " .image1").is(":visible")){
      position = 0;
    }
    if($("#box" + boxid + " .image2").is(":visible")){
      position = 1;
    }
    if($("#box" + boxid + " .image3").is(":visible")){
      position = 2;
    }

    if(position === images.length - 1){
      position = 0;
      $("#box" + boxid + " .image").hide(0);
      $(images[position]).show(0);
    } else {
      position = position + 1;
      $("#box" + boxid + " .image").hide(0);
      $(images[position]).show(0);
    }
  });

    $("#box" + counter).append("<div class=\"fright\"><p class=\"title\">" + name + "</p><p class=\"price\">$" + price + "</p></div>");
    $("#box" + counter).append("<div class=\"fright\"><button class=\"small-b blue-b disabledblue-b\">Message</button><button class=\"small-b grey-b\">View</button></div>");
    $("#box" + counter).append("<div id=\"modal" + counter + "\" class=\"modal\"><p> Let @" + username + " know you're interested.</p></div>");
    $(document).on('click','#buttonof' + itemid,function(e) {
      e.preventDefault();
      // window.location.replace("http://52.60.155.161/nearbuy_viewprofile.html");
      var form = $('#' + itemid)[0];
      var formData = new FormData(form);
      formData.append('itemid', itemid);
      formData.append('subject', name);
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
}

function loadRequests(){
  $.ajax({
      url:"http://52.60.155.161/php/load_userequests.php",
      type:'POST',
      data: "",
      success:function(data){
        var marketrequests = JSON.parse(data);
        var counter = 0;
        for (const request in marketrequests) {
          ///contains marketrequests[request]["name"], marketrequests[request]["datenow"], marketrequests[request]["hashtag1"], marketrequests[request]["hashtag2"], marketrequests[request]["hashtag3"], marketrequests[request]["hashtag4"], marketrequests[request]["hashtag5"]
            $("#requestc").append("<div id=\"rbox" + counter + "\" class=\"rbox\"><div class=\"brow\"><p class=\"rtitle\">" + marketrequests[request]["name"] + "</p><div class=\"uremove\"></div><div class=\"uedit\"></div></div><p class=\"username\">@" + marketrequests[request]["username"] + "</p><button class=\"small-b blue-b\">Message</button></div>");
            $(document).on('click','#rbox' + counter + ' .uedit',function(e) {
              $.ajax({
                  type: 'POST',
                  url: "http://52.60.155.161/php/loginlock.php",
                  data: "",
                  success:function(data){
                    if(data){
                      window.location.replace("http://52.60.155.161/signupandlogin.html");
                    } else {
                      $("#pbox").modal();
                      $("#frequest").css('display', 'block');
                      $("#fpost").css('display', 'none');
                      $("#fprofile").css('display', 'none');
                      editRequest(marketrequests[request]["requestid"]);
                    }
                  }
                });
            });
            $(document).on('click','#rbox' + counter + ' .uremove',function(e) {
              confirmChange(true);
              $('#modalyes').click(function(){
                removeRequest(marketrequests[request]["requestid"]);
              });
              $('#modalno').click(function(){
                $.modal.close();
              });
            });
            counter++;
  }
  }
  });
}

///Edit Posts
function editPost(itemid){
  $.ajax({
      url:"http://52.60.155.161/php/edit_marketitems.php",
      type:'POST',
      data: "itemid=" + itemid + "&changeaction=" + changeaction,
      success:function(data){
        marketitems = JSON.parse(data);
        for (const item in marketitems) {
          $("#fpost input").css('color', '#495057');
          $('#inputTitle').val(marketitems[item]["name"]);
          $('#inputPrice').val(marketitems[item]["price"]);
          $('#inputLocation').text("Posted in: " + marketitems[item]["marketname"]);
          $('#' + marketitems[item]["quality"]).attr('selected', 'selected');
          $('#inputAdditionalInformation').val(marketitems[item]["description"]);

          if (marketitems[item]["image1"] && !$("#drop-zone1 .drop-zone__thumb").length){
            marketitems[item]["image1"] = marketitems[item]["image1"].substring(2);
            $("#drop-zone1 .drop-zone__prompt").remove();
            $("#drop-zone1").append("<div class=\"drop-zone__thumb\"></div>");
            $("#drop-zone1 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image1"] + "')");
          } else if (marketitems[item]["image1"] && $("#drop-zone1 .drop-zone__thumb").length){
            marketitems[item]["image1"] = marketitems[item]["image1"].substring(2);
            $("#drop-zone1 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image1"] + "')");
          }

          if (marketitems[item]["image2"] && !$("#drop-zone2 .drop-zone__thumb").length){
            marketitems[item]["image2"] = marketitems[item]["image2"].substring(2);
            $("#drop-zone2 .drop-zone__prompt").remove();
            $("#drop-zone2").append("<div class=\"drop-zone__thumb\"></div>");
            $("#drop-zone2 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image2"] + "')");
          } else if (marketitems[item]["image2"] && $("#drop-zone2 .drop-zone__thumb").length){
            marketitems[item]["image2"] = marketitems[item]["image2"].substring(2);
            $("#drop-zone2 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image2"] + "')");
          }

          if (marketitems[item]["image3"] && !$("#drop-zone3 .drop-zone__thumb").length){
            marketitems[item]["image3"] = marketitems[item]["image3"].substring(2);
            $("#drop-zone3 .drop-zone__prompt").remove();
            $("#drop-zone3").append("<div class=\"drop-zone__thumb\"></div>");
            $("#drop-zone3 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image3"] + "')");
          } else if (marketitems[item]["image3"] && $("#drop-zone3 .drop-zone__thumb").length){
              marketitems[item]["image3"] = marketitems[item]["image3"].substring(2);
            $("#drop-zone3 .drop-zone__thumb").css("background-image", "url('http://52.60.155.161/" + marketitems[item]["image3"] + "')");
          }

          unused = ["inputTag1", "inputTag2", "inputTag3", "inputTag4", "inputTag5"];
          used = [];
          $("#inputTags").css('color', '#dce0e3');
          $("#hashtags").empty();
          if (marketitems[item]["hashtag1"]){
            $("#hashtags").append("<div id=\"inputTag1\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag1"] + "</span></div>");
            unused.splice(unused.indexOf('inputTag1'), 1);
            used.push('inputTag1');
          }
          if (marketitems[item]["hashtag2"]){
            $("#hashtags").append("<div id=\"inputTag2\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag2"] + "</span></div>");
            unused.splice(unused.indexOf('inputTag2'), 1);
            used.push('inputTag2');
          }
          if (marketitems[item]["hashtag3"]){
            $("#hashtags").append("<div id=\"inputTag3\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag3"] + "</span></div>");
            unused.splice(unused.indexOf('inputTag3'), 1);
            used.push('inputTag3');
          }
          if (marketitems[item]["hashtag4"]){
            $("#hashtags").append("<div id=\"inputTag4\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag4"] + "</span></div>");
            unused.splice(unused.indexOf('inputTag4'), 1);
            used.push('inputTag4');
          }
          if (marketitems[item]["hashtag5"]){
            $("#hashtags").append("<div id=\"inputTag5\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketitems[item]["hashtag5"] + "</span></div>");
            unused.splice(unused.indexOf('inputTag5'), 1);
            used.push('inputTag5');
          }
          tagCheck();

          $('#edititembutton').click(function(e) {
            confirmChange(false);
            $('#modalyes').click(function(){
              e.preventDefault();
              uploadItemEdits(marketitems[item]["image1"], marketitems[item]["image2"], marketitems[item]["image3"]);
            });
            $('#modalno').click(function(){
              $.modal.close();
            });
            });
  }
  }
  });
}

  function uploadItemEdits(oldimage1, oldimage2, oldimage3){
    let title = document.getElementById('inputTitle').value;
    let price = document.getElementById('inputPrice').value;
    let quality = document.getElementById('inputQuality').value;
    let additionalinformation = document.getElementById('inputAdditionalInformation').value;
    let hashtag1 = $("#inputTag1").text();
    let hashtag2 = $("#inputTag2").text();
    let hashtag3 = $("#inputTag3").text();
    let hashtag4 = $("#inputTag4").text();
    let hashtag5 = $("#inputTag5").text();
    price = parseInt(price);

    if(!(title === marketitems[0]["name"]) || !(price === marketitems[0]["price"]) || !(quality === marketitems[0]["quality"]) || !(additionalinformation === marketitems[0]["description"]) ||
      !(hashtag1 === marketitems[0]["hashtag1"]) || !(hashtag2 === marketitems[0]["hashtag2"]) || !(hashtag3 === marketitems[0]["hashtag3"]) || !(hashtag4 === marketitems[0]["hashtag4"]) ||
      !(hashtag5 === marketitems[0]["hashtag5"]) || $(".newimage").length){
         changeaction = "edt";
         var form = $('#itempostform')[0];
         var formData = new FormData(form);
         formData.append('changeaction', changeaction);
         formData.append('itemid', marketitems[0]["itemid"]);
         formData.append('marketid', marketitems[0]["marketid"]);
         if(marketitems[0]["image1"].substring(0,2) !== ".."){
           marketitems[0]["image1"] = ".." + marketitems[0]["image1"];
           formData.append('oldimage1', marketitems[0]["image1"]);
         } else {
           formData.append('oldimage1', marketitems[0]["image1"]);
         }
         if(marketitems[0]["image2"].substring(0,2) !== ".."){
           marketitems[0]["image2"] = ".." + marketitems[0]["image2"];
           formData.append('oldimage2', marketitems[0]["image2"]);
         } else {
           formData.append('oldimage2', marketitems[0]["image2"]);
         }
         if(marketitems[0]["image3"].substring(0,2) !== ".."){
           marketitems[0]["image3"] = ".." + marketitems[0]["image3"];
           formData.append('oldimage3', marketitems[0]["image3"]);
         } else {
           formData.append('oldimage3', marketitems[0]["image3"]);
         }
         formData.append('hashtag1', hashtag1);
         formData.append('hashtag2', hashtag2);
         formData.append('hashtag3', hashtag3);
         formData.append('hashtag4', hashtag4);
         formData.append('hashtag5', hashtag5);
         $.ajax({
             type: 'POST',
             contentType: false,
             processData: false,
             url: "http://52.60.155.161/php/edit_marketitems.php",
             data: formData,
             success:function(data){
                   if(data !== ""){
                     $("#createnewitemerrors").empty();
                     $("#createnewitemerrors").append("<p>" + data + "</p>");
                   } else {
                     $("#createnewitemerrors").empty();
                     $("#createnewitemerrors").append("<p> Item uploaded successfully. </p>");
                   }
             }
           });
       }
  }

  function removePost(itemid){
    $.ajax({
        type: 'POST',
        url: "http://52.60.155.161/php/remove_marketitems.php",
        data: "itemid=" + itemid,
        success:function(data){
              alert("success");
        }
      });
  }


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

  ///Edit requests
  function editRequest(requestid){
    $.ajax({
        url:"http://52.60.155.161/php/edit_marketrequests.php",
        type:'POST',
        data: "requestid=" + requestid + "&changeaction=" + changeaction,
        success:function(data){
          marketrequests = JSON.parse(data);
          for (const request in marketrequests) {
            $("#frequest input").css('color', '#495057');
            $('#inputRequestLocation').text("Posted in: " + marketrequests[request]["marketname"]);
            $('#inputRequest').val(marketrequests[request]["name"]);
            $("#rhashtags").empty();

            runused = ["inputRequestag1", "inputRequestag2", "inputRequestag3", "inputRequestag4", "inputRequestag5"];
            rused = [];
            $("#inputRequestags").css('color', '#dce0e3');
            if (marketrequests[request]["hashtag1"]){
              $("#rhashtags").append("<div id=\"inputRequestag1\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketrequests[request]["hashtag1"] + "</span></div>");
              runused.splice(runused.indexOf('inputRequestag1'), 1);
              rused.push('inputRequestag1');
            }
            if (marketrequests[request]["hashtag2"]){
              $("#rhashtags").append("<div id=\"inputRequestag2\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketrequests[request]["hashtag2"] + "</span></div>");
              runused.splice(runused.indexOf('inputRequestag2'), 1);
              rused.push('inputRequestag2');
            }
            if (marketrequests[request]["hashtag3"]){
              $("#rhashtags").append("<div id=\"inputRequestag3\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketrequests[request]["hashtag3"] + "</span></div>");
              runused.splice(runused.indexOf('inputRequestag3'), 1);
              rused.push('inputRequestag3');
            }
            if (marketrequests[request]["hashtag4"]){
              $("#rhashtags").append("<div id=\"inputRequestag4\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketrequests[request]["hashtag4"] + "</span></div>");
              runused.splice(runused.indexOf('inputRequestag4'), 1);
              rused.push('inputRequestag4');
            }
            if (marketrequests[request]["hashtag5"]){
              $("#rhashtags").append("<div id=\"inputRequestag5\" class=\"hashtag\"><div class=\"cross\"></div><span>" + marketrequests[request]["hashtag5"] + "</span></div>");
              runused.splice(runused.indexOf('inputRequestag5'), 1);
              rused.push('inputRequestag5');
            }
            tagrCheck();
    }
    }
    });
  }

  $('#editrequestbutton').click(function(e) {
    e.preventDefault();
    uploadRequestEdits();
});

function uploadRequestEdits(){
      let title = document.getElementById('inputRequest').value;
      let hashtag1 = $("#inputRequestag1").text();
      let hashtag2 = $("#inputRequestag2").text();
      let hashtag3 = $("#inputRequestag3").text();
      let hashtag4 = $("#inputRequestag4").text();
      let hashtag5 = $("#inputRequestag5").text();

      if(!(title === marketrequests[0]["name"]) || !(hashtag1 === marketrequests[0]["hashtag1"]) || !(hashtag2 === marketrequests[0]["hashtag2"]) || !(hashtag3 === marketrequests[0]["hashtag3"]) || !(hashtag4 === marketrequests[0]["hashtag4"]) ||
        !(hashtag5 === marketrequests[0]["hashtag5"])){
           changeaction = "edt";
           var form = $('#requestpostform')[0];
           var formData = new FormData(form);
           formData.append('title', title);
           formData.append('changeaction', changeaction);
           formData.append('requestid', marketrequests[0]["requestid"]);
           formData.append('marketid', marketrequests[0]["marketid"]);
           formData.append('hashtag1', hashtag1);
           formData.append('hashtag2', hashtag2);
           formData.append('hashtag3', hashtag3);
           formData.append('hashtag4', hashtag4);
           formData.append('hashtag5', hashtag5);
           $.ajax({
               type: 'POST',
               contentType: false,
               processData: false,
               url: "http://52.60.155.161/php/edit_marketrequests.php",
               data: formData,
               success:function(data){
                     if(data !== ""){
                       $("#editrequesterrors").empty();
                       $("#editrequesterrors").append("<p>" + data + "</p>");
                     } else {
                       $("#editrequesterrors").empty();
                       $("#editrequesterrors").append("<p> request uploaded successfully. </p>");
                     }
               }
             });
         }
  }

  function removeRequest(requestid){
    $.ajax({
        type: 'POST',
        url: "http://52.60.155.161/php/remove_marketrequests.php",
        data: "requestid=" + requestid,
        success:function(data){
          alert("success");
        }
      });
  }

  function confirmChange(deletepost){
    if(deletepost){
      $('#modal').modal();
      $('#modal p').text("Are you sure you want to delete this post?");
    } else {
      $('#modal').modal();
      $('#modal p').text("Are you sure you want to make these changes?");
    }
  }
  ///Image drop
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
      var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpg'];
      if (e.dataTransfer && e.dataTransfer.files) {
        var fileType = e.dataTransfer.files[0].type;
        if (imageTypes.includes(fileType)) {
          if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
          }
        } else {
          $("#createnewitemerrors").empty();
          $("#createnewitemerrors").append("<p> File dropped is not an image. </p>");
        }
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  document.addEventListener('drop', function(e) {
    // set your image types
  });
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;
    thumbnailElement.classList.add("newimage");

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
