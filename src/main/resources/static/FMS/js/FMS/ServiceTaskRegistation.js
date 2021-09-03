/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
	    var token_id = localStorage.getItem("token");
		   var user_id=localStorage.getItem("userID");
		   var module_id=localStorage.getItem("fms_moduleID");
		   var role_id=localStorage.getItem("fms_roleID");
		getServiceTask('serviceTaskId')
		allRegiterServiceTask();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#serviceTaskId').on('change', function() {
	var serviceTask = $('#serviceTaskId').val();
	$('#serviceSubTaskId').empty();
	allSubTaskDetails(serviceTask, 'serviceSubTaskId');
});
$('#up_serviceTaskId').on('change', function() {
	var serviceTask = $('#up_serviceTaskId').val();
	$('#up_serviceSubTaskId').empty();
	allSubTaskDetails(serviceTask, 'up_serviceSubTaskId');
});

function allSubTaskDetails(serviceTask, serviceSubTaskId) {
	var id = '#' + serviceSubTaskId;
	$(id).empty();
	var objJson = {
		"taskid" : serviceTask
	}

	var strUrl = Service.allServiceSubTaskDetails;
	console.log("allSubTaskDetails  details Url is:" + strUrl);
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
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objVehicleServiceSubtasksDetailsControllerDTO;
						var selectfirst = "<option value='0'>Select Service Sub Task</option>";
						$(id).append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var taskname = "<option value="
									+ resData.sub_taskid + ">"
									+ resData.sub_taskname + "</option>";
							$(taskname).appendTo(id);
						});
					}
				},
				error : function(err) {
					console.error("Error in allSubTaskDetails"
							+ JSON.stringify(err));
				}
			});
}
function getServiceTask(serviceTaskId) {
	var id = '#' + serviceTaskId;
	$(id).empty();

	var strUrl = Service.allServiceTasksDetails;
	console.log("getServiceTask Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objRemindersControllerDTO;
						var selectfirst = "<option value='0'>Select Service Task</option>";
						$(id).append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var taskname = "<option value=" + resData.taskid
									+ ">" + resData.taskname + "</option>";
							$(taskname).appendTo(id);
						});
					}
				},
				error : function(err) {
					console.error("Error in getServiceTask"
							+ JSON.stringify(err));
				}
			});
}
function allRegiterServiceTask() {

	$("#registerserviceTasksDataTable").empty();
	var strUrl = Service.allRegisterService;
	console.log("allserviceTaskDetails Url is:" + strUrl);
	$.ajax({
		type : "GET",
		url : strUrl,
		dataType : "json",
		async : false,
		crossDomain : false,
		success : function(data) {
			console.log("data : " + data);
			var responseCode = data.responseCode;
			$('#registerserviceTasksDataTable').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				RegiterServiceTask_DOM_NO_DATA();

				// $('#serviceTasksDataTable').append(divTag);
				// $('#deleteButtonID').hide();
			} else {
				// $('#deleteButtonID').show();

				var jsonArray = data.objRemindersControllerDTO;
				if (jsonArray.length > 0) {
					RegiterServiceTask_DOM(jsonArray);
					loadDataTable();
				}
			}
		},
		error : function(err) {
			console.error('update Stock error: ' + JSON.stringify(err));
		}
	});
}

