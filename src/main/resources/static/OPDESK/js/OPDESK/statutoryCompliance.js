/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {
    try {
        getDistricts();

        // oxygen_Details_Diable();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/*
 *@DESX : For loading the Districts based on the StateID calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 12-06-2019
 */
function getDistricts() {
    $("#statutory_districtID").empty();
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#statutory_districtID').append(selectfirst);
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#statutory_districtID');
        $(districts).appendTo('#reg_statutory_districtID');
    });

    $('#statutory_districtID').trigger("chosen:updated");
    $('#reg_statutory_districtID').trigger("chosen:updated");
    $('#statutory_districtID').chosen();
    $('#reg_statutory_districtID').chosen();
}
;

//Modified By Bhuneshwar


//District Dropdown For Search 
function getListOfDistrict() {
  loadingDistrictsMaster();
  $.each(district, function(i, resData) {
      var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
      $(districts).appendTo('#statutory_districtID');
  });
  $('#statutory_districtID').trigger("chosen:updated");
  $("#statutory_districtID").chosen();
}
;

//District Dropdown For Reg 
function getListOfDistrict_reg() {
  loadingDistrictsMaster();
  $.each(district, function(i, resData) {
      var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
      $(districts).appendTo('#reg_statutory_districtID');
  });
  $('#reg_statutory_districtID').trigger("chosen:updated");
  $("#reg_statutory_districtID").chosen();
}
;
//on Change 
$('#statutory_districtID').on('change', function() {
  var baseLocation = $('#statutory_districtID').val();
  $('#statutory_baseLocID').empty();
  baseLocation_search(baseLocation);
});

$('#reg_statutory_districtID').on('change', function() {
  var baseLocation = $('#reg_statutory_districtID').val();
  $('#reg_statory_baseLocID').empty();
  baseLocation_reg(baseLocation);
});



//Baselocation Dropdown For Search
function baseLocation_search(listOfDistrict) {
	$('#statutory_baseLocID').empty();
  // here calling masterdata ajax call
  loadingBaseLocationMaster(listOfDistrict);
  var selectfirst = "<option value='0'>Select Base Location</option>";
  $('#statutory_baseLocID').append(selectfirst);
  $.each(baselocations, function(i, resData) {
      var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
      $(baselocation).appendTo('#statutory_baseLocID');
  });

  $('#statutory_baseLocID').trigger("chosen:updated");
  $("#statutory_baseLocID").chosen();
}
;

//Baselocation Dropdown For Registation
function baseLocation_reg(listOfDistrict) {
	$('#reg_statory_baseLocID').empty();
  // here calling masterdata ajax call
  loadingBaseLocationMaster(listOfDistrict);
  var selectfirst = "<option value='0'>Select Base Location</option>";
  $('#reg_statory_baseLocID').append(selectfirst);
  $.each(baselocations, function(i, resData) {
      var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
      $(baselocation).appendTo('#reg_statory_baseLocID');
  });

  $('#reg_statory_baseLocID').trigger("chosen:updated");
  $("#reg_statory_baseLocID").chosen();
}
;



$('#statutory_baseLocID').on('change', function() {
    var baseLocation = $('#statutory_baseLocID').val();
    $('#statutory_ambulanceID').empty();
    getAmbulance(baseLocation);
});

$('#reg_statory_baseLocID').on('change', function() {
    var baseLocation = $('#reg_statory_baseLocID').val();
    $('#reg_statutory_ambulanceID').empty();
    getAmbulance_reg(baseLocation);
});

//odometer loading
$('#reg_statutory_ambulanceID').on('change', function() {
    var vehicleid = $('#reg_statutory_ambulanceID').val();
  //  getOdoMeter(vehicleid);
});

/*
 *@DESX : For loading the Ambulance  based on the baseLocation calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 11-06-2019
 * @INPUTS: BaselocationId
 */

//Ambulance Dropdown For Search
function getAmbulance(baseLocation) {
    $('#statutory_ambulanceID').empty();
        // here calling masterdata ajax call
        loadingAmbulanceMaster(baseLocation);
        var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#statutory_ambulanceID').append(selectfirst);
        $.each(ambulances, function(i, resData) {
            var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
            $(ambulances).appendTo('#statutory_ambulanceID');
        });

    $('#statutory_ambulanceID').trigger("chosen:updated");
    $('#statutory_ambulanceID').chosen();
}
;

