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
        getSlaReport();
        getSectionName();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

$('#sectionId').on('change', function () {
    var sectionName = $('#sectionId').val();
    $('#targetNameId').empty();
    getTargetName(sectionName);
});

function getTargetName(sectionName) {
    var section = $('#sectionId').val();
    var objJson =
            {"sectionId": 5};
    var strUrl = Service.getTargetName;
    console.log("getTargetName Url is:" + strUrl);
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
                console.log('getTargetName not loaded');
            } else {
                var jsonArray = data.targetListBasedOnSectionResponseControllerDTO;
                var selectfirst = "<option value='0'>Select Section Name</option>";
                $('#targetNameId').append(selectfirst);

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.targetId + ">" + resData.targetName + "</option>";
                    $(status).appendTo('#targetNameId');

                });
                $('#targetNameId').trigger("chosen:updated");
                $("#targetNameId").chosen();

            }
        },
        error: function () {
            console.log('Error in loading getSectionName Data' + strUrl);
        }
    });
}

/*@DESC : getSlaReport
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-13
 */
function getSlaReport() {
    $('#slaReportDataTable').empty();
//     var sectionNameId = $('#up_sectionNameId').val();
//    var assessmentId = $('#up_assessmentId').val();
    var objJson =
            {"sectionId": "1", "targetId": "1"};


    try {
        var strUrl = Service.getSlaMeasurementPenalityValuesView;
        console.log("getSlaReport Url is:" + strUrl);
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

                $('#slaReportDataTable').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#slaReportDataTable').append(divTag);

                } else {
                    var jsonArray = data.slaMeasurementPenalityValuesViewControllerDTO;
                    if (jsonArray.length > 0) {
                        slaReport_DOM(jsonArray);
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
/*@DESC : slaReport_DOM
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-13
 */
function slaReport_DOM(strData) {
    //$("#Searchdeleteid").show();
    // $("#Searchdeleteid").prop('disabled', true);

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

        var objTHead1 = document.createElement('th');
        $(objTHead1).html('Measurement Id');
        $(objTr).append(objTHead1);


        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Measurement_name');
        $(objTr).append(objTHead2);


        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Incident');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Penality Value');
        $(objTr).append(objTHead4);


        $(tbleRow).append(tablcol4);
        $(objTBody).append(tbleRow);



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
            $(tablcol1).html(strData[i].measurementId);
            $(tbleRow).append(tablcol1);


            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].measurementName);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].incident);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].penalityValue);
            $(tbleRow).append(tablcol4);
            $(objTBody).append(tbleRow);
            totalNoOfRecords(i);
        }
        $("#slaReportDataTable").append(objDivTag);
        getpenalityValue();

    } catch (err) {
        console.log("slaReportDataTable" + err);
    }
}
function totalNoOfRecords(i) {
    if (i === 0) {
        i = 1;
    }
    $("#noofRecordsId").val(i);
}
function getpenalityValue() {
    $('#PenaltyValueId').val('');
    $('#monthBillingId').val('');
    var targetName = $("#targetNameId").val();
    var objJson =
            {"targetId": "2"};
    var strUrl = Service.getPenalityandmonthlyBillingValue;
    console.log("getpenalityValue Url is:" + strUrl);
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
                console.log('getpenalityValue not loaded');
            } else {
                var jsonArray = data.penalityandmonthlyBillingValueResponseControllerDTO;
                $.each(jsonArray, function (i, resData) {
                    $('#PenaltyValueId').val(resData.penalityValue);
                    $('#monthBillingId').val(resData.monthlyBillingValue);
                    var noofRecords = $('#noofRecordsId').val();
                    var penalityValue = resData.penalityValue;
                    var reduction = noofRecords * penalityValue;
                    $('#reductionValueId').val(reduction);
                    $('#totalReductionId').val(reduction);
                    var monthBilling = $('#monthBillingId').val();
                    var totalReduction = $('#totalReductionId').val();
                    var billingvalue = monthBilling - totalReduction;
                    $('#billingValueId').val(billingvalue);
                });


            }
        },
    });

}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        //  "scrollY": "400px",
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
/*@DESC : getSectionName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-13
 */
function getSectionName() {
    $('#sectionId').empty();

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

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.billingid + ">" + resData.billingsection + "</option>";
                    $(status).appendTo('#sectionId');

                });
                $('#sectionId').trigger("chosen:updated");

                $("#sectionId").chosen();

            }
        },
        error: function () {
            console.log('Error in loading getSectionName Data' + strUrl);
        }
    });
}