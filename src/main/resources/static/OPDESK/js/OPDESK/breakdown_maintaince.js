var workshopName = [];
/*
 * @author: Bhuneshwar Patel
 */

/*
 * on loading
 */
$(document).ready(function() {
	try {
		getListOfDistrict();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
	$('#offRoadTimeReg').val('');
});

/**
 * 
 * At the time registation calling this function
 */

$('#registration').on('shown.bs.modal', function(e) {
	getListOfDistrictForReg();
	get_shiftTypes();
	workShopName();
	get_BreakDownSeverity();
	// issueType();
	// getPatientHandoverIssueReportToDm();

});

/**
 * 
 * At the time Updation calling this function
 */

$('#Update').on('shown.bs.modal', function(e) {
	// getPatientHandoverIssueReportToDm();
	payment_Type();
});

function getListOfDistrict() {
	loadingDistrictsMaster();
	$.each(district, function(i, resData) {
		var districts = "<option value=" + resData.districtID + ">"
				+ resData.districtName + "</option>";
		$(districts).appendTo('#district_id');
	});
	$('#district_id').trigger("chosen:updated");
	$("#district_id").chosen();

};

/*
 * @functionality: Search Patient Handover Issue Disrict Drop Down Loading For
 * Search
 */
function getListOfDistrictForReg() {
	loadingDistrictsMaster();
	$.each(district, function(i, resData) {
		var districts = "<option value=" + resData.districtID + ">"
				+ resData.districtName + "</option>";
		$(districts).appendTo('#district_id_reg');
	});
	$('#district_id_reg').trigger("chosen:updated");
	$("#district_id_reg").chosen();
};

// onchange for search patient handover issue
$('#district_id').on('change', function() {
	var listOfDistrict = $('#district_id').val();
	$('#baselocation_id').empty();
	baseLocation(listOfDistrict);
});

// on change for registation patient handover issue
$('#district_id_reg').on('change', function() {
	var listOfDistrict = $('#district_id_reg').val();
	$('#baselocationId_reg').empty();
	baseLocationForReg(listOfDistrict);
});

/*
 * @Functionality:Baselocation Dropdown Loading For Search Patient handover
 * issue
 */
function baseLocation(listOfDistrict) {
	$('#baselocation_id').empty();
	loadingBaseLocationMaster(listOfDistrict);
	var selectfirst = "<option value='0'>Select Baselocation</option>";
	$('#baselocation_id').append(selectfirst);
	$.each(baselocations, function(i, resData) {
		var baselocation = "<option value=" + resData.baselocationID + ">"
				+ resData.baselocationName + "</option>";
		$(baselocation).appendTo('#baselocation_id');
	//	$(baselocation).appendTo('#listOfBaseLocationForRegistration');

	});
	$('#baselocation_id').trigger("chosen:updated");
	$("#baselocation_id").chosen();
};

/*
 * @Functionality:Baselocation Dropdown Loading For Registation Patient Handover
 * issue
 */
function baseLocationForReg(listOfDistrict) {
	// here calling masterdata ajax call
	$('#baselocationId_reg').empty();
	loadingBaseLocationMaster(listOfDistrict);
	var selectfirst = "<option value='0'>Select Baselocation</option>";
	$('#baselocationId_reg').append(selectfirst);
	$.each(baselocations, function(i, resData) {
		var baselocation = "<option value=" + resData.baselocationID + ">"
				+ resData.baselocationName + "</option>";
		$(baselocation).appendTo('#baselocationId_reg');
		// $(baselocation).appendTo('#listOfBaseLocationForRegistration');

	});
	$('#baselocationId_reg').trigger("chosen:updated");
	$("#baselocationId_reg").chosen();
};

// on change for search Patient handover issue
$('#baselocation_id').on('change', function() {
	var baseLocationVal = $('#baselocation_id').val();
	$('#Ambulance_Id').empty();
	getAmbulance(baseLocationVal);
});

// on change for registation patient handover issue
$('#baselocationId_reg').on('change', function() {
	var baseLocationVal = $('#baselocationId_reg').val();
	$('#ambulanceId_reg').empty();
	getAmbulanceForReg(baseLocationVal);
});

// on change for registation patient handover issue
$('#ambulanceId_reg').on('change', function() {
	var vehicleId = $('#ambulanceId_reg').val();
	getOdoMeter(vehicleId);
});
//  

/*
 * @Functionality:Ambuance loading based on baselocation For search Patient
 * handover issue
 */
function getAmbulance(baseLocationVal) {
	$('#Ambulance_Id').empty();
	// here calling masterdata ajax call
	loadingAmbulanceMaster(baseLocationVal);
	var selectfirst = "<option value='0'>Select Ambulance</option>";
	$('#Ambulance_Id').append(selectfirst);
	$.each(ambulances, function(i, resData) {
		var ambulances = "<option value=" + resData.vehicleID + ">"
				+ resData.vehicleName + "</option>";
		$(ambulances).appendTo('#Ambulance_Id');
		// $(ambulances).appendTo('#listOfAmbulanceForRegistration');
	});
	$('#Ambulance_Id').trigger("chosen:updated");
	$("#Ambulance_Id").chosen();
};

/*
 * @Functionality:Ambulance loading based on baselocation For Registation
 * Patient handover issue
 */
function getAmbulanceForReg(baseLocationVal) {
	$('#ambulanceId_reg').empty();
	// here calling masterdata ajax call
	loadingAmbulanceMaster(baseLocationVal);
	var selectfirst = "<option value='0'>Select Ambulance</option>";
	$('#ambulanceId_reg').append(selectfirst);
	$.each(ambulances,
			function(i, resData) {
				var ambulances = "<option value=" + resData.vehicleID + ","
						+ resData.vehicleName + ">" + resData.vehicleName
						+ "</option>";
				$(ambulances).appendTo('#ambulanceId_reg');
				// $(ambulances).appendTo('#listOfAmbulanceForRegistration');
			});
	$('#ambulanceId_reg').trigger("chosen:updated");
	$("#ambulanceId_reg").chosen();
};

function workShopName() {
	if (workshopName.length < 1 || workshopName == []) {
		masterWorkshopName();
		// alert(workshopName.length);
		$.each(workshopName, function(i, resData) {
			var districts = "<option value=" + resData.workshopId + ">"
					+ resData.workshopname + "</option>";
			$(districts).appendTo('#workshopName_reg');
			// $(districts).appendTo('#listOfDistrictForRegistation_id');
			// listOfDistrictForRegistation_id

		});
	} else {
		$.each(workshopName, function(i, resData) {
			var districts = "<option value=" + resData.workshopId + ">"
					+ resData.workshopname + "</option>";
			// $(districts).appendTo('#workshopId_for_reg');
		});
	}
};

/*
 * Workshopname loading
 * 
 */
function masterWorkshopName() {
	// var strUrl = 'http://192.168.1.191:8086/commondata/getWorkshopName';
	var strUrl = Service.masterWorkshopName
	workshopName = [];
	try {
		$.ajax({
			type : "GET",
			url : strUrl,
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.responseCode === 200 || data.responseCode === '200') {
					workshopName = data.gisControllerDTOs;

				}
			},
			error : function() {
				workshopName = [];
				console.log('Error in loading getgeneraltenderreports Data'
						+ strUrl);
			}
		});
	} catch (err) {
		shifttype = [];
		console.log(err.message);
	}
};

