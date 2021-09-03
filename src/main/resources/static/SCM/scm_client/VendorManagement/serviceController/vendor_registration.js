var int_classification_id;
function openModalBoxForRegistration_and_update() {

	// $('#registration').modal('show');
	$('#registration').modal({
		backdrop : 'static',
		keyboard : true
	})

	restSuppliers();
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", false);
}
var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");

	loadSuppliers();

});

function loadSuppliers() {

	var strUrl = vendorManagement.loadSuppliers;
	console.log('strUrl::' + strUrl);
	try {
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					loadSupplierDom(data.objControllerDto);
					applayDataTable();
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

	// $("#disabled_update").attr("disabled", true);
	// $('#serviceRemainder').empty();
	// $('#serviceRemainder').DataTable().clear().destroy();

	$('#serviceRemainder').dataTable().fnClearTable();
	$('#serviceRemainder').dataTable().fnDestroy();
	for (var i = 0; i < jsonArray.length; i++) {
		$("#supplirDom")
				.append(
						'<tr><td>'
								+ jsonArray[i].supplierId
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].supplierName
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].isActive
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" onclick="getSupplierDetailsBasedOnId('
								+ jsonArray[i].supplierId
								+ ')"><span class="fa fa-edit"></span> Update</button></td>'
								+ '</tr>');

	}

}

function applayDataTable() {
	$('#serviceRemainder').DataTable(
			{
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						/*
						 * { extend : 'copy' }, { extend : 'csv' }, { extend :
						 * 'excel', title : 'ExampleFile' }
						 */,
						// {extend: 'pdf', title: 'ExampleFile'},
						{
							// extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]

			});
}

function saveSuppliers() {

	var rtnsupplierJsonObj = suppliersValidation();

	if (rtnsupplierJsonObj == false || rtnsupplierJsonObj == 'false') {
		return;
	}

	console.log('@@@@@@@@@@@@@@@@@@@@' + JSON.stringify(rtnsupplierJsonObj));
	var strUrl = vendorManagement.saveSupplier;
	console.log("saveSupplier::" + strUrl);
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(rtnsupplierJsonObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					if (data.rtnReponseCount == "1"
							|| data.rtnReponseCount == 1) {
						toastr.info('Successfully saved');
						$('#registration').modal('hide');
						loadSuppliers();
					} else if (data.rtnReponseCount == "0"
							|| data.rtnReponseCount == 0) {
						toastr.info('vendor already exist');
						$('#registration').modal('hide');
						loadSuppliers();
					} else {
						toastr.error('Something went wrong!');
					}
				},
				error : function(err) {
					console.error('itemSearch  error: ' + JSON.stringify(err));
				}
			});

}

function loadStateBasedOnCountryId() {
	console.log("loadStateBasedOnCountryId function is executed");
	$('#state_id').empty();
	var country_id = $("#country_id").val();
	var strUrl = vendorManagement.loadState;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"countryid" : country_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				var jsonArray = data.objSupplierControllerDTO;
				var selectfirst = "<option value='0'>Select State</option>";
				$('#state_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var state = "<option value=" + resData.stateid + ">"
							+ resData.stateName + "</option>";
					$(state).appendTo('#state_id');
				});
			}
		},
		error : function(err) {
			console.error('loadStateBasedOnCountryId  error: '
					+ JSON.stringify(err));
		}
	});
	$('#state_id').trigger("chosen:updated");
	$('#state_id').chosen();
}

