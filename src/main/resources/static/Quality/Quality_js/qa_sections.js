/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {
        GetAllModules();
        SectionsBasedOnModule();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
var token = localStorage.getItem('token');
function GetAllModules() {
    try {
        $('#qa_moduleId').empty();
        $('#search_qa_moduleId').empty();
        $('#up_moduleid').empty();
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
                    $('#qa_moduleId').append(selectfirst);
                    $('#search_qa_moduleId').append(selectfirst);
                    $('#up_moduleid').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
                        $(module).appendTo('#qa_moduleId');
                        $(module).appendTo('#search_qa_moduleId');
                        $(module).appendTo('#up_moduleid');
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
    $('#qa_moduleId').trigger("chosen:updated");
    $('#search_qa_moduleId').trigger("chosen:updated");
    $('#up_moduleid').trigger("chosen:updated");
    $('#qa_moduleId').chosen();
    $('#search_qa_moduleId').chosen();
    $('#up_moduleid').chosen();
}


$('#qa_moduleId').on('change', function() {
    var module_id = $('#qa_moduleId').val();
    getmodulescore(module_id);
    getsumofsectionScore(module_id);
});

function getmodulescore(module_id) {
//    alert("module id " + module_id);
    var module_Score;
    try {
        var strUrl = Service.GET_MODULE_SCORE;
        console.log("GET_SECTIONS_DROPDOWN:::::: " + strUrl);
        var obj_Insert = {
            module_id: module_id
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
                    var jsonArray = data.getModuleScoreResponseControllerDTO;
                    console.log("getmodulescore 1 " + jsonArray);
                    $.each(jsonArray, function(i, resData) {
                        module_Score = resData.module_score;
//                        alert("module_score  " + module_Score);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getmodulescore" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getmodulescore()' + err);
    }
    return module_Score;
}


function getsumofsectionScore(module_id) {
    var sumof_section_score;
//    alert("module id " + module_id);
    try {
        var strUrl = Service.GET_SUM_OF_SECTION_SCORE;
        console.log("GET_SUM_OF_SECTION_SCORE:::::: " + strUrl);
        var obj_Insert = {
            module_id: module_id
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
//                alert("responsecode  " + responsecode);
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getSumOfSectionscoreResponseControllerDTO;
                    console.log("sumof_section_score 1 " + jsonArray);
                    $.each(jsonArray, function(i, resData) {
                        sumof_section_score = resData.sumof_section_score;
//                        alert("sumof_section_score  " + sumof_section_score);
                    });
                }
            },
            error: function(err) {
                console.error("Error in GET_SUM_OF_SECTION_SCORE" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GET_SUM_OF_SECTION_SCORE()' + err);
    }
    return sumof_section_score;
}




function addsection() {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var role_id = localStorage.getItem("Quallity_roleID");
    var qa_moduleId = $('#qa_moduleId').val();
    var mi = getmodulescore(qa_moduleId);

    var m2 = getsumofsectionScore(qa_moduleId);
    var qa_section_nameid = $('#qa_section_nameid').val();
    var qa_section_description_id = $('#qa_section_description_id').val();
    var Section_min_tnaId = $('#Section_min_tnaId').val();
    var section_scoreid = $('#section_scoreid').val();

    var totalSec = parseInt(section_scoreid) + parseInt(m2);


    if (totalSec > mi) {
        alert("Your score is greater than module score");
        return;

    }

    var obj_Insert = {
        "section_name": qa_section_nameid,
        "section_desc": qa_section_description_id,
        "section_score": section_scoreid,
        "section_minimum_tna_score": Section_min_tnaId,
        "section_moduleid": qa_moduleId,
        "createdbyid": user_id,
        "createdbymodid": module_id,
        "createdbyroleid": role_id
    };
    var strUrl = Service.ADD_SECTIONS_FOR_MODULES;
alert(strUrl);
    console.log("ADD_SECTIONS_FOR_MODULES::::: " + strUrl);
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
alert(data);
            if (data !== null || data !== 0) {
                SectionsBasedOnModule();
                $('#registration').modal('toggle');
                resetSectionsInputs();
                showNotificationError("Section Registered Successfully", "addsection_id", "success");
            }
        },
        error: function() {
            console.log("Error In ADD_SECTIONS_FOR_MODULES");
        }
    });
}





function SectionsBasedOnModule() {
    $('#driverTable').html("");
    try {
        var module_id = $('#search_qa_moduleId').val();

        if (module_id === "undefined" || module_id === 'undefined' || module_id === undefined) {
            module_id = 0;
        }
        var obj_Insert = {
            moduleId: module_id
        };
        var strUrl = Service.GET_ALL_REGISTERED_SECTIONS;
        console.log("GET_ALL_REGISTERED_SECTIONS::::: " + strUrl);
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
                    var jsonArray = data.getRegisteredSectionsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadSections(jsonArray);
                        loadDataTable();
//                        $('#deleteid').show();
                    }
                }
            },
            error: function(err) {
                console.error('SectionsBasedOnModule error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in SectionsBasedOnModule()" + JSON.stringify(err))
    }
}



function loadSections(strData) {

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
    $(objTHead5).html('Section Description');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Minimum TNA Score');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Section Score');
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
        $(tablcol120).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].section_id + ' name="case"  )" ><span class="checkmark"> </label>');
