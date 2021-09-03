/**
 * author:Bhuneshwar Patel date 17/12/2019
 */

// on load calling..


$(document).ready(function() {
	geEmployeeType();
	getUserRoles();
});


// country dropdown function for registation
function getCountryForReg() {
	$('#countryid').empty();
	// alert("country function calling")
	$("#country").empty();
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
function getCountryUpdate() {
	//alert("getCountryForUpdate function calling.....")
	$("#country_id").empty();
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
function getStateForReg() {
	$("#stateid").empty();
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


// state dropdown function for update
function getStateForUpdate() {
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
function getDistrictForReg(listOfState) {
	  alert("Get District Function.....");
	  $('#district').empty();
      getDistrict(listOfState);	
	  var selectfirst = "<option value='0'>Please Select District</option>";
	  $('#district').append(selectfirst);	 
	  $.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtId + ">"
				+ resData.districtName + "</option>";
		// alert("resData.districtId"+resData.districtId);
		$(district).appendTo('#district');
	});
	$('#district').trigger("chosen:updated");
	$('#district').chosen();
	//$('select').val("9");
};

// district dropdown function
function getDistrictForUpdate(listOfState) {
	//alert("getDistrictForUpdate function calling");
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

// mandal dropdown function
function getMandalReg(listOfDistrict) {
	$('#tahsil').empty();
	console.log("calling getMandalReg method...")
	getMandal(listOfDistrict);
	var selectfirst = "<option value='0'>Please Select Mandal</option>";
	$('#tahsil').append(selectfirst);
	$.each(mandal, function(i, resData) {
		var mandaldata = "<option value=" + resData.mandalid + ">"
				+ resData.mandalName + "</option>";
		$(mandaldata).appendTo('#tahsil');
		// getListCity(resData.mandalId);
	});
	$('#tahsil').trigger("chosen:updated");
	$('#tahsil').chosen();
}

// mandal dropdown function
function getMandalUpdate(listOfDistrict) {
	$('#mandal_id').empty();
	console.log("calling getMandalReg method...")
	getMandal(listOfDistrict);	
	  var selectfirst = "<option value='-1'>Please Select Mandal</option>";
	  $('#tahsil').append(selectfirst);	 
	$.each(mandal, function(i, resData) {
		var mandaldata = "<option value=" + resData.mandalid + ">"
				+ resData.mandalName + "</option>";
		$(mandaldata).appendTo('#mandal_id');
		// getListCity(resData.mandalId);
	});
	$('#mandal_id').trigger("chosen:updated");
	$('#mandal_id').chosen();
}

// city dropdown function
function getCityForReg(listOfMandal) {
	getCity(listOfMandal);
	var selectfirst = "<option value='-1'>Please Select City</option>";
	$('#city').append(selectfirst);
	;
	$.each(city, function(i, resData) {
		console.log("restData----->" + resData)
		var city = "<option value=" + resData.cityId + ">" + resData.cityName
				+ "</option>";
		$(city).appendTo('#city');
	});
	$('#city').trigger("chosen:updated");
	$('#city').chosen();
};

//city dropdown function
function getCityForUpdate(listOfMandal) {
	getCity(listOfMandal);
	var selectfirst = "<option value='0'>Please Select City</option>";
	$('#city').append(selectfirst);
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

// onchange function calling for loading state
$('#countryid').on('change', function() {
	var listOfCountry = $('#countryid').val();
	$("#state_id").empty();
	getStateForReg(listOfCountry);
});

//onchange function calling for loading state for update
$('#country_id').on('change', function() {
	var listOfCountry = $('#country_id').val();
	$("#state_id").empty();
	getStateForUpdate(listOfCountry);
});

// onchange function calling for loading District Reg
$('#state_id').on('change', function() {
	var listOfState = $('#state_id').val();
	$("#district").empty();
	alert("##############");
	getDistrictForReg(listOfState);
});

// onchange function calling for loading DistrictForUpdate
$('#state_id').on('change', function() {
	var listOfState = $('#state_id').val();
	$("#districtid").empty();
	getDistrictForUpdate(listOfState);
});

// onchange function calling for loading Mandal
$('#district').on('change', function() {
	var listOfDistrict = $('#district').val();
	$("#tahsil").empty();
	getMandalReg(listOfDistrict);
});

// onchange function calling loading Mandal for update
$('#districtid').on('change', function() {
	var listOfDistrict = $('#districtid').val();
	$("#mandal_id").empty();
	getMandalUpdate(listOfDistrict);
});

// onchange function calling for loading city reg
$('#tahsil').on('change', function() {
	var listOfTehsil = $('#tahsil').val();
   //alert("tehsil----->" + listOfTehsil);
	$("#city").empty();
	getCityForReg(listOfTehsil);
});

//onchange function calling
$('#mandal_id').on('change', function() {
	var listOfTehsil = $('#mandal_id').val();
   //alert("tehsil----->" + listOfTehsil);
	$("#city_id").empty();
	getCityForUpdate(listOfTehsil);
});


function hI(){
	alert("@@@@@@@@@@")
}

/**
 * @Functionality:User Registation
 * @date:17/12/2019
 * @returns {undefined} fun:saveUserDetails
 */

function saveUserDetails() {
	var userName = $('#username').val();
	console.log("userName----->" + userName);
	var firstName = $('#firstname').val();
	var middleName = $('#middlename').val();
	var lastName = $('#lastname').val();
	var dateOfBirth = $('#dateofbirth').val();
	var emailId = $('#emailid').val();
	var phoneNumber = $('#phonenumber').val();
	var countryId = $('#countryid').val();
	var stateId = $('#state_id').val();
	var districtId = $('#district').val();
	var mandalId = $('#tahsil').val();
	var cityId = $('#city').val();
	var address = $('#address').val();
	var pincode = $('#pincode').val();
	var jobTitle = $('#jobtitle').val();
	var employeeType = $('#employeetype').val();
	var employeeNo = $('#employeeno').val();
	var joiningDate = $('#joiningdate').val();
	var leaveDate = $('#leavedate').val();
	var leaveDate1 = moment(leaveDate).format("YYYY-MM-DD");
	var licenseNo = $('#licenseno').val();
	var licenseType = $('#licensetype').val();
	var licenseState = $('#licensestate').val();
	var hourlyLabourRate = $('#hourlylaborrate').val();
	var employeeType = $('#employeetype').val();
	// alert("hourly------------>"+hourlyLabourRate);
	var userRoleId=$('#role_id').val();
	var Password=$('#password').val();
	var cnfPassword=$('#confirmPassword').val();
	
	if(employeeNo==null||employeeNo==""){
		employeeNo=0;
	}
	if(joiningDate==null||joiningDate==""){
		joiningDate=null;
	}else{
		joiningDate="'"+joiningDate+"'"
	}
	
	if(leaveDate==null||leaveDate==""){
		leaveDate=null;
	}else{
		leaveDate="'"+leaveDate+"'"
	}
	
	if(licenseNo==null||licenseNo==""){
		licenseNo=0;
	}
	if(licenseType==null||licenseType==""){
		licenseType=" ";
	}
	if(licenseState==null||licenseState==""){
		licenseState=" ";
	}
	if(hourlyLabourRate==null||hourlyLabourRate==""){
		hourlyLabourRate=" ";
	}
	if(Password==cnfPassword){
		var pass_word=Password
	}else{
		//alert("Please Enter Correct Password")
	}
	var objJson = {
		"condition" : 1,
		"serialno" : 0,
		"username" : userName,
		"firstname" : firstName,
		"middlename" : middleName,
		"lastname" : lastName,
		"email" : emailId,
		"phone_num" : phoneNumber,
		"address" : address,
		"countryid" : countryId,
		"stateid" : stateId,
		"districtid" : districtId,
		"mandalid" : mandalId,
		"cityid" : cityId,
		"postalcode" : pincode,
		"jobtile_id" : 1,
		"dob" : dateOfBirth,
		"employeetype_id" : employeeType,
		"browse" : "hh",
		"employee_no" : employeeNo,
		"joining_date" : joiningDate,
		"leave_date" : leaveDate,
		"licence_num" : licenseNo,
		"licence_type" : licenseType,
		"licence_state" : licenseState,
		"hourly_labour_cost" : hourlyLabourRate,
		"createdbyid" : 1,
		"createdbymoduleid" : 1,
		"createdbyroleid" : userRoleId,
		"password":pass_word,
	};
	
	if (firstName === "0" || firstName === "" || firstName === null) {
		showNotificationError("Please Enter Firstname", "firstname", "error");
		return;
	}
	if (lastName === "0" || lastName === "" || lastName === null) {
		showNotificationError("Please Enter Lastname", "lastname", "error");
		return;
	}

	if (dateOfBirth === "0" || dateOfBirth === "" || dateOfBirth === null) {
		showNotificationError("Please Enter Date Of Birth", "date2", "error");
		return;
	}
	
	if (emailId === "0" || emailId === "" || emailId === null) {
		showNotificationError("Please Enter EmailId", "emailid", "error");
		return;
	}
	var email=$('#emailid').val();
	var emailreg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailreg.test(email)){
		 showNotificationError("Please enter valid email", "emailid",
			"error");
		 return;
	}
	if (phoneNumber === "0" || phoneNumber === "" || phoneNumber === null) {
		showNotificationError("Please Enter PhoneNumber", "phonenumber",
				"error");
		return;
	}
    if(phoneNumber.length!=10){
    	showNotificationError("Please Enter Valid PhoneNumber", "phonenumber",
		"error");
      return;
    }else{
    	
    }
	//alert("phone Num lengh----->"+phoneNumber.length);
    	
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
	if (districtId === "0" || districtId === "" || districtId === null) {
		showNotificationError("Please Select District", "district", "error");
		return;
	}
	if (mandalId === "0" || mandalId === "" || mandalId === null) {
		showNotificationError("Please Select Mandal", "tahsil", "error");
		return;
	}

	if (cityId ==="-1") {
	//	alert("Vvvvvvvvvvvvv")
		showNotificationError("Please Select City", "city", "error");
		return;
	}
	if (address === "0" || address === "" || address === null) {
		showNotificationError("Please Enter Address ", "address", "error");
		return;
	}
	if (pincode === "0" || pincode === "" || pincode === null) {
		showNotificationError("Please Enter Pincode ", "pincode", "error");
		return;
	}
	if(pincode.length!=6){
		showNotificationError("Please Enter Valid Pincode ", "pincode", "error");
		return;
	}
	if (employeeType === "0" || employeeType === "" || employeeType === null) {
		showNotificationError("Please Enter Employee Type. ", "employeetype",
				"error");
		return;
	}

	if (userName === "0" || userName === "" || userName === null) {
		showNotificationError("Please Enter Username", "username", "error");
		return;
	}
	if (Password === " " || Password === "" || Password === null) {
		showNotificationError("Please Enter Password", "password", "error");
		return;
	}
	if (cnfPassword === "" || cnfPassword === "" || cnfPassword === null) {
		showNotificationError("Please Enter Confirm Password", "confirmPassword", "error");
		return;
	}
	if (cnfPassword!= Password ) {
		showNotificationError("Please Enter Valid Password", "confirmPassword", "error");
		return;
	}
	
	if (userRoleId === "0" || userRoleId === "") {
		showNotificationError("Please Select User Type", "role_id", "error");
		return;
	}
	
	/*if (employeeNo === "0" || employeeNo === "" || employeeNo === null) {
		showNotificationError("Please Enter Employee No. ", "employeeno",
				"error");
		return;
	}
	
	
	if (joiningDate === "0" || joiningDate === "" || joiningDate === null) {
		showNotificationError("Please Enter Joining Date ", "joiningdate",
				"error");
		return;
	}

	if (leaveDate === "0" || leaveDate === "" || leaveDate === null) {
		showNotificationError("Please Enter Leave Date ", "leavedate", "error");
		return;
	}

	if (licenseNo === "0" || licenseNo === "" || licenseNo === null) {
		showNotificationError("Please Enter License No. ", "licenseno", "error");
		return;
	}

	if (licenseType === "0" || licenseType === "" || licenseType === null) {
		showNotificationError("Please Enter License Type ", "licensetype",
				"error");
		return;
	}

	if (licenseState === "0" || licenseState === "" || licenseState === null) {
		showNotificationError("Please Enter License State ", "licensestate",
				"error");
		return;
	}

	if (hourlyLabourRate === "0" || hourlyLabourRate === ""
			|| hourlyLabourRate === null) {
		showNotificationError("Please Enter Hourly Labour Rate ",
				"hourlylaborrate", "error");
		return;
	}*/
	
//	alert("oBJjSON--->"+JSON.stringify(objJson))
	console.log("+oBJjSON--->"+JSON.stringify(objJson));
	var strUrl = Service.insertAndupdateContact;
	$.ajax({    type : 'POST',
				url : strUrl,
				data : JSON.stringify(objJson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
		/*		
				  headers: { "X-TENANT-ID": "tenantId2" },
				 */
				success : function(data) {
					JSON.stringify(objJson)
					console.log("Inserted-------------->"
							+ JSON.stringify(data));
					var responsecode = data.responseCode;
					var status1 = data.status;
					console.log("responsecode====>" + responsecode)
					console.log("status====>" + status1)
					if (200 !== responsecode) {
						alert("User Name Is Already Exit");
					} else {
						showNotificationError("Successfully Inserted ",
								"save_user_details", "success");
						window
								.setTimeout(
										function() {
											window.location
													.replace("http://192.168.1.191:2706/FMS/Pages/Contact&Users/contactlist.html");
										}, 2000);
					           }

				          },
				error : function() {
					console.log('In Error of  Details ');
				}
			});
}

// update userdetails function here appending register data on html page.
function updateContactDetail(serialno, username, firstname, middlename,
		lastname, email, phone_num, address, countryid, stateid, districtid,
		mandalid, cityid, postalcode, jobtile_id, dob, employeetype_id,
		employee_no, joining_date, leave_date, licence_num, licence_type,
		licence_state, hourly_labour_cost,country,state,district,mandal,city){
	getCountryUpdate();
	getStateForUpdate(countryid);
	//alert("State---->"+mandalid);
	getDistrictForReg(stateid)
	getDistrictForUpdate(stateid);
	getMandalUpdate(districtid);
	getCityForUpdate(mandalid);
	$('#sericalID').val(serialno);
	$('#user_name').val(username);
	$('#firstname').val(firstname);
	$('#middlename').val(middlename);
	$('#lastname').val(lastname);
	$('#dateofbirth').val(dob);
	$('#emailid').val(email);
	$('#phonenumber').val(phone_num);
	$('#address').val(address);
	$('#pincode').val(postalcode);
	$('#employeeno').val(employee_no);
	$('#joiningdate').val(joining_date);
	$('#leavedate').val(leave_date);
	$('#licenseno').val(licence_num);
	$('#licensetype').val(licence_type);
	$('#licensestate').val(licence_state);
	$('#hourlylaborrate').val(hourly_labour_cost);
	//alert("employeetype_id--->"+state);
	$("#employee_type option:contains(" +employeetype_id+ ")").attr('selected', 'selected').trigger("chosen:updated");
	$("#country_id option:contains(" +country+ ")").attr('selected', 'selected').trigger("chosen:updated");
	$("#districtid option:contains(" +district+ ")").attr('selected', 'selected').trigger("chosen:updated");
	$("#state_id option:contains(" +state+ ")").attr('selected', 'selected').trigger("chosen:updated");
	$("#mandal_id option:contains(" +mandal+ ")").attr('selected', 'selected').trigger("chosen:updated");
	$("#city_id option:contains(" +city+ ")").attr('selected', 'selected').trigger("chosen:updated");	
}
/**
 * fun:Update Register Contact date:17/12/2019
 * 
 * @returns
 */
//update contact details
function updateContact() {
	var serial_id = $('#sericalID').val();
    var uname = $('#user_name').val();
	var ufname = $('#firstname').val();
	var umiddlename = $('#middlename').val();
	var ulastname = $('#lastname').val();
	var udob = $('#dateofbirth').val();
	var uemailId = $('#emailid').val();
	var uphonenumber = $('#phonenumber').val();
	var ucountryid = $('#countryid').val();
	var ustateid = $('#state_id').val();
	var udistruictid = $('#district_id').val();
	var umandalid = $('#mandal_id').val();
	var ucityid = $('#city_id').val();
	var uaddress = $('#address').val();
	var upincode = $('#pincode').val();
	var ujobtitle = $('#jobtitle').val();
	var uemployeetype = $('#employee_type').val();
	var uemployeeno = $('#employeeno').val();
	var ujoiningdate = $('#joiningdate').val();
	var uleavedate = $('#leavedate').val();
	var ulicenseno = $('#licenseno').val();
	var ulicensetype = $('#licensetype').val();
	var ulicensetate = $('#licensestate').val();
	var uhourlylaborrate = $('#hourlylaborrate').val();
	if (umiddlename == null || umiddlename == "") {
		umiddlename = ' ';
	}
	if (ujobtitle == 0 || ujobtitle == "0" || ujobtitle == null) {
		ujobtitle = 0;
	}
	
	if(uemployeeno==null||uemployeeno==""){
		uemployeeno=0;
	}
	if(ujoiningdate==null||ujoiningdate==""){
		ujoiningdate=null;
	}else{
		ujoiningdate="'"+ujoiningdate+"'"
	}
	
	if(uleavedate==null||uleavedate==""){
		uleavedate=null;
	}else{
		uleavedate="'"+uleavedate+"'"
	}
	if(ulicenseno==null||ulicenseno==""){
		ulicenseno=0;
	}
	if(ulicensetype==null||ulicensetype==""){
		ulicensetype=0;
	}
	if(ulicensetate==null||ulicensetype==""){
		ulicensetate=0;
	}
	if(uhourlylaborrate==null||uhourlylaborrate==""){
		uhourlylaborrate=0;
	}
	/*if(Password==cnfPassword){
		var pass_word=Password
	}else{
		//alert("Please Enter Correct Password")
	}*/
	if (umiddlename == null || umiddlename == "") {
		umiddlename = ' ';
	}
	if (ujobtitle == 0 || ujobtitle == "0" || ujobtitle == null) {
		ujobtitle = 0;
	}
	var objJson = {
		"condition" : 2,
		"serialno" : serial_id,
		"username" : 0,
		"firstname" : 0,
		"middlename" : 0,
		"lastname" : 0,
		"email" : uemailId,
		"phone_num" : ' ',
		"address" : ' ',
		"countryid" : 0,
		"stateid" : 0,
		"districtid" : 0,
		"mandalid" : 0,
		"cityid" : 0,
		"postalcode" : 0,
		"jobtile_id" : ujobtitle,
		"dob" : udob,
		"employeetype_id" : uemployeetype,
		"browse" : "hh",
		"employee_no" : uemployeeno,
		"joining_date" : ujoiningdate,
		"leave_date" : uleavedate,
		"licence_num" : ulicenseno,
		"licence_type" : ulicensetype,
		"licence_state" : ulicensetate,
		"hourly_labour_cost" : uhourlylaborrate,
		"createdbyid" : 1,
		"createdbymoduleid" : 1,
		"createdbyroleid" : 1

	};
   
	
	 
	if (uname === "0" || uname === "" || uname === null) {
		// alert("Please Enter Username");
		showNotificationError("Please Enter Username", "user_name", "error");
		return;
	}
	if (ufname === "0" || ufname === "" || ufname === null) {
		showNotificationError("Please Enter Firstname", "firstname", "error");
		return;
	}
	if (ulastname === "0" || ulastname === "" || ulastname === null) {
		showNotificationError("Please Enter Lastname", "lastname", "error");
		return;
	}

	if (udob === "0" || udob === "" || udob === null) {
		showNotificationError("Please Enter Date Of Birth", "date2", "error");
		return;
	}

	if (uemailId === "0" || uemailId === "" || uemailId === null) {
		showNotificationError("Please Enter EmailId", "emailid", "error");
		return;
	}
	if (uphonenumber === "0" || uphonenumber === "" || uphonenumber === null) {
		showNotificationError("Please Enter PhoneNumber", "phonenumber",
				"error");
		return;
	}
	if (ucountryid === "0" || ucountryid === "") {
		showNotificationError("Please Select Country", "countryid", "error");
		return;
	}
	// alert("stateId----->"+stateId);
	if (ustateid === "0" || ustateid === "") {
		// alert("state id jjj")
		// showNotificationError("Please Select State", "stateid", "error");
		showNotificationError("Please Select District", "state_id", "error");
		return;
	}
	if (udistruictid === "0" || udistruictid === "") {
		showNotificationError("Please Select District", "district", "error");
		return;
	}
	if (umandalid === "0" || umandalid === "") {
		showNotificationError("Please Select Mandal", "tahsil", "error");
		return;
	}
	if (ucityid === "0" || ucityid === "") {
		showNotificationError("Please Select City", "city", "error");
		return;
	}
	if (uaddress === "0" || uaddress === "" || uaddress === null) {
		showNotificationError("Please Enter Address ", "address", "error");
		return;
	}
	if (upincode === "0" || upincode === "" || upincode === null) {
		showNotificationError("Please Enter Pincode ", "pincode", "error");
		return;
	}
	if (uemployeetype === "0" || uemployeetype === "") {
		showNotificationError("Please Select Employee Type ", "employeetype",
				"error");
		return;
	}

/*	if (uemployeeno === "0" || uemployeeno === "" || uemployeeno === null) {
		showNotificationError("Please Enter Employee No. ", "employeetype",
				"error");
		return;
	}

	if (ujoiningdate === "0" || ujoiningdate === "" || ujoiningdate === null) {
		showNotificationError("Please Select Joining Date ", "joiningdate",
				"error");
		return;
	}

	if (uleavedate === "0" || uleavedate === "" || uleavedate === null) {
		showNotificationError("Please Select Leave Date", "leavedate", "error");
		return;
	}

	if (ulicenseno === "0" || ulicenseno === "" || ulicenseno === null) {
		showNotificationError("Please Enter License No. ", "licenseno", "error");
		return;
	}

	if (ulicensetype === "0" || ulicensetype === "" || ulicensetype === null) {
		showNotificationError("Please Enter License Type ", "licensetype",
				"error");
		return;
	}

	if (ulicensetate === "0" || ulicensetate === "" || ulicensetate === null) {
		showNotificationError("Please Enter License State ", "licensestate",
				"error");
		return;
	}

	if (uhourlylaborrate === "0" || uhourlylaborrate === ""
			|| uhourlylaborrate === null) {
		showNotificationError("Please Enter Hourly Labour Rate ",
				"hourlylaborrate", "error");
		return;
	}*/
	console.log(JSON.stringify(objJson));
	var strUrl = Service.insertAndupdateContact;
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
			console.log("Updated  Successfully-------------->"
					+ JSON.stringify(data));
			var responsecode = data.responseCode;
			var status1 = data.status;
			console.log("responsecode====>" + responsecode)
			console.log("status====>" + status1)
			if (200 !== responsecode) {
				alert("User Name Is Already Exit");
			} else {
				showNotificationError("Updated Successfully",
						"update_contact_details", "success");
                    
				setTimeout(function(){
					  stop = true;
					  $('#update').modal('hide');
					},2000) 
			}

		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

/**
 * Fun:delete deleteContact
 * @param serialid
 * date:17/12/2019
 * @returns
 */
function deleteContact(serialid){
	$('#sericalID').val(serialid);
}

//delete Contact Details
function deleteContactDetails() {
	
	var serial_id=$('#sericalID').val();
	//alert("--->"+serial_id);
	console.log("Delete function calling....");
	var objUpd = {
		"serialno" : serial_id
	}
	var strUrl2 = Service.deleteContact;
	console.log('==== strUrl' + strUrl2);
	// alert("strUrl------>" + strUrl2);
	$.ajax({
		type : "POST",
		url : strUrl2,
		dataType : "json",
		data : JSON.stringify(objUpd),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("Successfully Deleted")
			getContactUsers();
			$('#delete').modal('hide')

		/*	window.setTimeout(function() {
				location.reload();
			}, 500);*/

		},
		error : function() {
			console.log("Error In case_ReOpen Not updating");
		}
	});

}


// get employee type dropdown function
function geEmployeeType() {
	// alert("employee type..........")
	$('#employeetype').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.geEmployeeType;
	$.ajax({
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
				var jsonArray = data.contactUsersControllerDTO;
				var selectfirst = "<option value='0'>Please Select Employee Type</option>";
				$('#employeetype').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var genderType = "<option value=" + resData.employeetype_id
							+ ">" + resData.employeeType + "</option>";
					$(genderType).appendTo('#employeetype');

				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
	$('#employeetype').trigger("chosen:updated");
	$("#employeetype").chosen();
}

//get employee type dropdown function
function geEmployeeTypeForUpdate() {
	$('#employee_type').empty();
	var strUrl = Service.geEmployeeType;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.contactUsersControllerDTO;
				$.each(jsonArray, function(i, resData) {
					var genderType = "<option value=" + resData.employeetype_id
							+ ">" + resData.employeeType + "</option>";
					$(genderType).appendTo('#employee_type');

				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
	$('#employee_type').trigger("chosen:updated");
	$("#employee_type").chosen();
}

function loadDataTable01(tableClass) {
	$('#dataTables-example01').DataTable(
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
						// {extend: 'pdf', title: 'ExampleFile'},
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
		position : 'top',
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
		showDuration : 600,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};

	$(boxId).notify(msg, options);
}

/**
 * fun:In this function getting all registerd users details. date:17/12/2019
 * @returns
 */
function getContactUsers() {
	$("#deleteButtonID").hide();
	var strUrl = 'http://192.168.1.191:8085/FleetManagement/contactUsersController/getContactList';
	console.log("" + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			console.log("success------>" + data);
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				var jsonArray = data.contactUsersControllerDTO;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					$('#DataTables_Table_0_length').empty();
					getContactUsersData(jsonArray);
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
function getContactUsersData(strData) {
	$('#vehicleList_Id').empty();
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		var ObjTableTag = document.createElement("table");
		$(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
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
		$(objTHead2).html("Name");
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
		$(objTHead3).html("Employee Type");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		/*var objTHead3 = document.createElement("th");
		$(objTHead3).html("Joing Date");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);*/

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
									+ strData[i].serialno
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].firstname);
			console.log('username' + strData[i].firstname);
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
			$(tablcol5).html(strData[i].employeeType);
			console.log(' employeeType' + strData[i].employeeType);
			$(tbleRow).append(tablcol5);

		/*	var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].joining_date);
			console.log(' joining_date' + strData[i].joining_date);
			$(tbleRow).append(tablcol6);*/

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<a href="#" data-toggle="modal" data-placement="bottom" data-target="#update" title="View"><i class="fa fa-edit"></i></a');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'updateContactDetail("' + strData[i].serialno + '","'
							+ strData[i].username + '","'
							+ strData[i].firstname + '","'
							+ strData[i].middlename + '","'
							+ strData[i].lastname + '","' + strData[i].email
							+ '","' + strData[i].phone_num + '","'
							+ strData[i].address + '","' + strData[i].countryid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].mandalid + '","' + strData[i].cityid
							+ '","' + strData[i].postalcode + '","'
							+ strData[i].jobtile_id + '","' + strData[i].dob
							+ '","' + strData[i].employeeType + '","'
							+ strData[i].employee_no + '","'
							+ strData[i].joining_date + '","'
							+ strData[i].leave_date + '","'
							+ strData[i].licence_num + '","'
							+ strData[i].licence_type + '","'
							+ strData[i].licence_state + '","'
							+ strData[i].hourly_labour_cost + '","'+ strData[i].countryname + '","'+ strData[i].statename + '","'+ strData[i].districtname + '","'+ strData[i].mandalname + '","'+ strData[i].cityname + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#delete" ></span>');
			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteContact("' + strData[i].serialno + '")');

			$(objTBody).append(tbleRow);
		}

		$("#vehicleList_Id").append(objDivTag);
		// $('#deleteButtonID').show();
	//	$("#deleteButtonID").show();

	} catch (err) {
		console.log("example" + err);
	}
}

//search contact Details
function searchContactUsers(empType) {
	$("#deleteButtonID").hide();
	var nameid=$('#name').val();
	var emailId=$('#email').val();
	var phoneNo=$('#phoneno').val();
	if(nameid==null||nameid==""){
		nameid=null;
	}else{
		nameid="'"+nameid+"'"
	}
		
	if(emailId==null||emailId==""){
		emailId=null;
	}else{
		emailId="'"+emailId+"'"
	}
	if(phoneNo==null||phoneNo==""){
		phoneNo=null;
	}else{
		phoneNo="'"+phoneNo+"'"
	}
	if(empType==0||empType==null||empType==''){
		empType=null;
	}
	
	/*if(empType!=6||empType!=5||empType!=7||empType!=0){
	if(nameid==null&&emailId==null&&phoneNo==null){
		showNotificationError("Please Select At Least One Search Parameter", "serchbtnid", "error");
    	return true;	
	}
	}*/
	 var objJson = {
				  "firstname":nameid,
				  "email":emailId,
				  "phonenum":phoneNo,
				  "employeeType":empType
		   };
	    var strUrl = 'http://localhost:2000/FleetManagement/contactUsersController/searchContactDetails';
	    console.log("" + strUrl);
	    $.ajax({
	        type: "POST",
	        url: strUrl,
	        dataType: "json",
	        data: JSON.stringify(objJson),
	        contentType: "application/json",
	        async: false,
	        crossDomain: true,
	        success: function(data) {
	        	console.log("success------>" + data);
				var responsecode = data.responseCode;
			//	alert("Response Code----->"+responsecode);
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
						searchContactUsersData(jsonArray);
						loadDataTable1()
					} else {
					}
				}
			},
	        error: function() {
	            state = [];
	            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
	        }
	    });
	}
	;

// dom function calling...
function searchContactUsersData(strData) {	
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
		$(objTHead2).html("Name");
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
		$(objTHead3).html("Employee Type");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead3 = document.createElement("th");
		$(objTHead3).html("Joing Date");
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
									+ strData[i].serialno
									+ ' name="case"  )" ><span class="checkmark"> </label>');
			$(tablcol1).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].firstname);
			console.log('username' + strData[i].firstname);
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
			$(tablcol5).html(strData[i].employeeType);
			console.log(' employeeType' + strData[i].employeeType);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].joining_date);
			console.log(' joining_date' + strData[i].joining_date);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7)
					.html(
							'<a href="#" data-toggle="modal" data-placement="bottom" data-target="#update" title="View"><i class="fa fa-edit"></i></a');
			$(tbleRow).append(tablcol7);
			$(tablcol7).attr(
					'onclick',
					'updateContactDetail("' + strData[i].serialno + '","'
							+ strData[i].username + '","'
							+ strData[i].firstname + '","'
							+ strData[i].middlename + '","'
							+ strData[i].lastname + '","' + strData[i].email
							+ '","' + strData[i].phone_num + '","'
							+ strData[i].address + '","' + strData[i].countryid
							+ '","' + strData[i].stateid + '","'
							+ strData[i].districtid + '","'
							+ strData[i].mandalid + '","' + strData[i].cityid
							+ '","' + strData[i].postalcode + '","'
							+ strData[i].jobtile_id + '","' + strData[i].dob
							+ '","' + strData[i].employeeType + '","'
							+ strData[i].employee_no + '","'
							+ strData[i].joining_date + '","'
							+ strData[i].leave_date + '","'
							+ strData[i].licence_num + '","'
							+ strData[i].licence_type + '","'
							+ strData[i].licence_state + '","'
							+ strData[i].hourly_labour_cost + '","'+ strData[i].countryname + '","'+ strData[i].statename + '","'+ strData[i].districtname + '","'+ strData[i].mandalname + '","'+ strData[i].cityname + '")');

			var tablcol8 = document.createElement("td");
			$(tablcol8)
					.html(
							'<span class="glyphicon glyphicon-trash" data-toggle="modal" data-target="#" ></span>');
			$(tbleRow).append(tablcol8);
			$(tablcol8).attr('onclick',
					'deleteContact("' + strData[i].serialno + '")');

			$(objTBody).append(tbleRow);
		}

		$("#vehicleList_Id").append(objDivTag);
		// $('#deleteButtonID').show();
		$("#deleteButtonID").show();

	} catch (err) {
		console.log("example" + err);
	}
}


