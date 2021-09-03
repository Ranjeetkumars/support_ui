/**
 * author:Bhuneshwar Patel date 17/12/2019
 */

// this function reading selected checkbox..
function deleteMultipleVendorContactDetails() {
	// alert("deleteMultipleContactchkboxReading function calling...")
	// empty(chkArray);
	var chkArray = [];
	// empty(chkArray);
	// look for all checkboes that have a parent id called 'checkboxlist'
	// attached to it and check if it was checked
	$("#tbodyData input:checked").each(function() {
		chkArray.push($(this).val());
	});

	// we join the array separated by the comma
	var selected;
	selected = chkArray.join(',');
	// check if there is selected checkboxes, by default the length is 1 as it
	// contains one single comma
	if (selected.length > 0) {
		$("#deleteButtonID").show();
		console.log("selected----->" + selected);
		$('#sericalID').val(selected);
		$('#delete').modal('show');
	} else {
		alert("Please at least check one of the checkbox");
	}

}

//For Button enable and Disable
function forEnableAndDisableButton() {
	var chkArray = [];
	$("#tbodyData input:checked").each(function() {
		chkArray.push($(this).val());
	});
	var selected;
	selected = chkArray.join(',');
	if (selected.length > 0) {
		$("#deleteButtonID").show();
		// alert("You have selected " + selected);
		console.log("selected----->" + selected);
		//multipledeleteVendorDetails(selected);
	} else {
		$("#deleteButtonID").hide();
		//alert("Please at least check one of the checkbox");
	}
}

// this function using for multiple select checkbox.
function multipleCheckBox() {
	// alert("multipleCheckBox function calling...")
	$('#reg_no').val('');
	$("#selectall").change(function(event) {
		$('.case').attr('checked', this.checked);
		if ($(this).is(":checked")) {
			$('#reg_no').val('');
			$('.case').prop("checked", true);
			event.preventDefault();
			var searchIDs = $(".case:checkbox:checked").map(function() {
				console.log("selected Contact====" + searchIDs)
				$("#deleteButtonID").show();
				return $(this).val();
			}).get();
			$('#reg_no').val(searchIDs);
		}else{
			$("#deleteButtonID").hide();
		}
	});

}

// single checkbox reading
function onclickCheckbox() {
	// alert("onclickCheckbox function calling...")
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		// console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " +
		// $(this).val());
		console.log("myCheck12:---" + $(this).val());
		arrSelectedData.push($(this).val());
		// console.log("onclickCheckbox------>"+onclickCheckbox)
		count++;
		$('#reg_no').val(arrSelectedData);
	});
	if ($(".case").length === $(".case:checked").length) {
		// $("#selectall").attr("checked", "checked");
		$("#selectall").prop("checked", true);
	} else {
		$("#selectall").removeAttr("checked");

	}
	forEnableAndDisableButton();
}
// country dropdown function for registation
function getCountryForVendorReg() {
	$('#countryid').empty();
	// alert("country function calling")
	$("#countryid").empty();
	getCountry();
	var selectfirst = "<option value='0'>Please Select Country</option>";
	$('#countryid').append(selectfirst);
	$.each(countryid, function(i, resData) {
		var countryData = "<option value=" + resData.countryid + ">"
				+ resData.countryName + "</option>";
		$(countryData).appendTo('#countryid');
	});
	$('#countryid').trigger("chosen:updated");
	$('#countryid').chosen();
};

// country dropdown function for update
function getCountryForUpdate() {
	$('#country_id').empty();
	getCountry();
	var selectfirst = "<option value='0'>Please Select Country</option>";
	$('#country_id').append(selectfirst);
	$.each(countryid, function(i, resData) {
		var countryData = "<option value=" + resData.countryid + ">"
				+ resData.countryName + "</option>";
		$(countryData).appendTo('#country_id');
	});
	$('#country_id').trigger("chosen:updated");
	$('#country_id').chosen();
};

// state dropdown function for reg.
function getStateForVendorReg() {
	$("#stateid").empty();
	getState();
	var selectfirst = "<option value='0'>Please Select State</option>";
	$('#stateid').append(selectfirst);
	$.each(state, function(i, resData) {
		var stateData = "<option value=" + resData.stateId + ">"
				+ resData.stateName + "</option>";
		$(stateData).appendTo('#stateid');
	});
	$('#stateid').trigger("chosen:updated");
	$('#stateid').chosen();
};

