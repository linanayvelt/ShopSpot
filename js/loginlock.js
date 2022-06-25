$(document).ready(function() {
              $.ajax({
                  type: 'POST',
                  url: "http://52.60.155.161/php/loginlock.php",
                  data: "",
                  success:function(data){
                    if(data){
                      window.location.replace("http://52.60.155.161/signupandlogin.html");
                    }
                  }
                });
    });
