
/*
 * on loading
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
 * At the time registation calling this function
 */

$('#registration').on('shown.bs.modal', function(e) {
    getListOfDistrictForReg();
     get_shiftTypes();
   getAmbulanceOffRoadTypes();
});

/**
 * 
 * At the time Updation calling this function
 */

$('#Update').on('shown.bs.modal', function(e) {
    getPatientHandoverIssueReportToDm();

});



function getListOfDistrict() {
    if (district.length < 1 || district == []) {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        $.each(district, function (i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districs_id');
        });
        $("#districs_id").chosen();
    } else {
        $.each(district, function (i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";


        });
    }
}
;

/*
 *@functionality:  Search Patient Handover Issue
 * Disrict Drop Down Loading For Search
 */
function getListOfDistrictForReg() {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        $.each(district, function (i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtIdForReg');
        });
         $('#districtIdForReg').trigger("chosen:updated");
        $("#districtIdForReg").chosen();
  
}
;

//onchange for search patient handover issue
$('#districs_id').on('change', function () {
    var listOfDistrict = $('#districs_id').val();
    $('#baselocation_id').empty();
    baseLocation(listOfDistrict);
});

//on change for registation patient handover issue
$('#districtIdForReg').on('change', function () {
    var listOfDistrict = $('#districtIdForReg').val();
    $('#baselocationForReg').empty();
    baseLocationForReg(listOfDistrict);
});

/*
 * @Functionality:Baselocation Dropdown Loading
 * For Search Patient handover issue
 */
