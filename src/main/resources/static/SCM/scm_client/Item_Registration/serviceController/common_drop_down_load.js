/**
 * @Desc:This js file is eligibal for all the common drop down loads which are
 *            generic name, brand name etc..
 * @Author:Ranjeet kumar.
 * 
 */
var userId;
var roleId;
var moduleId;
$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	console.log('Execution has started');
	try {
		// disablebuttons();
		getbrandNameDropDown();
		getManufactureDropDown();
		getinventoryItemFormwithoutInputDropDown();
		getGenericNamesDropDown();
		getbrandNameDropDown();
		getSchedulecodeDropDown();
		getManufactureDropDown();
		getInventoryGroupDropDown();
		loadForm();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#registration').on('shown.bs.modal', function(e) {
	/*
	 * getGenericNamesDropDown(); getbrandNameDropDown();
	 * getSchedulecodeDropDown(); getManufactureDropDown();
	 * getInventoryGroupDropDown();
	 */

});

function disablebuttons() {
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	$("#btnSubmit_update").attr("disabled", true);
	$("#btnSubmit_approval").attr("disabled", true);

}

function loadForm() {
	console.log('loadFormloadFormloadFormloadFormloadForm');
	var strUrl = MASTER_END_POINT.loadForm;
	try {
		$('#load_from_inventory_id').empty();
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
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Inventory Item From </option>";
							$('#load_from_inventory_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryFrom = "<option value="
										+ resData.from_id + ">"
										+ resData.formType + "</option>";
								$(inventoryFrom).appendTo(
										'#load_from_inventory_id');
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
	$('#load_from_inventory_id').trigger("chosen:updated");
	$('#load_from_inventory_id').chosen();
}

function getGenericNamesDropDown() {
	try {
		$('#reg_drug_genericNameId').empty();
		var strUrl = Service.GET_GENERICNAME_DROPDOWN;
		console.log("getGenericNamesDropDown Url is:" + strUrl);
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
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Generic Name</option>";
							$('#reg_drug_genericNameId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var genericData = "<option value="
										+ resData.genericId + ">"
										+ resData.genericName + "</option>";
								$(genericData).appendTo(
										'#reg_drug_genericNameId');
							});
						}
					},
					error : function(err) {
						console.error("Error in getGenericNamesDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getGenericNamesDropDown()' + err);
	}
	$('#reg_drug_genericNameId').trigger("chosen:updated");
	$('#reg_drug_genericNameId').chosen();
}

/*
 * @Author : Ranjeet kr. @Desc : getbrandNameDropDown
 */

function getbrandNameDropDown() {
	try {
		$('#reg_drug_brandnameid').empty();
		$('#brandNameId').empty();
		var strUrl = Service.GET_BRANDNAME_DROPDOWN;
		console.log("getbrandNameDropDown Url is:" + strUrl);
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
							var jsonArray = data.objBrandDetailsControllerDTO;
							var selectfirst = "<option value='0'>Select Brand Name</option>";
							$('#reg_drug_brandnameid').append(selectfirst);
							$('#brandNameId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var brandname = "<option value="
										+ resData.brandId + ">"
										+ resData.brandName + "</option>";
								$(brandname).appendTo('#reg_drug_brandnameid');
								$(brandname).appendTo('#brandNameId');
							});
						}
					},
					error : function(err) {
						console.error("Error in getbrandNameDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getbrandNameDropDown()' + err);
	}
	$('#reg_drug_brandnameid').trigger("chosen:updated");
	$('#brandNameId').trigger("chosen:updated");
	$('#reg_drug_brandnameid').chosen();
	$('#brandNameId').chosen();
}

/*
 * @Author : Ranjeet kumr
 * 
 * @Desc : getSchedulecodeDropDown
 */

function getSchedulecodeDropDown() {
	try {
		$('#reg_drug_scheduleId').empty();
		var strUrl = Service.GET_SCHEDULE_CODE_DROPDOWN;
		console.log("getSchedulecodeDropDown Url is:" + strUrl);
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
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Brand Schedule</option>";
							$('#reg_drug_scheduleId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var schedule = "<option value="
										+ resData.ds_scheduleId + ">"
										+ resData.ds_schduleType + "</option>";
								$(schedule).appendTo('#reg_drug_scheduleId');
							});
						}
					},
					error : function(err) {
						console.error("Error in getSchedulecodeDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getSchedulecodeDropDown()' + err);
	}
	$('#reg_drug_scheduleId').trigger("chosen:updated");
	$('#reg_drug_scheduleId').chosen();
}

