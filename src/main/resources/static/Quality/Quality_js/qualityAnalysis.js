/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

    try {
        GetAllModules();
        qualityAnalysisQueue();
getFatalIndicator();
getTnaIndicator();
        
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

var token = localStorage.getItem('token');
function GetAllModules() {
    try {
        $('#module_id').empty();
        var strUrl = Service.GET_QA_MODULES;

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
                    $('#module_id').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
                        $(module).appendTo('#module_id');

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
    $('#module_id').trigger("chosen:updated");
    $('#module_id').chosen();

}

$('#module_id').on('change', function() {
    var module_id = $('#module_id').val();
    $('#agent_id').empty();
    getusersBasedonModuleId(module_id, 'agent_id');
});


function getusersBasedonModuleId(module_id, agent_id) {
    try {
        var id = '#' + agent_id;
        $(id).empty();
        var strUrl = Service.QUALITY_USERS;
        console.log("QUALITY_USERS:::::: " + strUrl);
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
                    var jsonArray = data.getUsersBasedonModuleIdResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Agent</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var sectionData = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
                        $(sectionData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in QUALITY_USERS" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in QUALITY_USERS()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



var module_ID;
function qualityAnalysisQueue() {

    $('#driverTable').html("");
    try {
        var module_id = $('#module_id').val();
        module_ID = module_id;


        if (module_id === 0 || module_id === '0') {
            showNotificationError("Please Select Module Id", "module_id", "error");
        }
        var agent_id = $('#agent_id').val();
        var startdate_id = $('#startdate_id').val();
        var end_date_id = $('#end_date_id').val();
        var aht_id = $('#aht_id').val();
//        alert(" module_id " + module_id);
        if (module_id === "0" || module_id === '0' || module_id === 0) {
            module_id = null;
            console.log(" module_id " + module_id);
        }
        if (agent_id === "0" || agent_id === '0' || agent_id === 0) {
            agent_id = null;
            console.log(" agent_id " + agent_id);
        }



        if (startdate_id === "undefined" || startdate_id === 'undefined' || startdate_id === undefined || startdate_id === "") {
            startdate_id = null;
            console.log(" startdate_id " + startdate_id);
        }
        if (end_date_id === "undefined" || end_date_id === 'undefined' || end_date_id === undefined || end_date_id === "") {
            end_date_id = null;
            console.log(" end_date_id " + end_date_id);
        }
        if (aht_id === "undefined" || aht_id === 'undefined' || aht_id === undefined || aht_id === "") {
            aht_id = null;
            console.log(" aht_id " + aht_id);

        }


        var obj_Insert = {
            "par_co_agentid": agent_id,
            "par_moduleid": module_id,
            "par_start_date": startdate_id,
            "par_end_date": end_date_id,
            "par_aht": aht_id
        };
        var strUrl = Service.QUALITYANALYSIS_QUEUE;
        console.log("QUALITYANALYSIS_QUEUE::::: " + JSON.stringify(strUrl));
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
               // "Authorization": 'Bearer ' + token,
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
                    var jsonArray = data.qualityAnalysisQueueResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadQAQueue(jsonArray);
                        loadDataTable();
//                        $('#deleteid').show();
                    }
                }
            },
            error: function(err) {
                console.error('qualityAnalysisQueue error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in qualityAnalysisQueue()" + JSON.stringify(err))
    }
}


var event_time;
var caller_number;
var call_typeId;
var callType;
var agent_id;
function loadQAQueue(strData) {

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

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Enent ID');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Event Date');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Call Type');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Agent Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('AHT ');
    $(objTr).append(objTHead7);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Assessment');
    $(objTr).append(objTHead12);

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

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].eventid);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].event_date);
        event_time = strData[i].event_date;
        $(tbleRow).append(tblCol2);

        caller_number = strData[i].caller_no;
        call_typeId = strData[i].call_type_id;
        callType = strData[i].call_type;
        agent_id = strData[i].par_co_agentid;

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].call_type);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].co_agent_name);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].par_aht);
        $(tbleRow).append(tblCol5);

        var tablcol11 = document.createElement("td");
        var button1 = document.createElement('button');
        $(button1).addClass('btn btn-blue w-100 btn-sm fa fa-arrow-right');
        $(button1).attr('type', 'button');
        $(button1).html('Assesment');
        $(button1).attr(
                'onclick',
                'get_RowData("' + strData[i].eventid + '", "' + strData[i].co_agent_name + '", "' + strData[i].eventid + '", "' + strData[i].co_agent_name + '")');
        $(tablcol11).append(button1);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);
        $(objTBody).append(tbleRow);

    }
    $("#driverTable").append(objDivTag);
}


