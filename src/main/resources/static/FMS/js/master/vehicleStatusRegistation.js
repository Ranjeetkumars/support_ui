/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
		getAllVehicleStatusRef();

	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

/*
 * @DESC : addVehicleStatusRegistrationDetails @AuthorName : priyadarshini @DATE :
 * 2020-04-20
 */
function addVehicleStatusRegistrationDetails1() {

	var vehicleStatus = $('#vehicleStatusId').val();

	var default1 = $('#defaultId').is(":checked");
	var navy1 = $('#navyId').is(":checked");
	var blue = $('#blueId').is(":checked");
	var aqua = $('#aquaId').is(":checked");
	var teal = $('#tealId').is(":checked");
	var oliveI = $('#oliveId').is(":checked");
	var green = $('#greenId').is(":checked");
	var lime = $('#limeId').is(":checked");
	var yellow = $('#yellowId').is(":checked");
	var orange = $('#orangeId').is(":checked");
	var red = $('#redId').is(":checked");
	var maroon = $('#maroonId').is(":checked");
	var fuchsia = $('#fuchsiaId').is(":checked");
	var purple = $('#purpleId').is(":checked");
	var silver = $('#silverId').is(":checked");
	var gray = $('#grayId').is(":checked");
	var black = $('#blackId').is(":checked");
	var descvalue;

	if (default1 === true || default1 === 'true') {
		descvalue = 1;
	}

	if (navy1 === true || navy1 === 'true') {
		descvalue = 2;
	}

	if (blue === true || blue === 'true') {

		descvalue = 3;
	}
	if (aqua === true || aqua === 'true') {
		descvalue = 4;
	}
	if (teal === true || teal === 'true') {
		descvalue = 5;
	}
	if (oliveI === true || oliveI === 'true') {
		descvalue = 6;
	}
	if (green === true || green === 'true') {
		descvalue = 7;
	}
	if (lime === true || lime === 'true') {
		descvalue = 8;
	}
	if (yellow === true || yellow === 'true') {
		descvalue = 9;
	}
	if (orange === true || orange === 'true') {
		descvalue = 10;
	}
	if (red === true || red === 'true') {
		descvalue = 11;
	}
	if (maroon === true || maroon === 'true') {
		descvalue = 12;
	}
	if (fuchsia === true || fuchsia === 'true') {
		descvalue = 13;
	}
	if (purple === true || purple === 'true') {
		descvalue = 14;
	}
	if (silver === true || silver === 'true') {
		descvalue = 15;
	}
	if (gray === true || gray === 'true') {
		descvalue = 16;
	}
	if (black === true || black === 'true') {
		descvalue = 17;
	}

	var objJson = {
		"condition" : "1",
		"statusid" : 1,
		"status_type" : vehicleStatus,
		"desc" : descvalue,
		"createdbyid" : "1",
		"createdbyroleid" : "1",
		"createdbymoduleid" : "1",

	}

	var strUrl = Service.addVehicleStatusRegistrationDetails;
	console.log("addVehicleStatusRegistrationDetails1  details Url is:"
			+ strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responseCode = data.responseCode;

			if (200 !== responseCode) {

				showNotificationError("not Inserted ",
						"vehicleStatusRegistrationId", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"vehicleStatusRegistrationId", "success");
				getAllVehicleStatusRef() ;

			}
		},
		error : function() {

			console.log('In Error of  addServiceTasksDetails');
		}
	});
}

function getAllVehicleStatusRef() {

	$("#vehicleStatusRefDataTableId").empty();
	var strUrl = Service.getAllVehicleStatusRef;
	console.log("getAllVehicleStatusRef Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					console.log("data : " + data);
					var responseCode = data.responseCode;
					$('#vehicleStatusRefDataTableId').empty();
					if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
						allVehicleStatusRefData_DOM_NO_DATA();

						// $('#serviceTasksDataTable').append(divTag);
						// $('#deleteButtonID').hide();
					} else {
						// $('#deleteButtonID').show();

						var jsonArray = data.objGetAllVehicleStatusRefDetailsControllerDTO;
						if (jsonArray.length > 0) {
							allVehicleStatusRefData_DOM(jsonArray);
							loadDataTable();
						}
					}
				},
				error : function(err) {
					console.error('update Stock error: ' + JSON.stringify(err));
				}
			});
}

