$(document).ready(function() {
	try {

		getAdjustmentType();
		getStores();
		getUsers();
		getBrands();
		getForms();
		getCompanies();
		
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});


function getAdjustmentType() {
	try {
		$('#adjustment_type').empty();
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
							var selectfirst = "<option value='0'>Select Brand</option>";
							$('#adjustment_type').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.adjustmentId + ">"
										+ resData.adjustmentDesc + "</option>";
								$(module).appendTo('#adjustment_type');

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
	$('#adjustment_type').trigger("chosen:updated");
	$('#adjustment_type').chosen();

}

function getStores() {
	try {
		$('#store_id').empty();
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
							$('#store_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.countryId + ">"
										+ resData.countryName + "</option>";
								$(module).appendTo('#store_id');

							});
						}
					},
					error : function(err) {
						console.error("Error in GET_MANUFACTURE_FORM"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in GET_MANUFACTURE_FORM()' + err);
	}
	$('#store_id').trigger("chosen:updated");
	$('#store_id').chosen();

}

function getUsers() {
	try {
		$('#user_id').empty();
		var strUrl = ServiceProcreument.LOAD_USERS;
		console.log("LOAD_USERS::::: " + strUrl);
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
							var jsonArray = data.objGetUserDropdownControllerDTO;
							var selectfirst = "<option value='0'>Select Brand</option>";
							$('#user_id').append(selectfirst);
							$.each(jsonArray,
									function(i, resData) {
										var module = "<option value="
												+ resData.user_id + ">"
												+ resData.user_name
												+ "</option>";
										$(module).appendTo('#user_id');

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
	$('#user_id').trigger("chosen:updated");
	$('#user_id').chosen();

}

function getBrands() {
	try {
		$('#brand_id').empty();
		var strUrl = ServiceProcreument.LOAD_BRABDS_DROPDOWN;
		console.log("LOAD_BRABDS_DROPDOWN::::: " + strUrl);
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
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Brand</option>";
							$('#brand_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.brand_id + ">"
										+ resData.drug_brand + "</option>";
								$(module).appendTo('#brand_id');

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
	$('#brand_id').trigger("chosen:updated");
	$('#brand_id').chosen();

}

function getForms() {
	try {
		$('#form_id').empty();
		var strUrl = ServiceProcreument.LOAD_FORM_DROPDOWN;
		console.log("LOAD_FORM_DROPDOWN::::: " + strUrl);
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
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Form</option>";
							$('#form_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value=" + resData.from_id
										+ ">" + resData.formType + "</option>";
								$(module).appendTo('#form_id');

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
	$('#form_id').trigger("chosen:updated");
	$('#form_id').chosen();

}

function getCompanies() {
	try {
		$('#manufacture_company').empty();
		var strUrl = ServiceProcreument.LOAD_MANUFACTURE_COMPANIES_DROPDOWN;
		console.log("LOAD_MANUFACTURE_COMPANIES_DROPDOWN::::: " + strUrl);
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
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Form</option>";
							$('#manufacture_company').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.manufactureId + ">"
										+ resData.companyName + "</option>";
								$(module).appendTo('#manufacture_company');

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
	$('#manufacture_company').trigger("chosen:updated");
	$('#manufacture_company').chosen();

}

function searchOnclick() {
	getAdjustableItems();
}

/**
 * @Author: Habiboon Patan
 * @Functionality: getAdjustableItems
 * @Date: 23-04-2020
 */
function getAdjustableItems() {
	try {
		var adjustment_type = $('#adjustment_type').val();
		var store_id = $('#store_id').val();
		var user_id = $('#user_id').val();
		var description_id = $('#description_id').val();
		var unicode_id = $('#unicode_id').val();
		var item_name = $('#item_name').val();
		var brand_id = $('#brand_id').val();
		var form_id = $('#form_id').val();
		var manufacture_company = $('#manufacture_company').val();
		if (item_name === '' || item_name === "") {
			item_name = "¥";
		}
		if (unicode_id === '' || unicode_id == "") {
			unicode_id = "¥";
		}
		var obj_Insert = {
			"drug_name" : item_name,
			"brand_id" : brand_id,
			"form_id" : form_id,
			"manufacture_id" : manufacture_company,
			"unicode" : unicode_id,
			"system_id" : "0",
			"generic_group_id" : "0",
			"generic_molecules_id" : "0",
			"counter_id" : store_id,
			"type_id" : adjustment_type
		};
		var strUrl = ServiceProcreument.STOCK_ADJUSTMENT_SEARCH;
		console.log("STOCK_ADJUSTMENT_SEARCH::::: " + strUrl);
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
					$('#adjustable_item_list').append(divTag);
				} else {
					var jsonArray = data.objAdjustmentSearchControllerDTO;
					if (jsonArray.length > 0) {
						loadSdjustableItems(jsonArray);
					}
				}
			},
			error : function(err) {
				console.error('indentreitemsearchTable error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in indentreitemsearchTable()"
				+ JSON.stringify(err))
	}
}

function loadSdjustableItems(strData) {
	$('#adjustable_item_list').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			// var drugidList = strData[i].drugidlist;

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].drug_name);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].brand_name);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].unicode);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].form_type);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].strength_type);
			$(tbleRow).append(tablcol6);

			var tablcol61 = document.createElement("td");
			$(tablcol61).html(strData[i].batch_number);
			$(tbleRow).append(tablcol61);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].available_stock);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[i].expire_date);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[i].mrp);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).html(strData[i].unit_cost);
			$(tbleRow).append(tablcol10);

			var tablcol13 = document.createElement("td");
			$(tablcol13).html(strData[i].invoice_number);
			$(tbleRow).append(tablcol13);

			var tablcol14 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode(" Add");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
			$(buttonTag).attr(
					'onclick',
					'get_RowData("' + strData[i].drug_name + '","'
							+ strData[i].brand_name + '", "'
							+ strData[i].unicode + '", "'
							+ strData[i].form_type + '", "'
							+ strData[i].strength_type + '", "'
							+ strData[i].batch_number + '", "'
							+ strData[i].available_stock + '", "'
							+ strData[i].expire_date + '","' + strData[i].mrp
							+ '","' + strData[i].unit_cost + '","'
							+ strData[i].invoice_number + '","'
							+ strData[i].drug_id + '", "'
							+ strData[i].stock_ref + '")');

			$(tablcol14).append(buttonTag);
			$(tablcol14).css('height', '36px');
			$(tbleRow).append(tablcol14);

			$("#adjustable_item_list").append(tbleRow);
		}

	} catch (err) {
		console.log("adjustable_item_list ERROR" + err);
	}
}