function get_RowData(eventid, co_agent_name, eventid, co_agent_name) {

    console.log("eventid " + eventid, " co_agent_name " + co_agent_name);
    $('#assessmentView').modal('show');
    $("#agent_name_id").val(co_agent_name);
    $("#event_id").val(eventid);
}





var sectionscount;
var sectiondata;
function getSections() {
    try {
        var module_id = $('#module_id').val();
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
                    sectiondata = data.getAllSectionsResponseControllerDTO;
                    sectionscount = data.getAllSectionsResponseControllerDTO;
                    tableData(sectiondata);
                }
            },
            error: function(err) {
                console.error("Error in getsectionDropdown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getsectionDropdown()' + err);
    }
}





$('#assessmentView').on('shown.bs.modal', function(e) {
    getSections();
    fatalUI();
    icons();
    fatalIcons();
});

function tableData(sectiondata) {
    $('#accordion').html('');
    for (var i = 0; i < sectiondata.length; i++) {
        var sectionid = sectiondata[i].section_id;
        var section_name = sectiondata[i].section_name;
        sections(sectionid, section_name, i);
    }
}


function sections(sectionid, section_name, index) {
    var divTag1 = document.createElement('div');
    $(divTag1).addClass('panel panel-info');

    var divTag2 = document.createElement('div');
    $(divTag2).addClass('panel-heading');
    $(divTag2).appendTo(divTag1);

    var headTag1 = document.createElement('h4');
    $(headTag1).addClass('panel-title');
    $(headTag1).appendTo(divTag2);

    var aTag1 = document.createElement('a');
    $(aTag1).attr('data-toggle', 'collapse');
    $(aTag1).attr('data-parent', '#accordion');
    $(aTag1).attr('href', '#collapseOne' + index);

    $(aTag1).html(section_name);
    var sectionName = section_name;
    $(aTag1).attr('onclick', 'getquestions("' + sectionid + '","' + index + '","' + sectionName + '")');
    $(aTag1).appendTo(headTag1);

    var iTag1 = document.createElement('i');
    $(iTag1).addClass('fa icon fa-chevron-down');
    $(iTag1).appendTo(aTag1);

//parent
    var divTag3 = document.createElement('div');
    $(divTag3).attr('id', 'collapseOne' + index);
    $(divTag3).addClass('panel-collapse collapse');
    $(divTag3).appendTo(divTag1);

    var divTag4 = document.createElement('div');
    $(divTag4).addClass('panel-body');

    var divTag5 = document.createElement('div');
    $(divTag5).addClass('wrapper wrapper-content');

    var divTag6 = document.createElement('div');
    $(divTag6).addClass('container');

    var divTag7 = document.createElement('div');
    $(divTag7).addClass('col-md-12 col-xs-12');
    $(divTag7).attr('id', 'driverTable2' + index);
    $(divTag7).attr('style', 'width: 102%;margin-left: -44px;');
    $(divTag7).appendTo(divTag6);
    $(divTag6).appendTo(divTag5);
    $(divTag5).appendTo(divTag4);
    $(divTag4).appendTo(divTag3);

    $("#accordion").append(divTag1);
}


var jsonArray;
function getquestions(sectionid, index, sectionName) {
    var id = "driverTable2" + index;
    $('#' + id).html("");
    try {
        var obj_Insert = {
            "sectionid": sectionid
        };
        var strUrl = Service.GET_QUESTION_BASED_ON_SECTION_ID;
        console.log("GET_QUESTION_BASED_ON_SECTION_ID::::: " + JSON.stringify(strUrl));
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
                    $('#' + id).append(divTag);
//                    $('#deleteid').hide();
                }
                else {
                    jsonArray = data.getQuestiosResponseControllerDTO;

                    if (jsonArray.length > 0) {
                        loadMasterData(jsonArray, id, index, sectionid, sectionName);
//                        $('#deleteid').show();
                    }
                }
            },
            error: function(err) {
                console.error('GET_QUESTION_BASED_ON_SECTION_ID error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GET_QUESTION_BASED_ON_SECTION_ID()" + JSON.stringify(err))
    }
}