// state dropdown loading for state
function getStateForVendorUpdate() {
	$("#state_id").empty();
	getState();
	var selectfirst = "<option value='0'>Please Select State</option>";
	$('#state_id').append(selectfirst);
	$.each(state, function(i, resData) {
		var stateData = "<option value=" + resData.stateId + ">"
				+ resData.stateName + "</option>";
		$(stateData).appendTo('#state_id');
	});
	$('#state_id').trigger("chosen:updated");
	$('#state_id').chosen();
};

// district dropdown function
function getDistrictVendorForReg(listOfState) {
	$('#districtid').empty();
	getDistrict(listOfState);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#districtid').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		// alert("resData.districtId"+resData.districtId);
		$(district).appendTo('#districtid');

	});
	$('#districtid').trigger("chosen:updated");
	$('#districtid').chosen();
};

// district dropdown function
function getDistrictVendorForUpdate(listOfState) {
	$('#district_id').empty();
	getDistrict(listOfState);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#district_id').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		// alert("resData.districtId"+resData.districtId);
		$(district).appendTo('#district_id');

	});
	$('#district_id').trigger("chosen:updated");
	$('#district_id').chosen();
};

// mandal dropdown function
function getMandalVendorReg(listOfDistrict) {
	$('#mandalid').empty();
	console.log("calling getMandalReg method...")
	getMandal(listOfDistrict);
	var selectfirst = "<option value='0'>Please Select Mandal</option>";
	$('#mandalid').append(selectfirst);
	$.each(mandal, function(i, resData) {
		var mandaldata = "<option value=" + resData.mandalid + ">"
				+ resData.mandalName + "</option>";
		$(mandaldata).appendTo('#mandalid');
		// getListCity(resData.mandalId);
	});
	$('#mandalid').trigger("chosen:updated");
	$('#mandalid').chosen();
}

// mandal dropdown function
function getMandalVendorUpdate(listOfDistrict) {
	$('#mandal_id').empty();
	console.log("calling getMandalReg method...")
	getMandal(listOfDistrict);
	var selectfirst = "<option value='0'>Please Select Mandal</option>";
	$('#mandal_id').append(selectfirst);
	$.each(mandal, function(i, resData) {
		var mandaldata = "<option value=" + resData.mandalid + ">"
				+ resData.mandalName + "</option>";
		$(mandaldata).appendTo('#mandal_id');
		// getListCity(resData.mandalId);
	});
	$('#mandal_id').trigger("chosen:updated");
	$('#mandal_id').chosen();
}

// city dropdown function city_id
function getCityVendorForReg(listOfMandal) {
	getCity(listOfMandal);
	var selectfirst = "<option value='0'>Please Select City</option>";
	$('#cityid').append(selectfirst);
	;
	$.each(city, function(i, resData) {
		console.log("restData----->" + resData)
		var city = "<option value=" + resData.cityId + ">" + resData.cityName
				+ "</option>";
		$(city).appendTo('#cityid');
	});
	$('#cityid').trigger("chosen:updated");
	$('#cityid').chosen();
};

// city dropdown function
function getCityVendorForUpdate(listOfMandal) {
	getCity(listOfMandal);
	var selectfirst = "<option value='0'>Please Select City</option>";
	$('#city_id').append(selectfirst);
	;
	$.each(city, function(i, resData) {
		console.log("restData----->" + resData)
		var city = "<option value=" + resData.cityId + ">" + resData.cityName
				+ "</option>";
		$(city).appendTo('#city_id');
	});
	$('#city_id').trigger("chosen:updated");
	$('#city_id').chosen();
};

// state dropdown function for update
function getStateForUpdate() {
	$("#stateid").empty();
	getState();
	var selectfirst = "<option value='0'>Please Select State</option>";
	$('#stateid').append(selectfirst);
	$.each(state, function(i, resData) {
		var stateData = "<option value=" + resData.stateId + ">"
				+ resData.stateName + "</option>";
		$(stateData).appendTo('#state_id');
	});
	$('#stateid').trigger("chosen:updated");
	$('#stateid').chosen();
};

