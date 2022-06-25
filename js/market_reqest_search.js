// //Search bar
document.querySelector('#filterequestInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      filterRequests();
    }
});

function filterRequests(){
  // Get value of input
  let filterValue = document.getElementById('filterequestInput').value.toUpperCase();
  filterValue = "%" + filterValue + "%";
  $("#requestlist").empty();

  $.ajax({
      url:"http://linas-macbook-pro.local/Nearbuy/php/market_request_search.php",
      type:'POST',
      data: "filterValue=" + filterValue + "&marketid=" + marketid,
      success:function(data){
                alert(data);
          var marketrequests = JSON.parse(data);
          for (const request in marketrequests) {
              $("#requestlist").append("<p>" + marketrequests[request]["name"] + "</p>" + "<p>" + marketrequests[request]["datenow"] + "</p>");


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
  }
  }
  });
}
