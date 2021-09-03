
/* 
 * @Author : Purushotham Akula
 */

var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
	try {
		get_Desgnition_Details("DesignationId");
		get_Module_Details("moduleId");
	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

/* 
 * @Author : Purushotham Akula
 * @Date : 2021-07-2021
 * @Desc : get_Desgnition_Details 
 */
function get_Desgnition_Details(DesignationId) {
	try {
		var id = '#' + DesignationId;
		$(id).empty();
		var strUrl = Service.Get_Desgnition_Details;
		$.ajax({
			type: 'GET',
			url: strUrl,
			dataType: 'json',
			async: false,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objScheduleOfERCControllerDTO;
					var selectfirst = "<option value='0'>Select Designation</option>";
					$(id).append(selectfirst);

					$.each(jsonArray, function(i, resData) {
						var zoneData = "<option value=" + resData.desginationId + ">" + resData.desginatinName + "</option>";
						$(zoneData).appendTo(id);

					});
				}
			},
			error: function(err) {
				console.error("Error in get_Desgnition_Details" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Desgnition_Details()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

$('#DesignationId').on('change', function() {
	var DesignationId = $('#DesignationId').val();
	$('#MappedUsersId').empty();
	get_BasedonDesginationId_Manager_Details(DesignationId, 'MappedUsersId');
});

$('#MappedUsersId').on('change', function() {
	var MappedUsersId = $('#MappedUsersId').val();
	//$('#driver_Assign_Id').empty();
	get_Assigned_Employee_Manager_Details(MappedUsersId);
});
$('#moduleId').on('change', function() {
	var moduleId = $('#moduleId').val();
	//$('#driver_Assign_Id').empty();
	get_Ams_UnMapped_User_Details(moduleId);
});

/* 
 * @Author : Purushotham Akula
 * @Date : 2021-08-19
 * @Desc : get_BasedonDesginationId_Manager_Details
 */


function get_BasedonDesginationId_Manager_Details(DesignationId, MappedUsersId) {
	try {
		var id = '#' + MappedUsersId;
		$(id).empty();
		var strUrl = Service.Get_BasedonDesginationId_Manager_Details;
		var obj_desgination = {
				desginationId: DesignationId
		};
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(obj_desgination),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objScheduleOfERCControllerDTO;
					var selectfirst = "<option value='0'>Select Managers</option>";
					$(id).append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var zoneData = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
						$(zoneData).appendTo(id);
					});
				}
			},
			error: function(err) {
				console.error("Error in get_BasedonDesginationId_Manager_Details" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_BasedonDesginationId_Manager_Details()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}



/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssigned_Employee_Manager_Details
 */

function get_Ams_UnMapped_User_Details(moduleId) {
	$('#driver_Assign_Id').empty();
	var strUrl = Service.Get_Ams_UnMapped_User_Details;
	var obj_json = {
			moduleid: moduleId
	};
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_json),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objScheduleOfERCControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var actionId = resData.user_id;
					var managerName = resData.user_name;
					var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="unAssignedChecks"  value="' + actionId + ' ' + managerName + '">' + managerName + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#driver_Assign_Id').append(assignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Ams_UnMapped_User_Details" + JSON.stringify(err));
		}
	});
}

/* 
 * @Author : Purushotham Akula
 * @Date : 2021-07-2021
 * @Desc : Get_Module_Details 
 */
