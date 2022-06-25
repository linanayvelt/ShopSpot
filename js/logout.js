$(document).ready(function() {
              $.ajax({
                  type: 'POST',
                  url: "http://52.60.155.161/php/logout.php",
                  data: "",
                  success:function(data){
                        if(data !== ""){
                          $("#logouterrors").empty();
                          $("#logouterrors").append("<p>" + data + "</p>");
                        } else {
                          $("#logouterrors").empty();
                          $("#logouterrors").append("<p> Logged out. </p>");
                        }
                  }
                });
        return false;
    });
