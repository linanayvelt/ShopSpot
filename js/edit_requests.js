const requestqueryString = window.location.search;
const requesturlParams = new URLSearchParams(requestqueryString);
const requestid = urlParams.get('request');
var marketrequests = 0;
var changeaction = "prt";

$.ajax({
    url:"http://linas-macbook-pro.local/Nearbuy/php/edit_marketrequests.php",
    type:'POST',
    data: "requestid=" + requestid + "&changeaction=" + changeaction,
    success:function(data){
      marketrequests = JSON.parse(data);
      for (const request in marketrequests) {
        $('#inputTitle').val(marketrequests[request]["name"]);
        $('#inputTag1').val(marketrequests[request]["hashtag1"]);
        $('#inputTag2').val(marketrequests[request]["hashtag2"]);
        $('#inputTag3').val(marketrequests[request]["hashtag3"]);
        $('#inputTag4').val(marketrequests[request]["hashtag4"]);
        $('#inputTag5').val(marketrequests[request]["hashtag5"]);

}
}
});

$('#editrequestbutton').click(function(e) {
  e.preventDefault();
  let title = document.getElementById('inputTitle').value;
  let hashtag1 = document.getElementById('inputTag1').value;
  let hashtag2 = document.getElementById('inputTag2').value;
  let hashtag3 = document.getElementById('inputTag3').value;
  let hashtag4 = document.getElementById('inputTag4').value;
  let hashtag5 = document.getElementById('inputTag5').value;

  if(!(title === marketrequests[0]["name"]) || !(hashtag1 === marketrequests[0]["hashtag1"]) || !(hashtag2 === marketrequests[0]["hashtag2"]) || !(hashtag3 === marketrequests[0]["hashtag3"]) || !(hashtag4 === marketrequests[0]["hashtag4"]) ||
    !(hashtag5 === marketrequests[0]["hashtag5"])){
       changeaction = "edt";
       var form = $('form')[0];
       var formData = new FormData(form);
       formData.append('changeaction', changeaction);
       formData.append('requestid', marketrequests[0]["requestid"]);
       formData.append('marketid', marketrequests[0]["marketid"]);
       $.ajax({
           type: 'POST',
           contentType: false,
           processData: false,
           url: "http://linas-macbook-pro.local/Nearbuy/php/edit_marketrequests.php",
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
  });