function loadMasterData(strData, tableId, tableindex, sectionid, sectionName) {
    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');


    var objTableTag = document.createElement('table');
    $(objTableTag).attr('id', 'tblAnalysis' + tableindex);
    $(objTableTag).addClass('table table-striped table-bordered table-hover dataTables-example');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Questions');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Assement(YES/NO)');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Score');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Remarks');
    $(objTr).append(objTHead7);

    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    var buttonTag = document.createElement('button');
    $(buttonTag).attr('type', 'button');
    $(buttonTag).attr('data-toggle', 'modal');
    $(buttonTag).attr('style', 'margin-left: 510px;');
    $(buttonTag).attr('id', 'save_id' + tableindex);
    $(buttonTag).addClass('btn btn-blue w-100 btn-sm');
    $(buttonTag).html("Save");
    $(buttonTag).attr('onclick', 'save( "' + sectionid + '","' + sectionName + '", "' + tableindex + '")');
    $(buttonTag).appendTo(objDivTag);



    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');
        $(tbleRow).attr('id', 'rowID"' + i + '"');
        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');

        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].question_name);
        $(tbleRow).append(tblCol2);

        var tagTd = document.createElement("td");
        $(tagTd).appendTo(tbleRow);

        var tagDivRow = document.createElement("div");
        $(tagDivRow).addClass('row');

        $(tagDivRow).appendTo(tagTd);

        var tagDivCol6 = document.createElement("div");
        $(tagDivCol6).addClass('col-md-6');
        $(tagDivCol6).attr('style', 'width: 140%');
        $(tagDivCol6).appendTo(tagDivRow);


        var tagDivCol31 = document.createElement("div");
        $(tagDivCol31).addClass('col-md-3');
        $(tagDivCol31).appendTo(tagDivCol6);


        var labelTag = document.createElement("label");
        $(labelTag).addClass('container radiocontainer');
        $(labelTag).attr('style', 'width: 70px;');
       
        $(labelTag).html('Yes');
        $(labelTag).appendTo(tagDivCol31);


        var inputTag = document.createElement("input");
        $(inputTag).attr('type', 'radio');
        $(inputTag).attr('name', 'radio"' + i + '"');
        $(inputTag).attr('onclick', 'yesbuttonOnlick("' + strData[i].questionid + '","' + i + '", "' + tableindex + '")');
        $(inputTag).appendTo(labelTag);

        var spanTag = document.createElement('span');
        $(spanTag).addClass('checkmark ch');
        $(spanTag).appendTo(labelTag);


        var tagDivCol32 = document.createElement("div");
        $(tagDivCol32).addClass('col-md-3');
        $(tagDivCol32).appendTo(tagDivCol6);


        var labelTag1 = document.createElement("label");
        $(labelTag1).addClass('container radiocontainer');
        $(labelTag1).attr('style', 'width: 50px;');
        $(labelTag1).html('No');
        $(labelTag1).appendTo(tagDivCol32);




        var inputTag1 = document.createElement("input");
        $(inputTag1).attr('type', 'radio');
        $(inputTag1).attr('name', 'radio"' + i + '"');
        $(inputTag1).attr(
                'onclick',
                'nobuttonOnlick("' + i + '", "' + tableindex + '")');
        $(inputTag1).attr('id', 'yesNO' + i + '');
        $(inputTag1).appendTo(labelTag1);


        var spanTag1 = document.createElement('span');
        $(spanTag1).addClass('checkmark ch');
        $(spanTag1).appendTo(labelTag1);


        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).attr('id', 'score' + i + '');
        $(tblCol3).html("select YES/NO");
        $(tblCol3).attr('style', 'color: red');
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement("td");
        $(tblCol4).html('<input type="text"  id="question_remarks' + i + '" class="form-control">');
        $(tbleRow).append(tblCol4);

        $(objTBody).append(tbleRow);
    }
    $('#' + tableId).append(objDivTag);
}