function suppliersValidation() {
	var vendorName = $('#vendor_name').val();
	var classification = $('#classification_id').val();
	var country = $('#country_id').val();
	var state = $('#state_id').val();
	var district = $('#district_id').val();
	var city = $('#city_id').val();
	console.log('city id::' + city);
	var zip = $('#zip_code').val();
	console.log('zip::' + zip);
	var address = $('#address_id').val();
	var house = $('#house_no').val();
	var pincode = $('#pin_code').val();
	var contactPerson = $('#contact_person').val();
	var telephoneNo = $('#telephone_id').val();
	var fax = $('#fax').val();
	var email = $('#email_id').val();
	var mobile_no = $('#mobile_no_id').val();
	var web_site = $('#web_site_id').val();
	var license = $('#license_no').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));

	if (vendorName == "" || vendorName == '') {
		toastr.error("Please enetr vendor name");
		return false;
	} else {
		var regex = /^[a-zA-Z ]{3,30}$/;
		if (!regex.test(vendorName)) {
			toastr.error('Please  enetr valid vendor name');
			return false
		}
	}

	if (classification == "0" || classification == 0 || classification == '0'
			|| classification == null || classification == undefined) {
		toastr.error("Please select classification");
		return false;
	}

	if (country == "0" || country == 0 || country == '0' || country == null
			|| country == undefined) {
		toastr.error("please select country");
		return false;
	}

	if (state == "0" || state == 0 || state == '0' || state == null
			|| state == undefined) {
		toastr.error("Please select state");
		return false;
	}

	if (telephoneNo == "" || telephoneNo == '') {
		toastr.error("Please enter telephoneNo");
		return false;
	} else {
		var phoneRegEx = /^[6-9]\d{9}$/;
		if (!phoneRegEx.test(telephoneNo)) {
			toastr.error('Please enter valid telephoneNo');
			return false
		}
	}

	var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailRegEx.test(email)) {
		toastr.error("Please enter valid email");
		return false
	}

	// not mandatory field passing default value
	if (pincode == "" || pincode == '') {
		pincode = 0;
	} else {
		var pinCodeRegEx = /^[1-9][0-9]{5}$/
		if (!pinCodeRegEx.test(pincode)) {
			toastr.error("Please enter valid pin code");
			return false
		}
	}

	if (contactPerson == "" || contactPerson == '') {
		contactPerson = "¥";
	} else {
		var regex = /^[a-zA-Z ]{3,30}$/;
		if (!regex.test(contactPerson)) {
			toastr.error('Please  enetr valid contact person');
			return false
		}
	}

	if (mobile_no == "" || mobile_no == '') {
		mobile_no = "¥";
	}

	if (license == "" || license == '') {
		license = "¥";
	}

	if (web_site == "" || web_site == '') {
		web_site = "¥";
	}

	if (fax == "" || fax == '') {
		fax = "¥";
	}

	if (district == null) {
		district = 0;
	}

	if (city == null) {
		city = 0;
	}

	if (zip == null) {
		zip = 0;
	}

	if (address == null) {
		address = 0;
	}

	if (house == null) {
		house = 0;
	}

	if (int_classification_id == undefined
			|| int_classification_id == 'undefined' ||int_classification_id=='0') {
		var supplierJsonObj = {
			"suppliername" : vendorName,
			"countryid" : country,
			"stateid" : state,
			"districtid" : district,
			"mandalid" : zip,
			"cityid" : city,
			"localityid" : address,
			"landmarkid" : house,
			"email" : email,
			"website" : web_site,
			"licensenumber" : license,
			"telephone" : telephoneNo,
			"mobile" : mobile_no,
			"fax" : fax,
			"pincode" : pincode,
			"userid" : userId,
			"roleid" : roleId,
			"moduleid" : moduleId,
			"status" : isStatus,
			"contactperson" : contactPerson,
			"classificationid" : classification
		};
		return supplierJsonObj;
	}

	else {
		var supplierJsonObj = {
			"supplierId" : int_classification_id,
			"suppliername" : vendorName,
			"countryid" : country,
			"stateid" : state,
			"districtid" : district,
			"mandalid" : zip,
			"cityid" : city,
			"localityid" : address,
			"landmarkid" : house,
			"email" : email,
			"website" : web_site,
			"licensenumber" : license,
			"telephone" : telephoneNo,
			"mobile" : mobile_no,
			"fax" : fax,
			"pincode" : pincode,
			"status" : isStatus,
			"contactperson" : contactPerson,
			"classificationid" : classification
		};

		return supplierJsonObj;
	}

}

