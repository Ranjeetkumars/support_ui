/**
 *Created By venkat
 */
$(document).ready(function() {
	$('#sidemenu-icon').click(function() {
		$('#sideNav').toggleClass('active');
		$('#content-wrap').toggleClass('active');
		$('.nav-second-level').toggleClass('active');

	});
	//                Menu Open in Small devices
	$('#topmenu-icon').click(function() {
		$('#top-navbar').toggleClass('in');

	});
	//                Metis Menu
	$('#metisMenu').metisMenu({
		toggle : true
	});
	//                Tootip
	$('[data-toggle="tooltip"]').tooltip();

});

$(".messages").animate({
	scrollTop : $(document).height()
}, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
	$("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	if ($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	}
	;

	$("#status-options").removeClass("active");
});

function newMessage() {
	message = $(".message-input input").val();
	if ($.trim(message) == '') {
		return false;
	}
	$(
			'<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>'
					+ message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({
		scrollTop : $(document).height()
	}, "fast");
};

$('.submit').click(function() {
	newMessage();
});

$(window).on('keydown', function(e) {
	if (e.which == 13) {
		newMessage();
		return false;
	}
});

$('.contact').click(function() {
	$('#active_mobile').text($(this).find('.name').text());
	$('#active_user_icon').attr('src', $(this).find('img').attr('src'));
	$('li.active').removeClass('active');
	$(this).addClass('active');
});

$('#contacts').keyup(function() {
	var that = this;
	var all_list = $('#myUL > li');
	var matching_list = all_list.filter(function(i, li) {
		var list_item_text = $(li).text().toUpperCase();
		var search_text = that.value.toUpperCase();
		return ~list_item_text.indexOf(search_text);
	});
	all_list.hide();
	matching_list.show();
});

function openDisposition() {
	console.log('Disposition clicked');
}