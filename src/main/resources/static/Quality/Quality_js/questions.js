/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    try {
        GetAllModules();
        getQuestionsBasedonsectionANDmodules();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

var token = localStorage.getItem('token');
function GetAllModules() {
    try {
        $('#search_moduleId').empty();
        $('#question_moduleid').empty();
        $('#up_question_moduleid').empty();
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
                    $('#question_moduleid').append(selectfirst);
                    $('#up_question_moduleid').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
                        $(module).appendTo('#search_moduleId');
                        $(module).appendTo('#question_moduleid');
                        $(module).appendTo('#up_question_moduleid');
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
    $('#question_moduleid').trigger("chosen:updated");
    $('#up_question_moduleid').trigger("chosen:updated");
    $('#search_moduleId').chosen();
    $('#question_moduleid').chosen();
    $('#up_question_moduleid').chosen();
}

$('#search_moduleId').on('change', function() {
    var module_id = $('#search_moduleId').val();
    $('#search_section_id').empty();
    getsectionDropdown(module_id, 'search_section_id');
});


$('#question_moduleid').on('change', function() {
    var module_id = $('#question_moduleid').val();
    $('#question_section_id').empty();
    getsectionDropdown(module_id, 'question_section_id');
});


$('#up_question_moduleid').on('change', function() {
    var module_id = $('#up_question_moduleid').val();
    $('#up_section_id').empty();
    getsectionDropdown(module_id, 'up_section_id');
});


function getsectionDropdown(module_id, search_section_id) {
    try {
        var id = '#' + search_section_id;
        $(id).empty();
        var strUrl = Service.GET_SECTIONS_DROPDOWN;
        console.log("GET_SECTIONS_DROPDOWN:::::: " + strUrl);
        var obj_Insert = {
            module_Id: module_id
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
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getAllSectionsResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Section</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var sectionData = "<option value=" + resData.section_id + ">" + resData.section_name + "</option>";
                        $(sectionData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getsectionDropdown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getsectionDropdown()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



$('#question_section_id').on('change', function() {
    var section_id = $('#question_section_id').val();
    getSectionscore(section_id);
    getsumofquestionScore(section_id);
});

function getSectionscore(section_id) {
    var section_Score;
    try {
        var strUrl = Service.GET_SECTION_SCORE;
        console.log("GET_SECTION_SCORE:::::: " + strUrl);
        var obj_Insert = {
            sectionid: section_id
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
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getSectionsScoreResponseControlerDTO;

                    $.each(jsonArray, function(i, resData) {
                        section_Score = resData.section_score;
                    });
                }
            },
            error: function(err) {
                console.error("Error in GET_SECTION_SCORE" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GET_SECTION_SCORE()' + err);
    }

    return section_Score;

}


function getsumofquestionScore(section_id) {
    var sumof_questions_score;
    try {
        var strUrl = Service.GET_SUM_OF_QUESTION_SCORE;
        console.log("GET_SUM_OF_QUESTION_SCORE:::::: " + strUrl);
        var obj_Insert = {
            section_id: section_id
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
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getSumOfQuestionsscoreResponseControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        sumof_questions_score = resData.sumof_question_score;
                    });
                }
            },
            error: function(err) {
                console.error("Error in GET_SUM_OF_QUESTION_SCORE" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GET_SUM_OF_QUESTION_SCORE()' + err);
    }
    return sumof_questions_score;
}

function questionRegistration() {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var role_id = localStorage.getItem("Quallity_roleID");
    var question_moduleid = $('#question_moduleid').val();
    var question_section_id = $('#question_section_id').val();
    var Sectionscore = getSectionscore(question_section_id);
    var sumofquestionScore = getsumofquestionScore(question_section_id);
    var question_name_id = $('#question_name_id').val();
    var question_description_id = $('#question_description_id').val();
    var question_score_id = $('#question_score_id').val();

    var totalQuestionSec = parseInt(question_score_id) + parseInt(sumofquestionScore);

    if (totalQuestionSec > Sectionscore) {
//        alert("Your score is greater than Section score");
        showNotificationError("Your score is greater than Section score", "question_score_id", "error");

        return;

    }
    var obj_Insert = {
        "par_condition": 1,
        "questionid": 0,
        "question_name": question_name_id,
        "question_desc": question_description_id,
        "sectionid": question_section_id,
        "question_score": question_score_id,
        "question_moduleid": question_moduleid,
        "createbyid": user_id,
        "createdbymodid": module_id,
        "createdbyroleid": role_id
    };
    var strUrl = Service.SAVE_UPDATE_QUESTIONS;
    console.log("SAVE_UPDATE_QUESTIONS::::: " + strUrl);
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
                showNotificationError("Question Registered Successfully", "questionRegistration_id", "success");
                resetQuestionInputs();
                getQuestionsBasedonsectionANDmodules();
                $('#registration').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In UPDATE_SECTIONS");
        }
    });
}


function getQuestionsBasedonsectionANDmodules() {
    $('#driverTable').html("");
    try {
        var module_id = $('#search_moduleId').val();
        var section_id = $('#search_section_id').val();

        if (module_id === "undefined" || module_id === 'undefined' || module_id === undefined) {
            module_id = 0;
        }
        if (section_id === "undefined" || section_id === 'undefined' || section_id === undefined) {
            section_id = 0;
        }

        var obj_Insert = {
            question_moduleid: module_id,
            sectionid: section_id
        };


        var strUrl = Service.GET_ALL_REGISTERED_QUESTIONS;
        console.log("GET_ALL_REGISTERED_QUESTIONS::::: " + strUrl);
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
                    var jsonArray = data.getRegisteredQuestiosResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadQuestions(jsonArray);
                        loadDataTable();
//                        $('#deleteid').show();

                    }
                }
            },
            error: function(err) {
                console.error('getQuestionsBasedonsectionANDmodules error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in getQuestionsBasedonsectionANDmodules()" + JSON.stringify(err))
    }
}

function loadQuestions(strData) {

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

//    var objTHead121 = document.createElement("th");
//    $(objTHead121).html('<label class="check "><span style=" color: white"></span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
//    $(objTHead121).addClass("text-center");
//    $(objTr).append(objTHead121);
//    
      var objTHead121 = document.createElement("th");
    $(objTHead121).html('<label class="check "><span style=" color: white"></span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
    $(objTHead121).addClass("text-center");
    $(objTr).append(objTHead121);
    
    

//    var objTHead31 = document.createElement('th');
//    $(objTHead31).html('Baselocation Id');
//    $(objTr).append(objTHead31);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Module Name');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Section Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Question Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Question Description');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Question Score');
    $(objTr).append(objTHead7);

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

        $(tablcol120).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].questionid + ' name="case"  )" ><span class="checkmark"> </label>');
        $(tbleRow).append(tablcol120);
        $(tablcol120).attr('onclick', 'onclickCheckbox()');
//        $('#selectall').val(strData[i].baselocationId);


        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].modulename);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].section_name);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].question_name);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].question_desc);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].question_score);
        $(tbleRow).append(tblCol5);




        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Update");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
        $(buttonTag).attr(
                'onclick',
                'get_RowData("' + strData[i].question_moduleid + '","' + strData[i].modulename + '", "' + strData[i].sectionid + '","' + strData[i].section_name + '","' + strData[i].questionid + '", "' + strData[i].question_name + '", "' + strData[i].question_desc + '", "' + strData[i].question_score + '")');
        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Delete");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
        $(buttonTag).attr('onclick', 'deleteAllquestions()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);


        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}



