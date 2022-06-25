userdata = 0;

$('#marketbanner .edit-b').click(function(){
  $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      url: "http://52.60.155.161/php/display_user.php",
      data: "",
      success:function(data){
            if(data){
              $("#fprofile input").css('color', '#495057');
              var users = JSON.parse(data);
              userdata = users;
                $('#inputUsername').val(users["username"]);
                $('#inputName').val(users["name"]);
                $('#inputLastName').val(users["lastname"]);
                $('#inputEmail').val(users["email"]);
            }
      }
    });
});

$('#editusernamebutton').click(function(e) {
  var form = $('#editusername')[0];
  var formData = new FormData(form);
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/edit_profileusername.php",
              data: formData,
              success:function(data){
                    if(data !== ""){
                      $("#editusernameerrors").empty();
                      $("#editusernameerrors").append("<p>" + data + "</p>");
                    } else {
                      $("#editusernameerrors").empty();
                      $("#editusernameerrors").append("<p> Profile edited successfully. </p>");
                    }
              }
            });
});

$('#editnamebutton').click(function(e) {
  var form = $('#editname')[0];
  var formData = new FormData(form);
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/edit_profilename.php",
              data: formData,
              success:function(data){
                    if(data !== ""){
                      $("#editnameerrors").empty();
                      $("#editnameerrors").append("<p>" + data + "</p>");
                    } else {
                      $("#editnameerrors").empty();
                      $("#editnameerrors").append("<p> Profile edited successfully. </p>");
                    }
              }
            });
});


$('#editemailbutton').click(function(e) {
  var form = $('#editemail')[0];
  var formData = new FormData(form);
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/edit_profileemail.php",
              data: formData,
              success:function(data){
                    if(data !== ""){
                      $("#editemailerrors").empty();
                      $("#editemailerrors").append("<p>" + data + "</p>");
                    } else {
                      $("#editemailerrors").empty();
                      $("#editemailerrors").append("<p> Profile edited successfully. </p>");
                      window.location.replace("http://52.60.155.161/nearbuy_main.html");
                    }
              }
            });
});


$('#editpasswordbutton').click(function(e) {
  var form = $('#editpassword')[0];
  var formData = new FormData(form);
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/edit_profilepassword.php",
              data: formData,
              success:function(data){
                    if(data !== ""){
                      $("#editpassworderrors").empty();
                      $("#editpassworderrors").append("<p>" + data + "</p>");
                    } else {
                      $("#editpassworderrors").empty();
                      $("#editpassworderrors").append("<p> Profile edited successfully. </p>");
                      window.location.replace("http://52.60.155.161/nearbuy_main.html");
                    }
              }
            });
});
