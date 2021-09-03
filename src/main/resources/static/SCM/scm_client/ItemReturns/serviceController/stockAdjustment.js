var userId;
var roleId;
var moduleId;
$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
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
 
	$('#serviceRemainder').dataTable().fnClearTable();
	$('#serviceRemainder').dataTable().fnDestroy();
	
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
		if (adjustment_type == "0" || adjustment_type == 0) {
			toastr.error('Please select Adjustment Type');
			return false;
		}
		if (store_id == "0" || store_id == 0) {
			toastr.error('Please select From Store Ambulance ');
			return false;

		}
		
		if (unicode_id == "" || unicode_id == '') {
			if (item_name == '' || item_name == "") {
				if (brand_id == "0" || brand_id == 0) {
					if (form_id == "0" || form_id == 0) {
						if (manufacture_company == "0"
								|| manufacture_company == 0) {
							toastr.error('Please provide atleast one input');
							return false;
						}
					}
				}
			}
		}

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
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					toastr.info('This item is not having stock in Store/Ambulance');
				} else {
					var jsonArray = data.objAdjustmentSearchControllerDTO;
					if (jsonArray.length > 0) {
						loadSdjustableItems(jsonArray);
						dataTable();
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
							+ '","' + strData[i].unit_cost + '", "'
							+ strData[i].invoice_number + '", "'
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
var unit_cost;

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
	unit_cost = unit_cost
	var tbleRow = document.createElement("tr");

	var tablcol1 = document.createElement("td");
	$(tablcol1).html("1");
	$(tbleRow).append(tablcol1);

	// var drugidList = strData[i].drugidlist;

	var tablcol2 = document.createElement("td");
	$(tablcol2).html(drug_name);
	$(tbleRow).append(tablcol2);

	var tablcol3 = document.createElement("td");
	$(tablcol3).html(brand_name);
	$(tbleRow).append(tablcol3);

	var tablcol4 = document.createElement("td");
	$(tablcol4).html(unicode);
	$(tbleRow).append(tablcol4);

	var tablcol5 = document.createElement("td");
	$(tablcol5).html(form_type);
	$(tbleRow).append(tablcol5);

	var tablcol61 = document.createElement("td");
	$(tablcol61).html(batch_number);
	$(tbleRow).append(tablcol61);

	var tablcol7 = document.createElement("td");
	$(tablcol7).html(available_stock);
	$(tbleRow).append(tablcol7);

	var tablcol8 = document.createElement("td");
	$(tablcol8).html(expire_date);
	$(tbleRow).append(tablcol8);

	var tablcol9 = document.createElement("td");
	$(tablcol9).html(mrp);
	$(tbleRow).append(tablcol9);

	var tablcol10 = document.createElement("td");
	$(tablcol10).html(unit_cost);
	$(tbleRow).append(tablcol10);

	var tablcol11 = document.createElement("td");
	$(tablcol11)
			.html(
					'<input type="text"  id="amount_id" name="textbox" class="form-control">');
	$(tbleRow).append(tablcol11);

	// var tablcol12 = document.createElement("td");
	// $(tablcol12).html(
	// '<input type="text" id="amount_id' + 0
	// + '" class="form-control">');
	// $(tbleRow).append(tablcol12);

	var tablcol13 = document.createElement("td");
	$(tablcol13).html(invoice_number);
	$(tbleRow).append(tablcol13);

	$("#viewTable_id").append(tbleRow);

}

function resetButtonOnclick() {
	$('#item_name').val('');
	$('#unicode_id').val('');
	$('#description_id').val('');
	$('#adjustment_type').val('0').trigger('chosen:updated');
	$('#store_id').val('0').trigger('chosen:updated');
	$('#user_id').val('0').trigger('chosen:updated');
	$('#form_id').val('0').trigger('chosen:updated');
	$('#brand_id').val('0').trigger('chosen:updated');
	$('#manufacture_company').val('0').trigger('chosen:updated');

}

function saveButtonOnclick() {
	saveAdjustedData();

}

function saveAdjustedData() {
	var adjustment_type = $('#adjustment_type').val();
	var store_id = $('#store_id').val();
	var user_id = $('#user_id').val();
	var description_id = $('#description_id').val();
	var availableStock = $('#amount_id').val();

	if (adjustment_type === "0" || adjustment_type === 0) {

		toastr.error('Select Stock Adjustment Type');
		return false;

	}
	if (store_id === "0" || store_id === 0) {

		toastr.error('Select From Store Ambulance');
		return false;

	}
	if (user_id === "0" || user_id === 0) {
		toastr.error('Plase Select Autherised');
		return false;

	}
	if (description_id === " " || description_id === '') {

		toastr.error('Provide description');
		return false;
	}
	if (availableStock === "" || availableStock === '') {
		toastr.error('Please enter Adjust Block');
		return false;

	}
	
	var intTypeId;
	var fromStore;
	if (store_id == 99999) {//----> From Central Stroes
         fromStore =store_id //----> From Dispences Counters
         alert('==99999');
         intTypeId = 1;
     } else if(store_id>=100000) {
    	 alert('>=100000');
         fromStore = store_id //----> From Sub Store
         intTypeId = 2;//---->from sub store type
     }else  {
    	 alert('else '+fromStore);
         fromStore = store_id;
         intTypeId = 0;
     }
	
	var obj_Insert = {
		"bufStockRefId" : stock_reference,
		"drugId" : drugid,
		"drugBatchs" : batchNumber,
		"drugQtys" : availableStock,
		"storeId" : fromStore,
		"adj_type_id" : adjustment_type,
		"emp_id" : user_id,
		"desc" : description_id,
		"count" : 1,
		"user_id" : userId,
		"module_id" : roleId,
		"role_id" : moduleId,
		"expDate" : expireDate,
		"typeId" : intTypeId,
		"inviceNo" : invoiceNo
	};
	var strUrl = ServiceProcreument.SAVE_ADJUSTED_STOCK_DATA;
	console.log("SAVE_ADJUSTED_STOCK_DATA::::: " + strUrl);
	console.log("SAVE_ADJUSTED_STOCK_DATA::::: " + JSON.stringify(obj_Insert));

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
				updateStockQuantity();

			}

		}

	});
}



function updateStockQuantity() {
	var store_id = $('#store_id').val();

	var obj_Insert = {
		"fromStoreId" : store_id,
		"drugId" : drugid,
		"drugQtys" : availableStock,
		"drugBatchs" : batchNumber,
		"size" : 1,
		"increaseOrDecrease" : 2,
		"user_id" : 1,
		"module_id" : 1,
		"role_id" : 1,
		"bufStockRefId" : stock_reference
	};
	var strUrl = ServiceProcreument.UPDATE_STOCK_QUANTITY;
	console.log("UPDATE_STOCK_QUANTITY::::: " + strUrl);
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
					if (data.responseCode === 200) {
						toastr.success('Item available quantity uploaded successfully');

						$('#viewTable_id').empty();

					}

				}

			});
}
// Added By Ranjeet kr.
function dataTable() {
	$('#serviceRemainder').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						/*{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'ExampleFile'
						},
						{
							extend : 'pdf',
							title : 'ExampleFile'
						},*/
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