function restSuppliers() {
	$("#classification_id").val('').trigger("chosen:updated");
	$("#country_id").val('').trigger("chosen:updated");
	$("#state_id").val('').trigger("chosen:updated");
	$("#district_id").val('').trigger("chosen:updated");
	$("#city_id").val('').trigger("chosen:updated");
	$("#address_id").val('').trigger("chosen:updated");
	$("#house_no").val('').trigger("chosen:updated");
	$('#pin_code').val('');
	$('#contact_person').val('');
	$('#telephone_id').val('');
	$('#fax').val('');
	$('#email_id').val('');
	$('#mobile_no_id').val('');
	$('#web_site_id').val('');
	$('#license_no').val('');

}
function getSupplierDetailsBasedOnId(classification_id) {
	// $('#registration').modal('show');

	
	$("#reset_disable").attr("disabled", true);
	$("#update_disable").attr("disabled", false);
	$("#save_disable").attr("disabled", true);

	console.log("@@@@@@@@@@@@@@@@@@@" + classification_id);

	var strUrl = vendorManagement.getSupplier;
	console.log('supplierId::' + classification_id);
	console.log('getSupplierDetailsBasedOnId' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"supplierId" : classification_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			if (data.status == "NO_DATA_FOUND"
					|| data.status == 'NO_DATA_FOUND') {
				toastr.error('Something went wrong!!');

			} else {
				var jsonArray = data.objSupplierControllerDTO;
				int_classification_id = classification_id;
				appendDataForUpdate(jsonArray);
			}

		},
		error : function(err) {

			console.error('loadLocality  error: ' + JSON.stringify(err));
		}
	});

}

function appendDataForUpdate(jsonArray) {
	console.log(JSON.stringify(jsonArray));
	
	//open model box
	$('#registration').modal({
		backdrop : 'static',
		keyboard : true
	})
	
	$('#vendor_name').val(jsonArray[0].suppliername);
	$('#pin_code').val(jsonArray[0].pincode);
	$('#contact_person').val(jsonArray[0].contactperson);
	$('#telephone_id').val(jsonArray[0].telephone);
	$('#fax').val(jsonArray[0].fax);
	$('#email_id').val(jsonArray[0].email);
	$('#mobile_no_id').val(jsonArray[0].mobile);
	$('#web_site_id').val(jsonArray[0].website);
	$('#license_no').val(jsonArray[0].licensenumber);

	$(
			"#classification_id option:contains("
					+ jsonArray[0].classificationName + ")").attr('selected',
			'selected').trigger("chosen:updated");

	$("#country_id option:contains(" + jsonArray[0].countryName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	loadStateBasedOnCountryId();

	$("#state_id option:contains(" + jsonArray[0].stateName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	loadDistrict();

	$("#district_id option:contains(" + jsonArray[0].districtName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	loadCity();
	console.log("@@@@@@@@@@@@@@@@--->" + jsonArray[0].mandalName);
	$("#city_id option:contains(" + jsonArray[0].mandalName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	loadZipCode();

	$("#zip_code option:contains(" + jsonArray[0].zipCode + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	loadLocality();
	$("#address_id option:contains(" + jsonArray[0].localityName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	loadLandmark();
	$("#house_no option:contains(" + jsonArray[0].landmarkName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

	if (jsonArray[0].status == "Active" || jsonArray[0].status == 'Active') {
		$('#myCheckbox').prop('checked', true);
	} else {
		$('#myCheckbox').prop('checked', false);
	}

}

function updateSupplier() {
	console.log('supplier Ids::' + int_classification_id);
	var rtnvalidationStatus = suppliersValidation();
	if (rtnvalidationStatus == false || rtnvalidationStatus == 'false') {
		return false;
	}
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
			+ JSON.stringify(rtnvalidationStatus));
	var strUrl = "http://localhost:2000/scmservice/SupplierController/updateSupplier";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnvalidationStatus),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('datadata::' + JSON.stringify(data))
			if (data.rtnReponseCount == 1 || data.rtnReponseCount == "1") {
				toastr.info('Vendor Details updated successfully');
				$('#registration').modal('hide');
				restSuppliers();
				loadSuppliers();
			} else {
				toastr.error('Error at update');
			}
		},
		error : function(err) {
			console.error('loadLocality  error: ' + JSON.stringify(err));
		}
	});

}

// vendor Registration validation

$('#pin_code').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;

});

$('#telephone_id').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;

});

$('#fax').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;

});

$('#mobile_no_id').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;

});

$('#license_no').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9,a-z,A-Z]/g))
		return false;

});
