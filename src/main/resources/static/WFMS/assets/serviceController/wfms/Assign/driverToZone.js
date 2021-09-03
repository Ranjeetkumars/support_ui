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
	$("#deAssign_Date").append(today);
	$("#assigned_Date").append(today);
	try {
		getZones();

	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
$('#d_Zone_Id').on('change', function() {
	var Zone_Id = $("#d_Zone_Id").val();
	if (Zone_Id === "0") {
	} else {
		$("#zoneValidate").hide();
		get_Baselocation_Name(Zone_Id);
		get_Assigned_Driver_Details();
		get_UnAssigned_Driver_Details();
	}

});


var mail_Assign_Deassgin = " ";
$("#unAssigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".unAssignedChecks").prop('checked') === true || $(".unAssignedChecks").prop('checked') === 'true') {
		$(".unAssignedChecks").prop("checked", false);
	} else {
		$(".unAssignedChecks").prop("checked", true);
	}
});
var UnAssignedDriversList = [];
function unAssigned_Drivers() {
	var d_Zone_Id = $("#d_Zone_Id").val();
	if (d_Zone_Id === "0") {
		showNotificationError('Please Select Zone', 'error_message', 'error');
		return false;
	}
	var isChecked = $(".unAssignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One Driver For Assign', 'error_message', 'error');
		return false;
	}
	else {
		var checks = document.getElementsByClassName('unAssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				UnAssignedDriversList.push(checks[i].value);
			} else {
			}
		}
		//Display the selected CheckBox values.
		if (UnAssignedDriversList.length > 0) {
			mail_Assign_Deassgin = "UnAssigned";
			insert_Wfms_Assgindriver_Details(mail_Assign_Deassgin);
		}
	}

}




$("#assigned_checkAll").change(function() {
	if ($(".assignedChecks").prop('checked') === true || $(".assignedChecks").prop('checked') === 'true') {
		$(".assignedChecks").prop("checked", false);
	} else {
		$(".assignedChecks").prop("checked", true);
	}
});
var Assigned_List = [];
function assigned_Drivers() {
	var d_Zone_Id = $("#d_Zone_Id").val();
	if (d_Zone_Id === "0") {
		showNotificationError('Please Select Zone', 'error_message', 'error');
		return false;
	}
	var isChecked = $(".assignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One Driver For Deassign', 'error_message', 'error');
		return false;
	} else {
		var checks = document.getElementsByClassName('assignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				Assigned_List.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (Assigned_List.length > 0) {
			mail_Assign_Deassgin = "Assigned";
			update_Wfms_Deassigndriver_Details(mail_Assign_Deassgin);
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : getZones
 */
function getZones() {
	try {
		$('#d_Zone_Id').empty();
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
					$('#d_Zone_Id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
						$(Country).appendTo('#d_Zone_Id');
					});
				}
			},
			error: function(err) {
				console.error("Error in getZones" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getZones()' + err);
	}
	$('#d_Zone_Id').trigger("chosen:updated");
	$('#d_Zone_Id').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Baselocation_Name
 */

function get_Baselocation_Name(Zone_Id) {

	$('#location_Name').empty();
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
				$('#location_Name').append(data.location_name);
			}
		},
		error: function(err) {
			console.error("Error in Get_Baselocation_Name" + JSON.stringify(err));
		}
	});
}




/* 
 * @Author : Purushotham Akula
 * @Desc : get_Assigned_Driver_Details
 */

function get_Assigned_Driver_Details() {

	$('#driver_UnAssign_Id').empty();
	//var user_Id = 252;
	var zone_Id = $("#d_Zone_Id").val();
	var strUrl = Service.Get_Assigned_Driver_Details;
	var obj_get_Driver_Details = {
		zone_id: zone_Id
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
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var driver_id = resData.driver_id;
					var driver_name = resData.user_name;
					var start_date = resData.start_date;
					var deAssignId = '<label class="check "> <span class="name" style="margin-right: -37px;"></span><input type="checkbox" class="assignedChecks" value="' + driver_id + '">' + driver_name + '</span><span class="dDate" style="margin-left: 180px;">' + start_date + '</span><span class="checkmark"></span></label><hr id="hrline">';
					$('#driver_UnAssign_Id').append(deAssignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Assigned_Driver_Details" + JSON.stringify(err));
		}
	});
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssigned_Driver_Details
 */