//        $(tablcol120).html('<input type="checkbox" class="baselocation" id="ch_baseID" value=' + strData[i].section_id + ' name="section_name"  >');
        $(tbleRow).append(tablcol120);
        $(tablcol120).attr('onclick', 'onclickCheckbox()');
//        $('#selectall').val(strData[i].baselocationId);



        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].module_name);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].section_name);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].section_desc);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].section_minimum_tna);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].section_score);
        $(tbleRow).append(tblCol5);

        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Update");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
        $(buttonTag).attr(
                'onclick',
                'get_RowData("' + strData[i].section_id + '","' + strData[i].section_name + '", "' + strData[i].section_desc + '","' + strData[i].section_score + '","' + strData[i].section_minimum_tna + '", "' + strData[i].section_module_id + '", "' + strData[i].module_name + '")');

        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Delete");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
        $(buttonTag).attr('onclick', 'deleteAllsection()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);


        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}

var sectionid;
function get_RowData(section_id, section_name, section_desc, section_score, section_minimum_tna, section_module_id, module_name) {
    $('#update').modal('show');
//    alert("module name : " + module_name);
    $("#up_moduleid  option:contains(" + module_name + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#up_moduleid').trigger("chosen:updated");
    $('#up_moduleid').chosen();
    $('#up_section_name').val(section_name);
    $('#up_section_description').val(section_desc);
    $('#up_minTnaScoreId').val(section_minimum_tna);
    $('#up_scoreid').val(section_score);
    sectionid = section_id;
}

function updatesection() {
    var up_moduleid = $('#up_moduleid').val();
    var up_section_name = $('#up_section_name').val();
    var up_section_description = $('#up_section_description').val();
    var up_minTnaScoreId = $('#up_minTnaScoreId').val();
    var up_scoreid = $('#up_scoreid').val();
    var section_id = sectionid;

    var obj_Insert = {
        "sectionid": section_id,
        "section_name": up_section_name,
        "section_score": up_scoreid,
        "section_minimum_tna_score": up_minTnaScoreId,
        "section_moduleid": up_moduleid,
        "section_desc": up_section_description
    };
    var strUrl = Service.UPDATE_SECTIONS;
    console.log("UPDATE_SECTIONS::::: " + strUrl);
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
                showNotificationError("Section Updated Successfully", "update_section_id", "success");
                resetUpdateSectionsInputs();
                SectionsBasedOnModule();
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




function deleteAllsection() {
    var selectedCheckboxvalue = $('#reg_no').val();
//    alert("selectedCheckboxvalue------" + selectedCheckboxvalue);
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
            alert("case " + $('.case').prop("checked", true));

            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function() {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#reg_no').val(searchIDs);
        }
    });

}

