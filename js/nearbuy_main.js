///load all of the markers using AJAX
$.ajax({
    url:"http://52.60.155.161/php/nearbuy_main.php",
    type:'get',
    data:'',
    success:function(data){
      var marketdata = JSON.parse(data);
      for (const market in marketdata) {
          $("#marketlist").append("<div class=\"channel\"><div class=\"channelr\"><img src=\"http://52.60.155.161/" + marketdata[market]["image"].substring(2) + "\" alt=\"\" width=\"25\" height=\"25\"><span class=\"smallf marketname\">" + marketdata[market]["name"] + "</span></div><div class=\"channelr\"><span class=\"tinyf\">Followers: " + marketdata[market]["subscribers"] + "</span><button id=\"subscribe-b" + marketdata[market]["id"] + "\" class=\"small-b blue-b subscribe-b\">Subscribe</button><button class=\"small-b grey-b explore\" id=\"" + marketdata[market]["id"] + "\">Explore</button></div></div>");
          $(document).on( "click", "#" + marketdata[market]["id"], function() {
            window.location.replace("http://52.60.155.161/nearbuy_marketpage.html?market=" + marketdata[market]["id"]);
          });
}
}
});
