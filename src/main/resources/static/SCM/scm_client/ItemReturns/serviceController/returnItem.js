var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");

	try {
		$('#central_store').hide();
		$('#adjustment_type').hide();
		$('#vendor').hide();
		$('#substore').hide();
		$('#zone').hide();
		$('#baselocation').hide();
		$('#ambulance').hide();

	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

function getCentralStore() {
	try {
		$('#central_store_id').empty();
		var strUrl = ServiceProcreument.LOAD_STORE_DROPDOWN;
		console.log("LOAD_STORE_DROPDOWN::::: " + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						console.log("responsecode " + data.responseCode);
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Store</option>";
							$('#central_store_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.countryId + ">"
										+ resData.countryName + "</option>";
								$(module).appendTo('#central_store_id');

							});
						}
					},
					error : function(err) {
						console.error("Error in GET_BRAND_NAMES"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in GET_BRAND_NAMES()' + err);
	}
	$('#central_store_id').trigger("chosen:updated");
	$('#central_store_id').chosen();

}

function getAdjustmentType() {
	try {
		$('#adjustment_type_id').empty();
		var strUrl = ServiceProcreument.ADJUSTMENT_TYPE;
		console.log("ADJUSTMENT_TYPE::::: " + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						console.log("responsecode " + data.responseCode);
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Adjustment Type</option>";
							$('#adjustment_type_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.adjustmentId + ">"
										+ resData.adjustmentDesc + "</option>";
								$(module).appendTo('#adjustment_type_id');

							});
						}
					},
					error : function(err) {
						console.error("Error in GET_BRAND_NAMES"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in GET_BRAND_NAMES()' + err);
	}
	$('#adjustment_type_id').trigger("chosen:updated");
	$('#adjustment_type_id').chosen();

}

function getSuppliers() {
	try {
		$('#vendor_id').empty();
		var strUrl = ServiceProcreument.LOAD_SUPPLIERS;
		console.log("LOAD_SUPPLIERS::::: " + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						console.log("responsecode " + data.responseCode);
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.adjustmentStockControllerDTO;
							var selectfirst = "<option value='0'>Select Supplier</option>";
							$('#vendor_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value=" + resData.user_id
										+ ">" + resData.userName + "</option>";
								$(module).appendTo('#vendor_id');

							});
						}
					},
					error : function(err) {
						console.error("Error in GET_BRAND_NAMES"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in GET_BRAND_NAMES()' + err);
	}
	$('#vendor_id').trigger("chosen:updated");
	$('#vendor_id').chosen();

}

function getZones() {
	try {
		$('#zone_id').empty();
		var strUrl = ServiceProcreument.LOAD_ZONES;
		console.log("LOAD_ZONES::::: " + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						console.log("responsecode " + data.responseCode);
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select Zone</option>";
							$('#zone_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.locationId + ">"
										+ resData.locationName + "</option>";
								$(module).appendTo('#zone_id');

							});
						}
					},
					error : function(err) {
						console.error("Error in GET_BRAND_NAMES"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in GET_BRAND_NAMES()' + err);
	}
	$('#zone_id').trigger("chosen:updated");
	$('#zone_id').chosen();

}

$('#zone_id').on('change', function() {
	var zone_id = $('#zone_id').val();
	$('#baselocation_id').empty();
	loadBaselocations(zone_id, 'baselocation_id');
});

function loadBaselocations(zone_id, baselocation_id) {
	try {
		var id = '#' + baselocation_id;
		$(id).empty();
		var strUrl = ServiceProcreument.LOAD_BASELOCATIONS;
		console.log("LOAD_BASELOCATIONS:::::: " + strUrl);
		var obj_Insert = {
			zoneId : zone_id
		};
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
							var selectfirst = "<option value='0'>Select Baselocation</option>";
							$(id).append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var sectionData = "<option value="
										+ resData.baseLocationId + ">"
										+ resData.baseLocationName
										+ "</option>";
								$(sectionData).appendTo(id);
							});
						}
					},
					error : function(err) {
						console.error("Error in getsectionDropdown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getsectionDropdown()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

$('#baselocation_id').on('change', function() {
	var baselocation_id = $('#baselocation_id').val();
	$('#ambulance_id').empty();
	loadAmbulances(baselocation_id, 'ambulance_id');
});

function loadAmbulances(baselocation_id, ambulance_id) {
	try {
		var id = '#' + ambulance_id;
		$(id).empty();
		var strUrl = ServiceProcreument.LOAD_VEHICLES;
		console.log("LOAD_VEHICLES:::::: " + strUrl);
		var obj_Insert = {
			baselocation : baselocation_id
		};
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
							var selectfirst = "<option value='0'>Select Ambulance</option>";
							$(id).append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var sectionData = "<option value="
										+ resData.vehicleId + ">"
										+ resData.permanentRegNo + "</option>";
								$(sectionData).appendTo(id);
							});
						}
					},
					error : function(err) {
						console.error("Error in getsectionDropdown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getsectionDropdown()' + err);
	}
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

function loadSubstore() {
	try {
		$('#substore_id').empty();
		var strUrl = ServiceProcreument.LOAD_SUBSTORE;
		console.log("LOAD_VEHICLES:::::: " + strUrl);
		var obj_Insert = {
			supStoreTypeId : 102
		};
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
							var selectfirst = "<option value='0'>Select Substore</option>";
							$('#substore_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var sectionData = "<option value="
										+ resData.countryId + ">"
										+ resData.countryName + "</option>";
								$(sectionData).appendTo('#substore_id');
							});
						}
					},
					error : function(err) {
						console.error("Error in getsectionDropdown"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getsectionDropdown()' + err);
	}
	$('#substore_id').trigger("chosen:updated");
	$('#substore_id').chosen();
}

