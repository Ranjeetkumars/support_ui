function indentRisedListOfdata(strData) {
	// console.log('indentRisedListOfdata function is executed');
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

		var objTHead1 = document.createElement("th");

		$(objTHead1).html('Item Name');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Brand Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Short Code');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Strength');
		$(objTr).append(objTHead4);
		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Manufacture');
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Required Qty');
		$(objTr).append(objTHead6);

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Available Qty');
		$(objTr).append(objTHead7);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Rack Location');
		$(objTr).append(objTHead8);

		var objTHead9 = document.createElement('th');
		$(objTHead9).html('View Item Details');
		$(objTr).append(objTHead9);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");
			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1).html(strData[i].drug_name);
			$(tbleRow).append(tablcol1);
			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].drug_brand_lang1);
			$(tbleRow).append(tablcol2);
			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].short_unic_code);
			$(tbleRow).append(tablcol3);
			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].strength_type);
			$(tbleRow).append(tablcol4);
			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].companyname);
			$(tbleRow).append(tablcol5);
			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].indent_qty);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).html(strData[i].availableqty);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			$(tablcol8).html(strData[i].ddr_rackname);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).addClass('text-center');
			$(tablcol9)
					.append(
							'<button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-plus"></i>View Item Details</button>');
			$(tablcol9).attr(
					'onclick',
					'get_RowData("' + strData[i].item_id + '","'
							+ strData[i].barcode + '","' + strData[i].drug_name
							+ '","' + strData[i].drug_brand_lang1 + '","'
							+ strData[i].short_unic_code + '","'
							+ strData[i].companyname + '","'
							+ strData[i].availableqty + '","'
							+ strData[i].form_type + '","'
							+ strData[i].group_molecules_type_lang1 + '","'
							+ strData[i].strength_type + '","'
							+ strData[i].indent_qty + '","'
							+ strData[i].to_store_id + '","'

							+ strData[i].ddr_rackname + '")');

			$(tbleRow).append(tablcol8);
			$(tbleRow).append(tablcol9);
			$(objTBody).append(tbleRow);
		}

		$("#indent_rised").append(objDivTag);

	} catch (err) {
		console.log("indent_rised" + err);
	}
}

var strength;
var indentQty;
var rackLocation;
var batchNo;
var drugId;
var toStoreId;
function get_RowData(item_id, barcode, itemName, brandName, unicCode,
		companyname, avalQty, fromType, group_molecules_type_lang1,
		strength_type, indent_qty, to_store_id, ddr_rackname) {

	console.log('get_RowData function is executed');
	drugId = item_id;
	rackLocation = ddr_rackname;
	indentQty = indent_qty;
	strength = strength_type;
	toStoreId = to_store_id;
	// $('#issued').modal('show');

	$('#issued').modal({
		backdrop : 'static',
		keyboard : true
	})

	$('#item_name').val(itemName);
	$('#bar_code_id').val(barcode);
	$('#generic_module_id').val(group_molecules_type_lang1);
	$('#unic_code_id').val(unicCode);
	$('#from_name_id').val(fromType);
	$('#manufacture_id').val(companyname);
	// $('#aval_qty').val(avalQty);
	$('#brand_name_id').val(brandName);

	$("#item_name").attr("disabled", true);
	$("#bar_code_id").attr("disabled", true);
	$("#generic_module_id").attr("disabled", true);
	$("#unic_code_id").attr("disabled", true);
	$("#from_name_id").attr("disabled", true);
	$("#manufacture_id").attr("disabled", true);
	$("#aval_qty").attr("disabled", true);
	$("#brand_name_id").attr("disabled", true);
	$("#amount_id").attr("disabled", true);
	$("#unit_price_id").attr("disabled", true);
	$("#expire_date_id").attr("disabled", true);

	console.log('Drug Id::' + item_id);
	console.log('To store id::' + to_store_id);
	localStorage.setItem("intStoreId", to_store_id);
	var strUrl = "http://localhost:2000/scmservice/indentItemListController/loadBatchNumber";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"drug_id" : item_id,
			"storeId" : to_store_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 == responsecode) {
				var jsonArray = data.objIndentItemListControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var batch = "<option value=" + resData.serialid + ">"
							+ resData.batch_number + "</option>";
					$(batch).appendTo('#bach_number_id');

					batchNo = resData.batch_number;
				});
			} else {
				$('#batch_no_not_found').append('No Batch found');
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadDistrict  error: ' + JSON.stringify(err));
		}
	});
	$('#bach_number_id').trigger("chosen:updated");
	$('#bach_number_id').chosen();

}

