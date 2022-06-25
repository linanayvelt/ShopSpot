// let postbutton = document.getElementById('postbutton');
// postbutton.addEventListener('keyup', filterItems);
$("#marketrequests").hide(300);

$("#postbutton").click(function(){
  $("#marketposts").show(300);
  $("#marketrequests").hide(300);
});

// let requestbutton = document.getElementById('requestbutton');
// requestbutton.addEventListener('keyup', filterItems);

$("#requestbutton").click(function(){
  $("#marketposts").hide(300);
  $("#marketrequests").show(300);
});
