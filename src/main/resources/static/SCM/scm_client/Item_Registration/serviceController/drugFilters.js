var globalIds = {
	"drugId" : 0

};

function itemSearchByFilter() {
	$('#driverTable').empty();
	console.log('itemSearchByFilter javascript function is executed');
	try {
		var shortCode = $('#short_codeId').val();
		var itemName = $('#item_name_for_filter').val();
		var brandId = $('#brandNameId').val();
		var inventoryFormItemId = $('#load_from_inventory_id').val();
		var manufacture = $('#manufactureId').val();
		console.log('shortCodeshortCode' + shortCode);
		console.log('itemNameitemNameitemName' + itemName);
		console.log('brandIdbrandIdbrandId' + brandId);
		console.log('inventoryFormItemIdinventoryFormItemId'
				+ inventoryFormItemId);
		console.log('manufacturemanufacturemanufacture' + manufacture);
		
		
		if (shortCode == "" && itemName == "" && brandId == 0
				&& inventoryFormItemId == 0 && manufacture == 0) {
			toastr.error('Please select any one field');
			return false;
		}
		if (itemName == "") {
			itemName = "¥";
		}
		if (shortCode == "") {
			shortCode = '¥';
		}
		if (brandId == 0) {
			brandId = 0;
		}
		if (inventoryFormItemId == 0) {
			inventoryFormItemId = 0;
		}
		if (manufacture == 0) {
			manufacture = 0;
		}
		
		
		
		
		
		var obj_Insert = {
			"genericName" : itemName,
			"offsetValue" : 10,
			"brand" : brandId,
			"form" : inventoryFormItemId,
			"mfg" : manufacture,
			"unicode" : shortCode,
			"systemId" : 0,
			"genericGroupId" : "0",
			"genericMoleculeId" : "0",
			"pageLimitValue" : "100"
		};
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				+ JSON.stringify(obj_Insert));
		var strUrl1 = itemRegistration.getMedicines;
		var strUrl = strUrl1;
		console.log("strUrl : " + strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Insert),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				console.log("Json Data::" + JSON.stringify(data));
				var responsecode = data.responseCode;
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					toastr.info('No item found');
					
					//clearDrugRegistration();
//					var divTag = document.createElement("h2");
//					$(divTag).css("text-align", "center");
//					$(divTag).html("No data available....");
//					$('#driverTable').append(divTag);
				} else {
					var jsonArray = data.objControllerDto;
					console.log("::::::::::::::::::::"
							+ JSON.stringify(data.objControllerDto));
					if (jsonArray.length > 0) {
						//clearDrugRegistration();
						listOfDrugDetails(jsonArray);
						loadDataTable();
					}
				}
			},
			error : function(err) {
				console.error('itemSearch  error: ' + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in itemSearch()" + JSON.stringify(err));
	}
}

function listOfDrugDetails(strData) {
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

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
		$(objTHead10).html('Update');
		$(objTr).append(objTHead10);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");

			var tblCol1 = document.createElement('td');
			$(tblCol1).addClass('text-center');
			$(tblCol1).html(strData[i].genericName);
			// $(tblCol1).html("hiiiiiii");
			$(tbleRow).append(tblCol1);

			var tblCol2 = document.createElement('td');
			$(tblCol2).addClass('text-center');
			$(tblCol2).html(strData[i].shortUnicCode);
			$(tbleRow).append(tblCol2);

			var tblCol3 = document.createElement('td');
			$(tblCol3).addClass('text-center');
			$(tblCol3).html(strData[i].drugBrandLang_1);
			$(tbleRow).append(tblCol3);

			var tblCol4 = document.createElement('td');
			$(tblCol4).addClass('text-center');
			$(tblCol4).html(strData[i].companyName);
			$(tbleRow).append(tblCol4);

			var tblCol5 = document.createElement('td');
			$(tblCol5).addClass('text-center');
			$(tblCol5).html(strData[i].formType);
			$(tbleRow).append(tblCol5);

			var tblCol6 = document.createElement('td');
			$(tblCol6).addClass('text-center');
			$(tblCol6).html(strData[i].strengthType);
			$(tbleRow).append(tblCol6);

			var tblCol7 = document.createElement('td');
			$(tblCol7).addClass('text-center');
			$(tblCol7).html(strData[i].drugName);
			$(tbleRow).append(tblCol7);

			var tblCol8 = document.createElement('td');
			$(tblCol8).addClass('text-center');
			$(tblCol8).html(strData[i].schduleType);
			$(tbleRow).append(tblCol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).addClass('text-center');
			$(tablcol9)
					.append(
							'<button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-edit p-r-xs"></i> Update </button>');
			$(tablcol9).attr(
					'onclick',
					'get_RowData("' + strData[i].genericName + '","'
							+ strData[i].serialId + '","'
							+ strData[i].shortUnicCode + '","'
							+ strData[i].drugBrandLang_1 + '","'
							+ strData[i].companyName + '","'
							+ strData[i].packingType + '","'
							+ strData[i].groupName + '","'
							+ strData[i].formType + '","'
							+ strData[i].strengthType + '","'
							+ strData[i].systemTypeLang_1 + '","'
							+ strData[i].dgGroupFunctionTypeLang_1 + '","'
							+ strData[i].dgmGroupMoleculesTypeLang_1 + '","'
							+ strData[i].drugName + '","'
							+ strData[i].schduleType + '","'
							+ strData[i].dr_MinmunLevelQty + '","'
							+ strData[i].dr_MaximunLevelQty + '","'
							+ strData[i].dr_ExpireAlert + '","'
							+ strData[i].vehminQty + '","'
							+ strData[i].vehmaxQty + '","'
							+ strData[i].dr_MinSalesQty + '","'
							+ strData[i].subStoreMinQty + '","'
							+ strData[i].subStoreMaxQty + '","'
							+ strData[i].description + '","'
							+ strData[i].barCode + '")');
			$(tbleRow).append(tblCol8);
			$(tbleRow).append(tablcol9);
			$(objTBody).append(tbleRow);
		}

		$("#driverTable").append(objDivTag);

	} catch (err) {
		console.log("indent_rised" + err);
	}
}

