var levelid=1;
$(document).ready(function() {
	//getResponseofficerLevel();
	getResponseofficer();
	getResponseOfficerList(levelid);
	getState();
});

function getResponseofficer() {
	var strUrl = Service.getResponseofficer;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Officer</option>";
						$('#userid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.userid + ">"
									+ resData.username + "</option>";
							$(data).appendTo('#userid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#userid').trigger("chosen:updated");
	$('#userid').chosen();
}

//on change Function
$('#userid').on('change', function() {
	var userid = $('#userid').val();
	$('#levelid').empty();
	getResponseofficerLevel(userid);
});


function getResponseofficerLevel(userid) {
	$('#levelid').empty();
	var objson = {
			"userid" : userid
		}
	var strUrl = Service.getResponseofficerLevel;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Officer Level</option>";
						$('#levelid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.levelid + ">"
									+ resData.level1 + "</option>";
							$(data).appendTo('#levelid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#levelid').trigger("chosen:updated");
	$('#levelid').chosen();
}



function getResponseofficerLevelForUpdate(userid) {	
	$('#escalateid').empty();
	var objson = {
			"userid" : userid
		}
	var strUrl = Service.getResponseofficerLevel;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Officer Level</option>";
						$('#escalateid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.levelid + ">"
									+ resData.level1 + "</option>";
							$(data).appendTo('#escalateid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#escalateid').trigger("chosen:updated");
	$('#escalateid').chosen();
}

// on change Function
$('#stateid').on('change', function() {
	var stateid = $('#stateid').val();
	// $('#districtid').empty();
	var level_id = $('#levelid').val();
	if (level_id == 1 || level_id == "1") {
		getDistrict(stateid);
	}
	if (level_id == 2 || level_id == "2") {
		getDistrictForLevel2(stateid);
	}
});

// on change Function
$('#levelid').on('change', function() {
	var level_id = $('#levelid').val();
	if (level_id == 2 || level_id == "2") {
		$("#dmandalid").hide();
	} else {
		$("#dmandalid").show();
	}
	if (level_id == 3 || level_id == "3" || level_id == 4 || level_id == "4") {
		$("#ddistrictid").hide();
		$("#dmandalid").hide();
		getStateForStateLevel();
	} else {
		$("#ddistrictid").show();
		// $("#dmandalid").show();
	}
});

// on change Function calling for update
$('#escalateid').on('change', function() {
	var level_id = $('#escalateid').val();
	if (level_id == 2 || level_id == "2") {
		$("#edmandalid").hide();
	} else {
		$("#edmandalid").show();
	}
	if (level_id == 3 || level_id == "3" || level_id == 4 || level_id == "4") {
		$("#eddistrictid").hide();
		$("#edmandalid").hide();
		getStateForUpdateStateLevel();
	} else {
		$("#eddistrictid").show();
		// $("#dmandalid").show();
	}
});

// on change Function
$('#districtid').on('change', function() {
	var distid = $('#districtid').val();
	$('#mandalid').empty();
	getMandal(distid);
});

function getState() {
	$('#stateid').empty();
	var strUrl = Service.getState;
	var objson = {
		"country_Id" : 1
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.masterDataControllerDTO;
						var selectfirst = "<option value='0'>Please Select State</option>";
						$('#stateid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.state_Id
									+ ">" + resData.state_Name + "</option>";
							$(data).appendTo('#stateid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#stateid').trigger("chosen:updated");
	$('#stateid').chosen();
}

function getStateForUpdate() {
	$('#estateid').empty();
	var strUrl = Service.getState;
	var objson = {
		"country_Id" : 1
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.masterDataControllerDTO;
						var selectfirst = "<option value='0'>Please Select State</option>";
						$('#estateid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.state_Id
									+ ">" + resData.state_Name + "</option>";
							$(data).appendTo('#estateid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#estateid').trigger("chosen:updated");
	$('#estateid').chosen();
}

function getStateForStateLevel() {
	$('#stateid').empty();
	var strUrl = Service.getStateForEscalationStateLevel;
	var user_id = $('#userid').val();
	var objson = {
		"userid" : user_id
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select State</option>";
						$('#stateid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.stateid + ">"
									+ resData.statename + "</option>";
							$(data).appendTo('#stateid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#stateid').trigger("chosen:updated");
	$('#stateid').chosen();
}

function getStateForUpdateStateLevel() {
	$('#estateid').empty();
	var strUrl = Service.getStateForEscalationStateLevel;
	var user_id = $('#userid').val();
	var objson = {
		"userid" : user_id
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select State</option>";
						$('#estateid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.stateid + ">"
									+ resData.statename + "</option>";
							$(data).appendTo('#estateid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#estateid').trigger("chosen:updated");
	$('#estateid').chosen();
}
// getAssignedVehicle Based On District.
function getDistrictForLevel2(stateid) {
	$('#districtid').empty();
	var strUrl = Service.getDistrictForLevel2;
	var user_id = $('#userid').val();
	var objson = {
		"stateid" : stateid,
		"userid" : user_id
	}
	//alert(JSON.stringify(objson));
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select District</option>";
						$('#districtid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.districtid
									+ ">" + resData.districtname + "</option>";
							$(data).appendTo('#districtid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#districtid').trigger("chosen:updated");
	$('#districtid').chosen();
}

// getAssignedVehicle Based On District.
function getDistrictForUpdateLevel2(stateid) {
	$('#edistrictid').empty();
	var strUrl = Service.getDistrictForLevel2;
	var user_id = $('#userid').val();
	var objson = {
		"stateid" : stateid,
		"userid" : user_id
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select District</option>";
						$('#edistrictid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.districtid
									+ ">" + resData.districtname + "</option>";
							$(data).appendTo('#edistrictid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#edistrictid').trigger("chosen:updated");
	$('#edistrictid').chosen();
}

// getAssignedVehicle Based On District.
function getDistrict(stateid) {
	var strUrl = Service.getDistrict;
	var user_id = $('#userid').val();
	var objson = {
		"state_Id" : stateid,
	}
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.masterDataControllerDTO;
				/* var selectfirst = "<option value='0'>Please Select District</option>"; */
				// $('#districtid').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var data = "<option value=" + resData.district_Id + ">"
							+ resData.district_Name + "</option>";
					$(data).appendTo('#districtid');
				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
	$('#districtid').trigger("chosen:updated");
	$('#districtid').chosen();
}

// getAssignedVehicle Based On District.
function getDistrictForUpdate(stateid) {
	var strUrl = Service.getDistrict;
	var user_id = $('#userid').val();
	var objson = {
		"state_Id" : stateid,
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.masterDataControllerDTO;
						var selectfirst = "<option value='0'>Please Select District</option>";
						$('#edistrictid').append(selectfirst);
						$.each(jsonArray,
								function(i, resData) {
									var data = "<option value="
											+ resData.district_Id + ">"
											+ resData.district_Name
											+ "</option>";
									$(data).appendTo('#edistrictid');
								});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#edistrictid').trigger("chosen:updated");
	$('#edistrictid').chosen();
}

function getMandal(distid) {
	$('#mandalid').empty();
	var strUrl = Service.getMandal;
	var user_id = $('#userid').val();
	var objson = {
		"districtid" : distid,
		"userid" : user_id,
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Mandal</option>";
						$('#mandalid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.mandalid
									+ ">" + resData.mandalname + "</option>";
							$(data).appendTo('#mandalid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#mandalid').trigger("chosen:updated");
	$('#mandalid').chosen();
}

function getMandalForUpdate(distid) {
	$('#emandalid').empty();
	var strUrl = Service.getMandal;
	var user_id = $('#userid').val();
	var objson = {
		"districtid" : distid,
		"userid" : user_id,
	}
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Mandal</option>";
						$('#emandalid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var data = "<option value=" + resData.mandalid
									+ ">" + resData.mandalname + "</option>";
							$(data).appendTo('#emandalid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#emandalid').trigger("chosen:updated");
	$('#emandalid').chosen();
}

function mappingResponseofficer() {
	var userid = $('#userid').val();
	var levelid = $('#levelid').val();
	var distid = $('#districtid').val();
	var stateid = $('#stateid').val();
	var mandalid = $('#mandalid').val();
	if (levelid == 4 || levelid == "4" || levelid == '4') {
		//ministryid = -1;
		stateid=-1;
	}
	if (levelid == 2 || levelid == "2" || levelid == '2') {
		mandalid = 0;
	}
	if (levelid == 3 || levelid == "3" || levelid == '3') {
		mandalid = 0;
		distid = 0;
	}
	var objson = {
		"userid" : userid,
		"levelid" : levelid,
		"mandalid" : mandalid,
		"districtid" : distid,
		"stateid" : stateid,
		"ministryid" : null,
		"createdbyid" : 1,
		"createdbymodid" : 1,
		"createdbyroleid" : 1
	}

	if (userid == "0" || userid == '0' || userid == null) {
		showNotificationError("Please Select User Name", "userid", "error");
		return;
	}
	if (levelid == "0" || levelid == '0') {
		showNotificationError("Please Select Officer level", "escalateid",
				"error");
		return;
	} else if (stateid == "0" || stateid == '0') {
		showNotificationError("Please Select Officer level", "estateid",
				"error");
		return;
	} else if (levelid == 1 || levelid == "1" || levelid == 2 || levelid == "2") {
		if (distid == "0" || distid == '0') {
			showNotificationError("Please Select District", "edistrictid",
					"error");
			return;
		} else {

		}
	} else {

	}

	if (levelid == 1 || levelid == "1") {
		if (mandalid == "0" || mandalid == '0') {
			showNotificationError("Please Select Mandal", "emandalid", "error");
			return;
		} else {

		}
	} else {

	}

	var strUrl = Service.mappingResponseofficer;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var response = data.responseCode;
			if (response == "200" || response == 200) {
				showNotificationError("Successfully Registered", "btnid",
						"success");
				window.setTimeout(function() {
					getResponseOfficerList(1);
					resetInsertResponseOfficer();
					$("#registration").modal("hide");
				}, 2000);
			}

		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
}

function resetInsertResponseOfficer() {
	$('#userid').val("0").trigger("chosen:updated");
	$('#levelid').val("0").trigger("chosen:updated");
	$('#districtid').val("0").trigger("chosen:updated");
	$('#stateid').val("0").trigger("chosen:updated");
	$('#mandalid').val("0").trigger("chosen:updated");
}

function updateResponseofficer() {
	var serialid = $('#serialId').val();
	var userid = $('#userId').val();
	var levelid = $('#escalateid').val();
	var distid = $('#edistrictid').val();
	var stateid = $('#estateid').val();
	var mandalid = $('#emandalid').val();
	var ministryid = 0;
	/*if (levelid == 4 || levelid == "4" || levelid == '4') {
		//ministryid = -1;
		stateid=-1;
	}*/
	if (levelid == 2 || levelid == "2" || levelid == '2') {
		mandalid = 0;
	}
	if (levelid == 3 || levelid == "3" || levelid == '3') {
		mandalid = 0;
		distid = 0;
	}
	var objson = {
		"serialid" : serialid,
		"userid" : userid,
		"levelid" : levelid,
		"mandalid" : mandalid,
		"districtid" : distid,
		"stateid" : stateid,
		"ministryid" : ministryid,
	}

	if (levelid == "0" || levelid == '0') {
		showNotificationError("Please Select Officer level", "escalateid",
				"error");
		return;
	} else if (stateid == "0" || stateid == '0') {
		showNotificationError("Please Select Officer level", "estateid",
				"error");
		return;
	} else if (levelid == 1 || levelid == "1" || levelid == 2 || levelid == "2") {
		if (distid == "0" || distid == '0') {
			showNotificationError("Please Select District", "edistrictid",
					"error");
			return;
		} else {

		}
	} else {

	}

	if (levelid == 1 || levelid == "1") {
		if (mandalid == "0" || mandalid == '0') {
			showNotificationError("Please Select Mandal", "emandalid", "error");
			return;
		} else {

		}
	} else {

	}

	var strUrl = Service.updateResponseofficer;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var response = data.responseCode;
			if (response == "200" || response == 200) {
				showNotificationError("Successfully Updated", "updatedid",
						"success");
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
}

function resetUpdateResponseOfficer() {
	$('#serialId').val("0").trigger("chosen:updated");
	$('#userId').val("0").trigger("chosen:updated");
	$('#escalateid').val("0").trigger("chosen:updated");
	$('#edistrictid').val("0").trigger("chosen:updated");
	$('#estateid').val("0").trigger("chosen:updated");
	$('#emandalid').val("").trigger("chosen:updated");
}

function getResponseOfficerList(levelid) {
	$('#responseid').empty();
	var objson = {
			"levelid" : levelid,			
		}
	try {
		var strUrl = Service.getResponseOfficerList;
		$.ajax({
			type : 'POST',
			url : strUrl,
			data : JSON.stringify(objson),
			dataType : 'json',
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responseCode = data.responseCode;
				$('#responseid').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#responseid').append(divTag);

				} else {
					var jsonArray = data.controllerDTO;
					if (jsonArray.length > 0) {
						getResponseOfficerList_DOM(jsonArray);
						loadDataTable();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getResponseOfficerList_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('User Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Escalation Level');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('State');
		$(objTr).append(objTHead4);

		var objTHead5 = document.createElement('th');
		$(objTHead5).html('District');
		$(objTr).append(objTHead5);

		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Mandal');
		$(objTr).append(objTHead6);

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Update');
		$(objTHead7).addClass("text-center");
		$(objTr).append(objTHead7);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Delete');
		$(objTr).append(objTHead8);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].username);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].level1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].stateid);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].districtname);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].mandalname);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('button-center');
			$(tablcol7)
					.append(
							'<div class="text-center"><td><button type="button" class="btn btn-blue w-100 btn-sm" data-toggle="modal" data-target="#update"><i class="fa fa-edit"></i> Update</button></td></div>');
			$(tablcol7).attr(
					'onclick',
					'getSingleRowData("' + strData[i].serialid + '","'
							+ strData[i].level1 + '","' + strData[i].levelid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].ministryid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalid + '","' + strData[i].username
							+ '","' + strData[i].mandalname + '","'
							+ strData[i].userid + '")');
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('button-center');
			$(tablcol8)
					.append(
							'<div class="text-center"><td><button type="button"  class="btn btn-warning w-100 btn-sm" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i> Delete</button></td><div>');
			$(tablcol8).attr('onclick',
					'deleteResponseOfficer("' + strData[i].serialid + '")');
			$(tablcol8).css('height', '5px');
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}
		$("#responseid").append(objDivTag);

	} catch (err) {
		console.log("responseid" + err);
	}  
}

function getResponseOfficerDistrictLevelList() {
	$('#distrit_level').empty();
	levelid=2;
	var objson = {
			"levelid" : levelid,			
		}
	try {
		var strUrl = Service.getResponseOfficerList;
		$.ajax({
			type : 'POST',
			url : strUrl,
			data : JSON.stringify(objson),
			dataType : 'json',
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responseCode = data.responseCode;
				$('#distrit_level').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#distrit_level').append(divTag);

				} else {
					var jsonArray = data.controllerDTO;
					if (jsonArray.length > 0) {
						getResponseOfficerDistrictLevel_DOM(jsonArray);
						loadDataTable1();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getResponseOfficerDistrictLevel_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example1");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('User Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Escalation Level');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('State');
		$(objTr).append(objTHead4);

		var objTHead5 = document.createElement('th');
		$(objTHead5).html('District');
		$(objTr).append(objTHead5);

		/*var objTHead6 = document.createElement('th');
		$(objTHead6).html('Mandal');
		$(objTr).append(objTHead6);*/

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Update');
		$(objTHead7).addClass("text-center");
		$(objTr).append(objTHead7);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Delete');
		$(objTr).append(objTHead8);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].username);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].level1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].stateid);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].districtname);
			$(tbleRow).append(tablcol5);

			/*var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].mandalname);
			$(tbleRow).append(tablcol6);*/

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('button-center');
			$(tablcol7)
					.append(
							'<div class="text-center"><td><button type="button" class="btn btn-blue w-100 btn-sm" data-toggle="modal" data-target="#update"><i class="fa fa-edit"></i> Update</button></td></div>');
			$(tablcol7).attr(
					'onclick',
					'getSingleRowData("' + strData[i].serialid + '","'
							+ strData[i].level1 + '","' + strData[i].levelid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].ministryid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalid + '","' + strData[i].username
							+ '","' + strData[i].mandalname + '","'
							+ strData[i].userid + '")');
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('button-center');
			$(tablcol8)
					.append(
							'<div class="text-center"><td><button type="button"  class="btn btn-warning w-100 btn-sm" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i> Delete</button></td><div>');
			$(tablcol8).attr('onclick',
					'deleteResponseOfficer("' + strData[i].serialid + '")');
			$(tablcol8).css('height', '5px');
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}
		$("#distrit_level").append(objDivTag);

	} catch (err) {
		console.log("responseid" + err);
	}  
}

function getResponseOfficerStateLevelList() {
	$('#state_level').empty();
	var levelid=3;
	var objson = {
			"levelid" : levelid,			
		}
	try {
		var strUrl = Service.getResponseOfficerList;
		$.ajax({
			type : 'POST',
			url : strUrl,
			data : JSON.stringify(objson),
			dataType : 'json',
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responseCode = data.responseCode;
				$('#state_level').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#state_level').append(divTag);

				} else {
					var jsonArray = data.controllerDTO;
					if (jsonArray.length > 0) {
						getResponseOfficerStateLevel_DOM(jsonArray);
						loadDataTable2();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getResponseOfficerStateLevel_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example2");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('User Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Escalation Level');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('State');
		$(objTr).append(objTHead4);

/*		var objTHead5 = document.createElement('th');
		$(objTHead5).html('District');
		$(objTr).append(objTHead5);*/

		/*var objTHead6 = document.createElement('th');
		$(objTHead6).html('Mandal');
		$(objTr).append(objTHead6);*/

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Update');
		$(objTHead7).addClass("text-center");
		$(objTr).append(objTHead7);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Delete');
		$(objTr).append(objTHead8);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].username);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].level1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].stateid);
			$(tbleRow).append(tablcol4);

		/*	var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].districtname);
			$(tbleRow).append(tablcol5);*/

			/*var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].mandalname);
			$(tbleRow).append(tablcol6);*/

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('button-center');
			$(tablcol7)
					.append(
							'<div class="text-center"><td><button type="button" class="btn btn-blue w-100 btn-sm" data-toggle="modal" data-target="#update"><i class="fa fa-edit"></i> Update</button></td></div>');
			$(tablcol7).attr(
					'onclick',
					'getSingleRowData("' + strData[i].serialid + '","'
							+ strData[i].level1 + '","' + strData[i].levelid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].ministryid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalid + '","' + strData[i].username
							+ '","' + strData[i].mandalname + '","'
							+ strData[i].userid + '")');
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('button-center');
			$(tablcol8)
					.append(
							'<div class="text-center"><td><button type="button"  class="btn btn-warning w-100 btn-sm" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i> Delete</button></td><div>');
			$(tablcol8).attr('onclick',
					'deleteResponseOfficer("' + strData[i].serialid + '")');
			$(tablcol8).css('height', '5px');
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}
		$("#state_level").append(objDivTag);

	} catch (err) {
		console.log("state_level" + err);
	}  
}

function getResponseOfficerMiniLevelList() {
	$('#minister_level').empty();
	levelid=4;
	var objson = {
			"levelid" : levelid,			
		}
	try {
		var strUrl = Service.getResponseOfficerList;
		$.ajax({
			type : 'POST',
			url : strUrl,
			data : JSON.stringify(objson),
			dataType : 'json',
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responseCode = data.responseCode;
				$('#minister_level').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#minister_level').append(divTag);

				} else {
					var jsonArray = data.controllerDTO;
					if (jsonArray.length > 0) {
						getResponseOfficerMiniLevel_DOM(jsonArray);
						loadDataTable3();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getResponseOfficerMiniLevel_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example3");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('User Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Escalation Level');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('State');
		$(objTr).append(objTHead4);

/*		var objTHead5 = document.createElement('th');
		$(objTHead5).html('District');
		$(objTr).append(objTHead5);*/

		/*var objTHead6 = document.createElement('th');
		$(objTHead6).html('Mandal');
		$(objTr).append(objTHead6);*/

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Update');
		$(objTHead7).addClass("text-center");
		$(objTr).append(objTHead7);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Delete');
		$(objTr).append(objTHead8);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].username);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].level1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].stateid);
			$(tbleRow).append(tablcol4);

		/*	var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].districtname);
			$(tbleRow).append(tablcol5);*/

			/*var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].mandalname);
			$(tbleRow).append(tablcol6);*/

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('button-center');
			$(tablcol7)
					.append(
							'<div class="text-center"><td><button type="button" class="btn btn-blue w-100 btn-sm" data-toggle="modal" data-target="#update"><i class="fa fa-edit"></i> Update</button></td></div>');
			$(tablcol7).attr(
					'onclick',
					'getSingleRowData("' + strData[i].serialid + '","'
							+ strData[i].level1 + '","' + strData[i].levelid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].ministryid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalid + '","' + strData[i].username
							+ '","' + strData[i].mandalname + '","'
							+ strData[i].userid + '")');
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('button-center');
			$(tablcol8)
					.append(
							'<div class="text-center"><td><button type="button"  class="btn btn-warning w-100 btn-sm" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i> Delete</button></td><div>');
			$(tablcol8).attr('onclick',
					'deleteResponseOfficer("' + strData[i].serialid + '")');
			$(tablcol8).css('height', '5px');
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}
		$("#minister_level").append(objDivTag);

	} catch (err) {
		console.log("minister_level" + err);
	}  
}

