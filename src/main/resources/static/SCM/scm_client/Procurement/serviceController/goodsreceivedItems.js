$(document).ready(function() {
	try {
		getAllReceivedGoodsSearch();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
var strDate;

function checkboxOnclick() {
	// today_date

	var date = moment(); // Get the current date
	strDate = date.format("YYYY-MM-DD");
	// alert("strDate: " + strDate);

	return strDate;
}


/**
 * @Author: Habiboon Patan
 * @Functionality: getAllReceivedGoodsSearch
 * @Date: 20-04-2020
 */
function getAllReceivedGoodsSearch() {
	try {
		var po_number_id = $('#po_number_id').val();
		// alert("po_number_id: " + po_number_id);
		var from_date_id = $('#from_date_id').val();
		var from_date = moment(from_date_id).format("YYYY-MM-DD");

		var to_date_id = $('#to_date_id').val();
		var to_date = moment(to_date_id).format("YYYY-MM-DD");
		var today_date = strDate;

		if (from_date_id === '' || from_date_id === "" || from_date_id === null) {
			from_date = "¥";
		}
		if (po_number_id === '' || po_number_id === "" || po_number_id === null) {
			po_number_id = "¥";
			// alert("po_number_id: " + po_number_id);
		}
		if (to_date_id === '' || to_date_id === "" || to_date_id === null) {
			to_date = "¥";
		}
		if (today_date === '' || today_date === undefined
				|| today_date === null) {
			today_date = "¥";
		}
		var obj_Insert = {
			"purchaseOrderNumber" : po_number_id,
			"today_date" : from_date,
			"start_date" : today_date,
			"search_date" : to_date
		};
		var strUrl = ServiceProcreument.GET_ALL_RECEIVED_GOODS;
		console.log("GET_ALL_RECEIVED_GOODS::::: " + strUrl);
		console
				.log("GET_ALL_RECEIVED_GOODS::::: "
						+ JSON.stringify(obj_Insert));
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
					$('#serviceRemainder_table').append(divTag);
				} else {
					var jsonArray = data.receivedGoodsControllerDTO;
					if (jsonArray.length > 0) {
						loadPurchasedorderdata(jsonArray);
					}
				}
			},
			error : function(err) {
				console.error('serviceRemainder_table error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in loadPurchagesOrderList()"
				+ JSON.stringify(err))
	}
}

function loadPurchasedorderdata(strData) {
	$('#serviceRemainder_table').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol120 = document.createElement("td");
			$(tablcol120)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].po_id
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tbleRow).append(tablcol120);
			$(tablcol120).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].po_number);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].today_date);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].quotation_date);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].suppliername);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].userName);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].totalAmount);
			$(tbleRow).append(tablcol7);

			var tablcol12 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode(" View");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
			$(tablcol12)
					.append(
							'<a href="#"><i data-toggle="modal" data-target="#registration"></i></a> ');
			$(buttonTag).attr('onclick',
					'get_RowData("' + strData[i].po_id + '")');

			$(tablcol12).append(buttonTag);
			$(tablcol12).css('height', '36px');
			$(tbleRow).append(tablcol12);

			$("#serviceRemainder_table").append(tbleRow);
		}

	} catch (err) {
		console.log("serviceRemainder_table ERROR" + err);
	}
}
function get_RowData(po_id) {
	$('#registration').modal('show');
	$('#name_id').val("Habiboon");
	getTermsConditions(po_id);
	getAllReceivedGoodsByIndentId(po_id);
}

function getAllReceivedGoodsByIndentId(po_id) {
	try {

		var obj_Insert = {
			"po_id" : po_id
		};
		var strUrl = ServiceProcreument.GET_ALL_RECEIVED_GOODS_BY_INDENT_ID;
		console.log("GET_ALL_RECEIVED_GOODS_BY_INDENT_ID::::: " + strUrl);
		console.log("GET_ALL_RECEIVED_GOODS_BY_INDENT_ID::::: "
				+ JSON.stringify(obj_Insert));
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
					$('#goods_table').append(divTag);
				} else {
					var jsonArray = data.receivedGoodsControllerDTO;
					if (jsonArray.length > 0) {
						loadGoodsData(jsonArray);
					}
				}
			},
			error : function(err) {
				console.error('serviceRemainder_table error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in loadPurchagesOrderList()"
				+ JSON.stringify(err))
	}
}