function get_BreakDownSeverity(reg_BreakDownSeverity) {
	$('#breakdown_severity').empty();
	var id = '#' + reg_BreakDownSeverity;
	var strUrl = Service.get_BreakDownSeverity; // php application hard code
												// value passing
	// var
	// strUrl='http://192.168.1.191:8086/breakDownMainatnce/getBreakDownSeverity'
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : 'json',
				async : false,
				success : function(data) {

					var selectfirst = "<option value='0'>Select Severity Type</option>";
					$(breakdown_severity).append(selectfirst);
					$.each(data.breakDownMaitainceControllerDTOs, function(i,
							resData) {
						var ambulaceData = "<option value="
								+ resData.mit_seriaid + ">"
								+ resData.mit_Type_Name + "</option>";
						$(ambulaceData).appendTo('#breakdown_severity');

					});
				},
				error : function(err) {
					console.error("error in get_BreakDownSeverity"
							+ JSON.stringify(err));
				}
			});
}

function insert_BreakDown_Maintance() {
/*
 * 	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var startDateTime=$('#start_date_time').val();
 */
	var reg_DistrcitId = $('#district_id_reg').val();
	$('#districtId').val(reg_DistrcitId);
	var reg_BaselocationId = $('#baselocationId_reg').val();
	$('#baselocationId').val(reg_BaselocationId);
	var reg_AmbulanceId = $('#ambulanceId_reg').val();
	
	var reg_Split = reg_AmbulanceId.split(",");
	console.log(' Wothout spliting reg_AmbulanceId' + reg_AmbulanceId);
	var par_VehicleId = reg_Split[0];
	var par_reg_number = reg_Split[1];
	$('#ambulance').val(par_reg_number);
	var reg_ShiftType = $('#shiftTypeId_for_reg').val();
	var reg_Workshop = $('#workshopName_reg').val();
	var reg_Previous_Odemeter = $('#previousOdometerReg').val();
	var reg_In_Odemeter = $('#inodometerReg').val();
	$('#endOdometerNo').val(reg_In_Odemeter);
	var reg_out_odometer = $('#outOdometerReg').val();
	var reg_BreakDownSeverity = $('#breakdown_severity').val();
	var maintanice_Type = $('#breakdown_type_reg').val();
	var reg_OffRoadTiming = $('#offRoadTimeReg').val();
	$('#start_date_time').val(reg_OffRoadTiming);
	var reg_OffRoadTiming1 = moment(reg_OffRoadTiming).format("YYYY-MM-DD");
	var reg_expected_dtm = $('#expectedOnroadTimeReg').val();
	var reg_expected_dtm1 = moment(reg_expected_dtm).format("YYYY-MM-DD");
	var reg_Remarks = $('#remarks_reg').val();
	var wk_Address = $('#addressForReg').val();
	var wk_Name = $('#otherWorkshopName_for_reg').val();
	// var reg_Workshop = $('#reg_Workshop').val();
	var previous_odometer=$('#previousOdometerForReg').val();
	if (reg_Workshop === "Others") {
		var other_wk_Address = wk_Address;
		;
	} else if (reg_Workshop !== "Others") {
	}
	var wk_MobileNo = $('#mobileNoForReg').val();
	var wk_ContactPerson = $('#ContactPersonNumberForReg').val();
	  var user_id=localStorage.getItem("userID");
	    var module_id=localStorage.getItem("opdesk_moduleID");
	    var role_id=localStorage.getItem("opdesk_roleID");
	var insert_brk_Obj = {
		par_vehicle_id : par_VehicleId,
		par_baselocation_id : reg_BaselocationId,
		par_reg_number : par_reg_number,
		par_workshop_id : reg_Workshop, // clarity required
		par_start_odo_meterreading : reg_In_Odemeter,
		par_end_odo_meterreading : reg_out_odometer,
		par_activity_id : 1, // clarity required
		par_maintenance_type : 3, // clarity required
		par_start_date_time : reg_OffRoadTiming1,
		par_expected_on_rd_dtm : reg_expected_dtm1,
		par_remarks : reg_Remarks,
		par_created_dtm : "now()",
		par_created_by_id : user_id,
		par_created_by_roleid : role_id,
		par_district_id : reg_DistrcitId,
		par_employee_shifttype_id : reg_ShiftType,
		par_invoice_no : 1, // clarity required
		par_status_id : 1, // clarity required par_status_id
		par_mit_breakdown_type_id : reg_BreakDownSeverity,
		// par_ticket_id: 201490525, //clarity required
		par_other_workshop_name : wk_Name,
		par_other_workshop_address : wk_Address,
		par_other_workshop_mobile_no : wk_MobileNo,
		par_other_workshop_contact_person : wk_ContactPerson,
		maintenance_Type : maintanice_Type

	};

	if (reg_DistrcitId === "0") {
		showNotificationError("Select District", "district_id_reg", "error");
		return;
	} else if (reg_BaselocationId === "0") {
		showNotificationError("Select Base Location", "baselocationId_reg",
				"error");
		return;
	} else if (par_VehicleId === "0") {
		showNotificationError("Select Ambulances", "ambulanceId_reg", "error");
		return;
	} else if (reg_ShiftType === "0") {
		showNotificationError("Select ShiftType", "shiftTypeId_for_reg",
				"error");
		return;
	} 
	  
	else if (reg_Workshop === "0") {
		showNotificationError("Select Workshop Name", "workshopName_reg",
				"error");
		return;
	} 
	 else if(reg_Workshop === "1"){
	      if (wk_Name === ""||wk_Name===''||wk_Name===null) {
	            showNotificationError("Enter Workshop Name", "otherWorkshopName_for_reg", "error");
	            return;
	       }else if(wk_MobileNo===""||wk_MobileNo===''||wk_MobileNo===null){
	    	   showNotificationError("Enter Mobile No", "mobileNoForReg", "error");
	           return; 
	       }//addressForReg
	       else if(wk_MobileNo.length!=10){
	    	   showNotificationError("Please Enter Valid Mobile No", "mobileNoForReg", "error");  
	    	   return; 
	       }
	       else if(wk_Address===""||wk_Address===''||wk_Address===null){
	    	   showNotificationError("Enter Address", "addressForReg", "error");
	           return; 
	       }//
	    }
   if (previous_odometer === "0" || previous_odometer === "") {
	showNotificationError("Enter Previous Odo-Meter Reading", "previousOdometerForReg",
			"error");
	return;
}

	else if ( reg_In_Odemeter=== "0" ||reg_In_Odemeter  === "") {
		showNotificationError("Enter In Odo-Meter Reading", "inodometerReg",
				"error");
		return;
	}

	else if (reg_out_odometer === "0" || reg_out_odometer === ""
			|| reg_out_odometer === null) {
		showNotificationError("Enter Out Odo-Meter Reading", "outOdometerReg",
				"error");
		return;
	}

	else if (parseInt(reg_out_odometer) < parseInt(reg_In_Odemeter)) {
		showNotificationError(
				"Out Odo-Meter must be greater or Equal to In Odo-Meter Reading",
				"outOdometerReg", "error");
		return;
	}

	else if (reg_BreakDownSeverity === "0" || reg_BreakDownSeverity === ""
			|| reg_BreakDownSeverity === null) {
		showNotificationError("Select Break Down Severity", "breakdown_severity",
				"error");
		return;
	} /*else if (maintanice_Type === "0" || maintanice_Type === ""
			|| maintanice_Type === null) {
		showNotificationError("Enter Maintaince Type", "breakdown_type_reg",
				"error");
		return;
	}*/

	else if (reg_OffRoadTiming === "0" || reg_OffRoadTiming === ""
			|| reg_OffRoadTiming === null) {
		showNotificationError("Select Off Road Timming", "offRoadTimeReg",
				"error");
		return;
	} else if (reg_expected_dtm === "0" || reg_expected_dtm === ""
			|| reg_expected_dtm === null) {
		showNotificationError("Select Expected On Road Timming", "expectedOnroadTimeReg",
				"error");
		return;
	}
	// else if (parseInt(reg_expected_dtm) < parseInt(reg_OffRoadTiming)) {
	// //alert ("Todate should be greater than from FromDate");
	// showNotificationError("expected end date should be greater than
	// startdate", "expectedOnRoadTimeForReg", "error");
	// return false;
	// }

	else if (reg_Remarks === "0" || reg_Remarks === "" || reg_Remarks === null) {
		showNotificationError("Enter Remarks", "remarks_reg", "error");
		return;
	}

	console.log('$$$$$$ JSON OBJECT $$$$$$' + JSON.stringify(insert_brk_Obj));
	var strUrl = Service.insert_BreakDown_Mainatnce;

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(insert_brk_Obj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			$('#ticketId').val(data.output);
			alert("data=====>"+data.output);
			// alert("Success"); breakdown_maintaince_id
			get_ohd_mail_directory();
			showNotificationError("Inserted Successfully",
					"breakdown_maintaince_id", "success");
			if (data === 1) {
				window.setTimeout(function() {
					location.reload();
				}, 2000);
			}

		},
		error : function() {
			console.log("Error In BreakDown Maintainace Not Inserted");
		}
	});
}