// district dropdown function
function getDistrictForUpdate(listOfState) {
	$('#district_id').empty();
	getDistrict(listOfState);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#district_id').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		// alert("resData.districtId"+resData.districtId);
		$(district).appendTo('#district_id');

	});
	$('#district_id').trigger("chosen:updated");
	$('#district_id').chosen();
};

// mandal dropdown function
function getMandalUpdate(listOfDistrict) {
	$('#mandal_id').empty();
	console.log("calling getMandalReg method...")
	getMandal(listOfDistrict);
	var selectfirst = "<option value='0'>Please Select Mandal</option>";
	$('#mandal_id').append(selectfirst);
	$.each(mandal, function(i, resData) {
		var mandaldata = "<option value=" + resData.mandalid + ">"
				+ resData.mandalName + "</option>";
		$(mandaldata).appendTo('#mandal_id');
		// getListCity(resData.mandalId);
	});
	$('#mandal_id').trigger("chosen:updated");
	$('#mandal_id').chosen();
}

// state dropdown loading for state
$('#countryid').on('change', function() {
	var listOfCountry = $('#countryid').val();
	$("#stateid").empty();
	getStateForVendorReg(listOfCountry);
});

// onchange function calling
$('#stateid').on('change', function() {
	var listOfState = $('#stateid').val();
	$("#districtid").empty();
	getDistrictVendorForReg(listOfState);
});

// onchange function calling
$('#districtid').on('change', function() {
	var listOfDistrict = $('#districtid').val();
	$("#mandalid").empty();
	getMandalVendorReg(listOfDistrict);
});

// onchange function calling
$('#country_id').on('change', function() {
	var listOfCountry = $('#country_id').val();
	$("#state_id").empty();
	// alert("----->onchange");
	getStateForVendorUpdate(listOfCountry);
});

// onchange function calling
$('#state_id').on('change', function() {
	var listOfState = $('#state_id').val();
	$("#district_id").empty();
	getDistrictForUpdate(listOfState);
});

// onchange function calling
$('#districtid').on('change', function() {
	var listOfDistrict = $('#districtid').val();
	$("#").empty();
	getMandalVendorReg(listOfDistrict);
});

// onchange function calling
$('#district_id').on('change', function() {
	var listOfDistrict = $('#district_id').val();
	$("#mandal_id").empty();
	getMandalUpdate(listOfDistrict);
});

// onchange function calling
$('#mandalid').on('change', function() {
	var listOfTehsil = $('#mandalid').val();
	// alert("tehsil----->" + listOfTehsil);
	$("#cityid").empty();
	getCityVendorForReg(listOfTehsil);
});

// onchange function calling
$('#mandal_id').on('change', function() {
	var listOfTehsil = $('#mandal_id').val();
	// alert("tehsil----->" + listOfTehsil);
	$("#city_id").empty();
	getCityVendorForUpdate(listOfTehsil);

});

// get Vendor type dropdown function vendortypeid
function getVendorType() {
	// alert("employee type..........")
	$('#vendortype').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.vendorType;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,

				headers : {
					"X-TENANT-ID" : "tenantId2"
				},

				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var selectfirst = "<option value='0'>Please Select Vendor Type</option>";
						$('#vendortype').append(selectfirst);
						var jsonArray = data.contactUsersControllerDTO;
						$.each(jsonArray, function(i, resData) {
							var vendorType = "<option value="
									+ resData.vendortypeid + ">"
									+ resData.vendorname + "</option>";
							$(vendorType).appendTo('#vendortype');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});

	$("#vendortype").chosen();
	$('#vendortype').trigger("chosen:updated");

}

// get Vendor type dropdown function vendortypeid
function getVendorTypeforSearch() {
	// alert("employee type..........")
	$('#vendortypeid').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.vendorType;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				headers : {
					"X-TENANT-ID" : "tenantId2"
				},
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var selectfirst = "<option value='0'>Please Select Vendor Type</option>";
						$('#vendortypeid').append(selectfirst);
						var jsonArray = data.contactUsersControllerDTO;
						$.each(jsonArray, function(i, resData) {
							var vendorType = "<option value="
									+ resData.vendortypeid + ">"
									+ resData.vendorname + "</option>";
							$(vendorType).appendTo('#vendortypeid');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});

	$("#vendortypeid").chosen();
	$('#vendortypeid').trigger("chosen:updated");

}

