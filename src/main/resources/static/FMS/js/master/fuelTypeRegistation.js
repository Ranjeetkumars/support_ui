/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
		getAllFuelTypeRefDetails();

	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

/*
 * @DESC : addVehicleStatusRegistrationDetails @AuthorName : priyadarshini @DATE :
 * 2020-04-20
 */
function addFuelTypeRegistration() {
	var desc;
	var fuelType = $('#fuelTypeId').val();
	 
	 
	
	

	var objJson = { "condition":"1",
			 "fueltypeid":1,
			  "fueltype":fuelType,
			      "desc":"NA",
			      "createdbyid":"1",
			       "createdbyroleid":"1", 
			      "createdbymoduleid":"1", 
			  
			      }

	var strUrl = Service.addFuelTypeRegistration;
	console.log("addFuelTypeRegistration  details Url is:"
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
						"fuelTypeRegistationid", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"fuelTypeRegistationid", "success");
				getAllFuelTypeRefDetails();

			}
		},
		error : function() {

			console.log('In Error of  addFuelTypeRegistration');
		}
	});
}

function getAllFuelTypeRefDetails() {


	$("#fuelTypeDataTable").empty();
	var strUrl = Service.getAllFuelTypeRefDetails;
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
					$('#fuelTypeDataTable').empty();
					if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
						allFuelTypeData_DOM_NO_DATA();

						// $('#serviceTasksDataTable').append(divTag);
						// $('#deleteButtonID').hide();
					} else {
						// $('#deleteButtonID').show();

						var jsonArray = data.objGetAllVehicleStatusRefDetailsControllerDTO;
						if (jsonArray.length > 0) {
							allFuelTypeRefData_DOM(jsonArray);
							loadDataTable();
						}
					}
				},
				error : function(err) {
					console.error('update Stock error: ' + JSON.stringify(err));
				}
			});
}

function allFuelTypeData_DOM_NO_DATA() {

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


	// For table Heading2
	var objTHead2 = document.createElement('th');
	$(objTHead2).html('Fuel Type');
	$(objTr).append(objTHead2);

	// For table Heading4
	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Usage');
	$(objTr).append(objTHead3);

	// For table Heading5
	var objTHead4 = document.createElement('th');
	$(objTHead4).html('Edit');
	$(objTr).append(objTHead4);

	// For table Heading6
	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Delete');
	$(objTr).append(objTHead5);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);

	$("#fuelTypeDataTable").append(objDivTag);
}
function allFuelTypeRefData_DOM(strData) {

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

		var objTHead1 = document.createElement("th");

		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()"><span class="checkmark"></span>');
		$(objTr).append(objTHead1);


		// For table Heading2
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Fuel Type');
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

		
				$(tablcol3).html(strData[i].vms_statusName);
				$(tbleRow).append(tablcol3);
			

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
			$(tablcol6).attr('onclick', 'deleteSingleFuelType()');
			$(tablcol6).css('height', '5px');

			$(tbleRow).append(tablcol5);
			$(tbleRow).append(tablcol6);
			$(objTBody).append(tbleRow);
		}

		$("#fuelTypeDataTable").append(objDivTag);

	} catch (err) {
		console.log("fuelTypeDataTable" + err);
	}
}
var vms_fuelid;
function get_RowData(vms_fuelId, fuelTypeName, vms_desc) {
	//$('#update').modal('show');
	vms_fuelid = vms_fuelId;
	$('#up_fuelTypeNameId').val(fuelTypeName);

}

function  updateFuelTypeRegistration(){

	var fuelType = $('#up_fuelTypeNameId').val();

	var objJson ={ "condition":"2",
			 "fueltypeid":vms_fuelid,
			  "fueltype":fuelType,
			      "desc":"NA",
			      "createdbyid":"1",
			       "createdbyroleid":"1", 
			      "createdbymoduleid":"1", 
			  
			      }

	var strUrl = Service.addFuelTypeRegistration;
	console.log("updateFuelTypeRegistration  details Url is:"
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
						"fuelTypeRegistrationId", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"fuelTypeRegistrationId", "success");
				getAllFuelTypeRefDetails();

			}
		},
		error : function() {

			console.log('In Error of  updateFuelTypeRegistration');
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
 * For deleteSingleFuelType.
 * priyadarshini
 * 30-11-2019
 */
function deleteSingleFuelType() {
	var selectedCheckboxvalue = $('#reg_no').val();
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
function VehicleFuelTypeDeletion() {
	var fuelType = $('#reg_no').val();
	console.log("delete vehicle Status List====" + fuelType)
	var objJson = {
		"vms_statusid" : fuelType
	}
	var strUrl = Service.deleteFueltypeRefDetails;
	console.log("VehicleFuelTypeDeletion Url is:" + strUrl);
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
						showNotificationError(" not delete ", "fuelTypeDeletteId",
								"error");

					} else {
						showNotificationError(
								"Delete Fuel Type Successfully",
								"fuelTypeDeletteId", "success");

						window.location.reload();
						window.setTimeout(function() {
							location.reload();
						}, 2000);
					}

				},
				error : function() {

					console.log('In Error of  VehicleFuelTypeDeletion ');
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
