/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//onclick="itemSearch()"
var quantity;
var quantity;
$(document).ready(function() {
	try {
		getbrandNameDropDown();
		getManufactureDropDown();
		getinventoryItemFormwithoutInputDropDown();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#registration').on('shown.bs.modal', function(e) {
	getGenericNamesDropDown();
	getbrandNameDropDown();
	getSchedulecodeDropDown();
	getManufactureDropDown();
	getInventoryGroupDropDown();

});

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

$('#reg_drug_inventorygroupId').on(
		'change',
		function() {
			var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
			$('#reg_drug_inventoryItemFormId').empty();
			getInventoryItemFormDropDown(inventoryGroupId,
					'reg_drug_inventoryItemFormId');
		});


//reg_drug_inventorygroupId

$('#reg_drug_inventorygroupId').on('change', function() {
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	getbarcode(inventoryGroupId);
});

function getInventoryItemFormDropDown(inventoryGroupIdZoneId,
		reg_drug_inventoryItemFormId) {
    console.log("getInventoryItemFormDropDown method is executed");
	try {
		var id = '#' + reg_drug_inventoryItemFormId;
		$(id).empty();
		var strUrl = Service.GET_INVENTORYITEMFORM_DROPDOWN;
		console.log("getInventoryItemFormDropDown Url is:" + strUrl);
		var obj_Insert = {
			materialid : inventoryGroupIdZoneId
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
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Inventory ItemForm</option>";
							$(id).append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryItemFormData = "<option value="
										+ resData.formId + ">"
										+ resData.formPName + "</option>";
								$(inventoryItemFormData).appendTo(id);
							});
						}
					},
					error : function(err) {
						console.error("Error in getInventoryItemFormDropDown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getInventoryItemFormDropDown()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

function getbarcode(inventoryGroupId) {
	
    console.log("getbarcode function executed");
	$('#reg_drug_barcodeId').val('');
	$('#reg_drug_shortCodeId').val('');
	$('#code128').val('');
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
					
					console.log('barcode: ' + barcode);
					$('#reg_drug_barcodeId').val(barcode);
					$('#reg_drug_shortCodeId').val(barcode);
                    JsBarcode("#code128", barcode);
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
	getPackingDropDown(inventoryItemFormId, 'reg_drug_packingId');
});

function getPackingDropDown(inventoryItemFormId, reg_drug_packingId) {
	console.log('packing type method is executeed ');
	try {
		var id = '#' + reg_drug_packingId;
		$(id).empty();
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
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Packing</option>";
							$(id).append(selectfirst);
							$.each(jsonArray, function(i, resData) {

								var packingData = "<option value="+ resData.serialId +','+ resData.packingType + ">"
										+ resData.packingType + "</option>";
								$(packingData).appendTo(id);

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
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

function updateDrugsDetails() {
	console.log('update function is executed');
	var genericNameid = $("#reg_drug_genericNameId").val();
	var drugName = $("#reg_drug_itemnameId").val();
	var brand_id = $('#reg_drug_brandnameid').val();//
	var scheduleid = $('#reg_drug_scheduleId').val();
	var manufaturer_id = $('#reg_drug_manufactureId').val();
	var short_unic_code = $('#reg_drug_shortCodeId').val();
	var strength_type = $('#reg_drug_strengthId').val();// Need to start
	var dispensinbaleMinQty = $("#reg_drug_dispensableId").val();
	var inventoryGroup = $("#reg_drug_inventorygroupId").val();
	var inventoryItemFormId = $("#reg_drug_inventoryItemFormId").val();
	var packingId = $("#reg_drug_packingId").val();
	var quantity = $("#scmitemQuantity").val();
	var centralMinQty = $("#reg_drug_centralMinQtyId").val();
	var centralReorder = $("#reg_drug_centralMaxQtyId").val();
	var substoreMinQty = $("#reg_drug_substoreMinQtyId").val();
	var subStoreMaxQty = $("#reg_drug_substoreMaxQtyId").val();
	
	var ambMinQty = $("#reg_drug_ambMinQtyId").val();
	var ambMaxQty = $("#reg_drug_ambMaxQtyId").val();
	
	
	
	console.log("ambMinQty"+ambMinQty);
	console.log("ambMaxQty"+ambMaxQty);
	
	var description = $("#reg_drug_descId").val();
	var barcode = $("#reg_drug_barcodeId").val();
	var expAlert = $("#reg_drup_expiryalertId").val();

	if (strength_type == null || strength_type == 0) {
		strength_type = "0";
	}
	if (dispensinbaleMinQty == "" || dispensinbaleMinQty == ''
			|| dispensinbaleMinQty == null) {
		dispensinbaleMinQty = "0";
	}

	if (expAlert == "" || expAlert == null || expAlert == '') {
		expAlert = '0';
	}

	if (globalIds.drugId > 0) {
		console.log("inside if condition");
		var strUrl = itemRegistration.updateDrugDetails;
		console.log('strUrlstrUrl::' + strUrl);
		console.log("packingId"+packingId);
		var intPackingId = packingId.split(",");
		console.log("intPackingId::"+intPackingId[0]);
		var obj_Insert = {
			"drugId" : globalIds.drugId,
			drugName : drugName,
			brand_id : brand_id,
			manufaturer_id : manufaturer_id,
			form_id : inventoryItemFormId,
			minmum_level_qty : centralMinQty,
			maximum_lel_qty : centralReorder,
			short_unic_code : short_unic_code,
			expire_alert : expAlert,
			createdbyid : userId,
			createdbyroleid : roleId,
			createdbymoduleid : moduleId,
			strength_type : strength_type,
			system_id : 1,
			genric_group_id : 1,
			genric_molecules_id : 1,
			
			packId : intPackingId[0],
			scheduleid : scheduleid,
			vehicleReorderqty : ambMaxQty,
			vehicleMinqty : ambMinQty,
			materialGroupformid : inventoryGroup,
			genericid : genericNameid,
			minsaleqty : dispensinbaleMinQty,
			barcode : barcode,
			subStoreMinLevelQty : substoreMinQty,
			subStoreMaxLevelQty : subStoreMaxQty,
			description : description,
			purchageRate : 0,
			mrp : 0,
			remarks : "need to add text fild for remarks"
		}
		
		
		console.log(JSON.stringify(obj_Insert));
		
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Insert),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
						+ JSON.stringify(data));
				
				if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
						|| data.rtnReponseCount === '1') {
					toastr.success('Drugs Updated Successfully!');
					itemSearchByFilter();
					var table = $('#driverTable').DataTable();
					table.ajax.reload();
					clearDrugRegistration();
					$('#registration_and_update_modal').modal('hide');
				}
				else{
					toastr.info('Something went wrong!');
				}
			},
			error : function(err) {
				console.log('something went wrong::' + JSON.stringify(err));
				console.log("Error In insertDrugDetails");
			}
		});

	}

}

