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
		getAllowanceDetails();
		getDepartment('departmentId');

	}
	catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
/*@DESC : getDepartment
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getDepartment(departmentId) {
	var id = '#' + departmentId;
	$(id).empty();
	var strUrl = Service.getDepartments;
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
				var jsonArray = data.allowanceControllerDTO;
				var selectfirst = "<option value='0'>Select Department</option>";
				$(id).append(selectfirst);

				$.each(jsonArray, function(i, resData) {
					var status = "<option value=" + resData.moduleId + ">" + resData.moduleName + "</option>";
					$(status).appendTo(id);


				});

			}



		},
		error: function() {
			console.log('Error in loading getDepartment Data' + strUrl);
		}
	});
}




/*@DESC : getAllowanceDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getAllowanceDetails() {
	$('#allowanceDataTableId').empty();

	var strUrl = Service.getAllowanceDetails;
	console.log("getAllowanceDetails Url is:" + strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		async: false,
		crossDomain: false,
		success: function(data) {
			var responseCode = data.responseCode;
			$('#allowanceDataTableId').empty();
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				allowance_No_Data_DOM();

			} else {
				var jsonArray = data.allowanceControllerDTO;
				if (jsonArray.length > 0) {
					allowance_DOM(jsonArray);
					loadDataTable();
				}
			}
		},
		error: function(err) {
			console.error('update Stock error: ' + JSON.stringify(err));
		}
	});
}



/*@DESC : allowance_No_Data_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function allowance_No_Data_DOM() {

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
		$(objTHead2).html('Allowance Type');
		$(objTr).append(objTHead2);


		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Allowance Description');
		$(objTr).append(objTHead3);


		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Distance');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Amount');
		$(objTr).append(objTHead5);


		//For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Department');
		$(objTr).append(objTHead6);


		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Edit');
		$(objTr).append(objTHead7);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		$(objDivTag).addClass('objDivTag1');
		$(objDivTag).append("NO DATA AVAILABLE");

		$("#allowanceDataTableId").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}
/*@DESC : allowance_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function allowance_DOM(strData) {


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
		$(objTHead2).html('Allowance Type');
		$(objTr).append(objTHead2);


		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Allowance Description');
		$(objTr).append(objTHead3);


		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Distance');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Amount');
		$(objTr).append(objTHead5);


		//For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Department');
		$(objTr).append(objTHead6);


		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Edit');
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
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].allowanceType);
			$(tbleRow).append(tablcol2);


			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].description);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].distance);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].amount);
			$(tbleRow).append(tablcol5);



			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].moduleName);
			$(tbleRow).append(tablcol6);


			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).html('<div class="row"> <div class="col-sm-6"> <a href="#" class="disabled" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a></div>');
			$(tablcol7).attr('onclick', 'get_RowData("' + strData[i].allowanceId + '","' + strData[i].moduleName + '","' + strData[i].allowanceType + '","' + strData[i].distance.toString().split("-") + '","' + strData[i].amount + '","' + strData[i].description + '")');




			$(tablcol7).css('height', '5px');

			$(tbleRow).append(tablcol7);

			$(objTBody).append(tbleRow);

		}

		$("#allowanceDataTableId").append(objDivTag);


	} catch (err) {
		console.log("allowanceDataTableId" + err);
	}
}

var allowanceid;
function get_RowData(allowanceId, moduleName, allowanceType, distance, amount, description) {
	allowanceid = allowanceId;
	var distance = distance.toString().split(',');
	$("#up_allowanceTypeId").val(allowanceType);
	$("#up_startDistanceId").val(distance[0]);
	$("#up_distanceId").val(distance[1]);
	$("#up_amountId").val(amount);
	$("#up_descId").val(description);
	getDepartment('up_departmentId');
	$("#up_departmentId option:contains(" + moduleName + ")").attr('selected', 'selected');

}

/*@DESC : saveAllowancesDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function saveAllowancesDetails() {
	var allowance = $('#allowanceId').val();
	var startDistance = $("#startDistanceId").val();
	var endDistance = $('#endDistanceId').val(); showNotificationError("Please Enter Start Distance", "startDistanceId", "error");

	var department = $("#departmentId").val();
	var amount = $('#amountId').val();
	var description = $('#descriptionId').val();

	if (allowance === "" || allowance === null) {
		showNotificationError("Please Enter Allowance Type", "allowanceId", "error");

		return;
	}
	else if (startDistance === "0" || startDistance === "") {

		return;
	}
	else if (endDistance === "0" || endDistance === "") {
		showNotificationError("Please Enter End Distance", "endDistanceId", "error");

		return;
	}
	else if (startDistance >= endDistance) {
		showNotificationError("Start Distance cannot be less than or equal to End Distance", "endDistanceId", "error");

		return;
	}
	else if (department === "0" || department === "") {
		showNotificationError("Select Department", "endDistanceId", "error");

		return;
	}
	else if (amount === "0" || amount === "") {
		showNotificationError("Enter Amount", "amountId", "error");

		return;
	}
	else if (description === "0" || description === "") {
		showNotificationError("Please Enter Allowance Description", "descriptionId", "error");

		return;
	}
	allownaceTypeCount(allowance, department);
	getMaxCountOfAllowanceId();
	if (count != 0) {
		showNotificationError("Allowance Details Already Exists, Please Update the Details", "allowanceId", "error");
		return;
	}
	var objJson =
	{
		"allowanceId": parseInt(allowanceMaximumCountdata) + 1,
		"allowanceType": allowance,
		"description": description,
		"distance": startDistance + "-" + endDistance,
		"amount": amount,
		"noofemployees": "1",
		"moduleId": department,
		"createddtm": "now()",
		"createdbyid": user_Id,
		"createdbymoduleid": module_Id,
		"createdbyroleid": role_Id,
		"isactive": "true"


	}
	var strUrl = Service.saveAllowanceDetails;
	console.log("saveAllowanceDetails details Url is:" + strUrl);
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

				showNotificationError("not Inserted ", "saveAllowancesId", "error");
			} else {

				showNotificationError(" Register  Successfully", "saveAllowancesId", "success");
				getAllowanceDetails();
				resetAllowancesDetails();
			}
		}, error: function() {

			console.log('In Error of  saveAllowanceDetails');
		}
	});
}
/*@DESC : allownaceTypeCount
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function allownaceTypeCount(allowance, moduleId) {

	var objJson =
	{
		"allowanceType": allowance,
		"moduleId": moduleId

	}
	var strUrl = Service.gettingAllowanceCount;
	console.log("allownaceTypeCount details Url is:" + strUrl);
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
				showNotificationError("please enter allowanceType", "allowanceId", "error");

			}
			else {
				return count = data.count;
			}
		}, error: function() {

			console.log('In Error of  allownaceTypeCount');
		}
	});

}
/*@DESC : getMaxCountOfAllowanceId
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function getMaxCountOfAllowanceId() {


	var strUrl = Service.gettingAllowanceMaximumCount;
	console.log("getMaxCountOfAllowanceId Url is:" + strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		async: false,
		crossDomain: false,
		success: function(data) {
			var responseCode = data.responseCode;
			if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
				console.error('error in  getting AllowanceMaximumCount');

			} else {

				return allowanceMaximumCountdata = data.count;
			}

		},
		error: function(err) {
			console.error('getMaxCountOfAllowanceId error: ' + JSON.stringify(err));
		}
	});
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
				{
					extend: 'copy'
				},
				{
					extend: 'csv'
				},
				{
					extend: 'excel',
					title: 'Zone Details'
				},
				{
					extend: 'pdf',
					title: 'Zone Details'
				},
				{
					extend: 'print',
					customize: function(win) {
						$(win.document.body).addClass('white-bg');
						//                            $(win.document.body).css('font-size', '10px');

						$(win.document.body).find('table').addClass(
							'compact').css('font-size', 'inherit');
					}
				}]
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
/*@DESC : updateAllowancesDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function updateAllowancesDetails() {
	var description = $('#up_descId').val();
	var allowance = $('#up_allowanceTypeId').val();
	var startDistance = $("#up_startDistanceId").val();
	var endDistance = $('#up_distanceId').val();
	var amount = $("#up_amountId").val();
	var department = $('#up_departmentId').val();

	if (allowance === "" || allowance === null) {
		showNotificationError("Please Enter Allowance Type", "up_allowanceTypeId", "error");

		return;
	}
	else if (startDistance === "0" || startDistance === "") {
		showNotificationError("Please Enter Start Distance", "up_startDistanceId", "error");

		return;
	}
	else if (endDistance === "0" || endDistance === "") {
		showNotificationError("Please Enter End Distance", "up_distanceId", "error");

		return;
	}
	else if (startDistance >= endDistance) {
		showNotificationError("Start Distance cannot be less than or equal to End Distance", "up_distanceId", "error");

		return;
	}
	else if (amount === "0" || amount === "") {
		showNotificationError("Enter Amount", "up_amountId", "error");

		return;
	}
	else if (department === "0" || department === "") {
		showNotificationError("Select Department", "up_departmentId", "error");

		return;
	}

	else if (description === "0" || description === "") {
		showNotificationError("Please Enter Allowance Description", "up_descId", "error");

		return;
	}

	var objJson =
	{
		"allowanceType": allowance,
		"description": description,
		"distance": startDistance + "-" + endDistance,
		"amount": amount,
		"noofemployees": "1",
		"moduleId": department,
		"createddtm": "now()",
		"createdbyid": user_Id,
		"createdbymoduleid": module_Id,
		"createdbyroleid": role_Id,
		"isactive": "true",
		"allowanceId": allowanceid,


	}
	var strUrl = Service.updateAllowancesDetails;
	console.log("updateAllowancesDetails details Url is:" + strUrl);
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
				showNotificationError("not Inserted ", "update_Allowances_ID", "error");
			} else {
				showNotificationError(" update  Successfully", "update_Allowances_ID", "success");
				  setTimeout(function() {
                            window.location.reload();
                        }, 3000);
				getAllowanceDetails();

			}
		}, error: function() {

			console.log('In Error of  updateAllowancesDetails()');
		}
	});
}
function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
/*@DESC : resetAllowancesDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-04-15
 */
function resetAllowancesDetails() {
	$('#allowanceId').val("");
	$("#startDistanceId").val("");
	$('#endDistanceId').val("");
	$("#departmentId").val("0");
	$('#amountId').val("");
	$('#descriptionId').val("");
}