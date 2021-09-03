/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To load the master data like distrct,baseloc ,vehicles..etc ajax calls will be here.
 * created by:priyadarshini
 * 06-05-2019
 */
var district = [];
var baselocations = [];
var ambulances = [];
var shiftType = [];
var odoMeter = [];
var fuelStation = [];
var districtName = [];
/*
 * For loading the Districs based on the state ID
 * venkat
 * 06-05-2019
 * state id is the input
 */
function loadingDistrictsMaster() {
//    var strUrl = MasterDataService.DistrictsMaster;
    var strUrl = Service.DistrictsMaster;
    district = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
//            headers: {
//                "X-TENANT-ID":"PROCREATE"
//                
//            }
           
            success: function (data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    district = data.gisControllerDTOs;
                }
            },
            error: function () {
                district = [];
                console.log('Error in loading loadingDistrictsMaster Data' + strUrl);
            }
        });
    }
    catch (err) {
        district = [];
        console.log(err.message);
    }
};

/*
 * For loading the Districs based on the district ID
 * priyadarshini
 * 06-05-2019
 * districtID is the input
 */
function loadingBaseLocationMaster(listOfDistrict) {
    var strUrl = Service.BaselocsMaster + "/" + listOfDistrict;
    baselocations = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    baselocations = data.gisControllerDTOs;
                    
                }
            },
            error: function () {
                baselocations = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        baselocations = [];
        console.log(err.message);
    }
    return baselocations;
}
/*
 * For loading the ambulance based on the district ID
 * priyadarshini
 * 06-05-2019
 * districtID is the input
 */
function  loadingAmbulanceMaster(baseLocation) {
    var strUrl = Service.AmbulanceMaster + "/" + baseLocation;
    ambulances = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    ambulances = data.gisControllerDTOs;
                }
            },
            error: function () {
                ambulances = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        ambulances = [];
        console.log(err.message);
    }
}
;





function get_shiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        // here calling masterdata ajax call
        loadingShiftTypeMaster();
        $.each(shiftType, function(i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#shiftTypeId_for_reg');

        });
         $("#shiftTypeId_for_reg").chosen();
    }
}
;

/*
 * For loading the ShiftType
 * priyadarshini
 * 06-05-2019
 * no input
 */
function  loadingShiftTypeMaster() {
    var strUrl = Service.ShiftTypeMaster;
    shiftType = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    shiftType = data.gisControllerDTOs;
                }
            },
            error: function () {
                shiftType = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        shiftType = [];
        console.log(err.message);
    }
}
;
/*
 * For loading the odometer
 * priyadarshini
 * 06-05-2019
 * no input
 */
function  loadingOdometerMaster(ambualceId) {
    var strUrl = Service.OdometerMaster + "/" + ambualceId;
   // alert("strUrl"+strUrl)
    odoMeter = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function (data) {
            	$('#previousOdoId').val(data.output);
     
            },
            error: function () {
                odoMeter = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        odoMeter = [];
        console.log(err.message);
    }
}
;


/*
 * For loading the district name
 * priyadarshini
 * 06-05-2019
 * district id
 */

//function  loadingDistrictsName(listOfDistrictId) {
//   
//    var strUrl = Service.districtsName + "/" + listOfDistrictId;
//    districtName = [];
//    try {
//        $.ajax({
//            type: "GET",
//            url: strUrl,
//            dataType: "json",
//            async: false,
//            success: function (data) {
//                if (data.responseCode === 200 || data.responseCode === '200') {
//                    //districtName = data.gisControllerDTOs.districtName;
//                    var ds_Name = data.gisControllerDTOs;
//                   
//                    $.each(ds_Name, function (i, resData) {
//                      
//                        //District Name Appending Here
//                    
//                        $('#ds_Id').val(resData.districtName);
//
//                    });
//
//                }
//            },
//            error: function () {
//                districtName = [];
//                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
//            }
//        });
//    }
//    catch (err) {
//        districtName = [];
//        console.log(err.message);
//    }
//}
//;


/*
 * For loading the baseloc name based oon base location id
 * priyadarshini
 * 06-05-2019
 * base loc id
 */
//function get_BaseLocation_Name(listOfBaseLocation) {
//
// var strUrl = Service.listOfBaseLocation+"/"+listOfBaseLocation;
//
//
//  try {
//        $.ajax({
//            type: "GET",
//            url: strUrl,
//            dataType: "json",
//            async: false,
//            success: function (data) {
//                if (data.responseCode === 200 || data.responseCode === '200') {
//                    var baseloc_Name = data.gisControllerDTOs;
//                    $.each(baseloc_Name, function (i, resData) {
//                       //Base loc Name Appending Here
//                   $('#bs_Id').val(resData.baselocationName);
//          });
//
//                }
//            },
//            error: function () {
//            
//                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
//            }
//        });
//    }
//    catch (err) {
//    
//        console.log(err.message);
//    }
//}
//;


function masterPaymentType() {
 
    var strUrl=Service.paymentType
    paymenttype = [];
    try {
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.responseCode === 200 || data.responseCode === '200') {
                    paymenttype = data.payementControllerDTO;

                }
            },
            error: function() {
                paymenttype = [];
                console.log('Error in loading getgeneraltenderreports Data' + strUrl);
            }
        });
    }
    catch (err) {
        paymentType = [];
        console.log(err.message);
    }
}
;


/*
 * forn
 * @param {type} baseLocation
 * @returns {undefined}
 */
function getOdoMeter(vehicleId) {
	var vehicle_id=vehicleId.split(",");
    var strUrl = Service.getOdoMeter + vehicle_id[0];
    console.log("comming into getOdoMeter === " + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        success: function(data) {
                 var responsecode = data.responseCode;
                 console.log('----- OdoMeter -----' + data.output);
                $('#previousOdometerForReg').val(data.output);
                
 
        },
        error: function() {
            console.log('Error in loading loadBaseLocation Data' + 'strUrl');
        }
    });
}

//for validation 
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

function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'FuelFillingData'},
            {extend: 'pdf', title: 'FuelFillingData'},
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

