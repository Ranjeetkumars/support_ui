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
		Get_Distrcit_Details("dsm_DistrictId");
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#dsm_ZoneId').on('change', function() {
	var dsm_ZoneId = $('#dsm_ZoneId').val();
	$('#dsm_DistrictId').empty();
	Get_Basedon_ZoneId_Districts(dsm_ZoneId, 'dsm_DistrictId');
});
$('#dsm_DistrictId').on('change', function() {
	var dsm_DistrictId = $('#dsm_DistrictId').val();
	if (dsm_DistrictId === "0") {
	} else {
		get_Assigned_User_Details();

	}
});
$('#DesignationId').on('change', function() {
	var DesignationId = $('#DesignationId').val();
	if (DesignationId === "0") {
	} else {
		Get_Unassigned_User_Details();
	}
});

/*
 * @Author : Purushotham Akula @Date : 2021-07-2021 @Desc :
 * get_Desgnition_Details
 */
function get_Desgnition_Details(DesignationId) {
	try {
		var id = '#' + DesignationId;
		$(id).empty();
		var strUrl = Service.Get_Desgnition_Details;
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objScheduleOfERCControllerDTO;
							var selectfirst = "<option value='0'>Select Designation</option>";
							$(id).append(selectfirst);

							$.each(jsonArray, function(i, resData) {
								var zoneData = "<option value="
										+ resData.desginationId + ">"
										+ resData.desginatinName + "</option>";
								$(zoneData).appendTo(id);

							});
						}
					},
					error : function(err) {
						console.error("Error in get_Desgnition_Details"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in get_Desgnition_Details()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}
/*
 * @Author : Purushotham Akula @Date : 2021-07-2021 @Desc : Get_Distrcit_Details
 */
function Get_Distrcit_Details(dsm_DistrictId) {
	try {
		var id = '#' + dsm_DistrictId;
		$(id).empty();
		var strUrl = Service.Get_Distrcit_Details;
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objGetCountriesControllerDTO;
							var selectfirst = "<option value='0'>Select District</option>";
							$(id).append(selectfirst);

							$.each(jsonArray, function(i, resData) {
								var zoneData = "<option value="
										+ resData.locationId + ">"
										+ resData.locationName + "</option>";
								$(zoneData).appendTo(id);

							});
						}
					},
					error : function(err) {
						console.error("Error in Get_Distrcit_Details"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in Get_Distrcit_Details()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

/*
 * @Author : Purushotham Akula @Date : 2021-07-21 @Desc :
 * Get_Basedon_ZoneId_Districts
 */

function Get_Basedon_ZoneId_Districts(dsm_ZoneId, dsm_DistrictId) {
	try {
		var id = '#' + dsm_DistrictId;
		$(id).empty();
		var strUrl = Service.Get_Basedon_ZoneId_Districts;
		var obj_Zone = {
			zoneId : dsm_ZoneId
		};
		$
				.ajax({
					type : "POST",
					url : strUrl,
					dataType : "json",
					data : JSON.stringify(obj_Zone),
					contentType : "application/json",
					async : false,
					crossDomain : true,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objGetCountriesControllerDTO;
							var selectfirst = "<option value='0'>Select District</option>";
							$(id).append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var zoneData = "<option value="
										+ resData.districtId + ">"
										+ resData.districtName + "</option>";
								$(zoneData).appendTo(id);
							});
						}
					},
					error : function(err) {
						console.error("Error in Get_Basedon_ZoneId_Districts"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in Get_Basedon_ZoneId_Districts()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

/*
 * @Author : Purushotham Akula @Desc : Get_Unassigned_User_Details
 */

function Get_Unassigned_User_Details() {
	$('#driver_Assign_Id').empty();
	var strUrl = Service.Get_Unassigned_User_Details;
	var designationId = $("#DesignationId").val();
	var obj_desginationId = {
		desginationId : designationId
	};
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(obj_desginationId),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.objScheduleOfERCControllerDTO;
						$
								.each(
										jsonArray,
										function(i, resData) {
											var actionId = resData.user_id;
											var managerName = resData.user_name;
											var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="unAssignedChecks"  value="'
													+ actionId
													+ ' '
													+ managerName
													+ '">'
													+ managerName
													+ '<span class="checkmark"></span></label><hr id="hrline">';
											$('#driver_Assign_Id').append(
													assignId);
										});
					}
				},
				error : function(err) {
					console.error("Error in Get_Unassigned_User_Details"
							+ JSON.stringify(err));
				}
			});
}

/*
 * @Author : Purushotham Akula @Desc : get_Manager_To_District_Assigned_Details
 */

function get_Assigned_User_Details() {
	$('#driver_UnAssign_Id').empty();
	var strUrl = Service.Get_Assigned_User_Details;
	var dsm_DistrictId = $("#dsm_DistrictId").val();
	var obj_districtId = {
		districtId : dsm_DistrictId
	};
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(obj_districtId),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objScheduleOfERCControllerDTO;
						$
								.each(
										jsonArray,
										function(i, resData) {
											var actionId = resData.user_id;
											var managerId = resData.user_id;
											var managerName = resData.user_name;
											var deAssignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="assignedChecks"  value="'
													+ actionId
													+ ' '
													+ managerId
													+ ' '
													+ managerName
													+ '">'
													+ managerName
													+ '<span class="checkmark"></span></label><hr id="hrline">';
											$('#driver_UnAssign_Id').append(
													deAssignId);
										});
					}
				},
				error : function(err) {
					console.error("Error in get_Assigned_User_Details"
							+ JSON.stringify(err));
				}
			});
}

