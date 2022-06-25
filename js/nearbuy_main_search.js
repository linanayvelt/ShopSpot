// //Search bar
// let filterInput = document.getElementById('filterInput');
// filterInput.addEventListener('keyup', filterNames);
var height2 = 0;
var defaultext = "Seach by name, keyword, etc...";
var defaultcolor = "#dce0e3";
var minimizebanner = 0;

function filterNames(){
  height2 = 0;
  // Get value of input
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  filterValue = "%" + filterValue + "%";
  $("#searchtop5").empty();
  $.ajax({
      url:"http://52.60.155.161/php/nearbuy_main_search.php",
      type:'POST',
      data: "filterValue=" + filterValue,
      success:function(data){
        var searchresult = JSON.parse(data);
        for (const result in searchresult) {
            // $("#searchtop5").append("<p class=\"searchresult\">" + searchresult[result]["name"] + "</p> <a href=\"http://linas-macbook-pro.local/Nearbuy/nearbuy_marketpage.html?market=" + searchresult[result]["id"] + "\">explore</a> <button type=\"button\" href=\"#\">subscribe</button>");
            $("#searchtop5").append("<div class=\"searchrec\"><img src=\"http://52.60.155.161/" + searchresult[result]["image"].substring(2) + "\" alt=\"\" width=\"25\" height=\"25\"><p class=\"smallf\">" + searchresult[result]["name"] + "</p><button id=\"rsubscribe-b" + searchresult[result]["id"] + "\" class=\"small-b blue-b rsubscribe-b\">Subscribe</button><button class=\"small-b grey-b explore\" id=\"" + searchresult[result]["id"] + "\">Explore</button></div>");
            $(document).on( "click", "#" + searchresult[result]["id"], function() {
              window.location.replace("http://52.60.155.161/nearbuy_marketpage.html?market=" + searchresult[result]["id"]);
            });
        height2 = height2 + 1;
        var height = $("#filterInput").height() + (height2*45)
        $("#csearch").css('height', height);
  }
  }
  });
}


function filterAllNames(){
  // Get value of input
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  filterValue = "%" + filterValue + "%";
  $("#searchtop5").empty();
  $.ajax({
      url:"http://52.60.155.161/php/nearbuy_main_allsearch.php",
      type:'POST',
      data: "filterValue=" + filterValue,
      success:function(data){
        $("#nmarketlist").empty();
        var searchresult = JSON.parse(data);
        for (const result in searchresult) {
          $("#nmarketlist").append("<div class=\"channel\"><div class=\"channelr\"><img src=\"http://52.60.155.161/" + searchresult[result]["image"].substring(2) + "\" alt=\"\" width=\"25\" height=\"25\"><span class=\"smallf marketname\">" + searchresult[result]["name"] + "</span></div><div class=\"channelr\"><span class=\"tinyf\">Followers: " + searchresult[result]["subscribers"] + "</span><button id=\"subscribe-b" + searchresult[result]["id"] + "\" class=\"small-b blue-b subscribe-b\">Subscribe</button><button class=\"small-b grey-b explore\" id=\"" + searchresult[result]["id"] + "\">Explore</button></div></div>");
          $(document).on( "click", "#" + searchresult[result]["id"], function() {
            window.location.replace("http://52.60.155.161/nearbuy_marketpage.html?market=" + searchresult[result]["id"]);
          });
  }
  }
  });
}

function displaySubscriptions(){
  $.ajax({
      type: 'POST',
      url: "http://52.60.155.161/php/subscribe_status.php",
      data: "",
      success:function(data){
        var subscriptions = JSON.parse(data);
        for(i = 0; i <= subscriptions.length; i++){
          if($('#rsubscribe-b' + subscriptions[i]).length){
            var marketid = subscriptions[i];
            $('#rsubscribe-b' + marketid).html("Subscribed");
            $('#rsubscribe-b' + marketid).addClass('runsubscribe-b');
            $('#rsubscribe-b' + marketid).removeClass('rsubscribe-b');
            $('#rsubscribe-b' + marketid).css('background', '#868e96');
            $('#rsubscribe-b' + marketid).css('border', '1px solid #868e96');
            $('#rsubscribe-b' + marketid).css('opacity', '0.7');
          }
        }
      }
    });
}
/// Input change for Market Search
// $("#csearch").mouseenter(function(){
// 	$("#filterInput").val("");
// 	$("#filterInput").css('color', '#495057');
//   filterNames();
// });