function nobuttonOnlick(row_id, tableindex) {
    row_id = parseInt(row_id) + 1;
    $('#tblAnalysis' + tableindex).find('tr:eq(' + row_id + ')').find('td:eq(3)').html(0);
}

function yesbuttonOnlick(question_id, row_id, tableindex) {
    row_id = parseInt(row_id) + 1;
    var score = getQuestionScore(question_id);
    $('#tblAnalysis' + tableindex).find('tr:eq(' + row_id + ')').find('td:eq(3)').html(score);
}




function save(sectionid, sectionName, tableindex) {
    var questinscore = 0;
    console.log("jsonArray  : " + JSON.stringify(jsonArray));
    for (var i = 0; i < jsonArray.length; i++) {
        var section_id = sectionid;
        var section_name = sectionName;
        var question_id = jsonArray[i].questionid;
        var question_name = jsonArray[i].question_name;
        questinscore = parseFloat($('#tblAnalysis' + tableindex).find('tr:eq(' + (parseInt(i) + 1) + ')').find('td:eq(3)').html());
        var question_remarks = $('#question_remarks' + i).val();
        var qa = $('#tblAnalysis' + tableindex).find('tr:eq(' + (parseInt(i) + 1) + ')').find('td:eq(3)').html()
        if (qa === "select YES/NO") {
            showNotificationError("Select YES/NO", "yesNO" + (parseInt(i) + 1), "error");
        } else {
            saveAnalysisData(section_id, section_name, question_id, question_name, questinscore, question_remarks, tableindex);
        }
        console.log("questinscore " + questinscore);
    }
}


function fatalUI() {
    $('#accordion2').html('');
    var divTag1 = document.createElement('div');
    $(divTag1).addClass('panel panel-info');

    var divTag2 = document.createElement('div');
    $(divTag2).addClass('panel-heading');
    $(divTag2).appendTo(divTag1);

    var headTag1 = document.createElement('h4');
    $(headTag1).addClass('panel-title');
    $(headTag1).appendTo(divTag2);

    var aTag1 = document.createElement('a');
    $(aTag1).attr('data-toggle', 'collapse');
    $(aTag1).attr('data-parent', '#accordion');
    $(aTag1).attr('href', '#collapseOne');

    $(aTag1).html('Fatal Questions');
    $(aTag1).attr('onclick', 'getFatalquestions()');
    $(aTag1).appendTo(headTag1);

    var iTag1 = document.createElement('i');
    $(iTag1).addClass('fa icon fa-chevron-down');
    $(iTag1).appendTo(aTag1);

    var divTag3 = document.createElement('div');
    $(divTag3).attr('id', 'collapseOne');
    $(divTag3).addClass('panel-collapse collapse');
    $(divTag3).appendTo(divTag1);

    var divTag4 = document.createElement('div');
    $(divTag4).addClass('panel-body');

    var divTag5 = document.createElement('div');
    $(divTag5).addClass('wrapper wrapper-content');

    var divTag6 = document.createElement('div');
    $(divTag6).addClass('container');

    var divTag7 = document.createElement('div');
    $(divTag7).addClass('col-md-12 col-xs-12');
    $(divTag7).attr('id', 'driverTable3');
    $(divTag7).attr('style', 'width: 102%;margin-left: -44px;');
    $(divTag7).appendTo(divTag6);
    $(divTag6).appendTo(divTag5);
    $(divTag5).appendTo(divTag4);
    $(divTag4).appendTo(divTag3);



    $("#accordion2").append(divTag1);
}


function icons() {
    for (var i = 0; i < sectionscount.length; i++) {
        sectioncollapseid = $('#collapseOne' + i);
        sectioncollapseid.on('show.bs.collapse hidden.bs.collapse', function() {
            $(this).prev().find('.fa').toggleClass('fa-chevron-down fa-chevron-up');
        });
    }
}

var fatalData;
function getFatalquestions() {
    var module_id = $('#module_id').val();
    $('#driverTable3').html("");
    try {
        var obj_Insert = {
            "module_id": module_id
        };
        var strUrl = Service.FATAL_QUESTIONS_FOR_ANALYSIS;
        console.log("FATAL_QUESTIONS_FOR_ANALYSIS::::: " + JSON.stringify(strUrl));
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
                    $('#driverTable3').append(divTag);
//                    $('#deleteid').hide();
                }
                else {
                    fatalData = data.getFatalQuestionResponseControllerDTO;
                    if (fatalData.length > 0) {
                        loadFatalMasterData(fatalData);
//                        $('#deleteid').show();
                    }
                }
            },
            error: function(err) {
                console.error('FATAL_QUESTIONS_FOR_ANALYSIS error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in FATAL_QUESTIONS_FOR_ANALYSIS()" + JSON.stringify(err))
    }
}