function get_Module_Details(moduleId) {
	try {
		var id = '#' + moduleId;
		$(id).empty();
		var strUrl = Service.Get_Module_Details;
		$.ajax({
			type: 'GET',
			url: strUrl,
			dataType: 'json',
			async: false,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					var selectfirst = "<option value='0'>Select Module</option>";
					$(id).append(selectfirst);

					$.each(jsonArray, function(i, resData) {
						var zoneData = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
						$(zoneData).appendTo(id);

					});
				}
			},
			error: function(err) {
				console.error("Error in Get_Module_Details" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in Get_Module_Details()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Assigned_Employee_Manager_Details
 */

function get_Assigned_Employee_Manager_Details(MappedUsersId) {
	$('#driver_UnAssign_Id').empty();
	var strUrl = Service.Get_Assigned_Employee_Manager_Details;
	var obj_json = {
			manager_id: MappedUsersId
	};
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(obj_json),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				var jsonArray = data.objScheduleOfERCControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var actionId = resData.user_id;
					var managerId = resData.user_id;
					var managerName = resData.user_name;
					var deAssignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="assignedChecks"  value="'+actionId+' ' + managerId + ' ' + managerName + '">' + managerName + '<span class="checkmark"></span></label><hr id="hrline">';
					$('#driver_UnAssign_Id').append(deAssignId);
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Assigned_Employee_Manager_Details" + JSON.stringify(err));
		}
	});
}


var mail_Assign_Deassgin = " ";
$("#unAssigned_checkAll").change(function() {
	//    $("input:checkbox").prop('checked', $(this).prop("checked"));
	if ($(".unAssignedChecks").prop('checked') === true || $(".unAssignedChecks").prop('checked') === 'true') {
		$(".unAssignedChecks").prop("checked", false);
	} else {
		$(".unAssignedChecks").prop("checked", true);
	}
});

function Assigned_Managers() {	
	var designationId = $("#DesignationId").val();
	var MappedUsersId = $("#MappedUsersId").val();
	var moduleId = $("#moduleId").val();

	
	if (designationId === "0") {
		showNotificationError('Please Select Designation', 'DesignationId', 'error');
		return false;
	}
	if (MappedUsersId === "0") {
		showNotificationError('Please Select Manager', 'MappedUsersId', 'error');
		return false;
	}
	if (moduleId === "0") {
		showNotificationError('Please Select Module', 'MappedUsersId', 'error');
		return false;
	}
	var isChecked = $(".unAssignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One Manager For Assign', 'error_message', 'error');
		return false;
	}
	else {
		var UnAssignedDriversList = [];
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
			insert_Manager_Employeetrans_Details(UnAssignedDriversList);
		}
	}

}


/*
 * @Author : Purushotham Akula
 * @Desc : inserting_Manager_To_District_Mapping
 */
function insert_Manager_Employeetrans_Details(UnAssignedDriversList) {
	for (var i = 0; i < UnAssignedDriversList.length; i++) {
		console.log(UnAssignedDriversList);
		var str = UnAssignedDriversList[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var employeeId = driver_id[0];
			console.log("employeeId =======>"+employeeId);
			console.log("employeeId =======>"+employeeId);
            var manager_Id=$("#MappedUsersId").val();
			var json_inserting_Details = {
					"employeeId" : "{"+employeeId+"}",
					"manager_id" : manager_Id,
					"createdById" :user_Id,
					"createdBymoduleId" : module_Id,
					"createdByroleId" : role_Id
				};
			var strUrl = Service.Insert_Manager_Employeetrans_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_inserting_Details),
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
						showNotificationError('Successfully Manager Assigned', 'succues_message', 'success');
						
					}
				}, error: function() {
					console.log('In Error of insert_Manager_Employeetrans_Details');
				}
			});
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

function unAssigned_Managers() {
	var isChecked = $(".assignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One Employee For Deassign', 'succues_message', 'error');
		return false;
	} else {
		var Assigned_List = [];
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
			update_Manager_Employeetrans_Details(Assigned_List);
		}
	}
}


/*
For update_Manager_Employeetrans_Details Purpose
*/
function update_Manager_Employeetrans_Details(Assigned_List) {

	for (var i = 0; i < Assigned_List.length; i++) {
		var str = Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var actionId = driver_id[0];
			var json_update_Details = {
					"employeeId" : actionId,
					"manager_id" : user_Id,
					"createdById" : user_Id,
					"createdBymoduleId" : module_Id,
					"createdByroleId" : role_Id
			};
			var strUrl = Service.Update_Manager_Employeetrans_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_update_Details),
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
						showNotificationError('Successfully  DeAssigned', 'succues_message', 'success');
					}
				}, error: function() {
					console.log('In Error of update_Manager_Employeetrans_Details');
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