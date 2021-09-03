
var onecountalreadyexists;
var getleavedatecount;
var hdcount;
var holidayExists;
var lctidcount;
var lctidcountnew;
var lct_idf;
var lct_moduleidf;
var lct_presentstatusf;
var lct_noofleavesusedf;
var lct_noofleavesaddedf;
var lct_lapsedf;
var user_firstname;
var user_lastname;
var user_manager_name;
var user_email;
var user_phone;
var mo_desc;
var user_shifttypeid;
var user_shifttype;
var user_desc;
var user_name;
var displaylegends;
var legendname;
var shifttype;
var user_Id;
var role_Id;
var module_Id;
/*
 SHEDULE OF ERC ONLOAD FUNCTIONS CALLING HERE 
 */
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
	get_shiftpatterns_DropDown();
	get_Modules_DropDown();
});
$('#shedule_DeprtmentId').change(function() {
	var module_Id = $('#shedule_DeprtmentId').val();
	if (module_Id !== "0") {
		get_Employee_Details(module_Id);
	}
});
var strat_Date = " ";
var end_Date = " ";
var today_Date = " ";
$('#sheduleErc_EndtDate').change(function() {
	var start_date = $("#sheduleErc_StartDate").val();
	var d = new Date(start_date.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	strat_Date = yy + "-" + mm + "-" + dd;
	var end_date = $("#sheduleErc_EndtDate").val();
	var d = new Date(end_date.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	end_Date = yy + "-" + mm + "-" + dd;
});
/*
 For Loading  ShiftPatterns DropDown Purpose
 */

function get_shiftpatterns_DropDown() {

	var strUrl = Service.Get_ShiftPatterns_Erc_Details;
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
			} else {
				var jsonArray = data.objPatternsERCControllerDTO;
				var selectfirst = "<option value='0'>Select Shift Pattern</option>";
				$('#shedule_ShiftpatternId').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var ShiftPattern = "<option value=" + resData.shiftpattern_shiftpatternid + ">" + resData.patterntype + "</option>";
					$(ShiftPattern).appendTo('#shedule_ShiftpatternId');
				});
			}
		},
		error: function(err) {
			console.error("Error in shiftpatterns_DropDown" + JSON.stringify(err));
		}
	});
}


/*
 For Loading  Modules_DropDown Purpose
 */

function get_Modules_DropDown() {

	var strUrl = Service.Get_Module_Details1;
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
			} else {
				var jsonArray = data.objPatternsERCControllerDTO;
				var selectfirst = "<option value='0'>Select Department</option>";
				$('#shedule_DeprtmentId').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var ShiftPattern = "<option value=" + resData.moduleid + ">" + resData.module_name + "</option>";
					$(ShiftPattern).appendTo('#shedule_DeprtmentId');
				});
			}
		},
		error: function(err) {
			console.error("Error in get_Modules_DropDown" + JSON.stringify(err));
		}
	});
}

/*
 For Get_Employee_Details Purpose
 */
function get_Employee_Details(moduleid) {
	$("#sheduleErc_AssignId").empty();
	var moduleid = moduleid;
	var manager_id = Constants.User_Id; //Temporarory Purpose
	var json_Employee_Details = {
		"moduleid": moduleid,
		"manager_id": manager_id
	};
	var strUrl = Service.Get_Employee_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Employee_Details),
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
				var jsonArray = data.objScheduleOfERCControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var assignvar = resData.user_name;
					var assignId = '<option value="' + resData.user_id + ',' + assignvar + '">' + resData.user_name + '</option>';
					$('#sheduleErc_AssignId').append(assignId);
				});
			}
		}, error: function() {
			console.log('In Error of Get_Employee_Details Details ');
		}
	});
}


var employeearray = [];
function assign() {
	var stopToAddSelectOption = $("#sheduleErc_AssignId").val();
	if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
		showNotificationError('Please Select Employees from the List and Assign', 'error_message', 'error');
		return true;
	}
	$('#sheduleErc_AssignId :selected').each(function(i, sel) {
		var str = $(sel).val().toString();
		var arr = str.split(",");
		var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
		$(ShiftPattern).appendTo('#sheduleErcDeAssignId');
		$(this).remove();
	});
    /*
     Calling User Details Function Here
     */
	get_User_Details();
}
function de_Assign() {
	var stopToAddSelectOption = $("#sheduleErcDeAssignId").val();
	if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
		showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
		return true;
	}
	$('#sheduleErcDeAssignId :selected').each(function(i, sel) {
		var str = $(sel).val().toString();
		var arr = str.split(",");
		var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
		$(ShiftPattern).appendTo('#sheduleErc_AssignId');
		$(this).remove();
	});
}