function getVendorTypeForUpdate() {
	// alert("employee type..........")
	$('#vendor_type').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.vendorType;
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				/*
				 * headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						alert("No Data Found");
					} else {
						var selectfirst = "<option value='0'>Please Select Vendor Type</option>";
						$('#vendor_type').append(selectfirst);
						var jsonArray = data.contactUsersControllerDTO;
						$.each(jsonArray, function(i, resData) {
							var vendorType = "<option value="
									+ resData.vendortypeid + ">"
									+ resData.vendorname + "</option>";
							$(vendorType).appendTo('#vendor_type');

						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#vendor_type').trigger("chosen:updated");
	$("#vendor_type").chosen();
}

/**
 * @Functionality:User Registation
 * @date:17/12/2019
 * @returns {undefined} fun:saveUserDetails
 */
function saveVendorDetails() {
	// alert("saveVendorDetails function calling...")
	var vendorName = $('#vendorname').val();
	var phoneNumber = $('#phonenumber').val();
	var webSite = $('#website').val();
	var adress1 = $('#address').val();
	// var emailId = $('#emailid').val();
	var phoneNumber = $('#phonenumber').val();
	var countryId = $('#countryid').val();
	var stateId = $('#stateid').val();
	var districtId = $('#districtid').val();
	var mandalId = $('#mandalid').val();
	var cityId = $('#cityid').val();
	var pinCode = $('#pincode').val();
	var contactName = $('#contactname').val();
	var emailId = $('#emailid').val();
	var phoneNo = $('#phoneno').val();
	var vendortypeid = $('#vendortype').val();

	/*
	 * if(contactName==null||contactName==""){ contactName=' '; }
	 * if(emailId==null||emailId==""){ emailId=' '; }
	 */
	if (phoneNo == null || phoneNo == "") {
		phoneNo = ' ';
	}
	if (webSite == null || webSite == "") {
		webSite = ' ';
	}

	var objJson = {
		"condition" : 1,
		"serialno" : 0,
		"vendorid" : 0,
		"vendorname" : vendorName,
		"vendortypeid" : vendortypeid,
		"phone_num" : phoneNumber,
		"website" : webSite,
		"address" : adress1,
		"countryid" : countryId,
		"stateid" : stateId,
		"districtid" : districtId,
		"mandalid" : mandalId,
		"cityid" : cityId,
		"postalcode" : pinCode,
		"contactperson" : contactName,
		"con_per_email" : emailId,
		"con_per_phonenum" : phoneNo,
		"createdbyid" : 1,
		"createdbymoduleid" : 1,
		"createdbyroleid" : 1

	};
	if (vendorName === "0" || vendorName === "" || vendorName === null) {
		showNotificationError("Please Enter Vendor Name", "vendorname", "error");
		return;
	}
	if (phoneNumber === "0" || phoneNumber === "" || phoneNumber === null) {
		showNotificationError("Please Enter Phone Number", "phonenumber",
				"error");
		return;
	}
	if (phoneNumber.length != 10) {
		showNotificationError("Please Enter Valid Phone Number", "phonenumber",
				"error");
		return;
	}
	if (adress1 === "0" || adress1 === "" || adress1 === null) {
		showNotificationError("Please Enter Address", "address", "error");
		return;
	}

	if (countryId === "0" || countryId === "") {
		showNotificationError("Please Select Country", "countryid", "error");
		return;
	}

	if (stateId === "0" || stateId === "") {
		showNotificationError("Please Select State", "stateid", "error");
		return;
	}
	if (districtId === "0" || districtId === "") {
		showNotificationError("Please Select District", "districtid", "error");
		return;
	}
	if (countryId === "0" || countryId === "" || countryId === null) {
		showNotificationError("Please Select Country", "countryid", "error");
		return;
	}
	// alert("stateId----->"+stateId);
	if (stateId === "0" || stateId === "" || stateId === null) {
		// alert("state id jjj")
		// showNotificationError("Please Select State", "stateid", "error");
		showNotificationError("Please Select District", "state_id", "error");
		return;
	}
	if (districtId === "0" || districtId === "") {
		showNotificationError("Please Select District", "district", "error");
		return;
	}
	if (mandalId === "0" || mandalId === "") {
		showNotificationError("Please Select Mandal", "mandalid", "error");
		return;
	}
	if (cityId === "0" || cityId === "") {
		showNotificationError("Please Select City", "cityid", "error");
		return;
	}
	if (pinCode === "0" || pinCode === "" || pinCode === null) {
		showNotificationError("Please Enter Pincode ", "pincode", "error");
		return;
	}
	if (pincode === "0" || pincode === "" || pincode === null) {
		showNotificationError("Please Enter Pincode ", "pincode", "error");
		return;
	}
	if (pinCode.length != 6) {
		showNotificationError("Please Enter Valid Pincode ", "pincode", "error");
		return;
	}
	if (vendortypeid === "0" || vendortypeid === "") {
		showNotificationError("Please Select Vendor Type", "vendortype",
				"error");
		return;
	}
	if (contactName === "0" || contactName === "") {
		showNotificationError("Please Enter Contact Name", "contactname",
				"error");
		return;
	}
	if (emailId === "0" || emailId === "") {
		showNotificationError("Please Enter EmailId", "emailid", "error");
		return;
	}
	var email = $('#emailid').val();
	var emailreg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if (!emailreg.test(email)) {
		showNotificationError("Please enter valid email", "emailid", "error");
		return;
	}

	var strUrl = Service.insertAndupdateAndDeleteVendorVendor;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objJson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			// alert("Inserted------>" + data);
			// var data = JSON.parse(response); insert_vendor_id
			JSON.stringify(objJson)
			showNotificationError("Inserted Successfully", "insert_vendor_id",
					"success");
			console.log("Inserted-------------->" + JSON.stringify(data));
			var responsecode = data.responseCode;
			var status1 = data.status;
			console.log("responsecode====>" + responsecode)
			console.log("status====>" + status1)
			if (200 !== responsecode) {
				alert("User Name Is Already Exit");
			} else {

			}

		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

// reset insert vendor details
function resetSaveVendorDetails() {
	$('#vendorname').val("");
	$('#phonenumber').val("");
	$('#website').val("");
	$('#address').val("");
	// var emailId = $('#emailid').val();
	$('#phonenumber').val("");
	$('#countryid').val("0").trigger("chosen:updated");
	$('#stateid').val("0").trigger("chosen:updated");
	$('#districtid').val("0").trigger("chosen:updated");
	$('#mandalid').val("0").trigger("chosen:updated");
	$('#cityid').val("0").trigger("chosen:updated");
	$('#pincode').val("");
	$('#contactname').val("");
	$('#emailid').val("");
	$('#phoneno').val("");
	$('#vendortype').val("");
}

// reset update vendor details
function resetUpdateVendorDetails() {
	$('#vendor_name').val("");
	$('#phone_number').val("");
	$('#web_site').val("");
	$('#address_id').val("");
	$('#emailid').val("");
	$('#phonenumber').val("");
	$('#country_id').val("0").trigger("chosen:updated");
	$('#state_id').val("0").trigger("chosen:updated");
	$('#districtid').val("0").trigger("chosen:updated");
	$('#mandal_id').val("0").trigger("chosen:updated");
	$('#city_id').val("0").trigger("chosen:updated");
	$('#pincode_no').val("");
	$('#pr_contact_name').val("");
	$('#email_id').val("");
	$('#phone_number').val("");
	$('#vendor_type').val("");
	$('#email_id').val("");
	$('#phone_no').val("");
	// getDistrictVendorForUpdate('0');
}

function resetsearchVendorDetails() {
	$('#vendortypeid').val("0").trigger("chosen:updated");
	$('#vendorNameId').val("");
	getVendorDetails();
}

function updateVendor(serialno, vrndorname, phonenum, email, country, state,
		district, mandalid, city, vendortype, website, address, pincode,
		strphonenum, contactperson, countryname, statename, distname, mandname,
		cityname) {
	// alert("update function calling...."+mandname);
	getCountryForUpdate();
	getStateForVendorUpdate(1);
	getDistrictForUpdate(state);
	getMandalUpdate(district);
	getCityVendorForUpdate(mandalid);
	// alert("update function calling....");
	$('#serical_ID').val(serialno);
	// alert("--->"+country);
	$('#vendor_name').val(vrndorname);
	$('#phone_number').val(phonenum);
	$('#web_site').val(website);
	$('#address_id').val(address);
	$('#email_id').val(email);
	// $('#phonenumber').val();
	$('#country_id').val(country);
	$('#state_id').val(state);
	$('#district_id').val(district);
	// $('#mandal_id').val(mandalid);
	$('#city_id').val(city);
	$('#pincode_no').val(pincode);
	$('#pr_contact_name').val(contactperson);
	$('#email_id').val();
	$('#phone_no').val(strphonenum);
	$("#vendor_type option:contains(" + vendortype + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#country_id option:contains(" + countryname + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#state_id option:contains(" + statename + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#district_id option:contains(" + distname + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#mandal_id option:contains(" + mandname + ")").attr('selected',
			'selected').trigger("chosen:updated");
	$("#city_id option:contains(" + cityname + ")")
			.attr('selected', 'selected').trigger("chosen:updated");
}

/**
 * @Functionality:User Registation
 * @date:17/12/2019
 * @returns {undefined} fun:saveUserDetails
 */
function updateVendorDetails() {
	var serino = $('#serical_ID').val();
	// alert("updateVendorDetails function calling...>"+serino)
	var vendorName = $('#vendor_name').val();
	var phoneNumber = $('#phone_number').val();
	var webSite = $('#web_site').val();
	var adress1 = $('#address_id').val();
	var emailId = $('#emailid').val();
	var phoneNumber = $('#phonenumber').val();
	var countryId = $('#country_id').val();
	var stateId = $('#state_id').val();
	var districtId = $('#district_id').val();
	var mandalId = $('#mandal_id').val();
	var cityId = $('#city_id').val();
	var pinCode = $('#pincode_no').val();
	var contactName = $('#pr_contact_name').val();
	var emailId = $('#email_id').val();
	var phoneNum = $('#phone_number').val();
	var vendortypeid = $('#vendor_type').val();
	var emailid = $('#email_id').val();
	var phoneNo = $('#phone_no').val();
	// alert("email------>"+mandalId);
	// alert("email------>"+cityId);
	if (contactName == null || contactName == "") {
		contactName = ' ';
	}
	if (emailId == null || emailId == "") {
		emailId = ' ';
	}
	if (phoneNo == null || phoneNo == "") {
		phoneNo = ' ';
	}
	if (webSite == null || webSite == "") {
		webSite = ' ';
	}

	var objJson = {
		"condition" : 3,
		"serialno" : serino,
		"vendorid" : 0,
		"vendorname" : vendorName,
		"vendortypeid" : vendortypeid,
		"phone_num" : phoneNum,
		"website" : webSite,
		"address" : adress1,
		"countryid" : countryId,
		"stateid" : stateId,
		"districtid" : districtId,
		"mandalid" : mandalId,
		"cityid" : cityId,
		"postalcode" : pinCode,
		"contactperson" : contactName,
		"con_per_email" : emailId,
		"con_per_phonenum" : phoneNo,
		"createdbyid" : 1,
		"createdbymoduleid" : 1,
		"createdbyroleid" : 1

	};
	var strUrl = Service.insertAndupdateAndDeleteVendorVendor;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objJson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			showNotificationError("Updated Successfully", "update_vendor_id",
					"success");
			getVendorDetails();
			var responsecode = data.responseCode;
			var status1 = data.status;
			console.log("responsecode====>" + responsecode)
			console.log("status====>" + status1)
			if (200 !== responsecode) {
				alert("User Name Is Already Exit");
			} else {
				setTimeout(function() {
					stop = true;
					$('#edit').modal('hide');
				}, 2000)

			}
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

function deleteVendorDetails(serialid){
	$('#sericalID').val(serialid);
}
//Delete Vendor Details
function deleteVendor() {
	var serial_id = $('#sericalID').val();
	var objJson = {
		"condition" : 2,
		"serialno" : serial_id,
		"vendorid" : 0,
		"vendorname" : 0,
		"vendortypeid" : 0,
		"phone_num" : 0,
		"website" : 0,
		"address" : 0,
		"countryid" : 0,
		"stateid" : 0,
		"districtid" : 0,
		"mandalid" : 0,
		"cityid" : 0,
		"postalcode" : 0,
		"contactperson" : 0,
		"con_per_email" : 0,
		"con_per_phonenum" : 0,
		"createdbyid" : 0,
		"createdbymoduleid" : 0,
		"createdbyroleid" : 0
	};

	var strUrl = Service.insertAndupdateAndDeleteVendorVendor;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objJson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			JSON.stringify(objJson)
			console.log("Inserted-------------->" + JSON.stringify(data));
			var responsecode = data.responseCode;
			var status1 = data.status;
			console.log("responsecode====>" + responsecode)
			console.log("status====>" + status1)
			if (200 !== responsecode) {
				alert("User Name Is Already Exit");
			} else {

			}

		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

function multipledeleteVendorDetails(serialno) {
	var objJson = {
		"condition" : 2,
		"serialno" : serialno,
		"vendorid" : 0,
		"vendorname" : 0,
		"vendortypeid" : 0,
		"phone_num" : 0,
		"website" : 0,
		"address" : 0,
		"countryid" : 0,
		"stateid" : 0,
		"districtid" : 0,
		"mandalid" : 0,
		"cityid" : 0,
		"postalcode" : 0,
		"contactperson" : 0,
		"con_per_email" : 0,
		"con_per_phonenum" : 0,
		"createdbyid" : 0,
		"createdbymoduleid" : 0,
		"createdbyroleid" : 0
	};

	var strUrl = Service.insertAndupdateAndDeleteVendorVendor;
	$.ajax({
		type : 'POST',
		url : strUrl,
		data : JSON.stringify(objJson),
		dataType : 'json',
		contentType : "application/json",
		async : false,
		crossDomain : true,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			alert("Inserted------>" + data);
			// var data = JSON.parse(response);
			JSON.stringify(objJson)
			console.log("Inserted-------------->" + JSON.stringify(data));
			var responsecode = data.responseCode;
			var status1 = data.status;
			console.log("responsecode====>" + responsecode)
			console.log("status====>" + status1)
			if (200 !== responsecode) {
				alert("User Name Is Already Exit");
			} else {

			}

		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

function getVendorDetails() {
	$("#deleteButtonID").hide();
	var strUrl = 'http://192.168.1.191:8085/FleetManagement/contactUsersController/getVendorList';
	console.log("" + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			console.log("success------>" + data);
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				// alert("No Data Found");
			} else {
				var jsonArray = data.contactUsersControllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
					getVendorDetailsData(jsonArray);
					loadDataTable1()
				} else {
				}
			}
		},
		error : function() {

			console.log('In Error of  Details ');
		}
	});
}

// dom function calling...
function getVendorDetailsData(strData) {
	$('#vehicleList_Id').empty();
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table

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
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select </span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTHead1).addClass("text-center");
		$(objTr).append(objTHead1);

		var objTHead2 = document.createElement("th");
		$(objTHead2).html("Vendor Name");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Email");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Phone");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Contact Person Name");
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
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].serialno
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].vendortypeid);
			console.log('vendorname' + strData[i].vendortypeid);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].email);
			console.log(' email' + strData[i].email);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].phone_num);
			console.log(' phone_num' + strData[i].phone_num);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].contactperson);
			console.log(' contactperson' + strData[i].contactperson);
			$(tbleRow).append(tablcol5);

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<i class="fa fa-edit" data-toggle="modal" data-target="#edit"></i>');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'updateVendor("' + strData[i].serialno + '","'
							+ strData[i].vendorname + '","'
							+ strData[i].phone_num + '","' + strData[i].email
							+ '","' + strData[i].countryid + '","'
							+ strData[i].stateid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].mandalid + '","' + strData[i].cityid
							+ '","' + strData[i].vendortypeid + '","'
							+ strData[i].website + '","' + strData[i].address
							+ '","' + strData[i].postalcode + '","'
							+ strData[i].con_per_phonenum + '","'
							+ strData[i].contactperson + '","'
							+ strData[i].countryname + '","'
							+ strData[i].statename + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalname + '","'
							+ strData[i].cityname + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<i class="fa fa-trash" data-toggle="modal" data-target="#delete" ></i>');

			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteVendorDetails("' + strData[i].serialno + '")');

			$(objTBody).append(tbleRow);
		}

		$("#vehicleList_Id").append(objDivTag);

	} catch (err) {
		console.log("example" + err);
	}
}

