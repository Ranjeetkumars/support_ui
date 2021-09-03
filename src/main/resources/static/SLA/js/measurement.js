/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var token_id;
$(document).ready(function () {
    try {
    	  token_id = localStorage.getItem("token");
      	   var user_id=localStorage.getItem("userID");
      	   var module_id=localStorage.getItem("sla_moduleID");
      	   var role_id=localStorage.getItem("sla_roleID");

        getSectionName();

        getMeasurementDetailsList();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/*@DESC : saveMeasureMentDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-12
 */
function saveMeasureMentDetails() {

    var sectionNameId = $('#sectionNameId').val();
    var assessmentId = $('#assessmentId').val();
    var measurementName = $('#measurementNameId').val();
    var measurementDesc = $('#measurementDescID').val();
    var timePeriod = $('#timePeriodId').val();
    var timeInterval = $('#timeIntervalId').val();
    var measurementid = $('#measurementId').val();

    if (sectionNameId === "0" || sectionNameId === '0') {

        showNotificationError("select Section", "sectionNameId", "error");
        return;
    }
    else if (assessmentId === "0" || assessmentId === '0') {

        showNotificationError("select Assessment", "assessmentId", "error");
        return;
    }
    else if (measurementName === "" || measurementName === '') {

        showNotificationError("Enter measurement Name", "measurementNameId", "error");
        return;
    }
    else if (measurementDesc === "" || measurementDesc === '') {

        showNotificationError("Enter measurement Desc", "measurementDescID", "error");
        return;
    }
    else if (timePeriod === "" || timePeriod === '') {

        showNotificationError("Enter Time Period ", "timePeriodId", "error");
        return;
    }
    else if (timeInterval === "" || timeInterval === '') {

        showNotificationError("Enter time Interval", "timeIntervalId", "error");
        return;
    }
    else if (measurementid === "" || measurementid === '') {

        showNotificationError("Enter measurement id", "measurementId", "error");
        return;
    }
  
    var objJson =
            {"condition": "1",
                "measurementId": measurementid,
                "assesmentId": assessmentId,
                "billingId": sectionNameId,
                "measurementName": measurementName,
                "measurementDesc": measurementDesc,
                "measurementIntervaltypeId": timeInterval,
                "measurementTimeperioId": timePeriod,
                "createdbyId": user_id,
                "createdbymodId": module_id,
                "createdbyroleId": role_id}

    var strUrl = Service.saveMeasureMentDetails;
    console.log("saveMeasureMentDetails details Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                showNotificationError("not Inserted ", "saveMeasureMentId", "error");
            } else {

                showNotificationError("Inserted Successfully", "saveMeasureMentId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveAssessmentDetails');
        }
    });
}
/*@DESC : resetAllValue
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-12
 */

function resetAllValue() {
    $('#sectionNameId').val(0);
    $('#assessmentId').val(0);
    $('#measurementNameId').val('');
    $('#measurementDescID').val('');
    $('#timePeriodId').val('');
    $('#timeIntervalId').val('');
    $('#measurementId').val('');
}
/*@DESC : getSectionName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-12
 */
function getSectionName() {
    $('#sectionNameId').empty();
    $('#up_sectionNameId').empty();

    var strUrl = Service.getSectionName;
    console.log("getSectionName Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {

            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('VehicleStatus not loaded');
            } else {
                var jsonArray = data.slaMonthlyBillingResponseControllerDTO;
                var selectfirst = "<option value='0'>Select Section Name</option>";
                $('#sectionNameId').append(selectfirst);
                $('#up_sectionNameId').append(selectfirst);


                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.billingid + ">" + resData.billingsection + "</option>";
                    $(status).appendTo('#sectionNameId');
                    $(status).appendTo('#up_sectionNameId');
                });
                $('#sectionNameId').trigger("chosen:updated");
                $('#up_sectionNameId').trigger("chosen:updated");

                $("#sectionNameId").chosen();
                $("#up_sectionNameId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getSectionName Data' + strUrl);
        }
    });
}
/*@DESC : assesssmentName1
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-12
 */
function assesssmentName1() {
    //$("#assessmentId").empty();
    $("#up_assessmentId").empty();
    var sectionName = $("#up_sectionNameId").val();


    try {
        var strUrl = Service.getAssessmentList;
        console.log("assesssmentName::::: " + strUrl);
        var obj_Insert = {
            "sectionId": sectionName
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.assessmentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select assessement</option>";

                    $("#up_assessmentId").append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var District = "<option value=" + resData.assesment_id + ">" + resData.assesment_name + "</option>";

                        $(District).appendTo("#up_assessmentId");
                    });
                }
            },
            error: function (err) {
                console.error("Error in getAssessmentList" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getAssessmentList()' + err);
    }

    $("#up_assessmentId").trigger("chosen:updated");
    $("#up_assessmentId").chosen();

}

$('#sectionNameId').on('change', function () {
    var sectionName = $('#sectionNameId').val();
    $('#assessmentId').empty();
    assesssmentName(sectionName, 'assessmentId');
});

