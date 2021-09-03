var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");

	loadIndentStatus();
	loadStores();
	centralSubStore();
});
var currentDate;
$(function() {
	$("#today_date_id").click(function() {
		if ($(this).is(":checked")) {
			console.log('checked');
			currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
			// $('#mydate').datepicker('enable');
		} else {
			currentDate = 'undefined';
			console.log('unchecked');
		}
	});
});

function loadIndentStatus() {
	console.log("loadIndentStatus");
	//var strUrl = "http://localhost:2000/scmservice/indentItemListController/loadIndentStatus";
	var strUrl =  subStoreAmbulance.loadIndentStatus;
	$('#indent_sttaus_id').empty();
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objIndentItemListControllerDTO;
				var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";
				$('#indent_sttaus_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var loadIndentStatus = "<option value="
							+ resData.indentStatus + ">"
							+ resData.indent_status_type + "</option>";
					$(loadIndentStatus).appendTo('#indent_sttaus_id');
				});
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadIndentStatus  error: ' + JSON.stringify(err));
		}
	});
	$('#indent_sttaus_id').trigger("chosen:updated");
	$('#indent_sttaus_id').chosen();

}

// http://localhost:2000/scmservice/expiryDrugsController/loadStores

function loadStores() {
	console.log("loadIndentStatus");
	//var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/loadStores";
	var strUrl =subStoreAmbulance.loadStores;
	$('#sub_store_id').empty();
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objControllerDto;
				var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";
				$('#sub_store_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var loadIndentStatus = "<option value=" + resData.countryId
							+ ">" + resData.countryName + "</option>";
					$(loadIndentStatus).appendTo('#sub_store_id');
				});
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadIndentStatus  error: ' + JSON.stringify(err));
		}
	});
	$('#sub_store_id').trigger("chosen:updated");
	$('#sub_store_id').chosen();

}

function centralSubStore() {
	console.log("loadIndentStatus");
	//var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/loadStores";
	var strUrl =subStoreAmbulance.loadStores;
	$('#central_sub_store_id').empty();
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objControllerDto;
				var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";
				$('#central_sub_store_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var loadIndentStatus = "<option value=" + resData.countryId
							+ ">" + resData.countryName + "</option>";
					$(loadIndentStatus).appendTo('#central_sub_store_id');
				});
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadIndentStatus  error: ' + JSON.stringify(err));
		}
	});
	$('#central_sub_store_id').trigger("chosen:updated");
	$('#central_sub_store_id').chosen();

}

// http://localhost:2001/scmservice/indentViewController/load_to_store

function load_to_store() {
	$('#central_sub_store_id').empty();
	//var strUrl = "http://localhost:2000/scmservice/indentViewController/load_to_store";
	var strUrl = subStoreAmbulance.load_to_store;
	var fromsubStoreId = $('#sub_store_id').val();
	console.log('fromsubStoreId value::' + fromsubStoreId);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"counterId" : 99999
		// In Old Scm Code they are passing static value as 99999
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objIndentViewControllerDTO;
				var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";
				$('#central_sub_store_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var substore = "<option value=" + resData.counterId + ">"
							+ resData.counterName + "</option>";
					$(substore).appendTo('#central_sub_store_id');
				});
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadDistrict  error: ' + JSON.stringify(err));
		}
	});
	$('#central_sub_store_id').trigger("chosen:updated");
	$('#central_sub_store_id').chosen();

}