function searchVendorDetails1() {
	$("#deleteButtonID").hide();
	var vendorType_Id = $('#vendortypeid').val();
	var vendorName = $('#vendorNameId').val();

	if (vendorType_Id == 0) {
		vendorType_Id = null;
	}
	if (vendorName == null || vendorName == "") {
		vendorName = null;
	} else {
		vendorName = "'" + vendorName + "'"
	}

	if (vendorType_Id == null && vendorName == null) {
		showNotificationError("Please Select At Least One Search Parameter",
				"searchid", "error");
		return true;
	}

	var objJson = {
		"vendortypeid" : vendorType_Id,
		"vendorname" : vendorName
	};
	var strUrl = "http://192.168.1.191:8085/FleetManagement/contactUsersController/searchVendorDetails1";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("success------>" + data);
			var responsecode = data.responseCode;
			// alert("Responce Code--->"+responsecode);
			if (200 !== responsecode) {
				$('#vehicleList_Id').empty();
				var divTag = document.createElement("h2");
				$(divTag).css("text-align", "center");
				$(divTag).html("No Data Available");
				$('#vehicleList_Id').append(divTag);
			} else {
				var jsonArray = data.contactUsersControllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
					searchVendorDetailsData(jsonArray);
					loadDataTable1();
				} else {
				}

			}
		},
		error : function() {

			console.log('In Error of  Details ');
		}
	});
}

