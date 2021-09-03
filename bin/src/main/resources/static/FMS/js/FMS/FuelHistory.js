

$(document).ready(function () {

    try {
        getSingleRecords()
     loadVehicleType();
     loadVehicleType();
     loadListOfVendar();
     listOfPaymentMode();
     listOfFleetCardDropdown();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


$("#checkedAll").change(function(){
if (this.checked){

$(".checkSingle").each(function(){
this.checked = true;
})
} else{
$(".checkSingle").each(function(){
this.checked = false;
})
}
});
        $(".checkSingle").click(function () {
if ($(this).is(":checked")){
var isAllChecked = 0;
        $(".checkSingle").each(function(){
if (!this.checked)
        isAllChecked = 1;
})
        if (isAllChecked == 0){ $("#checkedAll").prop("checked", true); }
} else {
$("#checkedAll").prop("checked", false);
}
});
// $('#save_value').click(function () {
// var arr = $('.checkSingle:checked').map(function () {
// console.log("arr:"+this.value);
// return this.value;
// }).get();
// console.log(arr);
// });


        function deleteMultipleRecords(){
        alert("deleteMultipleRecords java script function is executed");
                var arr = $('.checkSingle:checked').map(function () {
        console.log("arr:" + this.value);
                return this.value;
        }).get();
                console.log("arrarr::" + arr);
                if (arr == '' || arr == "" || arr == '0' || arr == 0 || arr == 'undefined' || arr == undefined){
        $("#span-id-error-msg1").text("Please select data first, If you want to delete");
                }
        else{
        deleteAddFuelRecords(arr);
                }

        }

function deleteAddFuelRecords(fuelIds){
alert('@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + fuelIds);
        alert("before constructing json formate::" + fuelIds);
        console.log("fuelIdsfuelIds::" + fuelIds);
//:["20","21","22","23","27"]
        var aftrereplace = fuelIds.toString().replace(/"/g, '\'');
        var objJson = {
        "serialId":aftrereplace
        };
        alert("json format::" + JSON.stringify(objJson));
        $.ajax({
        type: 'POST',
                url:
                "http://192.168.1.106:2000/FleetManagement/fuelController/deleteAddFuel",
                success: function (data, textStatus, jqXHR) {
                alert("data is deleted::" + data.result);
                        if (data.result == 1 || data.result == '1'){
                //toastr.success("Fuel data is deleted successfully");
                }
                else{
               // toastr.error("Something went wrong! try again");
                        console.log("Error Msg::" + data.errorsMsg);
                }
                },
                data: JSON.stringify(objJson),
                error: function (e) {
                console.log(e);
                },
                dataType: "json",
                contentType: "application/json"
        });
        }

function loadFuelType() {
console.log("loadFuelType method is executed");
        $.ajax({
        type: 'GET',
                contentType: 'application/json',
                async: false,
                url: 'http://192.168.0.102:2000/FleetManagement/supervisor_cls_level/loadFuelType',
                success: function (data, textStatus, jqXHR) {
              var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.obFuelTypeControllerDTO;
               // var selectfirst = "<option value='0'>Select Vehicle Types</option>";
               // $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var fuelType = "<option value=" + resData.fuelTypeId + ">" + resData.fuelType + "</option>";
                    $(fuelType).appendTo('#fuelTypeId');
                });
                $('#fuelTypeId').trigger("chosen:updated");
                $("#fuelTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading serviceType Data' + strUrl);
        }
    });
}
//                        JSON.parse(obj).forEach(item = > {
//                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelTypeId);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelType);
//                        $('#fuelType').append('<option value=' + item.fuelTypeId + '>' + item.fuelType + '</option>');
//                });
               // },
               // error: function (jqXHR, textStatus, errorThrown) {
                //console.log('update Stock error: ' );
               // }
       // );
//}


function loadVehicleType(){
console.log("loadVehicleType method is executed");
        $.ajax({
        type: 'GET',
                contentType: 'application/json',
                async: false,
                url: 'http://192.168.0.102:2000/FleetManagement/supervisor_cls_level/loadVehicleType',
                success: function (data, textStatus, jqXHR) {
                    
                 var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.objVehicleTypeControllerDTO;
               // var selectfirst = "<option value='0'>Select Vehicle Types</option>";
               // $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var vehicle = "<option value=" + resData.vehicleTypeId + ">" + resData.vehicleType + "</option>";
                    $(vehicle).appendTo('#vehicleId');
                });
                $('#vehicleId').trigger("chosen:updated");
                $("#vehicleId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading serviceType Data' + url);
        }
    });
}
                
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                         // JSON.parse(obj).forEach(item = > {
//                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.vehicleTypeId);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.vehicleType);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.endOdomtr);
//                        $('#vehicleId').append('<option value=' + item.vehicleTypeId + ',' + item.endOdomtr + '>' + item.vehicleType + '</option>');
              // }),
//                        $('#vehicleId').trigger("chosen:updated");
//                        $('#vehicleId').chosen();
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                console.log('update Stock error: ' + textStatus);
//                }
//        });




function loadVehicleTypeForFuelHistory(){
console.log("loadVehicleType method is executed");
        $.ajax({
        type: 'GET',
                contentType: 'application/json',
                async: false,
                url: 'http://192.168.0.102:2000/FleetManagement/supervisor_cls_level/loadVehicleType',
                success: function (data, textStatus, jqXHR) {
                console.log("Status" + textStatus);
                        var obj = JSON.stringify(data.objVehicleTypeControllerDTO);
//                        JSON.parse(obj).forEach(item = > {
//                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.vehicleTypeId);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.vehicleType);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.endOdomtr);
//                        $('#vehicleId').append('<option value=' + item.vehicleTypeId + '>' + item.vehicleType + '</option>');
//                });
                        $('#vehicleId').trigger("chosen:updated");
                        $('#vehicleId').chosen();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                console.log('update Stock error: ' + textStatus);
                }
        });
}



function loadListOfVendar(){
console.log("loadListOfVendar method is executed");
        $.ajax({
        type: 'GET',
                contentType: 'application/json',
                async: false,
                url: 'http://192.168.0.102:2000/FleetManagement/fuelController/getFuelStationsDropDown',
                success: function (data, textStatus, jqXHR) {
                    
                    
                    
                              var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.objControllerDTO;
               // var selectfirst = "<option value='0'>Select Vehicle Types</option>";
               // $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var fuelStation = "<option value=" + resData.fuelStationId + ">" + resData.fuelStationName + "</option>";
                    $(fuelStation).appendTo('#stationId');
                });
                $('#stationId').trigger("chosen:updated");
                $("#stationId").chosen();
            }
        },
        error: function () {
            console.log('Error in loadListOfVendar Data' + url);
        }
    });
}    
                    
           
                
