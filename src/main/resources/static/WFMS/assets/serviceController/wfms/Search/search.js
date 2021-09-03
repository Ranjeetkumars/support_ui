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
	try {

		getZone();
		getShift();
		getDepartment();
		getVehicle();
		getVehicleType();
		onclickSerachDetails();

	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
/*@DESC : getZone
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getZone() {

	$('#zoneId').empty();
	var strUrl = Service.GETZONES;
	console.log("getDepartment Url is:" + strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		async: false,
		crossDomain: false,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getZone not loaded');
			} else {
				var jsonArray = data.objGetCountriesControllerDTO;
				var selectfirst = "<option value='0'>Select Zone</option>";
				$('#zoneId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
					$(status).appendTo('#zoneId');


				});

			}



		},
		error: function() {
			console.log('Error in loading getZone Data' + strUrl);
		}
	});
}
/*@DESC : getShift
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getShift() {

	$('#shiftId').empty();
	var strUrl = Service.get_ShitTypes_DropDown;
	console.log("getShift Url is:" + strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		async: false,
		crossDomain: false,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getShift not loaded');
			} else {
				var jsonArray = data.objSearchControllerDTO;
				var selectfirst = "<option value='0'>Select Shift</option>";
				$('#shiftId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.location_id + ">" + resData.loction_name + "</option>";
					$(status).appendTo('#shiftId');
				});
			}
		},
		error: function() {
			console.log('Error in loading getShift Data' + strUrl);
		}
	});
}
/*@DESC : getDepartment
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getDepartment() {

	$('#departmentId').empty();
	var strUrl = Service.Get_Department_Details_DropDown;
	console.log("getDepartment Url is:" + strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		async: false,
		crossDomain: false,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getDepartment not loaded');
			} else {
				var jsonArray = data.objSearchControllerDTO;
				var selectfirst = "<option value='0'>Select Department</option>";
				$('#departmentId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.moduel_id + ">" + resData.moduel_name + "</option>";
					$(status).appendTo('#departmentId');
				});

			}
		},
		error: function() {
			console.log('Error in loading getDepartment Data' + strUrl);
		}
	});
}
$('#zoneId').on('change', function() {
	var zoneId = $('#zoneId').val();

	getBaseLocation(zoneId);
});

/*@DESC : getBaseLocation
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getBaseLocation(zoneId) {
	$('#baseLocationId').empty();
	var objJson =
	{
		"location_id": zoneId

	}
	var strUrl = Service.Get_BaseLocation_DropDown;
	console.log("getBaseLocation details Url is:" + strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));

	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(objJson),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getBaseLocation not loaded');
			} else {
				var jsonArray = data.objResourceProfilesControllerDTO;
				var selectfirst = "<option value='0'>Select Base Location</option>";
				$('#baseLocationId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
					$(status).appendTo('#baseLocationId');


				});

			}



		},
		error: function() {
			console.log('Error in loading getBaseLocation Data' + strUrl);
		}
	});
}


/*@DESC : getVehicle
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getVehicle() {

	$('#vehicleId').empty();

	var objJson =
	{
		"isactive": "true"
	}
	var strUrl = Service.get_Vehicles_Details_DropDown;
	console.log("getVehicle details Url is:" + strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));

	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(objJson),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getVehicle not loaded');
			} else {
				var jsonArray = data.objSearchControllerDTO;
				var selectfirst = "<option value='0'>Select Vehicle</option>";
				$('#vehicleId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.vehicle_id + ">" + resData.vehicle_regno + "</option>";
					$(status).appendTo('#vehicleId');


				});

			}



		},
		error: function() {
			console.log('Error in loading getVehicle Data' + strUrl);
		}
	});
}


/*@DESC : getVehicleType
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getVehicleType() {

	$('#vehicleTypeId').empty();

	var objJson =
	{
		"isactive": "true"
	}
	var strUrl = Service.get_Vehicles_Type_DropDown;
	console.log("getVehicleType details Url is:" + strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));

	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(objJson),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {

			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log('getVehicleType not loaded');
			} else {
				var jsonArray = data.objSearchControllerDTO;
				var selectfirst = "<option value='0'>Select Vehicle Type</option>";
				$('#vehicleTypeId').append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.vehicle_type_id + ">" + resData.vehicle_type + "</option>";
					$(status).appendTo('#vehicleTypeId');


				});

			}



		},
		error: function() {
			console.log('Error in loading getVehicleType Data' + strUrl);
		}
	});
}



/*@DESC : SerachDetails_No_Data_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function SerachDetails_No_Data_DOM() {

	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		//For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		//For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		//For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");

		var objTHead1 = document.createElement("th");

		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);
		//For table Heading1

		//For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Employee');
		$(objTr).append(objTHead2);


		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Employee Shift');
		$(objTr).append(objTHead3);


		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Date');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Department');
		$(objTr).append(objTHead5);


		//For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Designation');
		$(objTr).append(objTHead6);


		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Manager');
		$(objTr).append(objTHead7);


		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Zone');
		$(objTr).append(objTHead8);

		var objTHead9 = document.createElement('th');
		$(objTHead9).html('Baselocation');
		$(objTr).append(objTHead9);


		var objTHead10 = document.createElement('th');
		$(objTHead10).html('Vehicle');
		$(objTr).append(objTHead10);


		var objTHead11 = document.createElement('th');
		$(objTHead11).html('Vehicle Type');
		$(objTr).append(objTHead11);

		var objTHead12 = document.createElement('th');
		$(objTHead12).html('Vehicle Status');
		$(objTr).append(objTHead12);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		$(objDivTag).addClass('objDivTag1');
		$(objDivTag).append("NO DATA AVAILABLE");

		$("#serachDetailsReportDataTableId").append(objDivTag);

	} catch (err) {
		console.log("serachDetailsReportDataTableId" + err);
	}
}
/*@DESC : SerachDetails_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function SerachDetails_DOM(strData) {


	//For Div Tag
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		//For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		//For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		//For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");

		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);
		//For table Heading1

		//For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Employee');
		$(objTr).append(objTHead2);


		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Employee Shift');
		$(objTr).append(objTHead3);


		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Date');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Department');
		$(objTr).append(objTHead5);


		//For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Designation');
		$(objTr).append(objTHead6);


		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Manager');
		$(objTr).append(objTHead7);


		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Zone');
		$(objTr).append(objTHead8);

		var objTHead9 = document.createElement('th');
		$(objTHead9).html('Baselocation');
		$(objTr).append(objTHead9);


		var objTHead10 = document.createElement('th');
		$(objTHead10).html('Vehicle');
		$(objTr).append(objTHead10);


		var objTHead11 = document.createElement('th');
		$(objTHead11).html('Vehicle Type');
		$(objTr).append(objTHead11);

		var objTHead12 = document.createElement('th');
		$(objTHead12).html('Vehicle Status');
		$(objTr).append(objTHead12);




		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);



		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);


			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].user_name);
			$(tbleRow).append(tablcol2);


			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].user_desc);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].allocated_date);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].moduel_name);
			$(tbleRow).append(tablcol5);



			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].designation_name);
			$(tbleRow).append(tablcol6);


			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).html(strData[i].manager_name);
			$(tbleRow).append(tablcol7);


			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			$(tablcol8).html(strData[i].loction_name);
			$(tbleRow).append(tablcol8);


			var tablcol9 = document.createElement("td");
			$(tablcol9).addClass('text-center');
			$(tablcol9).html(strData[i].baselocation_name);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).addClass('text-center');
			$(tablcol10).html(strData[i].vehicle_regno);
			$(tbleRow).append(tablcol10);


			var tablcol11 = document.createElement("td");
			$(tablcol11).addClass('text-center');
			$(tablcol11).html(strData[i].vehicle_type);


			$(tbleRow).append(tablcol11);
			var tablcol12 = document.createElement("td");
			$(tablcol12).addClass('text-center');
			if (strData[i].status === '1') {
				$(tablcol12).addClass('signal1');
				$(tablcol12).html("Vehicle is not ready");

			}
			else if (strData[i].status === '2') {
				$(tablcol12).addClass('signal');
				$(tablcol12).html("Vehicle is ready");

			}


			$(tbleRow).append(tablcol12);

			$(objTBody).append(tbleRow);

		}

		$("#serachDetailsReportDataTableId").append(objDivTag);


	} catch (err) {
		console.log("serachDetailsReportDataTableId" + err);
	}
}
var allowanceid;
function get_RowData(allowanceId, moduleName, allowanceType, distance, amount, description) {
	allowanceid = allowanceId;
	var distance = distance.split(',');
	$("#up_allowanceTypeId").val(allowanceType);
	$("#up_startDistanceId").val(distance[0]);
	$("#up_distanceId").val(distance[1]);
	$("#up_amountId").val(amount);
	$("#up_descId").val(description);
	getDepartment('up_departmentId');
	$("#up_departmentId option:contains(" + moduleName + ")").attr('selected', 'selected');

}





function loadDataTable() {
	$('.dataTables-example').DataTable(// Data table
		{
			"aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
			[5, 10, 15, 25, 50, 75, "All"]],
			"iDisplayLength": 5,
			responsive: true,
			dom: '<"html5buttons"B>lTfgitp',
			buttons: [
				]
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



/*@DESC : onclickSerachDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function onclickSerachDetails() {
	var zone = $('#zoneId').val();
	var baseLocation = $('#baseLocationId').val();
	var shift = $('#shiftId').val();
	var department = $('#departmentId').val();
	var vehicle = $('#vehicleId').val();
	var vehicleType = $('#vehicleTypeId').val();
	var fromDate = $('#fromDateId').val();
	var toDate = $('#toDateId').val();

	if (zone === "0" || zone === '') {
		zone = 0;
	}
	if (baseLocation === "0" || baseLocation === "") {
		baseLocation = 0;
	}
	if (shift === "0" || shift === "") {
		shift = 0;
	}

	if (department === "0" || department === "") {
		department = 0;

	}
	if (vehicle === "0" || vehicle === "") {
		vehicle = 0;
	}
	if (vehicleType === "0" || vehicleType === "") {
		vehicleType = 0;
	}

	if (fromDate === " " || fromDate === '') {
		fromDate = 0;
	}


	if (toDate === " " || toDate === '') {
		toDate = 0;
	}

	if (fromDate !== "") {
		if (toDate === "") {
			showNotificationError("Select To Date", "fromDateId", "error");
			return;
		}
	}

	if (toDate !== "") {
		if (fromDate === "") {
			showNotificationError("Select Start Date", "fromDateId", "error");
			return;
		}

	}
	if (toDate < fromDate) {
		showNotificationError("To Date cannot be greater than Current Date", "fromDateId", "error");
		return;
	}

	var objJson =
	{
		"zoneid": zone,
		"baselocation_name": baseLocation,
		"moduel_id": department,
		"vehicle_id": vehicle,
		"vehicle_type_id": vehicleType,
		"shift_type_id": shift,
		"startdate": fromDate,
		"enddate": toDate
	}
	var strUrl = Service.get_search_records_with_all_parameters;

	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(objJson),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {

			var responseCode = data.responseCode;
			$('#serachDetailsReportDataTableId').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				SerachDetails_No_Data_DOM();

			} else {
				var jsonArray = data.objSearchControllerDTO;
				if (jsonArray.length > 0) {
					SerachDetails_DOM(jsonArray);
					loadDataTable();
				}
			}
		},
		error: function(err) {
			console.error('onclickSerachDetails error: ' + JSON.stringify(err));
		}
	});
}

/*@DESC : resetSerachRcordData
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function resetSerachRcordData() {
	$('#zoneId').val(0);
	$('#baseLocationId').val(0);
	$('#shiftId').val(0);
	$('#departmentId').val(0);
	$('#vehicleId').val(0);
	$('#vehicleTypeId').val(0);
	$('#fromDateId').val("");
	$('#toDateId').val("");
}