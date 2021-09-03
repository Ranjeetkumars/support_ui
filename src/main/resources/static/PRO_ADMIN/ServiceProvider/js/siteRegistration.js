/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var index = 1;
var SrpId = 0;
$(document).ready(
		function() {
			try {
				var data = JSON.parse(localStorage.getItem('Lobject'));
				if (data.responseCode === 200) {
					$.each(data.controllerDTOs, function(i, eachitem) {
						if (eachitem.errorcode === null) {
							SrpId = eachitem.serviceProviderId;

						} else {
							window.location.href = "login.html";
						}
					});
				} else {
					window.location.href = "login.html";
				}

			} catch (err) {
				window.location.href = "login.html";
			}

			getSiteUserDetails();
			/*
			 * Site Name Characters Validations
			 */
			$("#sitenameId").keypress(
					function(event) {
						var regex = new RegExp("^[a-zA-Z ]+$");
						var key = String
								.fromCharCode(!event.charCode ? event.which
										: event.charCode);
						if (!regex.test(key)) {
							event.preventDefault();
							return false;

						}
						$('#siteName_Error').empty();
					});
			var text_max = 50;
			$('#sitenameId_feedback').html(text_max + ' characters remaining');
			$('#sitenameId').keyup(
					function() {
						var text_length = $('#sitenameId').val().length;
						var text_remaining = text_max - text_length;
						$('#sitenameId_feedback').html(
								text_remaining + ' characters remaining');
					});

			/*
			 * Site Logo File Validations
			 */
			$('#actualSiteLogo').bind(
					'change',
					function() {
						var size1 = this.files[0].size;
						// Maximum 3mb
						if (size1 >= 3024000) {
							$('#siteLogo_Error')
									.html('Maximum size limit 3 MB').css(
											'color', 'red');
							$('#customSiteLogo').val("");
							return false;
						}
						var exten = this.files[0].name;
						var finalExten = exten.substr(
								(exten.lastIndexOf('.') + 1)).toLowerCase();
						if ($.inArray(finalExten, [ 'gif', 'png', 'jpg',
								'jpeg', 'pdf' ]) === -1) {
							$('#siteLogo_Error').html(
									'Jpg, jpeg, png, pdf,formats are allowed')
									.css('color', 'red');
							$('#customSiteLogo').val("");
							return false;
						}
					});

			$("#customSiteLogoBtn").keypress(function(event) {
				$('#siteLogo_Error').empty();
			});
			$("#siteEndDate").prop("disabled", true);

			$("#noOfAgents").keypress(
					function(e) {
						// if the letter is not digit then display error and
						// don't type anything
						if (e.which != 8 && e.which != 0
								&& (e.which < 48 || e.which > 57)) {
							// display error message
							return false;
						}
						var count = $("noOfAgents").text().length;
					});

		});

/*
 * Onchnage functions and sitedates validations
 */
$('#siteStartDate').change(function() {
	var sitestrtDate = $('#siteStartDate').val();
	var dateArr = sitestrtDate.split('-');
	var val = dateArr[1] + '/' + dateArr[0] + '/' + dateArr[2];
	var fiveyears = new Date(val);
	fiveyears.setFullYear(fiveyears.getFullYear() + 5);
	var dd = fiveyears.getDate();
	var mm = fiveyears.getMonth() + 1;
	var y = fiveyears.getFullYear();
	var someFormattedDate = dd + '-' + mm + '-' + y;
	$('#siteEndDate').val(someFormattedDate);
	$('#startDate_Error').empty();

});

$("#noOfAgents").blur(function(event) {
	$('#implementions_Error').empty();
});

$("#noOfAgents").keypress(function(event) {
	$('#noOfAgents_Error').empty();
});

$("#actualSiteLogo").change(function(event) {
	$('#siteLogo_Error').empty();
});

$("#sitenameId").blur(function() {
	getSiteUserDetails();
});

//Reseting Tags Inputs
function site_ResetId() {
	$("#implementationSitesId").tagsinput('removeAll');
}
/*
 * file upload validation
 */

$("#customSiteLogoBtn").blur(function() {
	$('#sitereg_image_UrlId').empty();
	var file_data = $('#actualSiteLogo').prop('files')[0];
	if (file_data === undefined) {
		return false;
	} else {
		var form_data = new FormData();
		form_data.append('file', file_data);
		imageUpload(form_data);
	}
});

/*
 * @DESC : Image uploaded file store into server system. @AuthorName : Bharath
 * @DATE : 20-11-2019
 */