$('#brk_DistrictId').on('keypress', function() {

});
// var Service;
function seacrh_Break_Down_Mainatance() {
	$('#break_Maintance_Id').empty();
	var district = $('#district_id').val();
	var baselocation = $('#baselocation_id').val();
	var ambulance = $('#Ambulance_Id').val();
	var ticket = $('#ticketId').val();
	var offroaddate = $('#offRoadDate').val();
	var fromdate = $('#fromDate').val();
	var toDate = $('#todate').val();


	if (district == null | district == '') {
		district = 0;
	}
	if (baselocation == null | baselocation == '') {
		baselocation = 0;
	}
	if (ambulance == null | ambulance == '') {
		ambulance = 0;
	}

	if (offroaddate == null | offroaddate == '') {
		offroaddate = 0;
	}
	if (ticket == null | ticket == '') {
		ticket = 0;
	}
/*	if(Date.parse(fromdate)>Date.parse(to_date)){
        alert("From Date Should Not Be Greater Than To Date.");
        return;
        //showNotificationError("From Date Should Not Be Greater Than To Date.", "toDateId", "error");
    }*/
	if (fromdate == null | fromdate == '') {//offRoadDate
		fromdate = 0;
	}
	if (toDate == null | toDate == '') {

		toDate = 0;
	}
	
	  if (district==0 &&baselocation==0 &&ambulance==0 &&offroaddate==0&&ticket==0&&toDate==0&&fromdate==0){   	
      	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
      	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
      	return true;
      }

	var searchObject = {
		maintainceid : 0,
		mit_district_id : district,
		mit_baselocation_id : baselocation,
		vehicle : ambulance,
		offdate : offroaddate,
		ondate : fromdate,
		enddate : toDate,
		mit_end_date_time : toDate,//getEnddate
		ticketid : ticket

	};
	 var strUrl = Service.search_Break_Down_Mainatances;
	//var strUrl = 'http://192.168.1.191:2000/opdesk/breakDownMainatnce/getSearchForBreakDownMaintaince';
	//http://192.168.1.191:2000/opdesk/breakDownMainatnce/getSearchForBreakDownMaintaince
	console.log(":" + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(searchObject),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				  var divTag = document.createElement("h2");
                  $(divTag).css("text-align", "center");
                  $(divTag).html("No Data Available....");
                  $('#break_Maintance_Id').append(divTag);
			} else {

				var jsonArray = data.breakDownMaitainceControllerDTOs;
				console.log("daata : " + JSON.stringify(data));
				var strData = data;
				if (jsonArray.length > 0) {
					search_Break_Down_Mainatance_DOM(jsonArray);
					// search_Break_Down_Mainatance_DOM(jsonArray);
					loadDataTable()
				} else {
				}

			}
		},
		error : function() {

			console.log('In Error of  Details ');
		}
	});
}

