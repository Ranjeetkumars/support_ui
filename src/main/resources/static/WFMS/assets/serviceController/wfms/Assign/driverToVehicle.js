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
	$("#v_DeAssign_Date").append(today);
	$("#v_Assigned_Date").append(today);
	try {
		get_Veihicle_Zones();
	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});


$('#v_ZoneId').on('change', function() {
	var v_ZoneId = $("#v_ZoneId").val();
	if (v_ZoneId === "0") {

	} else {
		get_BaseLocation_DropDown(v_ZoneId);
	}
});


$('#v_BaseLocationId').on('change', function() {
	var v_BaseLocationId = $("#v_BaseLocationId").val();
	if (v_BaseLocationId === "0" || v_BaseLocationId === " ") {
		alert('Please Select Baselocation');
		return false;
	} else {
		get_Vehicles_DropDown(v_BaseLocationId);
	}
});

$('#v_VehicleId').on('change', function() {
	var v_BaseLocationId = $("#v_BaseLocationId").val();
	var v_ZoneId = $("#v_ZoneId").val();
	if (v_BaseLocationId === "0" || v_BaseLocationId === " ") {
		alert('Please Select Baselocation');
		return false;
	} else {
		$("#driverToVehicleId").hide();
		get_Vehicle_Baselocation_Name(v_BaseLocationId);
		get_UnAssginDriverToVehicle_Details(v_ZoneId);
		var v_VehicleId = $("#v_VehicleId").val();
		get_AssginDriverToVehicle_Details(v_VehicleId);
		//Here Appending Zone Loation Name 
		$("#v_Vehicle_Name").empty();
		var hidden_VehicleNo = $("#hidden_VehicleNo").val();
		$("#v_Vehicle_Name").text(hidden_VehicleNo);

	}
});

var mail_Assign_Deassgin = "";

$("#v_UnAssigned_checkAll").change(function() {
	if ($(".v_UnAssignedChecks").prop('checked') === true || $(".v_UnAssignedChecks").prop('checked') === 'true') {
		$(".v_UnAssignedChecks").prop("checked", false);
	} else {
		$(".v_UnAssignedChecks").prop("checked", true);
	}
});

var v_UnAssignedDriversList = [];
function unAssigned_Drivers_To_Vehicle() {
	var isChecked = $(".v_UnAssignedChecks").is(":checked");
	var v_ZoneId = $("#v_ZoneId").val();
	var v_BaseLocationId = $("#v_BaseLocationId").val();
	var v_VehicleId = $("#v_VehicleId").val();

	if (v_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'v_ZoneId', 'error');
		return false;
	}
	if (v_BaseLocationId === "0") {
		showNotificationError('Please Select Base Location', 'v_BaseLocationId', 'error');
		return false;
	}
	if (v_VehicleId === "0") {
		showNotificationError('Please Select Vehicle', 'v_BaseLocationId', 'error');
		return false;
	}
	if (isChecked !== true) {
		showNotificationError('Select Atleast One Driver Assign To Vehicle', 'error_message', 'error');
		//alert("Check atleast One Driver Assign to Vehicle");
		return false;
	} else {
		var checks = document.getElementsByClassName('v_UnAssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				v_UnAssignedDriversList.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (v_UnAssignedDriversList.length > 0) {
			mail_Assign_Deassgin = "UnAssigned";
			insert_Wfms_Vehicledriverid_Details(mail_Assign_Deassgin);
		}
	}
}