function loadFatalMasterData(strData) {
//    alert("inside ");
    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag).attr('id', 'tblFatalAnalysis');
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

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Questions');
    $(objTr).append(objTHead3);


    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Assement(YES/NO)');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Fatal Indicator');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Remarks');
    $(objTr).append(objTHead7);

    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    var buttonTag = document.createElement('button');
    $(buttonTag).attr('type', 'button');
    $(buttonTag).attr('data-toggle', 'modal');
    $(buttonTag).attr('style', 'margin-left: 510px;');
    $(buttonTag).attr('id', 'saveFatalQuestions_id');
    $(buttonTag).addClass('btn btn-blue w-100 btn-sm');
    $(buttonTag).html("Save");
    $(buttonTag).attr('onclick', 'saveFatalQuestionsAnalysisData()');
    $(buttonTag).appendTo(objDivTag);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');
        $(tbleRow).attr('id', 'rowID"' + i + '"');
        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');

        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].fatalQuestion);
        $(tbleRow).append(tblCol1);

        var tagTd = document.createElement("td");
        $(tagTd).appendTo(tbleRow);

        var tagDivRow = document.createElement("div");
        $(tagDivRow).addClass('row');

        $(tagDivRow).appendTo(tagTd);

        var tagDivCol6 = document.createElement("div");
        $(tagDivCol6).addClass('col-md-6');
        $(tagDivCol6).attr('style', 'width: 140%');
        $(tagDivCol6).appendTo(tagDivRow);


        var tagDivCol31 = document.createElement("div");
        $(tagDivCol31).addClass('col-md-3');
        $(tagDivCol31).appendTo(tagDivCol6);


        var labelTag = document.createElement("label");
        $(labelTag).addClass('container radiocontainer');
        $(labelTag).attr('style', 'width: 100px;');
        $(labelTag).html('Yes');
        $(labelTag).appendTo(tagDivCol31);


        var inputTag = document.createElement("input");
        $(inputTag).attr('type', 'radio');
        $(inputTag).attr('name', 'radio"' + i + '"');
        $(inputTag).attr('onclick', 'yesbtnfatalIndicator("' + i + '")');
        $(inputTag).appendTo(labelTag);

        var spanTag = document.createElement('span');
        $(spanTag).addClass('checkmark ch');
        $(spanTag).appendTo(labelTag);


        var tagDivCol32 = document.createElement("div");
        $(tagDivCol32).addClass('col-md-3');
        $(tagDivCol32).appendTo(tagDivCol6);


        var labelTag1 = document.createElement("label");
        $(labelTag1).addClass('container radiocontainer');
        $(labelTag1).attr('style', 'width: 50px;');
        $(labelTag1).html('No');
        $(labelTag1).appendTo(tagDivCol32);


        var inputTag1 = document.createElement("input");
        $(inputTag1).attr('type', 'radio');
        $(inputTag1).attr('name', 'radio"' + i + '"');
        $(inputTag1).attr(
                'onclick',
                'nobtnfatalIndicator("' + i + '")');

        $(inputTag1).appendTo(labelTag1);


        var spanTag1 = document.createElement('span');
        $(spanTag1).addClass('checkmark ch');
        $(spanTag1).appendTo(labelTag1);


        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).attr('id', 'fatalIndicator' + i + '');
        // $(tblCol3).attr('id="score' + i + '"');
        $(tblCol8).html(0);
        $(tbleRow).append(tblCol8);


        var tblCol4 = document.createElement("td");
        $(tblCol4).html('<input type="text"  id="ft_question_remarks' + i + '" class="form-control">');
        $(tbleRow).append(tblCol4);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable3").append(objDivTag);
}


function nobtnfatalIndicator(row_id) {
    row_id = parseInt(row_id) + 1;
    $('#tblFatalAnalysis').find('tr:eq(' + row_id + ')').find('td:eq(3)').html(0);
}