var mail_Assign_Deassgin = " ";
$("#unAssigned_checkAll").change(
		function() {
			// $("input:checkbox").prop('checked', $(this).prop("checked"));
			if ($(".unAssignedChecks").prop('checked') === true
					|| $(".unAssignedChecks").prop('checked') === 'true') {
				$(".unAssignedChecks").prop("checked", false);
			} else {
				$(".unAssignedChecks").prop("checked", true);
			}
		});

function Assigned_Managers() {
	
	var designationId = $("#DesignationId").val();
	var district_Id = $("#dsm_DistrictId").val();
	if (designationId === "0") {
		showNotificationError('Please Select Designation', 'DesignationId',
				'error');
		return false;
	}
	if (district_Id === "0") {
		showNotificationError('Please Select District', 'dsm_DistrictId',
				'error');
		return false;
	}
	var isChecked = $(".unAssignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One User For Assign',
				'error_message', 'error');
		return false;
	} else {
		
		var UnAssignedDriversList = [];
		var checks = document.getElementsByClassName('unAssignedChecks');
		// Create an Array.
		for (var i = 0; i < checks.length; i++) {
			
			if (checks[i].checked) {
				UnAssignedDriversList.push(checks[i].value);
			} 
		}
		// Display the selected CheckBox values.
		if (UnAssignedDriversList.length > 0) {
			mail_Assign_Deassgin = "UnAssigned";
			insert_District_Manager_Details(UnAssignedDriversList);
			$(".unAssignedChecks").removeAttr('checked');
		}
	}

}

/*
 * @Author : Purushotham Akula @Desc : insert_District_Manager_Details
 */
function insert_District_Manager_Details(UnAssignedDriversList) {
	for (var i = 0; i < UnAssignedDriversList.length; i++) {
		console.log(UnAssignedDriversList);
		var str = UnAssignedDriversList[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var managerId = driver_id[0];
			var designationId = $("#DesignationId").val();
			var district_Id = $("#dsm_DistrictId").val();
			var json_inserting_Details = {
				"user_id" : managerId,
				"districtId" : district_Id,
				"desginationId" : designationId,
				"createdById" : user_Id,
				"createdBymoduleId" : module_Id,
				"createdByroleId" : role_Id
			};
			var strUrl = Service.Insert_District_Manager_Details;
			$.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(json_inserting_Details),
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
						// Getting User Name And User Mail For Sending Mmail To
						// User
						showNotificationError('Successfully Manager Assigned',
								'error_message', 'success');
							//window.location.reload();
							get_Assigned_User_Details();
							Get_Unassigned_User_Details();
						
					}
				},
				error : function() {
					console.log('In Error of Insert_District_Manager_Details');
				}
			});
		}
	}
}

$("#assigned_checkAll").change(
		function() {
			if ($(".assignedChecks").prop('checked') === true
					|| $(".assignedChecks").prop('checked') === 'true') {
				$(".assignedChecks").prop("checked", false);
			} else {
				$(".assignedChecks").prop("checked", true);
			}
		});

function unAssigned_Managers() {
	var isChecked = $(".assignedChecks").is(":checked");
	if (isChecked !== true) {
		showNotificationError('Please Select Atleast One Manager For Deassign',
				'error_message', 'error');
		return false;
	} else {
		var Assigned_List = [];
		var checks = document.getElementsByClassName('assignedChecks');
		// Create an Array.
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				Assigned_List.push(checks[i].value);
			}
		}
		// Display the selected CheckBox values.
		if (Assigned_List.length > 0) {
			console.log("unAssigned_Managers =========>"+Assigned_List);
			mail_Assign_Deassgin = "Assigned";
			update_District_Manager_Details(Assigned_List);
		}
	}
}

/*
 * For update_District_Manager_Details Purpose
 */
function update_District_Manager_Details(Assigned_List) {

	for (var i = 0; i < Assigned_List.length; i++) {
		var str = Assigned_List[i];
		var driver_id = str.split(/(\s+)/);
		if (driver_id[0] !== "0") {
			var actionId = driver_id[0];
			var json_update_Details = {
				"user_id" : actionId
			};
			var strUrl = Service.Update_District_Manager_Details;
			$.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(json_update_Details),
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
						// Getting User Name And User Mail For Sending Mmail To
						// User
						showNotificationError(
								'Successfully Manager DeAssigned',
								'error_message', 'success');
							//window.location.reload();
							get_Assigned_User_Details();
							Get_Unassigned_User_Details();
					}
				},
				error : function() {
					console.log('In Error of update_District_Manager_Details');
				}
			});
		}
	}
}

function showNotificationError(msg, id, msgType) {
	var boxId = '#' + id;
	var options = {
		// whether to hide the notification on click
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults
		// below
		position : 'right',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 400,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};
	$(boxId).notify(msg, options);
}