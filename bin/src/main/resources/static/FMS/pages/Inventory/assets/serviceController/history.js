/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
   
    //auditDetailsDomReport();
    //getSessionName();
});
/*
 *@DESC : getAuditDetailsReport
 *@AuthorName : priya
 *@DATE : 20-01-2020
 */
//function auditDetailsDomReport() {
//    var auditId = localStorage.getItem("auditId");
//    try {
//        var json_GetAudit_Details = {
//             "auditId":auditId,
//        };
//        var strUrl = Service.getAuditDetailsReport;
//        $.ajax({
//            type: "POST",
//            url: strUrl,
//            dataType: "json",
//            data: JSON.stringify(json_GetAudit_Details),
//            contentType: "application/json",
//            async: false,
//            crossDomain: true,
//            headers: {
//                "X-TENANT-ID": "PROCREATE"
//            },
//            success: function(data) {
//                    $('#audittable').empty();
//                var responseCode = data.responseCode;
//           
//                if (responseCode !== 200) {
//                } else {
//                    var arraydata = data.objSearchAuditDetailsControllerDTO;
//                    getAuditDetailsReportDom(arraydata);
//                    loadDataTable1();
//                }
//            }, error: function(err) {
//                console.log('In Error of  getAuditDetailsData ' + err);
//            }
//        });
//    } catch (err) {
//        console.log('In Error of  getAuditDetailsData ' + err);
//    }
//}