function allVehicleStatusRefData_DOM_NO_DATA() {

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

	var objTHead1 = document.createElement("th");

	$(objTHead1)
			.html(
					'<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()"><span class="checkmark"></span>');
	$(objTr).append(objTHead1);
	// For table Heading1

	// <span>Select</span> </label></th>

	// var objTHead2 = document.createElement('th');
	// $(objTHead2).html('S.NO');
	// $(objTr).append(objTHead2);

	// For table Heading2
	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Name');
	$(objTr).append(objTHead3);

	// For table Heading4
	var objTHead4 = document.createElement('th');
	$(objTHead4).html('Usage');
	$(objTr).append(objTHead4);

	// For table Heading5
	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Edit');
	$(objTr).append(objTHead5);

	// For table Heading6
	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Delete');
	$(objTr).append(objTHead6);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);

	$("#vehicleStatusRefDataTableId").append(objDivTag);
}
function allVehicleStatusRefData_DOM(strData) {

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
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTr).append(objTHead1);



		// For table Heading2
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Name');
		$(objTr).append(objTHead3);

		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Usage');
		$(objTr).append(objTHead4);

		// For table Heading5
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Edit');
		$(objTr).append(objTHead5);

		// For table Heading6
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Delete');
		$(objTr).append(objTHead6);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);
		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].vms_statusId
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].vms_statusId);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');

			if (strData[i].vms_desc === '1') {
				

				$(tablcol3)
						.append(
								'<a href="#"><span class="label label-primary"  value="3" style="background-color: #636f73";>Default</span></a> ')
						.append(strData[i].vms_statusName);

				$(tbleRow).append(tablcol3);

			}

			if (strData[i].vms_desc === '2') {

				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#003872" ></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '3') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#0074d9" ></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}
			if (strData[i].vms_desc === '4') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#7fdbff" ></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '5') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#15d4cd"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '6') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#1dab6c"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '7') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#18cc6c"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '8') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle" style="color:#01ff70"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '9') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle" style="color:#f5e218" ></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '10') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#f39719"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '11') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#f44336"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '12') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#85144b"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);

			}
			if (strData[i].vms_desc === '13') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#f012be"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}
			if (strData[i].vms_desc === '14') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle" style="color:#b10dc9"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}
			if (strData[i].vms_desc === '15') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle" style="color:#ddd"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}
			if (strData[i].vms_desc === '16') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#a2abae"></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}
			if (strData[i].vms_desc === '17') {
				$(tablcol3)
						.append(
								'<a href="#"><i  class="fa fa-circle"  style="color:#262c2d" ></i><i></a> ')
						.append(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			}

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html("No-DATA");
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5)
					.append(
							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#edit"></i><i></a> ');

			$(tablcol5).attr(
					'onclick',
					'get_RowData("' + strData[i].vms_statusId + '","'
							+ strData[i].vms_statusName + '","'
							+ strData[i].vms_desc + '")');

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).append(
					'<a href="#"><i class="fa fa-trash"></i><i></a> ');
			$(tablcol6).attr('onclick', 'deleteSingleVehicleStatus()');
			$(tablcol6).css('height', '5px');

			$(tbleRow).append(tablcol5);
			$(tbleRow).append(tablcol6);
			$(objTBody).append(tbleRow);
		}

		$("#vehicleStatusRefDataTableId").append(objDivTag);

	} catch (err) {
		console.log("vehicleStatusRefDataTableId" + err);
	}
}
var vms_statusid;
function get_RowData(vms_statusId, vms_statusName, vms_desc) {
	//$('#update').modal('show');
	vms_statusid = vms_statusId;
	$('#up_vehicleStatusId').val(vms_statusName);

}