function getManufactureDropDown() {
	$('#disableApproval').hide();
	$('#btnSubmit_save').attr("disabled", false);
	$('#btnSubmit_approval').attr("disabled", true);
	$('#btnSubmit_update').attr("disabled", true);
	$('#btnSubmit_reset').attr("disabled", false);
	try {
		$('#reg_drug_manufactureId').empty();
		$('#manufactureId').empty();
		var strUrl = Service.GET_MANUFACTURE_DROPDOWN;
		console.log("getManufactureDropDown Url is:" + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						console.log("data@@@@@@@@@@@@@@@@@@@@@::"
								+ JSON.stringify(data));
						var responsecode = data.responseCode;
						if (200 !== responsecode) {
						} else {
							// var jsonArray =
							// data.objGetManufacturerControllerDTO;
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							// objGetManufacturerControllerDTO
							var selectfirst = "<option value='0'>Select Brand Manufacture</option>";
							$('#reg_drug_manufactureId').append(selectfirst);
							$('#manufactureId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var manufactureData = "<option value="
										+ resData.manufactureId + ">"
										+ resData.companyName + "</option>";
								console.log("resData.manufactureId"
										+ resData.manufactureId);
								console.log("resData.companyName"
										+ resData.companyName);
								$(manufactureData).appendTo(
										'#reg_drug_manufactureId');
								$(manufactureData).appendTo('#manufactureId');
							});
						}
					},
					error : function(err) {
						console.log("Error in getManufactureDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getManufactureDropDown()' + err);
	}
	$('#reg_drug_manufactureId').trigger("chosen:updated");
	$('#manufactureId').trigger("chosen:updated");
	$('#reg_drug_manufactureId').chosen();
	$('#manufactureId').chosen();
}

/*
 * @Author :Ranjeet kumar @Desc : getInventoryGroupDropDown
 */
function getInventoryGroupDropDown() {
	try {
		$('#reg_drug_inventorygroupId').empty();

		var strUrl = Service.GET_INVENTORY_GROUP_DROPDOWN;
		console.log("getInventoryGroupDropDown Url is:" + strUrl);
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
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select InventoryGroup</option>";
							$('#reg_drug_inventorygroupId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryGroupData = "<option value="
										+ resData.materialId + ">"
										+ resData.materialGroupName
										+ "</option>";
								$(inventoryGroupData).appendTo(
										'#reg_drug_inventorygroupId');
							});
						}
					},
					error : function(err) {
						console.error("Error in getInventoryGroupDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getInventoryGroupDropDown()' + err);
	}
	$('#reg_drug_inventorygroupId').trigger("chosen:updated");
	$('#reg_drug_inventorygroupId').chosen();
}

function myFunction() {

	console.log("@@@@@@@@@@@@@@@@@@@@@@");
}

$('#reg_drug_inventorygroupId').on('change', function() {
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	$('#reg_drug_inventoryItemFormId').empty();
	// getInventoryItemForm(inventoryGroupId,'reg_drug_inventoryItemFormId');
});

$('#reg_drug_inventorygroupId').on('change', function() {
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	getbarcode(inventoryGroupId);
});

function getInventoryItemFormDropDown() {

	console.log("ranjeeth");

}

/*
 * @Author : Ranjeet kumar @Desc : getInventoryItemFormDropDown
 */

// function getInventoryItemForm(inventoryGroupIdZoneId,
// reg_drug_inventoryItemFormId) {
// function getInventoryItemForm(inventoryGroupId,reg_drug_inventoryItemFormId)
// {
function loadListOfInventoryItemFrom() {
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();

	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@----> ranjeet"
			+ inventoryGroupId);
	$('#reg_drug_inventoryItemFormId').empty();
	console.log("getInventoryItemFormDropDown method is executed"
			+ inventoryGroupId);

	try {
		var id = '#' + reg_drug_inventoryItemFormId;
		
		$('#reg_drug_inventoryItemFormId').empty();
		//$(id).empty();
		var strUrl = Service.GET_INVENTORYITEMFORM_DROPDOWN;
		console.log("getInventoryItemFormDropDown Url is:" + strUrl);
		var obj_Insert = {
			materialid : inventoryGroupId
		}
		$
				.ajax({
					type : "POST",
					url : strUrl,
					dataType : "json",
					data : JSON.stringify(obj_Insert),
					contentType : "application/json",
					async : false,
					crossDomain : true,
					success : function(data) {
						console.log("Success");
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Inventory ItemForm</option>";

							$("#reg_drug_inventoryItemFormId").append(
									selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryItemFormData = "<option value="
										+ resData.formId + ">"
										+ resData.formPName + "</option>";
								$(inventoryItemFormData).appendTo(
										"#reg_drug_inventoryItemFormId");
							});
						}
					},
					error : function(err) {
						console.error("Error in getInventoryItemFormDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.log('Error in getInventoryItemFormDropDown()' + err);
	}
	$("#reg_drug_inventoryItemFormId").trigger("chosen:updated");
	$("#reg_drug_inventoryItemFormId").chosen();
}

/*
 * @Author : Ranjeet kr. @Desc : getbarcode
 */

function getbarcode(inventoryGroupId) {
	console.log('getbarcode  javascript function is executed' + inventoryGroupId);
	$('#reg_drug_barcodeId').val('');
	$('#reg_drug_shortCodeId').val('');
	var strUrl = Service.GETBARCODE;
	console.log("getbarcode Url is:" + strUrl);

	var obj_Insert = {
		genericId : inventoryGroupId,
		genericName : ""
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objControllerDto;
				$.each(jsonArray, function(i, resData) {
					var barcode = resData.barCode;
					/*
					 * console.log('barcode: ' + barcode);
					 * console.log("reg_drug_barcodeId::" + barcode);
					 * console.log("reg_drug_shortCodeId::" + barcode);
					 */
					$('#reg_drug_barcodeId').val(barcode);
					var split = barcode.split("-");
					// console.log('aftre split short code::'+split[1]);
					$('#reg_drug_shortCodeId').val(split[1] + '-' + split[2]);

				});
			}
		},
		error : function(err) {
			console.error("Error in getbarcode" + JSON.stringify(err));
		}
	});
}
$('#reg_drug_inventoryItemFormId').on('change', function() {
	var inventoryItemFormId = $('#reg_drug_inventoryItemFormId').val();
	$('#reg_drug_packingId').empty();
	console.log('@@@@@@@@@@@@@@@@@@@@');
	// getPackingDropDown(inventoryItemFormId, 'reg_drug_packingId');
	getlistOfPackingDropDown();
});

