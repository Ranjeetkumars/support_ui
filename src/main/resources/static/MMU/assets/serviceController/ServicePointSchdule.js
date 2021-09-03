//onload calling
$(document).ready(function() {
	try {
		 token_id = localStorage.getItem("token");
		   var user_id=localStorage.getItem("userID");
		   var module_id=localStorage.getItem("mmu_moduleID");
		   var role_id=localStorage.getItem("mmu_roleID");
		 
		getDistrictDataForSearch(1);
		getSchduleDetails();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

// on modal box calling function will call
$('#registration').on('shown.bs.modal', function(e) {
	getDistrictData(1);
});

// district dropdown function
function getDistrictData(countryId) {
	$('#district_id').empty();
	getDistrict(1);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#district_id').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		// alert("resData.districtId"+resData.districtId);
		$(district).appendTo('#district_id');
	});
	$('#district_id').trigger("chosen:updated");
	$('#district_id').chosen();
};

// district dropdown function
function getDistrictDataForUpdate(countryId) {
	$('#udistrict_id').empty();
	getDistrict(1);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#udistrict_id').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		$(district).appendTo('#udistrict_id');
	});
	$('#udistrict_id').trigger("chosen:updated");
	$('#udistrict_id').chosen();
};

// district dropdown function
function getDistrictDataForSearch(countryId) {
	$('#sdistrictid').empty();
	getDistrict(1);
	var selectfirst = "<option value='-1'>Please Select District</option>";
	$('#sdistrictid').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		$(district).appendTo('#sdistrictid');
	});
	$('#sdistrictid').trigger("chosen:updated");
	$('#sdistrictid').chosen();
};

// onchange function calling
$('#district_id').on('change', function() {
	var dist = $('#district_id').val();
	$("#vehicleid").empty();
	getVehicleBasedOnDistrict(dist);
});

$('#udistrict_id').on('change', function() {
	var dist = $('#udistrict_id').val();
	$("#uvehicleid").empty();
	getVehicleBasedOnDistrictForUpdate(dist);
});

$('#district_id').on('change', function() {
	var distid = $('#district_id').val();
	getServicePointName(distid);
});

$('#udistrict_id').on('change', function() {
	var distid = $('#udistrict_id').val();
	getServicePointNameForUpdate(distid);
});

$('#sdistrictid').on('change', function() {
	var distid = $('#sdistrictid').val();
	getVehicleBasedOnDistrictForSearch(distid);
});

// getAssignedVehicle Based On District.
function getVehicleBasedOnDistrictForSearch(districtid) {
	$('#svehicleId').empty();
	var objson = {
		districtId : districtid
	};
	var strUrl = Service.getVehicleBasedOnDistrictForSearch;
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
						console.log("No Data Found")
					} else {
						var jsonArray = data.objGetVehicleBasedOnDistrictControllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#svehicleId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value="
									+ resData.vehicleName + ">"
									+ resData.vehicleId + "</option>";
							$(vehicle).appendTo('#svehicleId');
						});
					}
				},
				error : function(err) {
				}
			});
	$('#svehicleId').trigger("chosen:updated");
	$('#svehicleId').chosen();
}

// getAssignedVehicle Based On District.
function getVehicleBasedOnDistrict(districtid) {
	$('#vehicleid').empty();
	var objson = {
		districtId : districtid
	};
	var strUrl = Service.getVehicleBasedOnDistrict;
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
						alert("Vehicle Not There In This District");
					} else {
						var jsonArray = data.objGetVehicleBasedOnDistrictControllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#vehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.vehicleId
									+ ">" + resData.vehicleName + "</option>";
							$(vehicle).appendTo('#vehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#vehicleid').trigger("chosen:updated");
	$('#vehicleid').chosen();
}

