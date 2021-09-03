var userId;
var roleId;
var moduleId;
$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	inventoryItemForm();
	loadMaterialForm();
});

$('#no_of_quantity_id').on("input", function() {
	$('#conversion_factor_id').empty();
	var no_Of_Quantity = this.value;
	var intNoOfTrip = $('#no_of_strips_id').val();
	var converFactor = no_Of_Quantity * intNoOfTrip;
	console.log(converFactor);
	$('#conversion_factor_id').val(converFactor);

});

function getinventoryItemFormwithoutInputDropDown() {
	var id = $('up_drug_inventoryItemFormId').val();
	$('#inventoryItemFormId').empty();
	var strUrl = MASTER_END_POINT.loadMaterialForm;
	console.log("getinventoryItemFormwithoutInputDropDown Url is:" + strUrl);
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.dto;

						var selectfirst = "<option value='0'>Select InventoryForm</option>";
						$('#inventoryItemFormId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var FormId = "<option value=" + resData.serialId
									+ ">" + resData.fromType + "</option>";
							$(FormId).appendTo('#inventoryItemFormId');
						});
					}
				},
				error : function(err) {
					console
							.log("Error in getinventoryItemFormwithoutInputDropDown"
									+ JSON.stringify(err));
				}
			});

	$('#inventoryItemFormId').trigger("chosen:updated");
	$('#inventoryItemFormId').chosen();
}

//

function openModalBox() {
	clearAllFilds();
	console.log('openModalBox  javascript function is executed');
	//$('#packingVolume').modal('show');
	
	
	$('#packingVolume').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}








function saveOrUpdateMaterialUnits() {

	var rtnValidationStatus = validation();
	if (rtnValidationStatus != false) {

		console.log("rtnValidationStatus::" + rtnValidationStatus);

	}

	var strUrl = MASTER_END_POINT.saveorUpdatePackingVolume;

	console.log('save packing type ::' + strUrl);
	console
			.log('@@@@@@@@@@@@@@@@@@@@@@@'
					+ JSON.stringify(rtnValidationStatus));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnValidationStatus),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#packingVolume').modal('hide');
				clearAllFilds();
				loadMaterialForm();
			}

			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '1') {
				toastr.success('already exits');
				$('#packingVolume').modal('hide');
				clearAllFilds();
				loadMaterialForm();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}

		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}






function validation() {

	var no_of_strips = $('#no_of_strips_id').val();
	var no_of_quantity = $('#no_of_quantity_id').val();
	var conversion_factor = $('#conversion_factor_id').val();
	var inventoryItemForm = $('#inventoryItemFormId').val();

	console.log('no_of_strips' + no_of_strips);
	console.log('no_of_quantity' + no_of_quantity);
	console.log('conversion_factor' + conversion_factor);
	console.log('inventoryItemForm' + inventoryItemForm);

	// stausId
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));

	if (no_of_strips == "") {
		toastr.error('Please enter no of strips');
		return false;
	}

	if (no_of_quantity == "") {
		toastr.error('Please enter no of qty');
		return false;
	}

	if (inventoryItemForm == "0") {
		toastr.error('Please select inventory item from');
		return false;
	}

	var unitName = no_of_strips + 'X' + no_of_quantity;
	console.log('unitName::' + unitName);

	
	
	
	
	var jsonSaveOrUpdateMaterialUnitsObj = {
		"unitId" : 0,
		"unitName" : unitName,
		"conversionFactor" : conversion_factor,
		"userId" : userId,
		"roleId" : roleId,
		"moduleId" : moduleId,
		"status" : isStatus,
		"operationType" : 1,
		"materialForm" : inventoryItemForm

	};

	return jsonSaveOrUpdateMaterialUnitsObj;

}

