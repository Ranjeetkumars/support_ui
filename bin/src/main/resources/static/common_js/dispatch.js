var regulareExpressionValidation = {
		"name":"/^[a-z0-9_-]{5,15}$/",
		"mobileNumber":"/^[0-9]{10}$/",
		// "email":"/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/",
		"dropDownVaalue":"0"
}




$(document).ready(function () {
	getListOfInboxMail();
	
	decript();
	
	
	loadGender();
	/* Data Table */
	$('#dtBasicExample').DataTable();
    /* SummerNote */
	$('.summernote').summernote({
		   height: 200,
		   disableResizeEditor:false,
		   popover: {
			      image: [
			    	// This is a Custom Button in a new Toolbar Area
			        ['custom', ['examplePlugin']],
			        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
			        ['float', ['floatLeft', 'floatRight', 'floatNone']],
			        ['remove', ['removeMedia']]
			      ]
			    }
		   
		   
});

	/* Tags Input */
	$('.tagsinput').tagsinput();

	/* Tootip */
	$('[data-toggle="tooltip"]').tooltip();

	/* Choosen Select */
	$('select').chosen();

	/* Search Fileters */
	$("#myInput").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#appendListOfMailDetails tr").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	/* Mail Open */

	$('tbody tr').on('click', function () {
		$('#emailList').css('display', 'none');
		$('#mailView').css('display', 'block');
		$('#dispatchView').css('display', 'none');
	});

	/* Click functionality of Input Button */
	$('#inbox').on('click', function () {
		$('#mailView').css('display', 'none');
		$('#emailList').css('display', 'block');
		$('#dispatchView').css('display', 'none');
	});
	/* Click functionality of Dispatch Button */
	$('#dispatch').on('click', function () {
		/* $('#dispatchView').load('helprequestform.html'); */
		$('#dispatchView').css('display', 'block');
		$('#mailView').css('display', 'none');
		$('#emailList').css('display', 'none');
	});

	/* Reply Button */
	$('#reply').click(function () {
		$('#replyContent').css('display', 'block');
	});
});


$(document)
	.ready(
		function () {
			$('select').chosen();
			// Incident Location from Google Places API
			var autocomplete;
			autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('incidentAddress')), {
					types: ['geocode']
				});
			google.maps.event
				.addListener(
					autocomplete,
					'place_changed',
					function () {
						var near_place = autocomplete
							.getPlace();
						var latitude = near_place.geometry.location
							.lat();
						var langitude = near_place.geometry.location
							.lng();
						document
							.getElementById('location').value = latitude +
							',' + langitude;
					});

		});

// Get Current Location
$('#currentLocation')
	.click(
		function () {
			if (navigator.geolocation) {
				navigator.geolocation
					.getCurrentPosition(showPosition);

			} else {
				aler("Geolocation is not supported by this browser.");
			}

			function showPosition(position) {
				var geocoder = new google.maps.Geocoder;
				document.getElementById('location').value = position.coords.latitude +
					',' + position.coords.longitude;
				geocodeLatLng(geocoder);
			}
		});

function geocodeLatLng(geocoder) {
	var input = document.getElementById('location').value;
	var latlngStr = input.split(',', 2);
	var latlng = {
		lat: parseFloat(latlngStr[0]),
		lng: parseFloat(latlngStr[1])
	};
	geocoder
		.geocode({
				'location': latlng
			},
			function (results, status) {
				if (status === 'OK') {
					if (results[0]) {
						// alert('results[0].formatted_address::'+results[0].formatted_address);

						var removeFirstAddressStr = results[0].formatted_address.replace('Address:', '');
						console.log(removeFirstAddressStr);

						document
							.getElementById('incidentAddress').value = removeFirstAddressStr;
					}
				}
			});
}

// Validations
function validations() {
	$('form').validate({
		rules: {
			callerNumber: 'required',
			callerName: 'required',
			victimName: 'required',
			// chiefComplaint: 'required',
			age: 'required',
			gender: 'required',
			problem: 'required',
			incidentAddress: 'required',
			location: 'required'
		},
		messages: {
			callerNumber: 'Please Enter Caller Number',
			callerName: 'Please Enter Caller Name',
			// chiefComplaint: 'Please Select Chief Complaint',
			victimName: 'Please Enter Victim Name',
			age: 'Please Enter Age',
			gender: 'Please Select Gender',
			problem: 'Please Enter problem',
			incidentAddress: 'Please Enter Incident Location',
			location: 'Please Enter Location Lat and Langs'
		},
		submitHandler: function (form) {
			form.submit();
		}
	});
}


function loadGender() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		async: false,
		url: 'http://192.168.1.105:1003/common/commondata/getGenders',
		success: function (data, textStatus, jqXHR) {
			console.log("Status" + textStatus);
			var obj = JSON.stringify(data.gendersControllerDTOs);
			JSON.parse(obj).forEach(item => {
				$('#gender').append('<option value=' + item.genderId + '>' + item.genderName + '</option>');
			});
			loadListOfMedicalComplainType();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('update Stock error: ' + textStatus);
		}
	});
}