var stock_reference;
var drugid;
var batchNumber;
var availableStock;
var invoiceNo;
var expireDate;

function get_RowData(drug_name, brand_name, unicode, form_type, strength_type,
		batch_number, available_stock, expire_date, mrp, unit_cost,
		invoice_number, drug_id, stock_ref) {
	$('#viewTable_id').empty();

	stock_reference = stock_ref;
	drugid = drug_id;
	batchNumber = batch_number;
	availableStock = available_stock;
	invoiceNo = invoice_number;
	expireDate = expire_date;
	var tbleRow = document.createElement("tr");

	var tablcol1 = document.createElement("td");
	$(tablcol1).html("1");
	$(tbleRow).append(tablcol1);

	// var drugidList = strData[i].drugidlist;

	var tablcol2 = document.createElement("td");
	$(tablcol2).html(strData[i].drug_name);
	$(tbleRow).append(tablcol2);

	var tablcol3 = document.createElement("td");
	$(tablcol3).html(strData[i].brand_name);
	$(tbleRow).append(tablcol3);

	var tablcol4 = document.createElement("td");
	$(tablcol4).html(strData[i].unicode);
	$(tbleRow).append(tablcol4);

	var tablcol5 = document.createElement("td");
	$(tablcol5).html(strData[i].form_type);
	$(tbleRow).append(tablcol5);

	var tablcol61 = document.createElement("td");
	$(tablcol61).html(strData[i].batch_number);
	$(tbleRow).append(tablcol61);

	var tablcol7 = document.createElement("td");
	$(tablcol7).html(strData[i].available_stock);
	$(tbleRow).append(tablcol7);

	var tablcol8 = document.createElement("td");
	$(tablcol8).html(strData[i].expire_date);
	$(tbleRow).append(tablcol8);

	var tablcol9 = document.createElement("td");
	$(tablcol9).html(strData[i].mrp);
	$(tbleRow).append(tablcol9);

	var tablcol10 = document.createElement("td");
	$(tablcol10).html(strData[i].unit_cost);
	$(tbleRow).append(tablcol10);

	var tablcol11 = document.createElement("td");
	$(tablcol11).html("ADJUST STOCK");
	$(tbleRow).append(tablcol11);

	var tablcol12 = document.createElement("td");
	$(tablcol12).html("AMOUNT");
	$(tbleRow).append(tablcol12);

	var tablcol13 = document.createElement("td");
	$(tablcol13).html(strData[i].invoice_number);
	$(tbleRow).append(tablcol13);

	$("#viewTable_id").append(tbleRow);

}

function saveButtonOnclick() {
	saveAdjustedData();
	updateStockQuantity();
}

function saveAdjustedData() {

	var adjustment_type = $('#adjustment_type').val();
	var store_id = $('#store_id').val();
	var user_id = $('#user_id').val();
	var description_id = $('#description_id').val();
	if (adjustment_type === "0" || adjustment_type === 0) {
		alert("Selec Adjustment Type");
	}
	if (store_id === "0" || store_id === 0) {
		alert("Selec store Id");
	}
	if (user_id === "0" || user_id === 0) {
		alert("Selec user Id");
	}
	if (description_id === " " || description_id === 0) {
		alert("Selec description Id");
	}
	var obj_Insert = {
		"bufStockRefId" : stock_reference,
		"drugId" : drugid,
		"drugBatchs" : batchNumber,
		"drugQtys" : availableStock,
		"storeId" : store_id,
		"adj_type_id" : adjustment_type,
		"emp_id" : user_id,
		"desc" : description_id,
		"count" : 1,
		"user_id" : 1,
		"module_id" : 1,
		"role_id" : 1,
		"expDate" : expireDate,
		"typeId" : 1,
		"inviceNo" : invoiceNo
	};
	var strUrl = ServiceProcreument.SAVE_ADJUSTED_STOCK_DATA;
	console.log("SAVE_ADJUSTED_STOCK_DATA::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,

		success : function(data) {
			if (data.responseCode === 200) {

			}

		}

	});
}

function updateStockQuantity() {

	var obj_Insert = {
		"fromStoreId" : store_id,
		"drugId" : drugid,
		"drugQtys" : availableStock,
		"drugBatchs" : batchNumber,
		"size" : 1,
		"increaseOrDecrease" : 1,
		"user_id" : 1,
		"module_id" : 1,
		"role_id" : 1,
		"bufStockRefId" : stock_reference
	};
	var strUrl = ServiceProcreument.UPDATE_STOCK_QUANTITY;
	console.log("UPDATE_STOCK_QUANTITY::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,

		success : function(data) {
			if (data.responseCode === 200) {

			}

		}

	});
}