//                console.log("Status" + textStatus);
//                        var obj = JSON.stringify(data.objControllerDTO);
////                        JSON.parse(obj).forEach(item = > {
////                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationId);
////                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationName);
////                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationAddress);
////                        // $('#fuel-station-id').append('<option value=' +
////                        // item.fuelStationId +'>' + item.fuelStationName +
////                        // '</option>');
////                        $('#stationId').append('<option value=' + item.fuelStationId + ',' + item.fuelStationAddress + '>' + item.fuelStationName + '</option>');
////                });
//                        $('#stationId').trigger("chosen:updated");
//                        $('#stationId').chosen();
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                console.log('update Stock error: ' + textStatus);
//                }
//        });
//        }
function listOfPaymentMode(){
$.ajax({
type: 'GET',
        contentType: 'application/json',
        async: false,
        url: 'http://192.168.0.102:2000/FleetManagement/fuelController/gettPaymentDetails',
        success: function (data, textStatus, jqXHR) {
        console.log("Status" + textStatus);
        
        
          var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.objControllerDTO;
               // var selectfirst = "<option value='0'>Select Vehicle Types</option>";
               // $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var paymentMode = "<option value=" + resData.serailId + ">" + resData.paymentType + "</option>";
                    $(paymentMode).appendTo('#paymentModeId');
                });
                $('#paymentModeId').trigger("chosen:updated");
                $("#paymentModeId").chosen();
            }
        },
        error: function () {
            console.log('Error in listOfPaymentMode Data' + url);
        }
    });
}