function get_UnAssigned_Driver_Details() {
	$('#driver_Assign_Id').empty();
	var strUrl = Service.Get_UnAssigned_Driver_Details;
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
					var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="unAssignedChecks"  value="' + user_id + ' ' + user_name + '">' + user_name + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#driver_Assign_Id').append(assignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in Get_UnAssigned_Driver_Details" + JSON.stringify(err));
		}
	});
}

/*
 For insert_Wfms_Assgindriver_Details Purpose
 */
function insert_Wfms_Assgindriver_Details(mail_Assign_Deassgin) {
	for (var i = 0; i < UnAssignedDriversList.length; i++) {
		var str = UnAssignedDriversList[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var driver_id = driver_id[0];
			var zone_id = $("#d_Zone_Id").val();
			//var user_Id = user_Id;//112 Temporarory
			var module_id = module_Id;//2 Temporarory
			var role_id = role_Id;//3 Temporarory

			var json_inserting_Shedule_Details = {
				"zone_id": zone_id,
				"driver_id": driver_id,
				"user_id": user_Id,
				"module_id": module_Id,
				"role_id": role_Id
			};
			var strUrl = Service.Insert_Wfms_Assgindriver_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_inserting_Shedule_Details),
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
						showNotificationError('Successfully Drived Assigned', 'error_message', 'success');
						getUser_Details(driver_id, mail_Assign_Deassgin);
						setTimeout(function() {
							window.location.reload();
						}, 3000);
					}
				}, error: function() {
					console.log('In Error of Insert_Wfms_Assgindriver_Details');
				}
			});
		}
	}
}


/*
 For update_Wfms_Deassigndriver_Details Purpose
 */
function update_Wfms_Deassigndriver_Details(mail_Assign_Deassgin) {

	for (var i = 0; i < Assigned_List.length; i++) {
		var str = Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		// var userids = beforsplit.split(" ");
		if (driver_id[0] !== "0") {
			var driver_id = driver_id[0];
			//var user_Id = user_Id;//112 Temporarory
			var module_id = module_Id;//2 Temporarory
			var role_id = role_Id;//3 Temporarory
			var json_update_Wfms_Deassigndriver_Details = {
				"driver_id": driver_id,
				"user_id": user_Id,
				"role_id": module_Id,
				"module_id": role_Id
			};
			var strUrl = Service.Update_Wfms_Deassigndriver_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_Wfms_Deassigndriver_Details),
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
						showNotificationError('Successfully Drived DeAssigned', 'error_message', 'success');
						getUser_Details(driver_id, mail_Assign_Deassgin);
						setTimeout(function() {
							window.location.reload();
						}, 3000);


					}
				}, error: function() {
					console.log('In Error of update_Wfms_Deassigndriver_Details');
				}
			});
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : getUser_Details
 */

function getUser_Details(driver_id, mail_Assign_Deassgin) {
	var user_Id = driver_id;//temporary purpose
	var strUrl = Service.GetUser_Details;
	var obj_get_Driver_Details = {
		user_id: user_Id
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
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var user_name = resData.user_name;
					var user_email = resData.user_email;
					//Sending Mail To User 
					inserting_Email_For_Driver_To_Zone(user_name, user_email, mail_Assign_Deassgin);
				});
			}
		},
		error: function(err) {
			console.error("Error in getUser_Details" + JSON.stringify(err));
		}
	});
}
function inserting_Email_For_Driver_To_Zone(user_name, user_email, mail_Assign_Deassgin) {
	if (user_email === "NA" || user_email === "" || user_email === "null") {
		user_email = "test@gmail.com";
	}
	var location_Name = $("#location_Name").text();
	var rmusername = 'Srinivas PRASAD RAYACHURI';//temporary purpose
	var current_Date = $("#deAssign_Date").text();
	var subject = " ";
	var message = " ";
	if (mail_Assign_Deassgin === "UnAssigned") {
		subject = "Assign zone is made by " + rmusername;
		message = "Dear " + user_name + ",<br>Zone has been assgined by : " + rmusername + ".Please find the below Details<br><br>Assgined Date:" + current_Date + "<br>Assign Zone Name:" + location_Name + "; <br><br>Regards:  <br>" + rmusername + "<br>Workforce Management System.";
	} else if (mail_Assign_Deassgin === "Assigned") {
		subject = "De-Assign zone is made by " + rmusername;
		message = "Dear " + user_name + ",<br>Zone has been De-assgined by : " + rmusername + ".Please find the below Details<br><br>De-Assgined Date:  " + current_Date + "<br>De-Assign Zone Name:" + location_Name + "<br> <br>Regards:  <br>" + rmusername + "<br>Workforce Management System.";
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
				alert('Mail Sended Succsefully');
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