function search_Break_Down_Mainatance_DOM(strData) {
	try {
		// alert("strData[i].mitSerialId");
		// For Div Tag
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

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html("S.No");
		$(objTHead1).addClass("text-center");
		$(objTr).append(objTHead1);

	/*	var objTHead2 = document.createElement("th");
		$(objTHead2).html("SeriaId");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);*/
		// For table Heading2
		var objTHead2 = document.createElement("th");
		$(objTHead2).html("Ticket Id");
		$(objTHead2).addClass("text-center");
		$(objTr).append(objTHead2);


		// For table Heading3
		var objTHead3 = document.createElement("th");
		$(objTHead3).html("District");
		$(objTHead3).addClass("text-center");
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement("th");
		$(objTHead4).html("Base Location");
		$(objTHead4).addClass("text-center");
		$(objTr).append(objTHead4);
		
		// For table Heading4
		var objTHead5 = document.createElement("th");
		$(objTHead5).html("Ambulance No");
		$(objTHead5).addClass("text-center");
		$(objTr).append(objTHead5);

		// For table Heading5
		var objTHead6 = document.createElement("th");
		$(objTHead6).html("Start Odometer Odometer");
		$(objTHead6).addClass("text-center");
		$(objTr).append(objTHead6);

		// For table Heading5
		var objTHead7 = document.createElement("th");
		$(objTHead7).html("End Odometer");
		$(objTHead7).addClass("text-center");
		$(objTr).append(objTHead7);

		// For table Heading5
		var objTHead8 = document.createElement("th");
		$(objTHead8).html("Off Road Date");
		$(objTHead8).addClass("text-center");
		$(objTr).append(objTHead8);

		// For table Heading5
		var objTHead9 = document.createElement("th");
		$(objTHead9).html("Status");
		$(objTHead9).addClass("text-center");
		$(objTr).append(objTHead9);

		var objTHead10 = document.createElement("th");
		$(objTHead10).html("Update");
		$(objTHead10).addClass("text-center");
		$(objTr).append(objTHead10);

		// For table Heading5
		// var objTHead11 = document.createElement("th");
		// $(objTHead11).html("Payment Card No");
		// $(objTHead11).addClass("text-center");
		// $(objTr).append(objTHead11);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

	/*		var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].mit_seriaid);
			console.log('SeriaId' + strData[i].mit_seriaid);
			$(tbleRow).append(tablcol2);*/

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].ticketid);
			console.log(' Tciket Id' + strData[i].ticketid);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].distName);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].baseLocName);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].mit_reg_number);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].mit_start_odo_meterreading);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].mit_end_odo_meterreading);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[i].mit_start_date_time);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[i].status_Id);
			$(tbleRow).append(tablcol9);

			var reamarks = strData[i].mitRemarks;
			if (strData[i].status_Id === "Open") {
				var tablcol10 = document.createElement("td");
				var buttonTag = document.createElement('button');
				var text = document.createTextNode("Update");
				buttonTag.appendChild(text);
				$(buttonTag).addClass('btn btn-primary btn-sm');
				// $(buttonTag).attr('onclick',
				// 'getSingleRowMaintainceDetails("' + ds_Lname+ '","' +
				// strData[i].mitRegNumber + '","'+reamarks+'")');
				$(buttonTag).attr(
						'onclick',
						'getSingleRowMaintainceDetails("'
								+ strData[i].mit_seriaid + '","'
								+ strData[i].ticketid + '","'
								+ strData[i].mit_reg_number + '","'
								+ strData[i].baseLocName + '","'
								+ strData[i].distName + '","'
								+ strData[i].mit_start_odo_meterreading + '","'
								+ strData[i].mit_start_date_time + '","'
								+ strData[i].mit_breakdown_type_id + '","'
								+ strData[i].shiftTypeName + '","'
								+ strData[i].workshopName + '")');//
				$(tablcol10).append(buttonTag);
				$(tbleRow).append(tablcol10);
			} else {
				var tablcol10 = document.createElement("td");
				$(tablcol10).html(strData[i].status_Id);
				$(tbleRow).append(tablcol10);
			}

			$(objTBody).append(tbleRow);

		}
		$("#break_Maintance_Id").append(objDivTag);
	} catch (err) {
		console.log("break_Maintance_Id" + err);
	}
}
function getSingleRowMaintainceDetails(serialid, ticketId, regnumber,
		baselocname, distname, startodometer, startDateTime, breakdownType,
		shiftType, workshopName) {
	$('#serial_id').val(serialid);
	$('#district_id_update').val(distname);
	$('#baselocationId_update').val(baselocname);
	$('#shiftType_Update').val(shiftType);
	$('#workshopName_update').val(workshopName);
	$('#ambulanceId_Update').val(regnumber);
	$('#inodometerUpdate').val(startodometer);
	$('#breakdown_severity').val(breakdownType);
	$('#offRoadTimeUpdate').val(startDateTime);
	$('#breakdown_type_Update').val(breakdownType);

	$('#Update').modal('show');
}

