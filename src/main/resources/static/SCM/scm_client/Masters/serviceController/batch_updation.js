
function itemSearch() {
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();

	var rtnValues = validaion();
	if (rtnValues == false || rtnValues == 'rtnValues') {
		return false;
	}

	var strUrl = MASTER_END_POINT.getAllMedicines;
	console.log('serach batch data::'+strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnValues),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Json Data::" + JSON.stringify(data));
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {

			} else {
				var jsonArray = data.objMedicineControllerDTO;
				console.log("::::::::::::::::::::"
						+ JSON.stringify(data.objMedicineControllerDTO));
				if (jsonArray.length > 0) {
					ListOfData(jsonArray);
				}
			}
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function validaion() {
	var shortCode = $('#short_code_id').val();
	var item_name = $('#item_name_id').val();
	var load_from = $('#load_from_inventory_id').val();
	var manufacture = $('#manufactureId').val();
	var brandName = $('#brandNameId').val();
	var store = $('#store_id').val();
	if (shortCode == "" || shortCode == '') {
		shortCode = "¥";
	}

	if (item_name == "" || item_name == '') {
		item_name = "¥";
	}
	if (brandName == 0) {
		brandName = 0;
	}

	if (manufacture == 0) {
		manufacture = 0;
	}

	if (load_from == 0) {
		load_from = 0;
	}
	var store = $('#store_id').val();
	if (store == 0 || store == '0') {
		toastr.error('Please select store');
		return false;
	}
	var serachFilds = {
		"genric_drug_name" : item_name,
		"brandId" : brandName,
		"formId" : load_from,
		"manufactureId" : manufacture,
		"shortCode" : shortCode,
		"systemId" : 0,
		"genericGroupId" : 0,
		"genericMoleculeId" : 0,
		"storeId" : store
	}
	return serachFilds;
}
var globalArr;
function ListOfData(arrData) {
	globalArr = arrData;
	for (var r = 0; r < arrData.length; r++) {
		$('#list_of_data_id')
				.append(
						' <tr><td>'
								+ arrData[r].shortCode
								+ '</td><td>'
								+ arrData[r].drugName
								+ '</td> <td>'
								+ arrData[r].drugBrandLang
								+ '</td>'
								+ '<td>'
								+ arrData[r].manufactureCompany
								+ '</td><td>'
								+ arrData[r].packingType
								+ '</td> <td>'
								+ arrData[r].batchNumber
								+ '</td>'
								+ '<td>'
								+ arrData[r].quantity
								+ '</td><td>'
								+ arrData[r].expireDate
								+ '</td> <td>'
								+ arrData[r].mrp
								+ '</td>'
								+ '<td>'
								+ arrData[r].unitCost
								+ '</td><td><button type="button" class="btn btn-primary btn-sm" onClick="getId('
								+ r + ',' + arrData[r].drugId
								+ ')"><i class="fa fa-edit p-r-xs"></i>Update</button></td></tr>');
	}
	$('#masterIem').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
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
//							title : 'ExampleFile'
//						},
//						{
//							extend : 'pdf',
//							title : 'ExampleFile'
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
var gIds;
function getId(index, iDs) {

	gIds = iDs
	$('#batchUpdation').modal('show');
	$('#item_name').val(globalArr[index].drugName);
	$('#brand_name').val(globalArr[index].drugBrandLang);
	$('#batch_no_id').val(globalArr[index].batchNumber);
	$('#date_id').val(globalArr[index].expireDate);
	$('#mrp_id').val(globalArr[index].mrp);
	$('#unit_cost').val(globalArr[index].unitCost);

}

/*
 * function batchUpadtion(){ var itemName = $('#item_name').val(); var
 * brandName= $('#brand_name').val(); var batchNo = $('#batch_no_id').val(); var
 * dateId = $('#date_id').val(); var mrp = $('#mrp_id').val(); var unitCost =
 * $('#unit_cost').val();
 * 
 * var strUrl =
 * "http://localhost:2000/scmservice/UpdateBatchRatesController/updateBatchRates";
 * var updateJssonBatch = { "drugId":gIds, "batchNumber":batchNo, "mrp":mrp,
 * "expireDate":dateId, "unitCost":1000 } $.ajax({ type : "POST", url : strUrl,
 * dataType : "json", data : JSON.stringify(updateJssonBatch), contentType :
 * "application/json", async : false, crossDomain : true, success :
 * function(data) { console.log("Json Data::" + JSON.stringify(data)); var count =
 * data.rtnReponseCount; if (count == 1 || count == '1') { toastr.info('Updated
 * successsfully'); } } }, error : function(err) { console.error('itemSearch
 * error: ' + JSON.stringify(err)); } });
 *  }
 */

function batchUpadtion() {
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();
	var itemName = $('#item_name').val();
	var brandName = $('#brand_name').val();
	var batchNo = $('#batch_no_id').val();
	var dateId = $('#date_id').val();
	var mrp = $('#mrp_id').val();
	var unitCost = $('#unit_cost').val();

	var updateJssonBatch = {
		"drugId" : gIds,
		"batchNumber" : batchNo,
		"mrp" : mrp,
		"expireDate" : dateId,
		"unitCost" : unitCost
	}
	
	
	var strUrl = MASTER_END_POINT.updateBatchRates;
	console.log('batch update Url::'+strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(updateJssonBatch),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Json Data::" + JSON.stringify(data));
			var rtnValue = data.rtnReponseCount;
			if (rtnValue == 1 || rtnValue == '1') {
				toastr.success('Updated Successfully');
				$('#batchUpdation').modal('hide');
			} else {
				if (data.responseCode == 1001 || data.responseCode == '1001') {
					toastr.error('Postgresss Issue');
				} else {
					toastr.error('Something went wrong');
				}

			}
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}
