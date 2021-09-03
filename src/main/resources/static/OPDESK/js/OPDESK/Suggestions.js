/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#registration').on('shown.bs.modal', function (e) {
	getListOfDistrict_suggestion_Reg();
    get_shiftTypes_suggestion();
    suggestionType();
    getReportToHO();

});

$('#update').on('shown.bs.modal', function (e) {
    getReportToHOForUpdate();

});
//on load call
$(document).ready(function () {
    try {
        getListOfDistrict_suggestion();
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
function getListOfDistrict_suggestion() {
    $("#districs_id").empty();
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#districs_id').append(selectfirst);
    $('#districs_id_reg').append(selectfirst);
    $.each(district, function (i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districs_id');
       // $(districts).appendTo('#districs_id_reg');

    });
    $('#districs_id').chosen();
    $('#districs_id').trigger("chosen:updated");

}
;

/*
 * For loading the Districs based on the state ID calling to masterdata for Reg
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function getListOfDistrict_suggestion_Reg() {
    $("#districs_id_reg").empty();
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#districs_id').append(selectfirst);
    $('#districs_id_reg').append(selectfirst);
    $.each(district, function (i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districs_id_reg');

    });
    $('#districs_id_reg').chosen();
    $('#districs_id_reg').trigger("chosen:updated");
}
;
$('#districs_id').on('change', function () {
    var listOfDistrict = $('#districs_id').val();
    $("#baselocation_id").empty();
    baseLocation_suggestion(listOfDistrict);
});
/*
 * For loading the baseloc based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
 */
function baseLocation_suggestion(listOfDistrict) {
	$("#baselocation_id").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocation_id').append(selectfirst);
    $.each(baselocations, function (i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');

    });
    $("#baselocation_id").chosen();
    $('#baselocation_id').trigger("chosen:updated");

}
;

$('#baselocation_id').on('change', function () {
    var baseLocation = $('#baselocation_id').val();
    $("#Ambulance_Id").empty();
    getAmbulance_suggestion(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_suggestion(baseLocation) {
	$("#Ambulance_Id").empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#Ambulance_Id').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#Ambulance_Id');
    });

    $("#Ambulance_Id").chosen();
    $('#Ambulance_Id').trigger("chosen:updated");
}
;
function getDistrict_reg() {
    getListOfDistrict_suggestion();

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
    $("#basloc_id_reg").chosen();
    $('#basloc_id_reg').trigger("chosen:updated");

}
;
$('#basloc_id_reg').on('change', function () {
    var baseLocation = $('#basloc_id_reg').val();
    $("#ambulance_id_reg").empty();
    getAmbulance_reg(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
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

    $("#ambulance_id_reg").chosen();
    $('#ambulance_id_reg').trigger("chosen:updated");
}
;
/*
 * For loading the ShiftType  calling to masterdata
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_shiftTypes_suggestion() {

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
 * For loading the suggestion type in suggestion.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function suggestionType() {

    try {

        var strUrl = Service.suggestionType;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {

                var responsecode = data.responseCode;

                if (null !== responsecode) {

                } else {

                    var jsonArray = data.suggestionsControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var suggestionType = "<option value=" + resData.serialId + ">" + resData.suggestionType + "</option>";
                        $(suggestionType).appendTo('#suggestionType_id');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in suggestionType()' + err);
    }
    $("#suggestionType_id").chosen();
}
;
/*
 * For loading the report yo ho type in suggestion.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getReportToHO() {
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
                        var reportToHo = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(reportToHo).appendTo('#reportToHo_id');



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
    $("#reportToHo_id").chosen();
}
;
/*
 * For loading the report yo ho type in suggestion.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getReportToHOForUpdate() {
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
                        var reportToHo = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(reportToHo).appendTo('#reportToHoid_update');



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
    $("#reportToHoid_update").chosen();
}
;
/*
 * For inserting  the SuggestionsDetails details.
 * priyadarshini
 * 16-05-2019
 * the input are
 */
function saveSuggestionsDetails() {
    var district = $("#districs_id_reg").val();
    var BaseLocation = $("#basloc_id_reg").val();
    var ambulanceId = $("#ambulance_id_reg").val();
    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    var listOfShiftType = $("#shiftTypeId").val();
    var suggestionType = $("#suggestionType_id").val();
    var suggestion = $("#suggestion_id_reg").val();
    var reportToHo = $("#reportToHo_id").val();
    var resolutionTime = $("#dateOfresolution_id").val();
    var resolutionTime1 = moment(resolutionTime).format("YYYY-MM-DD");
    var remark = $("#remarks_id").val();
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
        showNotificationError("Select Shift Type ", "shiftTypeId", "error");
        return;
    }
    if (suggestionType === '0' || suggestionType === 0) {
        showNotificationError("Select suggestion Type", "suggestionType_id", "error");
        return;
    }
    if (reportToHo === '0' || reportToHo === 0) {
        showNotificationError("Select Report To Ho", "reportToHo_id", "error");
        return;
    }
    if (suggestion === '' || suggestion === null) {
        showNotificationError("Enter  Suggestion ", "suggestion_id_reg", "error");
        return;
    }


    

    else if (resolutionTime === "Invalid date" || resolutionTime === 'Invalid date' || resolutionTime === 'undefine') {
        showNotificationError("Select Resolution Time", "dateOfresolution_id", "error");
        return;
    }
    else if (remark === '' || remark === null) {
        showNotificationError("Enter Remark", "remarks_id", "error");
        return;
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicleID": ambulanceId,
        "district_id": district,
        "baselocationID": BaseLocation,
        "reg_number": ambulance_reg_number,
        "activity_id": 1,
        "supervior_id": 1,
        "districtManager_id": 1,
        "suggestion_typeid": suggestionType,
        "actionid": reportToHo,
        "suggestion": suggestion,
        "remarks": remark,
        "dateOfResolution": resolutionTime1,
        "created_by_id": createdyid,
        "created_by_roleid": createdbtroleid,
        "status_id": 1,
        "shiftTypeID": listOfShiftType,
    }
    var strUrl = Service.saveSuggestionsDetails;

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
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert(" not Inserted ");

            } else {
                showNotificationError("Inserted Successfully", "save_suggestionId", "success");
       /*         window.setTimeout(function () {
                    location.reload();
                }, 2000);*/

            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
/*
 * For update the SuggestionDetails details.
 * priyadarshini
 * 06-05-2019
 * inputs  serial_id,action_id,remarks,dateOfResolution
 */
function updateSuggestionDetails() {
    var serial_id = $('#serialId').val();
    var action_id = $('#reportToHoid_update').val();
    var suggestion = $('#suggestionId_update').val();
    var remarks = $('#remarksId_update').val();
    var dateOfResolution = $('#dateOfresolutionId_update').val();
    var dateOfResolution1 = moment(dateOfResolution).format("YYYY-MM-DD");
    //var status_id=$('#fireOnSceneIdforupdate').val();

    if (action_id === '0' || action_id === 0) {
        showNotificationError("Select Send To Ho", "reportToHoid_update", "error");
        return;
    }

    else if (suggestion === '' || suggestion === null) {
        showNotificationError("Select Suggestion", "suggestionId_update", "error");
        return;
    }
    
    else if (dateOfResolution === "" || dateOfResolution === '' || dateOfResolution === null) {
        showNotificationError("Select Resolution Time", "dateOfresolutionId_update", "error");
        return;
    }
    
    else if (remarks === '' || remarks === null) {
        showNotificationError("Enter  Remarks ", "remarksId_update", "error");
        return;
    }

    var objUpd =
            {
                serialId: serial_id,
                actionid: action_id,
                suggestion: suggestion,
                remarks: remarks,
                dateOfResolution: dateOfResolution1,
                status_id: 2,
            }
    var strUrl2 = Service.updateSuggestion;
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
                showNotificationError("Data Updated Successfully", "update_id", "success");
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

/*
 * For searching  the  suggestion details.
 * priyadarshini
 * 06-05-2019
 * inputs  districtId,baselocation_ID,vehicle_ID,resolutionDate,fromDate,todate,ticket_id
 */
function suggestion_Search() {

    try {
        var districtId = $('#districs_id').val();
        var baselocation_ID = $('#baselocation_id').val();
        var vehicle_no = $('#Ambulance_Id').val();

        var resolutionDate = $('#resolutionDate_id').val();
        var fromDate = $('#fromDate_id').val();
        var todate = $('#toDate_id').val();
        var ticket_id = $('#ticketId').val();
        var say = "¥";
        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_no === null | vehicle_no === '') {
            vehicle_no = 0;
        }
        if (resolutionDate === null | resolutionDate === '' || resolutionDate === 'undefine') {

            resolutionDate = say;
        }
        if (fromDate === null | fromDate === '') {

            fromDate = say;
        }
        if (todate === null | todate === '') {

            todate = say;
        }
        if (ticket_id === null | ticket_id === '') {

            ticket_id = 0;
        }
        var objJson = {
            "district_id": districtId,
            "baselocationID": baselocation_ID,
            "vehicleID": vehicle_no,
            "offdate": "¥",
            "ondate": fromDate,
            "enddate": todate,
            "ticket_id": ticket_id
        }
        var strUrl = Service.get_suggestion_Search;
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
                $('#suggestion_id').empty();
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {

                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#suggestion_id').append(divTag);
                } else {

                    var jsonArray = data.suggestionsControllerDTOs;
                    if (jsonArray.length > 0) {
                        //calling to dom
                        suggestions_Data(jsonArray);
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

function suggestions_Data(strData) {

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
        $(objTHead6).html("Suggestion Type");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Suggestion");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Resolution Date");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Status");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);
        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Update");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);


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
            $(tablcol4).html(strData[i].baselocationName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].suggestionType);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].suggestion);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].dateOfResolution);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].status_id);
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn  btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].serialId + '","' + strData[i].districtName + '","' + strData[i].baselocationName + '","' + strData[i].reg_number + '","' + strData[i].shiftTypeName + '","' + strData[i].supervior_id + '","' + strData[i].districtManager_id + '","' + strData[i].suggestionType + '","' + strData[i].suggestion + '","' + strData[i].actionid + '","' + strData[i].remarks + '")');
            $(tablcol10).append(buttonTag);
            $(tablcol10).css('height', '36px');

            var tblCol19 = document.createElement('td');
            $(tblCol19).addClass('text-center');
            $(tblCol19).html(strData[i].status_id);
            if (strData[i].status_id === "Closed") {
                $(tbleRow).append(tblCol19);
            } else {
                $(tbleRow).append(tablcol10);
            }
            $(objTBody).append(tbleRow);

        }
        $("#suggestion_id").append(objDivTag);
    } catch (err) {
        console.log("suggestion_id" + err);
    }
}
function get_RowData(serialId, dst_District, baselocationName, reg_number, shiftTypeName, supervior_id, districtManager_id, suggestionType, suggestion, actionid, remarks) {
    $('#serialId').val(serialId);
    $('#update').modal('show');
    $('#districs_id_update').val(dst_District);
    $('#basloc_id_update').val(baselocationName);
    $('#ambulance_id_update').val(reg_number);
    $('#shiftTypeId_update').val(shiftTypeName);
    $('#suggestionTypeId_update').val(suggestionType);
    $('#suggestionId_update').val(suggestion);
    $('#update').modal('show');
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




function reset_search_suggestion() {
    $('#districs_id').val("0").trigger("chosen:updated");
    $('#baselocation_id').val("0").trigger("chosen:updated");
    $('#Ambulance_Id').val("0").trigger("chosen:updated");
    $('#resolutionDate_id').val("").trigger("chosen:updated");
    $('#fromDate_id').val("");
    $('#toDate_id').val("");
    $('#ticketId').val("");
    baseLocation_suggestion(0);
    getAmbulance_suggestion(0);
    $('#suggestion_id').empty();
}

function reset_Registation_suggestion() {
    $('#districs_id_reg').val("0").trigger("chosen:updated");
    $('#basloc_id_reg').val("0").trigger("chosen:updated");
    $('#ambulance_id_reg').val("0").trigger("chosen:updated");
    $('#shiftTypeId').val("0").trigger("chosen:updated");
    $('#suggestionType_id').val("0").trigger("chosen:updated");
    $('#suggestion_id_reg').val("");
    $('#reportToHo_id').val("");
    $('#dateOfresolution_id').val("");
    $('#remarks_id').val("");
    baseLocation_reg(0);
    getAmbulance_reg(0);

}

function reset_search_update_suggestion() {
    $('#suggestionId_update').val("").trigger("chosen:updated");
    $('#reportToHoid_update').val("").trigger("chosen:updated");
    $('#dateOfresolutionId_update').val("");
    $('#remarksId_update').val("");
    $('#reportToHoid_update').val('');

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

    }).on('strtDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

$(document).ready(function () {
    $('#fromDate_id').datepicker({
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

    $('#fromDate_id').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//toDate_id

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