$(document).ready(function(){
	$('#dateofbirth').datepicker({
		// format: 'mm-dd-yyyy',
		format : 'yyyy-mm-dd',
		// sideBySide: true,
		// format: 'YYYY-MM-DD HH:mm:ss'
		autoclose : true,
		todayHighlight : true,
		changeMonth : true,
		changeYear : true,
		endDate : "today",

	}).on('changeDate', function(ev) {
		$(this).datepicker('hide');
	});

	$('#correctiveActionDateReg').keyup(function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9^-]/g, '');
		}
	});
});//

// this function reading selected checkbox..
function deleteMultipleContactchkboxReading() {
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
		// alert("You have selected " + selected);
		console.log("selected-----" + selected);
		$('#sericalID').val(selected);
		$('#delete').modal('show');

	} else {
		alert("Please at least check one of the checkbox");
	}
}

//For Enable And Disable Multiple Delete Button
function deleteBtnEnableAndDisableboxReading(){
	var chkArray = [];
	$("#tbodyData input:checked").each(function() {
		chkArray.push($(this).val());
	});
	var selected;
	selected = chkArray.join(',');
	if (selected.length > 0) {
		console.log("selected-----" + selected);
		//$('#sericalID').val(selected);
		//$('#delete').modal('show');
		$("#deleteButtonID").show();
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
            console.log("hlw");
		}else{
			$("#deleteButtonID").hide();
		}
	});

}

