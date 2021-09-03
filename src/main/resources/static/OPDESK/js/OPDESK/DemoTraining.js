/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('#registration').on('shown.bs.modal', function (e) {
    getListOfDistrict_reg();
    get_shiftTypes_demo();

});
$('#update').on('shown.bs.modal', function (e) {
    getDemoReportPrepare();
});
$(document).ready(function () {
    try {
        getListOfDistrict_demo();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/*
 * For loading the Districs based on the state ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function getListOfDistrict_demo() {
    $("#districs_id").empty();
    $("#districs_id_reg").empty();
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#districs_id').append(selectfirst);
    $('#districs_id_reg').append(selectfirst);
    $.each(district, function (i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districs_id');
        $(districts).appendTo('#districs_id_reg');

    });
    $('#districs_id').trigger("chosen:updated");
    $('#districs_id_reg').trigger("chosen:updated");
    $('#districs_id').chosen();
    $('#districs_id_reg').chosen();
}
;
$('#districs_id').on('change', function () {
    var listOfDistrict = $('#districs_id').val();
    $("#baselocation_id").empty();
    baseLocation_demo(listOfDistrict);
});
/*
 * For loading the baseloc  based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district is the input
 */
function baseLocation_demo(listOfDistrict) {
	 $("#baselocation_id").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocation_id').append(selectfirst);
    $.each(baselocations, function (i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');

    });
    $('#baselocation_id').trigger("chosen:updated");
    $("#baselocation_id").chosen();

}
;



$('#baselocation_id').on('change', function () {
    var baseLocation = $('#baselocation_id').val();
    $("#Ambulance_Id").empty();
    getAmbulance_demo(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_demo(baseLocation) {
	$("#Ambulance_Id").empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#Ambulance_Id').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#Ambulance_Id');
    });

    $('#Ambulance_Id').trigger("chosen:updated");
    $("#Ambulance_Id").chosen();
}
;

/*
 * For loading the ShiftType  calling to masterdata
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_shiftTypes_demo() {

    if (shiftType.length < 1 || shiftType === []) {
        // here calling masterdata ajax call
        loadingShiftTypeMaster();
        $.each(shiftType, function (i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#shiftTypeId');

        });
    }
}
;
function getListOfDistrict_reg() {
    getListOfDistrict_demo();
}
$('#districs_id_reg').on('change', function () {
    var listOfDistrict = $('#districs_id_reg').val();
    $("#basloc_id_reg").empty();
    baseLocation_reg(listOfDistrict);
});
/*
 * For loading the baseloc  for reg based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district is the input
 */
function baseLocation_reg(listOfDistrict) {
	$("#basloc_id_reg").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#basloc_id_reg').append(selectfirst);
    $.each(baselocations, function (i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#basloc_id_reg');
    });
    $('#basloc_id_reg').trigger("chosen:updated");
    $("#basloc_id_reg").chosen();

}
;
$('#basloc_id_reg').on('change', function () {
    var baseLocation = $('#basloc_id_reg').val();
    $("#ambulance_id_reg").empty();
    getAmbulance_reg(baseLocation);
});
/*
 * For loading the Ambulance  for reg based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_reg(baseLocation) {
	 $("#ambulance_id_reg").empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulance_id_reg').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulance_id_reg');
    });
    $('#ambulance_id_reg').trigger("chosen:updated");
    $("#ambulance_id_reg").chosen();
}
;

$('#ambulance_id_reg').on('change', function () {

    var ambualceId = $('#ambulance_id_reg').val();
    getOdoMeter_reg_demo(ambualceId);
});

/*
 * For loading the previous OdoMeter  based on the ambualceId calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */

function getOdoMeter_reg_demo(ambualceId) {

    if (odoMeter.length < 1 || odoMeter === []) {
        // here calling masterdata ajax call
        loadingOdometerMaster(ambualceId);
        var odoMeter1 = odoMeter.toString();
    }

}
/*
 * For inserting  the DemoTraining details.
 * priyadarshini
 * 16-05-2019
 * the input are
 */
function saveDemoRegistationDetails() {
    var district = $("#districs_id_reg").val();
    $('#districtId').val(district);
    var BaseLocation = $("#basloc_id_reg").val();
    $('#baselocationId').val(BaseLocation);
    var ambulanceId = $("#ambulance_id_reg").val();
    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    $('#ambulance_no').val();
    var listOfShiftType = $("#shiftTypeId").val();
    var PilotID = $("#Pilot_id_reg").val();
    $('#pilot_id').val(PilotID);
    var PilotName = $("#PilotName_id_reg").val();
    var EmtID = $("#emt_id_reg").val();
    $('#emt_Id').val('#EmtID').val();
    var EmtName = $("#emtName_reg").val();
    var districtManager = $("#districManager_id").val();
    var otherDistrictManager = $("#OtherdistManager_id").val();
    var place = $("#place_id").val();
    var noOfCandidate = $("#participant_id").val();
    var demoTrainingPurpose = $("#demoPurposeId").val();
    var startDate = $("#startDateId").val();//startDateId
    $('#start_date').val()
    var startDate1 = moment(startDate).format("YYYY-MM-DD");
    var endDate = $("#endDateId").val();
    var endDate1 = moment(endDate).format("YYYY-MM-DD");
    var demoRemark = $("#demo_remarksId").val();
    var previousOdoMeter = $("#previousOdoId").val();
    var EndOdoMeter = $("#endOdoId").val();//demo_remarksId
    var remarks = $("#remarks_id").val();
   // alert("startDateId=="+startDate);
    
    if(PilotID==null||PilotID==""||PilotID==''){
    	PilotID=0;
    }
    if(PilotName==null||PilotName==''||PilotName==""){
    	PilotName='0';
    }
    if(EmtID==null||EmtID==''||EmtID==""){
    	EmtID=0;
    }
    if(EmtName==null||EmtName==''||EmtName==""){
    	EmtName='0';
    }
    if(otherDistrictManager==null||otherDistrictManager==''||otherDistrictManager==""){
    	otherDistrictManager=0;
    }
    if(demoRemark==null||demoRemark==''||demoRemark==""){
    	demoRemark=' ';
    }
    if(remarks==null||remarks==''||remarks==""){
    	remarks=' ';
    }
    
    
    
////    //validation
    if (district === '0') {
        showNotificationError("Select District", "districs_id_reg", "error");
        return;
    }

    else if (BaseLocation === '0') {
        showNotificationError("Select Base Location", "basloc_id_reg", "error");
        return;
    }
    else if (ambulanceId === '0') {
        showNotificationError("Select Ambulances", "ambulance_id_reg", "error");
        return;
    }
    else if (listOfShiftType === '0') {
        showNotificationError("Select Shift Type", "shiftTypeId", "error");
        return;
    }
    else if (districtManager === '' || districtManager === null) {
        showNotificationError("Select District Manager", "districManager_id", "error");
        return;
    }
    else if (place === '' || place === null) {
        showNotificationError("Select Demo Place", "place_id", "error");
        return;
    }

    else if (noOfCandidate === '' || noOfCandidate === null) {
        showNotificationError("Select No Of Candidate", "participant_id", "error");
        return;
    }
    else if (startDate ==="" || startDate ==='' || startDate ===null) {
        showNotificationError("Select Start Date ", "startDateId", "error");
        return;
    }
    else if (endDate === "" || endDate === '' || endDate ===null) {
        showNotificationError("Select End Date ", "endDateId", "error");
        return;
    }
    else if (demoTrainingPurpose === '' || demoTrainingPurpose === null) {
        showNotificationError("Enter Demo Training Purpose", "demoPurposeId", "error");
        return;
    }
    


   /* else if (demoRemark === '' || demoRemark === null) {
        showNotificationError("Select Demo Remark", "demo_remarksId", "error");
        return;
    }
*/
    else if (previousOdoMeter === '' || previousOdoMeter === null) {
        showNotificationError("Enter Previous Odo-Meter Reading", "previousOdoId", "error");
        return;
    }
    else if (EndOdoMeter === '' || EndOdoMeter === null) {
        showNotificationError("Enter End Odo-Meter Reading", "endOdoId", "error");
        return;
    }
    
    else if (parseInt(EndOdoMeter) < parseInt(previousOdoMeter))
    {
        showNotificationError("Current Odo-Meter Reading Must Be Greater Or Equal To Previous Odo-Meter Reading", "EndOdoId", "error");
        return;

    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicle_id": ambulanceId,
        "baselocation_id": BaseLocation,
        "reg_number": ambulance_reg_number,
        "activity_id": 8,
        "demo_Place": place,
        "no_of_candidates": noOfCandidate,
        "demo_Purpose": demoTrainingPurpose,
        "demo_start_time": startDate,
        "demo_end_time": endDate,
        "demo_remarks": demoRemark,
        "remarks": remarks,
        "emso_id": EmtID,
        "pilot_id": PilotID,
        "supervior_id": 1,
        "district_manager_id": districtManager,
        "created_by_id": createdyid,
        "created_by_roleId": createdbtroleid,
        "district_id": district,
        "status_id": 1,
        "ticket_id": "22222222",
        "emp_shift_id": listOfShiftType,
        "emso_name": EmtName,
        "pilot_name": PilotName,
        "start_odo": previousOdoMeter,
        "other_district_manager": otherDistrictManager
    };
    var strUrl = Service.saveDemoRegistationDetails;

    console.log("saveRegistationDetails Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data){
        	//alert("data====>"+data.output);
        	$('#ticket_id').val(data.output);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert(" not Inserted ");

            } else {

                showNotificationError("Inserted Successfully", "save_Demo_Registation", "success");
                reset_demo_Registation();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }


        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
/*
 * For update the demo training details.
 * priyadarshini
 * 06-05-2019
 * inputs  serialId,end date,remarks,onroad time,status id,send to ho, demo report,end odometer.
 */
function updateDemoRegistationDetails() {
    var serial_id = $('#serialId').val();
    var demo_end_time = $('#up_offRoadTiming_Id').val();
    var demo_end_time1 = moment(demo_end_time).format("YYYY-MM-DD");
    var on_road_remarks = $('#onRoadRemarks_id').val();
    var on_road_time = $('#onRoadTiming_Id').val();
    var on_road_time1 = moment(on_road_time).format("YYYY-MM-DD");
    var status_id = 2;
    var sendto_ho = $('#sendToHOId').val();
    var demo_reportstatus = $('#demoReportId').val();
    var end_odo = $("#endOdoId_update").val();
    var previous = $('#previousOdoId_update').val();
    
    if(on_road_remarks==null||on_road_remarks==''){
    	on_road_remarks=='0';
    }
    
    if (demo_reportstatus ==='0'|| demo_reportstatus === null||demoReportId==="0") {
        showNotificationError("Select Demo Report Prepared", "demoReportId", "error");
        return;
    }
    else  if (sendto_ho === '0' || sendto_ho === null||sendto_ho==="0") {
        showNotificationError("Select Send To HO", "sendToHOId", "error");
        return;
    }

    else if (demo_end_time === '' || demo_end_time === null) {
        showNotificationError("Select Off Road Timing", "up_offRoadTiming_Id", "error");
        return;
    }
    
    else  if (on_road_time === '' || on_road_time === null) {
        showNotificationError("Select On Road Timing", "onRoadTiming_Id", "error");
        return;
    }
    
    else if (previous === '' || previous === null) {
        showNotificationError("Enter Previous Odo-Meter Reading", "previousOdoId_update", "error");
        return;
    }
    else if (end_odo === '' || end_odo === null) {
        showNotificationError("Enter End Odo-Meter Reading", "endOdoId_update", "error");
        return;
    }
    
    else if (parseInt(end_odo) < parseInt(previous))
    {
        showNotificationError("Current Odo-Meter Reading Must Be Greater Or Equal To Previous Odo-Meter Reading", "endOdoId_update", "error");
        return;

    }

    
    var objUpd =
            {
                seriaid: serial_id,
                demo_end_time: demo_end_time,
                on_road_remarks: on_road_remarks,
                on_road_time: on_road_time,
                created_by_id: 'now()',
                demo_reportstatus: demo_reportstatus,
                status_id: status_id,
                sendto_ho: sendto_ho,
                end_odo: end_odo

            }
    var strUrl2 = Service.updateDemoTraining;

    console.log('==== strUrl' + strUrl2);
    $.ajax({
        type: "POST",
        url: strUrl2,
        dataType: "json",
        data: JSON.stringify(objUpd),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            if (data !== null || data !== 0) {
                showNotificationError("Data Updated Successfully", "update_demo_id", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        },
        error: function () {
            console.log("Error In case_ReOpen Not updating");
        }
    });

}

/*
 * For searching  the demo training details.
 * priyadarshini
 * 06-05-2019
 * inputs  districtId,baselocation_ID,vehicle_ID,exptectedfromdate,exptectedtodate,fuelTkt_id
 */
function get_demo_trainig_Search() {

    try {
        var districtId = $('#districs_id').val();
        var baselocation_ID = $('#baselocation_id').val();
        var vehicle_ID = $('#Ambulance_Id').val();
        var ticket_id = $('#ticketId').val();
        var off_road_id = $('#offDate_Id').val();
        var from_date_id = $('#fromDate_Id').val();
        var to_date_id = $('#toDate_Id').val();
        var syy = '¥';
        var syy = '¥';
//   var isStatus = isCheckValidationOfFromDateAndToDate();
//    if (isStatus === false || isStatus === "false" || isStatus === 'false') {
//        return false
//    }
        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_ID === null | vehicle_ID === '') {
            vehicle_ID = 0;
        }
        if (ticket_id === null | ticket_id === '') {

            ticket_id = '0';
        }
        if (off_road_id === null | off_road_id === '') {

            off_road_id = syy;
        }
        if (from_date_id === null | from_date_id === '') {

            from_date_id = '0';
        }
        if (to_date_id === null | to_date_id === '') {

            to_date_id = '0';
        }
        
        
        if (districtId==0 &&baselocation_ID==0 &&vehicle_ID==0 &&ticket_id=='0'&&off_road_id==syy&&from_date_id=='0'&&to_date_id=='0'){   
          	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
          	return true;
          }
        
        var objJson = {
            district_id: districtId,
            baselocation_id: baselocation_ID,
            vehicle_id: vehicle_ID,
            off_road_time: off_road_id,
            on_road_time: from_date_id,
            enddate: to_date_id,
            ticket_id: ticket_id
        }

        var strUrl = Service.get_demo_training_Search;

        console.log("strUrl : " + strUrl);

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
                $('#demo_training_Id').empty();
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {

                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No Data Available....");
                    $('#demo_training_Id').append(divTag);
                } else {

                    var jsonArray = data.demoControllerDTOs;
                    if (jsonArray.length > 0) {

                        demo_training_Data_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));

    }
}
//validation
function demo_training_Data_DOM(strData) {


    try {
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
        $(objTHead6).html("Demo Start Time");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Demo End Time");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

       /* //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Off-Road Date");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("On-Road Date ");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);
*/
        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Status");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Update");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

// Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");


            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].districtName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baslocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].demo_start_time);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].demo_end_time);
            $(tbleRow).append(tablcol7);

   /*         var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].off_road_time);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].on_road_time);
            $(tbleRow).append(tablcol9);
*/

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].status_id);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].seriaid + '","' + strData[i].districtName + '","' + strData[i].baslocName + '","' + strData[i].reg_number + '","' + strData[i].shiftType + '","' + strData[i].pilot_id + '","' + strData[i].emso_id + '","' + strData[i].district_manager_id + '","' + strData[i].supervior_id + '","' + strData[i].demo_Place + '","' + strData[i].no_of_candidates + '","' + strData[i].demo_Purpose + '","' + strData[i].demo_start_time + '","' + strData[i].demo_end_time + '","' + strData[i].demo_remarks + '","' + strData[i].off_road_time + '","' + strData[i].start_odo + '","' + strData[i].status_id + '","' + strData[i].on_road_time + '")');
            $(tablcol9).append(buttonTag);
            $(tablcol9).css('height', '36px');
            //  $(tbleRow).append(tablcol11);
            var tblCol19 = document.createElement('td');
            $(tblCol19).addClass('text-center');
            $(tblCol19).html(strData[i].status_id);

            if (strData[i].status_id === "Closed") {
                $(tbleRow).append(tblCol19);
            } else {
                $(tbleRow).append(tablcol9);
            }

            $(objTBody).append(tbleRow);

        }
        $("#demo_training_Id").append(objDivTag);
    } catch (err) {
        console.log("demo_training_Id" + err);
    }
}
function get_RowData(seriaid, districtName, baslocName, reg_number, shiftType, pilot_id, emso_id, district_manager_id, supervior_id, demo_Place, no_of_candidates, demo_Purpose, demo_start_time, demo_end_time, demo_remarks, off_road_time, start_odo, status_id, on_road_time) {

    $('#serialId').val(seriaid);
    $('#update').modal('show');
    $('#districs_id_update').val(districtName);
    $('#basloc_id_update').val(baslocName);
    $('#ambulance_id_update').val(reg_number);
    $('#shiftType_id_update').val(shiftType);
    $('#Pilot_id_update').val(pilot_id);
    $('#emt_id_update').val(emso_id);
    $('#districManager_id_update').val(district_manager_id);
    $('#SupervisorId').val(supervior_id);
    $('#place_id_update').val(demo_Place);
    $('#participant_id_update').val(no_of_candidates);
    $('#demoPurposeId_update').val(demo_Purpose);
    $('#startDate_Id_update').val(demo_start_time);
    $('#endDate_Id_update').val(demo_end_time);
    $('#demo_remarksId_update').val(demo_remarks);
    $('#offRoadRemarks_id').val(demo_remarks);
    $('#offRoadTiming_Id').val(off_road_time);
    $('#previousOdoId_update').val(start_odo);

}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'TyreLifeData'},
            {extend: 'pdf', title: 'TyreLifeData'},
            {extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]
    });
}