////Ambulance Dropdown For Registation
function getAmbulance_reg(baseLocation) {
    $('#reg_statutory_ambulanceID').empty();
        // here calling masterdata ajax call
        loadingAmbulanceMaster(baseLocation);
        var selectfirst = "<option value='0'>Select Ambulance</option>";
        $('#reg_statutory_ambulanceID').append(selectfirst);
        $.each(ambulances, function(i, resData) {
            var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+">" + resData.vehicleName + "</option>";
            $(ambulances).appendTo('#reg_statutory_ambulanceID');


        });

    $('#reg_statutory_ambulanceID').trigger("chosen:updated");
    $('#reg_statutory_ambulanceID').chosen();
}
;

$('#registration').on('shown.bs.modal', function(e) {
	getListOfDistrict_reg();
    getShiftTypes();
    getsc_compliance();
    getcomplianceType();
});

/*
 *@DESC : For loading the ShiftType  calling to masterdata
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 *@INPUTS : no input
 */
function getShiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        loadingShiftTypeMaster();
        $.each(shiftType, function(i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#reg_statutory_shiftID');

        });
    }
    $("#reg_statutory_shiftID").chosen();
}
;

/*
 *@DESC : For loading complianceDropDown
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 *@INPUTS : no input
 */

function getsc_compliance() {
    try {
//        get_shiftTypes: 'http://' + SYSTEM_IP + '/FuelController/getShiftTypesBasedOnAmbulance',
        $('#complianceID').empty();
        var strUrl = Service.getcomliance;
        console.log("getsc_compliance Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.statutoryComplianceControllerDTO;
                    var selectfirst = "<option value='0'>Select Compliance</option>";
                    $('#complianceID').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {

                        var shiftTypeData = "<option value=" + resData.serialid + ">" + resData.type_name + "</option>";
                        $(shiftTypeData).appendTo('#complianceID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in getsc_compliance" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getsc_compliance()' + err);
    }
    $("#complianceID").chosen();
}

/*
 *@DESC : For loading complianceType
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 *@INPUTS : no input
 */
function getcomplianceType() {
    try {
//        get_shiftTypes: 'http://' + SYSTEM_IP + '/FuelController/getShiftTypesBasedOnAmbulance',
        $('#reg_complianceTypeID').empty();
        var strUrl = Service.getcomplianceType;
        console.log("getcomplianceType Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.statutoryComplianceControllerDTO;
                    var selectfirst = "<option value='0'>Select  ComplianceType</option>";
                    $('#reg_complianceTypeID').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {

                        var shiftTypeData = "<option value=" + resData.serialid + ">" + resData.statutory_type + "</option>";
                        $(shiftTypeData).appendTo('#reg_complianceTypeID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in getcomplianceType" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getsc_compliance()' + err);
    }
    $("#reg_complianceTypeID").chosen();
}



$('#reg_complianceTypeID').on('change', function() {

    var listOfEquipments = $('#reg_complianceTypeID').val();
    if (listOfEquipments === 6 || listOfEquipments === '6' || listOfEquipments === "6") {
        $("#ename").show();
        getEquipmentList();


    } else {
        $('#sc_reg_eqipmentID').empty();
        $("#ename").hide();
    }

});
/*
 *@DESC : getEquipmentList
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */


function getEquipmentList() {

    try {
        $('#sc_reg_eqipmentID').empty();
        var strUrl = Service.getequipmentNames;
        console.log("getEquipmentList Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.statutoryComplianceControllerDTO;
                    var selectfirst = "<option value='0'>Select EquipementName</option>";
                    $('#sc_reg_eqipmentID').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {

                        var shiftTypeData = "<option value=" + resData.serialid + ">" + resData.equipement_name + "</option>";
                        $(shiftTypeData).appendTo('#sc_reg_eqipmentID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in getEquipmentList" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getEquipmentList()' + err);
    }
}
;

/*
 *@DESC : Statutory Compliance Registration
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */
function savecomplianceDetails() {
    var vehicle_id = $('#reg_statutory_ambulanceID').val();
    var vehicleId=vehicle_id.split(",");
    var statutory_complaince_id = $('#reg_complianceTypeID').val();
    var complaincestatus_id = $('#complianceID').val();
    var remarks = $('#reg_remarksId').val();
    $('#remarkid').val(remarks);
    var equipement_id = $("#sc_reg_eqipmentID").val();
    var districtid = $('#reg_statutory_districtID').val();
    $('#dist_id').val(districtid);
    alert("districtid===>"+districtid);
    var baselocation_id = $('#reg_statory_baseLocID').val();
    $('#baselocationid').val(baselocation_id);
    $('#ambulance_no').val(vehicleId[1]);
    var date_of_renovation = $('#renovationDateID').val();
    $('#date_of_renovation').val(date_of_renovation);
    var reportDataTime1 = moment(date_of_renovation).format("YYYY-MM-DD");
   // var sct_created_by_id = Constants.CREATED_ID;
   //  var created_by_roleid =Constants.CREATE_BY_ROLE_ID;
    var reg_number = $("#reg_statutory_ambulanceID").val();
    var statutory_complaince_number = 222;
    var supervior_id = $('#supervisorNameID').val();
    var emso_id = $('#reg_statutory_emtID').val();
    $('#emsoid').val(emso_id);
    var pilot_id = $('#reg_statutory_pilotID').val();
    $('#pilotid').val(pilot_id);
    var status_id = 1;
    var emp_shift_id = $('#reg_statutory_shiftID').val();
    var emso_name = $('#reg_statutory_emtName').val();
    var pilot_name = $('#reg_statutory_pilotname').val();
    var other_supervisor_name = $('#othersupervisorId').val();
    if (equipement_id === null | equipement_id === '') {
        equipement_id = 0;
    }
    if (pilot_id === null | pilot_id === '') {
        pilot_id = 0;
    }
    if (emso_id === null | emso_id === '') {
        emso_id = 0;
    }
    if (emso_name === null | emso_name === '') {
    	emso_name = '0';
    }
    if (pilot_name === null | pilot_name === '') {
    	pilot_name = '0';
    }
    if (other_supervisor_name === null | other_supervisor_name === '') {
    	other_supervisor_name = 0;
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var obj_Insert = {
        districtid: districtid,
        baselocation_id: baselocation_id,
        reg_number: vehicleId[1],
        vehicle_id: vehicleId[0],
        pilot_id: pilot_id,
        pilot_name: pilot_name,
        emso_id: emso_id,
        emso_name: emso_name,
        emp_shift_id: emp_shift_id,
        supervior_id: supervior_id,
        other_supervisor_name: other_supervisor_name,
        statutory_complaince_id: statutory_complaince_id,
        complaincestatus_id: complaincestatus_id,
        equipement_id: equipement_id,
        date_of_renovation: date_of_renovation,
        remarks: remarks,
        sct_created_by_id: createdyid,
        created_by_roleid: createdbtroleid,
        status_id: status_id,
        statutory_complaince_number: statutory_complaince_number
    };
    if (districtid === "0"||districtid=='0') {
    	
        showsNotificationError("Select District", "reg_statutory_districtID", "error");
        return;
    }
    else if (baselocation_id === "0") {
        showsNotificationError("Select Base Location", "reg_statory_baseLocID", "error");
        return;
    }
    else if (reg_number === "0") {
        showsNotificationError("Select Ambulance", "reg_statutory_ambulanceID", "error");
        return;
    }
    else if (emp_shift_id === "0") {
        showsNotificationError("Select Shift Type", "reg_statutory_shiftID", "error");
        return;
    }
   /* else if (pilot_id === "0" || pilot_id === "") {
        showsNotificationError("Enter Piolot Id", "reg_statutory_pilotnameID", "error");
        //showsNotificationError("Enter Visitor Name", "sc_reg_pilotId", "error");
        return;
    }
    else if (pilot_name === "0" || pilot_name === "") {
        showsNotificationError("Enter Piolt Name", "reg_statutory_pilotnameID", "error");
        return;
    }
    else if (emso_id === "0" || emso_id === "") {
        showsNotificationError("Enter Emso Id", "reg_statutory_emtID", "error");
        return;
    }
    else if (emso_name === "0" || emso_name === "") {
        showsNotificationError("Enter Emso Name", "reg_statutory_emtNameID", "error");
        return;
    }*/
    else if (supervior_id === "0" || supervior_id === "") {
        showsNotificationError("Enter Supervisor Id", "supervisorNameID", "error");
        return;
    }
    else if (statutory_complaince_id === "0" || statutory_complaince_id === "") {
        showsNotificationError("Select Complaince Type", "reg_complianceTypeID", "error");
        return;
    }

    else if (complaincestatus_id === "0" || complaincestatus_id === "") {
        showsNotificationError("Select Complaince", "complianceID", "error");
        return;
    }
    else if (date_of_renovation === "0" || date_of_renovation === "") {
        showsNotificationError("Select Date Of Renovation", "renovationDateID", "error");
        return;
    }
    else if (remarks === "0" || remarks === "") {
        showsNotificationError("Enter Remarks", "reg_remarksId", "error");
        return;
    }

    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.insertComplianceDetails;
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
        	$('#ticketId').val(data.output);
        	get_ohd_mail_directory();
            if (data !== null || data !== 0) {
                showsNotificationError("Inserted Successfully", "statutory_registrationId", "success");
                window.setTimeout(function() {
                    location.reload();
                }, 3000);

            }
        },
        error: function() {
            console.log("Error In case_ReOpen Not Inserted");
        }
    });
}

/*
 *@DESC : statutoryComplianceSearch
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */

function statutoryComplianceSearch() {
    $('#statutaryComplaintsTable').html("");
    try {
        var districtId = document.getElementById('statutory_districtID').value;
        var baselocation = document.getElementById('statutory_baseLocID').value;
        var ambulanceId = document.getElementById('statutory_ambulanceID').value;
        var ticketid = document.getElementById('statutory_ticketID').value;
        var fromdate = document.getElementById('fromDateID').value;
        var todate = document.getElementById('toDateID').value;

        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation === null | baselocation === '') {
            baselocation = 0;
        }
        if (ambulanceId === null | ambulanceId === '') {
            ambulanceId = 0;
        }
        if (fromdate === null | fromdate === '') {

            fromdate = 0;
        }
        if (todate === null | todate === '') {

            todate = 0;
        }

        if (ticketid === null | ticketid === '') {

            ticketid = 0;
        }

        if (districtId==0 &&baselocation==0 &&ambulanceId==0 &&fromdate=="0"&&todate=="0"&&ticketid=="0"){   
          	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
          	return true;
          }

        var obj_Insert = {
            districtid: districtId,
            baselocation_id: baselocation,
            vehicle_id: ambulanceId,
            enddate: fromdate,
            ondate: todate,
            ticket_id: ticketid
        };
        console.log('#### JSON OBJECT ####' + JSON.stringify(obj_Insert));
        var strUrl = Service.complianceSearchList;
        console.log("strUrl : " + strUrl);
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#statutaryComplaintsTable').append(divTag);
                }

                else {
                    var jsonArray = data.statutoryComplianceControllerDTO;
                    if (jsonArray.length > 0) {
                        //calling gettingSearchList function.....
                        getting_SC_searchList(jsonArray);
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
        console.error("error occur in search()" + JSON.stringify(err))
    }
}



function getting_SC_searchList(strData) {
    var objTableTag = document.createElement('table');
    $(objTableTag).addClass('table table-bordered table-striped dataTables-example');
    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead2 = document.createElement('th');
    $(objTHead2).html('Ticket Id');
    $(objTr).append(objTHead2);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('District');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Base Location');
    $(objTr).append(objTHead4);

    var objTHead5= document.createElement('th');
    $(objTHead5).html('Ambulance No');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Reported Time');
    $(objTr).append(objTHead6);

/*   var objTHead7 = document.createElement('th');
    $(objTHead7).html('Compliance Date');
    $(objTr).append(objTHead7);*/

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('Supervisor Name');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Status');
    $(objTr).append(objTHead9);

    var objTHead17 = document.createElement('th');
    $(objTHead17).html('Update');
    $(objTr).append(objTHead17);


    var objTBody = document.createElement('tbody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].ticket_id);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].districtName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].baselocationName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].reg_number);
        $(tbleRow).append(tblCol4);
        var sr_Id = strData[i].serialid;
       

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].created_dtm);
        $(tbleRow).append(tblCol5);


       /* var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].reportTime);
        $(tbleRow).append(tblCol6);*/

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].supervior_id);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].status_id);
        $(tbleRow).append(tblCol8);

        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("Update");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm');
        $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].ticket_id + '","' + strData[i].districtName + '","' + strData[i].baselocationName + '","' + strData[i].reg_number + '","' + strData[i].supervior_id + '","' + strData[i].reportTime + '","'+strData[i].emp_shift_id+'")');
        $(tablcol11).append(buttonTag);
       // $(tbleRow).append(tablcol11);
       
        
        
        
         var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].status_id);
        
        if(strData[i].status_id==="Closed"){
            $(tbleRow).append(tblCol9); 
        }else{
           $(tbleRow).append(tablcol11);  
        }
         $(objTBody).append(tbleRow);
        
    }
    $("#statutaryComplaintsTable").append(objTableTag);
}