function update_BreakDown_Maintance() {
	var serialId = $('#serial_id').val();
	// var up_workShop_Name = $('#up_workShop_Name').val();
	var end_Outodometer = $('#up_Outodometer').val();
	var up_Inodmeter = $('#inodometerUpdate').val();
	var paid_amount = $('#paidAmount_Update').val();
	var end_Date_Time = $('#on_road_timeId').val();
	var end_date_time1 = moment(end_Date_Time).format("YYYY-MM-DD");
	// alert("end_date_time1"+end_date_time1);
	var up_OnRoad_Remarks = $('#remarks_Update').val();
	var up_Seriald_Id = $('#up_Seriald_Id').val();
	var end_Outodometer = $('#outOdometerUpdate').val();
	var paymentType = $('#paymentTypeUpdate').val();
	// var paid_amount=$('#paidAmountUpdate').val();

	var update_brk_Obj = {
		par_other_workshop_name : " ",
		par_end_odo_meterreading : end_Outodometer,
		par_mit_payment_type_id : paymentType,
		par_mit_paid_amount : paid_amount,
		par_mit_invoice_status : 1, // need to clarity
		mit_end_date_time : end_Date_Time,
		par_mi_onroad_remarks : up_OnRoad_Remarks,
		par_created_dtm : "now()",
		par_mit_invoice_no : 2, // need to calrity
		par_status_id : 2, // php Hardcode
		par_mit_seriaid : serialId
	//
	};

	if (paymentType === "0") {
		showNotificationError("Select Payment Type", "paymentTypeUpdate",
				"error");
		return;
	} else if (paid_amount === "" || paid_amount === null) {
		showNotificationError("Enter Paid Amount", "paidAmount_Update", "error");
		return;
	} else if (end_Outodometer === "0" || end_Outodometer === "") {
		showNotificationError("Enter End Odometer Reading",
				"outOdometerUpdate", "error");
		return;
	} else if (parseInt(end_Outodometer) < parseInt(up_Inodmeter)) {
		showNotificationError(
				"End Odo-Meter Must Be Greater Than Start Odo-Meter",
				"outOdometerUpdate", "error");
		return;
	}

	else if (end_Date_Time === "" || end_Date_Time === " ") {
		showNotificationError("Select End Date Time", "on_road_timeId", "error");
		return;
	} else if (up_OnRoad_Remarks === "0" || up_OnRoad_Remarks === "") {
		showNotificationError("Enter Remarks", "remarks_Update", "error");
		return;
	}

	console.log('##### JSON OBJECT $$$$$$' + JSON.stringify(update_brk_Obj));
	var strUrl = Service.update_BreakDown_Mainatnce;
	// var
	// strUrl='http://192.168.1.191:8086/breakDownMainatnce/updateBreakDownMainatance';

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(update_brk_Obj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			// alert("Success");
			showNotificationError("Updated Successfully", "update_button_id",
					"success");
			window.setTimeout(function() {
				location.reload();
			}, 3000);

		},
		error : function() {
			console.log("Error In update_BreakDown_Maintance Not Inserted");
		}
	});
}