function insertDrugDetails() {
	console.log("insertDrugDetails method is executed");
	var JsonEmptyOrNot = drugValidation();
	if (JsonEmptyOrNot == false || JsonEmptyOrNot == "false"
			|| JsonEmptyOrNot == 'false' || JsonEmptyOrNot == undefined
			|| JsonEmptyOrNot == 'undefined')
		return

	console.log('==== Obj_Insert' + JSON.stringify(JsonEmptyOrNot));
	var strUrl = Service.INSERT_DRUG_DETAILS;
	console.log('==== strUrl' + strUrl);
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(JsonEmptyOrNot),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
							+ JSON.stringify(data));
					if (data.rtnReponseCount === 0
							|| data.rtnReponseCount === "0"
							|| data.rtnReponseCount === '0') {
						resetItemSearch();
						toastr.info('Item Already Exist!');
						clearDrugRegistration();
					}

					if (data.responseCode === 1001
							|| data.responseCode === "1001"
							|| data.rtnReponseCount === '0') {
						resetItemSearch();
						toastr
								.error("POSTGRES CONNECTION CLOSED! Please try aftre some time.");
						clearDrugRegistration();
					}

					if (data.rtnReponseCount === 1
							|| data.rtnReponseCount === "1"
							|| data.rtnReponseCount === '1') {
						toastr.success('Drug Registered Successfully!');
						$("#update_disable").attr("disabled", true);
						$("#item_approval_id").attr("disabled", false);
						$("#reset_disable").attr("disabled", true);
						$("#save_disable").attr("disabled", true);
						clearDrugRegistration();
						// $('#registration').modal('toggle');
					}
				},
				error : function() {
					console.log('something went wrong');
					console.log("Error In insertDrugDetails");
				}
			});

}

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