// getAssignedVehicle Based On District.
function getVehicleBasedOnDistrictForUpdate(districtid) {
	alert("vehicleid----->" + districtid);
	$('#uvehicleid').empty();
	var objson = {
		districtId : districtid
	};
	var strUrl = Service.getVehicleBasedOnDistrictForUpdate;
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
						var jsonArray = data.objGetVehicleBasedOnDistrictControllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#uvehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.vehicleId
									+ ">" + resData.vehicleName + "</option>";
							$(vehicle).appendTo('#uvehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#uvehicleid').trigger("chosen:updated");
	$('#uvehicleid').chosen();
}

// Service Point Name Function Calling.
function getServicePointName(districtid) {
	$('#servicepointid').empty();
	var objson = {
		"districtId" : districtid
	}
	var strUrl = Service.getServicePointName;
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
						// alert("No Data Found");
					} else {
						var jsonArray = data.objGetServicePointRegistrationDetailsControllerDTO;
						var selectfirst = "<option value='0'>Please Select Service Point Name</option>";
						$('#servicepointid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value="
									+ resData.servicepointId + ","
									+ resData.address + ">"
									+ resData.servicepointName + "</option>";
							$(vehicle).appendTo('#servicepointid');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#servicepointid').trigger("chosen:updated");
	$('#servicepointid').chosen();
}

// Service Point Name Function Calling for update.
function getServicePointNameForUpdate(districtid) {
	$('#u_servicepointid').empty();
	var objson = {
		"districtId" : districtid
	}
	var strUrl = Service.getServicePointNameForUpdate;
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
						// alert("No Data Found");
					} else {
						var jsonArray = data.objGetServicePointRegistrationDetailsControllerDTO;
						var selectfirst = "<option value='0'>Please Select Service Point Name</option>";
						$('#u_servicepointid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value="
									+ resData.servicepointId + ","
									+ resData.address + ">"
									+ resData.servicepointName + "</option>";
							$(vehicle).appendTo('#u_servicepointid');

						});
					}//
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#u_servicepointid').trigger("chosen:updated");
	$('#u_servicepointid').chosen();
}

// insert service point schdule
function insertServicePointSchdule() {
	var districtid = $('#district_id').val();
	var vehicleId = $('#vehicleid').val();
	var servicepointid = $('#servicepointid').val();
	var servicepoint = servicepointid.split(",");
	var dateofvisit = $('#date_ofvisitid').val();
	var start_time = $('#startTime').val();
	var end_time = $('#endTime1').val();
	var address = servicepoint[1] + "," + servicepoint[2] + ","
			+ servicepoint[3];
	if (districtid == "0") {
		showNotificationError("Please Select District", "district_id", "error");
		return;
	}
	if (vehicleId == "0" || vehicleId == null) {
		showNotificationError("Please Select Vehicle", "vehicleid", "error");
		return;
	}
	if (servicepointid == "0" || servicepointid == null) {
		showNotificationError("Please Select Service Point", "servicepointid",
				"error");
		return;
	}
	if (dateofvisit == null || dateofvisit == "") {
		showNotificationError("Please Enter Date Of Visit", "date_ofvisitid",
				"error");
		return;
	}
	if (start_time == null || start_time == "") {
		showNotificationError("Please Select Start Time", "startTime", "error");
		return;
	}
	if (end_time == null || end_time == "") {
		showNotificationError("Please Select End Time", "endTime1", "error");
		return;
	}
	
	var objson = {
		"in_condition" : 1,
		"serialid" : 20,
		"vehicleId" : vehicleId,
		"servicepointid" : servicepoint[0],
		"dateof_visit" : dateofvisit,
		"starttime" : start_time,
		"endtime" : end_time,
		"createdbyId" : user_id,
		"createdbymodId" : module_id,
		"createdbyroleId" : role_id,
		"address" : address
	};
	var strUrl = Service.insertServicePointSchdule;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Successfully Inserted");
			showNotificationError("Successfully Schduled", "registration_id",
					"success");
			window.setTimeout(function() {
				location.reload();
			}, 2000);
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
}

