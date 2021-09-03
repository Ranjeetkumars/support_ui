/**
 * 
 * @author Bhuneshwar Patel
 */

//district dropdown loading for search vehicle location movement
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
    getListOfDistrictForRegForCurrentDist();
    getListOfDistrictForRegForChangeDist();
});

/**
 * 
 * At the time Updation calling this function
 */

$('#Update').on('shown.bs.modal', function(e) {
    getPatientHandoverIssueReportToDm();

});


//District dropdown for search vehicle location movement
function getListOfDistrict() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#district_id');
    });
    $('#district_id').trigger("chosen:updated");
    $("#district_id").chosen();
}
;

/*
 *@functionality:  Search Patient Handover Issue
 * Disrict Drop Down Loading For Registation
 */
function getListOfDistrictForReg() {
    // here calling masterdata ajax call
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districtIdForReg');
    });
    $('#districtIdForReg').trigger("chosen:updated");
    $("#districtIdForReg").chosen();


}
;

// Disrict Drop Down Loading For Registation
function getListOfDistrictForRegForCurrentDist() {
    if (district.length < 1 || district == []) {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        $.each(district, function(i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtIdForCurrLoc');
        });
        $('#districtIdForCurrLoc').trigger("chosen:updated");
        $("#districtIdForCurrLoc").chosen();

    } else {
        $.each(district, function(i, resData) {
            //   alert("jii"+resData.districtName);
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtIdForCurrLoc');

        });
        $('#districtIdForCurrLoc').trigger("chosen:updated");
        $("#districtIdForCurrLoc").chosen();
    }
}
;

// Disrict Drop Down Loading For Registation
function getListOfDistrictForRegForChangeDist() {
    if (district.length < 1 || district == []) {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        $.each(district, function(i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtidForChngLoc');
        });
        $("#districtidForChngLoc").chosen();

    } else {
        $.each(district, function(i, resData) {
            //   alert("jii"+resData.districtName);
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#districtidForChngLoc');

        });
        $('#districtIdForCurrLoc').trigger("chosen:updated");
        $("#districtidForChngLoc").chosen();
    }
}
;


//onchange for search 
$('#district_id').on('change', function() {
    var listOfDistrict = $('#district_id').val();
    $('#baselocation_id').empty();
    baseLocation(listOfDistrict);
});


//on change for registation 
$('#districtIdForReg').on('change', function() {
    $('#baselocaIdForReg').empty();
    var  listOfDistrict = $('#districtIdForReg').val();
    baseLocationForReg(listOfDistrict);
    
  
});

//on change for registation 
$('#districtIdForCurrLoc').on('change', function() {
    var listOfDistrict = $('#districtIdForCurrLoc').val();
    $('#baselocidforCurrLoc').empty();
    baseLocationForRegForCurrentLoc(listOfDistrict);
});


//on change for registation 
$('#districtidForChngLoc').on('change', function() {
    var listOfDistrict = $('#districtidForChngLoc').val();
    $('#baselocIdforChngLoc').empty();
    baseLocationForRegForChangeLoc(listOfDistrict);
});


/*
 * @Functionality:Baselocation Dropdown Loading
 * For Search Vehicle Location Movement
 */
function baseLocation(listOfDistrict) {
	$('#baselocation_id').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select District</option>";
    $('#baselocation_id').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');
    });

    $('#baselocation_id').trigger("chosen:updated");
    $("#baselocation_id").chosen();
}
;




/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registation vehicle location Movement
 */
function baseLocationForReg(listOfDistrict) {
	  $('#baselocaIdForReg').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocaIdForReg').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocaIdForReg');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');


    });
    $('#baselocaIdForReg').trigger("chosen:updated");
    $("#baselocaIdForReg").chosen();

}
;


/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registation vehicle location Movement
 */
function baseLocationForRegForCurrentLoc(listOfDistrict) {
	$('#baselocidforCurrLoc').empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocidforCurrLoc').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocidforCurrLoc');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocidforCurrLoc').trigger("chosen:updated");
    $("#baselocidforCurrLoc").chosen();

}
;

