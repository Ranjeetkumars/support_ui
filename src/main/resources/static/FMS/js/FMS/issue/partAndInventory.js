/**
 * @author:Bhuneshwar Patel
 * 
 */

/**
 * @functionality:Adding parts and inventory details.
 * @returns status 200 ok if inserted Successfully.
 */
function addPartsAndInventory(){
	console.log("add parts and Inventoey function Calling.");
	var partNumber=$('#partnoid').val();
	var category=$('#categoryid').val();
	var manufacture=$('#manufactureid').val();
	var manuFacturePart=$('#manufacturpartid').val();
	var description=$('#descriptionid').val();
	var manufactureUnit=$('#manufactureUnitId').val();
	var measurementUnit=$('#measurementUnitId').val();
	var upc=$('#upcid').val();// Barcode
	var unitCost=$('#unitcostid').val();
	var obJson={
			    "partnumber":partNumber,
				"category":category,
				"manufacture":manufacture,
				"manufacturePart":manuFacturePart,
				"description":description,
				"manufactureUnit":manufactureUnit,
				"measurementUnit":measurementUnit,
				"UPC":upc,
				"unitCost":unitCost
	     }
	   console.log("JSON------>"+JSON.stringify(obJson));
	   var strUrl = "http://192.168.1.191:8085/FleetManagement/partAndInventoryController/insertUpdateAndDeleteParts";
	   $.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(obJson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Sucessfully Inserted...");
			// showNotificationError("Successfully Inserted ",
			// "saveissuesBtn","success");
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	})
  }


/**
 * @functionality:reset part and Inventory Details
 * @returns
 */
function resetAddPartInventoryDetails(){
	console.log("reset add part and inventory function Calling.");
	$('#partnoid').val("");
	$('#categoryid').val("0").trigger("chosen:updated");
	$('#manufactureid').val("0").trigger("chosen:updated");
	$('#manufacturpartid').val("");
	$('#descriptionid').val("");
	$('#manufactureUnitId').val("");
	$('#measurementUnitId').val("");
	$('#upcid').val("");
	$('#unitcostid').val("");
	
}

/**
 * @functionality:reset part and Inventory Details
 * @returns
 */
function updateAddPartInventoryDetails(){
	console.log("update part and inventory function calling.....");
}


/**
 * @Date:-31/12/2019
 * @Functionality:getIssuesList
 * @returns:-List of Issues
 */
function getIssuesList() {
	$("#deleteButtonID").hide();
	$('#issuesList').empty();
	var strUrl = "http://192.168.1.191:8085/FleetManagement/issuesController/getIssuesList";
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		contentType : "application/json",
		async : false,
		success : function(data) {
			console.log("Data--->" + JSON.stringify(data));
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				$('#vehicleList_Id').empty();
				$("#deleteButtonID").hide();
				var divTag = document.createElement("h2");
				$(divTag).css("text-align", "center");
				$(divTag).html("No Data Available");
				$('#issuesList').append(divTag);
			} else {
				var jsonArray = data.issuesControlllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
					getIssuesListData(jsonArray);
					loadDataTable1()
				} else {
				}
			}
		},
		error : function() {
			console.log('In Error of  Details');
		}
	})

}

// dom function calling...
function getIssuesListData(strData) {
	$("#deleteButtonID").hide();
	$('#issuesList').empty();
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example1");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");
		/*
		 * $(objTHead1).html('<label class="check "> <span style=" color:
		 * white">Select</span><input type="checkbox" id="selectall"
		 * onclick="multipleCheckBox()"><span class="checkmark"></span></label>');
		 */
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select </span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTHead1).addClass("text-center");
		$(objTr).append(objTHead1);

		var objTHead2 = document.createElement("th");
		$(objTHead2).html("Vehicle Name");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Issues Type");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Schedule Status");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Status");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Edit");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Delete");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			/*
			 * $(tablcol1).html('<label class="check "> <span style=" color:
			 * white">Select</span><input type="checkbox" value=' +
			 * strData[i].serialno +' id="case"><span class="checkmark"></span></label>');
			 */
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].ist_serialid
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].vehiclename);
			console.log('vehiclename' + strData[i].vehiclename);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].issue_type);
			console.log(' issue_type' + strData[i].issue_type);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].schedule_type);
			console.log(' schedule_type' + strData[i].schedule_type);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].ist_issue_statusid);
			console.log(' ist_issue_desc' + strData[i].ist_issue_statusid);
			$(tbleRow).append(tablcol5);

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<a href="#" data-toggle="modal" data-placement="bottom" data-target="#edit" title="View"><i class="fa fa-edit"></i></a');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'editIssues("' + strData[i].ist_serialid + '","'
							+ strData[i].vehiclename + '","'
							+ strData[i].issue_type + '","'
							+ strData[i].ist_issue_date + '","'
							+ strData[i].ist_issue_summary + '","'
							+ strData[i].ist_issue_desc + '","'
							+ strData[i].ist_issue_reportedby + '","'
							+ strData[i].ist_issue_assignedby + '","'
							+ strData[i].ist_odo_at_issue + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#delete" ></span>');
			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteIssues("' + strData[i].ist_serialid + '")');

			localStorage.setItem('test', strData[i].ist_serialid);

			$(objTBody).append(tbleRow);

		}

		$("#issuesList").append(objDivTag);
		$("#deleteButtonID").show();

	} catch (err) {
		console.log("example" + err);
	}
}

// dataTable
function loadDataTable1(tableClass) {
	$('.dataTables-example1').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
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