function imageUpload(form_data) {
	try {
		var strUrl = Service.ViewImage;
		$.ajax({
			type : 'post',
			url : strUrl, // point to server-side controller method
			dataType : 'text',
			cache : false,
			contentType : false,
			processData : false,
			data : form_data,
			success : function(data) {
				var data = JSON.parse(data);
				$('#sitereg_image_UrlId').val(data.fileViewUri);
			},
			error : function(e) {
				console.log("imageUpload error" + e);
			}
		});
	} catch (err) {
		console.log("imageUpload error" + err);
	}
}
/*
 * For Inserting SiteRegistartion Details Purpose
 */

function insert_SiteRegistartion() {
	
	
	var img_url = $('#sitereg_image_UrlId').val();

	try {
		var createdbyid = 1;
		var createdbyroleid = 1;
		var createdbymoduleid = 1;
		var serviceproviderID = SrpId;
		var in_Condition = 1;
		var siteID = 1;// temporrary purrpose db side insert time not
						// considering this value

		var sitename = $('#sitenameId').val();
		if (sitename === '' || sitename === "0" || sitename === undefined) {
			$('#sitenameId').focus();
			$('#siteName_Error').html('Please enter site name').css('color',
					'red');
			return false;
		}

		var siteLogo = $('#actualSiteLogo').val();
		if (siteLogo === '' || siteLogo === "0" || siteLogo === undefined) {
			$('#siteLogo_Error').html('Please choose site logo').css('color',
					'red');
			return false;
		}
		var start_date = $('#siteStartDate').val();
		if (start_date === '') {
			$('#startDate_Error').html('Please select satart date').css(
					'color', 'red');
			return false;
		} else {
			var d = new Date(start_date.split("-").reverse().join("-"));
			var dd = d.getDate();
			var mm = d.getMonth() + 1;
			var yy = d.getFullYear();
			var satart_Date = yy + "-" + mm + "-" + dd;
		}
		var end_date = $('#siteEndDate').val();
		if (end_date === '') {
			$('#startEnd_Error').html('Please select end date').css('color',
					'red');
			return false;
		} else {
			var d = new Date(end_date.split("-").reverse().join("-"));
			var dd = d.getDate();
			var mm = d.getMonth() + 1;
			var yy = d.getFullYear();
			var end_Date = yy + "-" + mm + "-" + dd;
		}
		var implementationSites = $('#implementationSitesId').val();
		if (implementationSites.length < "3") {
			$('#noOfAgents').focus();
			$('#implementions_Error').html('minimun 3 sites has to select')
					.css('color', 'red');
			return false;
		}
		var noOfAgents = $('#noOfAgents').val();
		var no_OfAgents_Count = Math.abs(noOfAgents);
		var noofagnetscount = no_OfAgents_Count.toString().length;

		if (noOfAgents > 1000) {
			$('#noOfAgents').focus();
			$('#noOfAgents_Error').html('Total number of agents maximum 1000 ')
					.css('color', 'red');
			return false;
		}
		var json_SiteRgs_Details = {
			"in_condition" : in_Condition,
			"sr_siteid" : siteID,
			"sr_sitename" : sitename,
			"sr_sitelogo" : img_url,
			"sr_site_startdate" : satart_Date,
			"sr_site_enddate" : end_Date,
			"sr_implementationsites" : implementationSites,
			"sr_total_agents" : noOfAgents,
			"sr_module_list" : "null",
			"sr_module_wise_agents" : "null",
			"sr_createdbyid" : createdbyid,
			"sr_createdbyroleid" : createdbyroleid,
			"sr_createdbymoduleid" : createdbymoduleid,
			"srpid" : serviceproviderID
		};
		var JSON_OBJECT = JSON.stringify(json_SiteRgs_Details);
		var strUrl = Service.Insert_SiteRegistartion;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(json_SiteRgs_Details),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					$('#save_SiteID').html('Site Registration Successfully').css('color','green');
					setTimeout(function() {
						window.location.href = 'dashboard_1.html';
					}, 2000);
				}
			},
			error : function(err) {
				console.error("Error in insert_SiteRegistartion"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("Error in insert_SiteRegistartion" + err);
	}

}

/*
 * For get_Modules_DropDown Purpose
 */
function getSiteUserDetails() {
	try {
		var strUrl = Service.GetSiteUserDetails;
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.siteRegistrationControllerDTO;
					$.each(jsonArray, function(i, resData) {
						var sr_sitename = resData.sr_sitename;
						var stname = $('#sitenameId').val().toLowerCase();
						stname = stname.replace(/\s/g, '');
						if (sr_sitename === stname) {
							$('#siteName_Error').html(
									'Site name is already exists').css('color',
									'red');
						}
					});
				}
			},
			error : function(err) {
				console.error("Error in get_Modules_DropDown"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in get_Modules_DropDown" + err);
	}
}
