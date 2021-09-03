var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	loadClassification();
	loadCountry();
	
});

/*
 * @Author : Ranjeet kumr
 * 
 * @Desc : loadClassification
 */
function loadClassification() {
	console.log("loadClassification function executed");
	try {
		$('#classification_id').empty();
		var strUrl = "http://127.0.0.1:2000/scmservice/SupplierController/loadClassification";
		//var strUrl = vendorManagement.loadClassification;// need to check 
		console.log("loadClassification Url is:" + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				console.log('in success');
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objSupplierControllerDTO;
					/*var selectfirst = "<option value='0'>"
							+ dropdownConstantobj.drop_down + "</option>";
					*/
					var selectfirst = "<option value='0'>Select One</option>";
					
					
					$('#classification_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var schedule = "<option value="
								+ resData.classificationid + ">"
								+ resData.classificationName + "</option>";
						$(schedule).appendTo('#classification_id');
					});
				}
			},
			error : function(err) {
				console.log('in error');
				console.error("Error in Classification" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in Classification()' + err);
	}
	$('#classification_id').trigger("chosen:updated");
	$('#classification_id').chosen();
}

/*
 * @Author : Ranjeet kumr
 * 
 * @Desc : loadClassification
 */
function loadCountry() {
	console.log("loadCountry java script function executed");
    try {
		$('#country_id').empty();
		//var strUrl = vendorManagement.loadCountry;
		var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadCountry";
		console.log("loadCountry Url is:" + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objSupplierControllerDTO;
					var selectfirst = "<option value='0'>Select One</option>";
					$('#country_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var country = "<option value=" + resData.countryid
								+ ">" + resData.countryName + "</option>";
						$(country).appendTo('#country_id');
					});
				}
			},
			error : function(err) {
				console.error("Error in loadcountry" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in loadcountry()' + err);
	}
	$('#country_id').trigger("chosen:updated");
	$('#country_id').chosen();
}




/*function loadState() {
	console.log('loadStateloadStateloadStateloadState');
	
	var strUrl = vendorManagement.loadState;
	console.log(strUrl);
	var countryId = $('#country_id').val();
	var json_Availability_Details = {
		"countryid" : 1
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(json_Availability_Details),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			"X-TENANT-ID" : "PROCREATE"
		},
		success : function(data) {
			console.log("data::" + data);
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}*/

function loadDistrict() {
	$("#district_id").empty();
	var state_id = $('#state_id').val();
	console.log('loadDistrict function executed with state id::'+state_id);
	//var strUrl = vendorManagement.loadDistrict;
	var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadDistrict";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"stateid" : state_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objSupplierControllerDTO;
				/*var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";*/
				
				var selectfirst = "<option value='0'>Select One</option>";
				$('#district_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var dist = "<option value=" + resData.districtid + ">"
							+ resData.districtName + "</option>";
					$(dist).appendTo('#district_id');
				});
			}
		},
		error : function(err) {
			console.error('loadDistrict  error: ' + JSON.stringify(err));
		}
	});
	$('#district_id').trigger("chosen:updated");
	$('#district_id').chosen();
}

function loadCity() {
	$("#city_id").empty();
	//var state_id = $('#state_id').val();
	var district_id = $('#district_id').val();
	console.log('loadCity function executed with state Id'+district_id);
	//var strUrl = vendorManagement.loadCity;
	var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadCity";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"stateid" : district_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objSupplierControllerDTO;
				/*var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";*/
				
				var selectfirst = "<option value='0'>Select One</option>";
				$('#city_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var dist = "<option value=" + resData.cityid + ">"
							+ resData.cityName + "</option>";
					$(dist).appendTo('#city_id');
				});
			}
		},
		error : function(err) {
			console.error('loadDistrict  error: ' + JSON.stringify(err));
		}
	});
	$('#city_id').trigger("chosen:updated");
	$('#city_id').chosen();

}

function loadZipCode() {
	$("#zip_code").empty();
	var city_id = $('#city_id').val();
	console.log('loadZipCode method executed with city id::'+city_id);
	//var strUrl = vendorManagement.loadZipCode;
	var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadZipCode";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"cityid" : city_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objSupplierControllerDTO;
				
			/*	var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";*/
				
				var selectfirst = "<option value='0'>Select One</option>";
				$('#zip_code').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var dist = "<option value=" + resData.zipCodeId + ">"
							+ resData.zipCode + "</option>";
					$(dist).appendTo('#zip_code');
				});
			}
		},
		error : function(err) {

			console.error('zip_code  error: ' + JSON.stringify(err));
		}
	});
	$('#zip_code').trigger("chosen:updated");
	$('#zip_code').chosen();
}

function loadLocality() {

	$("#address_id").empty();
	//var city_id = $('#city_id').val();
	var zip_code = $('#zip_code').val();
	
	console.log('loadLocality function executed with zipcode id::-->'+zip_code);
	//var strUrl = vendorManagement.loadLocality;
	var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadLocality";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"cityid" : zip_code
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objSupplierControllerDTO;
				
			/*	var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";*/
				
				var selectfirst = "<option value='0'>Select One</option>";
				$('#address_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var adddress = "<option value=" + resData.lacationId + ">"
							+ resData.lacationName + "</option>";
					$(adddress).appendTo('#address_id');
				});
			}
		},
		error : function(err) {
			console.error('loadLocality  error: ' + JSON.stringify(err));
		}
	});
	$('#address_id').trigger("chosen:updated");
	$('#address_id').chosen();

}

function loadLandmark() {
	$("#house_no").empty();
	//var zipcode = $('#zip_code').val();
	var address_id = $('#address_id').val();
	console.log('loadLandmark function executed with zipcode id::-->'+address_id);
	//var strUrl = vendorManagement.loadLandmark;
	var strUrl ="http://127.0.0.1:2000/scmservice/SupplierController/loadLandmark";

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"localityid" : address_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.objSupplierControllerDTO;
				
				/*var selectfirst = "<option value='0'>"
						+ dropdownConstantobj.drop_down + "</option>";*/
				
				var selectfirst = "<option value='0'>Select One</option>";
				$('#house_no').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var houseno = "<option value=" + resData.landmarkid + ">"
							+ resData.landmarName + "</option>";
					$(houseno).appendTo('#house_no');
				});
			}
		},
		error : function(err) {
			console.error('loadLocality  error: ' + JSON.stringify(err));
		}
	});
	$('#house_no').trigger("chosen:updated");
	$('#house_no').chosen();

}