var paymenttype = [];
function payment_Type() {
	$('#paymentTypeUpdate').empty();
	if (paymenttype.length < 1 || paymenttype == []) {
		masterPaymentType();
		// alert(paymentType.length);
		var selectfirst = "<option value='0'>Select Payment Type</option>";
		$('#paymentTypeUpdate').append(selectfirst);
		$.each(paymenttype, function(i, resData) {
			var districts = "<option value=" + resData.pt_serialid + ">"
					+ resData.pt_payment_type + "</option>";
			$(districts).appendTo('#paymentTypeUpdate');

		});
	} else {
		$.each(paymenttype, function(i, resData) {
			var districts = "<option value=" + resData.pt_serialid + ">"
					+ resData.pt_payment_type + "</option>";
			$(districts).appendTo('#paymentTypeUpdate');
		});
	}
};

function resetInsertBreakdownMaintaince() {
	$("#district_id_reg").val("0").trigger("chosen:updated");
	$("#baselocationId_reg").val("0").trigger("chosen:updated");
	$("#ambulanceId_reg").val("0").trigger("chosen:updated");
	$("#shiftTypeId_for_reg").val("0").trigger("chosen:updated");
	$("#workshopName_reg").val("0").trigger("chosen:updated");
	$("#previousOdometerForReg").value = "";
	$("#inodometerReg").val("");
	$("#outOdometerReg").val("");
	$("#breakdown_severity").val("0");
	$("#breakdown_type_reg").val("");
	$("#offRoadTimeReg").val("");
	$("#onroadTimeReg").val("");
	$("#remarks_reg").val("");
	$('#otherWorkshopName_for_reg').val("");
	$('#mobileNoForReg').val("");
	$('#addressForReg').val("");
	$('#ContactPersonNumberForReg').val("");
	$('#previousOdometerForReg').val("");
	$('#expectedOnroadTimeReg').val("");
	baseLocationForReg(0);
	getAmbulanceForReg(0)

}

