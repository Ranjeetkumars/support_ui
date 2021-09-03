/**
 * 
 * @returns {undefined}
 */
 var schedule=[];
 var workshopName=[];
 var paymenttype=[];

/*
 * District Dropdown loading for search Preventive maintince
 */
$(document).ready(function() {
    try {
        getListOfDistrict();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/**
 * 
 *Drop down loading for Registation preventive maintaince  
 * 
 */
$('#registration').on('shown.bs.modal', function(e) {
    getListOfDistrictForReg();
    get_shiftTypes();
    workShopName();
    scheduleService();

});

/**
 * 
 * At the time Updation calling this function
 */

$('#Update').on('shown.bs.modal', function(e) {
    payment_Type();
    getPatientHandoverIssueReportToDm();

});


//district dropdown loading for search preventive maintaince
function getListOfDistrict() {
    // here calling masterdata ajax call
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districs_id');
    });
    $('#districs_id').trigger("chosen:updated");
    $("#districs_id").chosen();

}
;

/*
 *@functionality:  Search Patient Handover Issue
 * Disrict Drop Down For Registation Preventive maintaiince
 */
function getListOfDistrictForReg() {
    if (district.length < 1 || district == []) {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        $.each(district, function(i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtId_for_reg');
        });
        $("#districtId_for_reg").chosen();

    } else {
        $.each(district, function(i, resData) {
            //   alert("jii"+resData.districtName);
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtId_for_reg');

        });
        $('#districtId_for_reg').trigger("chosen:updated");
        $("#districtId_for_reg").chosen();
    }
}
;

//onchange for search Preventive Mainteance
$('#districs_id').on('change', function() {
    var listOfDistrict = $('#districs_id').val();
    $('#baselocation_id').empty();
    baseLocation(listOfDistrict);
});

//on change for registation Preventive Mainteance
$('#districtId_for_reg').on('change', function() {
    var listOfDistrict = $('#districtId_for_reg').val();
    $('#baselocationId_for_reg').empty();
    baseLocationForReg(listOfDistrict);

});

/*
 * @Functionality:Baselocation Dropdown Loading
 * For Search Preventive Mainteance
 */
function baseLocation(listOfDistrict) {
	$('#baselocation_id').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocation_id').append(selectfirst);
    $.each(baselocations, function(i, resData) {

        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocation_id').trigger("chosen:updated");
    $("#baselocation_id").chosen();

}
;



/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registation Preventive Mainteance
 */
function baseLocationForReg(listOfDistrict) {
	$('#baselocationId_for_reg').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocationId_for_reg').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocationId_for_reg');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocationId_for_reg').trigger("chosen:updated");
    $("#baselocationId_for_reg").chosen();

}
;

//on change for Preventive Mainteance
$('#baselocation_id').on('change', function() {
    var baseLocationVal = $('#baselocation_id').val();
    $('#Ambulance_Id').empty();
    getAmbulance(baseLocationVal);
});

//on change for registation Preventive Mainteance
$('#baselocationId_for_reg').on('change', function() {
    var baseLocationVal = $('#baselocationId_for_reg').val();
    $('#ambulanceId_for_reg').empty();
    getAmbulanceForReg(baseLocationVal);
});



/*
 * @Functionality:Ambuance loading based on baselocation
 * For search Preventive Mainteance
 */
function getAmbulance(baseLocationVal) {
	  $('#Ambulance_Id').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocationVal);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#Ambulance_Id').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#Ambulance_Id');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#Ambulance_Id').trigger("chosen:updated");
    $("#Ambulance_Id").chosen();

}
;

/*
 * @Functionality:Ambulance loading based on baselocation
 * For Registation Preventive Mainteance
 */
function getAmbulanceForReg(baseLocationVal) {
	 $('#ambulanceId_for_reg').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocationVal);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulanceId_for_reg').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + "," + resData.vehicleName + " >" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulanceId_for_reg');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#ambulanceId_for_reg').trigger("chosen:updated");
    $("#ambulanceId_for_reg").chosen();

}
;



/*
 * for reg onload method
 */
$('#registration').on('shown.bs.modal', function(e) {
	//getListOfDistrictForPreventiveForReg();
    get_shiftTypes(); 
    workShopName();
    scheduleService();
});

