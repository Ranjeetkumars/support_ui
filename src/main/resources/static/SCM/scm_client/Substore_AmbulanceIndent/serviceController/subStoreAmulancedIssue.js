var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	loadIndentRaisedItems();
});



//Allow only number in input tag
$('#issued_quty').keypress(function (e) {    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
     return false;                        
});



$('#issued_quty').on("input", function() {
	$('#amount_id').empty();
	var issuedQty = this.value;
	var unit_price = $('#unit_price_id').val();
	var amount = issuedQty * unit_price;
	console.log(amount);
	$('#amount_id').val(amount);

});









function loadIndentRaisedItems() {
	var indentCode = localStorage.getItem('indentCode');
	console.log('loadIndentRaisedItems function is executed::' + indentCode);
	var strUrl = "http://localhost:2000/scmservice/indentItemListController/loadIndentRaisedItems";
	//var strUrl = subStoreAmbulance.loadIndentRaisedItems;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"indentNum" : indentCode
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));
				indentRisedListOfdata(data.objIndentItemListControllerDTO);

			} else {
				toastr.info('Data Not found');
			}

		},
		error : function(err) {
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});
}

function insertAndUpdateIndentRaiseds(batchNo,drugId) {
	
	    var itemNmae = $('#item_name').val();
		var barcode = $('#bar_code_id').val();
		var genericModuleId = $('#generic_module_id').val();
		var unicCode = $('#unic_code_id').val();
		var fromName = $('#from_name_id').val();
		var manufaacture = $('#manufacture_id').val();
		var avalQty = $('#aval_qty').val();
		var brandName = $('#brand_name_id').val();
		
		var isssuedQty = $('#issued_quty').val();
		var unitPrice = $('#unit_price_id').val();
		var price = $('#amount_id').val();
		var expiredate = $('#expire_date_id').val();
		var batchNumberId =  $('#bach_number_id').val();
		var indentCode = localStorage.getItem('indentCode');
	
	
	//var strUrl = "localhost:2000/scmservice/indentItemListController/insertAndUpdateIndentRaiseds";
		
		
	var strUrl = subStoreAmbulance.insertAndUpdateIndentRaiseds;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"batch_number" : 0,
			"mainstore_available_stock" : 0,
			"mainstore_id" : batchNumberId,
			"drug_id" : drugId,
			"Batch_number" : batchNo,
			"mrp" : price,
			"purchase_price" : purchagePrice,
			"available_stock" : avalQty,
			"expire_date" : expiredate,
			"recived_stock" : "1",
			"createdbyid" : userId,
			"createdbyroleid" : roleId,
			"createdbymoduleid" : moduleId,
			"unitprice" : unitPrice,
			"indent_code" : indentCode,
			"size" : "1"

		}),
		
		//268,167,51
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));

				var jsonarr = data.objIndentItemListControllerDTO;
				if (jsonarr.status == 2 || jsonarr.status == '2') {
					toastr.info("Stock is not available for "
							+ jsonarr.batch_number + " batch no")
				}
				if (jsonarr.status == 0 || jsonarr.status == '0') {
					toastr.info(jsonarr.batch_number
							+ 'batch no is already issued');
				}

			} else {
				toastr.info('Somethng went wrong');
			}

		},
		error : function(err) {
			toastr.error("Something went wrong! try again"
					+ JSON.stringify(err));
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});
}
var purchagePrice;
function loadAvailableQty() {
	//loadBatchNumber
	var intStoreId = localStorage.getItem('intStoreId');
	
   console.log('loadAvailableQty javascript function is excuted');
	var mainStoredId = $('#bach_number_id').val();
	var storeId = intStoreId;
	var strUrl  = "http://localhost:2000/scmservice/indentItemListController/loadAvailableQty";
	
	
	//var strUrl = subStoreAmbulance.loadAvailableQty;
    $.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"main_storeId" : mainStoredId,
			"storeId" : storeId
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));
				var jsonArr = data.objIndentItemListControllerDTO;
				purchagePrice =jsonArr[0].purchase_price; 
				//$('#').val(jsonArr[0].purchase_price);
				
				//$('#amount_id').val(jsonArr[0].mrp);
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@"+jsonArr[0].available_stock);
				$('#expire_date_id').val(jsonArr[0].expire_date);
				$('#aval_qty').val(jsonArr[0].available_stock);
				$('#unit_price_id').val(jsonArr[0].unitCost);
				
				//set in localStorage 
				localStorage.setItem("expireDate", jsonArr[0].expire_date);
				localStorage.setItem("purchagePrice", jsonArr[0].purchase_price);
				localStorage.setItem("mrp", jsonArr[0].mrp);
				localStorage.setItem("unitCost",jsonArr[0].unitCost);
				
				
				
				
				
			} else {
				toastr.info('Somethng went wrong');
			}

		},
		error : function(err) {
			toastr.error("Something went wrong! try again"
					+ JSON.stringify(err));
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});

}