function loadMaterialForm() {

	var strUrl = MASTER_END_POINT.loadUnits;
	console.log(strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		success : function(data) {
			console.log('datadata::' + JSON.stringify(data));
			var arrData = data.objLoadUnitControllerDTO;
			// console.log("@@@@@@@@@@@@@@@@@@@@@@@"+arrData);
			listOfdata(arrData);
		},
		error : function(err) {
			console.log("Error in loadMaterialForm" + JSON.stringify(err));
		}
	});
}
var garrData;
function listOfdata(arrData) {
	garrData = arrData;
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();
	for (var i = 0; i < arrData.length; i++) {
		$('#list_of_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ arrData[i].packingType
								+ '</td>'
								+ '<td>'
								+ arrData[i].conversionFactor
								+ '</td>'
								+ '<td>'
								+ arrData[i].formType
								+ '</td>'
								+ '<td>'
								+ arrData[i].status
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm"  onClick="getId('
								+ i + ',' + arrData[i].serialId
								+ ')"><i class="fa fa-edit p-r-xs"></i>Update</button></td></tr>');
	}

	$('#masterIem').DataTable(
			{ // Data table

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
var globalSerialId;
function getId(serialId, serialIds) {
	//$('#packingVolume').modal('show');
	
	
	$('#packingVolume').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	globalSerialId = serialIds;
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + serialId);
	$('#conversion_factor_id').val(garrData[serialId].conversionFactor);

	var packingType = garrData[serialId].packingType;

	var arr = packingType.split('X');
	$('#no_of_strips_id').val(arr[0]);
	$('#no_of_quantity_id').val(arr[1]);

	$(
			"#inventoryItemFormId option:contains("
					+ garrData[serialId].formType + ")").attr('selected',
			'selected').trigger("chosen:updated");
	var status = garrData[serialId].status;
	if (status == "Active" || status == 'Active') {
		$('#stausId').prop('checked', true);
	} else {
		$('#stausId').prop('checked', false);
	}
	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);

}

function inventoryItemForm() {
	console.log('loadFormloadFormloadFormloadFormloadForm');
	var strUrl = MASTER_END_POINT.loadMaterialForm;
	console.log(strUrl);
	try {
		$('#inventoryItemFormId').empty();
		// var strUrl = Service.GET_GENERICNAME_DROPDOWN;
		console.log("loadForm Url is:" + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.dto;
							var selectfirst = "<option value='0'>Select Inventory Item From </option>";
							$('#inventoryItemFormId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryFrom = "<option value="
										+ resData.serialId + ">"
										+ resData.fromType + "</option>";
								$(inventoryFrom).appendTo(
										'#inventoryItemFormId');
							});
						}
					},
					error : function(err) {
						console.error("Error in inventoryItemFormId"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getGenericNamesDropDown()' + err);
	}
	$('#inventoryItemFormId').trigger("chosen:updated");
	$('#inventoryItemFormId').chosen();
}

function updatePackingType() {

	var rtnValidationStatus = validation();
	if (rtnValidationStatus != false) {
		console.log("rtnValidationStatus::"
				+ JSON.stringify(rtnValidationStatus));
	}
	rtnValidationStatus.unitId = globalSerialId;
	rtnValidationStatus.operationType = 2;// This is for update
	console.log("rtnValidationStatus.unitId::" + rtnValidationStatus.unitId);
	console.log("rtnValidationStatus.operationType::"
			+ rtnValidationStatus.operationType);

	console
			.log('update packing type :: '
					+ JSON.stringify(rtnValidationStatus));
	var strUrl = MASTER_END_POINT.saveorUpdatePackingVolume;
	console.log('updatePackingType-->' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnValidationStatus),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully Updated');
				$('#packingVolume').modal('hide');
				clearAllFilds();
				loadMaterialForm();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}

		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}



function clearAllFilds() {
	$("#inventoryItemFormId").val('').trigger("chosen:updated");
	$('#no_of_strips_id').val('');
	$('#no_of_quantity_id').val('');
	$('#conversion_factor_id').val('');
	$('#stausId').prop("checked", false);

}



$('#conversion_factor_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    

    if (String.fromCharCode(charCode).match(/[^0-9]/g))    

        return false;                        

});


$('#no_of_quantity_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    

    if (String.fromCharCode(charCode).match(/[^0-9]/g))    

        return false;                        

});


$('#no_of_strips_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    

    if (String.fromCharCode(charCode).match(/[^0-9]/g))    

        return false;                        

});
