/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var auditId1;
$(document).ready(function () {
   getAuditId();
   getSessionName();

});

/*
 * For getting getAuditId list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
function getAuditId() {
    $('#auditId').empty();
    var strUrl = Service.getAuditId;
    console.log("getAuditId Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('getAuditId not loaded');
            } else {
                var jsonArray = data.objGetAuditIdControllerDTO;
                var selectfirst = "<option value='0'>Select Audit Id </option>";
                $('#auditId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                   var auditId1 = "<option value=" + resData.serialNo + ">" + resData.auditId + "</option>";
                   $(auditId1).appendTo('#auditId');
                });
                $('#auditId').trigger("chosen:updated");
                $('#auditId').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getAuditId Data' + strUrl);
        }
    });
}
/*
 *@DESC : getAuditDetailsData
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getAuditDetailsData() {
    try {
        var auditId = $("#auditId option:selected").text();
        
        var formDate = $("#formDateId").val();
        var d = new Date(formDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        formDate = yy + "-" + mm + "-" + dd;
        var toDate = $("#toDateID").val();
        var d = new Date(toDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        toDate = yy + "-" + mm + "-" + dd;
        if(auditId==='Select Audit Id '||auditId==="Select Audit Id "){
           auditId=0; 
        }
          if(formDate==='NaN-NaN-NaN'||formDate==="NaN-NaN-NaN"){
           formDate="0"; 
        }
        
         if(toDate==='NaN-NaN-NaN'||toDate==="NaN-NaN-NaN"){
           toDate="0"; 
        }

        var json_GetAudit_Details = {
            "auditId": auditId,
            "formDate": formDate,
            "toDate": toDate

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
            success: function (data) {
                  $('#audittable').empty();
                
                var responsecode = data.responseCode;
                if (responsecode !== 200 || data.status === "NO_DATA_FOUND") {
                 console.log(' Data not there'+data.responseCode );
                    getAuditDetailsNODataDOM();
         
                } else {
                    var arraydata = data.objAuditDetailsControllerDTO;
                    getAuditDetailsDataDOM(arraydata);
                    loadDataTable();
                  
                }
            }, error: function (err) {
                console.log('In Error of  getAuditDetailsData ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  getAuditDetailsData ' + err);
    }
}
/*
 *@DESC : if data not there in table 
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getAuditDetailsNODataDOM() {

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

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.No');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Audit Id');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('BaseLocation Name');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Vehicle No');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('User Name');
        $(objTr).append(objTHead5);

        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Audit date');
        $(objTr).append(objTHead6);

        //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('View');
        $(objTr).append(objTHead7);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
  
        $(objDivTag).addClass('objDivTag1');
         $(objDivTag).append("No DATA AVAILABLE");
        $("#audittable").append(objDivTag);

    } catch (err) {
        console.log("audittable" + err);
    }
}
/*
 *@DESC : getAuditDetailsDataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getAuditDetailsDataDOM(strData) {

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

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.No');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Audit Id');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('BaseLocation Name');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Vehicle No');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('User Name');
        $(objTr).append(objTHead5);
 //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Audit date');
        $(objTr).append(objTHead6);
  //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('View');
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
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].auditId);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].baseLocName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].permenantregno);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].userName);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].auditDate);
            $(tbleRow).append(tablcol6);
               
            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).append('<a href="#"><i class="fa fa-eye faeye" data-toggle="modal" data-target="#registration"></i><i></a> ');
            $(tablcol7).attr('onclick', 'getAuditDetailsReport1("' + strData[i].auditId + '","' + strData[i].auditDate+ '")');
         
            $(tablcol7).css('height', '5px');
            $(tbleRow).append(tablcol7);
            $(tbleRow).append(tablcol7);
            $(objTBody).append(tbleRow);
        }
        $("#audittable").append(objDivTag);

    } catch (err) {
        console.log("audittable" + err);
    }
}

/*
 *@DESC : Availablity toggle box validation
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
var availableStatus;
$("#AvailableId").on('change', function () {
 if ($(this).is(':checked')) {
  console.log("Its checked");
   $('#availText').html("Available");
         var avialble =$('#AvailableId').val();
       availableStatus = avialble;
    }
    else {
        console.log("Its uncheck");
        $('#availText').html("UnAvailable");
        console.log("Its Unchecked");
        availableStatus ="off";  
    }
    console.log("availablabilitystatus==========="+availableStatus);
    $('#example').empty();
    getAuditDetailsReport11();
});
/*
 *@DESC : functionality  toggle box validation
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
var functionalStatus;
$("#FunctionalId").on('change', function () {
    if ($(this).is(':checked')) {
        console.log("Its checked");
        $('#functionalText').html("Functional");
          var Functional =$('#FunctionalId').val();
       functionalStatus = Functional;
    }
    else {
        console.log("Its uncheck");
        $('#functionalText').html("NonFunctional");
      
       functionalStatus = "off";
       console.log("functionalStatus==========="+functionalStatus);
    }
    $('#example').empty();
    getAuditDetailsReport11();
});
/*
 *@DESC : onclick section name validation
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
$('#sectionNameId').on('change', function () {
   $('#example').empty();
   getAuditDetailsReport11();
});

var auditIDD;
function getAuditDetailsReport1(auditId,auditDate) {
    $('#headerid').html(auditDate);
    $('#AuditIId').html(auditId);
    auditIDD=auditId;
    getAuditDetailsReport11();
}
/*
 *@DESC : resetTable()
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function resetTable(){
    $('#example').empty();
    availableStatus=0;
    functionalStatus=0;
    $('input[type=checkbox]').prop('checked',true); 
    $('#availText').html("Available");
    $('#functionalText').html("Functional");
    $('#sectionNameId').val('0').trigger('chosen:updated');
    getAuditDetailsReport11();
     
}
/*
 *@DESC : getAuditDetailsReport11
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getAuditDetailsReport11() {
   
    var sectionName=$("#sectionNameId").val();
    
      if(availableStatus==='undefined'||availableStatus==="undefined"){
          availableStatus=0;
      }
       if(availableStatus==='on'||availableStatus==="on"){
          availableStatus=1;
      }
      
       if(availableStatus==='off'||availableStatus==="off"){
          availableStatus=2;
      }
   
        if(functionalStatus==='undefined'||functionalStatus==="undefined"){
          functionalStatus=0;
      }
        if(functionalStatus==='on'||functionalStatus==="on"){
          functionalStatus=3;
      }
        if(functionalStatus==='off'||functionalStatus==="off"){
          functionalStatus=4;
      }
      console.log("availableStatus------"+availableStatus);
      console.log("functionalStatus------"+functionalStatus);
      console.log("auditIDD------"+auditIDD);
    try {
        var json_GetAudit_Details = {
            "auditId":auditIDD,
             "sessionId":sectionName,
            "availableId":availableStatus ,
             "functionalId":functionalStatus,     
        };
        var strUrl = Service.getAuditDetailsReport;
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
            success: function (data) {
                $('#example').empty();
                var responseCode = data.responseCode;
                
                if (responseCode !== 200 || data.status === "NO_DATA_FOUND") {
                    console.log("data not there-----" + data.responseCode);
                     $('#resetIconId').hide();
                    getNoDataAuditDetailsReportDom();

                } else {
                    var arraydata = data.objSearchAuditDetailsControllerDTO;
                    getAuditDetailsReportDom(arraydata);
                  $('#resetIconId').show();
                    tableData();
                }
            }, error: function (err) {
                console.log('In Error of  getAuditDetailsData ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  getAuditDetailsData ' + err);
    }
}
/*
 *@DESC : if data not there in table this method will load
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getNoDataAuditDetailsReportDom() { 

 try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");
        
        

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
        

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.No');
       
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Section Name');
        $(objTr).append(objTHead2);

//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Question Name');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Available');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Functional');
        $(objTr).append(objTHead5);
        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Quantity');
        $(objTr).append(objTHead6);

        //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Remark');
        $(objTr).append(objTHead7);
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Image');
        $(objTr).append(objTHead8);
        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        // Table Data Appending Here

          $(ObjTableTag).append(objTBody);
 
        $(objDivTag).addClass('objDivTag1');
       $(objDivTag).append("NO DATA AVAILABLE");
       $("#example").append(objDivTag);

  } catch (err) {
        console.log("example" + err);
   }
}
/*
 *@DESC : getAuditDetailsDataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getAuditDetailsReportDom(strData) { 

 try {
 //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");
        
//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.No');
       
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Section Name');
        $(objTr).append(objTHead2);

//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Question Name');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Available');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Functional');
        $(objTr).append(objTHead5);
 //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Quantity');
        $(objTr).append(objTHead6);
 //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Remark');
        $(objTr).append(objTHead7);
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Image');
        $(objTr).append(objTHead8);
        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tablcol1).addClass("thstyle1");
            $(tablcol1).addClass("thstyle2");
            $(tablcol1).addClass("thstyle3");
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).addClass("thstyle1");
            $(tablcol2).addClass("thstyle2");
            $(tablcol2).addClass("thstyle3");
            $(tablcol2).html(strData[i].sessionName);
            $(tbleRow).append(tablcol2);
 
            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].questionName);
            $(tablcol3).addClass("thstyle1");
            $(tablcol3).addClass("thstyle2");
            $(tablcol3).addClass("thstyle3");

            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).addClass("thstyle1");
            $(tablcol4).addClass("thstyle2");
            $(tablcol4).addClass("thstyle3");

            var availbality=strData[i].availableAnswer;
            if(availbality==='NA'||availbality==="NA"){
            $(tablcol4).html("Data not available");   
            }
            else{
            $(tablcol4).html(strData[i].availableAnswer);
        }
            $(tbleRow).append(tablcol4);
            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).addClass("thstyle1");
            $(tablcol5).addClass("thstyle2");
            $(tablcol5).addClass("thstyle3");
              var funcationalAnswer=strData[i].funcationalAnswer;
            if(funcationalAnswer==='NA'||funcationalAnswer==="NA"){
             $(tablcol5).html("Data not available");   
            } else{
            $(tablcol5).html(strData[i].funcationalAnswer);
        }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).addClass("thstyle1");
            $(tablcol6).addClass("thstyle2");
            $(tablcol6).addClass("thstyle3");
             var quantity=strData[i].quantity;
            if(quantity==='NA'||quantity==="NA"){
                  $(tablcol6).html("Data not available");   
            } else{
                  $(tablcol6).html(strData[i].quantity);
            }
            $(tbleRow).append(tablcol6);
            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].remarks);
             $(tablcol7).addClass("thstyle3");

             $(tablcol7).addClass("thstyle1");
              $(tablcol7).addClass("thstyle2");
            $(tbleRow).append(tablcol7);
            

   var tablcol8 = document.createElement("td");
   var imagepath=strData[i].mediaPath;
   var buffer=Uint8Array.from(atob(imagepath), c => c.charCodeAt(0));
   var blob=new Blob([buffer], { type: "image/gif" });
      var url=URL.createObjectURL(blob);
       var img=document.createElement("img");
       img.src=url;
   $(tablcol8).append(img);
   $(tablcol8).addClass("thstyle1");
   $(tablcol8).addClass("thstyle2");
      $(tablcol8).addClass("thstyle3");
   $(tbleRow).append(tablcol8);
   $(objTBody).append(tbleRow);
            
 }
 $("#example").append(objDivTag);

  } catch (err) {
        console.log("example" + err);
   }
}

/*
 * for reset all data
 */
