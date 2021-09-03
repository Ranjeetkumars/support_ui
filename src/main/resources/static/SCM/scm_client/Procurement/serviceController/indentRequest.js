$(document).ready(function() {

	$('#ApprovalViewId').attr("disabled", true);

	getBrandNames();
	getAllPurchaseOrderList();
	getCompanies();
	getManufactureForm();

});

// Added By Ranjeet Kr.
function getNewProcessInventoryList(serialIds) {

	var rtnJsonObj;

	var obj_Insert = {
		"serialId" : serialIds
	};
	var strUrl = ServiceProcreument.ProcessNewInventoryByIds;
	console.log("GET_PURCHASE_ORDER_LIST::::: " + strUrl);
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
		
			if (200 !== responsecode||data.status === "NO_DATA_FOUND") {

			} else {
				var arrData = data.objControllerDto;

				rtnJsonObj = arrData;

				if (arrData.length > 0) {
					return rtnJsonObj;
				}
			}
		},
		error : function(err) {
			console.error(' error: ' + JSON.stringify(err));
		}
	});

	return rtnJsonObj;
}


/**
 * @Author: Habiboon Patan
 * @Functionality: getAllPurchaseOrderList
 * @Date: 11-04-2020
 */
function getAllPurchaseOrderList() {
	var obj_Insert = {
		genericName : null,
		brandId : 0,
		formId : 0,
		manufactureId : 0,
		unicode : null
	};
	var strUrl = ServiceProcreument.GET_PURCHASE_ORDER_LIST;
	console.log("GET_PURCHASE_ORDER_LIST::::: " + strUrl);
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(obj_Insert),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				// var data=JSON.stringify(obj_Insert);
				success : function(data) {
					console.log('===========================>>'
							+ JSON.stringify(data));
					var responsecode = data.responseCode;

					if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
						// var divTag = document.createElement("h2");
						// $(divTag).css("text-align", "center");
						// $(divTag).html("No data available....");
						// $('#dynamicTable').append(divTag);
						var serialIds = localStorage.getItem("serialIds");
					
						if (serialIds == undefined || serialIds == null
									|| serialIds == 'null' || serialIds == ""
									|| serialIds == ''
									|| serialIds == 'undefined') {
					
								}
								else {
									
					    rtnJson2 = getNewProcessInventoryList(serialIds);
								
								var finalObj = rtnJson2;
								loadList(finalObj);
								dataTable2();
								}
					} else {
						var jsonArray = data.placingOrdersForPurchaseControllerDTO;
						console.log('jsonArray:::--------------------->:'
								+ JSON.stringify(jsonArray));
						if (jsonArray.length > 0) {

							// Added By Ranjeet kr.
							var rtnJson2;
							var rtnJson1 = jsonArray;
							var serialIds = localStorage.getItem("serialIds");
							console.log(' serialIds values::' + serialIds);
							if (serialIds == undefined || serialIds == null
									|| serialIds == 'null' || serialIds == ""
									|| serialIds == ''
									|| serialIds == 'undefined') {

								console.log('second json is not  returing::'
										+ rtnJson2);
								loadList(jsonArray);
								dataTable2();
							} else {

								rtnJson2 = getNewProcessInventoryList(serialIds);
								console.log('second json is returing::'
										+ JSON.stringify(rtnJson2));
								console.log('rtnJson1::'
										+ JSON.stringify(rtnJson1));
								var finalObj = rtnJson1.concat(rtnJson2);
								loadList(finalObj);
								dataTable2();
							}

						}
					}
				},
				error : function(err) {
					console.error('loadPurchagesOrderList error: '
							+ JSON.stringify(err));
				}
			});
}