//for reg onload method
$('#Update').on('shown.bs.modal', function(e) {
    payment_Type();
});




$('#ambulanceId_for_reg').on('change', function() {
    var vehicleId = $('#ambulanceId_for_reg').val();
    getOdoMeter(vehicleId);
});


function workShopName() {
    if (workshopName.length < 1 || workshopName == []) {
        masterWorkshopName();
        //alert(workshopName.length);
        $.each(workshopName, function(i, resData) {
            var districts = "<option value=" + resData.workshopId + ">" + resData.workshopname + "</option>";
            $(districts).appendTo('#workshopId_for_reg');
            // $(districts).appendTo('#listOfDistrictForRegistation_id'); 
            //listOfDistrictForRegistation_id


        });
    } else {
        $.each(workshopName, function(i, resData) {
            var districts = "<option value=" + resData.workshopId + ">" + resData.workshopname + "</option>";
            // $(districts).appendTo('#workshopId_for_reg');
        });
    }
}
;


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
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    workshopName = data.gisControllerDTOs;

                }
            },
            error: function() {
                workshopName = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        shifttype = [];
        console.log(err.message);
    }
}
;



/*
 * @Functionality:scheduleService Loading 
 * @Time Of Calling:-1
 * @What are the input:-NO
 * @Where Use:-loadpreventiveMaintaince Details 
 * @Microservice URL:-
 */
function scheduleService() {
    if (schedule.length < 1 || schedule == []) {
        masterScheduleService();
        // alert(schedule.length);
        $.each(schedule, function(i, resData) {
            var districts = "<option value=" + resData.serviceID + ">" + resData.serviceName + "</option>";
            $(districts).appendTo('#serviceIdForReg');
            //  $(districts).appendTo('#strScheduleservice');


        });
    } else {
        $.each(schedule, function(i, resData) {
            var districts = "<option value=" + resData.serviceID + ">" + resData.serviceName + "</option>";
            //  $(districts).appendTo('#serviceIdForReg');
        });
    }
}
;


/*
 *ScheduleService Loading Here
 *service 1
 *service 2
 */
function masterScheduleService() {
    //var strUrl = 'http://192.168.1.191:8086/commondata/getScheduleService';
    var strUrl = Service.masterScheduleService;
    schedule = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    schedule = data.gisControllerDTOs;

                }
            },
            error: function() {
                schedule = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        schedule = [];
        console.log(err.message);
    }
}
;


/*
 * @Functionality:for insert preventive maintaince details
 * @Time Of Calling:-1
 * @What are the input:-Preventive Maintaince Domain
 * @Where Use:-Insert Preventive Maintaince method
 */