/*
 For Get_User_Details Purpose
 */
function get_User_Details() {
	$('#sheduleErcDeAssignId option').each(function(i, sel) {
		employeearray.push($(this).attr('value'));
	});
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_id = userids[0];
			var module_id = $('#shedule_DeprtmentId').val();
			$('#hidden_UserId').val(user_id);
			var json_User_Details = {
				"user_id": user_id,
				"module_id": module_id
			};
			//            console.log('::::: SELECTED  ' + ':: USER_ID :: ' + user_id + " ::MODULE ID ::" + module_id);

			var strUrl = Service.Get_User_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_User_Details),
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
						var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
						$.each(jsonArray, function(i, resData) {
							// console.log(':::: USER FST NAME ::::-> ' + resData.user_firstname + " " + resData.user_lastname + ":: Manager Name ::-> " + resData.user_manager_name + ":: EMAIL ::-> " + resData.user_email + " :: PHONE NO ::-> " + resData.user_phone + ":: DESC :: -> " + resData.mo_desc);
						});
					}
				}, error: function() {
					console.log('In Error of Get_User_Details');
				}
			});
		}
	}
}


/*
 For get_Exists_Patterns_Count Purpose
 */
function get_Exists_Patterns_Count() {
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			//    var sheduled_id = "9792";
			var json_get_Exists_Patterns_Count = {
				"start_date": strat_Date,
				"end_date": end_Date,
				"user_id": user_Id
			};
			var strUrl = Service.Get_ExistsPatternsCount;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_get_Exists_Patterns_Count),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				},
				success: function(data) {
					var responsecode = data.responseCode;
					onecountalreadyexists = data.count;
					if (200 !== responsecode) {
					} else {
					}
				}, error: function() {
					console.log('In Error of get_Exists_Patterns_Count');
				}
			});
		}
	}
}


function checking_Conditions() {
	var shiftpattern = $('#shedule_ShiftpatternId').val(); //40

	if (shiftpattern !== "" && shiftpattern !== 22) {
		if (shiftpattern === "0") {
			showNotificationError('Please Select Shift Pattern', 'shedule_ShiftpatternId', 'error');
			return true;
		}
		var module_Id = $('#shedule_DeprtmentId').val();
		if (module_Id === "0") {
			showNotificationError('Please Select Module', 'shedule_ShiftpatternId', 'error');
			return true;
		}

		var bfplit = employeearray[1];
		if (bfplit === "" || bfplit === undefined || bfplit === null) {
			showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
			return true;
		}
		var userids1 = bfplit.split(",");
		if (userids1[0] === "" || userids1[0] === undefined || userids1[0] === null) {
			showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
			return true;
		}
		var start_date = $('#sheduleErc_StartDate').val();
		if (start_date === "" || start_date === undefined) {
			showNotificationError('Please Select Start Date', 'sheduleErc_StartDate', 'error');
			return false;
		}
		var end_date = $('#sheduleErc_EndtDate').val();
		if (end_date === "" || end_date === undefined) {
			showNotificationError('Please Select End Date', 'sheduleErc_StartDate', 'error');
			return false;
		}
		var d = new Date();
		var dd = d.getDate();
		var mm = d.getMonth() + 1;
		var yy = d.getFullYear();
		today_Date = yy + "-" + mm + "-" + dd;
		      
		        if (!today_Date <= end_Date) {
		            showNotificationError('End date cannot be less than current date', 'check_Id', 'error');
		            return false;
		        }		        

		var pattern_Id = $("#shedule_ShiftpatternId").val();
		if (pattern_Id === 22 || pattern_Id === "22") {
			update_WfsSheduled_Allocated_UnAssign_Details(strat_Date, end_Date);
		} else {
			get_Exists_Patterns_Count();
			//For get_Exists_Patterns_Count Purpose
			if (onecountalreadyexists !== "0") {
				//Start of Delete and Insert New Shift Pattern
				get_WfSheduledAllocated_Details(strat_Date, end_Date);
				//-------------Start of Update ws_schedule---------------------
				get_WfSheduled_Details(strat_Date, end_Date);
				//-------------End of Update ws_schedule---------------------

				//-------------Start of Inserting Wfschedule_Details_Trans ---------------------
				insert_Wfschedule_Details_Trans(strat_Date, end_Date);
				//-------------Start of Inserting Wfschedule_Allocated_Details_Trans ---------------------
				inserting_WfsSheduled_Allocated_Details(strat_Date, end_Date);

			} else {
				//-------------Start of Inserting Wfschedule_Details_Trans ---------------------
				insert_Wfschedule_Details_Trans(strat_Date, end_Date);
				//-------------Start of Inserting Wfschedule_Allocated_Details_Trans ---------------------
				inserting_WfsSheduled_Allocated_Details(strat_Date, end_Date);


			}
		}

	}
}

