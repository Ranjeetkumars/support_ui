var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	loadGenericData();

});

function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	//$('#genericName').modal('show');
	
	
	$('#genericName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}




$('#generic_name_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^a-zA-Z ]/g))    
     return false;                        

});

$('#description_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^a-zA-Z ]/g))    
     return false;                        

});

function saveGenericName() {
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));

	var genericname = $('#generic_name_id').val();
	var description = $('#description_id').val();
	if (genericname == "" || genericname == '') {
		toastr.warning('Please enter generic name');
		return false;
	}
	if (description == "" || description == '') {
		toastr.warning('Please enter description');
		return false;
	}
	var strUrl = MASTER_END_POINT.saveGenericNames;
	
	
	
	
	console.log("Save generic name "+strUrl);
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify({
					"genericName" : genericname,
					"shortCode" : description,
					"moduleId" : moduleId,
					"roleId" : roleId,
					"userId" : userId,
					"status" : isStatus
				}),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					if (data.rtnReponseCount == "1"
							|| data.rtnReponseCount == 1) {
						toastr.info('Successfully saved');
						resetMaster();
						$('#genericName').modal('hide');
						loadGenericData();
					} else if (data.rtnReponseCount == "0"
							|| data.rtnReponseCount == 0) {
						toastr.info('vendor already exist');
						resetMaster();
						$('#genericName').modal('hide');
						loadGenericData();
					} else {
						toastr.info('Something went wrong! try again');
					}
				},
				error : function(err) {
					console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
					console.error('itemSearch  error: ' + JSON.stringify(err));
				}
			});

}

function loadGenericData() {


	var strUrl = MASTER_END_POINT.getdrugsName;
    console.log('loadGenericData'+strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			// console.log(data.objGenericNameControllerDTO);
			test(data.objGenericNameControllerDTO);
			loadDataTable();
		},
		error : function(err) {
			// console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function test(strData) {

	$('#appendIntoGenericTable').empty()

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
		$(objTHead2).html('Generic Name');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Description');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Status');
		$(objTr).append(objTHead4);

		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Update');
		$(objTr).append(objTHead5);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;

			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1).html(strData[i].genericId);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].genericName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].shortCode);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].status);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5)
//					.append(
//							'<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update">Update</i><i></a> ');
			
			.append('<button class="btn btn-primary btn-sm" data-toggle="modal"  data-target="#update"><i class="fa fa-edit p-r-xs"></i>Update</button>');
			$(tablcol5).attr(
					'onclick',
					'updateGenericRegistartion("' + strData[i].genericId
							+ '","' + strData[i].genericName + '","'
							+ strData[i].shortCode + '","' + strData[i].status
							+ '")');
			$(tablcol5).css('height', '5px');

			$(tbleRow).append(tablcol4);
			$(tbleRow).append(tablcol5);
			$(objTBody).append(tbleRow);
		}
		$("#appendIntoGenericTable").append(objDivTag);

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

var ggenericId;
function updateGenericRegistartion(genericId, genericName, description, status) {
	ggenericId = genericId;
	$("#save_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", true);
	$("#update_disable").attr("disabled", false);

	//$('#genericName').modal('show');
	
	
	$('#genericName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$('#generic_name_id').val(genericName);
	$('#description_id').val(description);
	
	if (status == "Active" || status == 'Active') {
		$('#myCheckbox').prop('checked', true);
	} else {
		$('#myCheckbox').prop('checked', false);
	}
	
	
	
}

function resetMaster() {
	$('#generic_name_id').val('');
	$('#description_id').val('');
}

function updateGenericDetails() {

	var genericName = $('#generic_name_id').val();
	var description = $('#description_id').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	
	var strUrl = MASTER_END_POINT.updateGenericName;

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"genericName" : genericName,
			"shortCode" : description,
			"status" : isStatus,
			"genericId" : ggenericId
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == "1" || data.rtnReponseCount == 1) {
				toastr.info('updated Successfully');
				resetMaster();
				$('#genericName').modal('hide');
				loadGenericData();
			} else {
				toastr.info('updated Successfully');
				resetMaster();
				$('#genericName').modal('hide');
				loadGenericData();
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}