/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registation vehicle location Movement
 */
function baseLocationForRegForChangeLoc(listOfDistrict) {
	$('#baselocIdforChngLoc').empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocIdforChngLoc').append(selectfirst)
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocIdforChngLoc');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocIdforChngLoc').trigger("chosen:updated");
    $("#baselocIdforChngLoc").chosen();

}
;

//on change for search 
$('#baselocation_id').on('change', function() {
    var baseLocationVal = $('#baselocation_id').val();
    $('#ambulance_id').empty();
    getAmbulance(baseLocationVal);
});

//on change for registation 
$('#baselocaIdForReg').on('change', function() {
    var baseLocationVal = $('#baselocaIdForReg').val();
    $('#ambulanceIdForReg').empty();
    getAmbulanceForReg(baseLocationVal);
});

$('#baselocaIdForReg').on('change', function() {
    var baseLocation = $('#baselocaIdForReg').val();
    getOdoMeter(baseLocation);
});


/*
 * @Functionality:Ambuance loading based on baselocation
 * For search 
 */
function getAmbulance(baseLocationVal) {
	$('#ambulance_id').empty();
    loadingAmbulanceMaster(baseLocationVal);
     var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulance_id').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulance_id');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#ambulance_id').trigger("chosen:updated");
    $("#ambulance_id").chosen();

}
;

/*
 * @Functionality:Ambulance loading based on baselocation
 * For Registation
 */
function getAmbulanceForReg(baseLocationVal) {
	 $('#ambulanceIdForReg').empty();
    loadingAmbulanceMaster(baseLocationVal);
      var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulanceIdForReg').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+ " >" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulanceIdForReg');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#ambulanceIdForReg').trigger("chosen:updated");
    $("#ambulanceIdForReg").chosen();

}
;

$('#baselocaIdForReg').on('change', function() {
    var baseLocation = $('#baselocaIdForReg').val();
    getOdoMeter(baseLocation);
});

/**
 * searcVehicleLocationMovement
 * @returns {undefined}
 */