/*
 For Get_Allocated_Sheduled_Details Purpose
 */
function get_WfSheduledAllocated_Details(start_datetime, end_datetime) {
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			$('#hidden_UserId').val(user_Id);
			var user_id = user_Id; //5 // To Enable Production Time
			var shiftstart_datetime = start_datetime; //2018-4-1'To Enable Production Time
			var shiftend_datetime = end_datetime; //2018-4-1To Enable Production Time
			var json_WfSheduledAllocated_Details = {
				"user_id": user_id,
				"shiftstart_datetime": shiftstart_datetime,
				"shiftend_datetime": shiftend_datetime
			};
			// console.log(':::: ALLOCATED DETAILS JSON OBJECT ::::' + JSON.stringify(json_Allocated_Sheduled_Details));
			var strUrl = Service.Get_Allocated_Sheduled_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_WfSheduledAllocated_Details),
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
						var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
						$.each(jsonArray, function(i, resData) {
							var shedule_Allocated_Id = resData.sheduled_id;
							$('#hidden_shedule_Allocated_Id').val(shedule_Allocated_Id);
						});
                        /*
                         CALLING SHEDULED DETAILS FUNCTION HERE
                         */
						// get_Sheduled_Details();
						update_WfSheduleAllocated_Details();
					}
				}, error: function() {
					console.log('In Error of Get_Allocated_Sheduled_Details');
				}
			});
		}
	}
}

/*
 For get_Sheduled_Details Purpose
 */
var ws_startdate;
var ws_enddate;
var shedule_Id;
function get_WfSheduled_Details(start_datetime, end_datetime) {
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			$('#hidden_UserId').val(user_Id);
			var user_id = user_Id; //2
			var shiftstart_datetime = start_datetime; //2018-04-01
			var shiftend_datetime = end_datetime; //2018-04-30
			var json_Sheduled_Details = {
				"user_id": user_id,
				"shiftstart_datetime": shiftstart_datetime,
				"shiftend_datetime": shiftend_datetime
			};
			//            console.log(':::: SHEDULED DETAILS JSON OBJECT ::::' + JSON.stringify(json_Sheduled_Details));
			var strUrl = Service.Get_Sheduled_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_Sheduled_Details),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				}, success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
						$.each(jsonArray, function(i, resData) {
							shedule_Id = resData.sheduled_id;
							ws_startdate = resData.shiftstart_datetime;
							ws_enddate = resData.shift_endtime;
							$('#hidden_sheduleId').val(shedule_Id);
						});
						if (start_datetime === ws_startdate && end_datetime === ws_enddate) {
							update_WfShedule_Details();
						}
						//-------------End of Update ws_schedule---------------------
						get_Shedule_Details_Counts(start_datetime, end_datetime, user_Id);
						get_Sheduled_Count(start_datetime, user_Id);
					}
				}, error: function() {
					console.log('In Error of get_WfSheduled_Details');
				}
			});
		}
	}
}

/*
 For update_WfSheduleAllocated_Details Purpose
 */
function update_WfSheduleAllocated_Details() {

	var wsascheduleid2len = $('#hidden_shedule_Allocated_Id').val();
	var json_update_WfSheduleAllocated_Details = {
		"sheduled_id": wsascheduleid2len
	};
	var strUrl = Service.Update_WfSheduleAllocated_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_update_WfSheduleAllocated_Details),
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
			}
		}, error: function() {
			console.log('In Error of Update_WfSheduleAllocated_Details');
		}
	});
}


/*
 For update_WfShedule_Details Purpose
 */
function update_WfShedule_Details() {
	var sheduled_id = $('#hidden_sheduleId').val();
	var json_update_WfShedule_Details = {
		"sheduled_id": sheduled_id
	};
	var strUrl = Service.Update_WfShedule_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_update_WfShedule_Details),
		contentType: "application/json", async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
			}
		}, error: function() {
			console.log('In Error of update_WfShedule_Details');
		}
	});
}