function  updateVehicleStatusRegistrationDetails(){
	var vehicleStatus = $('#up_vehicleStatusId').val();

	var default1 = $('#up_defaultId').is(":checked");
	var navy1 = $('#up_navyId').is(":checked");
	var blue = $('#up_blueId').is(":checked");
	var aqua = $('#up_aquaId').is(":checked");
	var teal = $('#up_tealId').is(":checked");
	var oliveI = $('#up_oliveId').is(":checked");
	var green = $('#up_greenId').is(":checked");
	var lime = $('#up_limeId').is(":checked");
	var yellow = $('#up_yellowId').is(":checked");
	var orange = $('#up_orangeId').is(":checked");
	var red = $('#up_redId').is(":checked");
	var maroon = $('#up_maroonId').is(":checked");
	var fuchsia = $('#up_fuchsiaId').is(":checked");
	var purple = $('#up_purpleId').is(":checked");
	var silver = $('#up_silverId').is(":checked");
	var gray = $('#up_grayId').is(":checked");
	var black = $('#up_blackId').is(":checked");
	var descvalue;

	if (default1 === true || default1 === 'true') {
		descvalue = 1;
	}

	if (navy1 === true || navy1 === 'true') {
		descvalue = 2;
	}

	if (blue === true || blue === 'true') {

		descvalue = 3;
	}
	if (aqua === true || aqua === 'true') {
		descvalue = 4;
	}
	if (teal === true || teal === 'true') {
		descvalue = 5;
	}
	if (oliveI === true || oliveI === 'true') {
		descvalue = 6;
	}
	if (green === true || green === 'true') {
		descvalue = 7;
	}
	if (lime === true || lime === 'true') {
		descvalue = 8;
	}
	if (yellow === true || yellow === 'true') {
		descvalue = 9;
	}
	if (orange === true || orange === 'true') {
		descvalue = 10;
	}
	if (red === true || red === 'true') {
		descvalue = 11;
	}
	if (maroon === true || maroon === 'true') {
		descvalue = 12;
	}
	if (fuchsia === true || fuchsia === 'true') {
		descvalue = 13;
	}
	if (purple === true || purple === 'true') {
		descvalue = 14;
	}
	if (silver === true || silver === 'true') {
		descvalue = 15;
	}
	if (gray === true || gray === 'true') {
		descvalue = 16;
	}
	if (black === true || black === 'true') {
		descvalue = 17;
	}
	var objJson = {
		"condition" : "2",
		"statusid" : vms_statusid,
		"status_type" : vehicleStatus,
		"desc" : descvalue,
		"createdbyid" : "1",
		"createdbyroleid" : "1",
		"createdbymoduleid" : "1",

	}

	var strUrl = Service.addVehicleStatusRegistrationDetails;
	console.log("updateVehicleStatusRegistrationDetails  details Url is:"
			+ strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responseCode = data.responseCode;

			if (200 !== responseCode) {

				showNotificationError("not updated ",
						"updateVehicleStatusRegistrationId", "error");

			} else {

				showNotificationError("updated Successfully",
						"updateVehicleStatusRegistrationId", "success");
				getAllVehicleStatusRef() ;
			}
		},
		error : function() {

			console.log('In Error of  updateVehicleStatusRegistrationDetails');
		}
	});
}
//single checkbox reading
function onclickCheckbox() {
	$('#reg_no').val('');
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(
			function() {
				console.log("myCheck12: " + $(this).attr("myCheck12")
						+ " Value: " + $(this).val());
				console.log("myCheck12:---" + $(this).val());
				arrSelectedData.push($(this).val());
				count++;
				$('#reg_no').val(arrSelectedData);
			});
	if ($(".case").length === $(".case:checked").length) {

		$("#selectall").prop("checked", true);
	} else {
		$("#selectall").removeAttr("checked");
	}
	// vehicleList =  arrSelectedData;
	console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}

//multiplle checkbox reading
function multipleCheckBox() {
	$("#Searchdeleteid").attr("disabled", true);

	$('#reg_no').val('');
	$("#selectall").change(function(event) {
		$('.case').attr('checked', this.checked);
		$('#Searchdeleteid').attr("disabled", false);

		if ($(this).is(":checked")) {
			$('#reg_no').val('');
			$('.case').prop("checked", true);
			event.preventDefault();
			var searchIDs = $(".case:checkbox:checked").map(function() {
				console.log("selected VEHICLE====" + searchIDs)
				return $(this).val();
			}).get();
			$('#reg_no').val(searchIDs);
		}

	});

}
/*
 * For deleteSingleVehicleStatus.
 * priyadarshini
 * 30-11-2019
 */
function deleteSingleVehicleStatus() {
	var selectedCheckboxvalue = $('#reg_no').val();
alert("selectedCheckboxvalue==============="+selectedCheckboxvalue);
	if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {

		showNotificationError("Please Service Task", "selectall", "error");
		return;
	} else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {

		$('#delete').modal('show');
	}
}
function multipleserviceTaskDeletion() {

	var selectedCheckboxvalue = $('#reg_no').val();

	if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {

		showNotificationError("Please Service Task", "selectall", "error");
		return;
	} else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {

		$('#myModal6').modal('show');
	}
}
function vehicleStatusDeletion() {
	var vehicleStatus = $('#reg_no').val();
	console.log("delete vehicle Status List====" + vehicleStatus)
	var objJson = {
		"vms_statusid" : vehicleStatus
	}
	var strUrl = Service.vehicleStatusDeletion;
	console.log("VehicleStatusDeletion Url is:" + strUrl);
	console.log("Input is:::::::" + JSON.stringify(objJson));
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(objJson),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responseCode = data.responseCode;

					if (200 !== responseCode) {
						showNotificationError(" not delete ", "vehicleStatusId",
								"error");

					} else {
						showNotificationError(
								"Delete vehicle status  Successfully",
								"vehicleStatusId", "success");

						window.location.reload();
						window.setTimeout(function() {
							location.reload();
						}, 2000);
					}

				},
				error : function() {

					console.log('In Error of  serviceTaskDeletion ');
				}
			})
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
		// position defines the notification position though uses the defaults below
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
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
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
							title : 'Baselocation Data'
						},
						{
							extend : 'pdf',
							title : 'Baselocation Data'
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
