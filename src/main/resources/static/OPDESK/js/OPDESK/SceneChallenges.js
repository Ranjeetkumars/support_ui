/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#registration').on('shown.bs.modal', function (e) {
    getDistrict_reg();
    get_shiftTypes_scene();
    getPoliceOnFire();
    ActionTaken();
    incidentType();
});
$('#update').on('shown.bs.modal', function (e) {
    getPoliceOnFireForUpdate();
    actionTaken_update();
});
$(document).ready(function () {
    try {
        getListOfDistrict_scene();
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
function getListOfDistrict_scene() {
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
    baseLocation_scene(listOfDistrict);
});
/*
 * For loading the baseloc based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
 */
function baseLocation_scene(listOfDistrict) {
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
    getAmbulance_scene(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_scene(baseLocation) {
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
function getDistrict_reg() {
    getListOfDistrict_scene();

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
 * district id is the input
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
 * For loading the Ambulance for reg  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_reg(baseLocation) {
    // here calling masterdata ajax call
	$("#ambulance_id_reg").empty();
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
/*
 * For loading the ShiftType  calling to masterdata
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_shiftTypes_scene() {
    if (shiftType.length < 1 || shiftType === []) {
        // here calling masterdata ajax call
        loadingShiftTypeMaster();
        $.each(shiftType, function (i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#shiftTypeId');

        });
    }
    $("#shiftTypeId").chosen();
}
;
/*
 * For loading the PoliceOnFire drop down  
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getPoliceOnFire() {

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

                        $(demo_report).appendTo('#policeOnScene_id');
                        $(demo_report).appendTo('#byStander_id');
                        $(demo_report).appendTo('#fireOnScene_id');
                        $(demo_report).appendTo('#relatives_id');
                    });
                }
                $("#policeOnScene_id").chosen();
                $("#byStander_id").chosen();
                $("#relatives_id").chosen();
                $("#fireOnScene_id").chosen();
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
/*
 * For loading the PoliceOnFire drop down   for update
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getPoliceOnFireForUpdate() {

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


                        $(demo_report).appendTo('#policeOnScene_id_update');
                        $(demo_report).appendTo('#fireOnScene_id_update');
                        $(demo_report).appendTo('#byStander_id_update');
                        $(demo_report).appendTo('#relatives_id_update');


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
/*
 * For loading the incidentType drop down   
 * priyadarshini
 * 06-05-2019
 *no input
 */
function incidentType() {

    try {
        var strUrl = Service.incidentType;


        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;

                if (null !== responsecode) {

                } else {

                    var jsonArray = data.sceneChallengeControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var incident_type = "<option value=" + resData.serial_id + ">" + resData.accidental_type + "</option>";
                        $(incident_type).appendTo('#incidentType_id');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in incidentType()' + err);
    }
    $("#incidentType_id").chosen();
}
;
/*
 * For loading the ActionTaken drop down   
 * priyadarshini
 * 06-05-2019
 *no input
 */
function ActionTaken() {

    try {
        var strUrl = Service.actionTaken;


        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (null !== responsecode) {

                } else {

                    var jsonArray = data.sceneChallengeControllerDTOs;
                    $.each(jsonArray, function (i, resData) {

                        var incident_type = "<option value=" + resData.serial_id + ">" + resData.action_name + "</option>";

                        $(incident_type).appendTo('#actionTaken_id');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in incidentType()' + err);
    }
    $("#actionTaken_id").chosen();
}
/*
 * For loading the ActionTaken drop down  for update 
 * priyadarshini
 * 06-05-2019
 *no input
 */
function actionTaken_update() {

    try {
        var strUrl = Service.actionTaken;


        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {

                var responsecode = data.responseCode;

                if (null !== responsecode) {

                } else {

                    var jsonArray = data.sceneChallengeControllerDTOs;
                    $.each(jsonArray, function (i, resData) {

                        var incident_type = "<option value=" + resData.serial_id + ">" + resData.action_name + "</option>";
                        $(incident_type).appendTo('#actionTaken_id_update');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in incidentType()' + err);
    }
    $("#actionTaken_id_update").chosen();
}
;
;
/*
 * For inserting  the DemoTraining details.
 * priyadarshini
 * 16-05-2019
 * the input are
 */
function saveSceneChallengesDetails() {
    var district = $("#districs_id_reg").val();
    var BaseLocation = $("#basloc_id_reg").val();
    var ambulanceId = $("#ambulance_id_reg").val();
    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    var listOfShiftType = $("#shiftTypeId").val();
    var PilotID = $("#pilot_id").val();
    var PilotName = $("#pilotName_id").val();
    var EmtID = $("#emt_id").val();
    var EmtName = $("#emtName_id").val();
    var supervisorName = $("#supervisor_id").val();

    var districtManager = $("#distmanager_id").val();

    var otherDistrictManager = $("#otherdistmanager_id").val();
    var place = $("#place_id").val();
    var IncidentType = $("#incidentType_id").val();
    var otherIncidentType = $("#otherincidentType_id").val();
    var noOfPatient = $("#noofpatients_id").val();
    var policeOnScene = $("#policeOnScene_id").val();
    var fireOnScene = $("#fireOnScene_id").val();
    var byStander = $("#byStander_id").val();
    var relative = $("#relatives_id").val();
    var actionTaken = $("#actionTaken_id").val();
    var reg_date = $("#reportOnDistManagerDate_Id").val();
    var reg_date1 = moment(reg_date).format("YYYY-MM-DD");
    
    var remarks = $("#remarks_id").val();
    if(remarks==null||remarks==""||remarks==''){
    	remarks=" ";
    }
    
    if(otherIncidentType==null||otherIncidentType==""||otherIncidentType==''){
    	otherIncidentType=" ";
    }
    
    if(otherDistrictManager==null||otherDistrictManager==""||otherDistrictManager==''){
    	otherDistrictManager="0";
    }
    if(PilotID==null||PilotID==""||PilotID==''){
    	PilotID=0;
    }
    if(EmtID==null||EmtID==""||EmtID==''){
    	EmtID=0;
    }
    if(EmtName==null||EmtName==""||EmtName==''){
    	EmtName=" ";
    }
    if(PilotName==null||PilotName==""||PilotName==''){
    	PilotName=" ";
    }

    //validation
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
    /*else if (PilotID === '' || PilotID === null) {
        showNotificationError("Select PilotID", "pilot_id", "error");
        return;
    }
    else if (PilotName === '' || PilotName === null) {
        showNotificationError("Select Pilot Name", "pilotName_id", "error");
        return;
    }

    else if (EmtID === '' || EmtID === null) {
        showNotificationError("Select EmtID", "emt_id", "error");
        return;
    }

    else if (EmtName === '' || EmtName === null) {
        showNotificationError("Select Emt Name", "emtName_id", "error");
        return;
    }*/
    else if (supervisorName === '' || supervisorName === null) {
        showNotificationError("Select Supervisor Name", "supervisor_id", "error");
        return;
    }
    else if (districtManager === '' || districtManager === null) {
        showNotificationError("Select District Manager", "distmanager_id", "error");
        return;
    }
    else if (place === '' || place === null) {
        showNotificationError("Select Place", "place_id", "error");
        return;

    }

    else if (IncidentType === '0' || IncidentType === 0) {
        showNotificationError("Select Incident Type", "incidentType_id", "error");
        return;

    }
    else if (noOfPatient === '' || noOfPatient === null) {
        showNotificationError("Select No Of Patient", "noofpatients_id", "error");
        return;

    }

    else if (policeOnScene === '0' || policeOnScene === 0) {
        showNotificationError("Select Police On Scene", "policeOnScene_id", "error");
        return;

    }
    else if (fireOnScene === '0' || fireOnScene === 0) {
        showNotificationError("Select fire On Scene", "fireOnScene_id", "error");
        return;

    }
    else if (byStander === '0' || byStander === 0) {
        showNotificationError("Select byStander ", "byStander_id", "error");
        return;

    }
    else if (relative === '0' || relative === 0) {
        showNotificationError("Select Relative", "relatives_id", "error");
        return;

    }
    else if (actionTaken === '0' || actionTaken === 0) {
        showNotificationError("Select Action Taken", "actionTaken_id", "error");
        return;

    }


    else if (reg_date === "" || reg_date === '' || reg_date === null) {
        showNotificationError("Select End Date ", "reportOnDistManagerDate_Id", "error");

        return;
    }


   /* else if (remarks === '' || remarks === null) {
        showNotificationError("Select Remark", "remarks_id", "error");
        return;
    }
*/
    
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicle_id": ambulanceId,
        "district_id": district,
        "baselocation_id": BaseLocation,
        "reg_number": ambulance_reg_number,
        "activity_id": 1,
        "emso_id": EmtID,
        "pilot_id": PilotID,
        "supervior_id": supervisorName,
        "distmanager_id": districtManager,
        "incident_typeid": IncidentType,
        "incidentplace": place,
        "noofvictims": noOfPatient,
        "bystander": byStander,
        "relatives": relative,
        "remarks": remarks,
        "police_on_scene": policeOnScene,
        "fire_on_scene": fireOnScene,
        "actionid": 1,
        "repot_time": reg_date1,
        "created_by_id": createdyid,
        "created_by_roleid": createdbtroleid,
        "emp_shift_id": listOfShiftType,
        "status_id": 1,
        "emso_name": EmtName,
        "pilot_name": PilotName,
        "otherincident_type": otherIncidentType,
        "otherdistmanager_id": otherDistrictManager

    }
    var strUrl = Service.saveSceneChallengesRegistationDetails;

    console.log("saveSceneChallengesRegistationDetails Url is:" + strUrl);
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
            if (200 !== responsecode) {
                alert(" not Inserted ");

            } else {

                showNotificationError("Inserted Successfully", "save_scene_Registation_id", "success");
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
 * For searching  the demo training details.
 * priyadarshini
 * 06-05-2019
 * inputs  districtId,baselocation_ID,vehicle_ID,exptectedfromdate,exptectedtodate,fuelTkt_id
 */
function scene_challenges_Search() {

    try {
        var districtId = $('#districs_id').val();
        var baselocation_ID = $('#baselocation_id').val();
        var vehicle_ID = $('#Ambulance_Id').val();

        var reportDate = $('#reportDate_id').val();
        var fromDate = $('#fromDate_Id').val();
        var todate = $('#todate_id').val();
        var ticket_id = $('#ticketId').val();

        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_ID === null | vehicle_ID === '') {
            vehicle_ID = 0;
        }
        if (reportDate === null | reportDate === '') {

            reportDate = 0;
        }
        if (fromDate === null | fromDate === '') {

            fromDate = 0;
        }
        if (todate === null | todate === '') {

            todate = 0;
        }
        if (ticket_id === null | ticket_id === '') {

            ticket_id = 0;
        }
        var objJson = {
            district_id: districtId,
            baselocation_id: baselocation_ID,
            vehicle_id: vehicle_ID,
            offdate: reportDate,
            ondate: fromDate,
            enddate: todate,
            ticket_id: ticket_id
        }
        var strUrl = Service.get_scene_challenges_Search;

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
                $('#scene_challenges_id').empty();
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {

                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#scene_challenges_id').append(divTag);
                } else {

                    var jsonArray = data.sceneChallengeControllerDTOs;
                    if (jsonArray.length > 0) {

                        scene_challenges_Data(jsonArray);
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
function scene_challenges_Data(strData) {
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
        $(objTHead1).html("S.NO");
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
        $(objTHead6).html("Incident Type");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Incident Place");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Patient Count");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Action Taken");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);
        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Reported Date");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        //For table Heading5
        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Status");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        //For table Heading5
        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Update");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);


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
            $(tablcol3).html(strData[i].distName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baseLocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].accidental_type);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].incidentplace);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].noofvictims);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].action_name);
            $(tbleRow).append(tablcol9);


            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].repot_time);
            $(tbleRow).append(tablcol10);
            var tablcol11 = document.createElement("td");
            $(tablcol11).html(strData[i].status_id);
            $(tbleRow).append(tablcol11);

            var tablcol11 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].serial_id + '","' + strData[i].distName + '","' + strData[i].baseLocName + '","' + strData[i].reg_number + '","' + strData[i].shiftType + '","' + strData[i].pilot_id + '","' + strData[i].emso_name + '","' + strData[i].pilot_name + '","' + strData[i].emso_id + '","' + strData[i].supervior_id + '","' + strData[i].distmanager_id + '","' + strData[i].incidentplace + '","' + strData[i].accidental_type + '","' + strData[i].noofvictims + '","' + strData[i].police_on_scene + '","' + strData[i].fire_on_scene + '","' + strData[i].bystander + '","' + strData[i].relativeIdforupdate + '")');
            $(tablcol11).append(buttonTag);
            $(tablcol11).css('height', '36px');

            var tblCol19 = document.createElement('td');
            $(tblCol19).addClass('text-center');
            $(tblCol19).html(strData[i].status_id);
            if (strData[i].status_id === "Closed") {
                $(tbleRow).append(tblCol19);
            } else {
                $(tbleRow).append(tablcol11);
            }
            $(objTBody).append(tbleRow);
        }
        $("#scene_challenges_id").append(objDivTag);
    } catch (err) {
        console.log("scene_challenges_id" + err);
    }
}
function get_RowData(serial_id, distName, baseLocName, reg_number, shiftType, pilot_id, emso_name, pilot_name, emso_id, supervior_id, distmanager_id, incidentplace, accidental_type, noofvictims, police_on_scene, fire_on_scene, bystander, relativeIdforupdate) {
    $('#update').modal('show');
    $('#serialId').val(serial_id);
    $('#update').modal('show');
    $('#districs_id_update').val(distName);
    $('#basloc_id_update').val(baseLocName);
    $('#ambulance_id_update').val(reg_number);
    $('#shiftTypeId_update').val(shiftType);
    $('#pilot_id_update').val(pilot_id);
    $('#pilotName_id_update').val(pilot_name);
    $('#emt_id_update').val(emso_id);
    $('#emtName_id_update').val(emso_name);
    $('#supervisor_id_update').val(supervior_id);
    $('#distmanager_id_update').val(distmanager_id);
    $('#place_id_update').val(incidentplace);
    $('#incidentType_id_update').val(accidental_type);
    $('#noofpatients_id_update').val(noofvictims);



}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
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

/*
 * For update the scene challenges details.
 * priyadarshini
 * 06-05-2019
 * inputs  serialId,end date,remarks,onroad time,status id,send to ho, demo report,end odometer.
 */
function updateSceneChallenges() {
    var serial_id = $('#serialId').val();
    var bystander = $('#byStander_id_update').val();
    var relatives = $('#relatives_id_update').val();
    var remarks = $('#remarks_id_update').val();
    var police_on_scene = $('#policeOnScene_id_update').val();
    var fire_on_scene = $('#fireOnScene_id_update').val();
    var action_name = $('#actionTaken_id_update').val();
    var offdate = $('#reportOnDistManagerDate_Id_update').val();
    var offdate1 = moment(offdate).format("YYYY-MM-DD");
    var status_id = 2;
    if(remarks==null||remarks==""){
    	remarks=' ';
    }
    
    var objUpd =
            {
                serial_id: serial_id,
                bystander: bystander,
                relatives: relatives,
                remarks: remarks,
                police_on_scene: police_on_scene,
                fire_on_scene: fire_on_scene,
                action_name: action_name,
                offdate: offdate,
                status_id: status_id


            };
    
    if (police_on_scene === '0' || police_on_scene === null) {
        showNotificationError("Select Police On Scene", "policeOnScene_id_update", "error");
        return;
    }
    else if (fire_on_scene === '0' || fire_on_scene === null) {
        showNotificationError("Select Fire On Scene", "fireOnScene_id_update", "error");
        return;
    }

    else if (bystander === '0' || bystander === null) {
        showNotificationError("Select ByStander", "byStander_id_update", "error");
        return;
    }
    else if (relatives === '0' || relatives === null) {
        showNotificationError("Select Relatives", "relatives_id_update", "error");
        return;
    }
    
    else if (action_name === '0' || action_name === null) {
        showNotificationError("Select Action Taken", "actionTaken_id_update", "error");
        return;
    }
    else if (offdate === '' || offdate === null) {
        showNotificationError("Select Report On Dist.Manager", "reportOnDistManagerDate_Id_update", "error");
        return;
    }
    var strUrl2 = Service.updateScene;

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
                showNotificationError("Data Updated Successfully", "scene_challenges_update_id", "success");
                window.setTimeout(function() {
                    location.reload();
                }, 3000);
            }
        },
        error: function () {
            console.log("Error In case_ReOpen Not updating");
        }
    });

}
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
//validate
$('#pilotName_id').keypress(function (e) {
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

$('#emtName_id').keypress(function (e) {
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

function reset_scene_Registation() {
    $('#districs_id_reg').val("0").trigger("chosen:updated");
    $('#basloc_id_reg').val("0").trigger("chosen:updated");
    $('#ambulance_id_reg').val("0").trigger("chosen:updated");
    $('#shiftTypeId').val("0").trigger("chosen:updated");
    $('#pilot_id').val("");
    $('#emt_id').val("");
    $('#pilotName_id').val("");
    $('#emtName_id').val("");
    $('#emtName_id').val("");
    $('#supervisor_id').val("");
    $('#distmanager_id').val("");
    $('#otherdistmanager_id').val("");
    $('#place_id').val("");
    $('#incidentType_id').val("0").trigger("chosen:updated");
    $('#otherincidentType_id').val("");
    $('#noofpatients_id').val("");
    $('#policeOnScene_id').val("0").trigger("chosen:updated");
    $('#fireOnScene_id').val("0").trigger("chosen:updated");
    $('#byStander_id').val("0").trigger("chosen:updated");
    $('#relatives_id').val("0").trigger("chosen:updated");
    $('#actionTaken_id').val("0").trigger("chosen:updated");
    $('#reportOnDistManagerDate_Id').val("");
    $('#remarks_id').val("");
    getAmbulance_reg(0);
    baseLocation_reg(0);

}

function reset__Search_scene() {
    $('#districs_id').val("0").trigger("chosen:updated");
    $('#baselocation_id').val("0").trigger("chosen:updated");
    $('#Ambulance_Id').val("0").trigger("chosen:updated");
    $('#reportDate_id').val("");
    $('#fromDate_Id').val("");
    $('#todate_id').val("");
    $('#ticketId').val("");
    baseLocation_scene(0);
    getAmbulance_scene(0);
    $('#scene_challenges_id').empty();


}
function reset_scene_update() {
    $('#fireOnSceneIdforupdate').val("0").trigger("chosen:updated");
    $('#policeOnSceneIdforupdate').val("0").trigger("chosen:updated");
    $('#byStanderIdforupdate').val("0").trigger("chosen:updated");
    $('#relativeIdforupdate').val("0").trigger("chosen:updated");
    $('#actionTakenIdforupdate').val("0").trigger("chosen:updated");
    $('#remarksIdforupdate').val("");
    $('#reportTimeForUpdate').val("");
}
$('#reportDate_id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#fromDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#todate_id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});


function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  
/*$('#reportOnDistManagerDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#reportOnDistManagerDate_Id_update').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
*///endDate

$(document).ready(function () {
    $('#availableDate').datepicker({
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

    $('#availableDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

$(document).ready(function () {
    $('#strtDate').datepicker({
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

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

$(document).ready(function () {
    $('#endDate').datepicker({
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

    $('#endDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//