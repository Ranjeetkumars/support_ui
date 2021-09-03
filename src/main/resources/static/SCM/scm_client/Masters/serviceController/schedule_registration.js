var userId;
var roleId;
var moduleId;
$(document).ready(function() {
		userId = localStorage.getItem('userID');
		roleId = localStorage.getItem("scmRoleId");
		moduleId = localStorage.getItem("scmModuleId");
	loadSchedule();

});

function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	//$('#scheduleName').modal('show');
	
	
	$('#scheduleName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}

function loadSchedule() {

	var strUrl = MASTER_END_POINT.loadSchedule;
	console.log('load schedule url::' + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {

			listOfData(data.objScheduleControllerDTO);
			masterDataTable();
		},
		error : function(err) {
			console.error("Error in loadload_store_idStores"
					+ JSON.stringify(err));
		}
	});

}

var gArrData;
function listOfData(arrData) {
	gArrData = arrData;
	destorTableBeforeLoad();
	var index = 0;
	for (var i = 0; i < arrData.length; i++) {
		index++;
		$('#list_of_schedule_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ arrData[i].scheduleId
								+ '</td>'
								+ '<td>'
								+ arrData[i].scheduleName
								+ '</td>'
								+ '<td>'
								+ arrData[i].status
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm" onClick="getIds('
								+ i + ')"><i class="fa fa-edit p-r-xs"></i>Update</button></td>' + '</tr>');
	}

}
var intscheduleId;
function getIds(ids) {
	$("#save_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", true);
	$("#update_disable").attr("disabled", false);
	intscheduleId = gArrData[ids].scheduleId
	//$('#scheduleName').modal('show');

	
	
	$('#scheduleName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$('#schedule_name_id').val(gArrData[ids].scheduleName);
	
	if (gArrData[ids].status == "Active"
			|| gArrData[ids].shelveName == 'Active') {
		$('#status_id').prop('checked', true);
	} else {
		$('#status_id').prop('checked', false);
	}

}

function masterDataTable() {

	$('#masterTable_id').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				// "scrollY":"400px",
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
//						{
//							extend : 'copy'
//						},
//						{
//							extend : 'csv'
//						},
//						{
//							extend : 'excel',
//							title : 'TyreLifeData'
//						},
//						{
//							extend : 'pdf',
//							title : 'TyreLifeData'
//						},
						{
							//extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}

function destorTableBeforeLoad() {

	$('#masterTable_id').dataTable().fnClearTable();
	$('#masterTable_id').dataTable().fnDestroy();

}

function updateScheduleStores() {
	var scheduleName = $('#schedule_name_id').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	if (scheduleName == "") {
		toastr.info('Please enter Schedule name');
		return false;
	}
	console.log('scheduleName::' + scheduleName);
	console.log('status::' + isStatus);
	console.log('intscheduleId::' + intscheduleId);
	var strUrl = MASTER_END_POINT.updateScheduleStores;
	console.log('updateScheduleStores url::' + updateScheduleStores);
	var jsonObj = {
		"scheduleName" : scheduleName,
		"status" : isStatus,
		"scheduleId" : intscheduleId
	}
	console.log('update shedule store ::' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully updated');
				$('#scheduleName').modal('hide');
				loadSchedule();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				toastr.success('Item is already Exists');
				$('#scheduleName').modal('hide');
				loadSchedule();
			}
		},
		error : function() {
			toastr.error('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}

function saveSupplier() {
	var scheduleName = $('#schedule_name_id').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	if (scheduleName == "") {
		toastr.info('Please enter Schedule name');
		return false;
	}
	// var strUrl =
	// "htpp://localhost:2000/scmservice/ScheduleController/saveSupplier";

	
	
	
	var strUrl = MASTER_END_POINT.saveSupplier;
	var jsonObj = {
		"scheduleName" : scheduleName,
		"userId" : userId,
		"moduleId" : roleId,
		"roleId" : moduleId,
		"status" : isStatus
	}
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#scheduleName').modal('hide');
				loadSchedule();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				toastr.success('Item is already Exists');
				$('#scheduleName').modal('hide');
				loadSchedule();
			}
		},
		error : function() {
			toastr.error('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}
