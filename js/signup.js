$(document).ready(function(){
  $("#gradient-canvas").css('height', $(window).height());
})

$(window).resize(function(){
  $("#gradient-canvas").css('height', $(window).height());
})

$('#signupbutton').click(function(e) {
        let name = document.getElementById('inputName').value;
        let lastname = document.getElementById('inputLastName').value;
        let username = document.getElementById('inputUsername').value;
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('inputPassword').value;
        let confirmpassword = document.getElementById('inputConfirmPassword').value;
        e.preventDefault();
        if(name && lastname && username && email && password && confirmpassword){
          if (password === confirmpassword){
            if (email.includes("@")){
              $.ajax({
                  type: 'POST',
                  url: "http://52.60.155.161/php/signup.php",
                  data: "name=" + name + "&lastname=" + lastname + "&username=" + username + "&email=" + email + "&password=" + password,
                  success:function(data){
                        if(data !== ""){
                          $("#errors").empty();
                          $("#errors").append("<p>" + data + "</p>");
                        } else {
                          $("#errors").empty();
                          $("#errors").append("<p> Please confirm your email before logging in. </p>");
                        }
                  }
                });
            } else {
              $("#errors").empty();
              $("#errors").append("<p>Invalid email address.</p>");
            }
          } else {
            $("#errors").empty();
            $("#errors").append("<p>Passwords do not match.</p>");
          }
        } else {
          $("#errors").empty();
          $("#errors").append("<p>Required fields left blank.</p>");
        }
        return false;
    });
