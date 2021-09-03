
function unmappedDrugs(strData) {
	$('#equipmentTableId').empty();
	console.log('equipment_DOM function is executed');
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

		// $(objTHead1).html('<label class="check "><span style=" color:
		// white;margin-left: -31px;">Short Code</span> <input type="checkbox"
		// id="selectall" onclick="multipleCheckBox()"> <span
		// class="checkmark"></span>');
		$(objTHead1).html('Short Code');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Item Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Brand Name');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Material Form');
		$(objTr).append(objTHead4);
		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Strength');
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Manufacturer');
		$(objTr).append(objTHead6);

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Map to Vendor');
		$(objTr).append(objTHead7);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		/*
		 * "serialId": "56", "drugName": "CO-10", "drugbrandLang": "OPA-1",
		 * "shortCode": "Others", "formType": "Consumables", "strengthType":
		 * "NA", "companyName": "Others"
		 */

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;

			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			// $(tablcol1).html('<label class="check "><input type="checkbox"
			// id="myCheck12" class="case" value=' + strData[i].equipmentId + '
			// name="case" )" ><span class="checkmark"> </label>');
			$(tablcol1).html(strData[i].drugName);
			$(tbleRow).append(tablcol1);
			// $(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].drugbrandLang);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].shortCode);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].formType);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].companyName);
			$(tbleRow).append(tablcol5);

			/*
			 * var tablcol9 = document.createElement("td");
			 * $(tablcol9).addClass('text-center');
			 * $(tablcol9).html(strData[i].companyName);
			 * $(tbleRow).append(tablcol9);
			 */

			/*
			 * var tablcol6 = document.createElement("td");
			 * $(tablcol6).addClass('text-center'); $(tablcol6).append('<a
			 * href="#"><i class="fa fa-edit" data-toggle="modal"
			 * data-target="#update"></i><i></a> ');
			 * $(tablcol6).attr('onclick', 'get_RowData("' +
			 * strData[i].equipmentId + '","' + strData[i].equipmentName + '","' +
			 * strData[i].equipmentDesc + '","' + strData[i].equipmentType +
			 * '")');
			 */

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].strengthType);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7)
					.append(
							'<a href="#">Map Vendor</a> ');
			$(tablcol7).attr(
					'onclick',
					'updateDrugSupplierMapping("' + strData[i].serialId + '","'
							+ strData[i].drugName + '","'
							+ strData[i].shortCode + '","'
							+ strData[i].drugbrandLang + '")');
			$(tablcol7).css('height', '5px');

			$(tbleRow).append(tablcol6);
			$(tbleRow).append(tablcol7);
			$(objTBody).append(tbleRow);
		}
		$("#equipmentTableId").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}

function mappedDrugs(strData) {
	$('#mapped_table_id').empty();
	console.log('equipment_DOM function is executed');
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

		// $(objTHead1).html('<label class="check "><span style=" color:
		// white;margin-left: -31px;">Short Code</span> <input type="checkbox"
		// id="selectall" onclick="multipleCheckBox()"> <span
		// class="checkmark"></span>');
		$(objTHead1).html('Short Code');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Item Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Brand Name');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Material Form');
		$(objTr).append(objTHead4);
		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Strength');
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('Manufacturer');
		$(objTr).append(objTHead6);

		var objTHead7 = document.createElement('th');
		$(objTHead7).html('Unmap to Vendor');
		$(objTr).append(objTHead7);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		/*
		 * "serialId": "56", "drugName": "CO-10", "drugbrandLang": "OPA-1",
		 * "shortCode": "Others", "formType": "Consumables", "strengthType":
		 * "NA", "companyName": "Others"
		 */

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;

			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			// $(tablcol1).html('<label class="check "><input type="checkbox"
			// id="myCheck12" class="case" value=' + strData[i].equipmentId + '
			// name="case" )" ><span class="checkmark"> </label>');
			$(tablcol1).html(strData[i].unicCode);
			$(tbleRow).append(tablcol1);
			// $(tablcol1).attr('onclick', 'onclickCheckbox()');

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].drugName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].drugBarndlang1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].fromType);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].strength);
			$(tbleRow).append(tablcol5);

			/*
			 * var tablcol9 = document.createElement("td");
			 * $(tablcol9).addClass('text-center');
			 * $(tablcol9).html(strData[i].companyName);
			 * $(tbleRow).append(tablcol9);
			 */

			/*
			 * var tablcol6 = document.createElement("td");
			 * $(tablcol6).addClass('text-center'); $(tablcol6).append('<a
			 * href="#"><i class="fa fa-edit" data-toggle="modal"
			 * data-target="#update"></i><i></a> ');
			 * $(tablcol6).attr('onclick', 'get_RowData("' +
			 * strData[i].equipmentId + '","' + strData[i].equipmentName + '","' +
			 * strData[i].equipmentDesc + '","' + strData[i].equipmentType +
			 * '")');
			 */

			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].companyname);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).addClass('text-center');
			$(tablcol7).append(
					'<a href="#">Unmap</a> ');
			$(tablcol7).attr('onclick', 'unmapppe(' + strData[i].drugId + ')');
			$(tablcol7).css('height', '5px');

			$(tbleRow).append(tablcol6);
			$(tbleRow).append(tablcol7);
			$(objTBody).append(tbleRow);
		}
		$("#mapped_table_id").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}

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
//						{
//							extend : 'copy'
//						},
//						{
//							extend : 'csv'
//						},
//						{
//							extend : 'excel',
//							title : 'TyreLifeData'
//						},
//						{
//							extend : 'pdf',
//							title : 'TyreLifeData'
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
