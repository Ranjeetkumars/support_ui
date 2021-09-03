/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
//	    var token_id = localStorage.getItem("token");
//		   var user_id=localStorage.getItem("userID");
//		   var module_id=localStorage.getItem("fms_moduleID");
//		   var role_id=localStorage.getItem("fms_roleID");
//		getServiceTask('serviceTaskId')
		getVehicle('vehicleId');
		getAllServiceHistory();
		getVehicle('regVehicleId');
		
		getVendor('vendorId');
		getService('serviceId');
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

function getService(serviceId){
	 try {
		  var id = '#' + serviceId;
	        $(id).empty();
	        var strUrl = Service.allRegisterService;
	        console.log("getService Url is:" + strUrl);
	        $.ajax({
	            type: 'GET',
	            url: strUrl,
	            dataType: 'json',
	            async: false,
	            success: function (data) {
	                var responsecode = data.responseCode;
	                if (200 !== responsecode) {
	                    console.log('getService not loaded');
	                } else {
	                    var jsonArray = data.objRemindersControllerDTO;
	                    var selectfirst = "<option value='0'>Select Service</option>";
	                    $(id).append(selectfirst);
	                    $.each(jsonArray, function (i, resData) {
	                        var service = "<option value=" + resData.service_id + ">" + resData.service_name + "</option>";
	                        $(service).appendTo(id);
	                    });
	                }
	            },
	            error: function (err) {
	                console.error("Error in getService" + JSON.stringify(err));
	            }
	        });
	    } catch (err) {
	        console.error('Error in getVehicle()' + err);
	    }
	    $(id).trigger("chosen:updated");
	    $(id).chosen();
}

function getVehicle(vehicleId){
	 try {
		  var id = '#' + vehicleId;
	        $(id).empty();
	        var strUrl = Service.getVehicle;
	        console.log("getVehicle Url is:" + strUrl);
	        $.ajax({
	            type: 'GET',
	            url: strUrl,
	            dataType: 'json',
	            async: false,
	            success: function (data) {
	                var responsecode = data.responseCode;
	                if (200 !== responsecode) {
	                    console.log('Vehicle not loaded');
	                } else {
	                    var jsonArray = data.objVehicleControllerDTO;
	                    var selectfirst = "<option value='0'>Please Select Vehicle</option>";
	                    $(id).append(selectfirst);
	                    $.each(jsonArray, function (i, resData) {
	                        var reminderType = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
	                        $(reminderType).appendTo(id);
	                    });
	                }
	            },
	            error: function (err) {
	                console.error("Error in getVehicle" + JSON.stringify(err));
	            }
	        });
	    } catch (err) {
	        console.error('Error in getVehicle()' + err);
	    }
	    $(id).trigger("chosen:updated");
	    $(id).chosen();
}
function getVendor(vendorId){
	 try {
		  var id = '#' + vendorId;
	        $(id).empty();
	        var strUrl = Service.getVendor;
	        console.log("getVendorType Url is:" + strUrl);
	        $.ajax({
	            type: 'GET',
	            url: strUrl,
	            dataType: 'json',
	            async: false,
	            success: function (data) {
	                var responsecode = data.responseCode;
	                if (200 !== responsecode) {
	                    console.log('Vehicle not loaded');
	                } else {
	                    var jsonArray = data.contactUsersControllerDTO;
	                    var selectfirst = "<option value='0'>Please Select Vendor</option>";
	                    $(id).append(selectfirst);
	                    $.each(jsonArray, function (i, resData) {
	                        var vendor = "<option value=" + resData.serialno + ">" + resData.vendorname + "</option>";
	                        $(vendor).appendTo(id);
	                    });
	                }
	            },
	            error: function (err) {
	                console.error("Error in getVendorType" + JSON.stringify(err));
	            }
	        });
	    } catch (err) {
	        console.error('Error in getVehicle()' + err);
	    }
	    $(id).trigger("chosen:updated");
	    $(id).chosen();
}

function getAllServiceHistory() {
	var vehicle
	  vehicle=$('#vehicleId').val();
	if(vehicle==='0'||vehicle===0){
		vehicle=1;
	}
	
	var objJson = {
			 "vehicleId":vehicle
		}

		var strUrl = Service.getAllServiceHistory;
		console.log("getAllServiceHistory  details Url is:" + strUrl);
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
			console.log("data : " + data);
			var responseCode = data.responseCode;
			$('#serviceHistoryDataTable').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				serviceHistory_DOM_NO_DATA();

				// $('#serviceTasksDataTable').append(divTag);
				// $('#deleteButtonID').hide();
			} else {
				// $('#deleteButtonID').show();

				var jsonArray = data.objGetServiceHistoryControllerDTO;
				if (jsonArray.length > 0) {
					serviceHistory_DOM(jsonArray);
					loadDataTable();
					
				}
			}
		},
		error : function(err) {
			console.error('getAllServiceHistory  error: ' + JSON.stringify(err));
		}
	});
}