var d1;
var d2;
function insertPreventiveMaintainceDetails() {
    //  alert("insert");
	/*
	 * 	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	 */
    var districtId = $('#districtId_for_reg').val();
    $('#districtId').val(districtId);
    var baselocationId = $('#baselocationId_for_reg').val();
    $('#baselocationId').val(baselocationId);
    var ambulanceNo = $('#ambulanceId_for_reg').val();
    var arrAmb = ambulanceNo.split(",");
    $('#ambulance').val(arrAmb[1]);
    var workshopId = $('#workshopId_for_reg').val();
    var shiftTypeId = $('#shiftTypeId_for_reg').val();
    var vmit_other_workshop_name = $('#otherWorkshopName_for_reg').val();
    var vmt_previous_odometer=$('#previousOdometerForReg').val();
    var vtrmit_start_odo_meterreading = $('#inOdometerForReading').val();
    $('#start_odometer').val('#inOdometerForReading').val();
    var vmit_end_odo_meterreading = $('#vtrmit_start_odo_meterreading').val();
    var scheduleService = $('#serviceIdForReg').val();
    var vmit_service_name = $('#ServiceNameReg').val();
    var vmit_start_date_time = $('#offRoadTimeForReg').val();
    $('#start_date_time').val(vmit_start_date_time);
    var vmit_start_date_time1 = moment(vmit_start_date_time).format("YYYY-MM-DD");
    var vmit_expected_on_rd_dtm = $('#expectedOnRoadTimeForReg').val()
    var vmit_expected_on_rd_dtm1 = moment(vmit_expected_on_rd_dtm).format("YYYY-MM-DD");
    var vmit_remarks = $('#remarksForReg').val();
    $('#remarksId').val(vmit_remarks);
    var workshopId = $('#workshopId_for_reg').val();
    var rmit_employee_shifttype_id = $("#regShiftType").val();
    var vmit_other_workshop_contact_person = $("#strContactPerson").val();
    var vmit_other_workshop_mobile_no = $("#mobileNoForReg").val();
    var vmit_other_workshop_address = $("#addressForReg").val();
    var vmit_other_workshop_contact_person = $("#ContactPersonNumberForReg").val();
    var mobile_no=$('#mobileNoForReg').val();
    var address=$('#addressForReg').val();
    var rmit_created_dtm = 'now()';
    if(vmit_service_name==""||vmit_service_name==''||vmit_service_name==null){
    	vmit_service_name=' ';
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        mitVehicleId: arrAmb[0],
        mitBaselocationId: baselocationId,
        mitRegNumber: arrAmb[1],
        mitWorkshopId: workshopId,
        mitStart_odo_meterreading: vtrmit_start_odo_meterreading,
        mitEndOdoMeterReading: vmit_end_odo_meterreading,
        mitActivityId: 2, //activity id 2 for preventive maintaince
        mitMaintainceType: 2, //Maintaince type id 2 for Preventive maintaince Type
        mitSuperviorId: 1,
        mitStartDateTime: vmit_start_date_time,
        mitRemarks: vmit_remarks,
        mitCreatedDtm: 'now()',
        mitCreatedById: createdyid,
        mitCreatedByRoleId: createdbtroleid,
        mitServiceId: scheduleService,
        districtId: districtId,
        employeeShiftTypeid: shiftTypeId, //shiftTypeId
        mitInvoiceNo: 8,
        mitStatusId: 1,
        //mit_ticket_id: ticketId, //ticketId
        mitOtherWorkshopName: vmit_other_workshop_name,
        mitOtherWorkshopAddress: vmit_other_workshop_address,
        mitOtherWorkshopMobileNo: vmit_other_workshop_mobile_no,
        mitOtherWorkshopContactPerson: vmit_other_workshop_contact_person,
        mitExceptedOnRdDtm: vmit_expected_on_rd_dtm1,
        mitServiceName: vmit_service_name
   

    };
    if (districtId === "0") {
        showNotificationError("Select District", "districtId_for_reg", "error");
        return;
    } else if (baselocationId === "0") {
        showNotificationError("Select Base Location", "baselocationId_for_reg", "error");
        return;
    } else if (arrAmb[0] === "0") {
        showNotificationError("Select Ambulances", "ambulanceId_for_reg", "error");
        return;
    } else if (shiftTypeId === "0") {
        showNotificationError("Select Shift Type", "shiftTypeId_for_reg", "error");
        return;
    }
    else if (workshopId === "0") {
        showNotificationError("Select Workshop", "workshopId_for_reg", "error");
        return;
    }else if(workshopId === "1"){
      if (vmit_other_workshop_name === ""||vmit_other_workshop_name===''||vmit_other_workshop_name===null) {
            showNotificationError("Enter Workshop Name", "otherWorkshopName_for_reg", "error");
            return;
       }else if(vmit_other_workshop_mobile_no===""||vmit_other_workshop_mobile_no===''||vmit_other_workshop_mobile_no===null){
    	   showNotificationError("Enter Mobile No", "mobileNoForReg", "error");
           return; 
       }//addressForReg
       else if(vmit_other_workshop_mobile_no.length!=10){
    	   showNotificationError("Please Enter Valid Mobile No", "mobileNoForReg", "error");  
    	   return; 
       }
       else if(vmit_other_workshop_address===""||vmit_other_workshop_address===''||vmit_other_workshop_address===null){
    	   showNotificationError("Enter Address", "addressForReg", "error");
           return; 
       }//
    }
    if (workshopId === "0") {
        showNotificationError("Select workshop", "strWorkshopname", "error");
        return;
    }
 
    else if (vmit_other_workshop_address === "0") {
        showNotificationError("Enter Other Workshop Address", "strAddress", "error");
        return;
    }//previousOdometerForReg
    else if (vmt_previous_odometer === "0" || vmt_previous_odometer === "") {
        showNotificationError("Enter Prevoius Odo Meter Reading", "previousOdometerForReg", "error");
        return;
    }
    else if (vtrmit_start_odo_meterreading === "0" || vtrmit_start_odo_meterreading === "") {
        showNotificationError("Enter Start Odo Meter Reading", "inOdometerForReading", "error");
        return;
    }
    else if (vmit_end_odo_meterreading === "0" || vmit_end_odo_meterreading === "") {
        showNotificationError("Enter End Odo Meter Reading", "outOdometerreading", "error");
        return;
    }
    else if (parseInt(vmit_end_odo_meterreading)< parseInt(vtrmit_start_odo_meterreading)) {
        showNotificationError(" End Odo Meter Reading Must Be Greater or Equal to Start Odo Meter Reading", "outOdometerreading", "error");
        return;
    }
    else if (scheduleService === "0"||scheduleService==='0') {
        showNotificationError("Select Schedule Service", "serviceIdForReg", "error");
        return;
    }

    else if (vmit_start_date_time === "0" || vmit_start_date_time == "" || vmit_start_date_time === null) {
        showNotificationError("Select Off Road Date", "offRoadTimeForReg", "error");
        return;
    }

    else if (vmit_expected_on_rd_dtm === "0" || vmit_expected_on_rd_dtm == "" || vmit_expected_on_rd_dtm === null) {
        showNotificationError("Select Expected On Road Date", "expectedOnRoadTimeForReg", "error");
        return;
    }

    else if (parseInt(vmit_expected_on_rd_dtm) < parseInt(vmit_start_date_time)) {
        //alert ("Todate should be greater than from FromDate");
        showNotificationError("Expected End Date Should Be Greater Than Start Date", "expectedOnRoadTimeForReg", "error");
        return false;
    }

    else if (vmit_remarks === "0" || vmit_remarks === "") {
        showNotificationError("Enter Remarks", "remarksForReg", "error");
        return;
    }
    console.log('Object of Json::' + JSON.stringify(objJson));

    // var strUrl = 'http://192.168.1.191:8086/preventiveMaintainceController/insertPreventiveMaintainceDetails';
    var strUrl = Service.insertPreventiveMaintainceDetails;
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function(data) {
        	$('#ticketId').val(data.output);
        	get_ohd_mail_directory();
            showNotificationError("Inserted Successfully", "preventive_registration_id", "success");
            //if (data === 1) {
            window.setTimeout(function() {
                location.reload();
            }, 2000);
            //  }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}


/*
 * @Functionality:load preventive maintaince  record based on district,baselocation and ambulance no.
 * @Time Of Calling:-1
 * @What are the input:-NO
 * @Where Use:-
 */
function searchPreventMaintaince() {
    $('#preventive_maintaince_Id').empty();
    var fromDate = $("#fromDate").val();
    var todate = $("#toDate").val();
    var intDistrictId = $("#districs_id").val();
    var intBaseLocationId = $("#baselocation_id").val();
    var intAmulenceId = $("#Ambulance_Id").val();
    var ticketId = $("#ticketId").val();
    var OffRoadDate = $("#offroadDate").val();


    
    if (intDistrictId == null | intDistrictId == '') {
        intDistrictId = 0;
    }
    if (intBaseLocationId == null | intBaseLocationId == '') {
        intBaseLocationId = 0;
    }
    if (intAmulenceId == null | intAmulenceId == '') {
        intAmulenceId = 0;
    }

    if (OffRoadDate == null | OffRoadDate == '') {
        OffRoadDate = 0;
    }
    if (ticketId == null | ticketId == '') {
        ticketId = 0;
    }
    if (fromDate == null | fromDate == '') {
        fromDate = 0;
    }
    if (todate == null | todate == '') {

        todate = 0;
    }

    if (fromDate==0 &&todate==0 &&intDistrictId==0 &&intBaseLocationId==0&&intAmulenceId==0&&ticketId==0&&OffRoadDate==0){   	
    	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
    	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
    	return true;
    }
   
    
    var objJson = {
        mitDistrictId: intDistrictId,
        mitBaselocationId: intBaseLocationId, //For Preventive
        mitVehicleId: intAmulenceId,
        offroadTime: OffRoadDate,
        mitStartDateTime: fromDate,
        mitEndDateTime: todate,
        mitTicketId: ticketId
    };
    var strUrl=Service.searchPreventMaintaince;
    console.log(":" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No Data Available....");
                $('#preventive_maintaince_Id').append(divTag);
            } else {

                var jsonArray = data.preventiveControllerDTOs;
                console.log("daata : " + JSON.stringify(data));
                var strData = data;
                if (jsonArray.length > 0) {
                    //here calling to dom
                    preventiveMaintainceData(jsonArray);
                    //fuel_Filling_Data(jsonArray);
                    loadDataTable()
                }
                else {
                }

            }
        }, error: function() {

            console.log('In Error of  Details ');
        }
    });

}