function getItemSearchList(strData) {

	var objDivTag = document.createElement('div');
	$(objDivTag).addClass('table-responsive');

	var objTableTag = document.createElement('table');
	$(objTableTag)
			.addClass(
					'table table-striped table-bordered table-hover dataTables-example');
	$(objDivTag).append(objTableTag);

	var objTHead = document.createElement('thead');
	$(objTableTag).append(objTHead);

	var objTr = document.createElement('tr');
	$(objTHead).append(objTr);

	var objTHead1 = document.createElement('th');
	$(objTHead1).html('S.No');
	$(objTr).append(objTHead1);

	var objTHead2 = document.createElement('th');
	$(objTHead2).html('Generic Name');
	$(objTr).append(objTHead2);

	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Short Code');
	$(objTr).append(objTHead3);

	var objTHead4 = document.createElement('th');
	$(objTHead4).html('Brand Name');
	$(objTr).append(objTHead4);

	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Manufacture');
	$(objTr).append(objTHead5);

	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Inventory Item Form');
	$(objTr).append(objTHead6);

	var objTHead7 = document.createElement('th');
	$(objTHead7).html('Strength');
	$(objTr).append(objTHead7);

	var objTHead8 = document.createElement('th');
	$(objTHead8).html('Item Name');
	$(objTr).append(objTHead8);

	var objTHead9 = document.createElement('th');
	$(objTHead9).html('Schedule');
	$(objTr).append(objTHead9);

	var objTHead10 = document.createElement('th');
	$(objTHead10).html('EDIT');
	$(objTr).append(objTHead10);

	var objTBody = document.createElement('tbody');
	$(objTBody).attr('id', 'driverTablebody');
	$(objTableTag).append(objTBody);

	for (var i = 0; i < strData.length; i++) {

		var index = i + 1;
		var tbleRow = document.createElement('tr');

		var tblCol = document.createElement('td');
		$(tblCol).addClass('text-center');
		$(tblCol).html(index);
		$(tbleRow).append(tblCol);

		var tblCol1 = document.createElement('td');
		$(tblCol1).addClass('text-center');
		$(tblCol1).html(strData[i].dgn_genericname);
		$(tbleRow).append(tblCol1);

		var tblCol2 = document.createElement('td');
		$(tblCol2).addClass('text-center');
		$(tblCol2).html(strData[i].dr_short_unic_code);
		$(tbleRow).append(tblCol2);

		var tblCol3 = document.createElement('td');
		$(tblCol3).addClass('text-center');
		$(tblCol3).html(strData[i].db_drug_brand_lang1);
		$(tbleRow).append(tblCol3);

		var tblCol4 = document.createElement('td');
		$(tblCol4).addClass('text-center');
		$(tblCol4).html(strData[i].ma_companyname);
		$(tbleRow).append(tblCol4);

		var tblCol5 = document.createElement('td');
		$(tblCol5).addClass('text-center');
		$(tblCol5).html(strData[i].df_form_type);
		$(tbleRow).append(tblCol5);

		var tblCol6 = document.createElement('td');
		$(tblCol6).addClass('text-center');
		$(tblCol6).html(strData[i].dr_strength_type);
		$(tbleRow).append(tblCol6);

		var tblCol7 = document.createElement('td');
		$(tblCol7).addClass('text-center');
		$(tblCol7).html(strData[i].dr_drug_name);
		$(tbleRow).append(tblCol7);

		var tblCol8 = document.createElement('td');
		$(tblCol8).addClass('text-center');
		$(tblCol8).html(strData[i].ds_schdule_type);
		$(tbleRow).append(tblCol8);

		var tablcol9 = document.createElement("td");
		var buttonTag = document.createElement('button');
		var text = document.createTextNode("EDIT");
		buttonTag.appendChild(text);
		$(buttonTag).addClass('btn btn-primary btn-sm');
		$(buttonTag).attr('onclick',
				'editItemDetails("' + strData[i].dr_serialid + '")');
		$(buttonTag).attr('id', 'editItemDetailsId');
		$(tablcol9).append(buttonTag);
		$(tablcol9).css('height', '36px');
		$(tbleRow).append(tablcol9);
		$(objTBody).append(tbleRow);
	}
	$("#driverTable").append(objDivTag);
}