//for search preventive maintaince Details
function searcVehicleLocationMovement() {
    $('#vehicleMovementId').empty();
    //   alert("searchAmbulanceOffRoad");
    var from_Date = $("#fromDate").val();
    var todate = $("#toDate").val();
    var intDistrictId = $("#district_id").val();
    var intBaseLocationId = $("#baselocation_id").val();
    var intAmulenceId = $("#ambulance_id").val();
    var ticketId = $("#ticketId").val();
    var vehicleMovmentdate = $("#movementDate").val();

    if (vehicleMovmentdate == null | vehicleMovmentdate == '') {
        vehicleMovmentdate = 0;
    }
    if (ticketId == null | ticketId == '') {
        ticketId = 0;
    }
    if (from_Date == null | from_Date == '') {
        from_Date = 0;
    }
    if (todate == null | todate == '') {

        todate = 0;
    }
    if (intDistrictId == null | intDistrictId == '' | intDistrictId == "0") {
        intDistrictId = 0;
    }
    if (intBaseLocationId == null | intBaseLocationId == '' | intBaseLocationId == "0") {
        intBaseLocationId = 0;
    }
    if (intAmulenceId == null | intAmulenceId == '' | intAmulenceId == "0") {
        intAmulenceId = 0;
    }
    
    if (intDistrictId==0 &&intBaseLocationId==0 &&intAmulenceId==0 &&vehicleMovmentdate==0&&ticketId==0&&from_Date==0&&todate==0){   
      	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
      	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
      	return true;
      }

    var objJson = {
        vm_district_id: intDistrictId,
        vm_baselocation_id: intBaseLocationId,
        vm_reg_number: intAmulenceId,
        offdate: from_Date,
        ondate: todate,
       // onroadfromdate: 0,
        vm_end_date: vehicleMovmentdate,
        par_vm_ticket_id: ticketId
    };
    
    //var strUrl = 'http://192.168.1.191:2000/ambulanceOffRoadController/searchAmbulanceOffRoadDetails';
    var strUrl = Service.searchVehicleLocMovement;
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
           // alert('responsecode===>'+data.status);
            if (200 !== responsecode) {
            	var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No Data Available....");
                $('#vehicleMovementId').append(divTag);
            } else {
                var jsonArray = data.vehicleMovementControllerDTO;
                console.log("daata : " + JSON.stringify(data));
                var strData = data;
                if (jsonArray.length > 0) {
                    vehicleLocationMovementData(jsonArray);
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

//Data Table For Vehicle Location Movemnet
function vehicleLocationMovementData(strData) {
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
        $(objTHead3).html("Ambulance No");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Expected Date & Time");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Old District");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Old Base Location");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("New District");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("New Base Location");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Status");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Update");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);


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
            $(tablcol2).html(strData[i].par_vm_ticket_id);
            console.log('SeriaId' + strData[i].par_vm_ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].vm_reg_number);
            // console.log(' Dist' + strData[i].aor_districtid);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");

            $(tablcol4).html(strData[i].vm_expected_date);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].olddistrictName);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].oldbaselocName);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");

            $(tablcol7).html(strData[i].newDistrict);//setNewDistrict
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");

            $(tablcol8).html(strData[i].newBaselocation);
            $(tbleRow).append(tablcol8);


            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].vm_status_id);
            $(tbleRow).append(tablcol9);
            //if status id ==Open
            if(strData[i].vm_status_id==="Open"){
            
            var tablcol10 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            //$(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + ds_Lname+ '")');
            $(buttonTag).attr('onclick', 'getting_SingleRow("' + strData[i].vm_seriaid + '","' + strData[i].vm_district_id + '","' + strData[i].vm_baselocation_id + '","' + strData[i].vm_vehicle_id + '","' + strData[i].vm_emp_shift_id + '","' + strData[i].newDistrict + '","' + strData[i].newBaselocation + '","'
                    + strData[i].olddistrictName + '","' + strData[i].oldbaselocName + '","' + strData[i].vm_start_date + '","' + strData[i].vm_end_date + '","' + strData[i].lastodometerReading + '","' + strData[i].vm_reg_number + '","' + strData[i].lastodometerReading + '","' + strData[i].vm_status_id + '","' + strData[i].districtName + '","' + strData[i].baselocName+ '")');//
            $(tablcol10).append(buttonTag);
            $(tbleRow).append(tablcol10);
        }else{
            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].vm_status_id);
            $(tbleRow).append(tablcol10); 
        }

            $(objTBody).append(tbleRow);

        }
        $("#vehicleMovementId").append(objDivTag);
    } catch (err) {
        console.log("vehicleMovementId" + err);
    }
}

//Data appending for updation
function getting_SingleRow(serialid, districtId, baselocationiD, vehicleId, empShiftId, newDistrict, newBaselocation, oldDistName, oldBaselocName, startDate, endDate, lastodometerReading, vm_reg_numberId, lastodometerreading, statusId,distname,bas_locName) {
    $('#serial_id').val(serialid);
    $('#districtForIdForUpdate').val(distname);
    $('#baselocIdForUpdate').val(bas_locName);
    $('#ambulanceIdForUpdate').val(vm_reg_numberId)
    $('#shiftTypeForUpdate').val(empShiftId)//
    $('#currentDistrictIdForUpdate').val(newDistrict);
    $('#currentBaselocIdForUpdate').val(newBaselocation);
    $('#previousOdometerReadingForUpdate').val(lastodometerReading);
    $('#ChangDistrictidForUpdate').val(oldDistName)
    $('#ChangBaselocForUpdate').val(oldBaselocName)
   // $('#endOdometerReadingForUpdate').val(lastodometerreading);
    //$('#currentDistrictIdForUpdate').val()


    $('#Update').modal('show');
}


/**
 * updateVehicleLocationMovement
 * @returns 1
 */
