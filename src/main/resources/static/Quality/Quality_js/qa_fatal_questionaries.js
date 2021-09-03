/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {
    try {
        GetAllModules();
        SectionFatalQuestionsBasedonModuleid();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

var token = localStorage.getItem('token');

function GetAllModules() {
    try {
        $('#search_moduleId').empty();
        $('#add_moduleid').empty();
        $('#update_moduleid').empty();
        var strUrl = Service.GET_QA_MODULES;
        console.log("QUALITY MODULES_DROPDWON::::: " + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                console.log("responsecode " + data.responseCode);
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getQaModulesResponseCOntrollerDTO;
                    var selectfirst = "<option value='0'>Select Module</option>";
                    $('#search_moduleId').append(selectfirst);
                    $('#add_moduleid').append(selectfirst);
                    $('#update_moduleid').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
                        $(module).appendTo('#search_moduleId');
                        $(module).appendTo('#add_moduleid');
                        $(module).appendTo('#update_moduleid');
                    });
                }
            },
            error: function(err) {
                console.error("Error in GetAllModules" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in baselocationDropDown()' + err);
    }
    $('#search_moduleId').trigger("chosen:updated");
    $('#add_moduleid').trigger("chosen:updated");
    $('#update_moduleid').trigger("chosen:updated");
    $('#search_moduleId').chosen();
    $('#add_moduleid').chosen();
    $('#update_moduleid').chosen();
}


function addFatalQuestions() {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var role_id = localStorage.getItem("Quallity_roleID");
    var qa_moduleId = $('#add_moduleid').val();
    var qa_Question = $('#fatal_questionid').val();
	

    var obj_Insert = {
        "fp_moduleid": qa_moduleId,
        "fp_question": qa_Question,
        "fp_createdbyid": user_id,
        "fp_createdbymodid": module_id,
        "fp_createdbyroleid": role_id
    };
    var strUrl = Service.SAVE_FATAL_QUESTIONS;
    console.log("SAVE_FATAL_QUESTIONS::::: " + strUrl);
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
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
                SectionFatalQuestionsBasedonModuleid();

                $('#registration').modal('toggle');



                showNotificationError("Question Registered Successfully", "addFatalQuestionId", "success");
                resetQuestionsInputs();
            }
        },
        error: function() {
            console.log("Error In SAVE_FATAL_QUESTIONS");
        }
    });
}



function SectionFatalQuestionsBasedonModuleid() {
    $('#driverTable').html("");

    try {
        var module_id = $('#search_moduleId').val();

        if (module_id === "undefined" || module_id === 'undefined' || module_id === undefined) {
            module_id = 0;
        }
        var obj_Insert = {
            fp_moduleid: module_id
        };
        var strUrl = Service.GET_ALL_FATAL_QUESTIONS;
        console.log("GET_ALL_FATAL_QUESTIONS::::: " + strUrl);
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
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#driverTable').append(divTag);
//                    $('#deleteid').hide();
                }
                else {
                    var jsonArray = data.getRegisteredFatalQuestiosResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadFatalQuestions(jsonArray);
                        loadDataTable();
//                        $('#deleteid').show();

                    }
                }
            },
            error: function(err) {
                console.error('SectionFatalQuestionsBasedonModuleid error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in SectionFatalQuestionsBasedonModuleid()" + JSON.stringify(err))
    }
}



function loadFatalQuestions(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag)
            .addClass(
                    'table table-striped table-bordered table-hover dataTables-example');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);


    var objTHead121 = document.createElement("th");
//    $(objTHead121).html('<input type="checkbox" id="selectall" onclick="test()">');

    $(objTHead121).html('<label class="check "><span style=" color: white"></span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');


    $(objTHead121).addClass("text-center");
    $(objTr).append(objTHead121);


    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Module Id');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Module Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Fatal Question');
    $(objTr).append(objTHead5);


    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Update');
    $(objTr).append(objTHead12);

    var objTHead13 = document.createElement('th');
    $(objTHead13).html('Delete');
    $(objTr).append(objTHead13);


    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);


        var tablcol120 = document.createElement("td");
        //value=strData[i].permanentRegisteredNo,

        $(tablcol120).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].fatal_question_id + ' name="case"  )" ><span class="checkmark"> </label>');

//        $(tablcol120).html('<input type="checkbox" class="baselocation" id="ch_baseID" value=' + strData[i].section_id + ' name="section_name"  >');
        $(tbleRow).append(tablcol120);
        $(tablcol120).attr('onclick', 'onclickCheckbox()');
