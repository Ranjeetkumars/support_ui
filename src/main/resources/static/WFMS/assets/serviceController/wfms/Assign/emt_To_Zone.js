/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = dd + '-' + mm + '-' + yyyy;
	$("#emt_DeAssign_Date").append(today);
	$("#emt_Assigned_Date").append(today);
	try {
		get_Emt_Zones();
	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#emt_ZoneId').on('change', function() {
	var emt_ZoneId = $("#emt_ZoneId").val();
	if (emt_ZoneId === "0") {

	} else {
		$("#emtToZoneId").hide();
		get_Emt_Baselocation_Name(emt_ZoneId);
		get_UnAssigned_EMT_Details();
		get_Assigned_EMT_Details(emt_ZoneId);
	}
});


$('#emt_distrcitId').on('change', function() {
	
	getLocationsDropDowns();
	get_Emt_Baselocation_Name(emt_ZoneId);
	get_UnAssigned_EMT_Details();
	get_Assigned_EMT_Details(emt_ZoneId);
});


$("#emt_UnAssigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".emt_UnAssignedChecks").prop('checked') === true || $(".emt_UnAssignedChecks").prop('checked') === 'true') {
		$(".emt_UnAssignedChecks").prop("checked", false);
	} else {
		$(".emt_UnAssignedChecks").prop("checked", true);
	}
});
var UnAssignedEmtsList = [];
var mail_Assign_Deassgin = " ";
function unAssigned_Emts() {
	var isChecked = $(".emt_UnAssignedChecks").is(":checked");
	var emt_ZoneId = $("#emt_ZoneId").val();
	if (emt_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'emt_ZoneId', 'error');
		return false;
	}
	if (isChecked !== true) {
		showNotificationError('Select At Least One EMT For Assign', 'error_message', 'error');
		return false;
	} else {
		var checks = document.getElementsByClassName('emt_UnAssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				UnAssignedEmtsList.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (UnAssignedEmtsList.length > 0) {
			mail_Assign_Deassgin = "UnAssigned";
			insert_Locationemp_Emt_Details(mail_Assign_Deassgin);
		}
	}
}
$("#emt_Assigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".emt_AssignedChecks").prop('checked') === true || $(".emt_AssignedChecks").prop('checked') === 'true') {
		$(".emt_AssignedChecks").prop("checked", false);
	} else {
		$(".emt_AssignedChecks").prop("checked", true);
	}
});
var emt_Assigned_List = [];
function assigned_Emts() {
	var isChecked = $(".emt_AssignedChecks").is(":checked");
	var emt_ZoneId = $("#emt_ZoneId").val();
	if (emt_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'emt_ZoneId', 'error');
		return false;
	}
	if (isChecked !== true) {
		showNotificationError('Select At Least One EMT For Deassign', 'error_message', 'error');
		return false;
	} else {
		var checks = document.getElementsByClassName('emt_AssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				emt_Assigned_List.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (emt_Assigned_List.length > 0) {
			mail_Assign_Deassgin = "Assigned";
			update_DeAssign_Emt_Details(mail_Assign_Deassgin);
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Emt_Zones
 */
function get_Emt_Zones() {
	try {
		$('#emt_distrcitId').empty();
		var strUrl = Service.GETZONES;
		$.ajax({
			type: 'GET',
			url: strUrl,
			dataType: 'json',
			async: false,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objGetCountriesControllerDTO;
					var selectfirst = "<option value='0'>Select zone</option>";
					$('#emt_distrcitId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Zone = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
						$(Zone).appendTo('#emt_distrcitId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Emt_Zones" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Emt_Zones()' + err);
	}
	$('#emt_distrcitId').trigger("chosen:updated");
	$('#emt_distrcitId').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : getLocationsDropDowns
 */
function getLocationsDropDowns() {
	try {
		$('#emt_ZoneId').empty();
		var emt_distrcitId =$("#emt_distrcitId").val();
		var obj_Assigned_EMT_Details = {
				district_id: emt_distrcitId
			};
		
		var strUrl = Service.GetLocationsDropDowns;
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(obj_Assigned_EMT_Details),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objResourceProfilesControllerDTO;
					var selectfirst = "<option value='0'>Select zone</option>";
					$('#emt_ZoneId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Zone = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
						$(Zone).appendTo('#emt_ZoneId');
					});
				}
			},
			error: function(err) {
				console.error("Error in getLocationsDropDowns" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getLocationsDropDowns()' + err);
	}
	$('#emt_ZoneId').trigger("chosen:updated");
	$('#emt_ZoneId').chosen();
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_Emt_Baselocation_Name
 */

function get_Emt_Baselocation_Name(Zone_Id) {
	$('#emt_location_Name').empty();
	var location_Id = Zone_Id;
	var strUrl = Service.Get_Baselocation_Name;
	var obj_get_Driver_Details = {
		location_id: location_Id
	};
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_get_Driver_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				$('#emt_location_Name').append(data.location_name);
			}
		},
		error: function(err) {
			console.error("Error in Get_Baselocation_Name" + JSON.stringify(err));
		}
	});
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssigned_EMT_Details
 */

function get_UnAssigned_EMT_Details() {
	$('#emt_Assign_Id').empty();
	var strUrl = Service.Get_UnAssigned_EMT_Details;
	$.ajax({
		type: 'GET',
		url: strUrl,
		dataType: 'json',
		async: false,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var user_id = resData.user_id;
					var user_name = resData.user_name;
					var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="emt_UnAssignedChecks"  value="' + user_id + ' ' + user_name + '">' + user_name + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#emt_Assign_Id').append(assignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_UnAssigned_EMT_Details" + JSON.stringify(err));
		}
	});
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Assigned_EMT_Details
 */

function get_Assigned_EMT_Details(emt_ZoneId) {
	$('#emt_UnAssign_Id').empty();
	var user_Id = emt_ZoneId;//Tempororay Purpose
	var obj_Assigned_EMT_Details = {
		user_id: user_Id
	};
	var strUrl = Service.Get_Assigned_EMT_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_Assigned_EMT_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var driver_id = resData.driver_id;
					var driver_name = resData.user_name;
					var start_date = resData.start_date;
					var deAssignId = '<label class="check "> <span class="name" style="margin-right: -37px;"></span><input type="checkbox" class="emt_AssignedChecks" value="' + driver_id + '">' + driver_name + '</span><span class="dDate" style="margin-left: 180px;">' + start_date + '</span><span class="checkmark"></span></label><hr id="hrline">';
					$('#emt_UnAssign_Id').append(deAssignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Assigned_EMT_Details" + JSON.stringify(err));
		}
	});
}

/*
 @Author : Purushotham Akula
 For insert_Locationemp_Emt_Details Purpose
 */
function insert_Locationemp_Emt_Details(mail_Assign_Deassgin) {

	for (var i = 0; i < UnAssignedEmtsList.length; i++) {
		var str = UnAssignedEmtsList[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var emt_Id = driver_id[0];
			var emt_ZoneId = $("#emt_ZoneId").val();
			//var user_Id = "621";//112 Temporarory
			//	var module_Id = module_Id;//2 Temporarory
			//var role_Id = role_Id;//3 Temporarory
			var json_insert_Locationemp_Emt_Details = {
				"zone_id": emt_ZoneId,
				"emt_id": emt_Id,
				"user_id": user_Id,
				"module_id": module_Id,
				"role_id": role_Id
			};
			var strUrl = Service.Insert_Locationemp_Emt_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_insert_Locationemp_Emt_Details),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				},
				success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						//Getting User Name And User Mail For Sending Mmail To User
						showNotificationError('Successfully EMT(s) Assigned', 'error_message', 'success');
						get_Emt_User_Details(emt_Id, mail_Assign_Deassgin);
						setTimeout(function() {
							//alert('Successfully EMT(s) assigned');
							window.location.reload();
						}, 3000);
					}
				}, error: function() {
					console.log('In Error of insert_Locationemp_Emt_Details');
				}
			});
		}
	}
}