function preventiveMaintainceData(strData) {
    try {
        //alert("strData[i].mitSerialId");
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);


//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html("S.No");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);
        /// alert("______preventiveMaintainceData_____");
       /* var objTHead2 = document.createElement("th");
        $(objTHead2).html("SeriaId");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);*/
//For table Heading2
        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Ticket Id");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("District");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Base Location");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);
//For table Heading4
        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Ambulance No");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        //For table Heading5
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Schedule Service");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("In-Odometer");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Out-Odometer");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Off-Road Date");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("On-Road Date");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Status");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Update");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);


        //For table Heading5
//        var objTHead11 = document.createElement("th");
//        $(objTHead11).html("Payment Card No");
//        $(objTHead11).addClass("text-center");
//        $(objTr).append(objTHead11);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);


        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");


            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

//            var tablcol2 = document.createElement("td");
//            $(tablcol2).html(strData[i].mitSerialId);
//            console.log('SeriaId' + strData[i].mitSerialId);
//            $(tbleRow).append(tablcol2);

            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].mitTicketId);
            console.log(' Tciket Id' + strData[i].mitTicketId);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].districtName);
            $(tbleRow).append(tablcol3);


            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baselocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].mitRegNumber);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].mitServiceName);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].mitStart_odo_meterreading);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].mitEndOdoMeterReading);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].mitStartDateTime);
            $(tbleRow).append(tablcol9);

            var reamarks = strData[i].mitRemarks;

            $('#service_name').val(strData[i].mitServiceName);//for update 

            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].mitEndDateTime);
            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");
            $(tablcol11).html(strData[i].mitStatusId);
            $(tbleRow).append(tablcol11);
            var serialId = strData[i].mitSerialId;

            //if status type = Open
            if (strData[i].mitStatusId === "Open") {

                var tablcol12 = document.createElement("td");
                var buttonTag = document.createElement('button');
                var text = document.createTextNode("Update");
                buttonTag.appendChild(text);
                $(buttonTag).addClass('btn btn-primary btn-sm');
                //$(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + ds_Lname+ '","' + strData[i].mitRegNumber + '","'+reamarks+'")');
                $(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + strData[i].mitSerialId + '","' + strData[i].mitTicketId + '","' + strData[i].districtName + '","' + strData[i].baselocName + '","' + strData[i].mitRegNumber + '"\n\
,"' + strData[i].mitServiceName + '","' + strData[i].mitStart_odo_meterreading + '","' + strData[i].mitEndOdoMeterReading + '","' + strData[i].mitEndDateTime + '","' + strData[i].mitStartDateTime + '","' + strData[i].shiftType + '"\n\
,"' + strData[i].mitRemarks + '","' + strData[i].mitWorkshopId + '","' + strData[i].mitOtherWorkshopName + '")');//
                $(tablcol12).append(buttonTag);
                $(tbleRow).append(tablcol12);
            } else {//else
                var tablcol12 = document.createElement("td");
                $(tablcol12).html(strData[i].mitStatusId);
                $(tbleRow).append(tablcol12);
                var serialId = strData[i].mitSerialId;
            }

            $(objTBody).append(tbleRow);

        }
        $("#preventive_maintaince_Id").append(objDivTag);
    } catch (err) {
        console.log("preventive_maintaince_Id" + err);
    }
}