$('#up_sectionNameId').on('change', function () {
    var sectionName = $('#up_sectionNameId').val();
    $('#up_assessmentId').empty();
    assesssmentName(sectionName, 'up_assessmentId');
});
/*@DESC : assesssmentName
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function assesssmentName(sectionName, assessmentId) {
    var id = '#' + assessmentId;
    $(id).empty();
    try {
        var strUrl = Service.getAssessmentList;
        console.log("assesssmentName::::: " + strUrl);
        var obj_Insert = {
            "sectionId": sectionName
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.assessmentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select assessment</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var assesment = "<option value=" + resData.assesment_id + ">" + resData.assesment_name + "</option>";
                        $(assesment).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getMandalBasedonDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMandalBasedonDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


/*@DESC : updateMeasureMentDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function updateMeasureMentDetails() {

    var sectionNameId = $('#up_sectionNameId').val();
    var assessmentId = $('#up_assessmentId').val();
    var measurementName = $('#up_measurementNameId').val();
    var measurementDesc = $('#up_measurementDescID').val();
    var timePeriod = $('#up_timePeriodId').val();
    var timeInterval = $('#up_timeIntervalId').val();
    var measurementid = $('#up_measurementId').val();
    if (sectionNameId === "0" || sectionNameId === '0') {

        showNotificationError("select Section", "up_sectionNameId", "error");
        return;
    }
    else if (assessmentId === "0" || assessmentId === '0') {

        showNotificationError("select Assessment", "up_assessmentId", "error");
        return;
    }
    else if (measurementName === "" || measurementName === '') {

        showNotificationError("Enter measurement Name", "up_measurementNameId", "error");
        return;
    }
    else if (measurementDesc === "" || measurementDesc === '') {

        showNotificationError("Enter measurement Desc", "up_measurementDescID", "error");
        return;
    }
    else if (timePeriod === "" || timePeriod === '') {

        showNotificationError("Enter Time Period ", "up_timePeriodId", "error");
        return;
    }
    else if (timeInterval === "" || timeInterval === '') {

        showNotificationError("Enter time Interval", "up_timeIntervalId", "error");
        return;
    }
    else if (measurementid === "" || measurementid === '') {

        showNotificationError("Enter measurement id", "up_measurementId", "error");
        return;
    }
 
    var objJson =
            {"condition": "2",
                "measurementId": measurementid,
                "assesmentId": assessmentId,
                "billingId": sectionNameId,
                "measurementName": measurementName,
                "measurementDesc": measurementDesc,
                "measurementIntervaltypeId": timeInterval,
                "measurementTimeperioId": timePeriod,
                "createdbyId": user_id,
                "createdbymodId": module_id,
                "createdbyroleId": role_id}

    var strUrl = Service.saveMeasureMentDetails;
    console.log("saveMeasureMentDetails details Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                showNotificationError("not update ", "upMeasureMentId", "error");
            } else {

                showNotificationError("updated Successfully", "upMeasureMentId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  saveAssessmentDetails');
        }
    });
}
/*
 * For getMeasurementDetailsList.
 * priyadarshini
 * 11-02-2020
 * inputs :no
 */
