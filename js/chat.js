var caction = "cnv";
conversationid = 0;

$(document).ready(function() {
  createMessages();
  conversationStatus();
  interval =  setInterval(function(){
                loadMessages(conversationid);
                conversationStatus();
              }, 10000);
});

function createMessages(){
  $.ajax({
        type: 'POST',
        url: "http://52.60.155.161/php/messages.php",
        data: "changeaction=" + "cnv",
        success:function(data){
              if(data){
                var conversations = JSON.parse(data);
                for (const conversation in conversations) {
                  createConversation(conversations[conversation]);
                }
                $("#messagelistof" + conversations[0]["conversationid"]).show(0);
                $("#formof" + conversations[0]["conversationid"]).show(0);
                $("#chatwith" + conversations[0]["conversationid"]).css('background', '#1418ff');
                $("#chatwith" + conversations[0]["conversationid"] + " .cnames").css('color', 'white');
                $("#chatwith" + conversations[0]["conversationid"] + " .cnames").css('opacity', '0.9');
                $("#date" + conversations[0]["conversationid"]).css('color', 'white');
                $("#date" + conversations[0]["conversationid"]).css('opacity', '0.9');
                $("#chatwith" + conversations[0]["conversationid"] + " .cusername").css('color', 'white');
                $("#chatwith" + conversations[0]["conversationid"] + " .cusername").css('opacity', '0.7');
                $("#chatwith" + conversations[0]["conversationid"] + " .ccontext").css('color', 'white');
                $("#chatwith" + conversations[0]["conversationid"] + " .ccontext").css('opacity', '0.7');
                if (conversations[0]["unreadid"]){
                  $("#status" + conversations[0]["conversationid"]).removeClass("cblue").addClass("cwhite");
                }
                conversationid = conversations[0]["conversationid"];
                reSize(conversations[0]["conversationid"]);
                loadMessages(conversations[0]["conversationid"]);
                readMessages(conversations[0]["conversationid"]);
              }
        }
      });
}

$(document).on('click','.cbinput .medium-b', function(e) {
    var id = $(this).attr('id').replace('buttonof','');
    e.preventDefault();
    postMessages(id);
});

function createConversation(conversation){
  $("#messagesb").prepend("<div id=\"messagelistof" + conversation["conversationid"] + "\" class=\"cmessage\"></div>");
  $(".cmessage").hide(0);

  $("#messagesb").append("<form action=\"\" method=\"POST\" id=\"formof" + conversation["conversationid"] + "\" class=\"cbinput\" enctype=\"multipart/form-data\"><textarea type=\"text\" name=\"message\" class=\"imessage\" value=\"Type message here...\" rows=\"3\">Message</textarea><button type=\"button\" id=\"buttonof" + conversation["conversationid"] + "\" class=\"medium-b blue-b\">Send</button></button></form>");
  $(".cbinput").hide(0);

  var today = new Date();
  let date;
  if(today.getMonth()+1 < 10){
    date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
    yesterday = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+(today.getDate()-1);
  } else {
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
  }

  if(conversation["datenow"].substring(0,10) === date){
    conversation["datenow"] = conversation["datenow"].substring(11,16);
  } else if (conversation["datenow"].substring(0,10) === yesterday){
    conversation["datenow"] = "Yesterday";
  } else {
    conversation["datenow"] = conversation["datenow"].substring(0,10);
  }

  $("#conversationsb").append("<div id=\"chatwith" + conversation["conversationid"] + "\" class=\"cuser\"><div id=\"status" + conversation["conversationid"] + "\" class=\"status\"></div><div class=\"cnames\"><span>" + conversation["name"] + "</span><span> " + conversation["lastname"] + "</span><span class=\"cusername\"> (@" + conversation["talkingto"] + ")</span><span id=\"date" + conversation["conversationid"] + "\" class=\"cdate\">" + conversation["datenow"] + "</span></div><div class=\"ccontext\"><span>" + conversation["subject"] + "</span></div></div>");
  if(parseInt(conversation["unreadid"])){
    $("#status" + conversation["conversationid"]).addClass("cblue");
  }
  $(document).on('click','#chatwith' + conversation["conversationid"],function() {
    reSize(conversation["conversationid"]);
    loadMessages(conversation["conversationid"]);
    clearInterval(interval);
    interval =  setInterval(function(){
                  loadMessages(conversation["conversationid"]);
                  conversationStatus();
                }, 10000);
    readMessages(conversation["conversationid"]);
    $(".cuser").css('background', 'transparent');
    $(".cuser .cnames").css('color', '#495057');
    $(".cuser .cnames").css('opacity', '1');
    $(".cuser .cusername").css('color', '#868e96');
    $(".cuser .cusername").css('opacity', '1');
    $(".cuser .cdate").css('color', '#868e96');
    $(".cuser .cdate").css('opacity', '1');
    $(".cuser .ccontext").css('color', '#868e96');
    $(".cuser .ccontext").css('opacity', '1');
    $(".cuser .cwhite").removeClass("cwhite").addClass("cblue");
    $("#chatwith" + conversation["conversationid"]).css('background', '#1418ff');
    $("#chatwith" + conversation["conversationid"] + " .cnames").css('color', 'white');
    $("#chatwith" + conversation["conversationid"] + " .cnames").css('opacity', '0.9');
    $("#date" + conversation["conversationid"]).css('color', 'white');
    $("#date" + conversation["conversationid"]).css('opacity', '0.9');
    $("#chatwith" + conversation["conversationid"] + " .cusername").css('color', 'white');
    $("#chatwith" + conversation["conversationid"] + " .cusername").css('opacity', '0.7');
    $("#chatwith" + conversation["conversationid"] + " .ccontext").css('color', 'white');
    $("#chatwith" + conversation["conversationid"] + " .ccontext").css('opacity', '0.7');
    if (parseInt(conversation["unreadid"])){
      $("#status" + conversation["conversationid"]).removeClass("cblue").addClass("cwhite");
    }
    $(".cmessage").hide(0);
    $(".cbinput").hide(0);
    $("#messagelistof" + conversation["conversationid"]).show(0);
    $("#formof" + conversation["conversationid"]).show(0);
    conversationid = conversation["conversationid"];
  });
}

