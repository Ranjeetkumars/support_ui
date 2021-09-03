/**
 * @author:Bhuneshwar Patel
 * @DATE:31/12/2019
 * @returns
 */



$(document).ready(function() {
	searchIssuesList();
	getIssuesTypeForSearch();
	//searchIssuesList();

	getVehicleNameForSearch() ;
	reportedBy();
 	getIssuesType();
 	assignTo();
 	getVehicleName();
	//getIssuesList();
//	$('#basicExample').timepicker();
});
$("#datepicker").datepicker({
	autoclose : true,
	todayHighlight : true,
}).datepicker();

//var currentDate = new Date();
//console.log("CurrentDate---->" + currentDate);
//$("#datepicker").datepicker("setDate", currentDate);
//var date = $('#datepicker').val();
//console.log("date---->" + date);

$("#udatepicker").datepicker({
	autoclose : true,
	todayHighlight : true,
}).datepicker();

/**
 * @Date:-31/12/2019
 * @Functionality:IssuesType
 * @returns:-Issues Type
 */
function getIssuesType() {
	$('#issue_type_id').empty();
	var strUrl = Service.issuesType;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				 /*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Issue Type</option>";
						$('#issue_type_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var issuesType = "<option value="
									+ resData.ist_issue_type_id + ">"
									+ resData.status_type + "</option>";
							$(issuesType).appendTo('#issue_type_id');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#issue_type_id').trigger("chosen:updated");
	$("#issue_type_id").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:IssuesType
 * @returns:-Issues Type
 */
function getIssuesTypeForSearch() {
	$('#sissuestypeid').empty();
	var strUrl = Service.issuesType;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Issue Type</option>";
						$('#sissuestypeid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var issuesType = "<option value="
									+ resData.ist_issue_type_id + ">"
									+ resData.status_type + "</option>";
							$(issuesType).appendTo('#sissuestypeid');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#sissuestypeid').trigger("chosen:updated");
	$("#sissuestypeid").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:getIssuesTypeForUpdate
 * @returns:-Issues Type
 */
function getIssuesTypeForUpdate() {
	$('#uissue_type_id').empty();
	var strUrl = Service.issuesType;
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
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Issue Type</option>";
						$('#uissue_type_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var genderType = "<option value="
									+ resData.ist_issue_type_id + ">"
									+ resData.status_type + "</option>";
							$(genderType).appendTo('#uissue_type_id');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#uissue_type_id').trigger("chosen:updated");
	$("#uissue_type_id").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:reportedBy
 * @returns:-Reported By User
 */
function reportedBy() {
	$('#report_id').empty();
	var strUrl = Service.getUser;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#report_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var userName = "<option value=" + resData.username
									+ ">" + resData.username + "</option>";
							$(userName).appendTo('#report_id');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#report_id').trigger("chosen:updated");
	$("#report_id").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:reportedByForUpdate
 * @returns:-Reported By User
 */
function reportedByForUpdate() {
	$('#ureport_id').empty();
	var strUrl = Service.getUser;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#ureport_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var reportedBy = "<option value="
									+ resData.ist_createdbyroleid + ","
									+ resData.username + ">" + resData.username
									+ "</option>";
							$(reportedBy).appendTo('#ureport_id');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#ureport_id').trigger("chosen:updated");
	$("#ureport_id").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:assignTo
 * @returns:-assign To User
 */
function assignTo() {
	$('#assign_to').empty();
	var strUrl = Service.getUser;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Assign To User</option>";
						$('#assign_to').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var assignTo = "<option value=" + resData.username
									+ ">" + resData.username + "</option>";
							$(assignTo).appendTo('#assign_to');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#assign_to').trigger("chosen:updated");
	$("#assign_to").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:assignTo
 * @returns:-assign To User
 */
function assignToUpdate() {
	$('#uassign_to').empty();
	var strUrl = Service.getUser;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Assign To User</option>";
						$('#uassign_to').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var assignTo = "<option value=" + resData.username
									+ ">" + resData.username + "</option>";
							$(assignTo).appendTo('#uassign_to');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#uassign_to').trigger("chosen:updated");
	$("#uassign_to").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:assignTo
 * @returns:-assign To User
 */
function issueVerfiedBy() {
	$('#issue_verified').empty();
	var strUrl = Service.getUser;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Inspector</option>";
						$('#issue_verified').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var issuesVerified = "<option value="
									+ resData.username + ">" + resData.username
									+ "</option>";
							$(issuesVerified).appendTo('#issue_verified');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#issue_verified').trigger("chosen:updated");
	$("#issue_verified").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:assignTo
 * @returns:-Vehicle Name
 */
function getVehicleName() {
	$('#vehicleid').empty();
	var strUrl = Service.getVehicleName;
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
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#vehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicleName = "<option value="
									+ resData.ist_vehicleid + ">"
									+ resData.vehiclename + "</option>";
							$(vehicleName).appendTo('#vehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#vehicleid').trigger("chosen:updated");
	$("#vehicleid").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:getVehicleNameForUpdate
 * @returns:-Vehicle Name
 */
function getVehicleNameForUpdate() {
	$('#uvehicleid').empty();
	var strUrl = Service.getVehicleName;
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
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#uvehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicleName = "<option value="
									+ resData.ist_vehicleid + ">"
									+ resData.vehiclename + "</option>";
							$(vehicleName).appendTo('#uvehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#uvehicleid').trigger("chosen:updated");
	$("#uvehicleid").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:getVehicleNameForSearch
 * @returns:-Vehicle Name
 */
function getVehicleNameForSearch() {
	$('#svehicleid').empty();
	var strUrl = Service.getVehicleName;
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
						var jsonArray = data.issuesControlllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#svehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicleName = "<option value="
									+ resData.ist_vehicleid + ">"
									+ resData.vehiclename + "</option>";
							$(vehicleName).appendTo('#svehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#svehicleid').trigger("chosen:updated");
	$("#svehicleid").chosen();
}

/**
 * @Date:-31/12/2019
 * @Functionality:saveIssuesDetails
 * @returns:-status ok if successfully inserted.
 */
function saveIssuesDetails() {
	console.log("Issues Details function Calling.");
	var vehicle_id = $('#vehicleid').val();
	var issueDate = $('#reported_date').val();
	var issueType = $('#issue_type_id').val();
	var summary_id = $('#summary').val();
	var description_id = $('#description').val();
	var odometer_id = $('#odometer').val();
	var labelid = $('#lalbel_id').val();
	var reportid = $('#report_id').val();
	var assignto = $('#assign_to').val();

	if (summary_id == "" || summary_id == '' || summary_id == null) {
		summary_id = ' ';
	}
	if (description_id == "" || description_id == '' || description_id == null) {
		description_id = ' ';
	}

	var objson = {
		"in_condition" : 1,
		"ist_vehicleid" : vehicle_id,
		"ist_issue_date" : issueDate,
		"ist_issue_type_id" : issueType,
		"ist_issue_summary" : summary_id,
		"ist_issue_desc" : description_id,
		"ist_odo_at_issue" : odometer_id,
		"ist_priorityid" : 1,
		"ist_issue_duedate" : "2019-06-01",
		"ist_issue_statusid" : 1,
		"ist_issue_reportedby" : reportid,
		"ist_issue_assignedby" : assignto,
		"ist_issue_assignedto" : assignto,
		"ist_createdbyid" : 1,
		"ist_createdbyroleid" : 1,
		"ist_createdbymoduleid" : 1,
		"ist_serialid" : 0
	};

	if (vehicle_id === "0" || vehicle_id === '0') {
		showNotificationError("Please Select Vehicle ", "vehicleid", "error");
		return;
	}
	if (issueDate === "0" || issueDate === '' || issueDate === null) {
		showNotificationError("Please Select Reported Date ", "reported_date",
				"error");
		return;
	}
	if (issueType === "0" || issueType === '0') {
		showNotificationError("Please Select Issues Type ", "issue_type_id",
				"error");
		return;
	}
	if (odometer_id === "0" || odometer_id === '' || odometer_id === null) {
		showNotificationError("Please Enter Odometer ", "odometer", "error");
		return;
	}
	if (reportid === "0" || reportid === '0') {
		showNotificationError("Please Select Reported By ", "report_id",
				"error");
		return;
	}
	if (assignto === "0" || assignto === '0') {
		showNotificationError("Please Select Assign To", "assign_to", "error");
		return;
	}
	console.log("ObJson---->" + JSON.stringify(objson));
	var strUrl = Service.saveIssuesDetails;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			
			if(data.responseCode===200||data.responseCode===200){	
				console.log("Sucessfully Inserted...");
			showNotificationError("Successfully Inserted ", "saveissuesBtn",
					"success");}
		
			
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	})
}

function editIssues(ist_serialid, vehiclename, issue_type, ist_issue_date, ist_issue_summary,
		ist_issue_desc, ist_issue_reportedby, ist_issue_assignedby, ist_odo_at_issue) {

	$('#serical_ID').val(ist_serialid);
	getIssuesTypeForUpdate();
	reportedByForUpdate();
	assignToUpdate();
	getVehicleNameForUpdate();
	issueVerfiedBy();
	$('#uvehicleid').val();
	$('#ureported_date').val(ist_issue_date);
	$('#issue_type_id').val();
	$('#summary').val(ist_issue_summary);
	$('#udescription').val(ist_issue_desc);

	$('#uodometer').val(ist_odo_at_issue);
	$('#ulalbel_id').val();
	$('#ureport_id').val();
	$("#uvehicleid option:contains(" + vehiclename + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#uissue_type_id option:contains(" + issue_type + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#ureport_id option:contains(" + ist_issue_reportedby + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#uassign_to option:contains(" + ist_issue_assignedby + ")").attr('selected',
			'selected').trigger("chosen:updated");

	var roleid = 1;
	if (roleid != 1) {
		//$("#issue_verified").prop("disabled", false);
		//$("#uremarks_id").prop("disabled", false);    
		$('#hideVerifiedByInspector').show();
		$('#inspectorRemarkID').show();
	} else {
		$('#hideVerifiedByInspector').hide();
		$('#inspectorRemarkID').hide();
		//$("#uremarks_id").prop("disabled", true);    
		//$("#issue_verified").prop('disabled', 'disabled').trigger('chosen:updated');
		//$("#issue_verified").attr('disabled', true).trigger('chosen:updated');
	}
}

function updateIssues() {
	console.log("update issues function calling..");
	var serialid = $('#serical_ID').val();
	var vehicleid = $('#uvehicleid').val();
	var reportdedDate = $('#ureported_date').val();
	var issue_type_id = $('#uissue_type_id').val();
	var summaryid = $('#summary').val();
	var description = $('#udescription').val();
	var odometer = $('#uodometer').val();
	var assignto = $('#uassign_to').val();
	var reporteto = $('#ureport_id').val();
	console.log("Reported--->" + reporteto);
	var reportid = reporteto.split(",");
	console.log("report 1-->" + reportid[0] + "  1--->" + reportid[1]);
	var remarks = $('#uremarks_id').val();
	var issueVerified = $('#issue_verified').val();

	var objson = {
		"in_condition" : 2,//2 for update
		"ist_vehicleid" : vehicleid,
		"ist_issue_date" : reportdedDate,
		"ist_issue_type_id" : issue_type_id,
		"ist_issue_summary" : summaryid,
		"ist_issue_desc" : description,
		"ist_odo_at_issue" : odometer,
		"ist_priorityid" : 1,
		"ist_issue_duedate" : "2019-06-01",
		"ist_issue_statusid" : 10,
		"ist_issue_reportedby" : reportid[1],
		"ist_issue_assignedby" : assignto,
		"ist_issue_assignedto" : "we",
		"ist_createdbyid" : 1,
		"ist_createdbyroleid" : 1,
		"ist_createdbymoduleid" : 1,
		"ist_serialid" : serialid
	};

	if (vehicleid === "0" || vehicleid === '0') {
		showNotificationError("Please Select Vehicle ", "uvehicleid", "error");
		return;
	}
	if (reportdedDate === "0" || reportdedDate === '' || reportdedDate === null) {
		showNotificationError("Please Select Reported Date ", "ureported_date",
				"error");
		return;
	}
	if (issue_type_id === "0" || issue_type_id === '0') {
		showNotificationError("Please Select Issues Type ", "uissue_type_id",
				"error");
		return;
	}
	if (odometer === "0" || odometer === '' || odometer === null) {
		showNotificationError("Please Enter Odometer ", "uodometer", "error");
		return;
	}
	if (reporteto === "0" || reporteto === '0') {
		showNotificationError("Please Select Reported By ", "ureport_id",
				"error");
		return;
	}
	if (assignto === "0" || assignto === '0') {
		showNotificationError("Please Select Assign To", "uassign_to", "error");
		return;
	}

	console.log("ObJson---->" + JSON.stringify(objson));
	var strUrl = Service.updateIssues;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Sucessfully Updated...");
			showNotificationError("Successfully Updated", "update_issue_id",
					"success");

		},
		error : function() {
			console.log('In Error of  Details ');
		}
	})
}

function deleteIssues(serialid) {
	$('#serical_ID').val(serialid);
}

function deleteIssuesDetails(serial_id) {
	console.log("deleteIssues function Caliing..." + serial_id);
	var serial_id = $('#serical_ID').val();
	var objson = {
		"in_condition" : 3,//2 for delete
		"ist_vehicleid" : 0,
		"ist_issue_date" : "2019-01-01",
		"ist_issue_type_id" : 0,
		"ist_issue_summary" : 0,
		"ist_issue_desc" : 0,
		"ist_odo_at_issue" : 0,
		"ist_priorityid" : 0,
		"ist_issue_duedate" : "2019-06-01",
		"ist_issue_statusid" : 10,
		"ist_issue_reportedby" : 0,
		"ist_issue_assignedby" : 0,
		"ist_issue_assignedto" : " ",
		"ist_createdbyid" : 1,
		"ist_createdbyroleid" : 1,
		"ist_createdbymoduleid" : 1,
		"ist_serialid" : serial_id
	};
	console.log("ObJson---->" + JSON.stringify(objson));
	var strUrl = Service.deleteIssuesDetails;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Deleted Successfullyt...");
			showNotificationError("Successfully Deleted", "dtndelete",
					"success");
			//$('#delt').hide();
			$("#delete").modal("hide");
			searchIssuesList();
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	})
}

/**
 * @Date:-31/12/2019
 * searchIssuesList
 * @returns:-List of Issues
 */
function searchIssuesList() {
	$("#deleteButtonID").hide();
	var vehicleid = $('#svehicleid').val();
	var issueType = $('#sissuestypeid').val();

	if (vehicleid == "0" || vehicleid == '0') {
		vehicleid = null;
	}

	if (issueType == "0" || issueType == '0') {
		issueType = null;
	}



	var objson = {
		"ist_vehicleid" : vehicleid,
		"ist_issue_type_id" : issueType
	}
	var strUrl =Service.searchIssuesList;
	$.ajax({
		type : 'POST',
		data : JSON.stringify(objson),
		url : strUrl,
		dataType : 'json',
		contentType : "application/json",
		//async : false,
		//crossDomain : true,
		success : function(data) {
					  var responseCode = data.responseCode;
          if (200 !== responseCode) {

				$('#issuesList').empty();
				$("#deleteButtonID").hide();
				var divTag = document.createElement("h2");
				$(divTag).css("text-align", "center");
				$(divTag).html("No Data Available");
				$('#issuesList').append(divTag);
			} else {
				var jsonArray = data.issuesControlllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
					getIssuesListData(jsonArray);
					loadDataTable1()
				} else {
				}
			}
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	})

}

/**
 * @Date:-31/12/2019
 * @Functionality:getIssuesList
 * @returns:-List of Issues
 */
function getIssuesList() {
	$("#deleteButtonID").hide();
	$('#issuesList').empty();
	var strUrl = Service.getIssuesList;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		contentType : "application/json",
		async : false,
		success : function(data) {
			
			   var responseCode = data.responseCode;
	            if (200 !== responseCode) {
				$('#vehicleList_Id').empty();
				$("#deleteButtonID").hide();
				var divTag = document.createElement("h2");
				$(divTag).css("text-align", "center");
				$(divTag).html("No Data Available");
				$('#issuesList').append(divTag);
			} else {
				var jsonArray = data.issuesControlllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
			
					getIssuesListData(jsonArray);
					loadDataTable1()
				} else {
				}
			}
		},
		error : function() {
			console.log('In Error of  Details');
		}
	})

}

//dom function calling...
function getIssuesListData(strData) {
	$("#deleteButtonID").hide();
	$('#issuesList').empty();
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example1");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");
		/*
		 * $(objTHead1).html('<label class="check "> <span style=" color:
		 * white">Select</span><input type="checkbox" id="selectall"
		 * onclick="multipleCheckBox()"><span class="checkmark"></span></label>');
		 */
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select </span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTHead1).addClass("text-center");
		$(objTr).append(objTHead1);

		var objTHead2 = document.createElement("th");
		$(objTHead2).html("Vehicle Name");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Issues Type");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Schedule Status");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Status");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Edit");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Delete");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			/*
			 * $(tablcol1).html('<label class="check "> <span style=" color:
			 * white">Select</span><input type="checkbox" value=' +
			 * strData[i].serialno +' id="case"><span class="checkmark"></span></label>');
			 */
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].ist_serialid
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].vehiclename);
			console.log('vehiclename' + strData[i].vehiclename);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].issue_type);
			console.log(' issue_type' + strData[i].issue_type);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].schedule_type);
			console.log(' schedule_type' + strData[i].schedule_type);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].ist_issue_statusid);
			console.log(' ist_issue_desc' + strData[i].ist_issue_statusid);
			$(tbleRow).append(tablcol5);

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<a href="#" data-toggle="modal" data-placement="bottom" data-target="#edit" title="View"><i class="fa fa-edit"></i></a');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'editIssues("' + strData[i].ist_serialid + '","'
							+ strData[i].vehiclename + '","'
							+ strData[i].issue_type + '","'
							+ strData[i].ist_issue_date + '","'
							+ strData[i].ist_issue_summary + '","'
							+ strData[i].ist_issue_desc + '","'
							+ strData[i].ist_issue_reportedby + '","'
							+ strData[i].ist_issue_assignedby + '","'
							+ strData[i].ist_odo_at_issue + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#delete" ></span>');
			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteIssues("' + strData[i].ist_serialid + '")');

			localStorage.setItem('test', strData[i].ist_serialid);

			$(objTBody).append(tbleRow);

		}

		$("#issuesList").append(objDivTag);
		$("#deleteButtonID").show();

	} catch (err) {
		console.log("example" + err);
	}
}