function getMeasurementDetailsList() {
    $('#measurmentTableId').empty();
    try {
        var strUrl = Service.getMeasurementDetailsList;
        console.log("getMeasurementDetailsList Url is:" + strUrl);
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            crossDomain: false,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {
                var responseCode = data.responseCode;

                $('#measurmentTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {

                     measurement_NO_Data_DOM();

                } else {
                    var jsonArray = data.measurementListResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        measurement_DOM(jsonArray);
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

/*
 * For measurement_NO_Data_DOM.
 * priyadarshini
 * 11-02-2020
 */
 function measurement_NO_Data_DOM(){
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

        var objTHead1 = document.createElement("th");

        $(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading1

//For table Heading2
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Assessment Id');
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Section Id');
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Section Name');
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('AssessMent Name');
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Assesment Desc');
        $(objTr).append(objTHead7);



        //For table Heading5
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Update');
        $(objTr).append(objTHead8);


        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Delete');
        $(objTr).append(objTHead9);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
 
        $(objDivTag).addClass('objDivTag1');
       $(objDivTag).append("NO DATA AVAILABLE");

        $("#measurmentTableId").append(objDivTag);

    } catch (err) {
        console.log("measurmentTableId" + err);
    }
}
/*
 * For measurement_DOM.
 * priyadarshini
 * 11-02-2020
 */
function measurement_DOM(strData) {
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

        $(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Measurement Id');
        $(objTr).append(objTHead2);
//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Measurement Name');
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Measurement Desc');
        $(objTr).append(objTHead4);
//For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('AssessMent Id');
        $(objTr).append(objTHead5);

        //For table Heading5
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Assesment Name');
        $(objTr).append(objTHead6);
        //For table Heading6
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Section Id');
        $(objTr).append(objTHead7);
//For table Heading7
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Section Name');
        $(objTr).append(objTHead8);
        //For table Heading7
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Measurement Interval type Id');
        $(objTr).append(objTHead9);
        //For table Heading7
        var objTHead10 = document.createElement('th');
        $(objTHead10).html('Measurement Time Period');
        $(objTr).append(objTHead10);



        //For table Heading5
        var objTHead11 = document.createElement('th');
        $(objTHead11).html('Update');
        $(objTr).append(objTHead11);


        var objTHead12 = document.createElement('th');
        $(objTHead12).html('Delete');
        $(objTr).append(objTHead12);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].measurementId + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');
            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].measurementId);
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].measurement_name);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].measurement_desc);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].assesmentId);
            $(tbleRow).append(tablcol5);
            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].assesment_name);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].billingId);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            $(tablcol8).html(strData[i].billingsection);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
            $(tablcol9).html(strData[i].measurement_intervaltypeId);
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            $(tablcol10).addClass('text-center');
            $(tablcol10).html(strData[i].measurement_timeperiod);
            $(tbleRow).append(tablcol10);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');

            $(tablcol7).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"></i><i></a> ');

            $(tablcol7).attr('onclick', 'get_RowData("' + strData[i].measurementId + '","' + strData[i].measurement_name + '","' + strData[i].measurement_desc + '","' + strData[i].assesment_name + '","' + strData[i].assesment_billigName + '","' + strData[i].billingId + '","' + strData[i].billingsection + '","' + strData[i].measurement_intervaltypeId + '","' + strData[i].measurement_timeperiod + '")');

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');

            $(tablcol8).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol8).attr('onclick', 'deleteSingleMeasurement()');

            $(tablcol8).css('height', '5px');

            $(tbleRow).append(tablcol7);
            $(tbleRow).append(tablcol8);
            $(objTBody).append(tbleRow);

        }





        $("#measurmentTableId").append(objDivTag);


    } catch (err) {
        console.log("measurmentTableId" + err);
    }
}

function get_RowData(measurementId, measurement_name, measurement_desc, assesment_name, assesment_billigName, billingId, billingsection, measurement_intervaltypeId, measurement_timeperiod) {
    $("#up_sectionNameId option:contains(" + billingsection + ")").attr('selected', 'selected').trigger("chosen:updated");
    assesssmentName1();
    $("#up_assessmentId option:contains(" + assesment_name + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_measurementNameId").val(measurement_name);
    $("#up_measurementDescID").val(measurement_desc);
    $("#up_timePeriodId").val(measurement_timeperiod);
    $("#up_timeIntervalId").val(measurement_intervaltypeId);
    $("#up_measurementId").val(measurementId);
}

/*
 * For delete deleteSingleMeasurement.
 * priyadarshini
 * 11-02-2020
 */
function deleteSingleMeasurement() {

    var selectedCheckboxvalue = $('#reg_no').val();

    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select assessment id", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#myModal6').modal('show');
    }
}
/*
 * For delete multipleCheckBox.
 * priyadarshini
 * 11-02-2020
 */
function multipleCheckBox() {
    $("#mulutipleDeleteId").hide();
    $('#reg_no').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);
        $('#Searchdeleteid').attr("disabled", false);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $("#mulutipleDeleteId").show();
            $('#reg_no').val(searchIDs);
        }
    });
}
/*
 * For delete single onclickCheckbox.
 * priyadarshini
 * 11-02-2020
 */
function onclickCheckbox() {
    var arrSelectedData = [];
    var count = 0;
    $("input:checkbox[name=case]:checked").each(function () {
        console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " + $(this).val());
        console.log("myCheck12:---" + $(this).val());
        arrSelectedData.push($(this).val());
        count++;
        $('#reg_no').val(arrSelectedData);
        $("#mulutipleDeleteId").hide();
        if (count >= 2) {
            $("#mulutipleDeleteId").show();
        }
    });
    if ($(".case").length === $(".case:checked").length) {
        $("#selectall").prop("checked", true);
        $("#mulutipleDeleteId").show();
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}
/*
 * For deleteMeasurmentDetails.
 * priyadarshini
 * 11-02-2020
 */
function deleteMeasurmentDetails() {

    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "measurementId": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteMeasurementDetailsData;
    console.log("deleteMeasurmentDetails Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {

            var responseCode = data.responseCode;

            if (200 !== responseCode) {
                showNotificationError(" not delete ", "deleteid", "error");

            } else {
                showNotificationError("delete Successfully", "deleteid", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteMeasurmentDetails ');
        }
    })
}
function multipleMeasurementDelete() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("selected vEHICLE rEGnO======" + selectedCheckboxvalue)
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select Section", "selectall", "error");
        return;
    }
    $('#myModal6').modal('show');
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
        position: 'left',
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
function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}


$("#measurementNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#measurementDescID").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#measurementId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#timePeriodId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#timeIntervalId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_measurementNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_measurementDescID").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#up_timePeriodId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_timeIntervalId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_measurementId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        "scrollY": "400px",
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