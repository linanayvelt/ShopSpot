///Slide animation
var left = $('#fmarket').css("left");

$('#marketpreview').click(function(e) {
        var title = $("#inputMarketname").val();
        var details = $("#inputMarketdescription").val();
        if(title !== "eg. University of Toronto" &&
           details !== "Provide some details to help users understand what the market is for." &&
           title &&
           details &&
           ($("#inputTag1").text() ||
           $("#inputTag2").text() ||
           $("#inputTag3").text() ||
           $("#inputTag4").text() ||
           $("#inputTag5").text())){
          $('#fmarket').animate({'left': '-100%'}, 'slow');
          $('#fpreview').animate({'left': '0%'}, 'slow');
          $("#maintitle").text($("#inputMarketname").val());
        }
    });

$('#backtoedit').click(function(e) {
        $('#fmarket').animate({'right': '0%',
                              'left': left}, 'slow');
        $('#fpreview').animate({'left': '100%'}, 'slow');
    });

///Input check
$("#inputMarketname").focus(function(){
	if($("#inputMarketname").val() === "eg. University of Toronto"){
		$("#inputMarketname").val("");
		$("#inputMarketname").css('color', '#495057');
	}
});

$("#inputMarketname").blur(function(){
	if($("#inputMarketname").val() === ""){
		$("#inputMarketname").val("eg. University of Toronto");
		$("#inputMarketname").css('color', '#dce0e3');
	}
});

$("#inputMarketdescription").focus(function(){
	if($("#inputMarketdescription").val() === "Provide some details to help users understand what the market is for."){
		$("#inputMarketdescription").val("");
		$("#inputMarketdescription").css('color', '#495057');
	}
});

$("#inputMarketdescription").blur(function(){
	if($("#inputMarketdescription").val() === ""){
		$("#inputMarketdescription").val("Provide some details to help users understand what the market is for.");
		$("#inputMarketdescription").css('color', '#dce0e3');
	}
});

///Hashtags

$("#inputTags").focus(function(){
	if($("#inputTags").val() === "eg. aptextbook"){
		$("#inputTags").val("");
		$("#inputTags").css('color', '#495057');
	}
});

$("#inputTags").blur(function(){
	if($("#inputTags").val() === ""){
		$("#inputTags").val("eg. aptextbook");
		$("#inputTags").css('color', '#dce0e3');
	}
});

var unused = ["inputTag1", "inputTag2", "inputTag3", "inputTag4", "inputTag5"];
var used = [];
$("#inputTags").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if($("#inputTags").val() !== "eg. aptextbook" && $("#inputTags").val() !== ""){
			var stag = unused[0];
			$("#hashtags").append("<div id=\"" + stag + "\" class=\"hashtag\"><div class=\"cross\"></div><span>" + $("#inputTags").val().trim() + "</span></div>");
			$("#inputTags").val("");

			used.push(stag);
			unused.shift();
		}
	}
	tagCheck();
});

$(document).on('mouseenter', '#inputTag1 .cross' ,function() {
	$('#inputTag1').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag1 .cross' ,function() {
	$('#inputTag1').css('opacity', '1');
});

$(document).on('click', '#inputTag1 .cross' ,function() {
	$('#inputTag1').remove();
	if(unused.indexOf('inputTag1') === -1){
		unused.push('inputTag1');
	}
	var index = used.indexOf('inputTag1');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag2 .cross' ,function() {
	$('#inputTag2').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag2 .cross' ,function() {
	$('#inputTag2').css('opacity', '1');
});

$(document).on('click', '#inputTag2 .cross' ,function() {
	$('#inputTag2').remove();
	if(unused.indexOf('inputTag2') === -1){
		unused.push('inputTag2');
	}
	var index = used.indexOf('inputTag2');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag3 .cross' ,function() {
	$('#inputTag3').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag3 .cross' ,function() {
	$('#inputTag3').css('opacity', '1');
});

$(document).on('click', '#inputTag3 .cross' ,function() {
	$('#inputTag3').remove();
	if(unused.indexOf('inputTag3') === -1){
		unused.push('inputTag3');
	}
	var index = used.indexOf('inputTag3');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag4 .cross' ,function() {
	$('#inputTag4').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag4 .cross' ,function() {
	$('#inputTag4').css('opacity', '1');
});

$(document).on('click', '#inputTag4 .cross' ,function() {
	$('#inputTag4').remove();
	if(unused.indexOf('inputTag4') === -1){
		unused.push('inputTag4');
	}
	var index = used.indexOf('inputTag4');
	used.splice(index, 1);
	tagCheck();
});

$(document).on('mouseenter', '#inputTag5 .cross' ,function() {
	$('#inputTag5').css('opacity', '0.7');
});

$(document).on('mouseleave', '#inputTag5 .cross' ,function() {
	$('#inputTag5').css('opacity', '1');
});

$(document).on('click', '#inputTag5 .cross' ,function() {
	$('#inputTag5').remove();
	if(unused.indexOf('inputTag5') === -1){
		unused.push('inputTag5');
	}
	var index = used.indexOf('inputTag5');
	used.splice(index, 1);
	tagCheck();
});

function tagCheck(){
	if(unused.length === 0){
		$("#inputTags").attr("readonly", true);
		$("#inputTags").css('background', '#e9ecef');
	} else {
		$("#inputTags").attr("readonly", false);
		$("#inputTags").css('background', 'white');
	}
}

///Image drop
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpg'];
        if (e.dataTransfer && e.dataTransfer.files) {
          var fileType = e.dataTransfer.files[0].type;
          if (imageTypes.includes(fileType)) {
            if (e.dataTransfer.files.length) {
              inputElement.files = e.dataTransfer.files;
              updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }
          } else {
            $("#createnewitemerrors").empty();
            $("#createnewitemerrors").append("<p> File dropped is not an image. </p>");
          }
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    document.addEventListener('drop', function(e) {
      // set your image types
    });
    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

      // First time - remove the prompt
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }

      // First time - there is no thumbnail element, so lets create it
      if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
      }

      thumbnailElement.dataset.label = file.name;

      // Show thumbnail for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          document.getElementById("previewimg").src = `${reader.result}`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
    }

///Upload market
$('#createmarket').click(function(e) {
  var form = $('#fmarket form')[0];
  var formData = new FormData(form);
  formData.append('hashtag1', $('#inputTag1 span').text());
  formData.append('hashtag2', $('#inputTag2 span').text());
  formData.append('hashtag3', $('#inputTag3 span').text());
  formData.append('hashtag4', $('#inputTag4 span').text());
  formData.append('hashtag5', $('#inputTag5 span').text());
  e.preventDefault();
          $.ajax({
              type: 'POST',
              contentType: false,
              processData: false,
              url: "http://52.60.155.161/php/nearbuy_newmarket.php",
              data: formData,
              success:function(data){
                alert(data);
                    // if(data !== ""){
                    //   $("#createnewitemerrors").empty();
                    //   $("#createnewitemerrors").append("<p>" + data + "</p>");
                    // } else {
                    //   $("#createnewitemerrors").empty();
                    //   $("#createnewitemerrors").append("<p> Item uploaded successfully. </p>");
                    // }
              }
            });
});
