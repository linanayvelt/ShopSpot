$.ajax({
    url:"http://linas-macbook-pro.local/Nearbuy/php/view_marketitems.php",
    type:'POST',
    data: "",
    success:function(data){
      var marketitems = JSON.parse(data);
      for (const item in marketitems) {
        if (marketitems[item]["image1"]){
          marketitems[item]["image1"] = marketitems[item]["image1"].substring(2);
          $("#profileitemlist").append("<img src=\"http://linas-macbook-pro.local/Nearbuy/" + marketitems[item]["image1"] + "\" width=\"50\" height=\"50\">");
        }
        if (marketitems[item]["image2"]){
          marketitems[item]["image2"] = marketitems[item]["image2"].substring(2);
          $("#profileitemlist").append("<img src=\"http://linas-macbook-pro.local/Nearbuy/" + marketitems[item]["image2"] + "\" width=\"50\" height=\"50\">");
        }
        if (marketitems[item]["image3"]){
          marketitems[item]["image3"] = marketitems[item]["image3"].substring(2);
          $("#profileitemlist").append("<img src=\"http://linas-macbook-pro.local/Nearbuy/" + marketitems[item]["image3"] + "\" width=\"50\" height=\"50\">");
        }

          $("#profileitemlist").append("<p>" + marketitems[item]["name"] + "</p>" + "<p>" + marketitems[item]["price"] + "</p>"
                                + "<p>" + marketitems[item]["quality"] + "</p>" + "<p>" + marketitems[item]["description"] + "</p>"
                                + "<p>" + marketitems[item]["datenow"] + "</p>" + "<input type=\"hidden\" value=\"" + marketitems[item]["itemid"] + "\">");

          if (marketitems[item]["hashtag1"]){
            $("#profileitemlist").append("<p> hashtag = " + marketitems[item]["hashtag1"] + "</p>");
          }

          if (marketitems[item]["hashtag2"]){
            $("#profileitemlist").append("<p> hashtag = " + marketitems[item]["hashtag2"] + "</p>");
          }

          if (marketitems[item]["hashtag3"]){
            $("#profileitemlist").append("<p> hashtag = " + marketitems[item]["hashtag3"] + "</p>");
          }

          if (marketitems[item]["hashtag4"]){
            $("#profileitemlist").append("<p> hashtag = " + marketitems[item]["hashtag4"] + "</p>");
          }

          if (marketitems[item]["hashtag5"]){
            $("#profileitemlist").append("<p> hashtag = " + marketitems[item]["hashtag5"] + "</p>");
          }

          $("#profileitemlist").append("<button type=\"button\" id=" + marketitems[item]["itemid"] + "> Edit </button>");
          $(document).on('click','#' + marketitems[item]["itemid"],function(e) {
            window.location.replace("http://linas-macbook-pro.local/Nearbuy/nearbuy_edititem.html?item=" + marketitems[item]["itemid"]);
          });
}
}
});

$.ajax({
    url:"http://linas-macbook-pro.local/Nearbuy/php/view_marketrequests.php",
    type:'POST',
    data: "",
    success:function(data){
      var marketrequests = JSON.parse(data);
      for (const request in marketrequests) {
        $("#requestlist").append("<p>" + marketrequests[request]["name"] + "</p>"
                              + "<p>" + marketrequests[request]["datenow"] + "</p>");

        if (marketrequests[request]["hashtag1"]){
          $("#requestlist").append("<p> hashtag = " + marketrequests[request]["hashtag1"] + "</p>");
        }

        if (marketrequests[request]["hashtag2"]){
          $("#requestlist").append("<p> hashtag = " + marketrequests[request]["hashtag2"] + "</p>");
        }

        if (marketrequests[request]["hashtag3"]){
          $("#requestlist").append("<p> hashtag = " + marketrequests[request]["hashtag3"] + "</p>");
        }

        if (marketrequests[request]["hashtag4"]){
          $("#requestlist").append("<p> hashtag = " + marketrequests[request]["hashtag4"] + "</p>");
        }

        if (marketrequests[request]["hashtag5"]){
          $("#requestlist").append("<p> hashtag = " + marketrequests[request]["hashtag5"] + "</p>");
        }

        $("#requestlist").append("<button type=\"button\" id=" + marketrequests[request]["requestid"] + "> Edit </button>");
        $(document).on('click','#' + marketrequests[request]["requestid"],function(e) {
          window.location.replace("http://linas-macbook-pro.local/Nearbuy/nearbuy_editrequest.html?request=" + marketrequests[request]["requestid"]);
        });
}
}
});