function getSingleRowData(serialid, levelname, levelid, stateid, ministryid,
		districtid, districtname, mandalid, username, mandalname, userid) {
	$('#serialId').val(serialid);
	$('#userId').val(userid);
	// getResponseofficerForUpdate();
	getResponseofficerLevelForUpdate();
	getStateForUpdate();
	getDistrictForUpdate(1);
	getMandalForUpdate(districtid);
	getResponseofficer();
	if (levelid == 2 || levelid == "2") {
		$("#edmandalid").hide();
	} else {
		$("#edmandalid").show();
	}
	if (levelid == 3 || levelid == "3" || levelid == 4 || levelid == "4") {
		$("#eddistrictid").hide();
		$("#edmandalid").hide();
		getStateForStateLevel();
	} else {
		$("#eddistrictid").show();
	}

	$('#euser_id').val(username);
	$("#escalateid option:contains(" + levelname + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#estateid option:contains(" + stateid + ")")
			.attr('selected', 'selected').trigger("chosen:updated");
	$("#edistrictid option:contains(" + districtname + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#emandalid option:contains(" + districtname + ")").attr('selected',
			'selected').trigger("chosen:updated");
}

function deleteResponseOfficer(serialid) {
	$('#serialId_delete').val(serialid);
}

function deleteMappingResponseOfficer() {
	var serialid = $('#serialId_delete').val();
	var objson = {
		"serialid" : serialid,
	}
	var strUrl = Service.deleteResponseofficer;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var response = data.responseCode;
			if (response == "200" || response == 200) {
				showNotificationError("Successfully Deleted", "deletebtn",
						"success");
				getResponseOfficerList(1);
				window.setTimeout(function() {
					$("#delete").modal("hide");
				}, 2000);

			}

		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});

}

// For showing sweet alert
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
		position : 'top',
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

// data table
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
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
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '8px');
								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});

}


//data table
function loadDataTable2() {
	$('.dataTables-example2').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
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
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '8px');
								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});

}

//data table
function loadDataTable1() {
	$('.dataTables-example1').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
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
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '8px');
								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});

}