/*
 For get_Shedule_Details_Counts Purpose
 */ function get_Shedule_Details_Counts(start_datetime, end_datetime, user_Id) {

	var start_date = start_datetime; //2018-04-09 00:00:00
	var end_date = end_datetime; //2018-04-18 00:00:00
	var user_id = user_Id; //2
	var json_Shedule_Details_Counts = {
		"start_date": start_date,
		"end_date": end_date,
		"user_id": user_id
	};
	console.log(' ::::: SHEDULE DETAILS COUNTS ::::: ->' + JSON.stringify(json_Shedule_Details_Counts));
	var strUrl = Service.Get_Shedule_Details_Counts;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Shedule_Details_Counts),
		contentType: "application/json", async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			var getchedulecount1 = data.count;
			if (200 !== responsecode) {
			}
			if (getchedulecount1 === 0 || getchedulecount1 !== 0) {
				//Inserting Wfschedule Trans Details 
				insert_Wfschedule_Details_Trans(start_datetime, end_datetime);
			}
		}, error: function() {
			console.log('In Error of get_Shedule_Details_Counts');
		}
	});
}




/*
 For Get_Sheduled_Count Purpose
 */
function get_Sheduled_Count(strat_Date, user_Id) {
	var json_get_Sheduled_Count = {
		"allocated_Date": strat_Date,
		"user_id": user_Id
	};
	var strUrl = Service.Get_Sheduled_Count;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_get_Sheduled_Count),
		contentType: "application/json", async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			getleavedatecount = data.count;
			if (200 !== responsecode) {
			} else {
			}
		}, error: function() {
			console.log('In Error of get_Sheduled_Count');
		}
	});
}

/*
 For insert_Wfschedule_Details_Trans Purpose
 */
function insert_Wfschedule_Details_Trans(strat_Date, end_Date) {
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			var kellyid = "8"; //8 Temporarory
			var user_createddtm = Constants.Created_Dtm;
			var user_createdbyid = Constants.User_Id; //112 Temporarory
			var user_cretedbymoduledid = Constants.Module_Id; //2 Temporarory
			var user_createdbyroleid = Constants.Role_Id; //3 Temporarory
			var user_isactive = "true"; //true
			var roleid = "2"; //2
			var ShiftpatternId = $('#shedule_ShiftpatternId').val();
			var json_inserting_Shedule_Details = {
				"user_id": user_Id,
				"strat_date": strat_Date,
				"end_date": end_Date,
				"patternid": ShiftpatternId,
				"kellyid": kellyid,
				"user_createddtm": user_createddtm,
				"user_createdbyid": user_createdbyid,
				"user_cretedbymoduledid": user_cretedbymoduledid,
				"user_createdbyroleid": user_createdbyroleid,
				"user_isactive": user_isactive,
				"roleid": roleid
			};
			//            console.log(' ::::: insert_Wfschedule_Details_Trans ::::: ->' + JSON.stringify(json_inserting_Shedule_Details));
			var strUrl = Service.Insert_Wfschedule_Details;
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
				}, success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
					}
				}, error: function() {
					console.log('In Error of insert_Wfschedule_Details_Trans');
				}
			});
		}
	}
}


/*
 For inserting_WfsSheduled_Allocated_Details Purpose
 */
function inserting_WfsSheduled_Allocated_Details(start_Date, end_Date) {

	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			var module_Id = $("#shedule_DeprtmentId").val(); //3 Temporarory
			var createdby_Id = Constants.User_Id; //112 Temporarory
			var createdby_ModuleId = Constants.Module_Id; //2 Temporarory
			var createdby_RoleId = Constants.Role_Id; //3 Temporarory
			var patternid = $("#shedule_ShiftpatternId").val(); //3 Temporarory
			var json_inserting_WfsSheduled_Allocated_Details = {
				"user_id": user_Id,
				"moduleid": module_Id,
				"createdbyid": createdby_Id,
				"createdbymoduleid": createdby_ModuleId,
				"createdbyroleid": createdby_RoleId,
				"patternid": patternid,
				"start_Date": start_Date,
				"end_Date": end_Date
			};
			//console.log(' ::::: Inserting_WfsSheduled_Allocated_Details ::::: ->' + JSON.stringify(json_inserting_WfsSheduled_Allocated_Details));
			var strUrl = Service.Inserting_WfsSheduled_Allocated_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_inserting_WfsSheduled_Allocated_Details),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				}, success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						$('#schedule_ErcSaveId').html('Schedule Assigned from ' + start_Date + ' to ' + end_Date + ' over Previous Schedule').css('color', 'blue');
						//Holiday Count Function Calling Here 
						get_Holiday_Count(user_Id, strat_Date, module_Id);
						getting_User_Details(user_Id, start_Date, end_Date);
						setTimeout(function() {
							window.location.reload();
						}, 3000);
					}
				}, error: function(err) {
					console.log('In Error of inserting_WfsSheduled_Allocated_Details' + err);
				}
			});
		}
	}
}