function loadMessages(conversationid){
  var changeaction = 'showmsg';
  $.ajax({
        type: 'POST',
        url: "http://52.60.155.161/php/messages.php",
        data: "changeaction=" + changeaction + "&conversationid=" + conversationid,
        success:function(data){
              if(data){
                $("#messagelistof" + conversationid).empty();
                var messages = JSON.parse(data);
                var pmessage = 0;
                for (const message in messages) {
                  // "<p>" + messages[message]["username"] + ": " + messages[message]["message"] + "</p>"
                  if(message-1 >= 0){
                    if(parseInt(messages[message-1]["timesent"].substring(0,4)) !== parseInt(messages[message]["timesent"].substring(0,4)) || parseInt(messages[message-1]["timesent"].substring(6,7)) !== parseInt(messages[message]["timesent"].substring(6,7)) || parseInt(messages[message-1]["timesent"].substring(8,9)) !== parseInt(messages[message]["timesent"].substring(8,9))){
                      var today = new Date();
                      let date;
                      if (today.getMonth()+1 < 10 && today.getDate() < 10){
                        date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                        yesterday = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+(today.getDate()-1);
                      } else if (today.getMonth()+1 < 10){
                        date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                        yesterday = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+(today.getDate()-1);
                      } else if (today.getDate() < 10){
                        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                        yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+(today.getDate()-1);
                      } else {
                        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
                      }

                      if(messages[message]["timesent"].substring(0,10) === date){
                        $("#messagelistof" + conversationid).append("<div class=\"message ddate\"><p>Today" + " at " + messages[message]["timesent"].substring(12,16) + "</p></div>");
                      } else if (messages[message]["timesent"].substring(0,10) === yesterday){
                        $("#messagelistof" + conversationid).append("<div class=\"message ddate\"><p>Yesterday" + " at " + messages[message]["timesent"].substring(12,16) + "</p></div>");
                      } else {
                        $("#messagelistof" + conversationid).append("<div class=\"message ddate\"><p>" + messages[message]["timesent"].substring(0,10) + " at " + messages[message]["timesent"].substring(12,16) + "</p></div>");
                      }
                    }
                  } else {
                    $("#messagelistof" + conversationid).append("<div class=\"message ddate\"><p>" + messages[message]["timesent"].substring(0,10) + " at " + messages[message]["timesent"].substring(12,16) + "</p></div>");
                  }
                  if(messages[message]["senderusername"]){
                    $("#messagelistof" + conversationid).append("<div class=\"message user1\">" + messages[message]["message"] + "</div>");
                  }
                  if(messages[message]["receiverusername"]){
                    $("#messagelistof" + conversationid).append("<div class=\"message user2\">" + messages[message]["message"] + "</div>");
                  }
              }
              }
        }
      });
}

    function postMessages(conversationid){
      var changeaction = "sendmsg"
      var form = $("#formof" + conversationid)[0];
      var formData = new FormData(form);
      formData.append('changeaction', changeaction);
      formData.append('conversationid', conversationid);
      $.ajax({
            type: 'POST',
            contentType: false,
            processData: false,
            url: "http://52.60.155.161/php/messages.php",
            data: formData,
            success:function(data){
              loadMessages(conversationid);
              $("#conversationsb").prepend($("#chatwith" + conversationid));
              var today = new Date();
              let date;
              if(today.getMinutes() < 10){
                date = today.getHours() + ":0" + today.getMinutes();
              } else {
                date = today.getHours() + ":" + today.getMinutes();
              }
              $("#date" + conversationid).text(date);
            }
          });
    }

    function readMessages(conversationid){
          $.ajax({
                type: 'POST',
                url: "http://52.60.155.161/php/updatemessagestatus.php",
                data: "conversationid=" + conversationid,
                success:function(data){
                      if(data){
                      } else {
                        $("#status" + conversationid).removeClass("cblue");
                        $("#status" + conversationid).removeClass("cwhite");
                      }
                }
              });
    }

    function conversationStatus(){
          $.ajax({
                type: 'POST',
                url: "http://52.60.155.161/php/getmessagestatus.php",
                data: "statusaction=getcon",
                success:function(data){
                      if(data){
                        var conversations = JSON.parse(data);
                        for (const conversation in conversations) {
                          if($("#chatwith" + conversations[conversation]["conversationid"]).length){
                            if(parseInt(conversations[conversation]["unreadid"])){
                              $("#status" + conversations[conversation]["conversationid"]).addClass("cblue");
                              $("#conversationsb").prepend($("#chatwith" + conversations[conversation]["conversationid"]));
                              var today = new Date();
                              let date;
                              if(today.getMinutes() < 10){
                                date = today.getHours() + ":0" + today.getMinutes();
                              } else {
                                date = today.getHours() + ":" + today.getMinutes();
                              }
                              $("#date" + conversationid).text(date);
                            }
                          } else {
                            $.ajax({
                                  type: 'POST',
                                  url: "http://52.60.155.161/php/getmessagestatus.php",
                                  data: "statusaction=newcon&conversationid=" + conversations[conversation]["conversationid"],
                                  success:function(data){
                                        if(data){
                                          var conversations = JSON.parse(data);
                                          for (const conversation in conversations) {
                                              createConversation(conversations[conversation]);
                                        }
                                        }
                                  }
                                });
                          }
                      }
                      }
                }
              });
    }

    function reSize(id){
      var height = $(window).height() - 70;
      var width = $(window).width() - 305;
      $("#conversationsb").css('height', height);
      $("#messagesb").css('height', height);
      $("#messagesb").css('width', width);
      var fheight = height - 82;
      var iwidth = $("#messagesb").width() - 90;
      $(".imessage").css('width', iwidth);
       // - $('.tmessage').height();
      $(".cmessage").css('height', fheight);
      $(".user1").css('max-width', width/2);
      $(".user2").css('max-width', width/2);
      $(".ddate").css('width', width);
    }

    $(window).resize(function() {
      var height = $(window).height() - 70;
      var width = $(window).width() - 305;
      $("#conversationsb").css('height', height);
      $("#messagesb").css('height', height);
      $("#messagesb").css('width', width);
      var fheight = height - 82;
      var iwidth = $("#messagesb").width() - 90;
      $(".imessage").css('width', iwidth);
       // - $('.tmessage').height();
      $(".cmessage").css('height', fheight);
      $(".user1").css('max-width', width/2);
      $(".user2").css('max-width', width/2);
      $(".ddate").css('width', width);
    });