function updateVehicleLocationMovement() {
    var serialId = $('#serial_id').val();
    var previousOdometerReading = $('#previousOdometerReadingForUpdate').val()
    var startOdomeretrReading = $('#startOdometerReadingForUpdate').val();
    var reason = $('#reasonForChangeUpdate').val();
    var expectedMovDate = $('#expectedDateForUpdate').val();//endOdometerReadingForUpdate
    var remarks = $('#remarksUpdate').val();
    var endodometer_reading=$('#endOdometerReadingForUpdate').val();
    var objJson = {
        vm_seriaid: serialId,
        vm_firstodometerreading: startOdomeretrReading,
        vm_reasons: reason,
        vm_end_date: expectedMovDate,
        vm_remarks: remarks,
        vm_created_dtm: 'now()',
        vm_status_id: 2
    };

    if (startOdomeretrReading === "0" || startOdomeretrReading === "" || startOdomeretrReading === null) {
        showNotificationError("Enter Start Odometer Reading", "startOdometerReadingForUpdate", "error")
        return;
    }
    
 /*   if (startOdomeretrReading === "0" || startOdomeretrReading === "" || startOdomeretrReading === null) {
        showNotificationError("Enter Start Odometer Reading", "startOdometerReadingForUpdate", "error")
        return;
    }*/
    else if (parseInt(startOdomeretrReading) < parseInt(previousOdometerReading)) {
        showNotificationError("Start Odo-Meter Must Be Equal Or greater Than PreviousOdometer", "startOdometerReadingForUpdate", "error");
        return;
    }
   
    else if (expectedMovDate === "0" || expectedMovDate === "") {
        showNotificationError("Select Expected Move Date", "expectedDateForUpdate", "error");
        return;
    }

    else if (reason === "0" || reason === "" || reason === null) {
        showNotificationError("Enter Reason For Change", "reasonForChangeUpdate", "error")
        return;
    }


    else if (remarks === "0" || remarks === "" || remarks === null) {
        showNotificationError("Enter Remarks", "remarksUpdate", "error");
        return;
    }


    var strUrl = Service.updateVehicleLocationMovement;
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
            showNotificationError("Updated Successfully", "vehicl_updateId", "success");
            window.setTimeout(function() {
                location.reload();
            }, 3000);

            // alert("Successfully Inserted");
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });

}



/**
 * insertVehicleLocMovement
 * @returns 1
 */