function serviceHistory_DOM_NO_DATA() {

	//For Div Tag
	var objDivTag = document.createElement('div');
	$(objDivTag).addClass("table-responsive");

	//For table
	var ObjTableTag = document.createElement("table");
	$(ObjTableTag)
			.addClass(
					"table table-striped table-bordered table-hover dataTables-example");
	$(objDivTag).append(ObjTableTag);
	//For table head
	var objTHead = document.createElement("thead");
	$(ObjTableTag).append(objTHead);

	//For table row
	var objTr = document.createElement("tr");
	$(objTHead).append(objTr);

	var objTHead1 = document.createElement("th");

	$(objTHead1)
			.html(
					'<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()"><span class="checkmark"></span>');
	$(objTr).append(objTHead1);
	//For table Heading1

	//For table Heading2
	var objTHead2 = document.createElement('th');
	$(objTHead2).html('S.NO');
	$(objTr).append(objTHead2);

	//For table Heading2
	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Vehicle');
	$(objTr).append(objTHead3);

	//For table Heading4
	var objTHead4 = document.createElement('th');
	$(objTHead4).html('Odo Meter');
	$(objTr).append(objTHead4);
	//For table Heading4

	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Service ');
	$(objTr).append(objTHead5);


	var objTHead7 = document.createElement('th');
	$(objTHead7).html('Update');
	$(objTr).append(objTHead7);

	//For table Heading6
	var objTHead8 = document.createElement('th');
	$(objTHead8).html('Delete');
	$(objTr).append(objTHead8);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);

	$("#serviceHistoryDataTable").append(objDivTag);
}
function serviceHistory_DOM(strData) {

	try {
		//For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		//For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		//For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		//For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		//For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTr).append(objTHead1);

//		//For table Heading2
//		var objTHead2 = document.createElement('th');
//		$(objTHead2).html('S.NO');
//		$(objTr).append(objTHead2);

		//For table Heading2
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Vehicle');
		$(objTr).append(objTHead3);

		//For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Odo Meter');
		$(objTr).append(objTHead4);
		//For table Heading4

		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Service ');
		$(objTr).append(objTHead5);
		//For table Heading5
		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Update');
		$(objTr).append(objTHead7);

		//For table Heading6
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
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].seviceId
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].seviceId);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].vehiclename);
			$(tbleRow).append(tablcol2);
			$(tablcol2).attr('onclick', 'onclickReg()');

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].previous_odo_reading);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].serviceName);
			$(tbleRow).append(tablcol4);

			

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7)
					.append(
							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#"></i><i></a> ');

			$(tablcol7).attr(
					'onclick',
					'get_RowData("' + strData[i].seviceId + '","'
							+ strData[i].serviceNameId + '","'
							+ strData[i].vehicleId + '","'
							+ strData[i].previous_odo_reading + '","'
							+ strData[i].completion_date + '","'
							+ strData[i].vendorId + '","'
							+ strData[i].image_path + '","'
							+ strData[i].remarks + '","'
							+ strData[i].serviceName + '","'
							+ strData[i].vehiclename + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			$(tablcol8).append(
					'<a href="#"><i class="fa fa-trash"></i><i></a> ');
			$(tablcol8).attr('onclick', 'deleteSingleVehicle()');
			$(tablcol8).css('height', '5px');

			$(tbleRow).append(tablcol7);
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}deleteSingleVehicle

		$("#serviceHistoryDataTable").append(objDivTag);

	} catch (err) {
		console.log("serviceHistoryDataTable" + err);
	}
}
var serviceid;
function get_RowData(seviceId, serviceNameId, vehicleId,previous_odo_reading,completion_date,vendorId,image_path,remarks,serviceName,vehiclename) {
	$('#update').modal('show');
	serviceid = seviceId;
	getVehicle('up_VehicleId');
	alert("vehiclename========"+vehiclename);
	$("#up_VehicleId option:contains(" + vehiclename + ")").attr('selected', 'selected').trigger("chosen:updated");

	getVendor('up_vendorId');
	alert("vendorId=="+vendorId);
	$("#up_vendorId option:contains(" + vendorId + ")").attr('selected', 'selected').trigger("chosen:updated");

	getService('up_serviceId');
	$("#up_serviceId option:contains(" + serviceName + ")").attr('selected', 'selected').trigger("chosen:updated");



	$('#up_remarkId').val(remarks);
	$('#up_OdoMeterId').val(previous_odo_reading);
}