function baseLocation(listOfDistrict) {
	$('#baselocation_id').empty();
        loadingBaseLocationMaster(listOfDistrict);
          var selectfirst = "<option value='0'>Select Baselocation</option>";
         $('#baselocation_id').append(selectfirst);
        $.each(baselocations, function (i, resData) {
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
 *  For Registation Patient Handover issue
 */
function baseLocationForReg(listOfDistrict) {
	 $('#baselocationForReg').empty();
        loadingBaseLocationMaster(listOfDistrict);
            var selectfirst = "<option value='0'>Select Baselocation</option>";
         $('#baselocationForReg').append(selectfirst);
        $.each(baselocations, function (i, resData) {
            var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
            $(baselocation).appendTo('#baselocationForReg');
         //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

        });
         $('#baselocationForReg').trigger("chosen:updated");
        $("#baselocationForReg").chosen();
   
}
;

//on change for search Patient handover issue
$('#baselocation_id').on('change', function () {
    var baseLocationVal = $('#baselocation_id').val();
    $('#Ambulance_Id').empty();
    getAmbulance(baseLocationVal);
});

//on change for registation patient handover issue
$('#baselocationForReg').on('change', function () {
    var baseLocationVal = $('#baselocationForReg').val();
    $('#ambulanceForReg').empty();
    getAmbulanceForReg(baseLocationVal);
});

$('#baselocationForReg').on('change', function() {
    var baseLocation = $('#baselocationForReg').val();
    getOdoMeter(baseLocation);
});


/*
 * @Functionality:Ambuance loading based on baselocation
 * For search Patient handover issue
 */
function getAmbulance(baseLocationVal) {
	   $('#Ambulance_Id').empty();
        // here calling masterdata ajax call
        loadingAmbulanceMaster(baseLocationVal);
         var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#Ambulance_Id').append(selectfirst);
        $.each(ambulances, function (i, resData) {
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
 * For Registation Patient handover issue
 */
function getAmbulanceForReg(baseLocationVal) {
	 $('#ambulanceForReg').empty();
        loadingAmbulanceMaster(baseLocationVal);
         var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#ambulanceForReg').append(selectfirst);
        $.each(ambulances, function (i, resData) {
            var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+" >" + resData.vehicleName + "</option>";
            $(ambulances).appendTo('#ambulanceForReg');
            //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
        });
           $('#ambulanceForReg').trigger("chosen:updated");
         $("#ambulanceForReg").chosen();
   
}
;

$('#ambulanceForReg').on('change', function() {
    var vehicleId = $('#ambulanceForReg').val();
    getOdoMeter(vehicleId);
});


/**
 * 
 * @returns {Boolean}
 */
function searchAmbulanceOffRoad() {
    $('#ambulanceOffRoadId').empty();
 //   alert("searchAmbulanceOffRoad");
    var fromDate = $("#offRoadDate").val();
    var toDate = $("#todate").val();
    var intDistrictId = $("#districs_id").val();
    var intBaseLocationId = $("#baselocation_id").val();
    var intAmulenceId = $("#Ambulance_Id").val();
    var ticket_Id = $("#ticketid").val();
    var onRoad_Date = $("#onRoadFromDate").val();
    var onRoadTo_Date=$("#onRoadToDate").val();
    if (onRoad_Date == null | onRoad_Date == '') {
        onRoad_Date = 0;
    }
    if (onRoadTo_Date == null | onRoadTo_Date == '') {
        onRoadTo_Date = 0;
    }
    if (ticket_Id == null | ticket_Id == '') {
        ticket_Id = 0;
    }
    if (fromDate == null | fromDate == '') {
        fromDate = 0;
    }
    if (toDate == null | toDate == '') {

        toDate = 0;
    }

    var objJson = {

        aor_districtid: intDistrictId,
        aor_baselocation_id: intBaseLocationId,
        aor_vehicle_id: intAmulenceId,
        offfromdate: fromDate,
        offroadtodate: toDate,
        onroadfromdate: onRoad_Date,
        onroadtodate:onRoadTo_Date,
        ticketId:ticket_Id
    };
    //var strUrl = 'http://192.168.1.191:8086/ambulanceOffRoadController/searchAmbulanceOffRoadDetails';
    var strUrl = Service.searchAmbulanceOffRoad;
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
                $('#ambulanceOffRoadId').append(divTag);
            } else {

                var jsonArray = data.ambulanceControllerDTOs;
                console.log("daata : " + JSON.stringify(data));
                var strData = data;
                if (jsonArray.length > 0) {
                    ambulanceOffRoadData(jsonArray);
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

function ambulanceOffRoadData(strData) {
    try {
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

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Ticket Id");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);
//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("District");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Baselocation");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Ambulance No");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Type Of Problem");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Reason");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Off Road Date & Time");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Expected On Road Date & Time");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        
         var objTHead10 = document.createElement("th");
        $(objTHead10).html("Status");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Update");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);


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
            
            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].aor_ambulance_off_road_number);
            console.log('SeriaId' + strData[i].aor_ambulance_off_road_number);
            $(tbleRow).append(tablcol2);
            
            var tablcol3 = document.createElement("td");

            $(tablcol3).html(strData[i].districtName);
            console.log(' Dist' + strData[i].aor_districtid);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baselocName);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].aor_reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].offroadprobletype);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].par_ri_reason);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].par_ri_off_road_time);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].par_ri_expected_road_time);
            $(tbleRow).append(tablcol9);

        
            
            var tablcol10 = document.createElement("td");
            // var admin = supervisorType(strData[i].distmanagerid);
            var distmanager = $('#admin').val();
            $(tablcol10).html(strData[i].acr_status_id);
            $(tbleRow).append(tablcol10);
            var serialId = strData[i].mitSerialId;
             
            if(strData[i].acr_status_id==="Open"){
                
            var tablcol11 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            
            //$(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + ds_Lname+ '","' + strData[i].mitRegNumber + '","'+reamarks+'")');
           $(buttonTag).attr('onclick', 'getting_Row("'+strData[i].aor_baselocation_id+'","'+strData[i].districtName+'","'+strData[i].baselocName+'","'+strData[i].aor_reg_number+'","'+strData[i].pilotid+'","'+strData[i].pilotname+'","'+strData[i].emsoId+'","'+strData[i].emsoname+'","'+strData[i].offroadprobletype+'","'+strData[i].par_ri_reason+'","'+strData[i].par_ri_off_road_time+'","'+strData[i].baselocName+'","'+distmanager+'","'+strData[i].aor_seriaid+'","'+strData[i].aor_ambulance_off_road_number+'")');
            $(tablcol11).append(buttonTag);
            $(tbleRow).append(tablcol11);
            $(objTBody).append(tbleRow);
            
            }else{
            var tablcol11 = document.createElement("td");
            var distmanager = $('#admin').val();
            $(tablcol11).html(strData[i].acr_status_id);
            $(tbleRow).append(tablcol11);
            var serialId = strData[i].mitSerialId;  
            }
        }
        $("#ambulanceOffRoadId").append(objDivTag);
    } catch (err) {
        console.log("ambulanceOffRoadId" + err);
    }
}


 function getting_Row(baselocationId,ds_Lname, bs_Lname, regNumber, pilotId, pilotName, emsoId, emsoname, OffRoadProblemType, reason, offRoadTime, baseloc, distmanager, serialId,aor_ambulance_off_road_number) {
//alert("remarks1"+ds_Lname);
    $('#ticketId').val(aor_ambulance_off_road_number);
    $('#serial_id').val(serialId);
    var odo_meter = getOdoMeter(baselocationId);
    var odo = $('#odo_meter').val();
    // alert("odo"+odo);
    $('#districtIdForUpdate').val(ds_Lname);
    $('#baselocForUpdate').val(bs_Lname);
    $('#ambulanceForUpdate').val(regNumber);
    $('#offRoadProblemTypeUpdate').val(OffRoadProblemType);
    $('#pilotid_for_update').val(pilotId);
    $('#pilotnum_for_update').val(pilotName);
    $('#emtid_for_update').val(emsoId);
    $('#emtnum_for_update').val(emsoname);
    $('#reasonForAbsenceUpdate').val(reason);
    // alert("offRoadTime"+offRoadTime);
    $('#ambulanceOffroadDateUpdate').val(offRoadTime);
    // $('#ambulanceOnroad_update').val(emsoname);
    $('#districtManagerForUpdate').val(distmanager);

    $('#Update').modal('show');

}