function insertAndUpdateIndentRaiseds() {
	console.log("insertAndUpdateIndentRaiseds function executed");
	var itemNmae = $('#item_name').val();
	var barcode = $('#bar_code_id').val();
	var genericModuleId = $('#generic_module_id').val();
	var unicCode = $('#unic_code_id').val();
	var fromName = $('#from_name_id').val();
	var manufaacture = $('#manufacture_id').val();
	var avalQty = $('#aval_qty').val();
	var isssuedQty = $('#issued_quty').val();
	var brandName = $('#brand_name_id').val();
	var unitPrice = $('#unit_price_id').val();
	var price = $('#amount_id').val();
	var expire_date_id = $('#expire_date_id').val();
	var mainStoredId = $('#bach_number_id').val();

	var expireDate = localStorage.getItem("expireDate");
	var purchagePrice = localStorage.getItem("purchagePrice");
	
	var mrp = localStorage.getItem("mrp");
	var unitCost = localStorage.getItem("unitCost");
	var indentCode = localStorage.getItem("indentCode");
	var counterTypeId = localStorage.getItem("counterTypeId");

	// issued_quty

	if (mainStoredId == "0" || mainStoredId == 0) {
		toastr.error('Please select batch number');
		return false
	}

	if (isssuedQty == "" || isssuedQty == '') {
		toastr.error('Please enter isssued qty');
		return false
	}

	if (parseInt(isssuedQty) > parseInt(avalQty)) {
		toastr
				.error('Please enter isssued qty less than or equal to available qty');
		return false

	}

	var strUrl = "http://localhost:2000/scmservice/indentItemListController/insertAndUpdateIndentRaiseds"

	var userId = localStorage.getItem('userID');
	var roleId = localStorage.getItem("scmRoleId");
	var moduleId = localStorage.getItem("scmModuleId");

	var jsonObj = {
		"batch_number" : batchNo,
		"mainstore_available_stock" : isssuedQty,
		"mainstore_id" : mainStoredId,
		"drug_id" : drugId,
		"mrp" : mrp,
		"purchase_price" : purchagePrice,
		"available_stock" : avalQty,// dout at this value
		"expire_date" : expireDate,
		"recived_stock" : isssuedQty,
		"createdbyid" : userId,
		"createdbyroleid" : roleId,
		"createdbymoduleid" : moduleId,
		"unitprice" : unitCost,
		"indent_code" : indentCode,
		"size" : "1",
		"to_store_id" : toStoreId,
		"fromCounterid" : counterTypeId
	}
	console.log(JSON.stringify(jsonObj));
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(jsonObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					console.log("Success");
					// console.log('@@@@@@@@@@@@@@@@@@@@@ success!'+
					// JSON.stringify(data));
					var listOfData = data.objIndentItemListControllerDTO;
					if (listOfData[0].status == "2"
							|| listOfData[0].status == 2) {
						var status = listOfData[0].status
						var intDrugId = listOfData[0].drug_id;
						var strBatchno = listOfData[0].batch_number;
						console.log('status' + status);
						console.log('intDrugId' + intDrugId);
						console.log('strBatchno' + strBatchno);
						toastr.info("Stock is not available for " + strBatchno
								+ " batch no");
						return;
					} else if (listOfData[0].status == "0"
							|| listOfData[0].status == 0) {
						var intDrugId = listOfData[0].drug_id;
						var strBatchno = listOfData[0].batch_number;
						var status = listOfData[0].status
						console.log('status' + status);
						console.log('intDrugId' + intDrugId);
						console.log('strBatchno' + strBatchno);

						toastr.info(strBatchno + " batch no is already issued");
						return;
					}
					else{
						
						toastr.success("Indent save successfully");
					}

				},
				error : function(err) {
					console.error('insertAndUpdateIndentRaiseds  error: '
							+ JSON.stringify(err));
				}
			});

	//	
	// var itemNmae = $('#item_name').val();
	// var barcode = $('#bar_code_id').val();
	// var genericModuleId = $('#generic_module_id').val();
	// var unicCode = $('#unic_code_id').val();
	// var fromName = $('#from_name_id').val();
	// var manufaacture = $('#manufacture_id').val();
	// var avalQty = $('#aval_qty').val();
	// var brandName = $('#brand_name_id').val();
	//	
	// var isssuedQty = $('#issued_quty').val();
	// var unitPrice = $('#unit_price_id').val();
	// var price = $('#amount_id').val();
	//	
	// // For Div Tag
	// try {
	// var objDivTag = document.createElement('div');
	// $(objDivTag).addClass("table-responsive");
	//
	// // For table
	// var ObjTableTag = document.createElement("table");
	// $(ObjTableTag)
	// .addClass(
	// "table table-striped table-bordered table-hover dataTables-example");
	// $(objDivTag).append(ObjTableTag);
	// // For table head
	// var objTHead = document.createElement("thead");
	// $(ObjTableTag).append(objTHead);
	//
	// // For table row
	// var objTr = document.createElement("tr");
	// $(objTHead).append(objTr);
	//
	// var objTHead1 = document.createElement("th");
	//
	//		
	// $(objTHead1).html('Item Name');
	// $(objTr).append(objTHead1);
	// // For table Heading1
	//
	// // For table Heading2
	// var objTHead2 = document.createElement('th');
	// $(objTHead2).html('Brand Name');
	// $(objTr).append(objTHead2);
	//
	// // For table Heading3
	// var objTHead3 = document.createElement('th');
	// $(objTHead3).html('Short Code');
	// $(objTr).append(objTHead3);
	//
	// var objTHead4 = document.createElement('th');
	// $(objTHead4).html('Strength');
	// $(objTr).append(objTHead4);
	// // For table Heading4
	// var objTHead5 = document.createElement('th');
	// $(objTHead5).html('Manufacturer');
	// $(objTr).append(objTHead5);
	//
	// var objTHead6 = document.createElement('th');
	// $(objTHead6).html('Required Qty');
	// $(objTr).append(objTHead6);
	//
	// var objTHead7 = document.createElement('th');
	// $(objTHead7).html('Issued Qty');
	// $(objTr).append(objTHead7);
	//
	// var objTHead8 = document.createElement('th');
	// $(objTHead8).html('Unit Price');
	// $(objTr).append(objTHead8);
	//
	// var objTHead9 = document.createElement('th');
	// $(objTHead9).html('Amount');
	// $(objTr).append(objTHead9);
	//
	// var objTHead10 = document.createElement('th');
	// $(objTHead10).html('Batch No');
	// $(objTr).append(objTHead10);
	//
	// var objTHead11 = document.createElement('th');
	// $(objTHead11).html('Rack Location');
	// $(objTr).append(objTHead11);
	//
	// var objTHead12 = document.createElement('th');
	// $(objTHead12).html('Save/Update Indent Rised');
	// $(objTr).append(objTHead12);
	//
	// var objTBody = document.createElement("tbody");
	// $(objTBody).attr("id", "tbodyData");
	// $(ObjTableTag).append(objTBody);
	//
	// var tbleRow = document.createElement("tr");
	//
	// var tablcol1 = document.createElement("td");
	// $(tablcol1).addClass('text-center');
	// $(tablcol1).html(itemNmae);
	// $(tbleRow).append(tablcol1);
	//
	// var tablcol2 = document.createElement("td");
	// $(tablcol2).addClass('text-center');
	// $(tablcol2).html(brandName);
	// $(tbleRow).append(tablcol2);
	//
	// var tablcol3 = document.createElement("td");
	// $(tablcol3).addClass('text-center');
	// $(tablcol3).html(unicCode);
	// $(tbleRow).append(tablcol3);
	//
	// var tablcol4 = document.createElement("td");
	// $(tablcol4).addClass('text-center');
	// $(tablcol4).html(strength);
	// $(tbleRow).append(tablcol4);
	//
	// var tablcol5 = document.createElement("td");
	// $(tablcol5).addClass('text-center');
	// $(tablcol5).html(manufaacture);
	// $(tbleRow).append(tablcol5);
	//
	// var tablcol6 = document.createElement("td");
	// $(tablcol6).addClass('text-center');
	// $(tablcol6).html(indentQty);
	// $(tbleRow).append(tablcol6);
	//
	// var tablcol7 = document.createElement("td");
	// $(tablcol7).addClass('text-center');
	// $(tablcol7).html(isssuedQty);
	// $(tbleRow).append(tablcol7);
	//
	// var tablcol8 = document.createElement("td");
	// $(tablcol8).addClass('text-center');
	// $(tablcol8).html(unitPrice);
	// $(tbleRow).append(tablcol8);
	//
	// var tablcol9 = document.createElement("td");
	// $(tablcol9).addClass('text-center');
	// $(tablcol9).html(price);
	// $(tbleRow).append(tablcol9);
	//
	// var tablcol10 = document.createElement("td");
	// $(tablcol10).addClass('text-center');
	// $(tablcol10).html(batchNo);
	// $(tbleRow).append(tablcol10);
	//
	// var tablcol11 = document.createElement("td");
	// $(tablcol11).addClass('text-center');
	// $(tablcol11).html(rackLocation);
	// $(tbleRow).append(tablcol11);
	//
	// var tablcol12 = document.createElement("td");
	// $(tablcol12).addClass('text-center');
	// $(tablcol12).append('<button class="btn btn-primary btn-sm"
	// data-toggle="modal" ><i class="fa fa-plus"></i>Save/Update Indent
	// Rised</button>');
	// $(tablcol12).attr('onclick',
	// 'insertAndUpdateIndentRaiseds("'+batchNo+'","'+drugId+'")');
	// $(tablcol12).css('height', '5px');
	//
	// $(tbleRow).append(tablcol11);
	// $(tbleRow).append(tablcol12);
	// $(objTBody).append(tbleRow);
	//
	// $("#addIntoTable").append(objDivTag);
	//
	// } catch (err) {
	// console.log("addIntoTable" + err);
	// }
}

// function insertAndUpdateIndentRaiseds() {
//
// alert('getSingleRowDatagetSingleRowDatagetSingleRowDatagetSingleRowData');
//	
// //select * from
// sp_insert_update_indent_raised_list('1.0','9','298','FR54646','6200.0','10000.0','2021-08-10
// 00:00:00','1.0','3900.0',268,167,51,'500.0','IND2021073001100004001',1,99999,100004)
// }
