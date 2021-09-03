
function getProcessNewInventory() {
	
	$('#processNewInventoryId').DataTable().clear().destroy();

	try {
		var shortCode = $('#short_codeId').val();
		var itemName = $('#item_name_for_filter').val();
		var brandId = $('#brandNameId').val();
		var inventoryFormItemId = $('#material_form_id').val();
		var manufacture = $('#manufacture_id').val();
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
	
			"brand" :brandId,
			"form" : inventoryFormItemId,
			"mfg" : manufacture,
			"unicode" : shortCode,
			
		};
		
		var strUrl1 = ServiceProcreument.processNewInventory;
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
				
				if (data.status === "NO_DATA_FOUND") {
					/*
					 * var divTag = document.createElement("h2");
					 * $(divTag).css("text-align", "center"); $(divTag).html("No
					 * data available....");
					 * $('#new_process_list_of_data').append(divTag);
					 */
				dataTable4();
					toastr.info('No data available....');
				clearDrugRegistration();
				} else {
					var jsonArray = data.objControllerDto;
				
					if (jsonArray.length > 0) {
						loadListOfNewProcessData(jsonArray);
						dataTable4();
						clearDrugRegistration();
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

var arrData;
function loadListOfNewProcessData(strData) {
	arrData = strData;


	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			/*
			 * var tablcol1 = document.createElement("td");
			 * $(tablcol1).html(index); $(tbleRow).append(tablcol1);
			 */

			var drugidList = strData[i].drugidlist;

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

			var tablcol11 = document.createElement("td");
			$(tablcol11)
					.html(
							'<button type="button" class="btn btn-primary btn-sm"   onClick="getNewProcessInventoryBYIds('
									+ i
									+ ','
									+ strData[i].drugidList
									+ ');" >Add new Item</button>');
			$(tbleRow).append(tablcol11);

			$(tablcol11).append(tablcol11);
			$(tablcol11).css('height', '36px');
			$(tbleRow).append(tablcol11);
			$("#new_process_list_of_data").append(tbleRow);
		}

	} catch (err) {
		console.log("get_All_Sites_Details_DOM ERROR" + err);
	}

}

function clearDrugRegistration() {

$("#short_codeId").val('');
$("#item_name_for_filter").val('')
$("#brandNameId").val('0').trigger("chosen:updated");
$("#material_form_id").val('0').trigger("chosen:updated");
$("#manufacture_id").val('0').trigger("chosen:updated");











	
	//$("#manufactureId").val('').trigger("chosen:updated");
	//$("#load_from_inventory_id").val('').trigger("chosen:updated");
	//$("#brandNameId").val('').trigger("chosen:updated");
	//$('#short_codeId').val('');
	//$('#item_name_for_filter').val('');
	//$("#reg_drug_genericNameId").val('').trigger("chosen:updated");
	//$("#reg_drug_brandnameid").val('').trigger("chosen:updated");
	//$("#reg_drug_scheduleId").val('').trigger("chosen:updated");
	//$("#reg_drug_manufactureId").val('').trigger("chosen:updated");
	//$("#reg_drug_inventorygroupId").val('').trigger("chosen:updated");
	//$("#reg_drug_inventoryItemFormId").val('').trigger("chosen:updated");
	//$("#reg_drug_packingId").val('').trigger("chosen:updated");
	//$("#reg_drug_genericNameId").val();
	//$("#reg_drug_itemnameId").val('');
	//$('#reg_drug_shortCodeId').val('');

}

function dataTable4() {
	$('#processNewInventoryId').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						//{
						//	extend : 'copy'
						//},
						//{
						//	extend : 'csv'
						//},
						//{
						//	extend : 'excel',
							//title : 'ExampleFile'
						//},
						//{
							//extend : 'pdf',
							//title : 'ExampleFile'
						//},
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

function getSingleRowData(index, drugId) {
	console.log("arrData::" + JSON.stringify(arrData));
	console.log("index values::" + index);
	console.log("drugId values::" + arrData[index].serialId);
	console.log("shortUnicCode values::" + arrData[index].shortUnicCode);
	console.log("drugBrandLang_1 values::" + arrData[index].drugBrandLang_1);
	console.log("companyName values::" + arrData[index].companyName);
	console.log("formType values::" + arrData[index].formType);
	console.log("strengthType values::" + arrData[index].strengthType);
	console.log("drugName values::" + arrData[index].drugName);
	console.log("groupMolecules values::" + arrData[index].groupMolecules);
	// console.log("drugId values::"+arrData[index].serialId);

	var jsonNewProcessData = {
		"serialId" : arrData[index].serialId,
		"shortUnicCode" : arrData[index].shortUnicCode,
		"drugBrandLang_1" : arrData[index].drugBrandLang_1,
		"companyName" : arrData[index].companyName,
		"formType" : arrData[index].formType,
		"drugName" : arrData[index].drugName,
		"groupMolecules" : arrData[index].groupMolecules,

	};
	localStorage.setItem('singleNewProcessInventoy', JSON
			.stringify(jsonNewProcessData));
	// 
	AddNewItem(index, drugId, arrData);
}


var arrSerialIds = [];
function getNewProcessInventoryBYIds(index, serialId) {
	$('#add_new_item_table_id').dataTable().fnClearTable();
	$('#add_new_item_table_id').dataTable().fnDestroy();
	arrSerialIds.push(serialId);
	// serialId
	
	var strUrl = ServiceProcreument.ProcessNewInventoryByIds;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"serialId" : arrSerialIds.toString()
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Json Data::" + JSON.stringify(data));
			var responsecode = data.responseCode;
			if (data.status === "NO_DATA_FOUND") {

			} else {
				var arrData = data.objControllerDto;
				console.log("::::::::::::::::::::"
						+ JSON.stringify(data.objControllerDto));
				if (arrData.length > 0) {
					AddNewItem(arrData);
					dataTable();
				}
			}
		},
		error : function(err) {
			console.error(' error: ' + JSON.stringify(err));
		}
	});
}

function AddNewItem(arrData) {
	//$("#add_new_item_id").empty();
	for (var k = 0; k < arrData.length; k++) {    
		$("#add_new_item_id").append(
				'<tr><td><label class="check">'
						+ '<input type="checkbox" id="drugs_yes" onClick="getIds(' + arrData[k].drugidList + ')">'
						+ '<span class="checkmark"></span>' + '</label></td>'
						+ '<td>' + arrData[k].genericName + '</td>' + '<td>'
						+ arrData[k].db_drug_brand_lang1 + '</td>' + '<td>'
						+ arrData[k].unicode + '</td>' + '<td>'
						+ arrData[k].df_form_type + '</td>' + '<td>'
						+ arrData[k].strenghtlist + '</td>' + '<td>'
						+ arrData[k].supplierName + '</td></tr>');
	}
	applayTableadd_new_item();
}

var putInLocalStorage = [];
function getIds(serialIds){

	putInLocalStorage.push(serialIds);
	localStorage.setItem('serialIds',putInLocalStorage.toString());
}

function addLatestItem(){
	
	
	window.location.href=ServiceProcreument.IndentRequestHtml;
}



function applayTableadd_new_item() {

	$('#add_new_item_table_id').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						//{
							//extend : 'copy'
						//},
						//{
							//extend : 'csv'
						//},
						//{
							//extend : 'excel',
							//title : 'ExampleFile'
						//},
						//{
							//extend : 'pdf',
							//title : 'ExampleFile'
						//},
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