function RegiterServiceTask_DOM_NO_DATA() {

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
	$(objTHead3).html('Task Name');
	$(objTr).append(objTHead3);

	//For table Heading4
	var objTHead4 = document.createElement('th');
	$(objTHead4).html('SubTask Name');
	$(objTr).append(objTHead4);
	//For table Heading4

	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Service Name');
	$(objTr).append(objTHead5);

	//For table Heading4

	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Service Description');
	$(objTr).append(objTHead6);
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

	$("#registerserviceTasksDataTable").append(objDivTag);
}
function RegiterServiceTask_DOM(strData) {

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

		//For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('S.NO');
		$(objTr).append(objTHead2);

		//For table Heading2
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Task Name');
		$(objTr).append(objTHead3);

		//For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('SubTask Name');
		$(objTr).append(objTHead4);
		//For table Heading4

		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Service Name');
		$(objTr).append(objTHead5);

		//For table Heading4

		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Service Description');
		$(objTr).append(objTHead6);
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
									+ strData[i].service_id
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].service_id);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].service_id);
			$(tbleRow).append(tablcol2);
			$(tablcol2).attr('onclick', 'onclickReg()');

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].taskname);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].sub_taskname);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].service_name);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].service_desc);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7)
					.append(
							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#"></i><i></a> ');

			$(tablcol7).attr(
					'onclick',
					'get_RowData("' + strData[i].service_id + '","'
							+ strData[i].taskname + '","'
							+ strData[i].sub_taskname + '","'
							+ strData[i].service_name + '","'
							+ strData[i].service_desc + '","'
							+ strData[i].taskid + '")');

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

		$("#registerserviceTasksDataTable").append(objDivTag);

	} catch (err) {
		console.log("registerserviceTasksDataTable" + err);
	}
}
var serviceId;
function get_RowData(service_id, taskname, sub_taskname,service_name,service_desc,taskid) {
	$('#update').modal('show');
	serviceId = service_id;
	allSubTaskDetails(taskid, 'up_serviceSubTaskId');
	$("#up_serviceSubTaskId option:contains(" + sub_taskname + ")").attr('selected', 'selected')
	getServiceTask('up_serviceTaskId');
	$("#up_serviceTaskId option:contains(" + taskname + ")").attr('selected', 'selected')
	$('#up_serviceNameId').val(service_name);
	$('#up_descriptionId').val(service_desc);
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
function serviceTaskDeletion() {
	var selectedCheckboxvalue = $('#reg_no').val();
	console.log("delete vehiclList====" + selectedCheckboxvalue)
	var objJson = {
		"taskid" : selectedCheckboxvalue
	}
	var strUrl = Service.allserviceTaskDeletion;
	console.log("serviceTaskDeletion Url is:" + strUrl);
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
						showNotificationError(" not delete ", "serviceTaskId",
								"error");

					} else {
						showNotificationError(
								"Delete Service Task  Successfully",
								"serviceTaskId", "success");

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

/*@DESC : SaveServiceTasksDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function SaveServiceTasksDetails() {
	var serviceName = $('#serviceNameId').val();
	var description = $('#descriptionId').val();
	var serviceTask = $('#serviceTaskId').val();
	var serviceSubTask = $('#serviceSubTaskId').val();

	if (serviceName === "" || serviceName === "null") {
		showNotificationError("Enter Task Name", "serviceNameId", "error");
		return;
	} else if (description === "" || description === "null") {
		showNotificationError("Enter Task Desc", "descriptionId", "error");
		return;
	} else if (serviceTask === "0" || serviceTask === "null") {
		showNotificationError("Select Service Task", "serviceTaskId", "error");
		return;
	} else if (serviceSubTask === "0" || serviceSubTask === "null") {
		showNotificationError("Select Service Sub Task", "serviceSubTaskId",
				"error");
		return;
	}

	var objJson = {
		"serial" : "0",
		"service_name" : serviceName,
		"taskid" : serviceTask,
		"subtaskid" : serviceSubTask,
		"service_desc" : description,
		"createdby_id" : user_id,
		"createdby_modid" : module_id,
		"createdby_roleid" : role_id,

	}

	var strUrl = Service.SaveServiceTasksDetails;
	console.log("SaveServiceTasksDetails  details Url is:" + strUrl);
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
						"SaveServiceTasksDetailsId", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"SaveServiceTasksDetailsId", "success");

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
function updateServiceTasksDetails(){
	var serviceName = $('#up_serviceNameId').val();
	var description = $('#up_descriptionId').val();
	var serviceTask = $('#up_serviceTaskId').val();
	var serviceSubTask = $('#up_serviceSubTaskId').val();

	if (serviceName === "" || serviceName === "null") {
		showNotificationError("Enter Task Name", "up_serviceNameId", "error");
		return;
	} else if (description === "" || description === "null") {
		showNotificationError("Enter Task Desc", "up_descriptionId", "error");
		return;
	} else if (serviceTask === "0" || serviceTask === "null") {
		showNotificationError("Select Service Task", "up_serviceTaskId", "error");
		return;
	} else if (serviceSubTask === "0" || serviceSubTask === "null") {
		showNotificationError("Select Service Sub Task", "up_serviceSubTaskId",
				"error");
		return;
	}

	var objJson = {
		"serial" : serviceId,
		"service_name" : serviceName,
		"taskid" : serviceTask,
		"subtaskid" : serviceSubTask,
		"service_desc" : description,
		"createdby_id" : user_id,
		"createdby_modid" : module_id,
		"createdby_roleid" : role_id,

	}
   
	var strUrl = Service.SaveServiceTasksDetails;
	console.log("SaveServiceTasksDetails  details Url is:" + strUrl);
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
	var responseCode = data.responseCode;

			if (200 !== responseCode) {

				showNotificationError("not update ",
						"updateServiceTasksDetailsId", "error");

			} else {

				showNotificationError("update Successfully",
						"updateServiceTasksDetailsId", "success");

			}
		},
		error : function() {

			console.log('In Error of  updateServiceTasksDetails');
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
