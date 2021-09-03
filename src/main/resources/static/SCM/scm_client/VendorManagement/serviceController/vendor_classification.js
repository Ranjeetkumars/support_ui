var int_classification_id;

var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	// $('#supplirDom').empty();
	loadSupplierClassification();
});

function saveOrUpdateSupplierClass() {
	// $('#vendorClassificationTableId').DataTable().clear().destroy();
	 $('#serviceRemainder').empty();
	// console.log('classification_id'+int_classification_id);
	var classification_name = $('#calssification_name').val();
	var description = $('#description').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	if (classification_name == "" || classification_name == '') {
		toastr.error('Please enter classification name');
		return false;
	}
	if (description == "" || description == '') {
		toastr.error('Please enter description');
		return false;
	}
	var createdById = localStoreProperties.createdbyid;
	var createdByRoleId = localStoreProperties.createdbyroleid;
	var createdByModuleId = localStoreProperties.createdbymoduleid;
	var classificationId = 0;
	var operation_type;
	// var strUrl =
	// "http://localhost:2000/scmservice/itemApproval/saveorupdateSupplierClass";
	var strUrl = vendorManagement.saveorupdateSupplierClass;
	if (int_classification_id == undefined
			|| int_classification_id == 'undefined') {

		classificationId = 0;
		operation_type = 1;
	} else {
		classificationId = int_classification_id;
		operation_type = 0;
	}

	
	
	var jsonObj = {
		"classification_id" : classificationId,
		"classification_name" : classification_name,
		"classification_description" : description,
		"userId" : userId,
		"roleId" : roleId,
		"moduleId" : moduleId,
		"status" : isStatus,
		"operation_type" : operation_type
	}

	// console.log('strUrl::' + JSON.stringify(jsonObj));
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(jsonObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {

					$('#supplirDom').empty();
					if (data.rtnReponseCount == 1
							|| data.rtnReponseCount == '1') {
						toastr.info('Successfully saved');
						loadSupplierClassification();
						restSupplierClass();
						
					} else if (data.rtnReponseCount == 0
							|| data.rtnReponseCount == '0') {
						loadSupplierClassification();
						restSupplierClass();
						
						toastr.info('Vendor classification is alreday exist');
					}
				},
				error : function(err) {
					toastr.info('Something went wrong! try again'
							+ JSON.stringify(err));
				}
			});
}

function loadSupplierClassification() {
	 $('#serviceRemainder').empty();
	var strUrl = vendorManagement.loadSupplierClassification
	try {
		$
				.ajax({
					type : 'GET',
					url : strUrl,

					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {
						} else {
							loadSupplierDom(data.objSupplierClassificationControllerDTO);
							applayDataTableForVendorClassification();
						}
					},
					error : function(err) {
						console.error("Error in loadSupplierClassification"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in loadSupplierClassification' + err);
	}
}

function loadSupplierDom(jsonArray) {
    $('#serviceRemainder').empty();
	$("#disabled_update").attr("disabled", true);
	$('#serviceRemainder').DataTable().clear().destroy();
	for (var i = 0; i < jsonArray.length; i++) {
		$("#supplirDom")
				.append(
						'<tr><td>'
								+ jsonArray[i].classification_name
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].classification_description
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].status
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" onclick="updateSupplierClassification('
								+ jsonArray[i].classification_id
								+ ')"><span class="fa fa-edit"></span> Update</button></td>'
								+ '</tr>');

	}

}

function applayDataTableForVendorClassification() {

	// console.log("applayDaaTable function is executed");
	$('#vendorClassificationTableId').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						/*{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'ExampleFile'
						},*/
						// {extend: 'pdf', title: 'ExampleFile'},
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

function updateSupplierClassification(classification_id) {

	$("#disabled_save").attr("disabled", true);
	$("#disabled_reset").attr("disabled", true);
	$("#disabled_update").attr("disabled", false);

	$('#calssification_name').val('');
	$('#description').val('');
	// $('#myCheckbox').attr('checked', false);
	// var strUrl =
	// "http://localhost:2000/scmservice/itemApproval/loadSupplierClassificationBasedId";
	var strUrl = vendorManagement.loadSupplierClassificationBasedId;
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify({
					"classification_id" : classification_id
				}),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var jsonArr = data.objSupplierClassificationControllerDTO;

					int_classification_id = jsonArr[0].classification_id;

					$('#calssification_name').val(
							jsonArr[0].classification_name);

					$('#description')
							.val(jsonArr[0].classification_description);
					console.log("STATUS----->" + jsonArr[0].status);

					if (jsonArr[0].status == "Active"
							|| jsonArr[0].status == 'Active') {
						$('#myCheckbox').prop('checked', true);
					} else {
						$('#myCheckbox').prop('checked', false);
					}

				},
				error : function(err) {
					// console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
					console.error('itemSearch  error: ' + JSON.stringify(err));
				}
			});

}

function restSupplierClass() {
	$('#calssification_name').val('');
	$('#description').val('');
	$('#myCheckbox').attr('checked', false);

}