//single checkbox reading
function onclickCheckbox() {
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		console.log("myCheck12:---" + $(this).val());
		arrSelectedData.push($(this).val());
		//console.log("onclickCheckbox------>"+onclickCheckbox)
		count++;
		$('#reg_no').val(arrSelectedData);
	});
	if ($(".case").length === $(".case:checked").length) {
		$("#selectall").prop("checked", true);
	} else {
		$("#selectall").removeAttr("checked");

	}
	deleteBtnEnableAndDisableboxReading()
}

//reset insert contact Details
function resetSaveContactDetails(){
	$('#username').val("");
	$('#firstname').val("");
	$('#middlename').val("");
	$('#lastname').val("");
	$('#dateofbirth').val("");
	$('#emailid').val("");
	$('#phonenumber').val("");
	$('#countryid').val("0").trigger("chosen:updated");
	$('#state_id').val("0").trigger("chosen:updated");
	$('#district').val("0").trigger("chosen:updated");
	$('#tahsil').val("0").trigger("chosen:updated");
	$('#city').val("-1").trigger("chosen:updated");
	$('#address').val("");
	$('#pincode').val("");
	$('#jobtitle').val("");
	$('#employeetype').val("0").trigger("chosen:updated");
	$('#employeeno').val("");
	$('#joiningdate').val("");
    $('#leavedate').val("");
	$('#licenseno').val("");
	$('#licensetype').val("");
	$('#licensestate').val("");
	$('#hourlylaborrate').val("");
}