function loadListOfMedicalComplainType() {
	// alert('loadListOfMedicalComplainType method is executed');
	$.ajax({
		type: 'POST',
		url: "http://192.168.1.105:1003/common/commondata/getAllCheifComplaint",
		data: JSON.stringify({
			"emeregerncyGroupid": 2
		}),
		success: function (data, textStatus, jqXHR) {
			console.log('function is executed success');
			console.log("Status" + textStatus);
			var obj = JSON.stringify(data.objBloodGroupcontrollerDTO);
			var selectfirst = "<option value='0'>Select Medical</option>";
			$('#medicalComplainTypeId').append(selectfirst);
			JSON.parse(obj).forEach(item => {
				var medicalComplainType = "<option value=" + item.chct_chiefcomptypeid + ">" + item.chct_chiefcompltype + "</option>";
				$(medicalComplainType).appendTo('#medicalComplainTypeId');
			});
			$('#medicalComplainTypeId').trigger("chosen:updated");
			$('#medicalComplainTypeId').chosen();
		},
		error: function (e) {
			console.log(e);
		},
		dataType: "json",
		contentType: "application/json"
	});
}

function loadListOfPoliceComplainType() {
	$.ajax({
		type: 'POST',
		url: "http://192.168.1.105:1003/common/commondata/getAllCheifComplaint",
		data: JSON.stringify({
			"emeregerncyGroupid": 3
		}),
		success: function (data, textStatus, jqXHR) {
			console.log('function is executed success');
			console.log("Status" + textStatus);
			var obj = JSON.stringify(data.objBloodGroupcontrollerDTO);
			var selectfirst = "<option value='0'>Select Police</option>";
			$('#policeComplainTypeId').append(selectfirst);
			JSON.parse(obj).forEach(item => {
				var medicalComplainType = "<option value=" + item.chct_chiefcomptypeid + ">" + item.chct_chiefcompltype + "</option>";
				$(medicalComplainType).appendTo('#policeComplainTypeId');
			});
			$('#policeComplainTypeId').trigger("chosen:updated");
			$('#policeComplainTypeId').chosen();
		},
		error: function (e) {
			console.log(e);
		},
		dataType: "json",
		contentType: "application/json"
	});


}

function loadListOfFireComplainType() {
	$.ajax({
		type: 'POST',
		url: "http://192.168.1.105:1003/common/commondata/getAllCheifComplaint",
		data: JSON.stringify({
			"emeregerncyGroupid": 5
		}),
		success: function (data, textStatus, jqXHR) {
			console.log('function is executed success');
			console.log("Status" + textStatus);
			var obj = JSON.stringify(data.objBloodGroupcontrollerDTO);
			var selectfirst = "<option value='0'>Select Fire</option>";
			$('#fireComplainTypeId').append(selectfirst);
			JSON.parse(obj).forEach(item => {
				var medicalComplainType = "<option value=" + item.chct_chiefcomptypeid + ">" + item.chct_chiefcompltype + "</option>";
				$(medicalComplainType).appendTo('#fireComplainTypeId');
			});
			$('#fireComplainTypeId').trigger("chosen:updated");
			$('#fireComplainTypeId').chosen();
		},
		error: function (e) {
			console.log(e);
		},
		dataType: "json",
		contentType: "application/json"
	});


}


$("#medicalComplaintChkId").val("FALSE"); // For initially make the `checkbox`
// value FALSE
function onCheckChange() {
    console.log('Medical check box onchange');
    if ($("#medicalComplaintChkId").is(':checked')) {
        alert('Medical check box checked');
        $("#medicalComplainTypeId").prop('disabled', false).trigger("chosen:updated");
    } else {
        alert('Medical check box unchecked');
        $("#medicalComplainTypeId").prop('disabled', true).trigger("chosen:updated");
    }
}
function onCheckChangeForPolice() {
	loadListOfPoliceComplainType();
    console.log('Police check box onchange');
    if ($("#policeComplaintChkId").is(':checked')) {
        alert('Police check box checked');
        $("#policeComplainTypeId").prop('disabled', false).trigger("chosen:updated");
    } else {
        alert('Police check box unchecked');
        $("#policeComplainTypeId").prop('disabled', true).trigger("chosen:updated");
    }
}
function onCheckChangeForFire() {
	loadListOfFireComplainType();
    console.log('Fire check box onchange');
    if ($("#fireComplaintChkId").is(':checked')) {
        alert('Fire check box checked');
        $("#fireComplainTypeId").prop('disabled', false).trigger("chosen:updated");
    } else {
        alert('Fire check box unchecked');
        $("#fireComplainTypeId").prop('disabled', true).trigger("chosen:updated");
    }
}


