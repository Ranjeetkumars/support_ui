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
        getAssessmentDetailsList();
        
      
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


/*@DESC : getSectionName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getSectionName() {

    $('#sectionId').empty();
    $('#up_sectionId').empty();

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
                $('#sectionId').append(selectfirst);
                $('#up_sectionId').append(selectfirst);


                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.billingid + ">" + resData.billingsection + "</option>";
                    $(status).appendTo('#sectionId');
                    $(status).appendTo('#up_sectionId');
                });
                $('#sectionId').trigger("chosen:updated");
                $('#up_sectionId').trigger("chosen:updated");

                $("#sectionId").chosen();
                $("#up_sectionId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getSectionName Data' + strUrl);
        }
    });
}
/*@DESC : saveAssessmentDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function saveAssessmentDetails() {

    var sectionId = $('#sectionId').val();
    var assessmentId = $('#assessment_id').val();
    var assessmentName = $('#assessmentNameId').val();
    var assessmentDesc = $('#assessmentDescId').val();
    if (sectionId === "0" || sectionId === '0') {

        showNotificationError("select Section Id", "sectionId", "error");
        return;
    }
    else if (assessmentId === "" || assessmentId === '') {

        showNotificationError("Enter assessment", "assessment_id", "error");
        return;
    }
    else if (assessmentName === "" || assessmentName === '') {

        showNotificationError("Enter assessment Name", "assessmentNameId", "error");
        return;
    }
    else if (assessmentDesc === "" || assessmentDesc === '') {

        showNotificationError("Enter assessment Desc", "assessmentDescId", "error");
        return;
    }

    var objJson =
            {"par_condition": "1",
                "assesment_id": assessmentId,
                "assesment_billingid": sectionId,
                "assesment_name": assessmentName,
                "assesment_desc": assessmentDesc,
                "assesment_createdbyid": user_id,
                "assesment_createdbymodid": module_id,
                "assesment_createdbyroleid":role_id}
 

    var strUrl = Service.saveAssessmentDetails;
    console.log("saveAssessmentDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "saveAssessmentDetailsId", "error");
            } else {

                showNotificationError("Inserted Successfully", "saveAssessmentDetailsId", "success");
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
 *@DATE : 2020-02-10
 */
function resetAllValue() {
    $('#sectionId').val(0);
    $('#assessment_id').val('');
    $('#assessmentNameId').val('');
    $('#assessmentDescId').val('');
}
/*@DESC : updateAssessmentDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function updateAssessmentDetails() {
    var sectionId = $('#up_sectionId').val();
    var assessment = $('#up_assessmentId').val();
    var upassessmentName = $('#up_assessmentNameId').val();
    var upassessmentDesc = $('#up_assessmentDescId').val();
    if (sectionId === "0" || sectionId === '0') {

        showNotificationError("select Section Id", "up_sectionId", "error");
        return;
    }
    else if (assessment === "" || assessment === '') {

        showNotificationError("Enter assessment", "up_assessmentId", "error");
        return;
    }
    else if (upassessmentName === "" || upassessmentName === '') {

        showNotificationError("Enter assessment Name", "up_assessmentNameId", "error");
        return;
    }
    else if (upassessmentDesc === "" || upassessmentDesc === '') {

        showNotificationError("Enter assessment Desc", "up_assessmentDescId", "error");
        return;
    }
    var objJson =
            {"par_condition": "2",
                "assesment_id": assessment,
                "assesment_billingid": sectionId,
                "assesment_name": upassessmentName,
                "assesment_desc": upassessmentDesc,
                "assesment_createdbyid": user_id,
                "assesment_createdbymodid": module_id,
                "assesment_createdbyroleid": role_id}

    var strUrl = Service.saveAssessmentDetails;
    console.log("updateAssessmentDetails details Url is:" + strUrl);
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
                showNotificationError("not updated ", "updateAssessmentDetailsId", "error");
            } else {

                showNotificationError("update Successfully", "updateAssessmentDetailsId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  updateAssessmentDetails');
        }
    });
}

/*@DESC : getAssessmentDetailsList
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getAssessmentDetailsList() {
    $('#assessmentId').empty();
    try {
        var strUrl = Service.getAssessmentDetailsList;
        console.log("getAssessmentDetailsList Url is:" + strUrl);
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

                $('#assessmentId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                       assessment_No_Data_DOM();
                } else {
                    var jsonArray = data.assessmentDetailsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        assessment_DOM(jsonArray);
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
 *@DESC : if data not available in dom this method(assessment_No_Data_DOM) will load
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function assessment_No_Data_DOM() {

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

        $("#assessmentId").append(objDivTag);

    } catch (err) {
        console.log("assessmentId" + err);
    }
}
/*
 *@DESC : assessment_DOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function assessment_DOM(strData) {
    $("#trashId").prop('disabled', true);

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
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].assesment_id + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');
            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].assesment_id);
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].assesment_billingid);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].assesment_billigName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].assesment_name);
            $(tbleRow).append(tablcol5);
            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].assesment_desc);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');

            $(tablcol7).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"></i><i></a> ');

            $(tablcol7).attr('onclick', 'get_RowData("' + strData[i].assesment_id + '","' + strData[i].assesment_billingid + '","' + strData[i].assesment_name + '","' + strData[i].assesment_desc + '","' + strData[i].assesment_billigName + '")');

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');

            $(tablcol8).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol8).attr('onclick', 'deleteSingleAssessment()');

            $(tablcol8).css('height', '5px');

            $(tbleRow).append(tablcol7);
            $(tbleRow).append(tablcol8);
            $(objTBody).append(tbleRow);

        }

        $("#assessmentId").append(objDivTag);


    } catch (err) {
        console.log("sectionTableId" + err);
    }
}
/*
 *@DESC : get_RowData
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function get_RowData(assesment_id, assesment_billingid, assesment_name, assesment_desc, assesment_billigName) {
    $("#up_sectionId option:contains(" + assesment_billigName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_assessmentId").val(assesment_id);
    $("#up_assessmentNameId").val(assesment_name);
    $("#up_assessmentDescId").val(assesment_desc);

}
/*@DESC : deleteSingleAssessment
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteSingleAssessment() {

    var selectedCheckboxvalue = $('#reg_no').val();

    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select assessment id", "selectall", "error");
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
                console.log("selected VEHICLE====" + searchIDs)
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
/*@DESC : deleteAssesmentDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteAssesmentDetails() {

    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "assesment_id": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteAssesmentDetails;
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
                showNotificationError(" not delete ", "deleteid", "error");

            } else {
                showNotificationError("delete Successfully", "deleteid", "success");

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
/*@DESC : multipleAssessmentDelete
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function multipleAssessmentDelete() {
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
        // "scrollY":"400px",
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


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
















function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}


$("#assessment_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#assessmentNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#assessmentDescId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_assessmentDescId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_assessmentNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_assessmentId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
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
