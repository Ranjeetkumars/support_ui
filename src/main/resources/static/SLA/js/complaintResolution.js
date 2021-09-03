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

        getComplainDetails();
        getStatus();
       
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*@DESC : getComplainDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getComplainDetails() {
    $('#complainTableId').empty();
    try {
        var strUrl = Service.getEquipmentTransDetails;
        console.log("getComplainDetails Url is:" + strUrl);
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
                $('#complainTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    section_No_Data_DOM();

                } else {
                    var jsonArray = data.equipmentTransDetailsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        complainDetails_DOM(jsonArray);
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

/*@DESC : complainDetails_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
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
 *@DESC : saveResolutionDetails
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function saveResolutionDetails() {

    var userName = $("#userNameId").val();
    var remark = $("#remarkId").val();
    var status = $("#statusId").val();
 
    var objJson =
            {"ticketId": ticketid,
                "equipmentid": equipmentid,
                "issue_fixedby_id": "1",
                "issue_fixedby_name": userName,
                "issue_fixeddate": "now()",
                "issue_fixed_remarks": remark,
                "createdbyid": user_id,
                "createdbymodid": module_id,
                "createdbyroleid": role_id,
                "verified_statusid": status}
    var strUrl = Service.saveResolutionDetails;
    console.log("saveResolutionDetails details Url is:" + strUrl);
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

            console.log('In Error of  saveResolutionDetails');
        }
    });
}
/*
 *@DESC : getStatus
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
 */
function getStatus() {

    $('#statusId').empty();
   // $('#Statusid').empty();

    var strUrl = Service.getStatus;
    console.log("getEquipmentName Url is:" + strUrl);
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
                $('#statusId').append(selectfirst);
                //$('#Statusid').append(selectfirst);

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.statusid + ">" + resData.statusName + "</option>";
                    $(status).appendTo('#statusId');
                   // $(status).appendTo('#Statusid');
                    $("#statusId option[value='2']").remove();

                });
                $('#statusId').trigger("chosen:updated");

                $("#statusId").chosen();
                //$('#Statusid').trigger("chosen:updated");

               // $("#Statusid").chosen();

            }
        },
        error: function () {
            console.log('Error in loading getEquipmentName Data' + strUrl);
        }
    });
}

/*
 *@DESC : loadDataTable
 *@AuthorName : priyadarshini
 *@DATE : 19-02-2020
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