/*
 For update_DeAssign_Emt_Details Purpose
 */
function update_DeAssign_Emt_Details(mail_Assign_Deassgin) {

	for (var i = 0; i < emt_Assigned_List.length; i++) {
		var str = emt_Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var emt_Id = driver_id[0];
			//var user_Id = "558";//112 Temporarory
			//var module_Id = "10";//2 Temporarory
			//	var role_Id = "35";//3 Temporarory


			var json_update_DeAssign_Emt_Details = {
				"emt_id": emt_Id,
				"user_id": user_Id,
				"module_id": module_Id,
				"role_id": role_Id
			};
			var strUrl = Service.Update_DeAssign_Emt_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_DeAssign_Emt_Details),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				},
				success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						//Getting User Name And User Mail For Sending Mmail To User
						showNotificationError('Successfully EMT(s) DeAssigned', 'error_message', 'success');
						get_Emt_User_Details(emt_Id, mail_Assign_Deassgin);
						setTimeout(function() {
							//	alert('Successfully deassign EMT(s)');
							window.location.reload();
						}, 3000);
					}
				}, error: function() {
					console.log('In Error of update_DeAssign_Emt_Details');
				}
			});
		}
	}
}




/* 
 * @Author : Purushotham Akula
 * @Desc : getUser_Details
 */