function yesbtnfatalIndicator(position) {
    var positionn = parseInt(position) + 1;
    $('#tblFatalAnalysis').find('tr:eq(' + positionn + ')').find('td:eq(3)').html(1);
}


function fatalIcons() {
    var id = $('#collapseOne');
    id.on('show.bs.collapse hidden.bs.collapse', function() {
        $(this).prev().find('.fa').toggleClass('fa-chevron-down fa-chevron-up');
    });
}



function getQuestionScore(question_id) {
    var question_score;
    try {
        var strUrl = Service.GET_QUEsTION_WISE_SCORE;
        console.log("GET_QUEsTION_WISE_SCORE:::::: " + strUrl);
        var obj_Insert = {
            question_id: question_id
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
                    var score = data.output;
                    question_score = score;
                }
            },
            error: function(err) {
                console.error("Error in GET_QUEsTION_WISE_SCORE" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GET_QUEsTION_WISE_SCORE()' + err);
    }
    return question_score;
}




function saveAnalysisData(section_id, section_name, question_id, question_name, questinscore, question_remarks, tableindex) {
    console.log("section_id " + section_id + "section_name " + section_name + "question_id " + question_id + "question_name " + question_name);

    var section_id = section_id;
    var section_name = section_name;
    var question_id = question_id;
    var question_name = question_name;
    var agent_name = $('#agent_name_id').val();
    var event_id = $("#event_id").val();
    var event_dtm = event_time;
    var caller_no = caller_number;
    var call_type_id = call_typeId;
    var call_type = callType;
    var agentId = agent_id;
    console.log("event_dtm : " + event_dtm);
    console.log(" caller_number : " + caller_no);
    console.log(" call_type_id : " + call_type_id);
    console.log(" call_type : " + call_type);
    console.log(" agentId : " + agentId);
    var module_id = $('#module_id').val();
    var module_name = $('#module_id option:selected').text();
    console.log("moudule name : " + module_name);
    var questionScore = questinscore;
    console.log("questionScore : " + questionScore);
    var questionRemarks = question_remarks;
    console.log("question_remarks : " + question_remarks);
    var created_user_id = localStorage.getItem("userID");
    var created_module_id = localStorage.getItem("Quallity_moduleID");
    var created_role_id = localStorage.getItem("Quallity_roleID");
 
    var obj_Insert = {
        "eventid": event_id,
        "event_dtm": event_dtm,
        "caller_mumber": caller_no,
        "calltypeid": call_type_id,
        "calltype_name": call_type,
        "chiefcomplaint_id": 2,
        "chiefcomplaint_name": "chiefcomplaint_name",
        "question_id": question_id,
        "question_name": question_name,
        "section_id": section_id,
        "section_name": section_name,
        "question_score": questionScore,
        "question_remarks": questionRemarks,
        "agentid": agentId,
        "agent_name": agent_name,
        "shiftid": 1,
        "shift_name": "shift_name",
        "shiftmanagerid": 1,
        "shiftmanager_name": "shiftmanager_name",
        "tl_i": 1,
        "tl_name": "tl_name",
        "qa_moduleid": module_id,
        "qa_module_name": module_name,
        "createdbyid": created_user_id,
        "createdbymodid": created_module_id,
        "createdbyroleid": created_role_id,
    };
    var strUrl = Service.QUALITY_ANALYSIS;
    console.log("QUALITY_ANALYSIS::::: " + strUrl);
    console.log("QUALITY_ANALYSIS INPUTS::::: " + JSON.stringify(obj_Insert));
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

                showNotificationError("Data Submitted successfully", "save_id" + tableindex, "success");
            }
        },
        error: function() {
            console.log("Error In QUALITY_ANALYSIS");
        }
    });
}




function saveFatalQuestionsAnalysisData() {

    for (var i = 0; i < fatalData.length; i++) {
        var fatal_ques_id = fatalData[i].fatalquestion_id;
        var fatal_indicator = parseInt($('#tblFatalAnalysis').find('tr:eq(' + (parseInt(i) + 1) + ')').find('td:eq(3)').html());
        var fatal_question_remarks = $('#ft_question_remarks' + i).val();
        insertDataOfFatalAnalysis(fatal_ques_id, fatal_indicator, fatal_question_remarks);
    }

}