/**
 * update:updateAmbulanceOffRoadDetails
 * @returns {undefined}
 */
function updateAmbulanceOffRoadDetails() {
    var serialId = $('#serial_id').val();
    var ticket_id=$('#ticketId').val();
    //alert("serialId"+serialId);
    var previousOdoMeterReading = $('#previousOdometerReadingForUpdate').val();
    var ambulanceOnRoadTime = $('#expectedOnRoadDateUpdate').val();
    var endOdoMeterReading = $('#inOdometerReadingForUpdate').val();
    var vremarks = $('#remarksForUpdate').val();
    var createdDtm='now()';
    var objJson = {
        aor_ambulance_off_road_number:ticket_id,
        aor_seriaid: serialId,
        aor_on_road_time: ambulanceOnRoadTime,
        aor_created_dtm: createdDtm,
        aor_status_id: 2, //for update
        acr_ono_road_remarks: vremarks,
        aor_end_odo_reading: endOdoMeterReading//endOdoMeterReading
    };

    if (ambulanceOnRoadTime === "0" || ambulanceOnRoadTime === "" || ambulanceOnRoadTime === null) {
        showNotificationError("Select Ambulance OnRoad Time", "expectedOnRoadDateUpdate", "error");
        return;
    }
    else if (previousOdoMeterReading === "0" || previousOdoMeterReading === "") {
        showNotificationError("Enter Previous Odo-Meter Reading", "previousOdometerReadingForUpdate", "error");
        return;
    }
    else if (endOdoMeterReading === "0" || endOdoMeterReading === "") {
        showNotificationError("Enter End Odo-Meter Reading", "inOdometerReadingForUpdate", "error");
        return;
    }
    else if (parseInt(endOdoMeterReading) < parseInt(previousOdoMeterReading)) {
        showNotificationError("End Odo-Meter Reading Should  Be Greater Or Equal To Previous Odo-Meter Reading", "inOdometerReadingForUpdate", "error");
        return;
    }
   /* else if (parseInt(endodoMeterReading) < parseInt(startOdoMeterReading)) {
        showNotificationError("In Odo-Meter Reading Should Be Greater Or Equal to Previous Odo-Meter Reading", "inOdometerReadingForReg", "error");
        return;
    }*/
    else if (vremarks === "0" || vremarks === "") {
        showNotificationError("Enter Remarks", "remarksForUpdate", "error");
        return;
    }
   // var strUrl = 'http://192.168.1.191:8086/ambulanceOffRoadController/updateAmbulanceOffRoadDetails'
    var strUrl=Service.updateAmbulanceOffRoadDetails;
    //  alert("strUrl" + strUrl);
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'text',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function(data) {
            showNotificationError("Updated Successfully", "ambulance_update_id", "success");
            // alert("Successfully Inserted");
         /*   window.setTimeout(function() {
                        location.reload();
                    }, 3000);*/
                   
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}



/*
 * @Functionality:for insert insertAmbulanceOffRoadDetails details
 * @Time Of Calling:-1
 * @What are the input:-AmbulanceOffRoad Domain
 * @Where Use:-
 */
function insertAmbulanceOffRoadDetails() {
    //alert("insertAmbulanceOffRoadDetails");
    var districtId = $('#districtIdForReg').val();
    var baselocationId = $('#baselocationForReg').val();
    var ambulanceNo = $('#ambulanceForReg').val();
    
    //var ambulanceNo = $('#listOfAmbulanceForReg').val();
    var vehicleId = ambulanceNo.split(",");
    
    var shiftType = $('#shiftTypeId_for_reg').val();
    var ambulanceProblemType = $('#offRoadProblemTypeforReg').val();
    var reasonForAmbulance = $('#reasonForAbsecenceForReg').val();
    var ambulanceOffRoadtime = $('#ambulanceoffroaddateForreg').val();
    $('#ambulanceOffRoadtime').empty();
    var ambulanceOffRoadtime1 = moment(ambulanceOffRoadtime).format("YYYY-MM-DD");
    //  alert("ambulanceOffRoadtime"+ambulanceOffRoadtime);
    var expectedRoadTime = $('#expecteddateforreg').val();
    $('#expecteddateforreg').empty();
    var expectedRoadTime1 = moment(expectedRoadTime).format("YYYY-MM-DD");
    //   alert("expectedRoadTime1"+expectedRoadTime+"     "+expectedRoadTime);
    var startOdoMeterReading = $('#previousOdometerForReg').val();
    var endodoMeterReading = $('#inOdometerReadingForReg').val();
    var otherDistrictManager = $('#otherDistrictManagerForReg').val();
    var districtManagerForReg=$('#districtmanagerForReg').val();
    var remarks = $('#remarksForReg').val();
    var riCreatedDtm = 'now()';
    // var ambulanceNo = $('#listOfAmbulanceForReg').val();
    
    if(reasonForAmbulance==null||reasonForAmbulance==""){
    	reasonForAmbulance=" ";
    }
    if(otherDistrictManager==null||otherDistrictManager==""){
    	otherDistrictManager=" ";
    }
    if(districtManagerForReg==null||districtManagerForReg==""){
    	districtManagerForReg=" ";
    }
    var user_id=localStorage.getItem("userID");
    var module_id=localStorage.getItem("opdesk_moduleID");
    var role_id=localStorage.getItem("opdesk_roleID");
    var objJson = {
        par_ri_vehicle_id: vehicleId[0],
        aor_districtid: districtId,
        aor_baselocation_id: baselocationId,
        //aor_reg_number: vehicleId[1],
        aor_activity_id: 11,
        aor_ambulance_off_road_number: ambulanceProblemType, //ambulance Problem Type
        acr_off_road_time: ambulanceOffRoadtime1,
        aor_start_odo_reading: startOdoMeterReading,
        aor_end_odo_reading: endodoMeterReading,
        acr_status_id: 1,
        //second sp
        aor_vehicle_id:vehicleId[0],
        
        
        aor_reg_number:vehicleId[1],
        par_ri_ambulance_off_road_id: 4,
        par_ri_reason: reasonForAmbulance,
        par_ri_remarks: remarks,
        par_ri_created_dtm: riCreatedDtm,
        par_ri_created_by_id: user_id,
        par_ri_created_by_roleid: role_id,
        par_ri_off_road_time: ambulanceOffRoadtime1,
        par_ri_expected_road_time: expectedRoadTime1,
        par_ri_other_district_manager: otherDistrictManager
    };
    if (districtId === "0") {
        showNotificationError("Select District", "districtIdForReg", "error");
        return;
    } else if (baselocationId === "0") {
        showNotificationError("Select Base Location", "baselocationForReg", "error");
        return;
    } else if (vehicleId[0] === "0") {
        showNotificationError("Select Ambulances", "ambulanceForReg", "error");
        return;
    } else if (shiftType === "0") {
        showNotificationError("Select Shift Type", "shiftTypeId_for_reg", "error");
        return;
    }
    else if (ambulanceProblemType === "0") {
        showNotificationError("Select Ambulance Problem Type", "offRoadProblemTypeforReg", "error");
        return;
    }
  /*  else if (reasonForAmbulance === "0" || reasonForAmbulance === "") {
        showNotificationError("Enter Reason For Absecence", "reasonForAbsecenceForReg", "error");
        return;
    }*/

    else if (ambulanceOffRoadtime === "0"|| ambulanceOffRoadtime === ""||ambulanceOffRoadtime === null) {
        showNotificationError("Select Ambulance Off Road Time", "ambulanceoffroaddateForreg", "error");
        return;
    }
    else if (expectedRoadTime === "0" || expectedRoadTime === "" || expectedRoadTime === null) {
        showNotificationError("Select Expected Road Time", "expecteddateforreg", "error");
        return;
    }
//    else if (parseInt(expectedRoadTime1) < parseInt(ambulanceOffRoadtime1)) {
//        //alert ("Todate should be greater than from FromDate");
//        showNotificationError("expected end date should be greater than startdate", "exceptedOnroadDtm", "error");
//        return ;
//    }
    else if (startOdoMeterReading === "0" || startOdoMeterReading === "") {
        showNotificationError("Enter Previous Odo-Meter Reading", "previousOdometerForReg", "error");
        return;
    }
    else if (endodoMeterReading === "0" || endodoMeterReading === "") {
        showNotificationError("Enter In Odo-Meter Reading", "inOdometerReadingForReg", "error");
        return;
    }
    else if (parseInt(endodoMeterReading) < parseInt(startOdoMeterReading)) {
        showNotificationError("In Odo-Meter Reading Should Be Greater Or Equal to Previous Odo-Meter Reading", "inOdometerReadingForReg", "error");
        return;
    }
  /*  else if (otherDistrictManager === "0" || otherDistrictManager === "") {
        showNotificationError("Enter District Manager Name", "otherDistrictManagerForReg", "error");
        return;
    }*/

    else if (remarks === "0" || remarks == "" || remarks === null) {
        showNotificationError("Enter Remarks", "remarksForReg", "error");
        return;
    }

    console.log('Object of Json::' + JSON.stringify(objJson));
    //var strUrl = 'http://192.168.1.191:8086/ambulanceOffRoadController/insertAmbulanceOffRoadDetails'
    
}


function getAmbulanceOffRoadTypes() {
    try {
        var strUrl = Service.getAmbulanceOffRoadTypes;
        console.log("get_shiftTypes Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
             //   alert("------------------>" + data);
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.ambulanceControllerDTOs;

                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.aor_seriaid + ">" + resData.offroadprobletype + "</option>";
                        $(shiftTypeData).appendTo('#offRoadProblemTypeforReg');
                        $(shiftTypeData).appendTo('#');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_shiftTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_shiftTypes()' + err);
    }
}



function resetSearchDetails() {
	baseLocation(0);
	getAmbulance(0);
    $("#districs_id").val("0").trigger("chosen:updated");
    $("#baselocation_id").val("0").trigger("chosen:updated");
    $("#Ambulance_Id").val("0").trigger("chosen:updated");
    $("#ticketid").val("");
    $("#offRoadDate").val("");
    $("#todate").val("");
    $("#onRoadFromDate").val("");
    $("#onRoadToDate").val("");
    $('#ambulanceOffRoadId').empty();
    
}

function resetAmbulanceReg() {
    $("#districtIdForReg").val("0").trigger("chosen:updated");
    $("#baselocationForReg").val("0").trigger("chosen:updated");
    $("#ambulanceForReg").val("0").trigger("chosen:updated");
    $("#shiftTypeId_for_reg").val("0").trigger("chosen:updated");
    $("#offRoadProblemTypeforReg").val("0").trigger("chosen:updated");
    $("#reasonForAbsecenceForReg").val("");
    $("#ambulanceoffroaddateForreg").val("");

    $("#expecteddateforreg").val("");
    $("#previousOdometerForReg").val("");
    $("#inOdometerReadingForReg").val("");
    $("#districtmanagerForReg").val("");
    $("#otherDistrictManagerForReg").val("");
    $("#remarksForReg").val("");
    baseLocationForReg(0);
    getAmbulanceForReg(0);
}

function updateAmbulanceReg() {
    $("#previousOdometerReadingForUpdate").val("");
    $("#inOdometerReadingForUpdate").val("");
    $("#expectedOnRoadDateUpdate").val("");
    $("#inOdometerReadingForUpdate").val("");
    $("#otherDistrictManagerForUpdate").val("");
    $("#remarksForUpdate").val("");
    $("#districtManagerForUpdate").val("");
    $("#remarksForUpdate").val("");
  
}


$(document).ready(function () {
    $('#offRoadDate').datepicker({
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

    $('#offRoadDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

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
});//fromDate_Id

$(document).ready(function () {
    $('#onRoadFromDate').datepicker({
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

    $('#onRoadFromDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

$(document).ready(function () {
    $('#onRoadToDate').datepicker({
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

    $('#onRoadToDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//ambulanceoffroaddateForreg

$(document).ready(function () {
    $('#ambulanceoffroaddateForreg').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#ambulanceoffroaddateForreg').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//expecteddateforreg

$(document).ready(function () {
    $('#expecteddateforreg').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#expecteddateforreg').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

$(document).ready(function () {
    $('#expectedOnRoadDateUpdate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#expectedOnRoadDateUpdate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

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