var temp_id;

function centralonclick() {
	console.log("Central functon executed");
	temp_id = 1;
	$('#return_item_table').empty();
	$('#return_item_list_table').empty();
	$('#central_store').show();
	$('#adjustment_type').show();
	$('#vendor').show();
	$('#substore').hide();
	$('#zone').hide();
	$('#baselocation').hide();
	$('#ambulance').hide();
	getCentralStore();
	getAdjustmentType();
	getSuppliers();
}

function substoreOnclick() {
	console.log("Sub store functon executed");
	temp_id = 2;

	$('#return_item_table').empty();
	$('#return_item_list_table').empty();
	$('#central_store').hide();
	$('#adjustment_type').show();
	$('#vendor').hide();
	$('#substore').show();
	$('#hideSubStore').show();
	$('#zone').hide();
	$('#baselocation').hide();
	$('#ambulance').hide();
	getAdjustmentType();
	loadSubstore();
}

function ambulanceonclick() {
	console.log("ambulance functon executed");

	temp_id = 3;
	$('#return_item_table').empty();
	$('#return_item_list_table').empty();
	$('#central_store').hide();
	$('#adjustment_type').show();
	$('#vendor').hide();
	$('#hideSubStore').hide();
	$('#substore').hide();
	$('#zone').show();
	$('#baselocation').show();
	$('#ambulance').show();
	getAdjustmentType();
	getZones();
	loadSubstore();

	$('#substore').show();
}

function searchItemsOnclick() {
	console.log("searchItemsOnclick javascript function executed");

	console.log("temp_id: " + temp_id);
	var adjust_type = $('#adjustment_type_id').val();
	var substore = $('#substore_id').val();
	var ambulance = $('#ambulance_id').val();
	var central = $('#central_store_id').val();
	var supplier_id = $('#vendor_id').val();

	if (temp_id == 1) {
		console.log('central Stock condition executed');
		if (central == 0 || central == '0') {
			toastr.error('Please select central store ');
			return false
		}

		if (adjust_type == 0 || adjust_type == '0') {
			toastr.error('Please select adjustment type ');
			return false
		}

		if (supplier_id == 0 || supplier_id == '0') {
			toastr.error('Please select Vendor');
			return false
		}
		loadReturnItems(central, adjust_type, 1, supplier_id);
	} else if (temp_id == 2) {
		console.log("Sub store condition executed");
		if (adjust_type == 0 || adjust_type == '0') {
			toastr.error('Please select adjustment type ');
			return false
		}

		if (substore == 0 || substore == '0') {
			toastr.error('Please select sub store');
			return false
		}

		loadReturnItems(substore, adjust_type, 2, 0)
	}

	else if (temp_id == 3) {

		console.log("Ambulance condition executed");

		var zoneId = $('#zone_id').val();
		var baselocationId = $('#baselocation_id').val();

		if (zoneId == 0 || zoneId == '0') {
			toastr.error('Please select zone ');
			return false
		}

		if (baselocationId == 0 || baselocationId == '0') {
			toastr.error('Please select base location ');
			return false
		}

		if (ambulance == 0 || ambulance == '0') {
			toastr.error('Please select ambulance ');
			return false
		}

		if (adjust_type == 0 || adjust_type == '0') {
			toastr.error('Please select adjustment type ');
			return false
		}
		loadReturnItems(substore, adjust_type, 2, 0)
	}

}

