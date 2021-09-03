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
	$("#vehicle_DeAssign_Date").append(today);
	$("#vehicle_Assigned_Date").append(today);
	try {
		get_Vehicle_Zones();
	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});


$('#vehicle_ZoneId').on('change', function() {
	var vehicle_ZoneId = $("#vehicle_ZoneId").val();
	if (vehicle_ZoneId === "0") {

	} else {
		get_Vehicle_BaseLocation_DropDown(vehicle_ZoneId);

	}
});

$('#vhicle_BaseId').on('change', function() {
	var vhicle_BaseId = $("#vhicle_BaseId").val();
	var vehicle_ZoneId = $("#vehicle_ZoneId").val();
	if (vhicle_BaseId === "0") {

	} else {
		$("#vehicleBaseId").hide();
		get_Vehicle_Baselocation_Name(vehicle_ZoneId);
		get_UnAssigned_VehicleToBase_Details();
		get_Assigned_Vehicle_Details(vhicle_BaseId);

	}
});

$("#vehicle_UnAssigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".vehicle_UnAssignedChecks").prop('checked') === true || $(".vehicle_UnAssignedChecks").prop('checked') === 'true') {
		$(".vehicle_UnAssignedChecks").prop("checked", false);
	} else {
		$(".vehicle_UnAssignedChecks").prop("checked", true);
	}
});
var UnAssignedVehilcesList = [];
function unAssigned_Vehicles() {
	var isChecked = $(".vehicle_UnAssignedChecks").is(":checked");
	var vehicle_ZoneId = $("#vehicle_ZoneId").val();
	var vhicle_BaseId = $("#vhicle_BaseId").val();

	if (vehicle_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'vehicle_ZoneId', 'error');
		return false;
	}
	if (vhicle_BaseId === "0") {
		showNotificationError('Please Select Base Location', 'vehicle_ZoneId', 'error');
		return false;
	}
	if (isChecked !== true) {
		//alert("Check atleast One Vehicle Assign to BaseLocation ");
		showNotificationError('Select At Least One Vehicle Assign To BaseLocation', 'error_message', 'error');
		return false;
	} else {
		var checks = document.getElementsByClassName('vehicle_UnAssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				UnAssignedVehilcesList.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (UnAssignedVehilcesList.length > 0) {
			insert_Wfms_LocationToVehicle_Details();
		}
	}
}
$("#vehicle_Assigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".vehicle_AssignedChecks").prop('checked') === true || $(".vehicle_AssignedChecks").prop('checked') === 'true') {
		$(".vehicle_AssignedChecks").prop("checked", false);
	} else {
		$(".vehicle_AssignedChecks").prop("checked", true);
	}
});
var vehicle_Assigned_List = [];
function assigned_Vehicles() {
	var isChecked = $(".vehicle_AssignedChecks").is(":checked");
	var vehicle_ZoneId = $("#vehicle_ZoneId").val();
	var vhicle_BaseId = $("#vhicle_BaseId").val();

	if (vehicle_ZoneId === "0") {
		showNotificationError('Please Select Zone', 'vehicle_ZoneId', 'error');
		return false;
	}
	if (vhicle_BaseId === "0") {
		showNotificationError('Please Select Base Location', 'vehicle_ZoneId', 'error');
		return false;
	}
	if (isChecked !== true) {
		//	alert("Check atleast One Vehicle Deassign to BaseLocation");
		showNotificationError('Select At Least One Vehicle DeAssign To BaseLocation', 'error_message', 'error');
		return false;
	} else {
		var checks = document.getElementsByClassName('vehicle_AssignedChecks');
		//Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				vehicle_Assigned_List.push(checks[i].value);
			}
		}
		//Display the selected CheckBox values.
		if (vehicle_Assigned_List.length > 0) {
			update_Wfms_VehicleToBaseloc_Details();
		}
	}
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Vehicle_Zones
 */
function get_Vehicle_Zones() {
	try {
		$('#vehicle_ZoneId').empty();
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
					$('#vehicle_ZoneId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Zone = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
						$(Zone).appendTo('#vehicle_ZoneId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Vehicle_Zones" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Vehicle_Zones()' + err);
	}
	$('#vehicle_ZoneId').trigger("chosen:updated");
	$('#vehicle_ZoneId').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Vehicle_BaseLocation_DropDown
 */

function get_Vehicle_BaseLocation_DropDown(location_id) {
	try {
		$('#vhicle_BaseId').empty();
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
					$('#vhicle_BaseId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var BaseLocation = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
						$(BaseLocation).appendTo('#vhicle_BaseId');
						//$('#hidden_EmtVehicleBase').val(resData.location_name);
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Vehicle_BaseLocation_DropDown" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Vehicle_BaseLocation_DropDown()' + err);
	}
	$('#vhicle_BaseId').trigger("chosen:updated");
	$('#vhicle_BaseId').chosen();

}



/* 
 * @Author : Purushotham Akula
 * @Desc : get_Emt_Baselocation_Name
 */

function get_Vehicle_Baselocation_Name(Zone_Id) {
	$('#vehicle_Location_Name').empty();
	var location_Id = Zone_Id;
	var strUrl = Service.Get_Baselocation_Name;
	var obj_get_Baselocation_Name = {
		location_id: location_Id
	};
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_get_Baselocation_Name),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				$('#vehicle_Location_Name').append(data.location_name);
			}
		},
		error: function(err) {
			console.error("Error in get_Vehicle_Baselocation_Name" + JSON.stringify(err));
		}
	});
}
/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssigned_VehicleToBase_Details
 */