function  getDemoReportPrepare() {
    try {
        var strUrl = Service.demoReportPrepared;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.demoControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var demo_report = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(demo_report).appendTo('#demoReportId');
                        $(demo_report).appendTo('#sendToHOId');



                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
}
;


function reset_demo_Registation() {
    $('#districs_id_reg').val('0').trigger("chosen:updated");
    $('#basloc_id_reg').val('0').trigger("chosen:updated");
    $('#ambulance_id_reg').val('0').trigger("chosen:updated");
    $('#shiftTypeId').val("0").trigger("chosen:updated");
    $('#Pilot_id_reg').val("");
    $('#PilotName_id_reg').val("");
    $('#emt_id_reg').val("");
    $('#emtName_reg').val("");
    $('#districManager_id').val("");
    $('#OtherdistManager_id').val("");
    $('#place_id').val("");
    $('#participant_id').val("");
    $('#demoPurposeId').val("");
    $('#startDateId').val("");
    $('#endDateId').val("");
    $('#demo_remarksId').val("");
    $('#previousOdoId').val("");
    $('#endOdoId').val("");
    $('#remarks_id').val("");
    baseLocation_reg(0);
    getAmbulance_reg(0);


}
;
function reset_update() {
    $('#startDate_Id_update').val("");
    $('#onRoadRemarks_id').val("");
    $('#endOdoId_update').val("");
    $('#offRoadRemarks_id').val("");
    $('#demo_remarksId_update').val("");
    $('#demoReportId').val("0");
    $('#sendToHOId').val("0");
    $('#up_offRoadTiming_Id').val("");
    $('#onRoadTiming_Id').val("");
    
    

}

function reset__Search() {
    $('#districs_id').val("0").trigger("chosen:updated");
    $('#baselocation_id').val("0").trigger("chosen:updated");
    $('#Ambulance_Id').val("0").trigger("chosen:updated");
    $('#ticketId').val("");
    $('#offDate_Id').val("");
    $('#fromDate_Id').val("");
    $('#toDate_Id').val("");
    baseLocation_demo(0);
    getAmbulance_demo(0);
    $('#demo_training_Id').empty();
}
//validation
$('#PilotName_id_reg').keypress(function (e) {
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
$('#emtName_reg').keypress(function (e) {
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
function showNotificationError(msg, id, msgType) {

    var boxId = '#' + id;

    var options = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 2000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: 'right',
        // default positions
        elementPosition: 'top right',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
        // default class (string or [string])
        className: msgType,
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };

    $(boxId).notify(msg, options);
}
//validation
/*$('#offDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#fromDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#toDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#startDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#endDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
$('#offRoadTiming_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});//availableDate
/*$('#onRoadTiming_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/

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

    $('#datetimepicker2').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

$(document).ready(function () {
    $('#fromDate_Id').datepicker({
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

    $('#fromDate_Id').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

$(document).ready(function () {
    $('#toDate_Id').datepicker({
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

    $('#toDate_Id').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate_Id

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  