/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 LeaveHistory Details Functions Calling Here
 */
$(document).ready(function() {
	get_Department_Details_DropDown();
	get_Leave_Types_DropDown();
});

//get_Leave_Types_DropDown

/*
 For Get_Department_Details_DropDown Purpose
 */
function get_Department_Details_DropDown() {
	var strUrl = Service.Get_Department_Details_DropDown;
	$.ajax({
		type: 'GET',
		url: strUrl,
		dataType: 'json',
		async: false,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.objSearchControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var moduel_id = "<option value=" + resData.moduel_id + ">" + resData.moduel_name + "</option>";
					$(moduel_id).appendTo('#l_DepartmentId');
				});
			}
		},
		error: function(err) {
			console.error("Error in Get_Department_Details_DropDown" + JSON.stringify(err));
		}
	});
}


/*
 For Get_Leave_Types_DropDown Purpose
 */
function get_Leave_Types_DropDown() {
	var strUrl = Service.Get_Leave_Types_DropDown;
	$.ajax({
		type: 'GET',
		url: strUrl,
		dataType: 'json',
		async: false,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.objLeaveHistoryControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var moduel_id = "<option value=" + resData.leavetype_id + ">" + resData.leave_desc + "</option>";
					$(moduel_id).appendTo('#l_Leave_Type');
				});
			}
		},
		error: function(err) {
			console.error("Error in Get_Leave_Types_DropDown" + JSON.stringify(err));
		}
	});
}

var emp_Name;
$('#l_Leave_Type').change(function() {
	$('#l_empNameId').empty();
	var moduleid1 = $("#l_DepartmentId").val();
	if (moduleid1 === "4" || moduleid1 === "5") {
		get_Employee_Details_DropDown(moduleid1);
	} else if (moduleid1 === "10") {
		get_Employee_DropDown(moduleid1);
	} else {
		get_EmployeeDetails_DropDownBasedOnIsNotNull();
	}
});

/*
 For get_Employee_Details_DropDown Purpose
 */
function get_Employee_Details_DropDown(module_Id) {
	$("#l_EmployeeId").empty();
	var json_Employee_DropDown = {
		"managerid": Constants.User_Id,
		"moduleid": module_Id,
		"user_id": Constants.User_Id
	};
	var strUrl = Service.Get_Employee_Details_DropDown;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Employee_DropDown),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (responsecode !== 200) {
			} else {
				var jsonArray = data.objResourceProfilesControllerDTO;
				var selectfirst = "<option value='0'>Select Employee</option>";
				$('#l_EmployeeId').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var employee = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
					emp_Name = resData.user_name;
					$(employee).appendTo('#l_EmployeeId');
				});
				$('#l_EmployeeId').trigger("chosen:updated");
				$('#l_EmployeeId').chosen();
			}
		}, error: function() {
			console.log('In Error of Get_Employee_Details_DropDown Details ');
		}
	});
}




/*
 For get_Employee_DropDown Purpose
 */
function get_Employee_DropDown(department_Id) {
	var managerid = Constants.User_Id; //Temporary Purpose 
	var moduleid = department_Id;// Temporary Purpose 
	var json_Employee_DropDown = {
		"managerid": managerid,
		"moduleid": moduleid
	};
	var strUrl = Service.Get_Employee_DropDown;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Employee_DropDown),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (responsecode !== 200) {
			} else {
				var jsonArray = data.objResourceProfilesControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var employee_Id = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
					$(employee_Id).appendTo('#l_EmployeeId');
				});
				$('#l_EmployeeId').trigger("chosen:updated");
				$('#l_EmployeeId').chosen();
			}
		}, error: function() {
			console.log('In Error of Get_Employee_DropDown Details ');
		}
	});
}




/*
 For Get_EmployeeDetails_DropDownBasedOnIsNotNull Purpose
 */
function get_EmployeeDetails_DropDownBasedOnIsNotNull() {
	var managerid = Constants.User_Id; //Temporary Purpose 
	var json_Employee_DropDown = {
		"managerid": managerid,
		"isactive": "true"
	};
	var strUrl = Service.Get_EmployeeDetails_DropDownBasedOnIsNotNull;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Employee_DropDown),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (responsecode !== 200) {
			} else {
				var jsonArray = data.objResourceProfilesControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var employee_Id = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
					$('#l_empNameId').html(resData.user_name);
					$(employee_Id).appendTo('#l_EmployeeId');
				});
				$('#l_EmployeeId').trigger("chosen:updated");
				$('#l_EmployeeId').chosen();
			}
		}, error: function() {
			console.log('In Error of Get_Employee_DropDown Details ');
		}
	});
}





