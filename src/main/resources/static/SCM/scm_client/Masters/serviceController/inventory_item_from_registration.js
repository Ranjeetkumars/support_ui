var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	loadMaterialForm();// load list data in table
	loadMaterialGroup();// load drop down in model box
	//http://localhost:2000/scmservice/MaterialFormController/loadMatrialGroup

});

function InventoryItemModel() {
	//$('#inventoryformName').modal('show');
	
	$('#inventoryformName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	clearAllFilds();
	$('#inventory_group_id').prop('disabled', false).trigger("chosen:updated");
	$("#update_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", false);
	$("#save_disable").attr("disabled", false);
}

function loadMaterialGroup() {
  console.log('loadMaterialGroup');
  var strUrl = "http://localhost:2000/scmservice/MaterialFormController/dropdown-MatrialGroup";
  console.log('loadMaterialGroup drop down Url--->'+strUrl);
	try {
		$('#inventory_group_id').empty();
		console.log("loadForm Url is:" + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.dto;
					var selectfirst = "<option value='0'>Select One </option>";
					$('#inventory_group_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var inventoryFrom = "<option value=" + resData.groupId
								+ ">" + resData.groupName+ "</option>";
						$(inventoryFrom).appendTo('#inventory_group_id');
					});
				}
			},
			error : function(err) {
				console.error("Error in inventory_group_id"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in inventory_group_id()' + err);
	}
	$('#inventory_group_id').trigger("chosen:updated");
	$('#inventory_group_id').chosen();
}

function saveMaterialForm() {

	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));
	var inventoryName = $('#inventory_item_id').val();
	var inventoryGroupId = $('#inventory_group_id').val();
	var strUrl = MASTER_END_POINT.saveMaterialForm;
	console.log('strUrl::' + strUrl);
	
	if (inventoryName == "" || inventoryName == '') {
		toastr.error('Please enter inventory item form');
		return false;
	}
	if (inventoryGroupId == "0" || inventoryGroupId == 0) {
		toastr.error('Please select inventory group');
		return false;
	}

	
	
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"materialForm" : inventoryName,
			"userId" : userId,
			"roleId" : roleId,
			"moduleId" : moduleId,
			"status" : isStatus,
			"intMaterialFormId" : inventoryGroupId
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
				$('#inventoryformName').modal('hide');
				clearAllFilds();
				loadMaterialForm();

			} else {
				toastr.success('Inventory item form already exist');
				$('#inventoryformName').modal('hide');
				clearAllFilds();
				loadMaterialForm();
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}

function loadMaterialForm() {
	console.log('loadMaterialForm javascript function executed');

	var strUrl = MASTER_END_POINT.loadMaterialForm;

	console.log(' load list of MaterialFormstrUrl::' + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == "200") {
				loadList(data.dto);
				dataTable();
			}
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function clearAllFilds() {
	$("#inventory_group_id").val('').trigger("chosen:updated");
	$('#inventory_item_id').val('');
	$('#status_id').prop("checked", false);

}

// "status": "Active",
// "materialGroupId": null,
// "serialId": "1",
// "fromType": "Equipment"

function loadList(strData) {
	$('#append_table').dataTable().fnClearTable();
	$('#append_table').dataTable().fnDestroy();
	arrData = strData;
	$('#list_of_inventory_item_id').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(strData[i].serialId);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].fromType);
			$(tbleRow).append(tablcol2);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].groupName);
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
					'get_RowData("' + strData[i].serialId + '","'
							+ strData[i].groupName + '","'
							+ strData[i].fromType + '","' + strData[i].status
							+ '")');

			$(tablcol9).append(tablcol9);
			$(tablcol9).css('height', '36px');
			$(tbleRow).append(tablcol9);
			$("#list_of_inventory_item_id").append(tbleRow);
		}

	} catch (err) {
		console.log("list_of_inventory_item ERROR" + err);
	}

}

function dataTable() {
	$('#append_table').DataTable(
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

var intSerialId;
function get_RowData(serialId, groupName, fromType, status) {
	intSerialId = serialId;
	console.log('serialId::' + serialId);
	console.log('groupName::' + groupName);
	console.log('fromType::' + fromType);
	console.log('status::' + status);

	//$('#inventoryformName').modal('show');
	$('#inventoryformName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);

	$('#inventory_item_id').val(fromType);

	if (status == "Active" || status == 'Active') {
		$('#status_id').prop('checked', true);
	} else {
		$('#status_id').prop('checked', false);
	}

	$("#inventory_group_id option:contains(" + groupName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	//$('#inventory_group_id').prop('disabled', true);
	$('#inventory_group_id').prop('disabled', true).trigger("chosen:updated");
	
}

function updateMaterialForm() {
	console.log('updateMaterialForm function executed');

	// reading model box
	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));
	var inventoryName = $('#inventory_item_id').val();
	var inventoryGroupId = $('#inventory_group_id').val();

	// validation update fileds
	if (inventoryName == "" || inventoryName == '') {
		toastr.error('Please enter inventory item form');
		return false;
	}
	if (inventoryGroupId == "0" || inventoryGroupId == 0) {
		toastr.error('Please select inventory group');
		return false;
	}
	
	
	// getting url
	var strUrl = MASTER_END_POINT.updateMaterialForm;
	console.log('strUrl::' + strUrl);
	
	console.log("inventoryName:::"+inventoryName)
	console.log("inventoryGroupId::::"+inventoryGroupId)
	console.log("intSerialId:::::"+intSerialId)
	console.log("isStatus::::"+isStatus)
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"materialForm" : inventoryName,
			"materialGroupId" : inventoryGroupId,
			"materialFormId" : intSerialId,
			"status" : isStatus
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));

			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully updated');
				$('#inventoryformName').modal('hide');
				clearAllFilds();
				loadMaterialForm();
			} else {
				toastr.error('error at update');

			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}