function resetSearch() {
	$("#district_id").val("0").trigger("chosen:updated");
	$("#baselocation_id").val("0").trigger("chosen:updated");
	$("#Ambulance_Id").val("0").trigger("chosen:updated");
	$("#ticketId").val("");
	$("#offRoadDate").val("");
	$("#fromDate").val("");
	$("#todate").val("");
	baseLocation(0);
	getAmbulance(0);
	$("#break_Maintance_Id").empty();
}

function resetUpdateBreakdownMaintainence() {
	$("#paymentTypeUpdate").val("0");
	$("#outOdometerUpdate").val("");
	$("#paidAmount_Update").val("");
	$("#outOdometerUpdate").val("");
	$("#on_road_timeId").val("");
	$("#remarks_Update").val("");
	

}

/*
 * Other Workshop Payment Details @Functionality: @url
 */
function otherWorkshopPaymentDetails() {
	var strWorkshopId = $('#workshopName_reg').val();
	if (strWorkshopId === "2" || strWorkshopId === 2 || strWorkshopId === '2') {
		// document.getElementById("OthersFleetCard").disabled = false;
		$("#otherWorkshopName_for_reg").prop("disabled", true);
		$("#mobileNoForReg").prop("disabled", true);
		$("#addressForReg").prop("disabled", true);
		$("#ContactPersonNumberForReg").prop("disabled", true);

	} else {

		$("#otherWorkshopName_for_reg").prop("disabled", false);
		$("#mobileNoForReg").prop("disabled", false);
		$("#addressForReg").prop("disabled", false);
		$("#ContactPersonNumberForReg").prop("disabled", false);

	}
}