/*
 For Update_WfsSheduled_Allocated_UnAssign_Details Purpose
 */
function update_WfsSheduled_Allocated_UnAssign_Details(start_Date, end_Date) {
	for (var i = 0; i < employeearray.length; i++) {
		var beforsplit = employeearray[i];
		var userids = beforsplit.split(",");
		if (userids[0] !== "0") {
			var user_Id = userids[0];
			var json_inserting_WfsSheduled_Allocated_Details = {
				"start_date": start_Date,
				"end_date": end_Date,
				"user_id": user_Id
			};
			//console.log(' ::::: Inserting_WfsSheduled_Allocated_Details ::::: ->' + JSON.stringify(json_inserting_WfsSheduled_Allocated_Details));
			var strUrl = Service.Update_WfsSheduled_Allocated_UnAssign_Details;
			$.ajax({
				type: "POST",
				url: strUrl,
				dataType: "json",
				data: JSON.stringify(json_inserting_WfsSheduled_Allocated_Details),
				contentType: "application/json",
				async: false,
				crossDomain: true,
				headers: {
					"X-TENANT-ID": "PROCREATE"
				}, success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						$('#schedule_ErcSaveId').html('Successfully Schedule Un-Assigned').css('color', 'blue');
						setTimeout(function() {
							window.location.reload();
						}, 3000);
					}
				}, error: function(err) {
					console.log('In Error of Update_WfsSheduled_Allocated_UnAssign_Details' + err);
				}
			});
		}
	}
}

/*
 For Get_Holiday_Count Purpose
 */
function get_Holiday_Count(user_Id, strat_Date, module_Id) {
	var json_Holiday_Count = {
		"holiday_date": strat_Date
	};
	var strUrl = Service.Get_Holiday_Count;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Holiday_Count),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			hdcount = data.count;
			if (200 !== responsecode) {
			} else {
				get_Sheduled_Allocated_Details(user_Id, strat_Date, module_Id);
			}
		}, error: function() {
			console.log('In Error of get_Holiday_Count');
		}
	});
}


/*
 For get_Sheduled_Allocated_Details Purpose
 */
function get_Sheduled_Allocated_Details(user_Id, strat_Date, module_Id) {
	var shift_Id;
	var json_Sheduled_Allocated = {
		"holiday_date": strat_Date
	};
	var strUrl = Service.Get_Sheduled_Allocated_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Sheduled_Allocated),
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
				var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
				$.each(jsonArray, function(i, resData) {
					//var module_Id = resData.module_id;
					// var sheduled_Id = resData.sheduled_id;
					shift_Id = resData.shift_Id;
					// var pattern_Id = resData.patternid;
				});
				if (shift_Id === "4") {
					shift_Id = 12;
				}
				if (hdcount === 1 && shift_Id !== "12") {
					get_Leaves_Balance_Count(user_Id, strat_Date);
					lct_presentstatusf++;
					lct_noofleavesusedf++;
					lctpresentstatus = lct_presentstatusf;
					lctnoofleavesadded = lct_noofleavesusedf;
					update_Leave_Details(lct_presentstatusf, lct_noofleavesusedf, lct_idf);
				}

			}
			get_Leave_Balance_count();
			get_Leave_Balance_AllDetails(user_Id);
			inserting_User_Leave_Details(strat_Date, user_Id, module_Id);
		}, error: function() {
			console.log('In Error of get_Sheduled_Allocated_Details');
		}
	});
}



/*
 For get_Leaves_Balance_Count Purpose
 */
function get_Leaves_Balance_Count(user_Id, strat_Date) {

	var json_Leaves_Balance_Count = {
		"user_id": user_Id,
		"leave_date": strat_Date
	};
	var strUrl = Service.Get_Leaves_Balance_Count;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Leaves_Balance_Count),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			holidayExists = data.count;
			if (200 !== responsecode) {
			} else {
				if (holidayExists === "0") {
					update_Leaves_Balance_Details(user_Id, strat_Date);
				}
			}
		}, error: function() {
			console.log('In Error of get_Leaves_Balance_Count');
		}
	});
}