/* 
 * appending data in update field
 * getSingleRowMaintainceDetails
 * @param {type} serialid
 */
function getSingleRowMaintainceDetails(serialid, ticketId, districtName, baselocname, regNumber, serviceName, startOdometerReading, endOdometerReading, endDateTime, startdateTime, shiftType, remarks, workshopid, mitOtherWorkshopName) {

    var workshop_id = $('#workshop_id_update').val(workshopid);
    $('#sericalID').val(serialid);
    $('#districtForupdate').val(districtName);
    $('#baselocationForUpdate').val(baselocname);
    $('#ambulanceIdForUpdate').val(regNumber);
    $('#shiftypeForUpdate').val(shiftType);
    $('#inodometerForUpdate').val(startOdometerReading);
    $('#outOdoMeterForUpdate').val(endOdometerReading);
    $('#scheduleserviceforUpdate').val(serviceName);
    $('#OffRoadRemarksForUpdate').val(remarks);
    $('#workshopNameForUpdate').val(mitOtherWorkshopName);

    $('#Update').modal('show');
}


/*
 * @Functionality:Update Preventive Maintaince Details
 * @Time Of Calling:-1
 * @What are the input:-PreventiveDomain
 * @Where Use:-updatepreventive Maintaince Details
 */
function updatePreventiveDetails() {
    $('listOfDistrictForRegistration').prop('disabled', true);
    var id = $('#sericalID').val();
    var workshopId = $('#workshop_id_update').val();
    //alert("workshopId"+workshopId);
    var rmit_end_odo_meterreading = $('#outOdoMeterForUpdate').val();
    var inOdoMeterReading = $('#inodometerForUpdate').val();
    // alert("outOdoMeterReading"+outOdoMeterReading);
    var rmit_payment_type_id = $('#paymentTypeUpdate').val();
    var workshopName = $('#strworkshopname').val();
    var rmit_paid_amount = $('#paidAmountUpdate').val();
    //end date time
    var rmit_end_date_time = $('#offRoadTimeForUpdate').val();
    var rmit_end_date_time1 = moment(rmit_end_date_time).format("YYYY-MM-DD");
    //onroad remarks
    var rmi_onroad_remarks = $('#OffRoadRemarksForUpdate').val();
    //workshopId
    var rmit_workshop_id = $('#strworkshopname').val();
    var mit_created_dtm = $('#strAditional_price_per_min').val();
    var mit_status_id = $('#strAditional_price_per_min').val();
    var mit_invoice_status = 1;
    var objJson = {
        mitSerialId: id,
        mitWorkshopId: workshopId, //For Preventive
        mitEndOdoMeterReading: rmit_end_odo_meterreading,
        mitPaymenTypeId: rmit_payment_type_id,
        mitPaidAmount: rmit_paid_amount,
        mitInvoiceStatus: mit_invoice_status,
        mitEndDateTime: rmit_end_date_time,
        miOnroadRemarks: rmi_onroad_remarks,
        mitCreatedDtm: 'now()',
        mitInvoiceNo: 1,
        mitStatusId: 2//2 for update

    };

    if (rmit_payment_type_id === "0" || rmit_payment_type_id === "" || rmit_payment_type_id === null) {
        showNotificationError("Select Payment Type", "paymentTypeUpdate", "error");
        return;
    }
    else if (rmit_paid_amount === "0" || rmit_paid_amount === "" || rmit_paid_amount === null) {
        showNotificationError("Enter Amount", "paidAmountUpdate", "error");
        return;
    }
    else if (inOdoMeterReading === "0" || inOdoMeterReading === "" || inOdoMeterReading === null) {
        showNotificationError("Enter In Odo-Meter Reading", "inodometerForUpdate", "error");
        return;
    } else if (rmit_end_odo_meterreading === "0" || rmit_end_odo_meterreading === "" || rmit_end_odo_meterreading === null) {
        showNotificationError("Enter End Odo-Meter Reading", "outOdoMeterForUpdate", "error");
        return;
    }
    else if (parseInt(rmit_end_odo_meterreading) < parseInt(inOdoMeterReading)) {
        showNotificationError("End Odo-Meter Reading Should Be Greater Or Equal To Previous Odo-Meter Reading", "outOdoMeterForUpdate", "error");
        return;
    }

    else if (rmit_end_date_time === "0" || rmit_end_date_time === "") {
        showNotificationError("Enter End Date Time", "offRoadTimeForUpdate", "error");
        return;
    }

    else if (rmi_onroad_remarks === "0" || rmi_onroad_remarks === "") {
        showNotificationError("Enter Remarks", "OffRoadRemarksForUpdate", "error");
        return;
    }

    //alert("objJson" + objJson);
    console.log('Object of Json::' + JSON.stringify(objJson));
    //var strUrl = 'http://192.168.1.191:8086/preventiveMaintainceController/updatePreventiveMaintainceDetails';
    var strUrl = Service.updatePreventiveDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json; charset=utf-8",
        async: false,
        crossDomain: false,
        success: function(data) {
            // alert("Successfully Updated");
            showNotificationError("Updated Successfully", "update_preventive", "success");
            if (data === 1) {
                window.setTimeout(function() {
                    location.reload();
                }, 2000);
            }

        },
        error: function() {
            console.log('In Error of  Details ');
        }
    });
}