function editItemDetails(dr_serialid) {
	//$('#update').modal('show');
	$('#update').modal({
		  backdrop: 'static',
		  keyboard: true
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
//						{
//							extend : 'copy'
//						},
//						{
//							extend : 'csv'
//						},
//						{
//							extend : 'excel',
//							title : 'Item Data'
//						},
//						{
//							extend : 'pdf',
//							title : 'Item Data'
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

function drugValidation() {
	console.log("drugValidation function is executed");
	var name_regex = /^[a-zA-Z0-9]+$/;
	var genericNameid = $("#reg_drug_genericNameId").val();
	var drugName = $("#reg_drug_itemnameId").val();
	var brand_id = $('#reg_drug_brandnameid').val();//
	var scheduleid = $('#reg_drug_scheduleId').val();
	var manufaturer_id = $('#reg_drug_manufactureId').val();
	var short_unic_code = $('#reg_drug_shortCodeId').val();
	var strength_type = $('#reg_drug_strengthId').val();// Need to start

	console.log('strength_type---> ' + strength_type);
	// validaation
	var dispensinbaleMinQty = $("#reg_drug_dispensableId").val();
	var inventoryGroup = $("#reg_drug_inventorygroupId").val();
	var inventoryItemFormId = $("#reg_drug_inventoryItemFormId").val();
	var packingId = $("#reg_drug_packingId").val();
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ packing id ->> "+packingId);
	var intPackingId =packingId.split(",")[0];
	/*if(packingId != null || packingId !== 'null'){
		
	}
	else{
		intPackingId = packingId.split(",")[0];
	}*/
	 console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ intPackingId"+intPackingId);
	
	var quantity = $("#scmitemQuantity").val();

	var centralMinQty = $("#reg_drug_centralMinQtyId").val();
	var centralReorder = $("#reg_drug_centralMaxQtyId").val();

	var substoreMinQty = $("#reg_drug_substoreMinQtyId").val();
	var subStoreMaxQty = $("#reg_drug_substoreMaxQtyId").val();

	var ambMinQty = $("#reg_drug_ambMinQtyId").val();
	var ambMaxQty = $("#reg_drug_ambMaxQtyId").val();

	var description = $("#reg_drug_descId").val();
	var barcode = $("#reg_drug_barcodeId").val();
	var expAlert = $("#reg_drup_expiryalertId").val();

	if (genericNameid == 0 || genericNameid == '0') {
		toastr.warning('Please select Generic Name');
		return false
	}

	if (!drugName.match(name_regex) || drugName.length == 0) {
		toastr.warning('Please enter Item Name'); // This Segment
		return false
	}

	/*
	 * * else if (short_unic_code == '' || short_unic_code == null ||
	 * short_unic_code == 'undefined') { toastr.warning('shortCode should not be
	 * empty!'); return false }
	 */
	
	

	if (reg_drug_inventoryItemFormId == '0'
			|| reg_drug_inventoryItemFormId == 0
			|| reg_drug_inventoryItemFormId == 'undefined') {
		toastr.warning('Please select Inventory Item From !');
		return false
	}
	if (reg_drug_inventoryItemFormId == '0'
			|| reg_drug_inventoryItemFormId == 0
			|| reg_drug_inventoryItemFormId == 'undefined') {
		toastr.warning('Please select Inventory Item From !');
		return false
	}
	if (reg_drug_packingId == '0' || reg_drug_packingId == 0
			|| reg_drug_packingId == 'undefined') {
		toastr.warning('Please select packing !');
		return false
	}
	if (brand_id == '0' || brand_id == 0 || brand_id == 'undefined') {
		toastr.warning('Please select Brand Name !');
		return false
	}
	if (scheduleid == '0' || scheduleid == 0 || scheduleid == 'undefined') {
		toastr.warning('Please select Schedule !');
		return false
	}
	if (manufaturer_id == '0' || manufaturer_id == 0
			|| manufaturer_id == 'undefined') {
		toastr.warning('Please select Manufaturer!');
		return false
	}

	if (strength_type == '' || strength_type == null) {
		toastr.warning('Please Eneter Strength!');
		return false
	}

	if (dispensinbaleMinQty == '' || dispensinbaleMinQty == null
			|| dispensinbaleMinQty == 'undefined') {
		toastr.warning('Please  Enter dispensable Min Qty!');
		return false
	}
	if (inventoryGroup == 0 || inventoryGroup == null
			|| inventoryGroup == 'undefined') {
		toastr.warning('Please Select inventory Group !');
		return false
	}
	if (inventoryItemFormId == 0 || inventoryItemFormId == null
			|| inventoryItemFormId == 'undefined') {
		toastr.warning('Please select inventory Item Form!');
		return false
	}
	if (packingId == 0 || packingId == null || packingId == 'undefined') {
		toastr.warning('Please Select Packing Type');
		return false
	}
	if (centralMinQty == '' || centralMinQty == null
			|| centralMinQty == 'undefined') {
		toastr.warning('Please Enter Central Min Qty!');
		return false
	}

	if (centralReorder == '' || centralReorder == null
			|| centralReorder == 'undefined') {
		toastr.warning('Please Enter Central Re-Order Qty!');
		return false
	} else {

		if (centralReorder <= 0) {
			toastr.warning("Don't enter Central Store Reorder Qty as zero");
			return false
		}

		if (centralReorder === centralMinQty) {
			toastr
					.warning("Don't enter Central Store Reorder Qty as same as Central Store Min Qty");
			return false
		}

		if (centralMinQty > centralReorder) {
			toastr
					.warning("Central Store Min Qty not more than the Central Store Reorder Qty");
			return false
		}

	}

	// else if (centralReorder == '' || centralReorder == null
	// || centralReorder == 'undefined') {
	// toastr.warning('Please Enter Central Re-Order Qty!');
	// return false
	// }

	if (substoreMinQty == '' || substoreMinQty == null
			|| substoreMinQty == 'undefined') {
		toastr.warning('Please Enter Sub Store Min Qty!');
		return false
	}
	if (subStoreMaxQty == '' || subStoreMaxQty == null
			|| subStoreMaxQty == 'undefined') {
		toastr.warning('Please Enter Sub Store Max Qty!');
		return false
	} else {

		if (subStoreMaxQty <= 0) {
			toastr.warning("Don't enter Sub Store Reorder Qty as zero");
			return false
		}

		if (subStoreMaxQty === substoreMinQty) {
			toastr
					.warning("Don't enter Sub Store Reorder Qty as same as Sub Store Min Qty");
			return false
		}

		if (substoreMinQty > subStoreMaxQty) {
			toastr
					.warning("Sub Store Min Qty not more than the Sub Store Reorder Qty");
			return false
		}

	}

	if (ambMinQty == '' || ambMinQty == null || ambMinQty == 'undefined') {
		toastr.warning('Please Enter Ambulance To Ambulance Min Qty!');
		return false
	}
	if (ambMaxQty == '' || ambMaxQty == null || ambMaxQty == 'undefined') {
		toastr.warning('Please Enter Ambulance To Ambulance Min Qty!');
		return false
	}

	else {

		if (ambMaxQty <= 0) {
			toastr.warning("Don't enter Ambulance Reorder Qty as zero");
			return false
		}

		if (ambMaxQty === ambMinQty) {
			toastr.warning("Don't enter Ambulance Reorder Qty as same as Ambulance Min Qty");
			return false
		}

		/*if (ambMaxQty > ambMinQty) {
			toastr.warning("Ambulance Min Qty not more than the Ambulance Reorder Qty");
			return false
		}*/

	}

	if (description == '' || description == null || description == 'undefined') {
		toastr.warning('Please Enter Description!');
		return false
	}
	if (expAlert == '' || expAlert == null || expAlert == 'undefined') {
		toastr.warning('Please Enter Expiry Alert!');
		return false
	}
	// ambMaxQty
	else {

		
		var userId = localStorage.getItem('userID');
 		var	roleId = localStorage.getItem("scmRoleId");
 		var	moduleId = localStorage.getItem("scmModuleId");
 	
		
		var obj_Insert = {
			drugName : drugName,
			brand_id : brand_id,
			manufaturer_id : manufaturer_id,
			form_id : inventoryItemFormId,
			minmum_level_qty : centralMinQty,
			maximum_lel_qty : centralReorder,
			short_unic_code : short_unic_code,
			expire_alert : expAlert,
			createdbyid : userId,
			createdbyroleid : roleId,
			createdbymoduleid : moduleId,
			strength_type : strength_type,
			system_id : 1,
			genric_group_id : 1,
			genric_molecules_id : 1,
			packId : intPackingId,
			scheduleid : scheduleid,
			vehicleReorderqty : ambMaxQty,
			vehicleMinqty : ambMinQty,
			materialGroupformid : inventoryGroup,
			genericid : genericNameid,
			minsaleqty : dispensinbaleMinQty,
			barcode : barcode,
			subStoreMinLevelQty : substoreMinQty,
			subStoreMaxLevelQty : subStoreMaxQty,
			description : description
		}
		return obj_Insert;
	}
}

function DrugMiscellaneousRegistation() {

	var genericNameId = $('#reg_drug_genericNameId').val();
	var scmitemname = $('#scmitemname').val();
	var manufacturedId = $('#reg_drug_manufactureId').val();
	var shortCode = $('#reg_drug_shortCodeId').val();
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	var inventoryItemFromTypeId = $('#reg_drug_inventoryItemFormId').val();
	var packingTypeId = $('#reg_drug_packingId').val();
	var quantity = $('#scmitemQuantity').val();
	var centralMinQtyId = $('#reg_drug_centralMinQtyId').val();
	var centralMaxQtyId = $('#reg_drug_centralMaxQtyId').val();
	var description = $('#reg_drug_descId').val();
	var barcode = $('#reg_drug_barcodeId').val();
	var serialNumber = $('#serialNumber').val();

	var concatSnoAndItemName;
	if (serialNumber == "" || serialNumber == '') {
		toastr.warning('Please enter Serial No!');
		return false;
	} else {
		if (serialNumber == undefined || serialNumber == 'undefined') {
			concatSnoAndItemName = scmitemname;
		} else {
			concatSnoAndItemName = scmitemname + '-' + serialNumber;
		}
	}
	console.log('concatSnoAndItemName::' + concatSnoAndItemName);

	if (scmitemname == "" || scmitemname == '') {
		toastr.warning('Please enter Item Name!');
		return false;
	}

	if (manufacturedId == 0 || manufacturedId == '0') {
		toastr.warning('Please Select Manufactured Type!');
		return false;
	}

	if (shortCode == "" || shortCode == '') {
		toastr.warning('Short Code should not be empty!');
		return false;
	}

	if (inventoryGroupId == 0 || inventoryGroupId == '0') {
		toastr.warning('Please Select Inventory group Type!');
		return false;
	}

	if (inventoryItemFromTypeId == 0 || inventoryItemFromTypeId == '0') {
		toastr.warning('Please Select Inventory Item Type !');
		return false;
	}

	if (centralMinQtyId == "" || centralMinQtyId == '') {
		toastr.warning('Central store Min qty should not be empty!');
		return false;
	}

	if (centralMaxQtyId == "" || centralMaxQtyId == '') {
		toastr.warning('Central store max qty should not be empty!');
		return false;
	}
	 else {

		if (centralMaxQtyId <= 0) {
			toastr.warning("Don't enter Central Store Reorder Qty as zero");
			return false
		}

		if (centralMaxQtyId === centralMinQtyId) {
			toastr
					.warning("Don't enter Central Store Reorder Qty as same as Central Store Min Qty");
			return false
		}

		if (centralMinQtyId > centralMaxQtyId) {
			toastr
					.warning("Central Store Min Qty not more than the Central Store Reorder Qty");
			return false
		}

	}
	
//	if (parseInt(centralMaxQtyId) < parseInt(centralMinQtyId)) {
//		toastr.warning('Central store Min Qty should not be more than Central Store Max Qty');
//		return false;
//
//	}

	if (description == "" || description == '') {
		toastr.warning('Please provide description');
		return false;
	}

	if (genericNameId == null || genericNameId == 'null'
			|| genericNameId == "0" || genericNameId == 0) {
		genericNameId = 1;
	}

	
	
	    var userId = localStorage.getItem('userID');
		var	roleId = localStorage.getItem("scmRoleId");
		var	moduleId = localStorage.getItem("scmModuleId");
		var intPackingId = packingTypeId.split(",")[0];
	var obj_Insert = {
		drugName : concatSnoAndItemName,
		brand_id : 1,
		manufaturer_id : manufacturedId,
		form_id : inventoryItemFromTypeId,
		minmum_level_qty : centralMinQtyId,
		maximum_lel_qty : centralMaxQtyId,
		short_unic_code : shortCode,
		expire_alert : "0",
		createdbyid : userId,
		createdbyroleid : roleId,
		createdbymoduleid : moduleId,
		strength_type : "NA",
		system_id : 1,
		genric_group_id : 1,
		genric_molecules_id : 1,
		packId : intPackingId,
		scheduleid : 4,
		vehicleReorderqty : 1,
		vehicleMinqty : 1,
		materialGroupformid : inventoryGroupId,
		genericid : genericNameId,
		minsaleqty : 0,
		barcode : barcode,
		subStoreMinLevelQty : 1,
		subStoreMaxLevelQty : 1,
		description : description
	}
	var strUrl = Service.INSERT_DRUG_DETAILS;
	console.log('==== strUrl' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				resetItemSearch();
				toastr.info('Item Already Exist!');
				clearDrugRegistration();
			}
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Drug Registered Successfully!');
				$("#update_disable").attr("disabled", true);
				$("#item_approval_id").attr("disabled", false);
				$("#reset_disable").attr("disabled", true);
				$("#save_disable").attr("disabled", true);
				clearDrugRegistration();
				$('#scmitemname').val('');
				// $('#registration').modal('toggle');
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}
function DrugMiscellaneousUpdate() {
	var genericNameId = $('#reg_drug_genericNameId').val();
	var scmitemname = $('#scmitemname').val();
	var manufacturedId = $('#reg_drug_manufactureId').val();
	var shortCode = $('#reg_drug_shortCodeId').val();
	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	var inventoryItemFromTypeId = $('#reg_drug_inventoryItemFormId').val();
	var packingTypeId = $('#reg_drug_packingId').val();
	var quantity = $('#scmitemQuantity').val();
	var centralMinQtyId = $('#reg_drug_centralMinQtyId').val();
	var centralMaxQtyId = $('#reg_drug_centralMaxQtyId').val();
	var description = $('#reg_drug_descId').val();
	var barcode = $('#reg_drug_barcodeId').val();

	if (scmitemname == "" || scmitemname == '') {
		toastr.warning('Please enter Item Name!');
		return false;
	}
	if (manufacturedId == 0 || manufacturedId == '0') {
		toastr.warning('Please Select Manufactured Type!');
		return false;
	}

	if (shortCode == "" || shortCode == '') {
		toastr.warning('Short Code should not be empty!');
		return false;
	}

	if (inventoryGroupId == 0 || inventoryGroupId == '0') {
		toastr.warning('Please Select Inventory group Type!');
		return false;
	}

	if (inventoryItemFromTypeId == 0 || inventoryItemFromTypeId == '0') {
		toastr.warning('Please Select Inventory Item Type !');
		return false;
	}

	if (centralMinQtyId == "" || centralMinQtyId == '') {
		toastr.warning('Central store Min qty should not be empty!');
		return false;
	}

	if (centralMaxQtyId == "" || centralMaxQtyId == '') {
		toastr.warning('Central store max qty should not be empty!');
		return false;
	}

	if (parseInt(centralMaxQtyId) < parseInt(centralMinQtyId)) {
		toastr
				.warning('Central store Min Qty should not be more than Central Store Max Qty');
		return false;

	}

	if (description == "" || description == '') {
		toastr.warning('Please provide description');
		return false;
	}
	var userId = localStorage.getItem('userID');
	var	roleId = localStorage.getItem("scmRoleId");
	var	moduleId = localStorage.getItem("scmModuleId");
	var intPackingId = packingTypeId.split(",")[0];
	var obj_Insert = {
		"drugId" : globalIds.drugId,
		drugName : scmitemname,
		brand_id : 1,
		manufaturer_id : manufacturedId,
		form_id : inventoryItemFromTypeId,
		minmum_level_qty : centralMinQtyId,
		maximum_lel_qty : centralMaxQtyId,
		short_unic_code : shortCode,
		expire_alert : "0",
		createdbyid : userId,
		createdbyroleid : roleId,
		createdbymoduleid : moduleId,
		strength_type : "NA",
		system_id : 1,
		genric_group_id : 1,
		genric_molecules_id : 1,
		packId : intPackingId,
		scheduleid : 4,
		vehicleReorderqty : 1,
		vehicleMinqty : 1,
		materialGroupformid : inventoryGroupId,
		genericid : genericNameId,
		minsaleqty : 0,
		barcode : barcode,
		subStoreMinLevelQty : 1,
		subStoreMaxLevelQty : 1,
		description : description
	}
	var strUrl = itemRegistration.updateDrugDetails;

	console.log('==== strUrl' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				resetItemSearch();
				toastr.info('Item Already Exist!');
				clearDrugRegistration();
			}
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Registred Drug is updated Successfully!');
				$("#update_disable").attr("disabled", true);
				$("#item_approval_id").attr("disabled", false);
				$("#reset_disable").attr("disabled", true);
				$("#save_disable").attr("disabled", true);
				clearDrugRegistration();
				$('#scmitemname').val('');
				// $('#registration').modal('toggle');
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}
//select * from sp_update_drug_reg_ref(380,'UKG',9,10,2,1,1,'QLX-DR-63','3',1,1,1,'1',1,1,1,19,7,null,null,3,19,'null',0,1,1,'tt')
$("#reg_drug_packingId").change(function() {
	var getPackingType = $('#reg_drug_packingId').val();
	//alert("!!!!!!!!!!!!!!!!!!!"+getPackingType);
	//let unit = getPackingType.split(",")[1];
	//alert("@@@@@@@@@@@"+unit);
//	let preValue = unit.split("x").[0];
//	let postValue = unit.split("x").[1];
//	
//	let calPreValueAndPostValue = preValue*postValue;
//	
//	alert('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + calPreValueAndPostValue);

});