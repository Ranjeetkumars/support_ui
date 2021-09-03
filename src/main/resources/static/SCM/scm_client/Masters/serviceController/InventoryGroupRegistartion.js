var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	
	loadMaterialGroup();

});

function InventoryGroupModel() {
	//$('#inventoryGroupName').modal('show');
	
	$('#inventoryGroupName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	clearAllFilds();
	$("#update_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", false);
	$("#save_disable").attr("disabled", false);
	$("#inventory_code").attr("disabled", false);
}

function clearAllFilds() {
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	$('#status_id').prop("checked", false);
	$('#inventory_group_name_id').val('');
	$('#inventory_code').val('');

}

function saveInventroy() {

	var inventory_group_name = $('#inventory_group_name_id').val();
	var inventory_code = $('#inventory_code').val();
	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));

	console.log("inventory_group_name::" + inventory_group_name);
	console.log("inventory_code::" + inventory_code);
	console.log("isStatus::" + isStatus);

	if (inventory_group_name == '' || inventory_group_name == "") {
		toastr.error("Please provide inventory group name");
		return false
	}

	if (inventory_code == '' || inventory_code == "") {
		toastr.error("Please provide  group code");
		return false
	}

	var strUrl = MASTER_END_POINT.saveorUpdateMaterialUnit;
	console.log('updateInventroy url ::' + strUrl);
	var operationType = 1 // two for update and 1 for insert
	
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"groupId" : 0,
			"groupName" : inventory_group_name,
			"groupCode" : inventory_code,
			"userId" : userId,
			"roleId" : roleId,
			"moduleId" : moduleId,
			"status" : isStatus,
			"operationType" : operationType
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#inventoryGroupName').modal('hide');
				clearAllFilds();
				loadMaterialGroup();

			}
			else {
				
				toastr.info('Group Code is already exist');
				clearAllFilds();
				loadMaterialGroup();
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}
function updateInventroy() {
	var inventory_group_name = $('#inventory_group_name_id').val();
	var inventory_code = $('#inventory_code').val();
	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));
	
	if(inventory_group_name==""||inventory_group_name==''){
		toastr.error('Please provide Inventory Group Name');
		return false;
	}
	
	
	var strUrl = MASTER_END_POINT.saveorUpdateMaterialUnit;

	console.log('updateInventroy url ::' + strUrl);
	var operationType = 2 // two for update and 1 for insert
	
	

	
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"groupId" : intgroupId,
			"groupName" : inventory_group_name,
			"groupCode" : inventory_code,
			"userId" : userId,
			"roleId" : roleId,
			"moduleId" : moduleId,
			"status" : isStatus,
			"operationType" : operationType

		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('updated successfully!');
				$('#inventoryGroupName').modal('hide');
				clearAllFilds();
				loadMaterialGroup();

			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}

function loadMaterialGroup() {
	var strUrl = MASTER_END_POINT.loadMaterialGroup
	console.log('load list of inventory group --->' + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == "200") {
				loadList(data.obMaterialGroupControllerDTO);
				dataTable();
			}
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function loadList(strData) {
	$('#masterinventoryTableId').dataTable().fnClearTable();
	$('#masterinventoryTableId').dataTable().fnDestroy();
	arrData = strData;
	$('#inventoryTableId').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			/*
			 * var tablcol1 = document.createElement("td");
			 * $(tablcol1).html(strData[i].groupId);
			 * $(tbleRow).append(tablcol1);
			 */

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].groupName);
			$(tbleRow).append(tablcol2);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].groupCode);
			$(tbleRow).append(tablcol4);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].status);
			$(tbleRow).append(tablcol3);

			var tablcol9 = document.createElement("td");
			$(tablcol9).addClass('text-center');
			$(tablcol9)
					.append(
							'<button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-edit p-r-xs"></i>Update</button>');
			$(tablcol9).attr(
					'onclick',
					'get_RowData("' + strData[i].groupId + '","'
							+ strData[i].groupName + '","'
							+ strData[i].groupCode + '","' + strData[i].status
							+ '")');

			$(tablcol9).append(tablcol9);
			$(tablcol9).css('height', '36px');
			$(tbleRow).append(tablcol9);
			$("#inventoryTableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_All_Sites_Details_DOM ERROR" + err);
	}

}

var intgroupId;
function get_RowData(groupId, groupName, groupCode, status) {
	clearAllFilds();
	intgroupId = groupId;
	//$('#inventoryGroupName').modal('show');
	
	$('#inventoryGroupName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);
	$('#inventory_group_name_id').val(groupName);
	$('#inventory_code').val(groupCode);

	if (status == "Active" || status == 'Active') {
		$('#status_id').prop('checked', true);
	} else {
		$('#status_id').prop('checked', false);
	}
	
	//$("#inventory_code").attr("disabled", false);
	
	$("#inventory_code").attr("disabled", true);

}

function dataTable() {
	$('#masterinventoryTableId').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
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
//							title : 'ExampleFile'
//						},
//						{
//							extend : 'pdf',
//							title : 'ExampleFile'
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