function payment_Type() {
    if (paymenttype.length < 1 || paymenttype == []) {
        masterPaymentType();
        //  alert(paymentType.length);
        $.each(paymenttype, function(i, resData) {

            var districts = "<option value=" + resData.pt_serialid + ">" + resData.pt_payment_type + "</option>";
            $(districts).appendTo('#paymentTypeUpdate');

        });
    } else {
        $.each(paymenttype, function(i, resData) {
            var districts = "<option value=" + resData.pt_serialid + ">" + resData.pt_payment_type + "</option>";
            // $(districts).appendTo('#paymentTypeUpdate');
        });
    }
}
;



function shiftNameBasedOnId(shiftId) {

    // strUrl = 'http://192.168.1.191:8086/commondata/shiftTypeName/' +shiftId;
    var strUrl = Service.shiftNameBasedOnId + shiftId;
    //alert("strUrl"+strUrl);
    console.log("getBaselocationsFromId" + strUrl);
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                //alert("No supervisor id");
            } else {
                var jsonArray = data.gisControllerDTOs;

                $.each(jsonArray, function(i, resData) {
                    //  alert("resData"+resData.shiftTypeName);
                    $('#shift_type').val(resData.shiftTypeName);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_shiftTypes" + JSON.stringify(err));
        }
    });
}