/**
 * @Author: Habiboon Patan
 * @Functionality: loadReturnItems
 * @Date: 27-04-2020
 */

// select * from sp_select_pms_returntype_drugs(99999,2,1,4)
// select * from sp_select_pms_returntype_drugs(99999,2,1,5)
//
//
// storeid integer,
// typeid integer,
// statusid integer,
// supplier_id integer)
function loadReturnItems(storeId, adjId, status_id, supplier_id) {

	$('#serviceRemainder').dataTable().fnClearTable();
	$('#serviceRemainder').dataTable().fnDestroy();

	try {
		var obj_Insert = {
			"storeId" : storeId,
			"adjId" : adjId,
			"typeId" : status_id,
			"suplierId" : supplier_id
		};
		var strUrl = ServiceProcreument.LOAD_RETURN_DRUGS;
		console.log("LOAD_RETURN_DRUGS::::: " + strUrl);
		console.log("LOAD_RETURN_DRUGS::::: " + JSON.stringify(obj_Insert));
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
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					toastr.info('No item for Adjustment Type');
				} else {
					var jsonArray = data.objControllerDto;
					if (jsonArray.length > 0) {
						loadReturnItemsList(jsonArray);
						dataTable();
					}
				}
			},
			error : function(err) {
				console.error('loadPurchagesOrderList error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in loadPurchagesOrderList()"
				+ JSON.stringify(err))
	}
}

var forid;

function loadReturnItemsList(strData) {
	$('#return_item_table').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			forid = strData[i].formId;
			var drug_id = strData[i].drugId;
			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].drugName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].drugBrand);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].drugShortUnicCode);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].batchNumber);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].expireDate);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].ddjustedStockQty);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[i].datInvoiceNo);
			$(tbleRow).append(tablcol8);

			var tablcol12 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode(" Add");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm');
			$(buttonTag).attr(
					'onclick',
					'get_RowData("' + drug_id + '","' + strData[i].drugName
							+ '","' + strData[i].drugBrand + '", "'
							+ strData[i].drugShortUnicCode + '", "'
							+ strData[i].batchNumber + '", "'
							+ strData[i].expireDate + '", "'
							+ strData[i].ddjustedStockQty + '", "'
							+ strData[i].datSerialId + '", "'
							+ strData[i].datInvoiceNo + '")');

		
			
			
			
			$(tablcol12).append(buttonTag);
			$(tablcol12).css('height', '36px');
			$(tbleRow).append(tablcol12);

			$("#return_item_table").append(tbleRow);
		}

	} catch (err) {
		console.log("return_item_table ERROR" + err);
	}
}

var drugid;
var bill_no;
var batch_no;
var expirdae;
var adjusted_stock;
var intDatSerialId;

