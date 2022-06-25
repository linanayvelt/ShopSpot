$('#createnewitembutton').click(function(e) {
  var form = $('#fpost form')[0];
  var formData = new FormData(form);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const marketid = urlParams.get('market');
  formData.append('marketid', marketid);
  formData.append('hashtag1', $('#inputTag1 span').text());
  formData.append('hashtag2', $('#inputTag2 span').text());
  formData.append('hashtag3', $('#inputTag3 span').text());
  formData.append('hashtag4', $('#inputTag4 span').text());
  formData.append('hashtag5', $('#inputTag5 span').text());
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/market_createnewitempost.php",
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
});