$("#filterInput").focus(function(){
  $("#filterInput").val("");
	$("#filterInput").css('color', '#495057');
  filterNames();
  displaySubscriptions();
});

$("#filterInput").keyup(function() {
  filterNames();
  displaySubscriptions();
});

$("#filterInput").keypress(function(e){
  if(e.which == 13 && $("#filterInput").val() !== "Seach by name, keyword, etc..." && $("#filterInput").val() !== "") {
    defaultext = $("#filterInput").val();
    $("#filterInput").blur();
    if(minimizebanner === 0){
      defaultcolor = '#495057';
      $("#marketlist").attr('id', 'nmarketlist');
      $(".bigf").eq(0).animate({opacity: 0, marginTop: "-74px"}, { duration: 900, queue: false }, function(){
        $(".bigf").css('margin-top', '0px');
        $(".bigf").eq(0).text('');
      });
      $(".bigf").eq(1).animate({opacity: 0, marginTop: "-88px"}, { duration: 900, queue: false }, function(){
        $(".bigf").css('margin-top', '0px');
        $(".bigf").eq(1).text('');
      });
      $("#banner").animate({height: "100px"}, { duration: 900, queue: false });
      $("#gradient-canvas").animate({height: "100px"}, { duration: 900, queue: false });
      $("#banner").css('padding', '30px');
      $("#searchtop5").css('position', 'absolute');
      $(".searchrec").css('position', 'absolute');
      $(".searchrec").eq(1).css('top', $(".searchrec").height());
      $(".searchrec").eq(2).css('top', $(".searchrec").height()*2);
      $(".searchrec").eq(3).css('top', $(".searchrec").height()*3);
      $(".searchrec").eq(4).css('top', $(".searchrec").height()*4);
      $("#nearchannels").css('padding', '0px');
      minimizebanner = 1;
    }
    filterAllNames();
  }
});

$("#filterInput").blur(function(){
  $("#filterInput").val(defaultext);
  $("#filterInput").css('color', defaultcolor);
});

$("#banner").mouseleave(function() {
  $("#searchtop5").empty();
  $("#filterInput").val(defaultext);
  $("#filterInput").css('color', defaultcolor);
  $("#filterInput").blur();
});

$(document).on('click', '.rsubscribe-b', function(e) {
        var marketid = $(this).attr('id').substring(12);
        alert(marketid);
        $.ajax({
            type: 'POST',
            url: "http://52.60.155.161/php/subscribe.php",
            data: "marketid=" + marketid,
            success:function(data){
              $('#rsubscribe-b' + marketid).html("Subscribed");
              $('#rsubscribe-b' + marketid).addClass('runsubscribe-b');
              $('#rsubscribe-b' + marketid).removeClass('rsubscribe-b');
              $('#rsubscribe-b' + marketid).css('background', '#868e96');
              $('#rsubscribe-b' + marketid).css('border', '1px solid #868e96');
              $('#rsubscribe-b' + marketid).css('opacity', '0.7');
            }
          });
    });

$(document).on('click', '.runsubscribe-b', function(e) {
        var marketid = $(this).attr('id').substring(12);
        $.ajax({
            type: 'POST',
            url: "http://52.60.155.161/php/unsubscribe.php",
            data: "marketid=" + marketid,
            success:function(data){
              $('#rsubscribe-b' + marketid).html("Subscribe");
              $('#rsubscribe-b' + marketid).removeClass('runsubscribe-b');
              $('#rsubscribe-b' + marketid).addClass('rsubscribe-b');
              $('#rsubscribe-b' + marketid).css('background', '#1418ff');
              $('#rsubscribe-b' + marketid).css('border', '1px solid #1418ff');
              $('#rsubscribe-b' + marketid).css('opacity', '1');
            }
          });
    });
