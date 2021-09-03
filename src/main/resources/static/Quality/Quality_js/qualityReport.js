

$(document).ready(function() {

    try {
 GetSectionwiseReport(); 
    
        qualityReport();
      //sectionid
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

var token = localStorage.getItem('token');
function GetSectionwiseReport() {
    try {
        $('#sectionid').empty();
        var strUrl = Service.GetQulaityReportName;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",

             "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                console.log("responsecode " + data.responseCode);
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getQulaityReportNameResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Section</option>";
                    $('#sectionid').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var reportName = "<option value=" + resData.reportId + ">" + resData.reportName + "</option>";
                        $(reportName).appendTo('#sectionid');

                    });
                }
            },
            error: function(err) {
                console.error("Error in GetSectionwiseReport" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GetSectionwiseReport()' + err);
    }
    $('#sectionid').trigger("chosen:updated");
    $('#sectionid').chosen();

}
function qualityReport() {

    $('#reportTable').html("");
    try {
        
     
        var startdate_id = $('#startdate_id').val();

        var end_date_id = $('#end_date_id').val();
      

        if (startdate_id === "undefined" || startdate_id === 'undefined' || startdate_id === undefined || startdate_id === "") {
            startdate_id = null;
        }
        if (end_date_id === "undefined" || end_date_id === 'undefined' || end_date_id === undefined || end_date_id === "") {
            end_date_id = null;
        }
     


        var obj_Insert = {
         "from_date":startdate_id,
        "to_date":end_date_id

        };
        var strUrl = Service.Quality_Report;
        console.log("qualityReport::::: " + JSON.stringify(strUrl));
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
            },
            success: function(data) {
                var responseCode = data.responseCode;

                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#reportTable').append(divTag);
                }
                else {
                    var jsonArray = data.getQualityIndicatorsResponseControllerDTO;
                    if (jsonArray.length > 0) {

                        loadReportData(jsonArray);
                        loadDataTable();
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
function loadReportData(strData) {

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
    $(objTHead1).html('Event Id');
    $(objTr).append(objTHead1);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Caller No');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Score');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Agent Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Shift Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Shift Manager Name');
    $(objTr).append(objTHead7);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('TL Name');
    $(objTr).append(objTHead12);

  var objTHead13 = document.createElement('th');
    $(objTHead13).html('Module Name');
    $(objTr).append(objTHead13);

    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');


        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(strData[i].eventid);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].caller_mumber);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].sum);
      
        $(tbleRow).append(tblCol2);

      

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].agent_name);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].shift_name);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].shiftmanager_name);
        $(tbleRow).append(tblCol5);

      var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].tl_name);
        $(tbleRow).append(tblCol6);

      var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].qa_modulename);
        $(tbleRow).append(tblCol7);
     
        $(objTBody).append(tbleRow);

    }
    $("#reportTable").append(objDivTag);
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