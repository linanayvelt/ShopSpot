// //Search bar
document.querySelector('#filteritemInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      filterItems();
    }
});

function filterItems(){
  // Get value of input
  let filterValue = document.getElementById('filteritemInput').value.toUpperCase();
  filterValue = "%" + filterValue + "%";
  $("#itemlist").empty();

  $.ajax({
      url:"http://linas-macbook-pro.local/Nearbuy/php/market_item_search.php",
      type:'POST',
      data: "filterValue=" + filterValue + "&marketid=" + marketid,
      success:function(data){
                alert(data);
          var marketitems = JSON.parse(data);
          for (const item in marketitems) {
              $("#itemlist").append("<p>" + marketitems[item]["name"] + "</p>" + "<p>" + marketitems[item]["price"] + "</p>"
                                    + "<p>" + marketitems[item]["quality"] + "</p>" + "<p>" + marketitems[item]["description"] + "</p>"
                                    + "<p>" + marketitems[item]["datenow"] + "</p>");


              if (marketitems[item]["hashtag1"]){
                $("#itemlist").append("<p> hashtag = " + marketitems[item]["hashtag1"] + "</p>");
              }

              if (marketitems[item]["hashtag2"]){
                $("#itemlist").append("<p> hashtag = " + marketitems[item]["hashtag2"] + "</p>");
              }

              if (marketitems[item]["hashtag3"]){
                $("#itemlist").append("<p> hashtag = " + marketitems[item]["hashtag3"] + "</p>");
              }

              if (marketitems[item]["hashtag4"]){
                $("#itemlist").append("<p> hashtag = " + marketitems[item]["hashtag4"] + "</p>");
              }

              if (marketitems[item]["hashtag5"]){
                $("#itemlist").append("<p> hashtag = " + marketitems[item]["hashtag5"] + "</p>");
              }
  }
  }
  });
}