/*
 For get_Leave_Balance_AllDetails Purpose
 */
function get_Leave_Balance_AllDetails(user_Id) {
	var json_Leave_Balance_All_Details = {
		"user_id": user_Id,
		"leave_typeid": "11"//php there passing card code value
	};
	var strUrl = Service.Get_Leave_Balance_AllDetails;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Leave_Balance_All_Details),
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
				var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
				$.each(jsonArray, function(i, resData) {
					lct_idf = resData.leave_id;
					lct_moduleidf = resData.module_id;
					lct_presentstatusf = resData.levaev_present_status;
					lct_noofleavesusedf = resData.leave_noofleaves_used;
					lct_noofleavesaddedf = resData.leave_noofleaves_added;
					lct_lapsedf = resData.leave_lapsed;
				});
				if (holidayExists !== "0") {
					update_Leave_Details(lct_presentstatusf, lct_noofleavesusedf, lct_idf);
				}
			}
		}, error: function() {
			console.log('In Error of Get_Leave_Balance_AllDetails');
		}
	});
}


/*
 For Update_Leaves_Balance_Details Purpose
 */
function update_Leaves_Balance_Details(user_Id, start_Date) {
	var json_update_Leaves_Balance_Details = {
		"user_id": user_Id,
		"leave_date": start_Date
	};
	var strUrl = Service.Update_Leaves_Balance_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_update_Leaves_Balance_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		}, success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {

			}
		}, error: function(err) {
			console.log('In Error of Update_Leaves_Balance_Details' + err);
		}
	});
}



/*
 For update_Leave_Details Purpose
 */
function update_Leave_Details(lct_presentstatusf, lct_noofleavesusedf, lct_idf) {
	var json_Update_Leave_Details = {
		"present_status": lct_presentstatusf,
		"noofleavesused": lct_noofleavesusedf,
		"leave_id": lct_idf
	};
	var strUrl = Service.Update_LeaveDetails;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Update_Leave_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		}, success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {

			}
		}, error: function(err) {
			console.log('In Error of Update_LeaveDetails' + err);
		}
	});
}




/*
 For get_Leaves_Balance_Count Purpose
 */
function get_Leave_Balance_count() {

	var strUrl = Service.Get_Leave_Balance_count;
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			lctidcount = data.count;
			if (200 !== responsecode) {
			} else {
				if (lctidcount === "") {
					lctidcountnew = 1;
				} else {
					lctidcount++;
					lctidcountnew = lctidcount;
				}
			}
		}, error: function() {
			console.log('In Error of Get_Leave_Balance_count');
		}
	});
}




/*
 For inserting_User_Leave_Details Purpose
 */
function inserting_User_Leave_Details(strat_Date, user_Id1, module_Id1) {
	var user_leave_Id = lctidcountnew;
	var user_Id1 = user_Id1;
	var module_Id1 = module_Id1;
	var leavetype_Id = "11"; //Php They Are Assigning Harc Code Value
	var noof_Leaves = "1"; //Php They Are Assigning Harc Code Value
	var leave_Date = strat_Date;
	var leaveused_Status = "true";
	var leaveapply_Id = "null"; //Php They Are Assigning Harc Code Value
	var user_createddtm = "now()"; //Php They Are Assigning Harc Code Value
	var user_createdby_Id = user_Id; //Temporary Purpose
	var user_cretedbymoduled_Id = module_Id; //Temporary Purpose
	var user_createdbyrole_Id = role_Id; //Temporary Purpose
	var json_User_Leave_Details = {
		"user_leave_id": user_leave_Id,
		"user_id": user_Id1,
		"moduleid": module_Id1,
		"leavetypeid": leavetype_Id,
		"noofleaves": noof_Leaves,
		"leavedate": leave_Date,
		"leaveusedstatus": leaveused_Status,
		"leaveapplyid": leaveapply_Id,
		"user_createddtm": user_createddtm,
		"user_createdbyid": user_createdby_Id,
		"user_cretedbymoduledid": user_cretedbymoduled_Id,
		"user_createdbyroleid": user_createdbyrole_Id
	};
	var strUrl = Service.Inserting_User_Leave_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_User_Leave_Details),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		}, success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
			}
		}, error: function(err) {
			console.log('In Error of Inserting_User_Leave_Details' + err);
		}
	});
}




/*
 For Get_Legends_ShiftType_Details Purpose
 */
