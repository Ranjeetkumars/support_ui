$(document).ready(function() {
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
	temp_id = 2;

	$('#return_item_table').empty();
	$('#return_item_list_table').empty();
	$('#central_store').hide();
	$('#adjustment_type').show();
	$('#vendor').hide();
	$('#substore').show();
	$('#zone').hide();
	$('#baselocation').hide();
	$('#ambulance').hide();
	getAdjustmentType();
	loadSubstore();
}

function ambulanceonclick() {
	temp_id = 3;
	$('#return_item_table').empty();
	$('#return_item_list_table').empty();
	$('#central_store').hide();
	$('#adjustment_type').show();
	$('#vendor').hide();
	$('#substore').hide();
	$('#zone').show();
	$('#baselocation').show();
	$('#ambulance').show();
	getAdjustmentType();
	getZones();
}

function searchItemsOnclick() {

	alert("temp_id: " + temp_id);
	var adjust_type = $('#adjustment_type_id').val();
	var substore = $('#substore_id').val();
	var ambulance = $('#ambulance_id').val();
	var central = $('#central_store_id').val();
	var supplier_id = $('#vendor_id').val();
	// alert("central: " + central);
	// alert("adjust_type: " + adjust_type);
	// alert("supplier_id: " + supplier_id);
	if (temp_id == 1) {
		loadReturnItems(central, adjust_type, 1, supplier_id);
	} else if (temp_id == 2) {
		loadReturnItems(substore, adjust_type, 2, 0)
	} else if (temp_id == 3) {
		loadReturnItems(ambulance, adjust_type, 0, 0)
	}

}

/**
 * @Author: Habiboon Patan
 * @Functionality: loadReturnItems
 * @Date: 27-04-2020
 */
function loadReturnItems(storeId, adjId, status_id, supplier_id) {

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
			// var data=JSON.stringify(obj_Insert);
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					// $(divTag).html("No data available....");
					$('#return_item_table').append(divTag);
				} else {
					var jsonArray = data.objControllerDto;
					if (jsonArray.length > 0) {
						loadReturnItemsList(jsonArray);
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
function get_RowData(drug_id, drugName, drugBrand, drugShortUnicCode,
		batchNumber, expireDate, ddjustedStockQty, datInvoiceNo) {
	$('#return_item_list_table').empty();
	drugid=drug_id;
	bill_no = datInvoiceNo;
	expirdae = expireDate
	batch_no = batchNumber;
	
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

function savebtnOnclick(){
	if(temp_id == 1){
		saveReturnedDrugs();
	}
}



function saveReturnedDrugs() {
var central_store_id = $('#central_store_id').val();
var adjustment_type_id = $('#adjustment_type_id').val();
var vendor_id = $('#vendor_id').val();

	var obj_Insert = {
			
				 "drugid":drugid,
				 "billNumbeer":12,
				 "batchcod":batch_no,
				 "expdate":expirdae,
				 "returstc":adjusted_stock,
				 "formid":forid,
				 "supplerid":vendor_id,
				 "userid":1,
				 "moduleid":1,
				 "roleid":1,
				 "returnType":adjustment_type_id,
				 "storeid":central_store_id
				
	};
	console.log("SAVE_RETURN_DRUGS::::: " + JSON.stringify(obj_Insert));
	var strUrl = ServiceProcreument.SAVE_RETURN_DRUGS;
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
			
		}

	});
	
}
