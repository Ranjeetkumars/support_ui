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
        $("#mulutipleDeleteId").hide();
        getSectionDetailsList(token_id);

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


/*@DESC : saveSectionCreateionDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function saveSectionCreateionDetails() {
            

    var sectionId = $('#sectionId').val();
    var sectionName = $('#sectionNameId').val();
    var billingValue = $('#billingValueId').val();
    var billingCycle = $('#billingCycleId').val();
    var endDate = $('#endDateid').val();
    var d = new Date(endDate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    endDate = yy + "-" + mm + "-" + dd;
    if (sectionId === "" || sectionId === '') {
        showNotificationError("Enter Section Id", "sectionId", "error");
        return;
    }
    else if (sectionName === "" || sectionName === '') {

        showNotificationError("Enter  section Name", "sectionNameId", "error");
        return;
    }
    else if (billingValue === "" || billingValue === '') {

        showNotificationError("Enter  billing value", "billingValueId", "error");
        return;
    }
    else if (billingCycle === "" || billingCycle === '') {

        showNotificationError("Enter  billing cycle", "billingCycleId", "error");
        return;
    }
    else if (endDate === "NaN-NaN-NaN" || endDate === 'NaN-NaN-NaN') {

        showNotificationError("select Date", "endDateid", "error");
        return;
    }
 
    var objJson =
            {"conditionId": 1,
                "billingid": sectionId,
                "billingsection": sectionName,
                "billing_value": billingValue,
                "billing_cycle": billingCycle,
                "startdate": "now()",
                "enddate": endDate,
                "createdbyid": user_id,
                "createdbymodid": module_id,
                "createdbyroleid": role_id}

    var strUrl = Service.saveSlaMonthlyBillinge;
    console.log("saveSlaMonthlyBillinge details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "saveSectionDetailsId", "error");
            } else {

                showNotificationError("Inserted Successfully", "saveSectionDetailsId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveSectionCreateionDetails');
        }
    });
}
/*@DESC : resetAllValue
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function resetAllValue() {
    $('#sectionId').val('');
    $('#sectionNameId').val('');
    $('#billingValueId').val('');
    $('#billingCycleId').val('');
    $('#endDateid').val('');
}

/*@DESC : getSectionDetailsList
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getSectionDetailsList(token_id) {
   
    $('#sectionTableId').empty();
    try {
        var strUrl = Service.getSectionDetails;
        console.log("getSectionDetailsList Url is:" + strUrl);

        
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
                $('#sectionTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    section_No_Data_DOM();

                } else {
                    var jsonArray = data.sectionDetailsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        section_DOM(jsonArray);
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
 *@DESC : if data not available in dom this method will load
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function section_No_Data_DOM() {

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

        var objTHead1 = document.createElement("th");

        $(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading1

//For table Heading2
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Section Id');
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Section Name');
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Billing Value');
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Billing Cycle');
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Start Date');
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('End Date');
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Update');
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement('th');
        $(objTHead10).html('Delete');
        $(objTr).append(objTHead10);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
 
        $(objDivTag).addClass('objDivTag1');
       $(objDivTag).append("NO DATA AVAILABLE");

        $("#sectionTableId").append(objDivTag);

    } catch (err) {
        console.log("sectionTableId" + err);
    }
}
/*@DESC : section_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function section_DOM(strData) {

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
        $(objTHead3).html('Section Id');
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Section Name');
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Billing Value');
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Billing Cycle');
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Start Date');
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('End Date');
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Update');
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement('th');
        $(objTHead10).html('Delete');
        $(objTr).append(objTHead10);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].billingid + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);

            $(tablcol1).attr('onclick', 'onclickCheckbox()');

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].billingid);
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].billingsection);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].billing_value);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].billing_cycle);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].startdate);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].enddate);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');

            $(tablcol8).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"></i><i></a> ');


            $(tablcol8).attr('onclick', 'get_RowData("' + strData[i].billingid + '","' + strData[i].billingsection + '","' + strData[i].billing_value + '","' + strData[i].billing_cycle + '","' + strData[i].startdate + '","' + strData[i].enddate + '")');



            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');

            $(tablcol9).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol9).attr('onclick', 'deleteSinglerecord()');

            $(tablcol9).css('height', '5px');

            $(tbleRow).append(tablcol8);
            $(tbleRow).append(tablcol9);
            $(objTBody).append(tbleRow);

        }

        $("#sectionTableId").append(objDivTag);


    } catch (err) {
        console.log("sectionTableId" + err);
    }
}
function get_RowData(billingid, billingsection, billing_value, billing_cycle, startdate, enddate) {
    $("#up_sectionId").val(billingid);
    $("#up_sectionNameId").val(billingsection);
    $("#up_billingValueId").val(billing_value);
    $("#up_billingCycleId").val(billing_cycle);
    $("#up_endDateid").val(enddate);
}
/*@DESC : updateSectionCreateionDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function updateSectionCreateionDetails() {
    var upsection = $('#up_sectionId').val();
    var upsectionName = $('#up_sectionNameId').val();
    var upbillingValue = $('#up_billingValueId').val();
    var upbillingCycle = $('#up_billingCycleId').val();
    var upendDate = $('#up_endDateid').val();
    var d = new Date(upendDate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    upendDate = yy + "-" + mm + "-" + dd;


    if (upsection === "" || upsection === '') {

        showNotificationError("Enter Section Id", "up_sectionId", "error");
        return;
    }
    else if (upsectionName === "" || upsectionName === '') {

        showNotificationError("Enter  section Name", "up_sectionNameId", "error");
        return;
    }
    else if (upbillingValue === "" || upbillingValue === '') {

        showNotificationError("Enter  billing value", "up_billingValueId", "error");
        return;
    }
    else if (upbillingCycle === "" || upbillingCycle === '') {

        showNotificationError("Enter  billing cycle", "up_billingCycleId", "error");
        return;
    }
//     else if (upendDate === "NaN-NaN-NaN" || upendDate === 'NaN-NaN-NaN') {
//      
//        showNotificationError("select Date", "up_endDateid", "error");
//        return;
//    }
    var objJson =
            {"conditionId": 2,
                "billingid": upsection,
                "billingsection": upsectionName,
                "billing_value": upbillingValue,
                "billing_cycle": upbillingCycle,
                "startdate": "now()",
                "enddate": upendDate,
                "createdbyid": "1",
                "createdbymodid": "1",
                "createdbyroleid": "1"}
    var strUrl = Service.saveSlaMonthlyBillinge;
    console.log("updateSectionCreateionDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "updateSectionDetailsId", "error");
            } else {

                showNotificationError("Inserted Successfully", "updateSectionDetailsId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  saveSectionCreateionDetails');
        }
    });
}
/*@DESC : deleteSinglerecord
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteSinglerecord() {
    var selectedCheckboxvalue = $('#reg_no').val();

    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select section", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#myModal6').modal('show');
    }
}
/*@DESC : multipleCheckBox
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
//multiplle checkbox reading
function multipleCheckBox() {

    $("#mulutipleDeleteId").hide();
    $('#reg_no').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);


        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs);
                return $(this).val();
            }).get();
            $("#mulutipleDeleteId").show();

            $('#reg_no').val(searchIDs);
        }

    });
}
/*@DESC : onclickCheckbox
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
//single checkbox reading
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
/*@DESC : deleteSectionDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteSectionDetails() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "section_id": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteSectionsDetailsData;
    console.log("deleteSectionDetails Url is:" + strUrl);
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
                showNotificationError(" not delete ", "deleteId", "error");

            } else {
                showNotificationError("delete Successfully", "deleteId", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteSectionDetails ');
        }
    })
}
/*@DESC : multipleSctionDelete
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function multipleSctionDelete() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("selected vEHICLE rEGnO======" + selectedCheckboxvalue)
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select Section", "selectall", "error");
        return;
    }
    $('#myModal6').modal('show');
}
/*@DESC : loadDataTable
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
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


//validation

function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}

$("#sectionNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_sectionNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#sectionId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_sectionId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#billingCycleId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_billingCycleId").keypress(function (event) {
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

/*@DESC : for showing notification error msg
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
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
