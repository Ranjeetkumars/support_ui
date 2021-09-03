/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    get_District_Dropdown();
    get_Audit_Details_Data();
});
/*
 * onchange funcations
 */

$("#districtId").keypress(function() {
    $('#districtId_errorId').empty();
});
$("#noncomplianceId").keypress(function() {
    $('#non_compliance_errorId').empty();
});
$(".removespanError").change(function() {
    $('#auditDetailSearch_errorId').empty();
});
$("#toDateId").change(function() {
    $('#todate_errorId').empty();
});
/*
 *@DESC : get_Audit_Details_Data
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function get_Audit_Details_Data() {
    try {
        var auditId = "201912040006";
        var json_GetAudit_Details = {
            "auditId": auditId
        };
        var strUrl = Service.getAuditDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_GetAudit_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {

                var responsecode = data.responseCode;
                if (responsecode !== 200) {
                } else {
                    var arraydata = data.objAuditDetailsControllerDTO;
                    get_Audit_Details_Data_DOM(arraydata);
                }
            }, error: function(err) {
                console.log('In Error of  get_Audit_Details_Data ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_Audit_Details_Data ' + err);
    }
}




/*
 * For loading the loadingDesignationType 
 *  Bharath 29-11-2019 load
 * loading loading District
 */
function get_District_Dropdown() {
    try {
        var stateId = 1;
        var json_District_Details = {
            "stateId": stateId
        };
        var strUrl = Service.getDistrict;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_District_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objGetDistrictControllerDTO;
                    // var selectfirst = "<option value='0'>Please Select ServiceProviderType</option>";

                    $.each(jsonArray, function(i, resData) {
                        var serviceTypeData = "<option value="
                                + resData.districId + ">"
                                + resData.districName
                                + "</option>";
                        $(serviceTypeData).appendTo(
                                '#districtId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_District_Dropdown"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_District_Dropdown()' + err);
    }

}

function auditDetailSearch() {
    try {
        var fromDate = $('#fromdateID').val();
        var toDate = $('#toDateId').val();
        var district = $('#districtId').val();
        var nonComplaince = $('#noncomplianceId').val();
        if (fromDate === '' && toDate === '' && district === '0' && nonComplaince === '0') {
            $('#auditDetailSearch_errorId').html('Please select aleast one  Search field').css('color', 'red');
        }
        if (fromDate !== '') {
            if (toDate === '' || toDate === null) {
                $('#todate_errorId').html('Please select To Date').css('color', 'red');
            }
        }
        var availableAnswer;
        var funcationalAnswer;
        //Here 1 is available yes 
        //       2 is available no
        //       3 is funcational yes
        //      4 is funcational no
        if (nonComplaince === '2') {
            availableAnswer = 2;
            funcationalAnswer = 4;
        } else if (nonComplaince === '4') {
            availableAnswer = 1;
            funcationalAnswer = 4;
        } else {
            availableAnswer = null;
            funcationalAnswer = null;
        }
        if (district === '0') {
            district = null;
        }

        var vehicleId = null;
        var auditId = null;
        var json_audit_Details = {
            "auditId": auditId,
            "formDate": fromDate,
            "toDate": toDate,
            "availableAnswer": availableAnswer,
            "funcationalAnswer": funcationalAnswer,
            "districtId": district,
            "vehicleId": vehicleId



        };
        var strUrl = Service.getSearchAuditDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_audit_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
               
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                } else {
              
                    var arraydata = data.objSearchAuditDetailsControllerDTO;
                      loadDataTable();
                    get_Audit_Details_Data_DOM(arraydata);
                    //loadDataTable();
                 }
            },
            error: function(err) {
                console.error("Error in auditDetailSearch"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in auditDetailSearch()' + err);
    }


}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
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
/*
 * for reset dropdown
 */
function auditsearchresetbtn() {
    $('#districtId').val('0').trigger('chosen:updated');
    $('#noncomplianceId').val('0').trigger('chosen:updated');
    $('#toDateId').val("");
    $('#fromdateID').val("");
}