//reset update contact details
function resetUpdateContactDetails(){
	//$('#sericalID').val();
    $('#user_name').val("");
	$('#firstname').val("");
	$('#middlename').val("");
	$('#lastname').val("");
	$('#dateofbirth').val("");
	$('#emailid').val("");
	$('#phonenumber').val("");
	$('#countryid').val("0").trigger("chosen:updated");
	$('#state_id').val("0").trigger("chosen:updated");
	$('#districtid').val("0").trigger("chosen:updated");
	$('#mandal_id').val("-1").trigger("chosen:updated");
	$('#city_id').val("0").trigger("chosen:updated");
	$('#address').val("");
	$('#pincode').val("");
	$('#jobtitle').val("");
	$('#employeetype').val("0").trigger("chosen:updated");
	$('#employeeno').val("");
	$('#joiningdate').val("");
	$('#leavedate').val("");
	$('#licenseno').val("");
	$('#licensetype').val("");
	$('#licensestate').val("");
	$('#hourlylaborrate').val("");

}

//reset search functionality
function resetSearch(){
	$('#name').val("");
	$('#email').val("");
	$('#phoneno').val("");
	getContactUsers();
}



//this function reading selected checkbox..
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
		// alert("You have selected " + selected);
		console.log("selected----->" + selected);
		multipledeleteVendorDetails(selected);

	} else {
		alert("Please at least check one of the checkbox");
	}

}