function insertVehicleLocMovement() {
    var vehicleId = $('#ambulanceIdForReg').val();
    var vehicle_name = vehicleId.split(",");
    var baselocationId = $('#baselocaIdForReg').val();
    var regNumber = $('#').val();
    var activiyId = $('#').val();
    var oldBaselocId = $('#baselocIdforChngLoc').val();
    var oldDistId = $('#districtidForChngLoc').val();
    var lastOdoMeterReading = $('#endOdometerReadingForChngLoc').val();
    var newbaselocId = $('#baselocidforCurrLoc').val();
    var newdistId = $('#districtIdForCurrLoc').val();
    var firstOdometerreading = $('#startOdometerForReg').val();
    var reason = $('#reasonForChangeId').val();
    var expectedDate = $('#expectedDateForChngLoc').val();
    var vmit_expected_on_rd_dtm1 = moment(expectedDate).format("YYYY-MM-DD");
    var remarks = $('#remarksForChange').val();
    var districtId = $('#districtIdForReg').val();
    var empshiftId = $('#shiftTypeId_for_reg').val();
    var previous_odo_meter=$('#previousOdometerForReg').val();
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        vm_vehicle_id: vehicle_name[0],
        vm_baselocation_id: baselocationId,
        vm_reg_number: vehicle_name[1],
        vm_activity_id: 1,
        vm_oldbaselocationid: oldBaselocId,
        vm_olddistid: oldDistId,
        vm_lastodometerreading: lastOdoMeterReading,
        vm_newbaselocationid: newbaselocId,
        vm_newdistid: newdistId,
        vm_firstodometerreading: firstOdometerreading,
        vm_reasons: reason,
        vm_expected_date: 'now()',
        vm_remarks: remarks,
        vm_created_by_id: createdyid,
        vm_created_by_roleid:createdbtroleid,
        vm_district_id: districtId,
        vm_status_id: 1,
        vm_approval_status_id: 1,
        vm_emp_shift_id: empshiftId,
        vm_start_date: "now()"



    };

    if (districtId === "0") {
        showNotificationError("Select District", "districtIdForReg", "error");
        return;
    } else if (baselocationId === "0") {
        showNotificationError("Select Base Location", "baselocaIdForReg", "error");
        return;
    } else if (vehicleId === "0") {
        showNotificationError("Select Ambulances", "ambulanceIdForReg", "error");
        return;
    } else if (empshiftId === "0") {
        showNotificationError("Select ShiftType", "shiftTypeId_for_reg", "error");
        return;
    }
    else if (newdistId === "0") {
        showNotificationError("Select New District", "districtIdForCurrLoc", "error");
        return;
    }
    else if (newbaselocId === "0" || newbaselocId === "") {
        showNotificationError("Select New Base Location", "baselocidforCurrLoc", "error");
        return;
    }
    
    else if (previous_odo_meter === "0" || previous_odo_meter === "" || previous_odo_meter === null) {
        showNotificationError("Enter Previous Odo-Meter Reading", "previousOdometerForReg", "error");
        return;
    }
    
    else if (firstOdometerreading === "0" || firstOdometerreading === "" || firstOdometerreading === null) {
        showNotificationError("Enter First Odo-Meter Reading", "startOdometerForReg", "error");
        return;
    }
    else if (parseInt(firstOdometerreading) < parseInt(previous_odo_meter)) {
        showNotificationError("First Odo-Meter Reading Should Be Greater Or Equal To Previous Odo-Meter Reading", "endOdometerReadingForChngLoc", "error");
        return;
    }
    else if (oldDistId === "0" || oldDistId === "" || oldDistId === null) {
        showNotificationError("Select Old District", "districtidForChngLoc", "error");
        return;
    }

    else if (oldBaselocId === "0" || oldBaselocId === "" || oldBaselocId === null) {
        showNotificationError("Select Old Base Location", "baselocIdforChngLoc", "error");
        return;
    }

    else if (lastOdoMeterReading === "0" || lastOdoMeterReading === "" || lastOdoMeterReading === null) {
        showNotificationError("Enter Last Odo-Meter Reading", "endOdometerReadingForChngLoc", "error");
        return;
    }

    else if (parseInt(lastOdoMeterReading) < parseInt(firstOdometerreading)) {
        showNotificationError("End Odo-Meter Reading Should Be Greater Or Equal To Start Odo-Meter Reading", "endOdometerReadingForChngLoc", "error");
        return;
    }

    else if (expectedDate === "0" || expectedDate === "" || expectedDate === null) {
        showNotificationError("Select Expected Date", "expectedDateForChngLoc", "error");
        return;
    }
    else if (reason === "0" || reason === "" || reason === null) {
        showNotificationError("Enter Reason", "reasonForChangeId", "error");
        return;
    }

    else if (remarks === "0" || remarks === "" || remarks === null) {
        showNotificationError("Enter Remarks", "remarksForChange", "error");
        return;
    }

    // var strUrl = 'http://192.168.1.191:2000/ambulanceOffRoadController/updateAmbulanceOffRoadDetails'
    var strUrl = Service.insertVehicleLocMovement;
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
            showNotificationError("Inserted Successfully", "vehicle_locationSaveId", "success");
            // alert("Successfully Inserted");

            window.setTimeout(function() {
                location.reload();
            }, 3000);

        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}


/**
 * 
 * @param {type} disId
 * @returns getDistrictFromID
 */
function getDistrictFromID(disId) {

    console.log('==== DISTRICT ID' + disId);
    // var strUrl = 'http://192.168.1.191:2000/commondata/districtName/' + disId;
    var strUrl = Service.districtsName + disId;
    // alert("strUrl"+strUrl);
    console.log("getDistrictFromID" + strUrl);
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("No supervisor id");
            } else {
                var jsonArray = data.gisControllerDTOs;

                $.each(jsonArray, function(i, resData) {
                    //$('#district').val(resData.districtName);
                    $('#ds_Id').val(resData.districtName);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_shiftTypes" + JSON.stringify(err));
        }
    });
}