function addPatient() {

  var currentLocation = $("#currentLocation").val();
  var callerNumber =$("#callerNumber").val();
  var callerName =$("#callerName").val();
  var emailId = $("#email").val();
 
  var emergencytype =$("#medicalComplaintChkId").val();
  var victimName =$("#victimName").val();
  var age = $("#age").val();
  var gender = $("#gender").val();
  var medical = $("#medicalComplainTypeId").val();
  var police = $("#policeComplainTypeId").val();
  var fire = $("#fireComplainTypeId").val();
  var incidentAddress = $("#currentLocation").val();
  var remarks = $("#remarksId").val();
  var addPatientJObject = {
		   "callerNumber":callerNumber,
		   "callerName":callerName,
		   "email":emailId,
		   "emergencyType":"1",
		   "victimName":victimName,
		   "victimAge":age,
		   "gender":gender,
		   "medicalChiefCompType":medical,
		   "policeChiefCompType":police,
		   "fireChiefCompType":fire,
		   "address":"hyderabad",
		   "remarks":"good"
	}
  console.log(JSON.stringify(addPatientJObject));
   var rtnValidationStatus = validationOfDispatch(addPatientJObject);
   console.log('rtnValidationStatus::'+rtnValidationStatus);
   if(rtnValidationStatus==true||rtnValidationStatus=='true'||rtnValidationStatus =="true"){
	  console.log("inside if-condo")
	   $.ajax({
			type: 'POST',
			url: "http://192.168.1.105:2706/api/dispatch_con/insertDispatch",
			data: JSON.stringify(addPatientJObject),
			success: function (data, textStatus, jqXHR) {
				alert("@@@@@@@@@@@@@@@@@@@@@@@@@="+data.count);
			if(data.count==2){
			toastr.success('Patient is register Successfully', {
					timeOut: 10000
				});
			window.location.reload
			}
			else{
				toastr.error('Patient is  not register Successfully', {
					timeOut: 10000
				});
			}
				
			},
			error: function(e){
				console.log(e);
			},
			dataType: "json",
			contentType: "application/json"
		});
	}
  
}
function validationOfDispatch (addPatientJObject){
	var IndNum = /^[0]?[789]\d{9}$/;
	var regName = /^[a-zA-Z ]{5,30}$/; 
	var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	if (IndNum.test(addPatientJObject.callerNumber)) {} else {
		toastr.error('please enter valid mobile number', {
			timeOut: 10000
		});
		return false
	}
	if (!regName.test(addPatientJObject.callerName)) {
		toastr.error('Please enter valid name', {
			timeOut: 10000
		});
		return false
	}
	if (!addPatientJObject.emailId == '' || !addPatientJObject.emailId == "" || !addPatientJObject.emailId == 'undefined') {
		if (regexEmail.test(addPatientJObject.email)) {} else {
			toastr.error('Please enter valid Email id', {
				timeOut: 10000
			});
		}
	}
	if (!regName.test(addPatientJObject.victimName)) {
		toastr.error('Please enter valid victim  name', {
			timeOut: 10000
		});
		return false
	}
	if (addPatientJObject.victimAge == '' || addPatientJObject.victimAge == "" || addPatientJObject.victimAge == 'undefined') {
		toastr.error('Please enter valid age', {
			timeOut: 10000
		});
		return false;
	}
	if (addPatientJObject.gender == '' || addPatientJObject.gender == "" || addPatientJObject.gender == 'undefined' || addPatientJObject.gender == 0) {
		toastr.error('Please enter gender type', {
			timeOut: 10000
		});
		return false;
	}
	if (addPatientJObject.medicalChiefCompType == '' || addPatientJObject.medicalChiefCompType == "" || addPatientJObject.medicalChiefCompType == 'undefined' || addPatientJObject.medicalChiefCompType == 0) {
		toastr.error('Please enter medical type', {
			timeOut: 10000
		});
		return false;
	}
	if (addPatientJObject.remarks == '' || addPatientJObject.remarks == "" || addPatientJObject.remarks == 'undefined' || addPatientJObject.remarks == 0) {
		toastr.error('Please enter remarks ', {
			timeOut: 10000
		});
		return false;
	}
	return true;
}




function resetDispatchForm(){
	alert('resetDispatchForm method is executed');
	$("#helpRequestForm").reset();
}


function decript(){
	
	 var getMailId = window.location.href;
		alert("@@@@@@@@@@@@@@@@@::"+getMailId);
		var arrayValue =  getMailId.split("?");
		alert(arrayValue[1]);//hwlJH9nRPKnaM/cc4FB5rw==
		var strUrl ="192.168.1.105:2706/api/version_1/getDescriptedId?id="+arrayValue[1];
		$.ajax({
			type: 'POST',
			url: strUrl,
			dataType: 'json',
		   success: function (data, textStatus, jqXHR) {
			
			alert('textStatus::'+textStatus);
			
			},
			error: function(e){
				console.log(e);
			}
			
		});
	
}