function auditsearchresetbtn() {
    $('#auditId').val('0').trigger('chosen:updated');
    $('#formDateId').val("");
    $('#toDateID').val("");
    $('#audittable').empty();

}
//Based on toggle button hide the textfileds
function myEnableFiled() {
    var hiddenStatus = $('#tempstatusID').val();
    if (hiddenStatus === 'false' || hiddenStatus === "false") {
        document.getElementById("rowselect").style.display = "block";
      
    } else {
   
        document.getElementById("rowselect").style.display = "none";
    }
}
/*
 * For getting section name list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
function getSessionName() {

      $('#sectionNameId').empty();
    var strUrl = Service.getSessionName;
    console.log("getSessionName Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            
            if (200 !== responsecode) {
                console.log('getSessionName not loaded');
            } else {
                var jsonArray = data.objGetAuditIdControllerDTO;
                var selectfirst = "<option value='0'>Select SectionName </option>";
                $('#sectionNameId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {

                    var sectionName = "<option value=" + resData.sessionId + ">" + resData.sessionName + "</option>";
                    $(sectionName).appendTo('#sectionNameId');
                });
                $('#SectionNameId').trigger("chosen:updated");
                $('#sectionNameId').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getSessionName Data' + strUrl);
        }
    });
}


function tableData(){
    var groupColumn = 1;
 
  var table=$('.dataTables-example1').DataTable({
       "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        
        "iDisplayLength": 5,
         "dom": '<"html5buttons"B>lTfgitp',
         // stripHtml: false,
         "buttons": [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Audit Report'},
            {extend: 'pdf', title: 'Audit Report'},
            {extend: 'print',
                exportOptions: {//for print image
                columns: ':visible',
                stripHtml: false,
            },
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px').prepend(//for print image
                        '<img src="" style="position:absolute; top:0; left:0;" />'
                    );
                      
                    $(win.document.body).find('table')
                    
                            .addClass('compact')
                            .css('font-size', 'inherit');
                } 
            }
        ],
        "columnDefs": [
           
            { "visible": false, "targets": groupColumn }
        ],
        
        "order": [[ groupColumn, 'asc' ]],
           //"iDisplayLength": 5,
   
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="8">'+group+'</td></tr>'
                    );
 
                    last = group;
                }
            } );
        }
       
        
    } );

     //Order by the grouping
    $('#example tbody').on( 'click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
            table.order( [ groupColumn, 'desc' ] ).draw();
        }
        else {
            table.order( [ groupColumn, 'asc' ] ).draw();
        }
    } );
    }
    function loadDataTable() {  
       
    $('.dataTables-example').DataTable({
       
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "scrollY":"400px",
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Audit Report'},
            {extend: 'pdf', title: 'Audit Report'},
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
   //Reset Data
 function auditReportDetailsreset(){
    $('#sectionNameId').val('0').trigger('chosen:updated');
    $('#example').empty();
    
 }
 