function loadGoodsData(strData) {
	$('#goods_table').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].drug_name);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].drug_brand_lang);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].form_type);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].packing_type);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].packing_type);
			$(tbleRow).append(tablcol6);

			var tablcol11 = document.createElement("td");
			var button1 = document.createElement('button');
			$(button1).addClass('btn btn-blue w-100 btn-sm');
			$(button1).attr('type', 'button');
			$(button1).html('Open');
			$(button1).attr(
					'onclick',
					'getGoodsDetails("' + strData[i].trans_id + '", "'
							+ strData[i].drug_name + '", "'
							+ strData[i].drug_brand_lang + '", "'
							+ strData[i].form_type + '", "'
							+ strData[i].companyname + '", "'
							+ strData[i].strength_type + '", "'
							+ strData[i].packing_type + '", "'
							+ strData[i].appoval + '", "'
							+ strData[i].suppliername + '", "'
							+ strData[i].po_number + '", "'
							+ strData[i].drug_id + '", "'
							+ strData[i].dr_serialid + '", "'
							+ strData[i].df_serialid + '", "'
							+ strData[i].pt_serialid + '", "'
							+ strData[i].supplierid + '", "'
							+ strData[i].unit_cost + '",  "'
							+ strData[i].percentage + '", "' + strData[i].mrp
							+ '", "' + strData[i].disscount + '", "'
							+ strData[i].purchase_unitcost + '", "'
							+ strData[i].purchage_price + '", "'
							+ strData[i].conversionfactor + '", "'
							+ strData[i].barcode + '")');
			$(tablcol11).append(button1);
			$(tablcol11).css('height', '36px');
			$(tbleRow).append(tablcol11);

			$("#goods_table").append(tbleRow);
		}

	} catch (err) {
		console.log("goods_table ERROR" + err);
	}
}

var drug_Id;
var form_id;
var brand_name;
function getGoodsDetails(trans_id, drug_name, drug_brand_lang, form_type,
		companyname, strength_type, packing_type, appoval, suppliername,
		po_number, drug_id, dr_serialid, df_serialid, pt_serialid, supplierid,
		unit_cost, percentage, mrp, disscount, purchase_unitcost,
		purchage_price, conversionfactor, barcode) {

	alert("str:   " + trans_id);
	drug_Id = drug_id;
	form_id = df_serialid;

	brand_name = drug_brand_lang;

	$('#purchase_price').val(purchage_price);
	$('#purchase_unit').val(purchase_unitcost);
	$('#mrp').val(mrp);
	$('#unit_cost').val(unit_cost);
	$('#vat_id').val(percentage);
	$('#discount_id').val(disscount);

	$('#item_name').val(drug_name);
	$('#purchaseprise_id').val(purchage_price);
	$('#pruchase_unit_cost_id').val(purchase_unitcost);

	$('#mrp_id').val(mrp);
	$('#unit_cost_id').val(unit_cost);
	// $('#order_quantity_id').val(purchase_unitcost);
	$('#vat').val(percentage);
	$('#discount').val(disscount);
	// $('#free_quantity_id').val(purchase_unitcost);

	$('#barcode').val(barcode);

}
var po_ID;
function onclickCheckbox() {
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		var poid = $(this).val();
		po_ID = poid;
		// arrSelectedData.push($(this).val());
		// count++;
		// $('#reg_no').val(arrSelectedData);
		getTermsConditions(poid);
	});
}

/**
 * @Author: Habiboon Patan
 * @Functionality: getTermsConditions
 * @Date: 20-04-2020
 */

function getTermsConditions(poid) {

	var obj_Insert = {
		po_id : poid
	};
	var strUrl = ServiceProcreument.GET_TERMS_CONDITIONS;
	console.log("GET_TERMS_CONDITIONS::::: " + strUrl);
	console.log("GET_TERMS_CONDITIONS::::: " + JSON.stringify(obj_Insert));
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
					if (200 !== responsecode || data.status === "NO_DATA_FOUND") {

					} else {
						var jsonArray = data.objExpectedDateTermsConditionControllerDTO;
						// var jsonArray = data.objBrandNameControllerDTO;
						$
								.each(
										jsonArray,
										function(i, resData) {
											var expected_date = resData.expected_date;
											var terms_conditions = resData.terms_conditions;
											$('#expected_Date_id').val(
													expected_date);
											$('#terms_and_conditions_id').val(
													terms_conditions);
										});
					}
				},

			});
}

