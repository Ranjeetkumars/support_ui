function appendSubStoreDataIntoDOm(strData) {
	// For Div Tag
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
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

		$(objTHead1).html('Short Code');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Inventory Item Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Packing Volume');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Conversion Factor');
		$(objTr).append(objTHead4);
		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Re-Order Quentiy');
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Available Quantity');
		$(objTr).append(objTHead6);

		/*var objTHead7 = document.createElement('th');
		$(objTHead7).html('Indent Quantity');
		$(objTr).append(objTHead7);*/

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Indent Request');
		$(objTr).append(objTHead8);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		/*
		 * { "storeTypeId": null, "drugId": "323", "drShortUnicCode": "CO-167",
		 * "drugName": "Bone Marrow Needle", "groupName": "Consumables",
		 * "pt_PackingTyp": "1X1", "conersionFactor": "1", "ordeQty": "1500",
		 * "availQty": "170.00" },
		 */

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");

			/*
			 * $(tablcol1).addClass('text-center'); $(tablcol1).html('<label
			 * class="check "><input type="checkbox" id="myCheck12"
			 * class="case" value=' + strData[i].equipmentId + ' name="case" )" ><span
			 * class="checkmark"> </label>'); $(tbleRow).append(tablcol1);
			 * 
			 * $(tablcol1).attr('onclick', 'onclickCheckbox()');
			 */

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1).html(strData[i].drShortUnicCode);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].drugName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].pt_PackingTyp);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].conersionFactor);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].ordeQty);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].availQty);
			$(tbleRow).append(tablcol6);

			/*var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7)
					.html(
							'<input type="text" id="indent_quantity_id" placeholder="Enter Indent Quantity" class="form-control">');
			$(tbleRow).append(tablcol7);*/

			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			//<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"> update</i><i></a> 
			$(tablcol8)
			//
			// <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#registration"><i class="fa fa-plus"></i> Add labels</button>vv
					.append(
							' <button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-plus"></i> Indent Request</button> ');
			$(tablcol8).attr('onclick',
					'get_RowData("' + strData[i].drugId + '")');

			/*
			 * var tablcol6 = document.createElement("td");
			 * $(tablcol6).addClass('text-center');
			 * 
			 * $(tablcol6).append('<a href="#"><i class="fa fa-edit"
			 * data-toggle="modal" data-target="#update"></i><i></a> ');
			 * 
			 * 
			 * $(tablcol6).attr('onclick', 'get_RowData("' +
			 * strData[i].equipmentId + '","' + strData[i].equipmentName + '","' +
			 * strData[i].equipmentDesc + '","' + strData[i].equipmentType +
			 * '")');
			 * 
			 * 
			 * 
			 * var tablcol7 = document.createElement("td");
			 * $(tablcol7).addClass('text-center');
			 * 
			 * $(tablcol7).append('<a href="#"><i class="fa fa-trash"></i><i></a>
			 * '); $(tablcol7).attr('onclick', 'deleteEquipment()');
			 * 
			 * $(tablcol7).css('height', '5px');
			 */

			$(tbleRow).append(tablcol6);
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);

		}

		$("#AppendIntoTable").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}

function get_RowData(drugId) {
	console.log('get_RowData::'+drugId);
	$('#indetRequest').modal('show');
	$("#save_disable").attr("disabled", false);
	$("#view").attr("disabled", true);
	initilizeWithDefaultValue.drugId = drugId;
	
}

/*
 * @DESC : loadDataTable @AuthorName : Ranjeet kr. @DATE : 2020-02-10
 */
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				// "scrollY":"400px",
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
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
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