function get_RowData(ticket_id, districtName, baselocationName, reg_number, supervior_id, reportTime,emp_shift_id) {
    
    $('#tyreConditionID').val(ticket_id);
    $('#up_statutory_shiftID').val(emp_shift_id);
    $('#statutoryUpdate').modal('show');
    $('#up_statutory_districtID').val(districtName);
    $('#up_statory_baseLocID').val(baselocationName);
    $('#up_statutory_ambulanceID').val(reg_number);
    $('#up_supervisorNameID').val(supervior_id);
    $('#up_renovationDateID').val(reportTime);
}


function loadDataTable() {
    $('.table').DataTable({
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
 *@DESC : statutoryCompliance Update
 *@AuthorName : Habiboon Patan
 *@DATE : 13-06-2019
 */

function sc_update() {
    var currentremarks = $('#up_remarksId').val();
    var nextdateofRemarks = $('#up_next_remarksId').val();
    var nextrenovationDate = $('#up_next_renovationDateID').val();//up_next_renovationDateID
    var reportDataTime1 = moment(nextrenovationDate).format("YYYY-MM-DD");
    var serailID = $('#tyreConditionID').val();
    var objUpd =
            {
                remarks: currentremarks,
                ticket_id: serailID,
            };
    if (currentremarks === "0" || currentremarks === "") {
        showsNotificationError("Enter Remarks", "up_remarksId", "error");
        return;
    }

    else if (nextrenovationDate === "" || nextrenovationDate === "") {
        showsNotificationError("Enter Next Renovation Date", "up_next_renovationDateID", "error");
        return;
    }
    else if (nextdateofRemarks === "0" || nextdateofRemarks === "") {
        showsNotificationError("Enter Date Of Renovation Remarks", "up_next_remarksId", "error");
        return;
    }

    var strUrl2 = Service.updateCompliancedetails;
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
                showsNotificationError("Updated Successfully", "statutory_updateID", "success");
                window.setTimeout(function() {
                    location.reload();
                }, 3000);
            }
        },
        error: function() {
            console.log("Error In sc_update");
        }
    });
}


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