/**
 * 
 * @param {type} bLocId
 * @returns baseLocName
 */
function baseLocName(bLocId) {
    var strUrl = Service.listOfBaseLocation + bLocId;
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
                    //   $('#Location').val(resData.baselocationName);
                    $('#bs_Id').val(resData.baselocationName);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_shiftTypes" + JSON.stringify(err));
        }
    });
}

var odometer = []
function odoMeter(baseLocation) {
    //  alert("odoMeter");
    if (odometer.length < 1 || odometer == []) {
        masterOdoMeter(baseLocation);
        // alert(odometer.length);
        $.each(odometer, function(i, resData) {
            var odom = resData.odometerreading;
            var districts = "<option value=" + resData.odometerreading + ">" + resData.odometerreading + "</option>";
            $('#previous_odometer').val(resData.odometerreading);
            $('#previous_odometer_update').val(resData.odometerreading);
            $(districts).appendTo('#strWorkshopname');
            $('#previousOdometerReading').val($('#previousOdometerReading').val() + odom);
            //  $('#previousOdometerReading_update').val($('#previousOdometerReading_update').val() + odom);

        });
    } else {
        $.each(odometer, function(i, resData) {
            var districts = "<option value=" + resData.odometerreading + ">" + resData.odometerreading + "</option>";
            $(districts).appendTo('#strWorkshopname');
        });
    }
}
;


$(document).ready(function () {
    $('#movementDate').datepicker({
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

    $('#movementDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

$(document).ready(function () {
    $('#fromDate').datepicker({
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

    $('#fromDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

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
});//fromDate_Id

/**
 * ResetSearchDetails
 * @returns {undefined}
 */
function ResetVehLocMovSearchDetails() {
    //document.getElementById("district_id").value = "0";
  //  document.getElementById("baselocation_id").value = "0";
   // document.getElementById("ambulance_id").value = "0";
    $('#district_id').val("0");
    $('#baselocation_id').val("0");
    $('#ambulance_id').val("0");
    document.getElementById("ticketId").value = "";
    document.getElementById("movementDate").value = "";
    document.getElementById("fromDate").value = "";
    document.getElementById("toDate").value = "";
    baseLocation(0);
    getAmbulance(0);
    $('#vehicleMovementId').empty();
}

/*
 * 
 */
function resetInsertPreventiveMaintaince() {

    $("#districtIdForReg").val('0').trigger("chosen:updated");
    $("#baselocaIdForReg").val('0').trigger("chosen:updated");
    $("#ambulanceIdForReg").val('0').trigger("chosen:updated");
    $("#shiftTypeId_for_reg").val('0').val('0').trigger("chosen:updated");
    $("#districtIdForCurrLoc").val('0').trigger("chosen:updated");
    $("#baselocidforCurrLoc").val('0').trigger("chosen:updated");
    $("#previousOdometerForReg").val('');

    $("#startOdometerForReg").val('');
    $("#districtidForChngLoc").val('0').trigger("chosen:updated");
    $("#baselocIdforChngLoc").val('0').trigger("chosen:updated");
    $("#endOdometerReadingForChngLoc").val('');
    $("#expectedDateForChngLoc").val('');
    $("#reasonForChangeId").val('');
    $("#remarksForChange").val('');
    baseLocationForRegForCurrentLoc(0);
    baseLocationForReg(0);
    baseLocationForRegForChangeLoc(0);


}

function updateVehicleLocationMovment(){
    document.getElementById("startOdometerReadingForUpdate").value = "";
    document.getElementById("endOdometerReadingForUpdate").value = "";
    document.getElementById("expectedDateForUpdate").value = "";
    document.getElementById("reasonForChangeUpdate").value = "";
    document.getElementById("remarksUpdate").value = "";

}