function addbuttonOnclick() {
	$('#data_table_id').empty();
	var purchage_price = $('#purchase_price').val();
	var mrp = $('#mrp').val();
	var disscount = $('#discount_id').val();
	var purchase_unitcost = $('#purchase_unit').val();
	var unit_cost = $('#unit_cost').val();
	var total_amount = $('#ttl_amount').val();
	var vat_percentage = $('#vat_id').val();
	var drug_name = $('#item_name').val();
	var batch_number = $('#batch_number').val();
	var invoice = $('#invoice').val();
	var expired_date = $('#expired_date').val();	
	var purchaseprise_id = $('#purchaseprise_id').val();
	var pruchase_unit_cost_id = $('#pruchase_unit_cost_id').val();
	var mrp_id = $('#mrp_id').val();
	var unit_cost_id = $('#unit_cost_id').val();
	var order_quantity_id = $('#order_quantity_id').val();
	var discount = $('#discount').val();
	var amount_id = $('#amount_id').val();
	var barcode = $('#barcode').val();
	var received_quantity = $('#received_quantity_id').val();
	var free_quantity_id = $('#free_quantity_id').val();
	var brand_Name = brand_name;

	
	
	
	var tbleRow = document.createElement("tr");

	var tablcol1 = document.createElement("td");
	$(tablcol1).html("1");
	$(tbleRow).append(tablcol1);

	var tablcol2 = document.createElement("td");
	$(tablcol2).html(drug_name);
	$(tbleRow).append(tablcol2);

	var tablcol3 = document.createElement("td");
	$(tablcol3).html(brand_Name);
	$(tbleRow).append(tablcol3);

	var tablcol4 = document.createElement("td");
	$(tablcol4).html("SHORT CODE");
	$(tbleRow).append(tablcol4);

	var tablcol5 = document.createElement("td");
	$(tablcol5).html(batch_number);
	$(tbleRow).append(tablcol5);

	var tablcol6 = document.createElement("td");
	$(tablcol6).html(received_quantity);
	$(tbleRow).append(tablcol6);

	var tablcol7 = document.createElement("td");
	$(tablcol7).html(purchage_price);
	$(tbleRow).append(tablcol7);

	var tablcol8 = document.createElement("td");
	$(tablcol8).html(purchase_unitcost);
	$(tbleRow).append(tablcol8);

	var tablcol9 = document.createElement("td");
	$(tablcol9).html(mrp);
	$(tbleRow).append(tablcol9);

	var tablcol10 = document.createElement("td");
	$(tablcol10).html(unit_cost);
	$(tbleRow).append(tablcol10);

	var tablcol11 = document.createElement("td");
	$(tablcol11).html(disscount);
	$(tbleRow).append(tablcol11);

	var tablcol12 = document.createElement("td");
	$(tablcol12).html(vat_percentage);
	$(tbleRow).append(tablcol12);

	var tablcol13 = document.createElement("td");
	$(tablcol13).html(free_quantity_id);
	$(tbleRow).append(tablcol13);

	var tablcol14 = document.createElement("td");
	$(tablcol14).html(total_amount);
	$(tbleRow).append(tablcol14);

	$("#data_table_id").append(tbleRow);

}

function saveBtnOnclick() {
	savePodetails();
	updatePoData();

}

function savePodetails() {
	var batch_number = $('#batch_number').val();
	var purchage_price = $('#purchase_price').val();
	var mrp = $('#mrp').val();
	var unit_cost = $('#unit_cost').val();
	var received_quantity = $('#received_quantity_id').val();
	var free_quantity_id = $('#free_quantity_id').val();
	var vat_percentage = $('#vat_id').val();
	var invoice = $('#invoice').val();
	var expired_date = $('#expired_date').val();
	var supplier_name = $('#supplier_name').val();
	var obj_Insert = {
		"drugId" : drug_Id,
		"formId" : form_id,
		"batchnumber" : batch_number,
		"purchasePrice" : purchage_price,
		"tax" : vat_percentage,
		"mrp" : mrp,
		"unitcost" : unit_cost,
		"expireDate" : expired_date,
		"receivedStock" : received_quantity,
		"userId" : 1,
		"moduleId" : 1,
		"roleId" : 1,
		"supplierId" : supplier_name,
		"billNo" : invoice,
		"count" : 1,
		"totallist" : 1,
		"freeqty" : free_quantity_id
	};
	var strUrl = ServiceProcreument.SAVE_RECEIVED_GOODS;
	console.log("SAVE_RECEIVED_GOODS::::: " + strUrl);
	console.log("SAVE_RECEIVED_GOODS::::: " + JSON.stringify(obj_Insert));
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

function updatePoData() {

	var obj_Insert = {
		"drugId" : drug_Id,
		"po_id" : po_ID,
		"status" : false,
		"count" : 1
	};
	var strUrl = ServiceProcreument.UPDATE_PO_ITEMS;
	console.log("UPDATE_PO_ITEMS::::: " + strUrl);
	console.log("UPDATE_PO_ITEMS::::: " + JSON.stringify(obj_Insert));
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
				updateStatus();
			}
		}

	});
}
function updateStatus() {
	var total_amount = $("#ttl_amount").val();
	alert("total_amount: " + total_amount);
	var obj_Insert = {
		"isActive" : false,
		"totalAmount" : total_amount,
		"po_id" : po_ID
	};
	var strUrl = ServiceProcreument.UPDATE_STATUS;
	console.log("UPDATE_STATUS::::: " + strUrl);
	console.log("UPDATE_STATUS::::: " + JSON.stringify(obj_Insert));
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
				resetData();
				$('#data_table_id').empty();
			}
		}

	});
}

function resetData() {
	$('#purchase_price').val("");
	$('#mrp').val("");
	$('#discount_id').val("");
	$('#purchase_unit').val("");
	$('#unit_cost').val("");
	$('#ttl_amount').val("");
	$('#vat_id').val("");
	$('#item_name').val("");
	$('#batch_number').val("");
	$('#invoice').val("");
	$('#expired_date').val("");
	$('#purchaseprise_id').val("");
	$('#pruchase_unit_cost_id').val("");
	$('#mrp_id').val("");
	$('#unit_cost_id').val("");
	$('#order_quantity_id').val("");
	$('#vat').val("");
	$('#discount').val("");
	$('#received_quantity_id').val("");
	$('#free_quantity_id').val("");
	$('#amount_id').val("");
	$('#barcode').val("");
}