/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {

		allserviceTaskDetails();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

function allserviceTaskDetails() {

	$("#serviceTasksDataTable").empty();
	var strUrl = Service.allServiceTasksDetails;
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
			$('#serviceTasksDataTable').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				serviceTasksData_DOM_NO_DATA();

				// $('#serviceTasksDataTable').append(divTag);
				// $('#deleteButtonID').hide();
			} else {
				// $('#deleteButtonID').show();

				var jsonArray = data.objRemindersControllerDTO;
				if (jsonArray.length > 0) {
					serviceTasksData_DOM(jsonArray);
					loadDataTable();
				}
			}
		},
		error : function(err) {
			console.error('update Stock error: ' + JSON.stringify(err));
		}
	});
}

function serviceTasksData_DOM_NO_DATA() {

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
	$(objTHead4).html('Task Desc');
	$(objTr).append(objTHead4);

	//For table Heading5
	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Update');
	$(objTr).append(objTHead5);

	//For table Heading6
	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Delete');
	$(objTr).append(objTHead6);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);

	$("#serviceTasksDataTable").append(objDivTag);
}
function serviceTasksData_DOM(strData) {

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

		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Task Name');
		$(objTr).append(objTHead3);

		//For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Task Desc');
		$(objTr).append(objTHead4);

		//For table Heading5
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Update');
		$(objTr).append(objTHead5);

		//For table Heading6
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
									+ strData[i].taskid
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].taskid);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].taskid);
			$(tbleRow).append(tablcol2);
			$(tablcol2).attr('onclick', 'onclickReg()');

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].taskname);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].task_desc);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5)
					.append(
							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#editRemainder"></i><i></a> ');

			$(tablcol5).attr(
					'onclick',
					'get_RowData("' + strData[i].taskid + '","'
							+ strData[i].taskname + '","'
							+ strData[i].task_desc + '")');

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).append(
					'<a href="#"><i class="fa fa-trash"></i><i></a> ');
			$(tablcol6).attr('onclick', 'deleteSingleVehicle()');
			$(tablcol6).css('height', '5px');

			$(tbleRow).append(tablcol5);
			$(tbleRow).append(tablcol6);
			$(objTBody).append(tbleRow);
		}

		$("#serviceTasksDataTable").append(objDivTag);

	} catch (err) {
		console.log("serviceTasksDataTable" + err);
	}
}
var taskId;
function get_RowData(taskid, taskname, task_desc) {
	$('#update').modal('show');
	taskId = taskid;
	$('#up_taskNameId').val(taskname);
	$('#up_taskDescId').val(task_desc);
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
	var strUrl = Service.serviceTaskDeletion;
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

/*@DESC : addServiceTasksDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function addServiceTasksDetails() {

	var taskName = $('#taskNameId').val();
	var taskDesc = $('#taskDescId').val();

	if (taskName === "" || taskName === "null") {
		showNotificationError("Enter Task Name", "taskNameId", "error");
		return;
	} else if (taskDesc === "" || taskDesc === "null") {
		showNotificationError("Enter Task Desc", "taskDescId", "error");
		return;
	}

	var objJson = {
		"taskid" : "0",
		"taskname" : taskName,
		"task_desc" : taskDesc,
		"createdby_id" : "1",
		"createdby_modid" : "1",
		"createdby_roleid" : "1",
	}

	var strUrl = Service.addServiceTasksDetails;
	console.log("addServiceTasksDetails  details Url is:" + strUrl);
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

				showNotificationError("not Inserted ", "serviceTasksDetailsID",
						"error");

			} else {

				showNotificationError("Inserted Successfully",
						"serviceTasksDetailsID", "success");

			}
		},
		error : function() {

			console.log('In Error of  addServiceTasksDetails');
		}
	});
}
/*@DESC : updateServiceTasksDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function updateServiceTasksDetails() {
	var taskName = $('#up_taskNameId').val();
	var taskDesc = $('#up_taskDescId').val();

	if (taskName === "" || taskName === "null") {
		showNotificationError("Enter Task Name", "up_taskNameId", "error");
		return;
	} else if (taskDesc === "" || taskDesc === "null") {
		showNotificationError("Enter Task Desc", "up_taskDescId", "error");
		return;
	}

	var objJson = {
		"taskid" : taskId,
		"taskname" : taskName,
		"task_desc" : taskDesc,
		"createdby_id" : "1",
		"createdby_modid" : "1",
		"createdby_roleid" : "1",
	}

	var strUrl = Service.addServiceTasksDetails;
	console.log("updateServiceTasksDetails  details Url is:" + strUrl);
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
						"up_serviceTasksDetailsID", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"up_serviceTasksDetailsID", "success");

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
