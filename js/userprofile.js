userdata = 0;
$(document).on('click','#userlogin',function(e) {
  window.location.replace("http://52.60.155.161/signupandlogin.html");
});

$(document).ready(function() {
  $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      url: "http://52.60.155.161/php/display_user.php",
      data: "",
      success:function(data){
            if(data){
              var users = JSON.parse(data);
              userdata = users;
                $("#userlogin").remove();
                $("#userdiv").append("<div id=\"bcenter\"><button type=\"button\" id=\"home\" class=\"medium-b clear-b\">Home</button><button type=\"button\" id=\"search\" class=\"medium-b clear-b\">Search</button><button type=\"button\" id=\"messages\" class=\"medium-b clear-b\">Messages</button></div><button type=\"button\" id=\"userprofile\" class=\"medium-b blue-b\">@" + users["username"] + "</button>");
                $(document).on('click','#messages',function(e) {
                  window.location.replace("http://52.60.155.161/nearbuy_messages.html");
                });
                checkStatus();
                statusinterval =  setInterval(function(){
                              checkStatus();
                            }, 10000);
                var width = $(window).width();
                if(width < 750){
                  $("#howtouse").remove();
                  $("#bcenter").css('right','');
                } else {
                  width = width/2 - 150;
                  $("#bcenter").css('right', width);
                  if(!$("#howtouse").length){
                      $("#userdiv img").after("<button type=\"button\" id=\"howtouse\" class=\"medium-b grey-b\">How to use Nearbuy?</button>");
                  }
                }
            }
      }
    });
});

$(document).on('click','#userprofile',function(e) {
  $("#userdiv").append("<div id=\"pmenu\"></div>");
  $("#pmenu").append("<button type=\"button\" id=\"userviewprofile\" class=\"medium-b clear-b\">View Profile</button>");
    $(document).on('click','#userviewprofile',function(e) {
      window.location.replace("http://52.60.155.161/nearbuy_viewprofile.html");
    });
  $("#pmenu").append("<button type=\"button\" id=\"userposts\" class=\"medium-b clear-b\">My Posts</button>");
  $(document).on('click','#userposts',function(e) {
    window.location.replace("http://52.60.155.161/nearbuy_viewitems.html");
  });
  $("#pmenu").append("<button type=\"button\" id=\"usermessages\" class=\"medium-b clear-b\">Messages</button>");
  // $(document).on('click','#usermessages',function(e) {
  //   window.location.replace("http://linas-macbook-pro.local/Nearbuy/nearbuy_messages.html");
  // });
  $("#pmenu").append("<button type=\"button\" id=\"userlogout\" class=\"medium-b clear-b\">Log Out</button>");
    $(document).on('click','#userlogout',function(e) {
      window.location.replace("http://52.60.155.161/logout.html");
    });
  // $.ajax({
  //             type: 'POST',
  //             contentType: false,
  //             processData: false,
  //             url: "http://linas-macbook-pro.local/Nearbuy/php/market_createnewrequestpost.php",
  //             data: formData,
  //             success:function(data){
  //                   if(data !== ""){
  //                     $("#createnewrequesterrors").empty();
  //                     $("#createnewrequesterrors").append("<p>" + data + "</p>");
  //                   } else {
  //                     $("#createnewrequesterrors").empty();
  //                     $("#createnewrequesterrors").append("<p> Request uploaded successfully. </p>");
  //                   }
  //             }
  //           });
});

$("header").on( 'mouseleave', '#pmenu', function() {
  $("#pmenu").remove();
});


function checkStatus(){
  $.ajax({
      type: 'POST',
      url: "http://52.60.155.161/php/getmessagestatus.php",
      data: "statusaction=getcon",
      success:function(data){
            if(data){
              var addnow = 0;
              var conversations = JSON.parse(data);
              for (const conversation in conversations) {
                if(parseInt(conversations[conversation]["unreadid"]) && !$("#messages .bnotification").length){
                  $("#messages").append("<div class=\"bnotification\"></div>");
                  addnow = 1;
                } else if(!parseInt(conversations[conversation]["unreadid"]) && $("#messages .bnotification").length && !addnow){
                  $("#messages").empty();
                  $("#messages").text("Messages");
                }
              }
            }
      }
});
}
