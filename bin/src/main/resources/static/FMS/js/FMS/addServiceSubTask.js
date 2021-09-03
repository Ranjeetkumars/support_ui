/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
		var serviceTaskid=0;
       getServiceTask('serviceTaskId');
       getServiceTask('regserviceTaskId');
		allserviceSubTaskDetails(serviceTaskid);
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#serviceTaskId').on('change', function() {
    var serviceTask = $('#serviceTaskId').val();
    allserviceSubTaskDetails(serviceTask);
});

function getServiceTask(serviceTaskId){
	 var id = '#' + serviceTaskId;
     $(id).empty();
	
	var strUrl = Service.allServiceTasksDetails;
	console.log("getServiceTask Url is:" + strUrl);
	$.ajax({
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
                      var taskname = "<option value=" + resData.taskid + ">" + resData.taskname + "</option>";
                      $(taskname).appendTo(id);
                  });
              }
          },
          error: function(err) {
              console.error("Error in getServiceTask" + JSON.stringify(err));
          }
      });
  } 
//  $(id).trigger("chosen:updated");
//  $(id).chosen();






function allserviceSubTaskDetails(serviceTask) {
	$("#serviceSubTasksDataTable").empty();

	var objJson = {
			 "taskid":serviceTask
		 }

		var strUrl = Service.allServiceSubTaskDetails;
		console.log("allserviceSubTaskDetails  details Url is:" + strUrl);
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
			console.log("data : " + data);
			var responseCode = data.responseCode;
			$('#serviceSubTasksDataTable').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				serviceSubTasksData_DOM_NO_DATA();

				// $('#serviceTasksDataTable').append(divTag);
				// $('#deleteButtonID').hide();
			} else {
				// $('#deleteButtonID').show();

				var jsonArray = data.objVehicleServiceSubtasksDetailsControllerDTO;
				if (jsonArray.length > 0) {
					serviceSubTasksData_DOM(jsonArray);
					loadDataTable();
				}
			}
		},
		error : function(err) {
			console.error(' allserviceSubTaskDetails error: ' + JSON.stringify(err));
		}
	});
}

function serviceSubTasksData_DOM_NO_DATA() {

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
	$(objTHead4).html('Sub Task Name');
	$(objTr).append(objTHead4);
	
	
	//For table Heading4
	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Sub Task desc');
	$(objTr).append(objTHead5);

	//For table Heading5
	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Update');
	$(objTr).append(objTHead6);

	//For table Heading6
	var objTHead7 = document.createElement('th');
	$(objTHead7).html('Delete');
	$(objTr).append(objTHead7);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);

	$("#serviceSubTasksDataTable").append(objDivTag);
}
function serviceSubTasksData_DOM(strData) {
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
		$(objTHead4).html('Sub Task Name');
		$(objTr).append(objTHead4);
		
		
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Sub Task desc');
		$(objTr).append(objTHead5);

		//For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Update');
		$(objTr).append(objTHead6);

		//For table Heading6
		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Delete');
		$(objTr).append(objTHead7);
		
		



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
									+ strData[i].sub_taskid
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].sub_taskid);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].sub_taskid);
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
			$(tablcol5).html(strData[i].sub_task_desc);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6)
					.append(
							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#editRemainder"></i><i></a> ');

			$(tablcol6).attr(
					'onclick',
					'get_RowData("' + strData[i].sub_taskid + '","'
							+ strData[i].sub_taskname + '","'
							+ strData[i].sub_task_desc + '","'
							+ strData[i].taskid + '","'
							+ strData[i].taskname + '")');
			
			
			
			

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).append(
					'<a href="#"><i class="fa fa-trash"></i><i></a> ');
			$(tablcol7).attr('onclick', 'deleteSingleVehicle()');
			$(tablcol7).css('height', '5px');

			$(tbleRow).append(tablcol6);
			$(tbleRow).append(tablcol7);
			$(objTBody).append(tbleRow);
		}

		$("#serviceSubTasksDataTable").append(objDivTag);

	} catch (err) {
		console.log("serviceSubTasksDataTable" + err);
	}
}
var sub_taskId;
function get_RowData(sub_taskid, sub_taskname, sub_task_desc,taskid,taskname) {
	$('#update1').modal('show');
	sub_taskId = sub_taskid;
	
	getServiceTask('up_serviceTaskId');
	$("#up_serviceTaskId option:contains(" + taskname + ")").attr('selected', 'selected')
	$('#up_subTaskNameId').val(sub_taskname);
	$('#up_subtaskDescId').val(sub_task_desc);
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
function serviceSubTaskDeletion() {
	var selectedCheckboxvalue = $('#reg_no').val();
	console.log("delete vehiclList====" + selectedCheckboxvalue)
	var objJson = {
		"taskid" : selectedCheckboxvalue
	}
	var strUrl = Service.serviceSubTaskDeletion;
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

/*@DESC : subTaskRegistration
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function subTaskRegistration() {

	var serviceTask = $('#regserviceTaskId').val();
	var subTaskName = $('#subTaskNameId').val();
	var subtaskDesc = $('#subtaskDescId').val();
	
	
	if (serviceTask === "0" || serviceTask === "null") {
		showNotificationError("Enter Task Name", "regserviceTaskId", "error");
		return;
	} else if (subTaskName === "" || subTaskName === "null") {
		showNotificationError("Enter Task Desc", "subTaskNameId", "error");
		return;
	}
	else if (subtaskDesc === "" || subtaskDesc === "null") {
		showNotificationError("Enter Task Desc", "subtaskDescId", "error");
		return;
	}

	var objJson = { "subtaskid":"0", 
			    "subtaskname":subTaskName, 
			     "subtask_desc":subtaskDesc,
			       "taskid":serviceTask, 
			       "createdby_id":"1",
			       "createdby_modid":"1", 
			       "createdby_roleid":"1", 
			
			     }

	var strUrl = Service.subTaskRegistration;
	console.log("subTaskRegistration  details Url is:" + strUrl);
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

				showNotificationError("not Inserted ", "subTaskRegistrationId",
						"error");

			} else {

				showNotificationError("Inserted Successfully",
						"subTaskRegistrationId", "success");

			}
		},
		error : function() {

			console.log('In Error of  subTaskRegistration');
		}
	});
}
/*@DESC : updateServiceTasksDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-20
 */
function updateSubTaskRegistration() {
	var serviceTask = $('#up_serviceTaskId').val();
	var subTaskName = $('#up_subTaskNameId').val();
	var subtaskDesc = $('#up_subtaskDescId').val();
	
	
	if (serviceTask === "0" || serviceTask === "null") {
		showNotificationError("Enter Task Name", "up_serviceTaskId", "error");
		return;
	} else if (subTaskName === "" || subTaskName === "null") {
		showNotificationError("Enter Task Desc", "up_subTaskNameId", "error");
		return;
	}
	else if (subtaskDesc === "" || subtaskDesc === "null") {
		showNotificationError("Enter Task Desc", "up_subtaskDescId", "error");
		return;
	}

	var objJson = { "subtaskid":sub_taskId, 
			    "subtaskname":subTaskName, 
			     "subtask_desc":subtaskDesc,
			       "taskid":serviceTask, 
			       "createdby_id":"1",
			       "createdby_modid":"1", 
			       "createdby_roleid":"1", 
			
			     }

	var strUrl = Service.subTaskRegistration;
	console.log("subTaskRegistration  details Url is:" + strUrl);
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
						"up_subTaskRegistrationId", "error");

			} else {

				showNotificationError("Inserted Successfully",
						"up_subTaskRegistrationId", "success");

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