//                var obj = JSON.stringify(data.objControllerDTO);
////                JSON.parse(obj).forEach(item = > {
////        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.serailId);
////                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.paymentType);
////                $('#paymentModeId').append('<option value=' + item.serailId + '>' + item.paymentType + '</option>');
////        });
//                $('#paymentModeId').trigger("chosen:updated");
//                $('#paymentModeId').chosen();
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//        console.log('update Stock error: ' + textStatus);
//        }
//});
//        }

function listOfFleetCardDropdown(){
$.ajax({
type: 'GET',
        contentType: 'application/json',
        async: false,
        url: 'http://192.168.0.102:2000/FleetManagement/fuelController/getFleetCardDropdown',
        success: function (data, textStatus, jqXHR) {
            
            
             var responsecode = data.responseCode;
            if (200 !== responsecode) {
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.objControllerDTO;
               // var selectfirst = "<option value='0'>Select Vehicle Types</option>";
               // $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var fleetcard = "<option value=" + resData.fleetcardId + ">" + resData.cardVendor + "</option>";
                    $(fleetcard).appendTo('#fuel-card-no');
                });
                $('#fuel-card-no').trigger("chosen:updated");
                $("#fuel-card-no").chosen();
            }
        },
        error: function () {
            console.log('Error in listOfPaymentMode Data' + url);
        }
    });
}  
            
            
            
//        console.log("Status" + textStatus);
//                var obj = JSON.stringify(data.objControllerDTO);
////                JSON.parse(obj).forEach(item = > {
////        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fleetcardId);
////                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.cardVendor);
////                $('#fuel-card-no').append('<option value=' + item.fleetcardId + '>' + item.cardVendor + '</option>');
////        });
//                $('#fuel-card-no').trigger("chosen:updated");
//                $('#fuel-card-no').chosen();
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//        console.log('update Stock error: ' + textStatus);
//        }
//});
//        }



var golbalObject;
        function loadListAddFuelDetails(){
        console.log('loadListAddFuelDetails javscript function is executed');
                var startDate = $("#start-date-id").val();
                var endDate = $("#end-date-id").val();
                var vehicleId = $("#vehicleId").val();
                var concatString;
                if (startDate === "" || startDate === '' || startDate === 'undefined' || startDate === undefined && endDate == "" || endDate == '' || endDate == 'undefined' || endDate == undefined){
        var d = new Date();
                var date = d.getDate();
                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
                var year = d.getFullYear();
                var dateStr = date + "/" + month + "/" + year;
                var pdFormate = year + "-" + month + "-" + date;
                startDate = pdFormate;
                endDate = pdFormate;
        }
        else if (startDate > endDate || startDate == endDate){
        alert("End date should be greater than Start date or euql");
                $("#date-validation").text('');
                $("#date-validation").append("End date should be greater than Start date or euql");
                return false

        }
        if (vehicleId == "" || vehicleId ==='' || vehicleId === 'undefined' || vehicleId === undefined){
        vehicleId === "null";
        }
        else{
        concatString = "'{" + vehicleId + "}'";
        }
        var jObj = {
        "vehicleId":concatString,
                "startFuelFillingdate":startDate,
                "endFuelFillingdate":endDate,
                "serialId":"null"
        }
        alert("json object::" + JSON.stringify(jObj));
                $.ajax({
                type: 'POST',
                        url: "http://192.168.1.106:2000/FleetManagement/fuelController/listOfFuelDetails",
                        data: JSON.stringify(jObj),
                        success: function (data, textStatus, jqXHR) {
                            alert("data.status---"+data.status);
                        if (data.status === "NO_DATA_FOUND"){
                        $('#data-not-available').empty();
                                console.log('data is not available on selected parameters');
                                $("#data-not-available").append('No records found');
                                //applyd_DataTable();
                        }
                        else{
                        $("#data-not-available").empty();
                                appendDataInDataTable(data);
                                alert('inside else part');
                        }

                        },
                        error: function (e) {
                        console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
                        },
                        dataType: "json",
                        contentType: "application/json"
                });
                }


function getFuelDetailsData(jsonObject){
alert("getFuelDetailsData javascript function is executed");
        }