var x = 0;
function loadList(strData) {




$('#dynamicTable').empty();

	try {
		var sum = 0;
		for (x = 0; x < strData.length; x++) {
			var index = x + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);

			$(tbleRow).append(tablcol1);
			var drugidList = strData[x].drugidList;
			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[x].genericName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[x].db_drug_brand_lang1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[x].unicode);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[x].df_form_type);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[x].strenghtlist);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[x].supplierName);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[x].dmr_actuval_stock);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[x].drr_actuval_stock);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).html(strData[x].total_stock);
			$(tbleRow).append(tablcol10);

			var tblCol11 = document.createElement("td");
			$(tblCol11).html(
					'<input type="number"  id="description_id' + x
							+ '" class="form-control">');
			$(tbleRow).append(tblCol11);

			var tablcol12 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode("Add");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm ');
			$(buttonTag).attr(
					'onclick',
					'get_RowData("' + strData[x].genericName + '","'
							+ strData[x].db_drug_brand_lang1 + '", "'
							+ strData[x].unicode + '", "'
							+ strData[x].df_form_type + '", "'
							+ strData[x].strenghtlist + '", "'
							+ strData[x].supplierName + '", "'
							+ strData[x].dmr_actuval_stock + '", "'
							+ strData[x].drr_actuval_stock + '",  "'
							+ strData[x].total_stock + '", "' + x + '", "'
							+ strData[x].drugidList + '")');

			$(tablcol12).append(buttonTag);
			$(tablcol12).css('height', '36px');
			$(tbleRow).append(tablcol12);
			$("#dynamicTable").append(tbleRow);
		}
		// dataTable();

	} catch (err) {
		console.log("get_All_Sites_Details_DOM ERROR" + err);
	}

}

function get_RowData(genericName, db_drug_brand_lang1, unicode, df_form_type,
		strenghtlist, supplierName, dmr_actuval_stock, drr_actuval_stock,
		total_stock, position, drugidList) {
	$("#indentrequestTable").empty();

	var orderQuantity = $('#description_id' + position + '').val();

	if (orderQuantity == null || orderQuantity == "" || orderQuantity === '') {
		toastr.error("Enter Ordered Quantity");
	} else {
		var table = [];
		table.push({
			'genericName' : genericName,
			'db_drug_brand_lang1' : db_drug_brand_lang1,
			'unicode' : unicode,
			'df_form_type' : df_form_type,
			'strenghtlist' : strenghtlist,
			'supplierName' : supplierName,
			'dmr_actuval_stock' : dmr_actuval_stock,
			'drr_actuval_stock' : drr_actuval_stock,
			'total_stock' : total_stock,
			'orderQuantity' : orderQuantity,
			'drugidList' : drugidList

		});
	}

	setDataToTable(table);
}
var orderquantity;
var countofrow = 0;
function setDataToTable(strData) {

	countofrow = countofrow + 1;
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			// var tablcol120 = document.createElement("td");
			// $(tablcol120)
			// .html(
			// + strData[i].drugidList
			// + ' name="case" )" ><span class="checkmark"> </label>');

			// $(tbleRow).append(tablcol120);
			// $(tablcol120).attr('onclick', 'onclickCheckbox()');

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].drugidList
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol1);
			$('#selectall').val(strData[i].drugidList);
			$(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].genericName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].db_drug_brand_lang1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].unicode);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].df_form_type);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].strenghtlist);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].supplierName);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[i].dmr_actuval_stock);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[i].drr_actuval_stock);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).html(strData[i].total_stock);
			$(tbleRow).append(tablcol10);

			var tablcol11 = document.createElement("td");
			$(tablcol11).html(strData[i].orderQuantity);
			orderquantity = strData[i].orderQuantity;
			$(tbleRow).append(tablcol11);

			$("#indentrequestTable").append(tbleRow);
		}
		// dataTableForChildTable();

	} catch (err) {
		console.log("indentrequestTableERROR" + err);
	}
}
// function dataTableForChildTable(){
// $('#indentrequest').DataTable({// Data table
// "aLengthMenu": [[05, 10, 15, 25, -1], [05, 10, 15, 25, "All"]],
// pageLength: 5,
// responsive: true,
// dom: '<"html5buttons"B>lTfgitp',
// buttons: [
// {extend: 'copy'},
// {extend: 'csv'},
// {extend: 'excel', title: 'ExampleFile'},
// {extend: 'pdf', title: 'ExampleFile'},
// {extend: 'print',
// customize: function(win) {
// $(win.document.body).addClass('white-bg');
// $(win.document.body).css('font-size', '10px');
// $(win.document.body).find('table')
// .addClass('compact')
// .css('font-size', 'inherit');
// }
// }
// ]