/*
 For get_Leave__History_Details
 */
function get_Leave_History_Details() {
	var l_DepartmentId = $("#l_DepartmentId").val();

	var leavetype_id = $("#l_Leave_Type").val();
	var user_Id = $("#l_EmployeeId").val();
	var l_FromDate = $("#l_FromDate").val();
	var l_ToDate = $("#l_ToDate").val();

	if (l_DepartmentId === "" || l_DepartmentId === "0") {
		showNotificationError("Please Select Department Type ", "l_DepartmentId", "error");
		return;
	}
	if (leavetype_id === "" || leavetype_id === "0") {
		showNotificationError("Please Select Leave Type ", "l_Leave_Type", "error");
		return;
	}
	if (user_Id === "" || user_Id === "0") {
		showNotificationError("Please Select Employee  ", "l_Leave_Type", "error");
		return;

	}
	if (l_FromDate === "" || l_FromDate === undefined) {
		showNotificationError("Please Select From Date ", "l_FromDate", "error");
		return;

	}
	if (l_ToDate === "" || l_ToDate === undefined) {
		showNotificationError("Please Select To Date ", "l_ToDate", "error");
		return;

	}

	var d = new Date(l_FromDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var from_Fate = yy + "-" + mm + "-" + dd;
	var d = new Date(l_ToDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var to_Date = yy + "-" + mm + "-" + dd;

	var json_Leave__History_Details = {
		"from_date": from_Fate, //"2018-07-01
		"to_date": to_Date, //2018-07-03
		"user_id": user_Id, //Temporary Purpose  Constants.User_Id;
		"leavetype_id": leavetype_id
	};
	var strUrl = Service.get_Leave_History_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Leave__History_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				$("#leave_TableId").html("NO DATA FOUND");
			}
			var jsonArray = data.objLeaveHistoryControllerDTO;
			get_Leave__History_Details_DOM(jsonArray);

		},
		error: function(err) {
			console.error("Error in Get_Holiday_Details" + JSON.stringify(err));
		}
	});
}


function get_Leave__History_Details_DOM(strData) {
	$('#leave_TableId').empty();
	try {
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			var from_date = strData[i].from_date;
			if (from_date === "NA") {
				$(tablcol2).html('Not Found');
			} else {
				$(tablcol2).html(from_date);
			}
			$(tbleRow).append(tablcol2);

			var user_id = strData[i].user_id;
			var user_id = strData[i].user_id;

			var tablcol3 = document.createElement("td");
			var to_date = strData[i].to_date;
			if (to_date === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(to_date);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var leave_type = strData[i].leave_type;
			if (leave_type === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(leave_type);
			}
			$(tbleRow).append(tablcol4);


			var tablcol5 = document.createElement("td");
			var status = strData[i].leave_status_type;
			if (status === "NA") {
				$(tablcol5).html('Not Found');
			} else {
				$(tablcol5).html(status);
			}
			$(tbleRow).append(tablcol5);


			var tablcol6 = document.createElement("td");
			var emp_Reasons = strData[i].remarks;
			if (emp_Reasons === "NA") {
				$(tablcol6).html('Not Found');
			} else {
				$(tablcol6).html(emp_Reasons);
			}
			$(tbleRow).append(tablcol6);


			var tablcol7 = document.createElement("td");
			var approval_resons = strData[i].approval_resons;
			if (approval_resons === "NA") {
				$(tablcol7).html('Not Found');
			} else {
				$(tablcol7).html(approval_resons);
			}
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			var no_of_leavedays = strData[i].no_of_leavedays;
			if (no_of_leavedays === "NA") {
				$(tablcol8).html('Not Found');
			} else {
				$(tablcol8).html(no_of_leavedays);
			}
			$(tbleRow).append(tablcol8);



			$("#leave_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_Leave__History_Details_DOM ERROR" + err);
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