$('#workshopName_reg').on('change', function() {
	otherWorkshopPaymentDetails();
});


function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  

$(document).ready(function () {
    $('#availableDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#availableDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//strtDate

$(document).ready(function () {
    $('#strtDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//endDate

$(document).ready(function () {
    $('#endDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#endDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

$(document).ready(function () {
    $('#datetimepicker').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#datetimepicker').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker2

$(document).ready(function () {
    $('#datetimepicker1').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        startDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#datetimepicker1').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker1

$(document).ready(function () {
    $('#datetimepicker2').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#datetimepicker2').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker1

//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var startDateTime=$('#start_date_time').val();
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Breakdown Maintenance:"+startDateTime+" ERS";	
	//alert("====message===="+message);
	//email template
	var demo="hello";
	var remarks=$('#remarksId').val();
	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var fuel_filing_date=$('#fuel_filling_date').val();
	var odometerId=$('#endOdometerNo').val();
	var pilotId=$('#pilot_id').val();
	var emtId=$('#emt_id').val();
	var fuelAmount=$('#fuel_amount').val();
	var fuel_quantity=$('#fuel_qty').val();
	var schedule_service = $("#serviceIdForReg option:selected").text();
	var odometer_reading=$('#start_odometer').val();
	var emailtext;
	//alert("remarks4535====>"+remarks);
	
/*var emailtext =	'<html><head><title>Email Template</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';
emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';
emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';
emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center;}.fw-600{font-weight:600;}';        
emailtext=emailtext+'.maintext{background-color: orange;color: white;height: 50px;}.text2{background-color:  #f5f5f5;}</style> </head>'; 
emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Breakdown Maintenance</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';
emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   
emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2">'+odometer_reading+'</td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';
emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td></td>';
emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2"></td>';
emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2"></td></tr><tr><td >Off Road Timing:</td><td class="text2">'+startDateTime+'</td>';
emailtext=emailtext+'</tr></table><br><br><div><span class="text-green"></span><br><span class="text-green">Thanks and Regards,</span><br><span class="text-purple">AP ERS Team.</span></div></div>';                     
emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';    */                                        	

var emailtext =	'<html><head><title>Preventive Maintenance</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Breakdown Maintenance</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2">'+odometer_reading+'</td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td class="text2"></td>';

emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2"></td>';

emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2"></td></tr><tr><td >Off Road Timing:</td><td class="text2">'+startDateTime+'</td>';

emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>'; 

console.log("====>"+message);
	var distid=$('#districtId').val();
	$('#swiping_id').empty("");
        var strUrl = Service.get_ohd_mail_directory+"/"+distid;
        console.log("get_ohd_mail_directory url====>:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (600== responsecode) {
                    alert("No Data Found");          
                 }else if(600!== responsecode) {
                    var jsonArray = data.mailAndSmsControllerDTO;
                    $.each(jsonArray, function (i, resData) {
                    	insertHmSmsOutboxTreans(resData.sm_contact_num1,message);
                    	var email=resData.sm_email_id;
                    	insertHmEmailOutboxTreans(resData.sm_email_id,emailtext,ticket_id)
                    


                    });
                }
            },
            error: function (err) {
                console.error("Error in fuel_card_number" + JSON.stringify(err));
            }
        });
}
;

//inserting sms here
function insertHmSmsOutboxTreans(contactno,message){

	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
	var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");	
	 var objJson={
			"so_message":message,
			"so_tomobile_no":contact_no,
			"so_from_mobile_no":from_mobile,
			"so_no_of_attempts":no_of_attempts,
			"so_status_id":statusId,
			"so_createdbyid":createdyid,
			"createdbymoduleid":createdbymodelid,
			"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmSmsOutboxTreans;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            //var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		           //     alert("Not Inserted ");
		           // } else {
                        
		            //}

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

//inserting email here
function insertHmEmailOutboxTreans(to_mail,emailtext,ticket_id){
	var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");	
	var subject="AP ERS-Breakdown Maintenance with Ticket Id:"+ticket_id
	 var objJson={		
				"inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":createdyid,
				"createdbymoduleid":createdbymodelid,
				"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmEmailOutboxTreansPrev;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		               alert(" Mail Sent Sucessfully");
		         //   } else {
		            	// showNotificationError("Sms And Mail Sent Sucessfully", "fuel_registration_id", "success");
		         //   }

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