/*
 * Other Workshop Payment Details
 * @Functionality:
 * @url
 */
function otherWorkshopPaymentDetails() {
    var strWorkshopId = $('#workshopId_for_reg').val();
    if (strWorkshopId === "1" || strWorkshopId === 1 || strWorkshopId === '1') {
        // document.getElementById("OthersFleetCard").disabled = false;
        $("#otherWorkshopName_for_reg").prop("disabled", false);
        $("#mobileNoForReg").prop("disabled", false);
        $("#addressForReg").prop("disabled", false);
        $("#ContactPersonNumberForReg").prop("disabled", false);

    }
    else {

        $("#otherWorkshopName_for_reg").prop("disabled", true);
        $("#mobileNoForReg").prop("disabled", true);
        $("#addressForReg").prop("disabled", true);
        $("#ContactPersonNumberForReg").prop("disabled", true);

    }
}

$('#workshopId_for_reg').on('change', function() {
    otherWorkshopPaymentDetails();
});



$('#ServiceNameReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});//otherWorkshopName_for_reg

$('#ServiceNameReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});//
/*
$('#otherWorkshopName_for_reg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$' '");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});*/

function testInput(event) {
	   var value = String.fromCharCode(event.which);
	   var pattern = new RegExp(/[a-zåäö ]/i);
	   return pattern.test(value);
	}

	$('#otherWorkshopName_for_reg').bind('keypress', testInput);

//
/*
 * Date Picker  For RoadTimming
 * Reset Search Preventive Maintaince Details
 */

function resetPreventiveMaintaince() {  
    $('#districs_id').val("0").trigger("chosen:updated");;
    $('#baselocation_id').val("0").trigger("chosen:updated");;
    $('#Ambulance_Id').val("0").trigger("chosen:updated");;
    $('#ticketId').val("");
    $('#offroadDate').val("");
    $('#fromDate').val("");
    $('#toDate').val("");
    baseLocation(0);
    getAmbulance(0);
    $('#preventive_maintaince_Id').empty();

}


/*
 * Reset insert Preventive Maintaince Details
 */
function resetInsertPreventivemaintaincceDetails() {
    $("#districtId_for_reg").val("0").trigger("chosen:updated");
    $("#baselocationId_for_reg").val("0").trigger("chosen:updated");
    $("#ambulanceId_for_reg").val("0").trigger("chosen:updated");
    $("#shiftTypeId_for_reg").val("0").trigger("chosen:updated");
    $("#workshopId_for_reg").val("0").trigger("chosen:updated");
    $("#otherWorkshopName_for_reg").val("")
    $("#mobileNoForReg").val("")
    $("#addressForReg").val("")
    $("#addressForReg").val("")
    $("#previousOdometerForReg").val("")
    $("#inOdometerForReading").val("")
    $("#outOdometerreading").val("")
    $("#serviceIdForReg").val("0").trigger("chosen:updated");
    $("#ServiceNameReg").val("")
    $("#offRoadTimeForReg").val("")
    $("#expectedOnRoadTimeForReg").val("")
    $("#remarksForReg").val("")
    getAmbulanceForReg(0);
    baseLocationForReg(0);

}

/*
 * Reset Update Preventive Maintaince Details
 */
function resetUpdatePreventiveMaintainceDetails() {
    $("#paymentTypeUpdate").val("0")
    $("#paidAmountUpdate").val("")
    $("#outOdoMeterForUpdate").val("")
    $("#ServicenameForUpdate").val("")
    $("#offRoadTimeForUpdate").val("")
    $("#expectedOnRoadTimeForUpdate").val("")
    $("#OffRoadRemarksForUpdate").val("")

}//OffRoadRemarksForUpdate

$('#offroadDate').datepicker({
    format: 'YYYY-MM-DD HH:mm:ss',
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});

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
});//toDate

