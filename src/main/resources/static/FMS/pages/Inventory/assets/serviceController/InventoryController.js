/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
	getInventoryDetails();
   getVehicleId();
   getParameter();

});
/*
 * For getting Vehicle list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
function getVehicleId() {
    $('#vehicleId').empty();
    var strUrl = Service.getVehicle;
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
                console.log('getVehicleId not loaded');
            } else {
                var jsonArray = data.objVehicleControllerDTO;
                var selectfirst = "<option value='0'>Select vehicle </option>";
                $('#vehicleId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {

                    var auditId1 = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                    $(auditId1).appendTo('#vehicleId');
                });
                $('#vehicleId').trigger("chosen:updated");
                $('#vehicleId').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleId Data' + strUrl);
        }
    });
    }
/*
 * For getting Parameter list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
  function getParameter(){
    $('#ParameterId').empty();
    var strUrl = Service.getParameter;
    console.log("getParameter Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responseCode = data.responseCode;
            
            if (200 !== responseCode) {
                console.log('getParameter not loaded');
            } else {
                var jsonArray = data.objVehicleControllerDTO;
                var selectfirst = "<option value='0'>Select Parameter </option>";
                $('#ParameterId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var parameter = "<option value=" + resData.parameterId + ">" + resData.parameterName + "</option>";
                   
                    $(parameter).appendTo('#ParameterId');
                });
                $('#ParameterId').trigger("chosen:updated");
                $('#ParameterId').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleId Data' + strUrl);
        }
    });
  }
  /*
 * For getting InventoryDetails list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
 function  getInventoryDetails(){
    
    try {

        var vehicle = $("#vehicleId").val();
        var date = $("#formDateId").val();
        var d = new Date(date.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        date = yy + "-" + mm + "-" + dd;
       var Parameter = $("#ParameterId").val();
       var quantityId = $("#quantityId option:selected").text();
       var res=[];
       res = quantityId.split("-");
      if(quantityId==='Select quantity'||quantityId==="Select quantity"){
      res[0]=0;
      res[1]=0;
        }
     if(date==='NaN-NaN-NaN'||date==="NaN-NaN-NaN"){
       date=0;
           }

        var json_GetAudit_Details = {
           "vehicleID":vehicle, 
	       "parameterID":Parameter,
	      "startQuatity":res[0],
	      "endQuatity":res[1],
	      "date":date,
        };
        var strUrl = Service.getInventoryDetailsReport;
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
                  $('#eventoryDataTableId').empty();
                
                var responsecode = data.responseCode;
                if (responsecode !== 200 || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                   // $('#eventoryDataTableId').append(divTag);
                    getEventoryDetailsDataDOM1() ;
                } else {
                    var arraydata = data.objGetAllInventoryDetails;
                    getEventoryDetailsDataDOM(arraydata);
                    loadDataTable()();
                  
                }
            }, error: function (err) {
                console.log('In Error of  getInventoryDetailsReport ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  getAuditDetailsData ' + err);
    }
}
/*
 *@DESC : if data not available in dom this method will load
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getEventoryDetailsDataDOM1() {

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
        $(objTHead2).html('Vehicle No');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('drug Id');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Parameter Item');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Parameter Name');
        $(objTr).append(objTHead5);

        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Available quantity');
        $(objTr).append(objTHead6);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
 
        $(objDivTag).addClass('objDivTag1');
       $(objDivTag).append("NO DATA AVAILABLE");

        $("#eventoryDataTableId").append(objDivTag);

    } catch (err) {
        console.log("eventoryDataTableId" + err);
    }
}

/*
 *@DESC : getEventoryDetailsDataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function getEventoryDetailsDataDOM(strData) {

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
        $(objTHead2).html('Vehicle No');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('drug Id');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Parameter Item');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Parameter Name');
        $(objTr).append(objTHead5);

        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Available quantity');
        $(objTr).append(objTHead6);



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
            $(tablcol2).html(strData[i].vehicleNo);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].drugID);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].parameterItemName);
            $(tbleRow).append(tablcol4);


        

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].parameterName);
            $(tbleRow).append(tablcol5);

           var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].availableQuantity);
            $(tbleRow).append(tablcol6);

            $(tbleRow).append(tablcol6);
            $(tbleRow).append(tablcol6);
            $(objTBody).append(tbleRow);

        }
        $("#eventoryDataTableId").append(objDivTag);

    } catch (err) {
        console.log("eventoryDataTableId" + err);
    }
}
  
 function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[10, 15, 25, 50, 75, -1], [10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        "scrollY":"400px",
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
 function inventoryresetbtn(){
    $('#vehicleId').val('0').trigger('chosen:updated');
    $('#ParameterId').val('0').trigger('chosen:updated');
    $('#quantityId').val('0').trigger('chosen:updated');
    $('#formDateId').val('');
    $('#eventoryDataTableId').empty();
    
 }