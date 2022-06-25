$('#createnewrequestbutton').click(function(e) {
  var form = $('#frequest form')[0];
  var formData = new FormData(form);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const marketid = urlParams.get('market');
  formData.append('marketid', marketid);
  formData.append('requesthashtag1', $('#inputRequestag1 span').text());
  formData.append('requesthashtag2', $('#inputRequestag2 span').text());
  formData.append('requesthashtag3', $('#inputRequestag3 span').text());
  formData.append('requesthashtag4', $('#inputRequestag4 span').text());
  formData.append('requesthashtag5', $('#inputRequestag5 span').text());
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/market_createnewrequestpost.php",
              data: formData,
              success:function(data){
                    if(data !== ""){
                      $("#createnewrequesterrors").empty();
                      $("#createnewrequesterrors").append("<p>" + data + "</p>");
                    } else {
                      $("#createnewrequesterrors").empty();
                      $("#createnewrequesterrors").append("<p> Request uploaded successfully. </p>");
                    }
              }
            });
});
