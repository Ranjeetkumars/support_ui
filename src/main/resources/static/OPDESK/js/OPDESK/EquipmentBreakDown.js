
$(document).ready(function() {
    try {
        //getDistricts();
    	getListOfDistrict();
    	getListOfDistrict_reg();

        // oxygen_Details_Diable();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


//Added By Bhuneshwar
//District Dropdown For Search
function getListOfDistrict() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#eqi_districtID');
    });
    $('#eqi_districtID').trigger("chosen:updated");
    $("#eqi_districtID").chosen();
}
;

//District Dropdown For Registation
function getListOfDistrict_reg() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#reg_eqi_districtID');
    });
    $('#reg_eqi_districtID').trigger("chosen:updated");
    $("#reg_eqi_districtID").chosen();
}
;

//on change 
$('#eqi_districtID').on('change', function() {
    var baseLocation = $('#eqi_districtID').val();
    $('#eqi_baseLocID').empty();
    baseLocation_search(baseLocation);
});

$('#reg_eqi_districtID').on('change', function() {
    var baseLocation = $('#reg_eqi_districtID').val();
    $('#reg_eqi_basLocID').empty();
    baseLocation_reg(baseLocation);
});


//Baselocation  for Search
function baseLocation_search(listOfDistrict) {
	$('#eqi_baseLocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#eqi_baseLocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#eqi_baseLocID');
    });

    $('#eqi_baseLocID').trigger("chosen:updated");
    $("#eqi_baseLocID").chosen();
}
;

//Baselocation for Registation
function baseLocation_reg(listOfDistrict) {
	$('#reg_eqi_basLocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#reg_eqi_basLocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#reg_eqi_basLocID');
    });

    $('#reg_eqi_basLocID').trigger("chosen:updated");
    $("#reg_eqi_basLocID").chosen();
}
;

$('#eqi_baseLocID').on('change', function() {
    var baseLocation = $('#eqi_baseLocID').val();
    $('#eqi_ambulanceID').empty();
    getAmbulance(baseLocation);
});

$('#reg_eqi_basLocID').on('change', function() {
    var baseLocation = $('#reg_eqi_basLocID').val();
    $('#reg_eqi_ambulanceID').empty();
    getAmbulance_reg(baseLocation);
});

/*
 *@DESX : For loading the Ambulance  based on the baseLocation calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 13-06-2019
 * @INPUTS: BaselocationId
 */
function getAmbulance(baseLocation, ambulanceId) {
	$('#eqi_ambulanceID').empty();
        loadingAmbulanceMaster(baseLocation);
        $('#eqi_ambulanceID').empty();
        var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#eqi_ambulanceID').append(selectfirst);
        $.each(ambulances, function(i, resData) {
            var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
            $(ambulances).appendTo('#eqi_ambulanceID');
        });
    $('#eqi_ambulanceID').trigger("chosen:updated");
    $('#eqi_ambulanceID').chosen();
}
;

function getAmbulance_reg(baseLocation, ambulanceId) {
	$('#reg_eqi_ambulanceID').empty();
        loadingAmbulanceMaster(baseLocation);
        var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#reg_eqi_ambulanceID').append(selectfirst);
        $.each(ambulances, function(i, resData) {
            var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+ ">" + resData.vehicleName + "</option>";
            $(ambulances).appendTo('#reg_eqi_ambulanceID');


        });
    $('#reg_eqi_ambulanceID').trigger("chosen:updated");
    $('#reg_eqi_ambulanceID').chosen();
}
;

$('#registration').on('shown.bs.modal', function(e) {
    getShiftTypes();
    getReportToHO();
    getComplainStatus();
    getEquipmentName();
    getEquipmentCondition();
    getAccident_severity_equipment();
});
$('#update').on('shown.bs.modal', function(e) {
    getReportToHO();
    getComplainStatus();
});

/*
 *@DESC : For loading the ShiftType  calling to masterdata
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 *@INPUTS : no input
 */
function getShiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        loadingShiftTypeMaster();
        $.each(shiftType, function(i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#reg_eqi_shiftTypeID');

        });
    }
    $("#reg_eqi_shiftTypeID").chosen();
}
;

/*
 *@DESC : getReportToHO
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */

function  getReportToHO() {
    try {
        var strUrl = Service.demoReportPrepared;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.demoControllerDTOs;
                    $.each(jsonArray, function(i, resData) {
                        var reportToHo = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(reportToHo).appendTo('#reportToSupervisorID');
                        $(reportToHo).appendTo('#reportTo__HoID');
                        $(reportToHo).appendTo('#reportToManufacturer_ID');
                        $(reportToHo).appendTo('#up_reportToHoID');
                        $(reportToHo).appendTo('#up_reportToSupervisorID');
                        $(reportToHo).appendTo('#up_reportToManufacturerID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
    $("#reportToSupervisorID").chosen();
    $("#reportToHoID").chosen();
    $("#reportToManufacturerID").chosen();
    $("#up_reportToHoID").chosen();
    $("#up_reportToSupervisorID").chosen();
    $("#up_reportToManufacturerID").chosen();

}

/*
 *@DESC : getComplainStatus
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */
function  getComplainStatus() {
    try {
        var strUrl = Service.complainStatus;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.equipmentBreakDownControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var reportToHo = "<option value=" + resData.serialid + ">" + resData.complaintStatus + "</option>";
                        $(reportToHo).appendTo('#ComplainFinalStatusUpdate');
                    });
                }
            },
            error: function(err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
    $("#ComplainFinalStatusUpdate").chosen();
}
;

/*
 *@DESC : getEquipmentName
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */
function getEquipmentName() {
    try {
        var strUrl = Service.equipmentName;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.equipmentBreakDownControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var reportToHo = "<option value=" + resData.serialid + ">" + resData.equipment_name + "</option>";
                        $(reportToHo).appendTo('#reg_equipmentNameId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in equipmentName" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in equipmentName()' + err);
    }
    $("#reg_equipmentNameId").chosen();
}
;

/*
 *@DESC : getEquipmentCondition
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */

function  getAccident_severity_equipment() {
    try {
        var strUrl = Service.getAccidentSeverity;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.breakDownMaitainceControllerDTOs;
                    $.each(jsonArray, function(i, resData) {
                        var accidentSeverity = "<option value=" + resData.mit_seriaid + ">" + resData.mit_Type_Name + "</option>";
                        //$(accidentSeverity).appendTo('#severityId');
                        $(accidentSeverity).appendTo('#severityID');

                    });
                }
            },
            error: function(err) {
                console.error("Error in getAccidentSeverity" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in  getAccident_severity()' + err);
    }
    $("#severityID").chosen();
}
;
/*
 *@DESC : getEquipmentCondition
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */
function getEquipmentCondition() {
    try {
        var strUrl = Service.equipmentCondition;
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.equipmentBreakDownControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var reportToHo = "<option value=" + resData.serialid + ">" + resData.type_name + "</option>";
                        $(reportToHo).appendTo('#equipmentconditionID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in EquipmentCondition" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getEquipmentCondition()' + err);
    }
    $("#equipmentconditionID").chosen();
}
;


function addEquipment() {	
    var district = $('#reg_eqi_districtID').val();
    var baseLocation = $('#reg_eqi_basLocID').val();
    var ambulance_reg_number = $('#reg_eqi_ambulanceID').val();
    var vehicle_id=ambulance_reg_number.split(",");  
    var shiftType = $('#reg_eqi_shiftTypeID').val();
    var pilotId = $('#reg_eqi_pilotID').val();
    var pilotName = $('#reg_eqi_pilotNameID').val();
    var emtID = $('#reg_eqi_emtID').val();
    var emtName = $('#reg_eqi_emtNameId').val();
    var equipmentId=$('#reg_equipmentNameId').val();
    var supervisor = $('#reg_eqi_supervisorNameID').val();
    var districtManager = $('#reg_eqi_distManagerID').val();
    var equipmentName = $('#reg_equipmentNameId').val();
    var companyName = $('#reg_companyNameId').val();
    //var supervisor = $('#reg_eqi_supervisorNameID').val();
   // var districtManager = $('#reg_eqi_distManagerID').val();
	

    var ambulance = $('#reg_eqi_ambulanceID').val();
    var ambulance_reg_number = $("#reg_eqi_ambulanceID").val();



  //  var supervisor = $('#reg_eqi_supervisorNameID').val();
   // var districtManager = $('#reg_eqi_distManagerID').val();
    //var equipment_id = $('#reg_equipmentNameId').val();
    var equipmentCondition = $('#equipmentconditionID').val();

    var equipmentName = $('#reg_equipmentNameId').val();
    var UIDNo_Id = $('#reg_UID_No_Id').val();
    

    var typeOfProblem = $('#reg_typeOfProblemID').val();
    var biomedical = $('#reg_biomedicalEnggID').val();
    var companyName = $('#reg_companyNameId').val();
    
    if(pilotId==null||pilotId==''||pilotId==""){
    	pilotId=0;
    }
    if(emtID==null||emtID==''||emtID==""){
    	emtID=0;
    }
    if(emtName==null||emtName==''||emtName==""){
    	emtName=' ';
    }
    if(pilotName==null||pilotName==''||pilotName==""){
    	pilotName=' ';
    }
    
    
    if (district === '0') {
        showNotificationError("Select District", "reg_eqi_districtID", "error");
        return;
    }

    else if (baseLocation === '0') {
        showNotificationError("Select Base Location", "reg_eqi_basLocID", "error");
        return;
    }
    else if (ambulance_reg_number === '0') {
        showNotificationError("Select Ambulances", "reg_eqi_ambulanceID", "error");
        return;
    }
    else if (shiftType === '0') {
        showNotificationError("Select Shift Type ", "reg_eqi_shiftTypeID", "error");
        return;
    }
    else if (supervisor === '' || supervisor === null) {
        showNotificationError("Enter Supervisor Id", "reg_eqi_supervisorNameID", "error");
        return;
    }
    else if (districtManager === '' || districtManager === null) {
        showNotificationError("Enter District Manager Id", "reg_eqi_distManagerID", "error");
        return;
    } 
    else if (companyName ==='' || companyName === null) {
        showNotificationError("Enter Company Name", "reg_companyNameId", "error");
        return;
    }
    else if (UIDNo_Id ===""||UIDNo_Id===''||UIDNo_Id===null) {
    	//alert("reg_UIDNoId==="+UIDNo_Id);
    	showNotificationError("Enter UID No", "reg_UID_No_Id", "error");
        return;
    }
    /*else if (pilotId === "0") {
        showsNotificationError("select Cylinder", "reg_eqi_pilotID", "error");
        return;
    }*/ 
    else if (equipmentName === '0' || equipmentName === 0) {
        showNotificationError("Select EquipmentName", "reg_equipmentNameId", "error");
        return;
    }
    else if (typeOfProblem === '' || typeOfProblem === null) {
        showNotificationError("Enter Type Of Problem", "reg_typeOfProblemID", "error");
        return;
    }
    else if (biomedical === '' || biomedical === null) {
        showNotificationError("Enter Biomedical", "reg_biomedicalEnggID", "error");
        return;
    }
    
    else if (equipmentCondition === '0' || equipmentCondition === 0) {
        showNotificationError("Select Equipment Condition", "equipmentconditionID", "error");
        return;
    }

   /* else if (pilotName === "0" || pilotName === "") {
        showsNotificationError("Enter Amount", "reg_eqi_pilotNameID", "error");
        return;
    }*/
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var obj_Insert = {
        "vehicle_id": vehicle_id[0],
        "district_id": district,
        "baselocation_id": baseLocation,
        "reg_number": vehicle_id[1],
        "emso_id": emtID,
        "pilot_id": pilotId,
        "supervior_id": supervisor,
        "dist_managerid": districtManager,
        "created_by_id": createdyid,
        "created_by_roleid": createdbtroleid,
        "equipmentid": equipmentName,
        "emso_name": emtName,
        "pilot_name": pilotName,
        "typeofproblem": typeOfProblem,
        "equipmentconditionid": equipmentCondition,
        "other_equipment_name": 1,
        "other_equipment_company": companyName,
        "other_uid": UIDNo_Id
    };
    var strUrl = Service.addequipment;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data !== null || data !== 0) {

                getaddEquipmentData(data.output);
                $('#ticketID').val(data.output);

                showNotificationError("Equipment Added Successfully", "addEquipmentId", "success");
          
            }
        },
        error: function() {
            console.log("Error In inserting");
        }
    });
}