function showsNotificationError(msg, id, msgType) {
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


function resetInsert(){
	baseLocation_reg(0);
	$('#reg_statutory_districtID').val("0").trigger("chosen:updated");
	$('#reg_statory_baseLocID').val("0").trigger("chosen:updated");
	$('#reg_statutory_ambulanceID').val('0').trigger("chosen:updated");
	$('#reg_statutory_shiftID').val('0').trigger("chosen:updated");
	$('#reg_statutory_pilotID').val('');
	$('#reg_statutory_pilotnameID').val('');
	$('#reg_statutory_emtID').val('');
	$('#reg_statutory_emtNameID').val('');
	$('#supervisorNameID').val('');
	$('#othersupervisorId').val('');
	$('#reg_complianceTypeID').val('0').trigger("chosen:updated");
	$('#sc_reg_eqipmentID').val('0').trigger("chosen:updated");
	$('#complianceID').val('0').trigger("chosen:updated");
	$('#renovationDateID').val('');
	$('#reg_remarksId').val('');

	getAmbulance_reg(0);
	
}

function resetUpdate(){
	$('#up_remarksId').val('');
	$('#up_next_renovationDateID').val('');
	$('#up_next_remarksId').val('');
}

function resetSearch(){
	$('#statutory_districtID').val('0').trigger("chosen:updated");
	$('#statutory_baseLocID').val('0').trigger("chosen:updated");
	$('#statutory_ambulanceID').val('0').trigger("chosen:updated");
	$('#statutory_ticketID').val('');
	$('#fromDateID').val('');
	$('#toDateID').val('');
	baseLocation_search(0);
	getAmbulance(0);
	$('#statutaryComplaintsTable').empty();
}


//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
    //remarkid, district_id ,district_id ,baselocationid, ambulance_no,date_of_renovation,emsoid ,pilotid,ticketId
	var ticket_id=$('#ticketId').val();//hiddenId
	alert("ticketId====="+ticket_id);
	var distid=$('#dist_id').val();
	alert("dist===>"+distid);
	var baselocId=$('#baselocationid').val();
	var ambulanceno=$('#ambulance_no').val();
	var date_of_renovation=$('#date_of_renovation').val();
	var emsoId=$('#emsoid').val();
	var pilot=$('#pilotid').val();
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Statutory Complaince:"+date_of_renovation+" ERS";	
	var remarks=$('#remarkid').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();

	var emailtext;
	//alert("remarks4535====>"+remarks);
	
var emailtext =	'<html><head><title>Statutory Complaince</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Statutory Complaince</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2"></td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td class="text2">'+emsoId+'</td>';

emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2">'+pilot+'</td>';

emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2"></td></tr><tr><td >Off Road Timing:</td><td class="text2">'+date_of_renovation+'</td>';

emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';                                                                       	
console.log("====>"+message);
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
	alert("========insertHmSmsOutboxTreans========");
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
                     alert("SMS Sent Sucessfully ")
                    
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
	alert("========insertHmEmailOutboxTreans========");
	var subject="AP ERS-Statutory Complaince with Ticket Id:"+ticket_id
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