// reset insert schdule details
function resetInsertSchdule() {
	$('#district_id').val('0').trigger('chosen:updated');
	$('#vehicleid').val('0').trigger('chosen:updated');
	$('#servicepointid').val('0').trigger('chosen:updated');
	$('#date_ofvisitid').val("");
	$('#startTime').val("");
	$('#endTime1').val("");
}

// update service point schdule
function updateServicePointSchdule() {
	var serial_id = $('#serialId').val();
	var dateofvisit = $('#udateofvisitid').val();
	var start_time = $('#ustartTime').val();
	var end_time = $('#uendTime1').val();
	if (dateofvisit == null || dateofvisit == "") {
		showNotificationError("Please Enter Date Of Visit", "udateofvisitid",
				"error");
		return;
	}
	if (start_time == null || start_time == "") {
		showNotificationError("Please Select Start Time", "ustartTime", "error");
		return;
	}
	if (end_time == null || end_time == "") {
		showNotificationError("Please Select End Time", "uendTime1", "error");
		return;
	}

	var objson = {
		"in_condition" : 2,
		"serialid" : serial_id,
		"vehicleId" : 0,
		"servicepointid" : 0,
		"dateof_visit" : dateofvisit,
		"starttime" : start_time,
		"endtime" : end_time,
		"createdbyId" : user_id,
		"createdbymodId" : module_id,
		"createdbyroleId" : role_id
	};
	var strUrl = Service.updateServicePointSchdule;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Successfully Inserted");
			showNotificationError("Successfully Updated", "update_id",
					"success");
			window.setTimeout(function() {
				location.reload();
			}, 2000);
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
}

// reset update schdule details
function resetSchduleUpdateDetails() {
	$('#udateofvisitid').val("");
	$('#ustartTime').val("");
	$('#uendTime1').val("");
}

// calling function for filter schduleDetails
function searchSchduleDetails() {
	var status = validateDataOfSearchSchduleDetails();
	if (status == true || status == "true" || status == 'true') {
		// ajax calll
		searchSchduleData();
	}

}

// validate sear
function validateDataOfSearchSchduleDetails() {
	var district_id = $('#sdistrictid').val();
	if (district_id == "-1" || district_id == '-1'
			|| district_id == 'undefined' || district_id == undefined) {
		// alert('inside if block::'+district_id);
		alert("Please select district type");
		return false;
	}
	return true;

}