$("#v_Assigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".v_AssignedChecks").prop('checked') === true || $(".v_AssignedChecks").prop('checked') === 'true') {
		$(".v_AssignedChecks").prop("checked", false);
	} else {
		$(".v_AssignedChecks").prop("checked", true);
	}
});
var v_Assigned_List = [];
function assigned_Drivers_To_Vehicle() {
	var isChecked = $(".v_AssignedChecks").is(":checked");
	var v_ZoneId = $("#v_ZoneId").val();
	var v_BaseLocationId = $("#v_BaseLocationId").val();
	var v_VehicleId = $("#v_VehicleId").val();

	if (v_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'v_ZoneId', 'error');
		return false;
	}
	if (v_BaseLocationId === "0") {
		showNotificationError('Please Select Base Location', 'v_BaseLocationId', 'error');
		return false;
	}
	if (v_VehicleId === "0") {
		showNotificationError('Please Select Vehicle', 'v_BaseLocationId', 'error');
		return false;
	}
	if (isChecked !== true) {
		showNotificationError('Select At least One Driver Deassign To Vehicle', 'error_message', 'error');
		//alert("Check atleast One Driver Deassign to Vehicle");
		return false;
	} else {
		var checks = document.getElementsByClassName('v_AssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				v_Assigned_List.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (v_Assigned_List.length > 0) {
			mail_Assign_Deassgin = "Assigned";
			update_Wfms_Driver_To_Vehicle_Details(mail_Assign_Deassgin);
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Veihicle_Zones
 */
function get_Veihicle_Zones() {
	try {
		$('#v_ZoneId').empty();
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
					$('#v_ZoneId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Zone = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
						$(Zone).appendTo('#v_ZoneId');
						$("hidden_ZoneName").val(resData.locationName);
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Veihicle_Zones" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getZones()' + err);
	}
	$('#v_ZoneId').trigger("chosen:updated");
	$('#v_ZoneId').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_BaseLocation_DropDown
 */

function get_BaseLocation_DropDown(location_id) {
	try {
		$('#v_BaseLocationId').empty();
		var location_Id = location_id;
		var strUrl = Service.Get_BaseLocation_DropDown;
		var obj_BaseLocation_DropDown = {
			location_id: location_Id
		};
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(obj_BaseLocation_DropDown),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objResourceProfilesControllerDTO;
					var selectfirst = "<option value='0'>Select Base Location</option>";
					$('#v_BaseLocationId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var BaseLocation = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
						$(BaseLocation).appendTo('#v_BaseLocationId');
						$('#hidden_baselocation').val(resData.location_name);
					});
				}
			},
			error: function(err) {
				console.error("Error in Get_BaseLocation_DropDown" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getZones()' + err);
	}
	$('#v_BaseLocationId').trigger("chosen:updated");
	$('#v_BaseLocationId').chosen();

}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Vehicles_DropDown
 */

function get_Vehicles_DropDown(location_id) {
	try {
		$('#v_VehicleId').empty();
		var location_Id = location_id;
		var strUrl = Service.Get_Vehicles_DropDown;
		var obj_Vehicles_DropDown = {
			location_id: location_Id
		};
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(obj_Vehicles_DropDown),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objResourceProfilesControllerDTO;
					var selectfirst = "<option value='0'>Select Vehicle</option>";
					$('#v_VehicleId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Vehicle = "<option value=" + resData.vehicle_id + ">" + resData.vehicle_name + "</option>";
						$(Vehicle).appendTo('#v_VehicleId');
						$('#hidden_VehicleNo').val(resData.vehicle_name);
					});
				}
			},
			error: function(err) {
				console.error("Error in Get_BaseLocation_DropDown" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getZones()' + err);
	}
	$('#v_VehicleId').trigger("chosen:updated");
	$('#v_VehicleId').chosen();
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_Vehicle_Baselocation_Name
 */

function get_Vehicle_Baselocation_Name(Zone_Id) {
	$('#v_location_Name').empty();
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
				$('#v_location_Name').append(data.location_name);
			}
		},
		error: function(err) {
			console.error("Error in Get_Baselocation_Name" + JSON.stringify(err));
		}
	});
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssginDriverToVehicle_Details
 */

function get_UnAssginDriverToVehicle_Details(locationId) {
	$('#v_driver_Assign_Id').empty();
	var obj_UnAssginDriverToVehicle_Details = {
		user_id: locationId
	};
	var strUrl = Service.Get_UnAssginDriverToVehicle_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_UnAssginDriverToVehicle_Details),
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
					var user_name = resData.user_name;
					var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="v_UnAssignedChecks"  value="' + driver_id + ' ' + user_name + '">' + user_name + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#v_driver_Assign_Id').append(assignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in Get_UnAssginDriverToVehicle_Details" + JSON.stringify(err));
		}
	});
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_AssginDriverToVehicle_Details
 */

function get_AssginDriverToVehicle_Details(v_VehicleId) {
	$('#v_Driver_UnAssign_Id').empty();
	var vehicle_Id = v_VehicleId;//Tempororay Purpose
	var obj_AssginDriverToVehicle_Details = {
		vehicle_id: vehicle_Id
	};
	var strUrl = Service.Get_AssginDriverToVehicle_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_AssginDriverToVehicle_Details),
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
					var deAssignId = '<label class="check "> <span class="name" style="margin-right: -37px;"></span><input type="checkbox" class="v_AssignedChecks" value="' + driver_id + '">' + driver_name + '</span><span class="dDate" style="margin-left: 180px;">' + start_date + '</span><span class="checkmark"></span></label><hr id="hrline">';
					$('#v_Driver_UnAssign_Id').append(deAssignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_AssginDriverToVehicle_Details" + JSON.stringify(err));
		}
	});
}


/*
 For insert_Wfms_Vehicledriverid_Details Purpose
 */
function insert_Wfms_Vehicledriverid_Details(mail_Assign_Deassgin) {

	for (var i = 0; i < v_UnAssignedDriversList.length; i++) {
		var str = v_UnAssignedDriversList[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var driver_Id = driver_id[0];
			//  var zone_Id = $("#v_ZoneId").val();
			var vehicle_Id = $("#v_VehicleId").val();
			//var user_Id = user_Id;//112 Temporarory
			var module_id = module_Id;//2 Temporarory
			var role_id = role_Id;//3 Temporarory


			var json_insert_Wfms_Vehicledriverid_Details = {
				"vehicle_id": vehicle_Id,
				"driver_id": driver_Id,
				"user_id": user_Id,
				"module_id": module_id,
				"role_id": role_id
			};
			var strUrl = Service.Insert_Wfms_Vehicledriverid_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_insert_Wfms_Vehicledriverid_Details),
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
						get_User_Details(driver_Id, mail_Assign_Deassgin);
						showNotificationError('Successfully Driver(s) Assigned To Vehicle', 'error_message', 'success');
						setTimeout(function() {
							//alert('Successfully Driver(s) assigned to Vehicle');
							window.location.reload();
						}, 3000);
					}
				}, error: function() {
					console.log('In Error of insert_Wfms_Vehicledriverid_Details');
				}
			});
		}
	}
}