function get_Legends_ShiftType_Details() {

	var strUrl = Service.Get_Legends_ShiftType_Details;
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
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
				var jsonArray = data.objPatternsERCControllerDTO;
				checking_Mail_Conditions(jsonArray);
				$.each(jsonArray, function(i, resData) {
					user_shifttypeid = resData.user_shifttypeid;
					user_shifttype = resData.user_shifttype;
					user_desc = resData.user_desc;
					user_name = resData.user_name;
				});
			}
		}, error: function() {
			console.log('In Error of Get_Legends_ShiftType_Details');
		}
	});
}



function checking_Mail_Conditions(strData) {
	displaylegends = '<br/>';
	displaylegends = displaylegends + '<table cellspacing="0" cellpadding="0" class="drContent" border="0"  style="width:100%; border-bottom:rgb(0,0,0) 1pt solid;border-top:rgb(0,0,0) 1pt solid;border-left:rgb(0,0,0) 1pt solid;border-right:rgb(0,0,0) 1pt solid;">';
	displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" width="1%"><font color="red">Legends</font></td>';
	for (var i = 0; i < strData.length; i++) {
		legendname = strData[i].user_name;
		shifttype = strData[i].user_shifttype;
		if (shifttype === "D") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#EEE8AA" width="2%">' + legendname + '</td>';
		} else if (shifttype === "E") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#ccccccc" width="2%">' + legendname + '</td>';
		} else if (shifttype === "N") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#DEB887" width="2%">' + legendname + '</td>';
		} else if (shifttype === "EL") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#FFC0CB" width="2%">' + legendname + '</td>';
		} else if (shifttype === "SL") {
			displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#87CEFA" width="2%">' + legendname + '</td>';
		} else if (shifttype === "G") {
			displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#BCD7BC" width="2%">' + legendname + '</td>';
		} else if (shifttype === "LOP") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#CD5C5C" width="2%">' + legendname + '</td>';
		} else if (shifttype === "CO") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#8FBC8F" width="2%">' + legendname + '</td>';
		} else if (shifttype === "CL") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#40E0D0" width="2%">' + legendname + '</td>';
		} else if (shifttype === "RO") {
			displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#669999" width="2%">' + legendname + '</td>';
		} else if (shifttype === "ES") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#BFFF80" width="2%">' + legendname + '</td>';
		} else if (shifttype === "TRG") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#E68A8A" width="2%">' + legendname + '</td>';
		} else if (shifttype === "U") {
			displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#ADD8E6" width="2%">' + legendname + '</td>< td class = "drContent" align = "center" width = "2%" bgcolor = "#94DBFF" > Shift - LS: Leave Status < /td></tr > ';
		}
	}
	displaylegends = displaylegends + '</table>';
}


/*
 For getting_User_Details Purpose
 */
function getting_User_Details(user_Id, start_Date, end_Date) {
	var module_Id = $("#shedule_DeprtmentId").val();
	var json_Getting_User_Details = {
		"user_id": user_Id,
		"module_id": module_Id
	};
	var strUrl = Service.Getting_User_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Getting_User_Details),
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
				var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
				$.each(jsonArray, function(i, resData) {
					user_firstname = resData.user_firstname;
					user_lastname = resData.user_lastname;
					user_manager_name = resData.user_manager_name;
					user_email = resData.user_email;
					user_phone = resData.user_phone;
					mo_desc = resData.mo_desc;
				});
				get_Legends_ShiftType_Details();
				inserting_Email_For_ERC(user_firstname, user_lastname, user_manager_name, user_phone, mo_desc, user_email, user_Id, start_Date, end_Date);
				//Inserting_Sms_TO_Schedule_OF_ERC_Details(user_firstname, user_lastname, user_manager_name, user_phone, mo_desc, user_email, user_Id, start_Date, end_Date);
			}
		}, error: function() {
			console.log('In Error of Getting_User_Details');
		}
	});
}