// });
// }

// function onclickCheckbox() {
// /alert("onclickCheckbox");

// var arrSelectedData = [];
// var count = 0;
// $("input:checkbox[name=case]:checked").each(function() {
// alert("dataaaaaaaaaaaaaaaaaaaacheckbox::::::::::"+$(this).val());
// arrSelectedData.push($(this).val());
// count++;
// $('#reg_no').val(arrSelectedData);
// });

// }

function onclickCheckbox() {
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		arrSelectedData.push($(this).val());
		count++;

		$('#reg_no').val(arrSelectedData);
	});
	if ($(".case").length === $(".case:checked").length) {
		$("#selectall").prop("checked", true);
	} else {
		$("#selectall").removeAttr("checked");
	}

}

function deleteAllrowData() {
	countofrow = 0;
}
function sendToApproval() {
	// Added By Ranjeet
	var count = $("#indentrequest").dataTable().fnSettings().aoData.length;

	if (countofrow == 0) {
		toastr.error('Please add purchase order items to tables');
		return false;
	}
	$('#ApprovalViewId').removeAttr("disabled");

	var druglist = $('#reg_no').val();
	var indentId = saveIndentData();
	if (druglist == "") {

		return false;

	} else {

		var quantity = orderquantity;
		// var drugId = drlistCount[i];
		// var count = drlistCountList.length;
		var output = savePurchaseOrderItemQuantity(indentId, quantity);

	}

}

function saveIndentData() {
	var indentId = 01;
	var indent_number = indentIdGeneration();
	var date = moment(); // Get the current date
	var strDate = date.format("YYYYMMDD");
	var indentType = "Ind" + "_" + strDate + "_" + indent_number;
	$("#indent_number_id").val(indentType);
	var approvalId = 1;
	indentId = saveIndentItemDetails(indentType, approvalId);
	if (indentId === 0) {
		indentId = 11;
	}
	return indentId;
}