function get_UnAssigned_VehicleToBase_Details() {
	$('#vehicle_UnAssignId').empty();
	var strUrl = Service.Get_UnAssigned_VehicleToBase_Details;
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
					var vehicle_Id = resData.vehicle_id;
					var vehicle_Regno = resData.vehicle_regno;
					var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="vehicle_UnAssignedChecks"  value="' + vehicle_Id + ' ' + vehicle_Regno + '">' + vehicle_Regno + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#vehicle_UnAssignId').append(assignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_UnAssigned_VehicleToBase_Details" + JSON.stringify(err));
		}
	});
}



/* 
 * @Author : Purushotham Akula
 * @Desc : get_Assigned_EMT_Details
 */

function get_Assigned_Vehicle_Details(vhicle_BaseId) {
	$('#vehicle_AssignId').empty();
	var obj_Assigned_Vehicle_Details = {
		location_id: vhicle_BaseId
	};
	var strUrl = Service.Get_Assigned_VehicleToBase_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_Assigned_Vehicle_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objAssignControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var vehicle_Id = resData.vehicle_id;
					var vehicle_Regno = resData.vehicle_regno;
					var start_date = resData.start_date;
					var deAssignId = '<label class="check "> <span class="name" style="margin-right: -37px;"></span><input type="checkbox" class="vehicle_AssignedChecks" value="' + vehicle_Id + '">' + vehicle_Regno + '</span><span class="dDate" style="margin-left: 100px;">' + start_date + '</span><span class="checkmark"></span></label><hr id="hrline">';
					$('#vehicle_AssignId').append(deAssignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Assigned_Vehicle_Details" + JSON.stringify(err));
		}
	});
}


/*
 *@Author : Purushotham Akula
 * @Desc :For insert_Wfms_LocationToVehicle_Details Purpose
 */
function insert_Wfms_LocationToVehicle_Details() {

	for (var i = 0; i < UnAssignedVehilcesList.length; i++) {
		var str = UnAssignedVehilcesList[i];
		var vehicle_id = str.split(/(\s+)/);
		if (vehicle_id[0] !== "0") {
			var vehicle_Id = vehicle_id[0];
			var vehicle_ZoneId = $("#vehicle_ZoneId").val();
		//	var user_Id = "621";//112 Temporarory
			//var module_Id = "10";//2 Temporarory
			//var role_Id = "35";//3 Temporarory
			var json_insert_Locationemp_Emt_Details = {
				"vehicle_id": vehicle_Id,
				"location_id": vehicle_ZoneId,
				"user_id": user_Id,
				"module_id": module_Id,
				"role_id": role_Id
			};
			var strUrl = Service.Insert_Wfms_LocationToVehicle_Details;
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
						showNotificationError('Successfully Assigned vehicle(s) To Base Location', 'error_message', 'success');
						setTimeout(function() {
							//alert('Successfully vehicle(s) assigned to baselocation');
							window.location.reload();
						}, 3000);
					}
				}, error: function(err) {
					console.log('In Error of insert_Wfms_LocationToVehicle_Details' + err);
				}
			});
		}
	}
}


/*
 *@Author : Purushotham Akula
 * @Desc :For update_Wfms_VehicleToBaseloc_Details Purpose
 */
function update_Wfms_VehicleToBaseloc_Details() {

	for (var i = 0; i < vehicle_Assigned_List.length; i++) {
		var str = vehicle_Assigned_List[i];
		var vehicle_id = str.split(/(\s+)/);
		if (vehicle_id[0] !== "0") {
			var vehicle_Id = vehicle_id[0];
			//	var user_Id = "468";//112 Temporarory
			//var module_Id = "10";//2 Temporarory
			//var role_Id = "35";//3 Temporarory


			var json_update_Wfms_VehicleToBaseloc_Details = {
				"vehicle_id": vehicle_Id,
				"user_id": user_Id,
				"module_id": module_Id,
				"role_id": role_Id
			};
			var strUrl = Service.Update_Wfms_VehicleToBaseloc_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_Wfms_VehicleToBaseloc_Details),
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
						showNotificationError('Successfully Deassigned vehicle(s) To Base Location', 'error_message', 'success');
						setTimeout(function() {
							//alert('Successfully deassigned vehicle(s) to baselocation');
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