function deletesection() {
    var section_id = $('#reg_no').val();
    var obj_Insert = {
        "section_id": section_id
    };
    var strUrl = Service.DELETE_SECTIONS;
    console.log("DELETE_SECTIONS::::: " + strUrl);
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
                showNotificationError("Section Deleted Successfully", "deleteid", "success");
                $('#myModal6').modal('toggle');
                SectionsBasedOnModule();

            }
        },
        error: function() {
            console.log("Error In DELETE_SECTIONS");
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
                        title: 'Sections'
                    },
                    {
                        extend: 'pdf',
                        title: 'Sections'
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


function resetQuestionsInputs() {
    $('#add_moduleid').val('0').trigger("chosen:updated");
    $('#fatal_questionid').val('');


}

function resetUpdateSectionsInputs() {
    $('#up_moduleid').val('0').trigger("chosen:updated");
    $('#up_section_name').val('');
    $('#up_section_description').val('');
    $('#up_section_description').val('');
    $('#up_scoreid').val('');
    $('#up_minTnaScoreId').val('');

}







//
//function addCount() {
//    $('#row1').html('');
//    var qa_module_id = $("#qa_moduleId").val();
//    var countt = $("#countid").val();
//    alert("count 11111: " + countt);
////    alert("qa_module_id" + qa_module_id + " " + "count " + count);
//
////    if (qa_module_id === "0") {
////        alert("please Select module");
////    } else if (count === "" || count === "undefined") {
////        alert("please Enter count");
////    } else {
//
//
//    var container = document.getElementById("row1");
//    for (var i = 0; i < countt; i++) {
//
//        alert("count : " + countt);
//        var div1 = document.createElement("div");
//        $(div1).addClass('col-md-6 col-xs-12');
//        var div11 = document.createElement("div");
//        $(div11).addClass('form-group');
//        $(div1).append(div11);
//        var label1 = $("<label>").text('Section Name:');
//        $(div11).append(label1);
//        var div12 = document.createElement("div");
//        $(div12).addClass('col-md-8');
//        $(div11).append(div12);
//        var input1 = document.createElement("input");
//        $(input1).addClass('form-control');
////        $(input1).addClass('attr', 'text');
//        $(input1).html('<input type="text"  id="section_name_id' + i + '" class="form-control">');
//        $(div12).append(input1);
//        $(container).append(div1);
//
//
//        var div2 = document.createElement("div");
//        $(div2).addClass('col-md-6 col-xs-12');
//        var div12 = document.createElement("div");
//        $(div12).addClass('form-group');
//        $(div2).append(div12);
//        var label2 = $("<label>").text('Section Description');
//        $(div12).append(label2);
//        var div13 = document.createElement("div");
//        $(div13).addClass('col-md-8');
//        $(div12).append(div13);
//        var input2 = document.createElement("input");
//        $(input2).addClass('form-control');
////        $(input2).addClass('attr', 'text');
//        $(input2).html('<input type="text"  id="section_description_id' + i + '" class="form-control">');
//        $(div13).append(input2);
//        $(container).append(div2);
//
//
//        var div3 = document.createElement("div");
//        $(div3).addClass('col-md-6 col-xs-12');
//        var div14 = document.createElement("div");
//        $(div14).addClass('form-group');
//        $(div3).append(div14);
//        var label3 = $("<label>").text('Min Score');
//        $(div14).append(label3);
//        var div15 = document.createElement("div");
//        $(div15).addClass('col-md-8');
//        $(div14).append(div15);
//        var input3 = document.createElement("input");
//        $(input3).addClass('form-control');
////        $(input3).addClass('attr', 'text');
//        $(input3).html('<input type="text"  id="min_score_id' + i + '" class="form-control">');
//        $(div15).append(input3);
//        $(container).append(div3);
//
//
//        var div4 = document.createElement("div");
//        $(div4).addClass('col-md-6 col-xs-12');
//        var div15 = document.createElement("div");
//        $(div15).addClass('form-group');
//        $(div4).append(div15);
//        var label4 = $("<label>").text('Score');
//        $(div15).append(label4);
//        var div16 = document.createElement("div");
//        $(div16).addClass('col-md-8');
//        $(div15).append(div16);
//        var input4 = document.createElement("input");
//        $(input4).addClass('form-control');
////        $(input4).addClass('attr', 'text');
//        $(input4).html('<input type="text"  id="max_score_id' + i + '" class="form-control">');
//        $(div16).append(input4);
//        var br = document.createElement("hr");
//        $(div16).append(br);
//        $(container).append(div4);
//
//
//    }
//}

//function addsection() {
//    var s = $("#countid").val();
//    var s1 = $("#section_name_id0").val();
//    alert("s1::::::: " + s1);
//    for (var i = 0; i < s; i++) {
//
//        var myID = '#section_name_id' + i;
//
//        var section_name = $(myID).val();
//        alert("section_name::::::: " + section_name);
//        alert("myID::::::: " + myID);
//
//    }
//
//
//}




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