/*
 *@DESC : Equipment BreakDown Details Registration
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */

function registration() {
    var district = $('#reg_eqi_districtID').val();
    var baseLocation = $('#reg_eqi_basLocID').val();
    var ambulance_reg_number = $('#reg_eqi_ambulanceID').val();
    var vehicle_id=ambulance_reg_number.split(",");   
    //var vehicleId = ambulanceNo.split(",");
   // alert("resData.vehicleName==="+vehicle_id[1]);
    var shiftType = $('#reg_eqi_shiftTypeID').val();
    var pilotId = $('#reg_eqi_pilotID').val();
    var pilotName = $('#reg_eqi_pilotNameID').val();
    var emtID = $('#reg_eqi_emtID').val();
    var emtName = $('#reg_eqi_emtNameId').val();
    var equipmentId=$('#reg_equipmentNameId').val();
    var supervisor = $('#reg_eqi_supervisorNameID').val();
    var districtManager = $('#reg_eqi_distManagerID').val();
    var equipmentName = $('#reg_equipmentNameId').val();
    var companyName = $('#reg_companyNameId').val();
 //   alert("===companyName==="+companyName);
    var UIDNo = $('#reg_UIDNoId').val();
    var typeOfProblem = $('#reg_typeOfProblemID').val();
    var biomedical = $('#reg_biomedicalEnggID').val();
    var equipmentCondition = $('#equipmentconditionID').val();
    var serverity = $('#severityID').val();
    var reportToSupervisor = $('#reportToSupervisorID').val();
    var report_To_HoId = $('#reportTo__HoID').val();
    var reportToManufacture = $('#reportToManufacturer_ID').val();
    var equipmentDate = $("#equipmentAvailabeDate_Id").val();
    var equipmentDateAndTime = moment(equipmentDate).format("YYYY-MM-DD");
    var ticketID = $('#ticketID').val();
    //var equipment_avaiable_date = '12-03-2019';
    var remarks = $('#reg_eqi_remarksID').val();

    if(pilotId==null||pilotId==''||pilotId==""){
    	pilotId=0;
    }
    if(emtID==null||emtID==''||emtID==""){
    	emtID=0;
    }
    if(emtName==null||emtName==''||emtName==""){
    	emtName=' ';
    }
    if(pilotName==null||pilotName==''||pilotName==""){
    	pilotName=' ';
    }
    
    
    //validation
    if (district === '0') {
        showNotificationError("Select District", "reg_eqi_districtID", "error");
        return;
    }

    else if (baseLocation === '0') {
        showNotificationError("Select Base Location", "reg_eqi_basLocID", "error");
        return;
    }
    else if (ambulance_reg_number === '0') {
        showNotificationError("Select Ambulances", "reg_eqi_ambulanceID", "error");
        return;
    }
    else if (shiftType === '0') {
        showNotificationError("Select Shift Type ", "reg_eqi_shiftTypeID", "error");
        return;
    }
    else if (supervisor === '' || supervisor === null) {
        showNotificationError("Enter Supervisor Id", "reg_eqi_supervisorNameID", "error");
        return;
    }
    else if (districtManager === '' || districtManager === null) {
        showNotificationError("Enter District Manager Id", "reg_eqi_distManagerID", "error");
        return;
    } 
/*else if (pilotId === '' || pilotId === 0) {
        showNotificationError("Enter Pilot Id", "reg_eqi_pilotID", "error");
        return;
    }
    else if (pilotName === '' || pilotName === null) {
        showNotificationError("Enter  Pilot Name ", "reg_eqi_pilotNameID", "error");
        return;
    }
    else if (emtID === '' || emtID === null) {
        showNotificationError("Enter EMT Id", "reg_eqi_emtID", "error");
        return;
    }

    else if (emtName === '' || emtName === null) {
        showNotificationError("Enter EMT Name", "reg_eqi_emtNameId", "error");
        return;
    }*/
    else if (supervisor === '' || supervisor === null) {
        showNotificationError("Enter Supervisor", "reg_eqi_supervisorNameID", "error");
        return;
    }
    else if (districtManager === '' || districtManager === null) {
        showNotificationError("Enter District Manager", "reg_eqi_distManagerID", "error");
        return;
    } 
    else if (companyName ==='' || companyName === null) {
        showNotificationError("Enter Company Name", "reg_companyNameId", "error");
        return;
    }
    else if (equipmentName === '0' || equipmentName === 0) {
        showNotificationError("Select EquipmentName", "reg_equipmentNameId", "error");
        return;
    }
   
    else if (typeOfProblem === '' || typeOfProblem === null) {
        showNotificationError("Enter Type Of Problem", "reg_typeOfProblemID", "error");
        return;
    }
    else if (biomedical === '' || biomedical === null) {
        showNotificationError("Enter Biomedical", "reg_biomedicalEnggID", "error");
        return;
    }
    else if (equipmentCondition === '0' || equipmentCondition === 0) {
        showNotificationError("Select Equipment Condition", "equipmentconditionID", "error");
        return;
    }

    else if (serverity === '0' || serverity === 0) {
        showNotificationError("Select Serverity", "severityID", "error");
        return;
    }
    else if (reportToSupervisor === '0' || reportToSupervisor === 0) {
        showNotificationError("Select Report To Supervisor", "reportToSupervisorID", "error");
        return;
    } else if (report_To_HoId === '0' || report_To_HoId === 0) {
    
        showNotificationError("Select Report To HoId", "reportTo__HoID", "error");
        return;
    }
    else if (reportToManufacture === '0' || reportToManufacture === 0) {
        showNotificationError("Select Report To Manufacture", "reportToManufacturer_ID", "error");
        return;
    }
  
    else if (equipmentDate === "" || equipmentDate === '' || equipmentDate === '') {

        showNotificationError("Select Equipment Date Time", "equipmentAvailabeDate_Id", "error");
        return;
    }
    else if (remarks === '' || remarks === null) {
        showNotificationError("Enter Remarks", "reg_eqi_remarksID", "error");
        return;
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicle_id": vehicle_id[0],
        "district_id": district,
        "baselocation_id": baseLocation,
        "reg_number": vehicle_id[1],
        "emso_id": emtID,
        "pilot_id": pilotId,
        "supervior_id": supervisor,
        "equipment_avaiable_date": equipmentDateAndTime,
        "dist_managerid": districtManager,
        "reporting_to_supervisor": reportToSupervisor,
        "reporting_to_ho": report_To_HoId,
        "reporting_to_manufacturer": reportToManufacture,
        "remarks": remarks,
        "created_by_id": createdyid,
        "created_by_roleid": createdbtroleid,
        "breakdown_type_id": 43,
        "emp_shift_id": shiftType,
        "emso_name": emtName,
        "pilot_name": pilotName,
        "ebi_equipment_serialiD":equipmentId,
        "equipment_reg_date": equipmentDateAndTime,
        "ticket_id": ticketID,
        "complainant_name": companyName,
        "eie_complainant_mobile": "9999900909",
        "complainant_designation": "developer",
        "statusType":1

    }
    var strUrl = Service.saveEquipmentDetails;

    console.log("saveSuggestionsDetails Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
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
                showNotificationError("Inserted Successfully", "eqi_ReqistrationID", "error");
            } else {
                showNotificationError("Inserted Successfully", "eqi_ReqistrationID", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }

        }, error: function() {

            console.log('In Error of  Details ');
        }
    });
}