/*
 *@DESC : getAuditDetailsDataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
//function getAuditDetailsReportDom(strData) {  
// try {
//        //For Div Tag
//        var objDivTag = document.createElement('div');
//        $(objDivTag).addClass("table-responsive");
//
////For table
//        var ObjTableTag = document.createElement("table");
//        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
//        $(objDivTag).append(ObjTableTag);
////For table head
//        var objTHead = document.createElement("thead");
//        $(ObjTableTag).append(objTHead);
//
////For table row
//        var objTr = document.createElement("tr");
//        $(objTHead).append(objTr);
//
////For table Heading1
//        var objTHead1 = document.createElement("th");
//        $(objTHead1).html('S.No');
//        $(objTr).append(objTHead1);
//        $(objTHead1).addClass("thstyle1");
//
////For table Heading2
//        var objTHead2 = document.createElement('th');
//        $(objTHead2).html('Section Name');
//        $(objTr).append(objTHead2);
//         $(objTHead2).addClass("thstyle");
//
////For table Heading3
//        var objTHead3 = document.createElement('th');
//        $(objTHead3).html('Question Name');
//        $(objTr).append(objTHead3);
//        $(objTHead3).addClass("thstyle");
//        
////For table Heading4
//        var objTHead4 = document.createElement('th');
//        $(objTHead4).html('Available');
//        $(objTr).append(objTHead4);
//         $(objTHead4).addClass("thstyle");
//         
////For table Heading5
//        var objTHead5 = document.createElement('th');
//        $(objTHead5).html('Functional');
//        $(objTr).append(objTHead5);
//        $(objTHead5).addClass("thstyle");
//        
//        
//        //For table Heading6
//        var objTHead6 = document.createElement('th');
//        $(objTHead6).html('Quantity');
//        $(objTr).append(objTHead6);
//        $(objTHead6).addClass("thstyle");
//
//        //For table Heading7
//        var objTHead7 = document.createElement('th');
//        $(objTHead7).html('Remark');
//        $(objTr).append(objTHead7);
//        $(objTHead7).addClass("thstyle");
//        
//        
//        var objTHead8 = document.createElement('th');
//        $(objTHead8).html('Image');
//        $(objTr).append(objTHead8);
//        $(objTHead8).addClass("thstyle");
//
//      
//
//        var objTBody = document.createElement("tbody");
//        $(objTBody).attr("id", "tbodyData");
//        $(ObjTableTag).append(objTBody);
//
//        // Table Data Appending Here
//
//        for (var i = 0; i < strData.length; i++) {
//
//            var index = i + 1;
//            var tbleRow = document.createElement("tr");
//
//            var tablcol1 = document.createElement("td");
//
//            $(tablcol1).addClass('text-center');
//            var tablcol1 = document.createElement("td");
//            $(tablcol1).html(index);
//            $(tbleRow).append(tablcol1);
//
//            var tablcol2 = document.createElement("td");
//            $(tablcol2).addClass('text-center');
//            $(tablcol2).html(strData[i].sessionName);
//            $(tbleRow).append(tablcol2);
// 
//            var tablcol3 = document.createElement("td");
//            $(tablcol3).addClass('text-center');
//            $(tablcol3).html(strData[i].questionName);
//            $(tbleRow).append(tablcol3);
//
//            var tablcol4 = document.createElement("td");
//            $(tablcol4).addClass('text-center');
//            var availbality=strData[i].availableAnswer;
//            if(availbality==='NA'||availbality==="NA"){
//             $(tablcol4).html("Data not available");   
//            }
//            else{
//            $(tablcol4).html(strData[i].availableAnswer);
//        }
//            $(tbleRow).append(tablcol4);
//
//
//            var tablcol5 = document.createElement("td");
//            $(tablcol5).addClass('text-center');
//              var funcationalAnswer=strData[i].funcationalAnswer;
//            if(funcationalAnswer==='NA'||funcationalAnswer==="NA"){
//             $(tablcol5).html("Data not available");   
//            } else{
//            $(tablcol5).html(strData[i].funcationalAnswer);
//        }
//            $(tbleRow).append(tablcol5);
//
//            var tablcol6 = document.createElement("td");
//            $(tablcol6).addClass('text-center');
//             var quantity=strData[i].quantity;
//            if(quantity==='NA'||quantity==="NA"){
//                  $(tablcol6).html("Data not available");   
//            } else{
//                  $(tablcol6).html(strData[i].quantity);
//            }
//            $(tbleRow).append(tablcol6);
//            var tablcol7 = document.createElement("td");
//            $(tablcol7).addClass('text-center');
//            $(tablcol7).html(strData[i].remarks);
////            $(tablcol7).append('<a href="#"><i class="fa fa-eye" data-toggle="modal" data-target="#registration"></i><i></a> ');
////          $(tablcol7).attr('onclick', 'getSelectedAuditId("'+strData[i].auditId+ '")');
//            //$(tablcol7).css('height', '5px');
//            //$(tbleRow).append(tablcol7);
//            $(tbleRow).append(tablcol7);
//            
//
//   var tablcol8 = document.createElement("td");
//   var imagepath=strData[i].mediaPath;
//
//    //var base64="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";
//   var buffer=Uint8Array.from(atob(imagepath), c => c.charCodeAt(0));
//   var blob=new Blob([buffer], { type: "image/gif" });
//      var url=URL.createObjectURL(blob);
//       var img=document.createElement("img");
//       img.src=url;
//   $(tablcol8).append(img);
//   $(tbleRow).append(tablcol8);
////document.body.appendChild(img);
//
//            
//            $(objTBody).append(tbleRow);
//            
//                    }
//        $("#audittable").append(objDivTag);
//
//    } catch (err) {
//        console.log("audittable" + err);
//    }
//}
      
//function loadDataTable1() {
//    $('.dataTables-example').DataTable({
//        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
//        "iDisplayLength": 10,
//        responsive: true,
//        dom: '<"html5buttons"B>lTfgitp',
//        buttons: [
//            {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'TyreLifeData'},
//            {extend: 'pdf', title: 'TyreLifeData'},
//            {extend: 'print',
//                customize: function (win) {
//                    $(win.document.body).addClass('white-bg');
//                    $(win.document.body).css('font-size', '10px');
//
//                    $(win.document.body).find('table')
//                            .addClass('compact')
//                            .css('font-size', 'inherit');
//                }
//            }
//        ]
//    });
//}
///*
// * For getting getAuditId list.
// * priyadarshini
// * 20-01-2020
// * inputs :no 
// */
//function getSessionName() {
//     $('#SectionNameId').empty();
//    var strUrl = Service.getSessionName;
//    console.log("getSessionName Url is:" + strUrl);
//    $.ajax({
//        type: "GET",
//        url: strUrl,
//        dataType: "json",
//        async: false,
//        crossDomain: false,
//        success: function (data) {
//            var responsecode = data.responseCode;
//        
//            if (200 !== responsecode) {
//                console.log('getSessionName not loaded');
//            } else {
//                var jsonArray = data.objGetAuditIdControllerDTO;
//                var selectfirst = "<option value='0'>Select SectionName </option>";
//                $('#SectionNameId ').append(selectfirst);
//                $.each(jsonArray, function (i, resData) {
//                   
//                    var auditId1 = "<option value=" + resData.sessionId + ">" + resData.sessionName + "</option>";
//                    $(auditId1).appendTo('#SectionNameId');
//                });
//                $('#SectionNameId').trigger("chosen:updated");
//                $('#SectionNameId').chosen();
//            }
//        },
//        error: function () {
//            console.log('Error in loading getSessionName Data' + strUrl);
//        }
//    });
//}