//reset saveIssuesDetails
function resetSaveIssues() {
	console.log("resetSaveIssues function is calling....");
	$('#vehicleid').val('0').trigger("chosen:updated");
	$('#reported_date').val('');
	$('#issue_type_id').val('0').trigger("chosen:updated");
	$('#summary').val('');
	$('#description').val('');
	$('#odometer').val('');
	//$('#lalbel_id').val('');
	$('#report_id').val('0').trigger("chosen:updated");
	$('#assign_to').val('0').trigger("chosen:updated");
}

function resetUpdateVendorDetails() {
	console.log("resetupdateIssuesDetails function is calling...")
	//  $('#serical_ID').val();
	$('#uvehicleid').val('0').trigger("chosen:updated");
	$('#ureported_date').val('');
	$('#uissue_type_id').val('0').trigger("chosen:updated");
	$('#summary').val('');
	$('#udescription').val('');
	$('#uodometer').val('');
	$('#uassign_to').val('0').trigger("chosen:updated");
	$('#ureport_id').val('0').trigger("chosen:updated");
	$('#uremarks_id').val('');
	$('#issue_verified').val('');
}

function resetSearchDetails() {
	$('#svehicleid').val('0').trigger("chosen:updated");
	$('#sissuestypeid').val('0').trigger("chosen:updated");
	getIssuesList();
}