//        $('#selectall').val(strData[i].baselocationId);


        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].fp_moduleid);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].am_modulename);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].fp_question);
        $(tbleRow).append(tblCol3);



        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Update");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
        $(buttonTag).attr(
                'onclick',
                'get_RowData("' + strData[i].fp_moduleid + '","' + strData[i].am_modulename + '", "' + strData[i].fatal_question_id + '","' + strData[i].fp_question + '")');

        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Delete");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
        $(buttonTag).attr('onclick', 'deleteAllFatalQuestions()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);


        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}

var fp_question_id;

function get_RowData(fp_moduleid, am_modulename, fatal_question_id, fp_question) {
    $('#update').modal('show');
    $("#update_moduleid  option:contains(" + am_modulename + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#fatal_question_id').val(fp_question);
    fp_question_id = fatal_question_id;

}

function updateFatalQuestion() {

    var up_moduleid = $('#update_moduleid').val();
    var fatal_question_name_id = $('#fatal_question_id').val();
    var questionid = fp_question_id;

    var obj_Insert = {
        "par_fp_fatalid": questionid,
        "par_fp_moduleid": up_moduleid,
        "par_fp_question": fatal_question_name_id
    };
    var strUrl = Service.UPDATE_FATAL_QUESTIONS;
    console.log("UPDATE_FATAL_QUESTIONS::::: " + strUrl);
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
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
                showNotificationError("Question Updated Successfully", "update_id", "success");
                resetUpdateQuestionInputs();
                SectionFatalQuestionsBasedonModuleid();
                $('#update').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In UPDATE_FATAL_QUESTIONS");
        }
    });
}

//single checkbox reading
function onclickCheckbox() {
    var arrSelectedData = [];
    var count = 0;
    $("input:checkbox[name=case]:checked").each(function() {
        console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " + $(this).val());
        console.log("myCheck12:---" + $(this).val());
        arrSelectedData.push($(this).val());
        count++;
        $('#reg_no').val(arrSelectedData);
    });
    if ($(".case").length === $(".case:checked").length) {
        $("#selectall").prop("checked", true);
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}




function deleteAllFatalQuestions() {
    var selectedCheckboxvalue = $('#reg_no').val();

    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("Select Section", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {

     
        $('#myModal7').modal('show');
    }
}


function multipleCheckBox() {
    $('#reg_no').val('');
    $("#selectall").change(function(event) {
        $('.case').attr('checked', this.checked);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
          

            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function() {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#reg_no').val(searchIDs);
        }
    });

}
function resetQuestionsInputs(){
    $('#add_moduleid').val('0').trigger("chosen:updated");

}
function deleteFatalQuestion() {
    var question_id = $('#reg_no').val();
    var obj_Insert = {
        "fp_question_id": question_id
    };
    var strUrl = Service.DELETE_FATAL_QUESTIONS;
    console.log("DELETE_FATAL_QUESTIONS::::: " + strUrl);
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
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
                showNotificationError("Section Deleted Successfully", "yesId", "success");
                $('#myModal7').modal('toggle');
                SectionFatalQuestionsBasedonModuleid();

            }
        },
        error: function() {
            console.log("Error In DELETE_FATAL_QUESTIONS");
        }
    });
}


function loadDataTable() {
    $('.dataTables-example').DataTable(
            {
                "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
                    [5, 10, 15, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'copy'
                    },
                    {
                        extend: 'csv'
                    },
                    {
                        extend: 'excel',
                        title: 'Fatal Questions'
                    },
                    {
                        extend: 'pdf',
                        title: 'Fatal Questions'
                    },
                    {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');
                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
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


//function resetSectionsInputs() {
//    $('#qa_moduleId').val('0').trigger("chosen:updated");
//    $('#qa_section_nameid').val('');
//    $('#qa_section_nameid').val('');
//    $('#qa_section_description_id').val('');
//    $('#Section_min_tnaId').val('');
//    $('#section_scoreid').val('');
//
//}

function resetUpdateQuestionInputs() {
    $('#par_fp_moduleid').val('0').trigger("chosen:updated");
    $('#par_fp_question').val('');


}

function logout(){
	
	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	console.log("userid====>"+user_id);
	console.log("module_id====>"+module_id);
	console.log("role_id====>"+role_id);
	if(module_id===null&&user_id===null&&role_id===null&&token_id===null){
		window.location.href = Service.redirectToLoginPage;
	}
	}

