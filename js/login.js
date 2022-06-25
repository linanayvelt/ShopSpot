$('#loginbutton').click(function(e) {
        let usernameoremail = document.getElementById('inputUsernameorEmail').value;
        let loginpassword = document.getElementById('inputLoginPassword').value;
        e.preventDefault();
              $.ajax({
                  type: 'POST',
                  url: "http://52.60.155.161/php/login.php",
                  data: "usernameoremail=" + usernameoremail + "&loginpassword=" + loginpassword,
                  success:function(data){
                        if(data !== ""){
                          $("#loginerrors").empty();
                          $("#loginerrors").append("<p>" + data + "</p>");
                        } else {
                          history.go(-1);
                        }
                  }
                });
        return false;
    });
