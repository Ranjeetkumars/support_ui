function loadBrands(strData) {

	$('#masterItems').empty()

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
		$(objTHead1).html('S.No');
		$(objTr).append(objTHead1);
		// For table Heading1

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Brand Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Status');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Update');
		$(objTr).append(objTHead4);

		
		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;

			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1).html(strData[i].brandId);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].brandName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].status);
			$(tbleRow).append(tablcol3);

		   var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4)
//					.append(
//							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update">Update</i><i></a> ');
			
			
			.append('<button class="btn btn-primary btn-sm" data-toggle="modal"  data-target="#update"><i class="fa fa-edit p-r-xs"></i>Update</button>');
			
			$(tablcol4).attr(
					'onclick',
					'getRowValues("' + strData[i].brandId
							+ '","' + strData[i].brandName + '","'
							+ strData[i].status + '")');
			$(tablcol4).css('height', '5px');

			$(tbleRow).append(tablcol3);
			$(tbleRow).append(tablcol4);
			$(objTBody).append(tbleRow);
		}
		$("#masterItems").append(objDivTag);

	} catch (err) {
		console.log("equipmentTableId" + err);
	}
}