/*
 For update_Wfms_Driver_To_Vehicle_Details Purpose
 */
function update_Wfms_Driver_To_Vehicle_Details(mail_Assign_Deassgin) {

	for (var i = 0; i < v_Assigned_List.length; i++) {
		var str = v_Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var driver_Id = driver_id[0];
			var user_Id = "558";//112 Temporarory
			var module_id = "10";//2 Temporarory
			var role_id = "35";//3 Temporarory


			var json_update_Wfms_DriverToVehicle_Details = {
				"driver_id": driver_Id,
				"user_id": user_Id,
				"module_id": module_id,
				"role_id": role_id
			};
			var strUrl = Service.Update_Wfms_DriverToVehicle_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_Wfms_DriverToVehicle_Details),
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
						get_User_Details(driver_Id, mail_Assign_Deassgin);
						//update_WfscheduleAllocated_Trans Details 
						update_WfscheduleAllocated_Trans();
						showNotificationError('Successfully  DeAssigned Driver(s) To Vehicle', 'error_message', 'success');
						setTimeout(function() {
							//alert('Successfully deassigned driver(s) to vehicle');
							window.location.reload();
						}, 3000);
					}
				}, error: function() {
					console.log('In Error of update_Wfms_Driver_To_Vehicle_Details');
				}
			});
		}
	}
}

/*
 For update_Wfms_Driver_To_Vehicle_Details Purpose
 */
function update_WfscheduleAllocated_Trans() {

	for (var i = 0; i < v_Assigned_List.length; i++) {
		var str = v_Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var driver_Id = driver_id[0];
			var json_update_WfscheduleAllocated_Trans = {
				"driver_id": driver_Id
			};
			console.log("JSON OBJECT ======>" + JSON.stringify(json_update_WfscheduleAllocated_Trans));
			var strUrl = Service.Update_WfscheduleAllocated_Trans;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_WfscheduleAllocated_Trans),
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
						//alert('Successfully deassigned driver(s) to vehicle');
					}
				}, error: function() {
					console.log('In Error of Update_WfscheduleAllocated_Trans');
				}
			});
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : getUser_Details
 */

function get_User_Details(driver_Id, mail_Assign_Deassgin) {
	var user_Id = driver_Id;//temporary purpose
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
					inserting_Email_For_Driver_To_Vehcile(user_name, user_email, mail_Assign_Deassgin);
				});
			}
		},
		 function(err) {
				console.error("Error in getUser_Details" + JSON.stringify(err));
		}
	});
}
function inserting_Email_For_Driver_To_Vehcile(userName, user_email, mail_Assign_Deassgin) {
	if (user_email === "NA" || user_email === "" || user_email === "null") {
		user_email = "test@gmail.com";
	}
	var location_Name = $("#v_location_Name").text();
	var userbaseLocation = $("#hidden_baselocation").val();
	var useruservehicle1 = $("#v_Vehicle_Name").text();
	var rmusername = 'Srinivas PRASAD RAYACHURI';//temporary purpose
	var current_date = $("#v_DeAssign_Date").text();
	var subject = " ";
	var message = " ";
	if (mail_Assign_Deassgin === "UnAssigned") {
		subject = "Assign vehicle is made Vehicle No :" + useruservehicle1 + " by " + rmusername;
		message = "Dear " + userName + ",<br>Vehicle has been assgined by Vehicle No:" + useruservehicle1 + ".Please find the below Details<br><br>Assgined Date:" + current_date + "<br>Assign Zone Name:" + location_Name + "<br>Assign Baselocation Name:" + userbaseLocation + "<br>Assign Vehicle No:" + useruservehicle1 + "<br><br>Regards:  <br>" + rmusername + "<br>Workforce Management System.";
	} else if (mail_Assign_Deassgin === "Assigned") {
		subject = "De-Assign vehicle is made  Vehicle No :" + useruservehicle1 + " by " + rmusername;
		message = "Dear " + userName + ",<br>Vehicle has been De-assgined by : " + rmusername + ".Please find the below Details<br><br>De-Assgined Date:" + current_date + "<br>De-Assign Zone Name:" + location_Name + "<br>De-Assign Baselocation Name:" + userbaseLocation + "<br>De-Assign Vehicle No:" + useruservehicle1 + " <br><br>Regards:  <br>" + rmusername + "<br>Workforce Management System.";
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