function saveIndentItemDetails(indentType, approvalId) {
	var indentId;

	var obj_Insert = {
		"indentidNumber" : indentType,
		"moduleId" : 1,
		"roleId" : 1,
		"createById" : 1,
		"approvalId" : approvalId
	};
	var strUrl = ServiceProcreument.SAVE_INDENT_ITEM_DETAILS;
	console.log("SAVE_INDENT_ITEM_DETAILS::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,

		success : function(data) {
			indentId = data.rtnReponseCount;

		}

	});
	return indentId;
}
function indentIdGeneration() {
	var indent_number;
	try {
		var strUrl = ServiceProcreument.GET_GENERATE_INDENT_NUMBER;
		console.log("GET_GENERATE_INDENT_NUMBER:::::: " + strUrl);

		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,

			success : function(data) {

				indent_number = data.rtnReponseCount;
			},
			error : function(err) {
				console.error("Error in indentIdGeneration"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in indentIdGeneration()' + err);
	}
	return indent_number;
}

function savePurchaseOrderItemQuantity(indentId, quantity) {

	var updateResult;

	var druglist = $('#reg_no').val();
	var drlistCountList = druglist.split(",");

	var obj_Insert = {
		"drugidList" : druglist, // drlistCountList,
		"quantity" : quantity,
		"count" : drlistCountList.length,
		"createById" : 1,
		"roleId" : 1,
		"moduleId" : 1,
		"indentidlist" : indentId
	};
	console.log("SAVE_PURCHASE_ORDER_ITEM_QUANTITY::::: "
			+ JSON.stringify(obj_Insert));
	var strUrl = ServiceProcreument.SAVE_PURCHASE_ORDER_ITEM_QUANTITY;
	console.log("SAVE_PURCHASE_ORDER_ITEM_QUANTITY::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,

		success : function(data) {
			var jso = JSON.stringify(data);
			updateResult = data.rtnReponseCount;

			//Send to approval successfully
			if(updateResult==1 || updateResult=='1'||updateResult==0||updateResult=='0'){
				getAllPurchaseOrderList();

				toastr.success('Send to approval successfully');
				
				var table = $('#indentrequest').DataTable();
				// clear datatable
				table.clear().draw();
				// destroy datatable
				table.destroy();
			} else {
				toastr.warning('something went wrong');
			}
		}

	});
	return updateResult;
}

function getBrandNames() {

	try {
		$('#brandNameId').empty();
		var strUrl = ServiceProcreument.GET_BRAND_NAMES;
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
							var jsonArray = data.objBrandNameControllerDTO;
							var selectfirst = "<option value='0'>Select Brand</option>";
							$('#brandNameId').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.brand_id + ">"
										+ resData.brand_name + "</option>";
								$(module).appendTo('#brandNameId');

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
	$('brandNameId').trigger("chosen:updated");
	$('#brandNameId').chosen();

}

function getManufactureForm() {
	try {
		$('#material_form_id').empty();
		var strUrl = ServiceProcreument.GET_MANUFACTURE_FORM;
		console.log("GET_MANUFACTURE_FORM::::: " + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				console.log("responsecode " + data.responseCode);
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objManufactureFormControllerDTO;
					var selectfirst = "<option value='0'>Select Form</option>";
					$('#material_form_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var module = "<option value=" + resData.form_id + ">"
								+ resData.form_name + "</option>";
						$(module).appendTo('#material_form_id');

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
	$('material_form_id').trigger("chosen:updated");
	$('#material_form_id').chosen();

}

function getCompanies() {
	try {
		$('#manufacture_id').empty();
		var strUrl = ServiceProcreument.GET_MANUFACTURE_COMPANY;
		console.log("GET_MANUFACTURE_COMPANY::::: " + strUrl);
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
							var jsonArray = data.objManufactureCompanyControllerDTO;
							var selectfirst = "<option value='0'>Select Brand</option>";
							$('#manufacture_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var module = "<option value="
										+ resData.manufacture_company_id + ">"
										+ resData.manufacture_company_name
										+ "</option>";
								$(module).appendTo('#manufacture_id');

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
	$('manufacture_id').trigger("chosen:updated");
	$('#manufacture_id').chosen();

}
function resetAllData() {

	$('#ShortCodId').val("");
	$('#ItemNameid').val("");
	$('#brandNameId').val('0').trigger('chosen:updated');
	$('#material_form_id').val('0').trigger('chosen:updated');
	$('#manufacture_id').val('0').trigger('chosen:updated');
}

/**
 * @Author: Habiboon Patan
 * @Functionality: getPurchasedOrderDruglist
 * @Date: 14-04-2020
 */
function getPurchasedOrderDruglist() {
	$('#indentreitemsearch').DataTable().clear().destroy();
	var shortCode = $('#ShortCodId').val();
	var ItemName = $('#ItemNameid').val();
	var brandName = $('#brandNameId').val();
	var material_form = $('#material_form_id').val();
	var manufacture = $('#manufacture_id').val();

	/*
	 * if (shortCode == "" || shortCode == '') { if (ItemName == '' || ItemName ==
	 * "") { if (brandName == "0" || brandName == 0) { if (material_form == "0" ||
	 * material_form == 0) { if (manufacture == "0" || manufacture == 0) {
	 * toastr.error('Please enter any field'); return false; } } } } }
	 */

	if (shortCode == "" && ItemName == "" && brandName == 0
			&& material_form == 0 && manufacture == 0) {
		toastr.error('Please select any one field');
		return false;
	}
	if (ItemName == "") {
		ItemName = "¥";
	}
	if (shortCode == "") {
		shortCode = '¥';
	}
	if (brandName == 0) {
		brandName = 0;
	}
	if (material_form == 0) {
		material_form = 0;
	}
	if (manufacture == 0) {
		manufacture = 0;
	}
	try {

		var obj_Insert = {
			"genericName" : ItemName,
			"brandId" : brandName,
			"formId" : material_form,
			"manufactureId" : manufacture,
			"unicode" : shortCode,
			"systemId" : 0,
			"genericgroupId" : 0,
			"moduleId" : 0
		}
		var strUrl = ServiceProcreument.getAllPurchaseOrderDrugCountWIthEightParam;
		console.log("GET_PUCHASED_ORDER_DRUGS::::: " + strUrl);
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
					toastr.info('No item found');
				} else {
					var jsonArray = data.placingOrdersForPurchaseControllerDTO;
					if (jsonArray.length > 0) {
						loadDrugList(jsonArray);
						dataTable3();
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
var x1 = 0;
function loadDrugList(strData) {

	$('#indentreitemsearchTable').empty();
	try {
		var sum = 0;
		for (x1 = 0; x1 < strData.length;x1++) {
			var index = x1 + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			// var drugidList = strData[x1].drugidlist;

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[x1].dr_drug_name);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[x1].db_drug_brand_lang1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[x1].df_form_type);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[x1].unicode);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[x1].strenghtlist);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[x1].supplierName);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[x1].dmr_actuval_stock);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[x1].drr_actuval_stock);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).html(strData[x1].total_stock);
			$(tbleRow).append(tablcol10);
			
					var tblCol11 = document.createElement("td");
			$(tblCol11).html(
					'<input type="number"  id="description_id' + x1
							+ '" class="form-control">');
			$(tbleRow).append(tblCol11);

			var tablcol12 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode("Add");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm ');
			$(buttonTag).attr(
					'onclick',
					'get_RowData("' + strData[x1].dr_drug_name + '","'
							+ strData[x1].db_drug_brand_lang1 + '", "'
							+ strData[x1].unicode + '", "'
							+ strData[x1].df_form_type + '", "'
							+ strData[x1].strenghtlist + '", "'
							+ strData[x1].supplierName + '", "'
							+ strData[x1].dmr_actuval_stock + '", "'
							+ strData[x1].drr_actuval_stock + '",  "'
							+ strData[x1].total_stock + '", "' + x1 + '", "'
							+ strData[x1].drugidList + '")');

			$(tablcol12).append(buttonTag);
			$(tablcol12).css('height', '36px');
			$(tbleRow).append(tablcol12);

			$("#indentreitemsearchTable").append(tbleRow);
		}

	} catch (err) {
		console.log("get_All_Sites_Details_DOM ERROR" + err);
	}
}

function showNotificationError(msg, id, msgType) {
	var boxId = '#' + id;

	var options = {
		// whether to hide the notification on click
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults
		// below
		position : 'right',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 400,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};

	$(boxId).notify(msg, options);
}

// Added By Ranjeet kr.
function dataTable() {
	$('#indentrecommendent').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
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
						},
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

function dataTable2() {
	$('#indentrecommendent').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
				// {extend: 'copy'},
				// {extend: 'csv'},
				// {extend: 'excel', title: 'ExampleFile'},
				// {extend: 'pdf', title: 'ExampleFile'},
				{
					extend : 'print',
					customize : function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');
						$(win.document.body).find('table').addClass('compact')
								.css('font-size', 'inherit');
					}
				} ]

			});
}
function dataTable3() {
	$('#indentreitemsearch').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
				// {extend: 'copy'},
				// {extend: 'csv'},
				// {extend: 'excel', title: 'ExampleFile'},
				// {extend: 'pdf', title: 'ExampleFile'},
				{
					extend : 'print',
					customize : function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');
						$(win.document.body).find('table').addClass('compact')
								.css('font-size', 'inherit');
					}
				} ]

			});
}