function insertDataOfFatalAnalysis(fatal_ques_id, fatal_indicator, fatal_question_remarks) {
    var event_id = $("#event_id").val();
    var fatal_ques_id = fatal_ques_id;
    var fatal_indicator = fatal_indicator;
    var fatal_question_remarks = fatal_question_remarks;
    var created_user_id = localStorage.getItem("userID");
    var created_module_id = localStorage.getItem("Quallity_moduleID");
    var created_role_id = localStorage.getItem("Quallity_roleID");
 
    var obj_Insert = {
        "eventid": event_id,
        "fatal_ques_id": fatal_ques_id,
        "fatal_indicator": fatal_indicator,
        "fatal_question_remarks": fatal_question_remarks,
        "createdbyid": created_user_id,
        "createdbymodid": created_module_id,
        "createdbyroleid": created_role_id
    };


    var strUrl = Service.SAVE_FATAL_QUALITY_ANALYSIS;
    console.log("SAVE_FATAL_QUALITY_ANALYSIS::::: " + strUrl);
    console.log("SAVE_FATAL_QUALITY_ANALYSIS INPUTS::::: " + JSON.stringify(obj_Insert));
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
                showNotificationError("Fatal Questions submitted Successfully", "saveFatalQuestions_id", "success");
            }
        },
        error: function() {
            console.log("Error In SAVE_FATAL_QUALITY_ANALYSIS");
        }
    });
}
function getFatalIndicator(){

try {
        $('#fatalIndicatorid').empty();
        var strUrl = Service.Get_Fatal_Indicator;

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
                    var jsonArray = data.getFatalIndicatorResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Module</option>";
                    $('#fatalIndicatorid').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.fatalId + ">" + resData.fatalName + "</option>";
                        $(module).appendTo('#fatalIndicatorid');

                    });
                }
            },
            error: function(err) {
                console.error("Error in getFatalIndicator" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getFatalIndicator()' + err);
    }
    $('#fatalIndicatorid').trigger("chosen:updated");
    $('#fatalIndicatorid').chosen();

}
function getTnaIndicator(){

try {
        $('#tnaIndicatorsid').empty();
        var strUrl = Service.Get_TNA_Indicator;

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
                    var jsonArray = data.getFatalIndicatorResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Module</option>";
                    $('#tnaIndicatorsid').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var module = "<option value=" + resData.tna_indicatorid + ">" + resData.tna_indicator_name + "</option>";
                        $(module).appendTo('#tnaIndicatorsid');

                    });
                }
            },
            error: function(err) {
                console.error("Error in getTnaIndicator" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getTnaIndicator()' + err);
    }
    $('#tnaIndicatorsid').trigger("chosen:updated");
    $('#tnaIndicatorsid').chosen();

}


function SaveQualityAnalysisData() {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var role_id = localStorage.getItem("Quallity_roleID");
    var fatalIndicator=$('#fatalIndicatorid').val();
   var tnaIndicator=$('#tnaIndicatorsid').val();
  var event_id=$('#event_id').val();



    var obj_Insert = {
        "eventid": event_id,
        "caller_num": event_id,
        "tna_indicator": tnaIndicator,
        "fatal_indicator": fatalIndicator,

        "createdbyid": user_id,
        "createdbymodid": module_id,
        "createdbyroleid": role_id,
       
    };
    console.log(JSON.stringify(obj_Insert));
    var strUrl = Service.Save_Quality_Analysis_Data;
    console.log("SaveQualityAnalysisData::::: " + strUrl);
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
                "Authorization": 'Bearer ' + token,
            },
        success: function(data) {

            if (data.responseCode == 200||data.responseCode == "200") {

                showNotificationError("Save Successfully", "analysis_id", "success");

    }
        },
        error: function() {
            console.log("Error In SaveQualityAnalysisData");
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
                        title: 'Queue'
                    },
                    {
                        extend: 'pdf',
                        title: 'Queue'
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

function resetData(){
    $('#module_id').val('0').trigger("chosen:updated");
    $('#agent_id').val('0').trigger("chosen:updated");
    $('#aht_id').val('');
    $('#startdate_id').val('');
    $('#end_date_id').val('');
}