//this function reading selected checkbox..
function deleteMultipleIssuesDetails() {
	// alert("deleteMultipleContactchkboxReading function calling...")
	// empty(chkArray);
	var chkArray = [];
	// empty(chkArray);
	// look for all checkboes that have a parent id called 'checkboxlist'
	// attached to it and check if it was checked
	$("#tbodyData input:checked").each(function() {
		chkArray.push($(this).val());
	});
	// we join the array separated by the comma
	var selected;
	selected = chkArray.join(',');
	// check if there is selected checkboxes, by default the length is 1 as it
	// contains one single comma
	if (selected.length > 0) {
		//$("#deleteButtonID").show();
		// alert("You have selected " + selected);

		console.log("selected----->" + selected);
		$('#serical_ID').val(selected);
		$('#delete').modal('show');
		//deleteIssuesDetails(selected);

	} else {
		alert("Please at least check one of the checkbox");
	}

}

// this function using for multiple select checkbox.
function multipleCheckBox() {
	$('#reg_no').val('');
	$("#selectall").change(function(event) {
		$('.case').attr('checked', this.checked);
		if ($(this).is(":checked")) {
			$('#reg_no').val('');
			$('.case').prop("checked", true);
			event.preventDefault();
			var searchIDs = $(".case:checkbox:checked").map(function() {
				console.log("selected Contact====" + searchIDs)
				return $(this).val();
			}).get();
			$('#reg_no').val(searchIDs);

		}
	});

}

//single checkbox reading
function onclickCheckbox() {
	// alert("onclickCheckbox function calling...")

	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		// console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " +
		// $(this).val());
		console.log("myCheck12:---" + $(this).val());
		arrSelectedData.push($(this).val());
		// console.log("onclickCheckbox------>"+onclickCheckbox)
		count++;
		$('#reg_no').val(arrSelectedData);
	});
	if ($(".case").length === $(".case:checked").length) {
		// $("#selectall").attr("checked", "checked");
		$("#selectall").prop("checked", true);
	} else {
		$("#selectall").removeAttr("checked");

	}
}

//For Validation this function calling.
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

//dataTable
function loadDataTable1(tableClass) {
	$('.dataTables-example1').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'ExampleFile'
						},
						{
							extend : 'pdf',
							title : 'ExampleFile'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]

			});
}