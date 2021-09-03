/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    try {
        var tocken = '';
//        $.ajaxSetup({
//            beforeSend: function(xhr) {
//                xhr.setRequestHeader( 'Content-Type','application/json');
//                 xhr.setRequestHeader( 'Accept','application/json');
//                  xhr.setRequestHeader( 'Access-Control-Allow-Origin','*');
//                   xhr.setRequestHeader( 'X-TENANT-ID','PROCREATE');
//                    xhr.setRequestHeader( 'Authorization', 'Bearer '+tocken);
//            }
//        });

//        $.ajaxSetup({
//            headers: {
//            'Content-Type': 'application/json',
//            'Accept': 'application/json',
//            'X-TENANT-ID': 'PROCREATE',
//            'Access-Control-Allow-Origin':'*',
//            'Authorization' :  `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
//            }
//        });
        GetAllModules();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

  var token = localStorage.getItem('token');

//modules
function GetAllModules() {
    $('#driverTable7').html("");
    try {
        var strUrl = Service.GET_MODULES;
      
        console.log("ALL AVAILABLE MODULES SERVICE URL ::::: " + strUrl + "token : " + token);
        $.ajax({
            type: 'GET',
//            "beforeSend": function(xhr) {
//                xhr.setRequestHeader ("Authorization","Bearer " + token);
//            },

            crossDomain: true,
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
                var responsecode = data.responseCode;
                console.log("responsecode " + responsecode);
                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#driverTable7').append(divTag);
                }
                else {
                    var jsonArray = data.getAllModulesResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadDataForModuels(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function(err) {
                console.error('Getting modules error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GetAllModules()" + JSON.stringify(err))
    }
}

function loadDataForModuels(strData) {

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

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Module ID');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Module Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Description');
    $(objTr).append(objTHead5);


    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Score');
    $(objTr).append(objTHead6);

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
        $(tablcol120).html('<label class="check "><input type="checkbox" class="modules" name="user_group" id="ch_moduleid' + i + '" value=' + strData[i].module_Id + ' name="moduleId" )" ><span class="checkmark"> </label>');
        $(tbleRow).append(tablcol120);

//        $(tablcol120).attr('onclick', 'onclickCheckbox( "' + strData[i].module_Id + '","' + strData[i].module_name + '", ' +scrore+ ')');
        $(tablcol120).attr('onclick', 'onclickCheckbox( "' + strData[i].module_Id + '","' + strData[i].module_name + '", "' + $('#id_score' + i + '').val() + '","' + i + '", "' + $('#description_id' + i + '').val() + '")');

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].module_Id);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].module_name);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement("td");
        $(tblCol3).html('<input type="text"  id="description_id' + i + '" class="form-control">');
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement("td");
        $(tblCol4).html('<input type="text"  id="id_score' + i + '" class="form-control">');
        $(tbleRow).append(tblCol4);
        $(objTBody).append(tbleRow);
    }
    $("#driverTable7").append(objDivTag);
}


var selectedValue = [];
function onclickCheckbox(module_Id, module_name, scrore, position, description) {
    $("input:checkbox[name=user_group]:checked").each(function() {
        selectedValue.push(module_Id);
        selectedValue.push(module_name);
        var scoreIndex = $('#id_score' + position + '').val();
        var desciptionIndex = $('#description_id' + position + '').val();
        selectedValue.push(scoreIndex);
        selectedValue.push(desciptionIndex);
        console.log("module_Id------" + module_Id + module_name + scrore + description);
        console.log("scoreIndex--------" + scoreIndex);
    });
    if ($(".modules").length === $(".modules:checked").length) {
        $("#selectall").prop("checked", true);
    }
    else {
        $("#selectall").removeAttr("checked");
    }
}

function multipleCheckBox() {
    $('#reg_no').val('');
    $("#selectall").change(function(event) {
        $('.modules').attr('checked', this.checked);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.modules').prop("checked", true);
            alert("case " + $('.modules').prop("checked", true));
            event.preventDefault();
//            var searchIDs = $(".modules:checkbox:checked").map(function() {
//                console.log("selected VEHICLE====" + searchIDs)
//                return $(this).val();
//            }).get();
//            $('#reg_no').val(searchIDs);
//            alert("selectedValue" + selectedValue);
        }
    });
}

function btnaddOnclick() {
    var selectedvalueSize = selectedValue.length;
    var i;
    for (i = 4; i <= selectedvalueSize; i++) {
        var paticular = selectedValue.slice(0, 4);
        insertQaModule(paticular);
        i = i + 3;
    }
}

function insertQaModule(paticular) {
    savemethod(paticular);
    var paticular = selectedValue.splice(0, 4);

}
function savemethod(paticular) {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var role_id = localStorage.getItem("Quallity_roleID");
    
 

    var arrayValue = paticular;
    moduleId = arrayValue[0];
    console.log("moduleId--" + moduleId);
    moduleName = arrayValue[1];
    console.log("moduleName--" + moduleName);
    score = arrayValue[2];
    console.log("score--" + score);
    description = arrayValue[3];
    console.log("score--" + description);

    var obj_Insert = {
        "module_id": moduleId,
        "modulename": moduleName,
        "module_desc": description,
        "module_score": score,
        "createdbyid": user_id,
        "createdbymodid": module_id,
        "createdbyroleid": role_id
    };
    console.log(JSON.stringify(obj_Insert));
    var strUrl = Service.ADD_QUALITY_MODULES;
    console.log("ADD_QUALITY_MODULES::::: " + strUrl);
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
            if (data !== 0) {
//                showNotificationError("Mandal Registered Successfully", "mandalRegId", "success");
//                $('#myModal1').modal('toggle');
                GetAllModules();
            }
        },
        error: function() {
            console.log("Error In ADD_QUALITY_MODULES");
        }
    });
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
function loadDataTable() {
    $('.dataTables-example').DataTable(
            {
                "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
                    [5, 10, 15, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                ]

            });
}
function resetData(){
GetAllModules();
}