function get_Emt_User_Details(emt_Id, mail_Assign_Deassgin) {
	var user_Id = emt_Id;//temporary purpose
	var strUrl = Service.GetUser_Details;
	var obj_get_Emt_User_Details = {
		user_id: user_Id
	};
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_get_Emt_User_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var user_name = resData.user_name;
					var user_email = resData.user_email;
					//Sending Mail To User 
					inserting_Email_For_Emt(user_name, user_email, mail_Assign_Deassgin);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Emt_User_Details" + JSON.stringify(err));
		}
	});
}
function inserting_Email_For_Emt(userName, user_email, mail_Assign_Deassgin) {
	if (user_email === "NA" || user_email === "" || user_email === "null") {
		user_email = "test@gmail.com";
	}
	var location_Name = $("#emt_location_Name").text();
	var rmusername = 'Srinivas PRASAD RAYACHURI';//temporary purpose
	var current_date = $("#emt_DeAssign_Date").text();
	var subject = " ";
	var message = " ";
	if (mail_Assign_Deassgin === "UnAssigned") {
		subject = "Assign zone is made by: " + rmusername;
		message = "Dear " + userName + ",<br>Zone has been assgined by : " + rmusername + ".Please find the below Details<br><br>Assgined Date:" + current_date + "<br>Assign Zone Name:" + location_Name + "<br><br>Regards:<br>" + rmusername + "<br>Workforce Management System.";
	} else if (mail_Assign_Deassgin === "Assigned") {
		subject = "De-Assign zone is made by: " + rmusername;
		message = "Dear " + userName + ",<br>Zone has been De-assgined by : " + rmusername + ".Please find the below Details<br><br>De-Assgined Date:  " + current_date + "<br>De-Assign Zone Name:" + location_Name + "<br><br>Regards:  <br>" + rmusername + "<br>Workforce Management System.";
	}


	var json_Inserting_Email_Details = {
		"inboxqueueid": "0",
		"replyuser": "0",
		"us_email": user_email,
		"subject": subject,
		"replybody": message,
		"actionid": "1",
		"templateid": "1",
		"isdeleted": "false",
		"leave_createdbyid": user_Id,
		"leave_createdbymoduleid": module_Id,
		"leave_createdbyroleid": role_Id
	};
	var strUrl = Service.Inserting_Email_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Inserting_Email_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
			//	alert('Mail Sended Succsefully');
				showNotificationError('Mail Sended Succsefully', 'error_message', 'success');

			}
		},
		error: function(err) {
			console.error("Error in Inserting_Email_For_Driver_To_Zone" + JSON.stringify(err));
		}
	});

}

function showNotificationError(msg, id, msgType) {
	var boxId = '#' + id;
	var options = {
		// whether to hide the notification on click
		clickToHide: true,
		// whether to auto-hide the notification
		autoHide: true,
		// if autoHide, hide after milliseconds
		autoHideDelay: 2000,
		// show the arrow pointing at the element
		arrowShow: true,
		// arrow size in pixels
		arrowSize: 5,
		// position defines the notification position though uses the defaults below
		position: 'right',
		// default positions
		elementPosition: 'top right',
		globalPosition: 'top right',
		// default style
		style: 'bootstrap',
		// default class (string or [string])
		className: msgType,
		// show animation
		showAnimation: 'slideDown',
		// show animation duration
		showDuration: 400,
		// hide animation
		hideAnimation: 'slideUp',
		// hide animation duration
		hideDuration: 200,
		// padding between element and notification
		gap: 2
	};
	$(boxId).notify(msg, options);
}