function loadIndentRaisedSearch() {

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + currentDate);

	var intFromStore = 0;
	var intToStore = 0;

	var fromDate = $('#from_Date_id').val();
	var todate = $('#to_date_id').val();
	var subStore = $('#sub_store_id').val();
	var centralSubStore = $('#central_sub_store_id').val();
	var indentStatus = $('#indent_sttaus_id').val();

	var changeFromDateFormate = "¥";
	var changeToDateFormate = "¥";
	CommonUtils.Status_Issued = indentStatus //initilizing with indentStatus  for verfied indent issued
	console.log('fromDate::' + fromDate);
	console.log('todate::' + todate);
	console.log('subStore::' + subStore);
	console.log('centralSubStore::' + centralSubStore);
	console.log('indentStatus::' + indentStatus);
	console.log('currentDate::' + currentDate);

	if (fromDate == "" && todate == "" && subStore == 0 && centralSubStore == 0
			&& indentStatus == 0 && currentDate == undefined) {
		toastr.warning('Please select any search criteria');
		return false;
	}
	
	else if (indentStatus != 0) {
		subStore = 0;
		centralSubStore = 0;
	} 
	else if (currentDate != undefined) {
		changeFromDateFormate = currentDate;
		changeToDateFormate = currentDate;
		subStore = 0;
		centralSubStore = 0;
		indentStatus = 0;
	} 
	else if (fromDate != "" && todate == "") {
		toastr.warning('Please select To Date');
		return false;

	} 
	else if (todate != "" && fromDate == "") {
		toastr.warning('Please select From Date');
		return false;

	}
	else if (todate != "" &&fromDate != "") {
		changeFromDateFormate = fromDate;
		changeToDateFormate = todate;

	}

	
	else if (subStore != "0" && centralSubStore == "0") {
		toastr.warning('Please select To Store');
	   return false;
	  
	 
	 }
	else if (centralSubStore != "0" &&  subStore == "0")
	 { 
		toastr.warning('Please select From Store'); return
	 false; 
		}
	 console.log("@@@@@@@@@@@@@@@@@@@@  changeFromDateFormate::"+changeFromDateFormate);
	 console.log("@@@@@@@@@@@@@@@@@@@@  changeToDateFormate::"+changeToDateFormate);

	//var strUrl = "http://localhost:2000/scmservice/indentItemListController/loadIndentRaisedSearch";
	var strUrl = subStoreAmbulance.loadIndentRaisedSearch;
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify({
					"from_date" : changeFromDateFormate,
					"to_date" : changeToDateFormate,
					"from_store" : intFromStore,
					"to_store" : intToStore,
					"indentStatus" : indentStatus
				}),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					console.log('data::' + JSON.stringify(data));

					console.log('json values::'
							+ JSON
									.stringify(data.objIndentItemListControllerDTO));

					if (data.responseCode == 200 || data.responseCode == '200') {
						$('#ambulance_indent_verif_id').empty();
						listOfAmbulanceIndentVerifed(data.objIndentItemListControllerDTO);
						applayDataTable();
						clearAll();
					} else {
						toastr.info('No indents found');
						$('#indent_Serach').dataTable().fnClearTable();
						$('#indent_Serach').dataTable().fnDestroy();

					}

				},
				error : function(err) {
					toastr.error("Something went wrong! try again"
							+ JSON.stringify(err));
					console
							.error('loadDistrict  error: '
									+ JSON.stringify(err));
				}
			});

}
var indentNumbers = [];
$('#indent_Serach').click(function() {
	
	$.each($("input[name='indent_searc_name']:checked"), function() {
		indentNumbers.push($(this).val());
	});
	console.log("My indentNumbers are: " + indentNumbers.toString());
	console.log('length::' + indentNumbers.length);
});

function clearAll() {
	console.log('clearAll function is executed');
	$('#from_Date_id').val('');
	$('#to_date_id').val('');
	$("#sub_store_id").val('').trigger("chosen:updated");
	$("#central_sub_store_id").val('').trigger("chosen:updated");
	$("#indent_sttaus_id").val('').trigger("chosen:updated");
	$('input[type=checkbox]').prop('checked', false);
}

$(function() {
	$('#save_value').click(function() {
		var val = [];
		$(':checkbox:checked').each(function(i) {
			val[i] = $(this).val();
		});
	});
});

function listOfAmbulanceIndentVerifed(arrData) {
	$('#indent_Serach').dataTable().fnClearTable();
	$('#indent_Serach').dataTable().fnDestroy();
	for (var i = 0; i < arrData.length; i++) {
		$('#ambulance_indent_verif_id')
				.append(
						'<tr>'
								+ '<td><label class="check"> <input type="checkbox" name="indent_searc_name" '
								+ 'value='+arrData[i].indent_code+'> <span class="checkmark"></span>'
								+ '</label></td>' + '<td>'+arrData[i].indent_code+'</td>'
								+ '<td>'+arrData[i].createdbydtm+'</td>' + '<td>'+arrData[i].retailer_counter_name+'</td>'
								+ '<td>'+arrData[i].store_countername+'</td>' + '<td>'+arrData[i].indent_status_type+'</td>'
								+ '<td>'+arrData[i].username+'</td>' + '</tr>');
	}
}
//
function applayDataTable() {
	$('#indent_Serach').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
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
						 {extend: 'pdf', title: 'ExampleFile'},
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


function updateIndentStatus(){
	console.log('updateIndentStatus function is executd');
	console.log("@@@@@@@@@@@@@@@@@@@@@@:"+indentNumbers.length);
	if(indentNumbers.length==0 || indentNumbers.length== '0'){
		toastr.warning('Please select any Indent');
		return false;
	}
	if(CommonUtils.Status_Issued != 5 || CommonUtils.Status_Issued != '5'){
		toastr.warning('Please select indent issued only for verify');
		return false;
	}
	
	var len  = indentNumbers.length;
	var strindentNumbers = indentNumbers.toString();
	
	//var strUrl = "http://localhost:2000/scmservice/indentViewController/updateIndentStatus";
	var strUrl = subStoreAmbulance.updateIndentStatus;
		$.ajax({type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(
					{ "size":len,
					"indentNumber":strindentNumbers }),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					console.log('data::' + JSON.stringify(data));
					if(data.rtnReponseCount ==1||data.rtnReponseCount =='1'){
						 toastr.success('Indents verified successfully');
					}
					else{
						toastr.success('Something went wrong! try Again');
					}
					
                     
				},
				error : function(err) {
					toastr.error("Something went wrong! try again"
							+ JSON.stringify(err));
					console
							.error('loadDistrict  error: '
									+ JSON.stringify(err));
				}
			});

	
	
}