var question_id;
function get_RowData(question_moduleid, modulename, sectionid, section_name, questionid, question_name, question_desc, question_score) {
    $('#update').modal('show');
 
    $("#up_question_moduleid  option:contains(" + modulename + ")").attr('selected', 'selected').trigger("chosen:updated");

    getsectionDropdown(question_moduleid, 'up_section_id');
    $("#up_section_id  option:contains(" + section_name + ")").attr('selected', 'selected').trigger("chosen:updated");

    $('#up_question_name_id').val(question_name);
    $('#up_question_description_id').val(question_desc);
    $('#up_question_score_id').val(question_score);
    question_id = questionid;
}


function updatequestion() {
   
    var up_question_moduleid = $('#up_question_moduleid').val();
    var up_section_id = $('#up_section_id').val();
    var up_question_name_id = $('#up_question_name_id').val();
    var up_question_description_id = $('#up_question_description_id').val();
    var up_question_score_id = $('#up_question_score_id').val();
    var questionid = question_id;

    var obj_Insert = {
        "par_condition": 2,
        "questionid": questionid,
        "question_name": up_question_name_id,
        "question_desc": up_question_description_id,
        "sectionid": up_section_id,
        "question_score": up_question_score_id,
        "question_moduleid": up_question_moduleid,
        "createbyid": 0,
        "createdbymodid": 0,
        "createdbyroleid": 0
    };
    var strUrl = Service.SAVE_UPDATE_QUESTIONS;
    console.log("SAVE_UPDATE_QUESTIONS::::: " + strUrl);
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
//                showNotificationError("Baselocation Updated Successfully", "up_baselocationId", "success");
//                BaselocationData();
                getQuestionsBasedonsectionANDmodules();
                $('#update').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In UPDATE_SECTIONS");
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




function deleteAllquestions() {
    var selectedCheckboxvalue = $('#reg_no').val();
   
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("Select Section", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#myModal6').modal('show');
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





function deletequestions() {
    var question_id = $('#reg_no').val();
    var obj_Insert = {
        "questionid": question_id
    };
    var strUrl = Service.DELETE_QUESTIONS;
    console.log("DELETE_QUESTIONS::::: " + strUrl);
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
                showNotificationError("Question Deleted Successfully", "yesdeleteId", "success");
                $('#myModal6').modal('toggle');
                getQuestionsBasedonsectionANDmodules();

            }
        },
        error: function() {
            console.log("Error In DELETE_QUESTIONS");
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
                        title: 'Questions'
                    },
                    {
                        extend: 'pdf',
                        title: 'Questions'
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


function resetQuestionInputs() {
    $('#question_moduleid').val('0').trigger("chosen:updated");
    $('#question_section_id').val('0').trigger("chosen:updated");
    $('#question_name_id').val('');
    $('#question_description_id').val('');
    $('#question_score_id').val('');

}

function resetData(){
 $('#question_moduleid').val('0').trigger("chosen:updated");
    $('#question_section_id').val('0').trigger("chosen:updated");

}

function resetUpdateQuestionInputs() {
    $('#up_question_moduleid').val('0').trigger("chosen:updated");
    $('#up_section_id').val('0').trigger("chosen:updated");
    $('#up_question_name_id').val('');

    $('#up_question_description_id').val('');
    $('#up_question_score_id').val('');


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