//get employee type dropdown function
function getUserRoles() {
	$('#role_id').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = 'http://localhost:8085/FleetManagement/contactUsersController/getUserRoles';
	$.ajax({
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
				var jsonArray = data.contactUsersControllerDTO;
				var selectfirst = "<option value='0'>Please Select Role</option>";
				$('#role_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var genderType = "<option value=" + resData.createdbyroleid
							+ ">" + resData.roleName + "</option>";
					$(genderType).appendTo('#role_id');

				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
	$('#role_id').trigger("chosen:updated");
	$("#role_id").chosen();
}

//==========================for validation========================
//valdation
$(function() {
    $('#username').on('keypress', function(e) {
        if (e.which == 32)
            return false;
    });
});


$('#firstname').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
});

$('#middlename').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
});

$('#lastname').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
});

/*$('#address').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
    mailValidation(val);
});*/


$(document).ready(function() {
$('#emailid').focusout(function(){
              $('#emailid').filter(function(){
              var emil=$('#emailid').val();
              var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if( !emailReg.test( emil ) ) {
               // alert('Please enter valid email');
                showNotificationError("Please enter valid email", "emailid",
				"error");
                } else {
                //alert('Thank you for your valid email');
                
                }
         })
     });
});

//dataTable
function loadDataTable1(tableClass) {
	$('.dataTables-example1').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1], [ 25, 50, 75, "All" ] ],
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