/*
 * For deleteSingleVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteSingleVehicle() {
	var selectedCheckboxvalue = $('#reg_no').val();

	if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {

		showNotificationError("Please Service Task", "selectall", "error");
		return;
	} else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {

		$('#myModal6').modal('show');
	}
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
function multipleserviceTaskDeletion() {

	var selectedCheckboxvalue = $('#reg_no').val();

	if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {

		showNotificationError("Please Service Task", "selectall", "error");
		return;
	} else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {

		$('#myModal6').modal('show');
	}
}
function serviceHistoryDeletion() {
	var selectedCheckboxvalue = $('#reg_no').val();
	var objJson = {
		"serviceId" : selectedCheckboxvalue
	}
	var strUrl = Service.serviceHistoryDeletion;
	console.log("serviceHistoryDeletion Url is:" + strUrl);
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
						showNotificationError(" not delete ", "serviceHistoryId",
								"error");

					} else {
						showNotificationError(
								"Delete Service   Successfully",
								"serviceHistoryId", "success");

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

/*@DESC : saveaNewServiceEntry
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function saveaNewServiceEntry(){
	var vehicle = $('#regVehicleId').val();
	var odoMeter = $('#regOdoMeterId').val();
	var date = $('#completionDateId').val();
	var vendor = $('#vendorId').val();
	var remark = $('#remarkId').val();
	var service = $('#serviceId').val();

	if (vehicle === "0" || vehicle === "null") {
		showNotificationError("Select Vehicle", "regVehicleId", "error");
		return;
	}
	else if (service === "0" || service === "null") {
		showNotificationError("Select  Service", "serviceId", "error");
		return;
	}
		else if (odoMeter === "" || odoMeter === "null") {
		showNotificationError("Enter odoMeter", "regOdoMeterId", "error");
		return;
	} else if (date === "undefine" || date === "null") {
		showNotificationError("Select Date", "datetimepicker1", "error");
		return;
	} else if (vendor === "0" || vendor === "null") {
		showNotificationError("Select Vendor", "vendorId",
				"error");
		return;
	}
	 else if (remark === " " || remark === "null") {
			showNotificationError("Enter Remark", "remarkId",
					"error");
			return;
		}
	var objJson = { "seviceId":"null",
			"serviceNameId":service, 
			"vehicleId":vehicle,
			       "previous_odo_reading":odoMeter, 
			       "completion_date":date,
			      "vendorId":vendor, 
			       "image_path":" ", 
			       "remarks":remark, 
			          "createdbyid":"1", 
			      "createdbymodid":"1", 
			      "createdbyroleid":"1", 
			     }

	var strUrl = Service.saveaNewServiceEntry;
	console.log("saveaNewServiceEntry  details Url is:" + strUrl);
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
						"serviceEntryId", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"serviceEntryId", "success");
				getAllServiceHistory();

			}
		},
		error : function() {

			console.log('In Error of  SaveServiceTasksDetails');
		}
	});
}
/*@DESC : updateServiceTasksDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function updateNewServiceHistory(){
	var vehicle = $('#up_VehicleId').val();
	var odoMeter = $('#up_OdoMeterId').val();
	var date = $('#up_completionDateId').val();
	var vendor = $('#up_vendorId').val();
	var remark = $('#up_remarkId').val();
	var service = $('#up_serviceId').val();

	if (vehicle === "0" || vehicle === "null") {
		showNotificationError("Select Vehicle", "regVehicleId", "error");
		return;
	}
	else if (service === "0" || service === "null") {
		showNotificationError("Select  Service", "serviceId", "error");
		return;
	}
		else if (odoMeter === "" || odoMeter === "null") {
		showNotificationError("Enter odoMeter", "regOdoMeterId", "error");
		return;
	} else if (date === "undefine" || date === "null") {
		showNotificationError("Select Date", "datetimepicker1", "error");
		return;
	} else if (vendor === "0" || vendor === "null") {
		showNotificationError("Select Vendor", "vendorId",
				"error");
		return;
	}
	 else if (remark === " " || remark === "null") {
			showNotificationError("Enter Remark", "remarkId",
					"error");
			return;
		}
	var objJson = { "seviceId":serviceid,
			"serviceNameId":service, 
			"vehicleId":vehicle,
			       "previous_odo_reading":odoMeter, 
			       "completion_date":date,
			      "vendorId":vendor, 
			       "image_path":" ", 
			       "remarks":remark, 
			          "createdbyid":"1", 
			      "createdbymodid":"1", 
			      "createdbyroleid":"1", 
			     }

	var strUrl = Service.saveaNewServiceEntry;
	console.log("updateNewServiceHistory  details Url is:" + strUrl);
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

				showNotificationError("not update ",
						"updateNewServiceHistoryId", "error");

			} else {

				showNotificationError("update Successfully",
						"updateNewServiceHistoryId", "success");
				getAllServiceHistory();

			}
		},
		error : function() {

			console.log('In Error of  updateNewServiceHistory');
		}
	});
}

//single checkbox reading
function onclickCheckbox() {
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
//validation
function isNumberKey(event) {
    var regex = new RegExp("^[0-9]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
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
