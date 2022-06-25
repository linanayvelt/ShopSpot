const itemqueryString = window.location.search;
const itemurlParams = new URLSearchParams(itemqueryString);
const itemid = itemurlParams.get('item');
var marketitems = 0;
var changeaction = "prt";
var imageDropped = false;


$('#edititembutton').click(function(e) {
  e.preventDefault();
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
    !(hashtag5 === marketitems[0]["hashtag5"]) || imageDropped){
       changeaction = "edt";
       var form = $('form')[0];
       var formData = new FormData(form);
       formData.append('changeaction', changeaction);
       formData.append('itemid', marketitems[0]["itemid"]);
       formData.append('marketid', marketitems[0]["marketid"]);
       if(marketitems[0]["image1"].substring(0,2) !== ".."){
         marketitems[0]["image1"] = ".." + marketitems[0]["image1"];
         formData.append('oldimage1', marketitems[0]["image1"]);
       }
       if(marketitems[0]["image2"].substring(0,2) !== ".."){
         marketitems[0]["image2"] = ".." + marketitems[0]["image2"];
         formData.append('oldimage2', marketitems[0]["image2"]);
       }
       if(marketitems[0]["image3"].substring(0,2) !== ".."){
         marketitems[0]["image3"] = ".." + marketitems[0]["image3"];
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
           url: "http://linas-macbook-pro.local/Nearbuy/php/edit_marketitems.php",
           data: formData,
           success:function(data){
             alert(data);
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