function getlistOfPackingDropDown() {
	console.log("getlistOfPackingDropDown function executeed");
	var inventoryItemFormId = $('#reg_drug_inventoryItemFormId').val();
	try {

		$('#reg_drug_packingId').empty();
		var strUrl = Service.PACKING_DROPDOWN;
		console.log("getPackingDropDown Url is:" + strUrl);
		var obj_Insert = {
			materialid : inventoryItemFormId
		}
		$
				.ajax({
					type : "POST",
					url : strUrl,
					dataType : "json",
					data : JSON.stringify(obj_Insert),
					contentType : "application/json",
					async : false,
					crossDomain : true,
					success : function(data) {
						console.log('Success');
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						}

						else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Packing</option>";
							$('#reg_drug_packingId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								console.log('serialId' + resData.serialId);
								console
										.log('packingType'
												+ resData.packingType);
								var packingData = "<option value="
										+ resData.serialId + ','
										+ resData.packingType + ">"
										+ resData.packingType + "</option>";
								$(packingData).appendTo('#reg_drug_packingId');
							});
						}
					},
					error : function(err) {
						console.log("Eror!");
						console.error("Error in getPackingDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getPackingDropDown()' + err);
	}
	$('#reg_drug_packingId').trigger("chosen:updated");
	$('#reg_drug_packingId').chosen();
}

function resetItemSearch() {
	$('#driverTable').html("");
	$("#reg_drug_manufactureId").val('').trigger("chosen:updated");
	$("#brandNameId").val('').trigger("chosen:updated");
	$("#itemname").val('');
	$("#shortCode").val('');
	// Model box reset
	$("#serialNumber").val('');
	$("#scmitemname").val('');
	$("#manufactureId").val('').trigger("chosen:updated");
	$("#reg_drug_shortCodeId").val('').trigger("chosen:updated");
	$("#reg_drug_inventorygroupId").val('').trigger("chosen:updated");
	$("#reg_drug_inventoryItemFormId").val('').trigger("chosen:updated");
	$("#reg_drug_packingId").val('').trigger("chosen:updated");
	$("#scmitemQuantity").val('').trigger("chosen:updated");
	$("#scmitemcentralstoreminqty").val('').trigger("chosen:updated");
	$("#scmitemcentralstorereorderqty").val('').trigger("chosen:updated");
	$("#scmitemdescription").val('');
	$("#reg_drug_barcodeId").val('');
}
// $('#reg_drug_packingId').on('change', function() {
// var packing = $('#reg_drug_packingId').val();
// console.log("packingpacking");
// });

function getinventoryItemFormwithoutInputDropDown() {
	var id = $('up_drug_inventoryItemFormId').val();
	try {
		$('#inventoryItemFormId').empty();
		var strUrl = Service.GET_INVENTORY_FORMITEM_WITHOUT_INPUT_DROPDOWN;
		console
				.log("getinventoryItemFormwithoutInputDropDown Url is:"
						+ strUrl);
		$
				.ajax({
					type : 'POST',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objGetManufacturerControllerDTO;
							var selectfirst = "<option value='0'>Select InventoryForm</option>";
							$('#inventoryItemFormId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var FormId = "<option value=" + resData.formId
										+ ">" + resData.formType + "</option>";
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
	} catch (err) {
		console.error('Error in getinventoryItemFormwithoutInputDropDown()'
				+ err);
	}
	$('#inventoryItemFormId').trigger("chosen:updated");
	$('#inventoryItemFormId').chosen();
}