function loadListOfStation(){

console.log("loadListOfVendar method is executed");
        $.ajax({
        type: 'GET',
                contentType: 'application/json',
                async: false,
                url: 'http://192.168.1.106:2000/FleetManagement/fuelController/getFuelStationsDropDown',
                success: function (data, textStatus, jqXHR) {
                console.log("Status" + textStatus);
                        var obj = JSON.stringify(data.objControllerDTO);
//                        JSON.parse(obj).forEach(item = > {
//                console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationId);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationName);
//                        console.log("@@@@@@@@@@@@@@@@@@@@@@@::" + item.fuelStationAddress);
//                        // $('#fuel-station-id').append('<option value=' +
//                        // item.fuelStationId +'>' + item.fuelStationName +
//                        // '</option>');
//                        $('#stationId').append('<option value=' + item.fuelStationId + '>' + item.fuelStationName + '</option>');
//                });
                        $('#stationId').trigger("chosen:updated");
                        $('#stationId').chosen();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                console.log('update Stock error: ' + textStatus);
                }
        });
        }
  function upDateFuelDetails(item){
   
   localStorage.setItem('serialId', item);
 var sId = localStorage.getItem('serialId');
   window.location.href = 'updateFuel.html';
        //window.location.href = "../Fuel/updateFuel.html";
        }

function getSingleRecords() {
    
        var sId = localStorage.getItem('serialId');
      
        var jObj = {
        "vehicleId":"null",
                "startFuelFillingdate":"null",
                "endFuelFillingdate":"null",
                "serialId":sId
        };
        $.ajax({
        type: 'POST',
                url: "http://192.168.0.102:2000/FleetManagement/fuelController/listOfFuelDetails",
                data: JSON.stringify(jObj),
                success: function(data, textStatus, jqXHR) {
                    alert("data========"+data);
                console.log('data got successfully');
                        console.log("Status" + textStatus);
                        var obj = JSON.stringify(data.objControllerDTO);
               
                       $.each(obj, function (i, resData) {
                           
                     //   JSON.parse(obj).forEach(item = > {
                  alert("itemitemitem::" + resData.serialId); //fuelQty
                        $('#emt-id').val($('#emt-id').val() + resData.emtId);
                        $('#pilot-id').val($('#pilot-id').val() + resData.pilotId);
                        $('#fuel-quantity-id').val($('#fuel-quantity-id').val() + resData.fuelQty);
                        $('#datetimepickerId').val($('#datetimepickerId').val() + resData.fillingdate);
                        $('#vehicleId_chosen').val($('#vehicleId_chosen').val() + resData.vehicleId);
                        $('#price-Unit-Id').val($('#price-Unit-Id').val() + resData.fuelTotalAmount);
                        $('#remarksId').val($('#remarksId').val() + resData.remarks);
                        $('#fuel-station-address-id').val($('#fuel-station-address-id').val() + resData.fuelStationDetails);
                        $('#PreviousOdoMeterId').val($('#PreviousOdoMeterId').val() + resData.startOdoMeterReading);
                        $('#end-odo-mtr').val($('#end-odo-mtr').val() + resData.endOdoMeterReading);
                });
                },
//                error: function(e) {
//                console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
              //},
                dataType: "json",
                contentType: "application/json"
        });
}



function resetAddNewFuel(){
document.getElementById("myForm").reset();
        document.getElementById("myForm1").reset();
        document.getElementById("myForm2").reset();
        }

function redirectOnFuelHistory(){

window.location.replace("../Fuel/FuelHistory.html");
        }




function appendDataInDataTable(data){
	$('#addListOfFuelRecords').empty();
	console.log("fuel history javascript function is executed::"+data);
	console.log("json data is::"+JSON.stringify(data));
	var obj = JSON.stringify(data.objControllerDTO);
        
          var jsonArray = data.objControllerDTO;
               
                $.each(jsonArray, function (i, resData) {
        
        
	
	 $('#addListOfFuelRecords').append('<tr><td><label class="check">' +'<input type="checkbox"  name="checkAll" class="checkSingle" value=' + resData.serialId + '>' +'<span class="checkmark"></span>' +'</label>' +'</td>' +'<td>' +'<img src="https://www.w3schools.com/bootstrap/sanfran.jpg" class="img-thumbnail vehicle-img" alt="vehicle">' +'<div class="text-left p-l-xxl">' +'<h5 class="m-b-n">' + resData.vehicleId + '</h5>' +'<p class="m-b-n"><i class="fa fa-circle p-r-xs text-green"></i>Active</p>' +'</div>' +'</td>' +'<td>' + resData.fillingdate + '</td>' +'<td>NA</td>' +'<td>NA</td>' +'<td>' + resData.fuelTotalAmount + '</td>' +'<td><i class="fa fa-edit" onClick="upDateFuelDetails(' + resData.serialId + ')"></i></td>' +'<td>' +'<div class="cursor" data-toggle="tooltip" title="delete">' +'<i class="fa fa-trash" data-toggle="modal1" data-target="#delete" onClick="deleteAddFuelRecords(' + resData.serialId + ')"></i>' +'</div>' +'</td>' +'</tr>')
   });
	
	//invoke data table java script function.
	 applyd_DataTable();
}



