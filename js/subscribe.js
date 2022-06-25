$(document).ready(function(e) {
          $.ajax({
              type: 'POST',
              url: "http://52.60.155.161/php/subscribe_status.php",
              data: "",
              success:function(data){
                var subscriptions = JSON.parse(data);
                for(i = 0; i <= subscriptions.length; i++){
                  if($('#subscribe-b' + subscriptions[i]).length){
                    var marketid = subscriptions[i];
                    $('#subscribe-b' + marketid).html("Subscribed");
                    $('#subscribe-b' + marketid).addClass('unsubscribe-b');
                    $('#subscribe-b' + marketid).removeClass('subscribe-b');
                    $('#subscribe-b' + marketid).css('background', '#868e96');
                    $('#subscribe-b' + marketid).css('border', '1px solid #868e96');
                    $('#subscribe-b' + marketid).css('opacity', '0.7');
                  }
                }
              }
            });
    });


$(document).on('click', '.subscribe-b', function(e) {
        var marketid = $(this).attr('id').substring(11);
        $.ajax({
            type: 'POST',
            url: "http://52.60.155.161/php/subscribe.php",
            data: "marketid=" + marketid,
            success:function(data){
              $('#subscribe-b' + marketid).html("Subscribed");
              $('#subscribe-b' + marketid).addClass('unsubscribe-b');
              $('#subscribe-b' + marketid).removeClass('subscribe-b');
              $('#subscribe-b' + marketid).css('background', '#868e96');
              $('#subscribe-b' + marketid).css('border', '1px solid #868e96');
              $('#subscribe-b' + marketid).css('opacity', '0.7');
            }
          });
    });

$(document).on('click', '.unsubscribe-b', function(e) {
        var marketid = $(this).attr('id').substring(11);
        $.ajax({
            type: 'POST',
            url: "http://52.60.155.161/php/unsubscribe.php",
            data: "marketid=" + marketid,
            success:function(data){
              $('#subscribe-b' + marketid).html("Subscribe");
              $('#subscribe-b' + marketid).removeClass('unsubscribe-b');
              $('#subscribe-b' + marketid).addClass('subscribe-b');
              $('#subscribe-b' + marketid).css('background', '#1418ff');
              $('#subscribe-b' + marketid).css('border', '1px solid #1418ff');
              $('#subscribe-b' + marketid).css('opacity', '1');
            }
          });
    });