$(document).ready(function () {
    $('#toDate').datepicker({
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

    $('#toDate').keyup(function () {
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

    }).on('datetimepicker', function (ev) {
            $(this).datepicker('hide');
        });

    $('#toDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});

$(document).ready(function () {
    $('#datetimepicker1').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        startDate: "today",

    }).on('datetimepicker1', function (ev) {
            $(this).datepicker('hide');
        });

    $('#toDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});

$(document).ready(function () {
    $('#datetimepicker2').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        //startDate: today 
        endDate: "today",

    }).on('datetimepicker2', function (ev) {
            $(this).datepicker('hide');
        });

    $('#toDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  


$("input[type=text]").keyup(function() {
    $("input[type=text]").attr("placeholder","")
});

//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var startDateTime=$('#start_date_time').val();
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Preventive Maintenance,Date&Time:"+startDateTime+" ERS";	
	alert("====message===="+message);
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
	
/*var emailtext =	'<html><head><title>Preventive Maintenance</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';
emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';
emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';
emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center;}.fw-600{font-weight:600;}';        
emailtext=emailtext+'.maintext{background-color: orange;color: white;height: 50px;}.text2{background-color:  #f5f5f5;}</style> </head>'; 
emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><table ><tr><th colspan="2" class="maintext">Issue Type:Preventive Maintenance</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';
emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   
emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2">'+odometer_reading+'</td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';
emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td></td>';
emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2"></td>';
emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2">'+schedule_service+'</td></tr><tr><td >Off Road Timing:</td><td class="text2">'+startDateTime+'</td>';
emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,</span><br><span class="text-purple">AP ERC Team.</span></div></div>';                     
emailtext=emailtext+'<div class="text-center "><p><span class="text-light-gray"></span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple"></a></p></div></body></html>';  */                                                                     	



var emailtext =	'<html><head><title>Preventive Maintenance</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Preventive Maintenance</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2">'+odometer_reading+'</td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td class="text2">'+emtId+'</td>';

emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2">'+pilotId+'</td>';

emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2">'+schedule_service+'</td></tr><tr><td >Off Road Timing:</td><td class="text2">'+startDateTime+'</td>';

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
	  var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
		
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
	var subject="AP ERS-Preventive Maintenance with Ticket Id:"+ticket_id
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
		              // alert(" Mail Sent Sucessfully");
		         //   } else {
		            	// showNotificationError("Sms And Mail Sent Sucessfully", "fuel_registration_id", "success");
		         //   }

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}