/*
 *@DESC : getaddEquipmentData
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */


function getaddEquipmentData(output) {
    var ticketId = output;

    try {
        var obj_Insert = {
            "ticket_id": ticketId
        };
        var strUrl = Service.getBreakDownEquipment;
        console.log("getBreakDownEquipment Url is:" + strUrl);
        console.log("GET JSON OBJECT:" + JSON.stringify(obj_Insert));
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var resultData = data.equipmentBreakDownControllerDTO;

                $.each(resultData, function(i, resData) {
                    var index = i + 1;
                    var baseLocations = "<tr><td>" + index + "</td><td>" + resData.other_equipment_name + "</td><td>" + resData.other_uid + "</td><td>" + resData.typeofproblem +/* "</td><td>" + resData.other_equipment_company +*/ "</td><td>" + resData.equipmentconditionid + "</td></tr>";
                    $('#table').append(baseLocations);
                });
            },
            error: function(err) {
                console.error("Error in getaddEquipmentData" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getaddEquipmentData()' + err);
    }

}

/*
 *@DESC : Equipment BreakDownSearch Details
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */
function equipment_Search() {
    $('#equipmentBreakDownTableID').html("");
    try {
        var districtId = $('#eqi_districtID').val();
        var baselocation_ID = $('#eqi_baseLocID').val();
        var vehicle_no = $('#eqi_ambulanceID').val();

        var availableDate = $('#eqiAvailableDateID').val();
        var fromDate = $('#fromdateID').val();
        var todate = $('#toDateID').val();
        var ticket_id = $('#eqi_ticketID').val();

        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_no === null | vehicle_no === '') {
            vehicle_no = 0;
        }
        if (availableDate === null | availableDate === '' || availableDate === 'undefine') {

            availableDate = 0;
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
            "district_id": districtId,
            "baselocation_id": baselocation_ID,
            "vehicle_id": vehicle_no,
            "offdate": availableDate,
            "ondate": fromDate,
            "enddate": todate,
            "ticket_id": ticket_id
        }
        var strUrl = Service.get_equipment_Search;
        console.log("strUrl : " + strUrl);
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

                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {

                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#equipmentBreakDownTableID').append(divTag);
                } else {

                    var jsonArray = data.equipmentBreakDownControllerDTO;
                    if (jsonArray.length > 0) {
                        //calling to dom

                        equipment_Data(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function(err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));
    }
}


function equipment_Data(strData) {
    try {
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-bordered table-striped dataTables-example");
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("S.No");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Ticket Id");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("District");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Base Location");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Ambulance No");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Severity");
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Equipment Available Date");
        $(objTr).append(objTHead7);

 /*       var objTHead8 = document.createElement("th");
        $(objTHead8).html("Report to Supervisor");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Report to Manufacturer");
        $(objTr).append(objTHead9);*/

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Status");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Update");
        $(objTr).append(objTHead11);


        var objTBody = document.createElement('tbody');
        $(ObjTableTag).append(objTBody);

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
            $(tablcol4).html(strData[i].baseLocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].equipment_name);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].equipment_avaiable_date);
            $(tbleRow).append(tablcol7);

           /* var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].ebi_reporting_to_supervisor);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].ebi_reporting_to_manufacturer);
            $(tbleRow).append(tablcol9);
*/

            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].statusType);
            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].serialid + '","' + strData[i].districtName + '","' + strData[i].baseLocName + '","' + strData[i].reg_number + '","' + strData[i].shifttype + '","' + strData[i].pilot_id + '","' + strData[i].emso_id + '","' + strData[i].equipment_avaiable_date + '","'+strData[i].supervior_id+'")');
            $(tablcol11).append(buttonTag);
            $(tablcol11).css('height', '36px');
            // $(tbleRow).append(tablcol11);

            var tblCol9 = document.createElement('td');
            $(tblCol9).addClass('text-center');
            $(tblCol9).html(strData[i].statusType);

            if (strData[i].statusType === "Closed") {
                $(tbleRow).append(tblCol9);
            } else {
                $(tbleRow).append(tablcol11);
            }

            $(objTBody).append(tbleRow);
        }
        $("#equipmentBreakDownTableID").append(ObjTableTag);
    } catch (err) {
        console.log("equipmentBreakDownTableID" + err);
    }
}
function get_RowData(serialid, districtName, baseLocName, reg_number, shifttype, pilot_id, emso_id, equipment_avaiable_date,supervior_id) {


    $('#serialId').val(serialid);
    $('#update').modal('show');
    $('#up_eqi_districtID').val(districtName);
    $('#up_eqi_basLocID').val(baseLocName);
    $('#up_eqi_ambulanceID').val(reg_number);
    $('#up_eqi_shiftTypeID').val(shifttype);
    $('#up_eqi_pilotID').val(pilot_id);
    $('#up_eqi_emtID').val(emso_id);
    $('#equipmentAvailabeDateId').val(equipment_avaiable_date);
    $('#up_eqi_supervisorNameID').val(supervior_id);
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
            {extend: 'excel', title: 'EquipmentBreakDown'},
            {extend: 'pdf', title: 'EquipmentBreakDown'},
            {extend: 'print',
                customize: function(win) {
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
 *@DESC :Update Equipment BreakDown Details
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */
function updateEquipmentDetails() {
    var equipment_avaiable_date = $('#up_equipmentAvailabeDateId').val();
    var complaintStatus = $('#ComplainFinalStatusUpdate').val();
    var complaintclosedBy = $('#complaintClosedUpdate').val();
    var complainant_mobile = $('#mobileNumberUpdate').val();
    var reporting_to_supervisor = $('#up_reportToSupervisorID').val();
    var reporting_to_ho = $('#up_reportToHoID').val();
    var reporting_to_manufacturer = $('#up_reportToManufacturerID').val();
    var updatedRemraks = $('#up_eqi_remarksID').val();
    var serial_id=$('#serialId').val();
    if (complaintStatus === '0' || complaintStatus === 0) {
        showNotificationError("Select Complaint Status", "ComplainFinalStatusUpdate", "error");
        return;
    }

    else if (complaintclosedBy === '' || complaintclosedBy === null) {
        showNotificationError("Enter Complaint Closed Update", "complaintClosedUpdate", "error");
        return;
    }
//      else if (equipment_avaiable_date ==="Invalid date" || equipment_avaiable_date ==='Invalid date'||equipment_avaiable_date ==='undefine') {
//        showNotificationError("Select resolution time", "resolutionDateId", "error");
//          return;
//    
//    }
    else if (complainant_mobile === '' || complainant_mobile === null) {
        showNotificationError("Enter  Complainant Mobile ", "mobileNumberUpdate", "error");
        return;
    }
    if (reporting_to_supervisor === '0' || reporting_to_supervisor === 0) {
        showNotificationError("Select Reporting To Supervisor", "up_reportToSupervisorID", "error");
        return;
    }
    if (reporting_to_ho === '0' || reporting_to_ho === 0) {
        showNotificationError("Select Reporting To Ho", "up_reportToHoID", "error");
        return;
    }
    if (reporting_to_manufacturer === '0' || reporting_to_manufacturer === 0) {
        showNotificationError("Select Manufacture Id For Update", "up_reportToManufacturerID", "error");
        return;
    }
    if (equipment_avaiable_date === '' || equipment_avaiable_date === ""||equipment_avaiable_date===null) {
        showNotificationError("Select Equipment Available Date", "up_equipmentAvailabeDateId", "error");
        return;
    }
    else if (updatedRemraks === '' || updatedRemraks === null) {
        showNotificationError("Enter Remarks ", "up_eqi_remarksID", "error");
        return;
    }
    var objUpd =
            {
                "equipment_avaiable_date": equipment_avaiable_date,
                "complaintStatus": complaintStatus,
                "complaintclosedBy": complaintclosedBy,
                "eie_complainant_mobile": complainant_mobile,
                "reporting_to_supervisor": reporting_to_supervisor,
                "reporting_to_ho": reporting_to_ho,
                "reporting_to_manufacturer": reporting_to_manufacturer,
                "updatedRemraks": updatedRemraks,
                "complaintUpdatedBy": 1,
                "serialid": serial_id

            }
    var strUrl2 = Service.updateEquipment;

    console.log('==== strUrl' + strUrl2);
    $.ajax({
        type: "POST",
        url: strUrl2,
        dataType: "json",
        data: JSON.stringify(objUpd),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data !== null || data !== 0) {
////                getswal();

                showNotificationError("Data Updated Successfully", "update_EquipmentID", "success");
            }
        },
        error: function() {
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
$('#fromDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#toDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#equipmentDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#equipmentDateIdForUpdate').datepicker({
    format: "dd/mm/yyyy",
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

    }).on('strtDate', function (ev) {
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
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('strtDate', function (ev) {
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

    }).on('strtDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#endDate').keyup(function () {
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

function resetInsert(){
 $('#reg_eqi_districtID').val("0").trigger("chosen:updated");
$('#reg_eqi_basLocID').val("0").trigger("chosen:updated");
    $('#reg_eqi_ambulanceID').val("0").trigger("chosen:updated");
   $('#reg_eqi_shiftTypeID').val("0").trigger("chosen:updated");
    $('#reg_eqi_pilotID').val("");
    $('#reg_eqi_pilotNameID').val("");
   $('#reg_eqi_emtID').val("");
    $('#reg_eqi_emtNameId').val("");
    $('#reg_equipmentNameId').val("");
    $('#reg_eqi_supervisorNameID').val("");
    $('#reg_eqi_distManagerID').val("");
    $('#reg_equipmentNameId').val("");
    $('#reg_companyNameId').val("0").trigger("chosen:updated");
    $('#reg_UIDNoId').val('');
    $('#reg_typeOfProblemID').val("");
    $('#reg_biomedicalEnggID').val("")
    $('#equipmentconditionID').val("0").trigger("chosen:updated");
    $('#severityID').val("0").trigger("chosen:updated");
    $('#reportToSupervisorID').val("");
    $('#reportTo__HoID').val("0").trigger("chosen:updated");
   $('#reportToManufacturer_ID').val("0").trigger("chosen:updated");
    $("#equipmentAvailabeDate_Id").val("");
    $('#ticketID').val('');
   $('#reg_eqi_remarksID').val("");
   $('#reg_equipmentNameId').val('');
   $('#reportToSupervisorID').val('0').trigger("chosen:updated");
   $('#reportTo__HoID').val('0');
   $('#reportToManufacturer_ID').val('0');
   $('#equipmentAvailabeDate_Id').val('');
   $('#reg_eqi_remarksID').val('');//
   $('#reg_UID_No_Id').val('');
   baseLocation_reg(0);
   getAmbulance_reg(0);

}

function reset_Update(){
    $('#up_equipmentAvailabeDateId').val('');
    $('#ComplainFinalStatusUpdate').val('');
    $('#complaintClosedUpdate').val('');
    $('#mobileNumberUpdate').val('');
    $('#up_reportToSupervisorID').val('0').trigger("chosen:updated");
    $('#up_reportToHoID').val('0').trigger("chosen:updated");
    $('#up_reportToManufacturerID').val('0').trigger("chosen:updated");
    $('#up_eqi_remarksID').val('');
}

function resetSearch(){
	//getBaseLocationBasedId(0, 0);
	$('#eqi_districtID').val('0').trigger("chosen:updated");
      $('#eqi_baseLocID').val('0').trigger("chosen:updated");
    $('#eqi_ambulanceID').val('0').trigger("chosen:updated");
      $('#eqiAvailableDateID').val('');
      $('#fromdateID').val('');
     $('#toDateID').val('');
      $('#eqi_ticketID').val('');
      getAmbulance(0)
      baseLocation_search(0)
      $('#equipmentBreakDownTableID').empty();
      
}