function get_RowData(drug_id, drugName, drugBrand, drugShortUnicCode,
		batchNumber, expireDate, ddjustedStockQty, datSerialId, datInvoiceNo) {
	$('#return_item_list_table').empty();
	drugid = drug_id;
	bill_no = datInvoiceNo;
	expirdae = expireDate
	batch_no = batchNumber;
	intDatSerialId = datSerialId;
	adjusted_stock = ddjustedStockQty;

	var tbleRow = document.createElement("tr");

	var tablcol2 = document.createElement("td");
	$(tablcol2).html(drugName);
	$(tbleRow).append(tablcol2);

	var tablcol3 = document.createElement("td");
	$(tablcol3).html(drugBrand);
	$(tbleRow).append(tablcol3);

	var tablcol4 = document.createElement("td");
	$(tablcol4).html(drugShortUnicCode);
	$(tbleRow).append(tablcol4);

	var tablcol5 = document.createElement("td");
	$(tablcol5).html(batchNumber);
	$(tbleRow).append(tablcol5);

	var tablcol6 = document.createElement("td");
	$(tablcol6).html(expireDate);
	$(tbleRow).append(tablcol6);

	var tablcol7 = document.createElement("td");
	$(tablcol7).html(ddjustedStockQty);
	$(tbleRow).append(tablcol7);

	var tablcol8 = document.createElement("td");
	$(tablcol8).html(datInvoiceNo);
	$(tbleRow).append(tablcol8);

	$("#return_item_list_table").append(tbleRow);

}

function savebtnOnclick() {
	if (temp_id == 1) {
		saveReturnedDrugs();
	}
}

function saveReturnedDrugs() {

	// http://localhost:2000/scmservice/expiryDrugsController/api/version_1/updateAdjustmentStatus

	console.log('@@@@@@@@@@@@@@@@@@' + drugid);
	if (drugid == undefined || drugid == 'undefined') {
		toastr.error('Please add the return items');
		return false;
	}

	var central_store_id = $('#central_store_id').val();
	var adjustment_type_id = $('#adjustment_type_id').val();
	var vendor_id = $('#vendor_id').val();

	/*
	 * var obj_Insert = { "drugid" : drugid, "billNumbeer" : 12, "batchcod" :
	 * batch_no, "expdate" : expirdae, "returstc" : adjusted_stock, "formid" :
	 * forid, "supplerid" : vendor_id, "userid" : userId, "moduleid" : roleId,
	 * "roleid" : moduleId, "returnType" : adjustment_type_id, "storeid" :
	 * central_store_id };
	 */

	var storeId = $('#substore_id').val();
	var intTypeId;
	if (storeId == 99999) {

		intTypeId = 3;
	} else if (storeId >= 100000) {

		intTypeId = 1;
	} else {
		var intvehStatus = getVehicleMappingStatus(storeId);
		console.log('intvehStatus ------>' + intvehStatus);

		if (intvehStatus == 0) {
			intTypeId = 1;
		} else {
			intTypeId = 2;
		}
	}

	console.log("drugId::" + drugid);
	console.log("batch_no::" + batch_no);
	console.log("intDatSerialId::" + intDatSerialId);
	console.log("intTypeId::" + intTypeId);

	var obj_Insert = {
		"drug_idlist" : drugid,
		"drug_batchlist" : batch_no,
		"typeid" : intTypeId,
		"size" : "1",
		"intSerialId" : intDatSerialId
	}

	console.log("SAVE_RETURN_DRUGS::::: " + JSON.stringify(obj_Insert));
	// var strUrl = ServiceProcreument.SAVE_RETURN_DRUGS;

	var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/api/version_1/updateAdjustmentStatus"
	console.log("SAVE_RETURN_DRUGS::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('Success' + JSON.stringify(data));
			if (data.responseCode === "200" || data.responseCode == "200") {
				$('#return_item_list_table').empty();
				toastr.info('Successfully return item saved');

			} else {
				console.log("Error in saveReturnedDrugs");
			}

		}

	});

}

function dataTable() {

	$('#serviceRemainder').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [

				{
					customize : function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');

						$(win.document.body).find('table').addClass('compact')
								.css('font-size', 'inherit');
					}
				} ]

			});

}

function getVehicleMappingStatus(storeId) {

	console.log('getVehicleMappingStatus function executed::' + storeId);
	var intvehStatus;
	var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/api/version_1/getVehicleMappingStatus";
	var obj_Insert = {
		"storeTypeId" : storeId
	}
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('Success' + JSON.stringify(data));
			if (data.responseCode === "200" || data.responseCode == "200") {
				return intvehStatus = data.rtnReponseCount;
			} else {
				console.log("Something went wrong");
			}

		}

	});

	return intvehStatus
}