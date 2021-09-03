/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var token_id ;
$(document).ready(function () {
    try {
    	  token_id = localStorage.getItem("token");
   	   var user_id=localStorage.getItem("userID");
   	   var module_id=localStorage.getItem("sla_moduleID");
   	   var role_id=localStorage.getItem("sla_roleID");

        $("#mulutipleDeleteId").hide();
        getEquipmentDetailsList();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*@DESC : saveEquipmentCreateionDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function saveEquipmentCreateionDetails() {
    var equipment = $('#equipmentId').val();
    var equipmentName = $('#equipmentNameId').val();
    var equipmentDesc = $('#equipmentDescId').val();
    var equipmentType = $('#equipmentTypeId :selected').text();



    if (equipment === "" || equipment === '') {

        showNotificationError("Enter equipment Id", "equipmentId", "error");
        return;
    }
    else if (equipmentName === "" || equipmentName === '') {

        showNotificationError("Enter  equipment Name", "equipmentNameId", "error");
        return;
    }
    else if (equipmentDesc === "" || equipmentDesc === '') {

        showNotificationError("Enter  equipment Desc", "equipmentDescId", "error");
        return;
    }
    else if (equipmentType === "" || equipmentType === '') {

        showNotificationError("Enter equipment Type", "equipmentTypeId", "error");
        return;
    }
 	
    var objJson =
            {"condition": "1",
                "equipmentid": 1,
                "equipmentName": equipmentName,
                "equipmentDesc": equipmentDesc,
                "equipmentType": equipmentType,
                "creeatedbyid": user_id,
                "createdbymodid": module_id,
                "createdbyroleid": role_id}

    var strUrl = Service.saveEquipmentDetails;
    console.log("saveEquipmentCreateionDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "saveEquipmentDetailsId", "error");
            } else {

                showNotificationError("Inserted Successfully", "saveEquipmentDetailsId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveEquipmentCreateionDetails');
        }
    });
}


/*@DESC : getEquipmentDetailsList
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function getEquipmentDetailsList() {
    $('#equipmentTableId').empty();
    try {
        var strUrl = Service.getEquipemtDetails;
        console.log("getEquipmentDetailsList Url is:" + strUrl);
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
                $('#equipmentTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    equipment_No_Data_DOM();

                } else {
                    var jsonArray = data.equipemtResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        equipment_DOM(jsonArray);
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

/*@DESC : equipment_No_Data_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function equipment_No_Data_DOM() {

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
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Equipment Id');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Equipment Name');
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Equipment Desc');
        $(objTr).append(objTHead4);
//For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Equipment Type');
        $(objTr).append(objTHead5);


        //For table Heading5
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Update');
        $(objTr).append(objTHead6);


        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Delete');
        $(objTr).append(objTHead7);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        $(objDivTag).addClass('objDivTag1');
        $(objDivTag).append("NO DATA AVAILABLE");

        $("#equipmentTableId").append(objDivTag);

    } catch (err) {
        console.log("equipmentTableId" + err);
    }
}
/*@DESC : equipment_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function equipment_DOM(strData) {


    //For Div Tag
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
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Equipment Id');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Equipment Name');
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Equipment Desc');
        $(objTr).append(objTHead4);
//For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Equipment Type');
        $(objTr).append(objTHead5);


        //For table Heading5
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Update');
        $(objTr).append(objTHead6);


        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Delete');
        $(objTr).append(objTHead7);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].equipmentId + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);

            $(tablcol1).attr('onclick', 'onclickCheckbox()');

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].equipmentId);
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].equipmentName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].equipmentDesc);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].equipmentType);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');

            $(tablcol6).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"></i><i></a> ');


            $(tablcol6).attr('onclick', 'get_RowData("' + strData[i].equipmentId + '","' + strData[i].equipmentName + '","' + strData[i].equipmentDesc + '","' + strData[i].equipmentType + '")');



            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');

            $(tablcol7).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol7).attr('onclick', 'deleteEquipment()');

            $(tablcol7).css('height', '5px');

            $(tbleRow).append(tablcol6);
            $(tbleRow).append(tablcol7);
            $(objTBody).append(tbleRow);

        }

        $("#equipmentTableId").append(objDivTag);


    } catch (err) {
        console.log("equipmentTableId" + err);
    }
}
function get_RowData(equipmentId, equipmentName, equipmentDesc, equipmentType) {
    $("#upequipmentId").val(equipmentId);
    $("#upequipmentNameId").val(equipmentName);
    $("#upequipmentDescId").val(equipmentDesc);
    //$("#upequipmentTypeId").val(equipmentType);
    $("#upequipmentTypeId option:contains(" + equipmentType + ")").attr('selected', 'selected').trigger("chosen:updated");


}
/*@DESC : updateEquipmentCreateionDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function updateEquipmentCreateionDetails() {
    var equipment = $('#upequipmentId').val();
    var equipmentName = $('#upequipmentNameId').val();
    var equipmentDesc = $('#upequipmentDescId').val();
    var equipmentType = $('#upequipmentTypeId').val();
    if (equipment === "" || equipment === '') {
        showNotificationError("Enter equipment Id", "upequipmentId", "error");
        return;
    }
    else if (equipmentName === "" || equipmentName === '') {

        showNotificationError("Enter  equipment Name", "upequipmentNameId", "error");
        return;
    }
    else if (equipmentDesc === "" || equipmentDesc === '') {

        showNotificationError("Enter  equipment Desc", "upequipmentDescId", "error");
        return;
    }
    else if (equipmentType === "" || equipmentType === '') {

        showNotificationError("Enter equipment Type", "upequipmentTypeId", "error");
        return;
    }
  
    var objJson =
            {"condition": "2",
                "equipmentid": equipment,
                "equipmentName": equipmentName,
                "equipmentDesc": equipmentDesc,
                "equipmentType": equipmentType,
                "creeatedbyid": user_id,
                "createdbymodid": module_id,
                "createdbyroleid": role_id}

    var strUrl = Service.saveEquipmentDetails;
    console.log("saveEquipmentCreateionDetails details Url is:" + strUrl);
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
                showNotificationError("not update ", "upequipmentTypeId", "error");
            } else {

                showNotificationError("update Successfully", "upequipmentTypeId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  updateEquipmentCreateionDetails');
        }
    });
}

/*@DESC : deleteEquipment
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteEquipment() {

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
/*@DESC : deleteEquipemtDetailsData
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-10
 */
function deleteEquipemtDetailsData() {

    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "equipmentid": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteEquipemtDetailsData;
    console.log("deleteEquipemtDetailsData Url is:" + strUrl);
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

            console.log('In Error of  deleteEquipemtDetailsData ');
        }
    })
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