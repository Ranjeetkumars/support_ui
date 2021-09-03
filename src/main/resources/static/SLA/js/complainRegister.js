/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var token_id;
$(document).ready(function () {
    try {
        //getEquipmentName();
       // getEquipmentType();
        
         token_id = localStorage.getItem("token");
         var user_id=localStorage.getItem("userID");
         var module_id=localStorage.getItem("sla_moduleID");
         var role_id=localStorage.getItem("sla_roleID");

        getComplainVrifyDetails();
        getStatus();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*@DESC : saveComplainDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function saveComplainDetails() {
    var equipment = $('#equipmentTypeId').val();
    var equipmentName = $('#equipmentTypeId :selected').text();
    var  equipmentType= $('#EquipmentId :selected').text();
    var assetCode = $('#assetCodeId').val();
    var location = $('#locationNameId').val();
    var locationName = $('#locationNameId :selected').text();
    var remark = $('#RemarkId').val();
    if (equipment === "0" || equipment === '0') {
        showNotificationError("Select complain Type", "equipmentId", "error");
        return;
    }
    else if (equipment === "0" || equipment === '0') {
        showNotificationError("Select equipment ", "equipmentTypeId", "error");
        return;
    }
    else if (assetCode === "" || assetCode === '') {
        showNotificationError("Enter  assetCode", "assetCodeId", "error");
        return;
    }
    else if (locationName === "" || locationName === '') {
        showNotificationError("Enter location id", "locationNameId", "error");
        return;
    }
   
    else if (remark === "" || remark === '') {
        showNotificationError("Enter location", "RemarkId", "error");
        return;
    }
    var objJson =

            {"ticktid": "1",
                "equipmentid": equipment,
                "assetcode": assetCode,
                "equipmentName": equipmentName,
                "equipmentType": equipmentType,
                "locationId": location,
                "locationName": locationName,
                "issueReportedbyid": "1",
                "issueReportedbyName": "userName",
                "date": "now()",
                "issueReportedRemarks": remark,
                "createdbyid": "1",
                "createdbymodid": "1",
                "createdbyroleid": "1"}

    var strUrl = Service.savecomplainDetails;
    console.log("saveComplainDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "saveComplainId", "error");
            } else {
                showNotificationError("Inserted Successfully", "saveComplainId", "success");
                window.setTimeout(function () {
                    //location.reload();
                }, 2000);
                // resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveComplainDetails');
        }
    });
}


$('#EquipmentId').on('change', function () {
    var equipment = $('#EquipmentId :selected').text();
    $('#equipmentTypeId').empty();
    getEquipmentName(equipment);
});
/*@DESC : getEquipmentName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getEquipmentName(equipment) {
  var objJson =
         {
      "equipmentType":equipment,

       }
       var strUrl = Service.getEquipmentName;
    console.log("getEquipmentName details Url is:" + strUrl);
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
                console.log('getEquipmentName not loaded');
            } else {
                var jsonArray = data.equipemtResponseControllerDTO;
                var selectfirst = "<option value='0'>Select Equipment Name</option>";
                $('#equipmentTypeId').append(selectfirst);

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.equipmentId + ">" + resData.equipmentName + "</option>";
                    $(status).appendTo('#equipmentTypeId');

                });
                $('#equipmentTypeId').trigger("chosen:updated");

                $("#equipmentTypeId").chosen();

            }
        },
        error: function () {
            console.log('Error in loading getEquipmentName Data' + strUrl);
        }
    });
}
///*@DESC : getEquipmentType
// *@AuthorName : priyadarshini
// *@DATE : 2020-02-17
// */
//function getEquipmentType() {
//
//    $('#equipmentTypeId').empty();
//
//    var strUrl = Service.getEquipemtDetails;
//    console.log("getEquipmentName Url is:" + strUrl);
//    $.ajax({
//        type: "GET",
//        url: strUrl,
//        dataType: "json",
//        async: false,
//        crossDomain: false,
//        success: function (data) {
//
//            var responsecode = data.responseCode;
//            if (200 !== responsecode) {
//                console.log('getEquipmentType not loaded');
//            } else {
//                var jsonArray = data.equipemtResponseControllerDTO;
//                var selectfirst = "<option value='0'>Select Equipment Type</option>";
//                $('#equipmentTypeId').append(selectfirst);
//
//                $.each(jsonArray, function (i, resData) {
//                    var status = "<option value=" + resData.equipmentId + ">" + resData.equipmentType + "</option>";
//                    $(status).appendTo('#equipmentTypeId');
//
//                });
//                $('#equipmentTypeId').trigger("chosen:updated");
//                $("#equipmentTypeId").chosen();
//            }
//        },
//        error: function () {
//            console.log('Error in loading getEquipmentName Data' + strUrl);
//        }
//    });
//}

///*@DESC : getComplainDetails
// *@AuthorName : priyadarshini
// *@DATE : 2020-02-10
// */
//function getComplainDetails() {
//    $('#complainTableId').empty();
//    try {
//        var strUrl = Service.getEquipmentTransDetails;
//        console.log("getComplainDetails Url is:" + strUrl);
//        $.ajax({
//            type: "GET",
//            url: strUrl,
//            dataType: "json",
//            async: false,
//            crossDomain: false,
//            success: function (data) {
//                var responseCode = data.responseCode;
//                $('#complainTableId').empty();
//                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
//                    section_No_Data_DOM();
//
//                } else {
//                    var jsonArray = data.equipmentTransDetailsResponseControllerDTO;
//                    if (jsonArray.length > 0) {
//                        complainDetails_DOM(jsonArray);
//                        loadDataTable();
//                    }
//                }
//            },
//            error: function (err) {
//                console.error('update Stock error: ' + JSON.stringify(err));
//            }
//        });
//    }
//    catch (err) {
//        console.error("error occur in search()" + JSON.stringify(err));
//    }
//}

/*
 *@DESC : complainDetails_DOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */

function complainDetails_DOM(strData) {

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



//For table Heading2
        var objTHead1 = document.createElement('th');
        $(objTHead1).html('Equpment Name');
        $(objTr).append(objTHead1);


//For table Heading3
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Equpment Type Name');
        $(objTr).append(objTHead2);



//For table Heading4
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Location Name');
        $(objTr).append(objTHead3);

        //For table Heading5
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Reported Date');
        $(objTr).append(objTHead4);

        //For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Reported User');
        $(objTr).append(objTHead5);


        //For table Heading5
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Status');
        $(objTr).append(objTHead6);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");


            var tablcol1 = document.createElement("td");
            $(tablcol1).addClass('text-center');
            $(tablcol1).html(strData[i].equipment_name);
            $(tbleRow).append(tablcol1);


            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].equipment_type);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].location_name);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].issue_report_date);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].issue_reportedby_name);
            $(tbleRow).append(tablcol5);

            var buttonTag = document.createElement('button');
            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            var status = strData[i].ticketstatus;
            if (status === "false" || status === 'false') {
                $(tablcol6).append('<a href="#"><button type="button"   class="btn text w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-folder-open-o"></i>  Open</button> ');

            }
            else if (status === "true" || status === 'true') {

                $(tablcol6).append('<a href="#"><button type="button"   class="btn text1 w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-close"></i>  Close</button> ');

            }
            $(tablcol6).append(buttonTag);
            $(tablcol6).css('height', '36px');

            $(tablcol6).attr('onclick', 'get_RowData1("' + strData[i].equipmentId + '","' + strData[i].equipment_name + '","' + strData[i].ticketId + '")');

            $(tbleRow).append(tablcol6);
            $(objTBody).append(tbleRow);

        }

        $("#complainTableId").append(objDivTag);


    } catch (err) {
        console.log("complainTableId" + err);
    }
}
var ticketid;
var equipmentid;
function get_RowData1(equipmentId, equipment_name, ticketId) {
    $("#equipmentid").val(equipment_name);
    ticketid = ticketId;
    equipmentid = equipmentId;


}
/*
 *@DESC : loadDataTable
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
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
/*
 *@DESC : get_RowData
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function get_RowData(billingid, billingsection, billing_value, billing_cycle, startdate, enddate) {
    $("#up_sectionId").val(billingid);
    $("#up_sectionNameId").val(billingsection);
    $("#up_billingValueId").val(billing_value);
    $("#up_billingCycleId").val(billing_cycle);
    $("#up_endDateid").val(enddate);
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
/*
 *@DESC : getStatus
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function getStatus() {

    
    $('#Statusid').empty();

    var strUrl = Service.getStatus;
    console.log("getStatus Url is:" + strUrl);
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
                console.log('getStatus not loaded');
            } else {
                var jsonArray = data.statusResponseControllerDTO;
                var selectfirst = "<option value='0'>Select Status</option>";
                
                $('#Statusid').append(selectfirst);

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.statusid + ">" + resData.statusName + "</option>";
                   
                    $(status).appendTo('#Statusid');
                    

                });
               
                $('#Statusid').trigger("chosen:updated");

                $("#Statusid").chosen();

            }
        },
        error: function () {
            console.log('Error in loading getEquipmentName Data' + strUrl);
        }
    });
}


/*
 *@DESC : getComplainVrifyDetails
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function getComplainVrifyDetails() {
    $('#complainVarifyTableTableId').empty();
    try {
        var strUrl = Service.getResolutionDetails;
        console.log("getComplainVrifyDetails Url is:" + strUrl);
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
                $('#complainVarifyTableTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    //section_No_Data_DOM();

                } else {
                    var jsonArray = data.resolutionDetailsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        ComplainVrifyDetails_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('getComplainVrifyDetails Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in getComplainVrifyDetails()" + JSON.stringify(err));
    }
}

/*
 *@DESC : ComplainVrifyDetails_DOM
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function ComplainVrifyDetails_DOM(strData) {

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
        var objTHead1 = document.createElement('th');
        $(objTHead1).html('Equpment Name');
        $(objTr).append(objTHead1);


//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Equpment Type');
        $(objTr).append(objTHead2);



//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Location Name');
        $(objTr).append(objTHead3);

        //For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Reported Name');
        $(objTr).append(objTHead4);

        //For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Reported Date');
        $(objTr).append(objTHead5);


        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Reported Remark');
        $(objTr).append(objTHead6);

        //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Issue Fixedby Name');
        $(objTr).append(objTHead7);

        //For table Heading8
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Issue Fixedby Date');
        $(objTr).append(objTHead8);



        //For table Heading9
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('issue fixed remarks');
        $(objTr).append(objTHead9);
        
        
        //For table Heading10
        var objTHead10 = document.createElement('th');
        $(objTHead10).html('verifier Name');
        $(objTr).append(objTHead10);
        //For table Heading11
        var objTHead11 = document.createElement('th');
        $(objTHead11).html('verifier Date');
        $(objTr).append(objTHead11);
      //For table Heading12
        var objTHead12 = document.createElement('th');
        $(objTHead12).html('verifier Remark');
        $(objTr).append(objTHead12);
      //For table Heading13
        var objTHead13 = document.createElement('th');
        $(objTHead13).html('Complain Status');
        $(objTr).append(objTHead13);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");


            var tablcol1 = document.createElement("td");
            $(tablcol1).addClass('text-center');
            $(tablcol1).html(strData[i].equipment_name);
            $(tbleRow).append(tablcol1);


            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].equipment_type);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].location_name);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].issue_reportedby_name);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].issue_report_date);
            $(tbleRow).append(tablcol5);


            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].issue_reported_remarks);
            $(tbleRow).append(tablcol6);



            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            if (strData[i].issue_fixedby_name === "NA" || strData[i].issue_fixedby_name === 'NA') {
                $(tablcol7).html("case need to be modify");
                $(tbleRow).append(tablcol7);
            }
            else {
                $(tablcol7).html(strData[i].issue_fixedby_name);
                $(tbleRow).append(tablcol7);
            }
            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            if (strData[i].issue_fixeddate === "NA" || strData[i].issue_fixeddate === 'NA') {
                $(tablcol8).html("case need to be verify");
                $(tbleRow).append(tablcol8);
            }
            else {
                $(tablcol8).html(strData[i].issue_fixeddate);
                $(tbleRow).append(tablcol8);
            }

            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');

            if (strData[i].issue_fixed_remarks === "NA" || strData[i].issue_fixed_remarks === 'NA') {
                $(tablcol9).html("case need to be verify");
                $(tbleRow).append(tablcol9);  
            }
            else {
                $(tablcol9).html(strData[i].issue_fixed_remarks);
                $(tbleRow).append(tablcol9);
            }
            var tablcol10 = document.createElement("td");
            $(tablcol10).addClass('text-center');
            if (strData[i].verifiedby_name === "NA" || strData[i].verifiedby_name === 'NA') {
                $(tablcol10).html("case need to be verify");
                $(tbleRow).append(tablcol10);
            }
            else {
                $(tablcol10).html(strData[i].verifiedby_name);
                $(tbleRow).append(tablcol10);
            }
            var tablcol11 = document.createElement("td");
            $(tablcol11).addClass('text-center');
            if (strData[i].verifieddate === "NA" || strData[i].verifieddate === 'NA') {
                $(tablcol11).html("case need to be verify");
                $(tbleRow).append(tablcol11);
            }
            else {
                $(tablcol11).html(strData[i].verifieddate);
                $(tbleRow).append(tablcol11);
            }

            var tablcol12 = document.createElement("td");
            $(tablcol12).addClass('text-center');
            if (strData[i].verified_remarks === "NA" || strData[i].verified_remarks === 'NA') {
                $(tablcol12).html("case need to be verify");
                $(tbleRow).append(tablcol12);
            }
            else {
                $(tablcol12).html(strData[i].verified_remarks);
                $(tbleRow).append(tablcol12);
            }
            var buttonTag = document.createElement('button');
            var tablcol13 = document.createElement("td");
            $(tablcol13).addClass('text-center');
            var verified_status = strData[i].verified_statusid;
            if (verified_status === 1 || verified_status === '1') {
                $(tablcol13).append('<a href="#"><button type="button"   class="btn text w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-spinner fa-spin"></i>  In Progress</button> ');
            }
            else if (verified_status === "2" || verified_status === '2') {
                $(tablcol13).append('<a href="#"><button type="button"   class="btn text1 w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-check-circle"></i>  Verified</button> ');

            }
            else if (verified_status === "3" || verified_status === '3') {
                $(tablcol13).append('<a href="#"><button type="button"   class="btn text w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-close"></i>  Closed</button> ');

            }
            else if (verified_status === "4" || verified_status === '4') {
                $(tablcol13).append('<a href="#"><button type="button"   class="btn text w-100 btn-sm" data-toggle="modal" data-target="#update"></a><i class="fa fa-remove"></i>  Removed</button> ');

            }
            $(tablcol13).append(buttonTag);
            $(tablcol13).css('height', '36px');
            $(tablcol13).attr('onclick', 'get_RowDataForVerify("' + strData[i].ticketId + '","' + strData[i].equipmentId + '","' + strData[i].equipment_name + '")');
            $(tbleRow).append(tablcol13);
            $(objTBody).append(tbleRow);
        }
        $("#complainVarifyTableTableId").append(objDivTag);
    } catch (err) {
        console.log("complainVarifyTableTableId" + err);
    }
}
var verifyTickeId;
var verifyequipmentId;

/*
 *@DESC : get_RowDataForVerify
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function get_RowDataForVerify(ticketId, equipmentId, equipment_name) {
    $("#equipmentid").val(equipment_name);
    verifyTickeId = ticketId;
    verifyequipmentId = equipmentId;
}
/*
 *@DESC : saveVerificationDetails
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function saveVerificationDetails() {
    var statusId = $("#Statusid").val();
    var remark = $("#remarkid").val();
    var ticketStatus = false;
    if (statusId === '2' || statusId === '3' || statusId === '4') {
        ticketStatus = true;

    }
    var objJson =
            {"ticketid": verifyTickeId,
                "equipmentid": verifyequipmentId,
                "verifiedbyid": "1",
                "verifiedby_name": "habi",
                "verified_date": "now()",
                "verified_remarks": remark,
                "verified_statusid": statusId,
                "ticketstatus": ticketStatus,
            }
    var strUrl = Service.savecomplainVerificationDataDetails;
    console.log("saveVerificationDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "saveResolutionId", "error");
            } else {
                showNotificationError("Inserted Successfully", "saveResolutionId", "success");
                window.setTimeout(function () {
                    //location.reload();
                }, 2000);
                // resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveVerificationDetails');
        }
    });
}

//validation
function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}


$("#RemarkId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$("#userNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#remarkId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});


$("#remarkid").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});