//function loadListAddFuelDetails() {
//    alert("llllllllllllllllllllllllllllllllll");
//    $('#fuelTable_Id').empty();
//    try {
//          var startDate = $("#start-date-id").val();
//           var endDate = $("#end-date-id").val();
//            var vehicleId = $("#vehicleId").val();
//            
//                if (startDate === "" || startDate === '' || startDate === 'undefined' || startDate === undefined && endDate == "" || endDate == '' || endDate == 'undefined' || endDate == undefined){
//        var d = new Date();
//                var date = d.getDate();
//                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
//                var year = d.getFullYear();
//                var dateStr = date + "/" + month + "/" + year;
//                var pdFormate = year + "-" + month + "-" + date;
//                startDate = pdFormate;
//                endDate = pdFormate;
//        }
//
//        var objJson = {
//            "vehicleId":"'{3}'",
//                "startFuelFillingdate":"2019-11-05",
//                "endFuelFillingdate":"2019-12-30",
//                "serialId":"null"
//
//        }
//        var strUrl = "http://192.168.1.106:2000/FleetManagement/fuelController/listOfFuelDetails";
//
//        console.log("strUrl : " + strUrl);
//
//        $.ajax({
//            type: "POST",
//            url: strUrl,
//            dataType: "json",
//            data: JSON.stringify(objJson),
//            contentType: "application/json",
//            async: false,
//            crossDomain: true,
//            success: function (data) {
//                console.log("data : " + data);
//                var responseCode = data.responseCode;
//                $('#vehicleList_Id').empty();
//                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
//                    var divTag = document.createElement("h2");
//                  //  $(divTag).css("text-align", "center");
//                    $(divTag).html("No data available....");
//                    $('#fuelTable_Id').append(divTag);
//                    
//                } else {
//                  
//                    var jsonArray = data.objControllerDTO;
//                    if (jsonArray.length > 0) {
//                        fuel_DOM(jsonArray);
//                        loadDataTable();
//                    }
//                }
//            },
//            error: function (err) {
//                console.error('update Stock error: ' + JSON.stringify(err));
//            }
//        });
//    }
//    catch (err) {
//        console.error("error occur in search()" + JSON.stringify(err));
//    }
//}
//function fuel_DOM(strData) {
//
//
//    try {
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
//        var objTHead1 = document.createElement("th");
//     
//        $(objTHead1).html('<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
//
//        $(objTHead1).addClass("text-center");
//        $(objTr).append(objTHead1);
////For table Heading1
//
//        var objTHead2 = document.createElement("th");
//        $(objTHead2).html("Vehicle");
//        $(objTHead2).addClass("text-center");
//        $(objTr).append(objTHead2);
//
////For table Heading2
//        var objTHead3 = document.createElement("th");
//        $(objTHead3).html("Time");
//        $(objTHead3).addClass("text-center");
//        $(objTr).append(objTHead3);
//
////For table Heading3
//        var objTHead4 = document.createElement("th");
//        $(objTHead4).html("Usage");
//        $(objTHead4).addClass("text-center");
//        $(objTr).append(objTHead4);
//
//
//        var objTHead5 = document.createElement("th");
//        $(objTHead5).html("Volume");
//        $(objTHead5).addClass("text-center");
//        $(objTr).append(objTHead5);
////For table Heading4
//        var objTHead6 = document.createElement("th");
//        $(objTHead6).html("Total");
//        $(objTHead6).addClass("text-center");
//        $(objTr).append(objTHead6);
//
//        //For table Heading5
//        var objTHead7 = document.createElement("th");
//        $(objTHead7).html("Update");
//        $(objTHead7).addClass("text-center");
//        $(objTr).append(objTHead7);
//
//        //For table Heading5
//        var objTHead8 = document.createElement("th");
//        $(objTHead8).html("Delete");
//        $(objTHead8).addClass("text-center");
//        $(objTr).append(objTHead8);
//
//
//
//        var objTBody = document.createElement("tbody");
//        $(objTBody).attr("id", "tbodyData");
//        $(ObjTableTag).append(objTBody);
//
//// Table Data Appending Here
//
//        for (var i = 0; i < strData.length; i++) {
//           
//            var index = i + 1;
//            var tbleRow = document.createElement("tr");
//
//            var tablcol1 = document.createElement("td");
//            //value=strData[i].permanentRegisteredNo,
//
//
//            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].permanentRegisteredNo + ' name="case"  )" ><span class="checkmark"> </label>');
//            $(tbleRow).append(tablcol1);
//            //$(tablcol1).attr('onclick', 'onclickCheckbox("' + strData[i].permanentRegisteredNo + '")');
//            $('#selectall').val(strData[i].permanentRegisteredNo);
//
//            $(tablcol1).attr('onclick', 'onclickCheckbox()');
//
////            var tablcol2 = document.createElement("td");
////            $(tablcol2).html(index);
////            $(tbleRow).append(tablcol2);
//
//            var tablcol2 = document.createElement("td");
//            $(tablcol2).html(strData[i].vehicleId);
//            $(tbleRow).append(tablcol2);
//
//            var tablcol3 = document.createElement("td");
//            $(tablcol3).html(strData[i].fillingdate);
//            $(tbleRow).append(tablcol3);
//
//            var tablcol4 = document.createElement("td");
//            $(tablcol4).html(strData[i].expectedMileAge);
//            $(tbleRow).append(tablcol4);
//            var tablcol5 = document.createElement("td");
//            $(tablcol5).html(strData[i].expectedMileAge);
//            $(tbleRow).append(tablcol5);
//
//            var tablcol6 = document.createElement("td");
//            $(tablcol6).html(strData[i].fuelTotalAmount);
//            $(tbleRow).append(tablcol6);
//
////            var tablcol8 = document.createElement("td");
////            $(tablcol8).html(strData[i].status);
////            $(tbleRow).append(tablcol8);
////            
//            var tablcol7 = document.createElement("td");
//            //var buttonTag = document.createElement('button');
//            $(tablcol7).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#editRemainder"></i><i></a> ');
//           // $(tablcol9).attr('onclick', 'deleteSingleVehicle()');
//           // var text = document.createTextNode("Update");
//           // buttonTag.appendChild(text);
//           // $(buttonTag).addClass('btn btn-primary btn-sm');
//           // $(buttonTag).addClass('fa fa-edit');
//
//            $(tablcol7).attr('onclick', 'get_RowData("' + strData[i].vehicleId + '","' + strData[i].fillingdate + '","' + strData[i].endOdoMeterReading + '","' + strData[i].fuelQty  + '")');
//
//           // $(tablcol9).append(buttonTag);
//           // $(tablcol9).css('height', '36px');
//
//            var tablcol8 = document.createElement("td");
//           
////            var text = document.createTextNode("delete");
////            buttonTag1.appendChild(text);
//            // $(buttonTag1).addClass('btn');
//
//            //$(buttonTag1).addClass('fa fa-trash');
//            $(tablcol8).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
//            $(tablcol8).attr('onclick', 'deleteSingleVehicle()');
//            //$(tablcol10).attr('id','singleDeleteId');
//
//            $(tablcol8).css('height', '5px');
//
//            $(tbleRow).append(tablcol7);
//            $(tbleRow).append(tablcol8);
//            $(objTBody).append(tbleRow);
//
//        }
//
//        $("#fuelTable_Id").append(objDivTag);
//
//
//    } catch (err) {
//        console.log("fuelTable_Id" + err);
//    }
//}
//
//function get_RowData(vehicleId ,endOdoMeterReading,fuelQty){
//    alert("kkkkkkkkkk");
//    
//    window.location.href = "updateFuel.html" 
//    pilot-id
//     $("#fuelTable_Id").
//    
//}