function searchSchduleData() {
	$('#get_schdule').empty();
	var vehicle_id = $('#svehicleId').val();
	var district_id = $('#sdistrictid').val();
	if (vehicle_id == "0") {
		vehicle_id = null;
	}
	var objson = {
		"vehicleId" : vehicle_id,
		"districtId" : district_id
	}
	try {
		var strUrl = Service.searchSchduleData1;
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

						var responseCode = data.responseCode;
						$('#get_schdule').empty();
						if (data.vehicleToDistrictMappingControllerDTOs.length == "0") {
							var divTag = document.createElement("h2");
							$(divTag).css("text-align", "center");
							$(divTag).html("No data available....");
							$('#get_schdule').append(divTag);
						} else {
							var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
							if (jsonArray.length > 0) {
								getSchduleDetailsDom(jsonArray);
								loadDataTable();
							}
						}
					},
					error : function(err) {
						console
								.error('getServicePointRegistationDetails error: '
										+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// getting service point schdule details
function getSchduleDetails() {
	$('#get_schdule').empty();
	try {
		// var strUrl=Service.getSchduleDetails;
		var strUrl = Service.getSchduleDetails;
		console.log("strUrl : " + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					crossDomain : true,
					success : function(data) {
						console.log("data : " + data);
						var responseCode = data.responseCode;
						$('#get_schdule').empty();
						if (200 !== responseCode
								|| data.status === "NO_DATA_FOUND") {
							var divTag = document.createElement("h2");
							$(divTag).css("text-align", "center");
							$(divTag).html("No Data Available....");
							$('#get_schdule').append(divTag);

						} else {
							var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
							if (jsonArray.length > 0) {
								getSchduleDetailsDom(jsonArray);
								loadDataTable();
							}
						}
					},
					error : function(err) {
						// console.error('getServicePointRegistationDetails
						// error: ' + JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// reset search schdule details
function resetSearchSchduleDetails() {
	$('#sdistrictid').val("-1").trigger('chosen:updated');
	$('#svehicleId').val("0").trigger('chosen:updated');
	getSchduleDetails();
}

function getSchduleDetailsDom(strData) {
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
		$(objTHead2).html('Service Point Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('District');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Address');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Vehicle No.');
		$(objTr).append(objTHead4);

		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Date Of Visit');
		$(objTr).append(objTHead5);

		// For table Heading8
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Start Time');
		// $(objTHead8).html('Update');
		$(objTr).append(objTHead6);

		// For table Heading8
		var objTHead7 = document.createElement('th');
		$(objTHead7).html('End Time');
		// $(objTHead8).html('Update');
		$(objTr).append(objTHead7);
		// For table Heading9
		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Update');
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
			$(tablcol2).html(strData[i].servicepointid);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].distname);
			$(tbleRow).append(tablcol3);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].address);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].vehicleId);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].dateof_visit);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].starttime);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).html(strData[i].endtime);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			$(tablcol8)
					.append(
							'<u><a href="#" data-toggle="modal"data-placement="bottom" data-target="#update" title="View"><i	class="fa fa-edit"></i></a></u>');
			$(tablcol8).attr(
					'onclick',
					'getSingleRowData("' + strData[i].servicepointid + '","'
							+ strData[i].districtId + '","'
							+ strData[i].dateof_visit + '","'
							+ strData[i].starttime + '","' + strData[i].endtime
							+ '","' + strData[i].vehicleId + '","'
							+ strData[i].distname + '","' + strData[i].serialid
							+ '")');
			$(tablcol8).css('height', '5px');

			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}
		$("#get_schdule").append(objDivTag);

	} catch (err) {
		console.log("get_schdule" + err);
	}
}

function getSingleRowData(servicepointname, district, dateofvisit, startTime,
		endTime, vehicleid, distname, serialid) {

	$('#serialId').val(serialid);
	$('#udistrict_id').val(distname);
	$('#uvehicleid').val(vehicleid);
	$('#u_servicepointid').val(servicepointname);
	$('#udateofvisitid').val(dateofvisit);
	$('#ustartTime').val(startTime);
	$('#uendTime1').val(endTime);

}

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
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}

$("#dateofvisitid").keyup(function() {
	getSchduleDetailsFilter();
});

// getting service point schdule details
function getSchduleDetailsFilter() {
	$('#get_schdule').empty();
	var searchAddress = $('#dateofvisitid').val();
	var objson = {
		"address" : searchAddress
	}
	try {
		// var strUrl=Service.getSchduleDetails;
		var strUrl = Service.getServicepointSchdulingFilter;
		console.log("strUrl : " + strUrl);
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
						console.log("data : " + data);
						var responseCode = data.responseCode;
						$('#get_schdule').empty();
						if (200 !== responseCode
								|| data.status === "NO_DATA_FOUND") {
							var divTag = document.createElement("h2");
							$(divTag).css("text-align", "center");
							$(divTag).html("No Data Available....");
							$('#get_schdule').append(divTag);

						} else {
							var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
							if (jsonArray.length > 0) {
								getSchduleDetailsDom(jsonArray);
								loadDataTable();
							}
						}
					},
					error : function(err) {
						// console.error('getServicePointRegistationDetails
						// error: ' + JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// reset search schdule details
function resetSearchSchduleDetails() {
	$('#sdistrictid').val("-1").trigger('chosen:updated');
	$('#svehicleId').val("0").trigger('chosen:updated');
	getSchduleDetails();
}

/*
 * For showing sweet alert{ 10-01-2020
 */
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
		position : 'Right',
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
		showDuration : 200,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};
	$(boxId).notify(msg, options);
}