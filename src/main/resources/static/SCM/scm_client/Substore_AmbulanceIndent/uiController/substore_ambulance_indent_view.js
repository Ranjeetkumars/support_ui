function ambulanceIndentView(strData) {
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

		$(objTHead1).html('Indent Number');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Indent Date');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('From Ambulance');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('To Central');
		$(objTr).append(objTHead4);
		// For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Status');
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement('th');
		$(objTHead6).html('User Name');
		$(objTr).append(objTHead6);

		var objTHead8 = document.createElement('th');
		$(objTHead8).html('Open Store Indent Issue');
		$(objTr).append(objTHead8);

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
			$(tablcol1).html(strData[i].indent_code);
			$(tbleRow).append(tablcol1);
			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].createdbydtm);
			$(tbleRow).append(tablcol2);
			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].retailer_counter_name);
			$(tbleRow).append(tablcol3);
			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].store_countername);
			$(tbleRow).append(tablcol4);
			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].indent_status_type);
			$(tbleRow).append(tablcol5);
			var tablcol6 = document.createElement("td");
			$(tablcol6).addClass('text-center');
			$(tablcol6).html(strData[i].username);
			$(tbleRow).append(tablcol6);
			
			var tablcol8 = document.createElement("td");
			$(tablcol8).addClass('text-center');
			$(tablcol8).append('<a href="SubstoreAmbulanceIssued.html"> <button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-plus"></i> Indent Issue</button></a> ');
			$(tablcol8).attr('onclick','get_RowData("' + strData[i].indent_code + '","' + strData[i].fromCounterid + '")');
			
			
			$(tbleRow).append(tablcol6);
			$(tbleRow).append(tablcol8);
			$(objTBody).append(tbleRow);
		}

		$("#indent_view").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}

function get_RowData(indentCode,fromCounterid){
	localStorage.setItem('indentCode', indentCode);
	localStorage.setItem("counterTypeId",fromCounterid);
	
}
