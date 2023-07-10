/*
jQuery( document ).ready(function() {
	jQuery.featherlight({
		iframe: 			'editor.html', 
		iframeMaxWidth: 	'80%', 
		iframeWidth: 		960,
		iframeHeight: 		600
	});
});
*/

jQuery(document).ready(function ($) {
  // Uploading files
  var file_frame;

  jQuery.fn.upload_listing_image = function (button) {
    var button_id = button.attr("id");
    var field_id = button_id.replace("_button", "");

    // If the media frame already exists, reopen it.
    if (file_frame) {
      file_frame.open();
      return;
    }

    // Create the media frame.
    file_frame = wp.media.frames.file_frame = wp.media({
      title: jQuery(this).data("uploader_title"),
      button: {
        text: jQuery(this).data("uploader_button_text"),
      },
      multiple: false,
    });

    // When an image is selected, run a callback.
    file_frame.on("select", function () {
      var attachment = file_frame.state().get("selection").first().toJSON();
      jQuery("#" + field_id).val(attachment.id);
      jQuery("#listingimagediv img").attr("src", attachment.url);
      jQuery("#listingimagediv img").show();
      jQuery("#" + button_id).attr("id", "remove_listing_image_button");
      jQuery("#remove_listing_image_button").text("Remove listing image");
    });

    // Finally, open the modal
    file_frame.open();
  };

  jQuery("#listingimagediv").on(
    "click",
    "#upload_listing_image_button",
    function (event) {
      event.preventDefault();
      jQuery.fn.upload_listing_image(jQuery(this));
    }
  );

  jQuery("#listingimagediv").on(
    "click",
    "#remove_listing_image_button",
    function (event) {
      event.preventDefault();
      jQuery("#upload_listing_image").val("");
      jQuery("#listingimagediv img").attr("src", "");
      jQuery("#listingimagediv img").hide();
      jQuery(this).attr("id", "upload_listing_image_button");
      jQuery("#upload_listing_image_button").text("Set listing image");
    }
  );
});

function changeFeaturedImage(el) {
  var src = jQuery(el)
    .find("img")
    .attr("src")
    .replace(
      /-[0-9][0-9][0-9]x[0-9][0-9][0-9]\.([a-zA-Z][a-zA-Z][a-zA-Z])$/,
      "-800x800.$1"
    );
  jQuery(".entry-content > img").attr("src", src);
  jQuery(".entry-content > img").attr("srcset", src);
}
function voteUp(el) {
  var radio = jQuery(el).parents("li.gfield").find("input[type=radio]");
  var id = radio.attr("id");
  var blank = id.substr(0, id.length - 1);

  if (radio.eq(0).prop("checked") != true) {
    radio.eq(0).prop("checked", true);
    jQuery(el).parents("li.gfield").addClass("voted");
    jQuery(el).parents("li.gfield").removeClass("disliked");
    jQuery(el).parents("li.gfield").addClass("liked");
  } else {
    radio.eq(1).prop("checked", true);
    jQuery(el).parents("li.gfield").removeClass("voted");
    setTimeout(function () {
      jQuery(el).parents("li.gfield").removeClass("disliked");
      jQuery(el).parents("li.gfield").removeClass("liked");
    }, 300);
  }
}
function voteDown(el) {
  var radio = jQuery(el).parents("li.gfield").find("input[type=radio]");
  var id = radio.attr("id");
  var blank = id.substr(0, id.length - 1);

  if (radio.eq(2).prop("checked") != true) {
    radio.eq(2).prop("checked", true);
    jQuery(el).parents("li.gfield").addClass("voted");
    jQuery(el).parents("li.gfield").removeClass("liked");
    jQuery(el).parents("li.gfield").addClass("disliked");
  } else {
    radio.eq(1).prop("checked", true);
    jQuery(el).parents("li.gfield").removeClass("voted");
    setTimeout(function () {
      jQuery(el).parents("li.gfield").removeClass("disliked");
      jQuery(el).parents("li.gfield").removeClass("liked");
    }, 300);
  }
}