function inserting_Email_For_ERC(user_firstname, user_lastname, user_manager_name, user_phone, mo_desc, user_email, user_Id, start_Date, end_Date) {
	if (user_email === "NA" || user_email === "" || user_email === "null") {
		user_email = "test@gmail.com";
	}
	var htmlTxt1 = "";
	var rmusername = 'Srinivas PRASAD RAYACHURI'; //temporary purpose
	var name = user_firstname + user_lastname;
	var subject = "Duty Roster for " + name + " From Date " + start_Date + " To Date " + end_Date;
	var startmessg = "Dear " + name + ",<br><br> Duty Roster has been Scheduled by : " + rmusername + "<br><br>";
	var htmldisplaytext = '<table CELLSPACING=0 CELLPADDING=0  BORDER=1  WIDTH=100%><tr> <td align="center" bgcolor="#B8EBFF" colspan=6 height="60"><b><font style="font-size: 24pt;">WorkForce Management System</font></b></td></tr> <tr><td align="left" colspan=6 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Employee Details</b></font></td> </tr> <tr><td align="center"><font><b>Employee ID</b></font></td><td colspan=1 align="center">' + user_Id + '</td><td align="center"><b>Employee Name</b></td><td align="center">' + name + '</td><td align="center"><b>Department</b></td><td align="center">' + mo_desc + '</td></tr><tr><td align="left" colspan=7 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Work Schedule Details</b></font></td></tr><tr bgcolor="#B8EBFF"><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="9%">&nbsp;&nbsp;S.No</td><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="15%">Allocated Date</td><td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Shift Type</td><td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Shift Description</td><td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Start Time</td><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="15%">End Time</td></tr></table>';
	var loc_complete = htmlTxt1 + '</table><br><br>Regards:  <br>' + rmusername + '<br>Workforce Management System.';
	var messagefinal = startmessg + htmldisplaytext + loc_complete + displaylegends;
	var json_Inserting_Email_Details = {
		"inboxqueueid": "0",
		"replyuser": "0",
		"us_email": user_email,
		"subject": subject,
		"replybody": messagefinal,
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
			} else {
				//alert("Mail has been sent to user :"+ name );
				$('#mail_ErcSaveId').html('Mail has been sent to user :' + name + ' ').css('color', 'blue');
			}
		},
		error: function(err) {
			console.error("Error in Inserting_Email_For_Driver_To_Zone" + JSON.stringify(err));
		}
	});
}


/*
 Leave Cancellation SMS Sending
 */
function Inserting_Sms_TO_Schedule_OF_ERC_Details(user_firstname, user_lastname, user_manager_name, user_phone, mo_desc, user_email, user_Id, start_Date, end_Date) {
	var smsTxt1 = "Shift Schedule ($spSdate[2]/$displaysdate1/$spSdate[0] to $spEdate[2]/$displayedate1/$spEdate[0]):";
	var json_Inserting_Sms_Details = {
		"message": subject,
		"to_mobile_no": phone_Number,
		"from_mobile_no": "0",
		"no_of_attempts": "0",
		"msg_sent_dtm": "now()",
		"status_id": "1",
		"leave_createdbyid": user_Id,
		"leave_createdbymoduleid": module_Id,
		"leave_createdbyroleid": role_Id,
		"leave_createddtm": "now()"
	};
	console.log(' :::: SMS JSON OBJECT ::::' + JSON.stringify(json_Inserting_Sms_Details));
	var strUrl = Service.Inserting_Sms_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Inserting_Sms_Details),
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
				showNotificationError('Sms Sended Succsefully', 'Cancel_Leave_ID', 'success');
			}
		},
		error: function(err) {
			console.error("Error in json_Leave__UserCancel_Details" + JSON.stringify(err));
		}
	});
}
//SMS FUNCTIONALITY PENDING
var stime;
//switch statment for Start and end time
function seTime(i) {
	//echo("ii=".$i);
	switch (i) {
		case 1:
			stime = "1AM";
			break;
		case 2:
			stime = "2AM";
			break;
		case 3:
			stime = "3AM";
			break;
		case 4:
			stime = "4AM";
			break;
		case 5:
			stime = "5AM";
			break;
		case 6:
			stime = "6AM";
			break;
		case 7:
			stime = "7AM";
			break;
		case 8:
			stime = "8AM";
			break;
		case 9:
			stime = "9AM";
			break;
		case 10:
			stime = "10AM";
			break;
		case 11:
			stime = "11AM";
			break;
		case 12:
			stime = "12AM";
			break;
		case 13:
			stime = "1PM";
			break;
		case 14:
			stime = "2PM";
			break;
		case 15:
			stime = "3PM";
			break;
		case 16:
			stime = "4PM";
			break;
		case 17:
			stime = "5PM";
			break;
		case 18:
			stime = "6PM";
			break;
		case 19:
			stime = "7PM";
			break;
		case 20:
			stime = "8PM";
			break;
		case 21:
			stime = "9PM";
			break;
		case 22:
			stime = "10PM";
			break;
		case 23:
			stime = "11PM";
			break;
		case 24:
			stime = "Midnight";
			break;
	}
	return stime;
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