function get_RowData(genericName, serialId, shortUnicCode, drugBrandLang_1,
		companyName, packingType, groupName, formType, strengthType,
		systemTypeLang_1, dgGroupFunctionTypeLang_1,
		dgmGroupMoleculesTypeLang_1, drugName, schduleType, dr_MinmunLevelQty,
		dr_MaximunLevelQty, dr_ExpireAlert, vehminQty, vehmaxQty,
		dr_MinSalesQty, subStoreMinQty, subStoreMaxQty,description, barCode) {

	globalIds.drugId = serialId;
	
	//clear fields
	//clearDrugRegistration();
	console.log(packingType);
	//disable item name
	
	
	
	var  PackingValue = packingType.split("X");
	console.log("@@@@@@@@@@@@@@@@@"+PackingValue);
	var prePackingValue = PackingValue[0];
	var postPackingValue = PackingValue[1];
	
	console.log('prePackingValue::'+prePackingValue);
	console.log('postPackingValue::'+postPackingValue);
	$("#scmitemQuantity").val(prePackingValue*postPackingValue);
	
	
	 $( "#reg_drug_itemnameId" ).prop( "disabled", true );
	
	
	//$('#registration_and_update_modal').modal('show');

	$('#registration_and_update_modal').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	
	
	$("#reg_drug_genericNameId option:contains(" + genericName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	$("#reg_drug_brandnameid option:contains(" + drugBrandLang_1 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	$("#reg_drug_scheduleId option:contains(" + schduleType + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	$("#reg_drug_manufactureId option:contains(" + companyName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	$("#reg_drug_inventorygroupId option:contains(" + groupName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	var inventoryGroupId = $('#reg_drug_inventorygroupId').val();
	loadListOfInventoryItemFrom();

	$("#reg_drug_inventoryItemFormId option:contains(" + formType + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	getlistOfPackingDropDown();

	$("#reg_drug_packingId option:contains("+packingType+")").attr(
			'selected', 'selected').trigger("chosen:updated");
	
	
	$('#reg_drug_strengthId').val(strengthType);

	
	//
	$('#reg_drug_itemnameId').val(drugName);
	$('#scmitemname').val(drugName);
	$('#reg_drug_descId').val(description);
	$('#reg_drup_expiryalertId').val(dr_ExpireAlert);
	
	$('#reg_drug_ambMinQtyId').val(vehminQty);
	$('#reg_drug_ambMaxQtyId').val(vehmaxQty);
	$('#reg_drug_centralMinQtyId').val(dr_MinmunLevelQty);
	$('#reg_drug_centralMaxQtyId').val(dr_MaximunLevelQty);
	$('#reg_drug_substoreMinQtyId').val(subStoreMinQty);
	$('#reg_drug_substoreMaxQtyId').val(subStoreMaxQty);
	$('#reg_drug_barcodeId').val(barCode);
	$('#reg_drug_shortCodeId').val(shortUnicCode);
	$('#reg_drug_dispensableId').val(dr_MinSalesQty);
	$('#code128').val('');
	 JsBarcode("#code128", barCode);

	$("#update_disable").attr("disabled", false);
	$("#item_approval_id").attr("disabled", true);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);
}

function openModalBoxForRegistration_and_update() {
	clearDrugRegistration();
	//$('#registration_and_update_modal').modal('show');
	
	$('#registration_and_update_modal').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	 $( "#reg_drug_itemnameId" ).prop( "disabled", false );
	$("#update_disable").attr("disabled", true);
	$("#item_approval_id").attr("disabled", true);
	$("#reset_disable").attr("disabled", false);
	$("#save_disable").attr("disabled", false);
}


//Allow alphabets and space only
/*$('#reg_drug_itemnameId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^a-zA-Z ]/g))    
    	return false;                        

});*/ 


$('#reg_drug_dispensableId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

}); 

$('#reg_drug_centralMinQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drug_substoreMaxQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drug_substoreMinQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drug_substoreMaxQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drug_ambMinQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drug_ambMaxQtyId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});
$('#reg_drup_expiryalertId').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
    	return false;                        

});


