// dom function calling...
function searchVendorDetailsData(strData) {
	$('#vehicleList_Id').empty();
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table

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
		$(objTHead1)
				.html(
						'<label class="check "><span style=" color: white">Select </span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
		$(objTHead1).addClass("text-center");
		$(objTr).append(objTHead1);

		var objTHead2 = document.createElement("th");
		$(objTHead2).html("Vendor Name");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Email");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Phone");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Contact Person Name");
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
			$(tablcol1)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ strData[i].serialno
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].vendorname);
			console.log('vendorname' + strData[i].vendorname);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].email);
			console.log(' email' + strData[i].email);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].phone_num);
			console.log(' phone_num' + strData[i].phone_num);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].contactperson);
			console.log(' contactperson' + strData[i].contactperson);
			$(tbleRow).append(tablcol5);

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<i class="fa fa-edit" data-toggle="modal" data-target="#edit"></i>');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'updateVendor("' + strData[i].serialno + '","'
							+ strData[i].vendorname + '","'
							+ strData[i].phone_num + '","' + strData[i].email
							+ '","' + strData[i].countryid + '","'
							+ strData[i].stateid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].mandalid + '","' + strData[i].cityid
							+ '","' + strData[i].vendortypeid + '","'
							+ strData[i].website + '","' + strData[i].address
							+ '","' + strData[i].postalcode + '","'
							+ strData[i].con_per_phonenum + '","'
							+ strData[i].contactperson + '","'
							+ strData[i].countryname + '","'
							+ strData[i].statename + '","'
							+ strData[i].districtname + '","'
							+ strData[i].mandalname + '","'
							+ strData[i].cityname + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<i class="fa fa-trash" data-toggle="modal" data-target="#delete" ></i>');

			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteVendorDetails("' + strData[i].serialno + '")');

			$(objTBody).append(tbleRow);
		}

		$("#vehicleList_Id").append(objDivTag);
		// $('#deleteButtonID').show();
		//$("#deleteButtonID").show();

	} catch (err) {
		console.log("example" + err);
	}
}

$('#vendorname').keypress(function(e) {
	$('#check').empty();
	var regex = new RegExp("^[a-zA-Z]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	} else {
		e.preventDefault();
		$("#check").append("Please Enter Alphabate");
		return false;
	}
});

$('#website').keypress(function(e) {
	$('#check').empty();
	var regex = new RegExp("^[a-zA-Z]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	} else {
		e.preventDefault();
		$("#check").append("Please Enter Alphabate");
		return false;
	}
});

$('#address').keypress(function(e) {
	$('#check').empty();
	var regex = new RegExp("^[a-zA-Z]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	} else {
		e.preventDefault();
		$("#check").append("Please Enter Alphabate");
		return false;
	}
});
$('#contactname').keypress(function(e) {
	$('#check').empty();
	var regex = new RegExp("^[a-zA-Z]+$");
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str)) {
		return true;
	} else {
		e.preventDefault();
		$("#check").append("Please Enter Alphabate");
		return false;
	}
});
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

// For Validation this function calling.
function showNotificationError(msg, id, msgType) {
	var boxId = '#' + id;

	var options = {
		// whether to hide the notification on click
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults
		// below
		position : 'bottom',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 800,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};

	$(boxId).notify(msg, options);
}
