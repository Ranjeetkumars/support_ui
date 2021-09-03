/**
 * 
 * @author:Bhuvi
 */






/*
 *getDistrict
 * @param {type} listOfState
 * @returns {undefined}
 */
function getDistrict(listOfState) {
    var strUrl = Service.getdistrictList;
    console.log(":" + strUrl);

    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: true,
     /*   headers: {
            "X-TENANT-ID": "tenantId2"
        },
        su*/
        success: function(data) {
        	console.log("sucess--------->"+data);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("200 !");
            } else {
                district = data.objGetGisDataControllerDTO;
            }
        },
        error: function() {
            district = [];
            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
        }
    });
}
;

/**
 * getMandal
 * @param {type} listOfDistrict
 * @returns {undefined}
 *//*
function   getMandal(listOfDistrict) {
	console.log("mandal function calling....")
    var objJson = {
        "districtId": listOfDistrict
    };
    var strUrl = Service.getMandal;
    console.log(":" + strUrl);

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
//        headers: {
//            "X-TENANT-ID": "tenantId2"
//        },
        success: function(data) {
            console.log("success---->"+data)
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("200 !");
            } else {
                mandal = data.objCommonDataControllerDTO;
            }
        },
        error: function() {
            mandal = [];
            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
        }
    });
}
;

*//**
 *@controller:userAdminController 
 * getCity
 * @param {type} listOfMandal
 * @returns {undefined}
 *//*
function getCity(listOfMandal) {
	console.log("getCity function calling....")
	console.log("listOfMandal------>"+listOfMandal);
    var objJson = {
        "mandalid": listOfMandal
    };
    var strUrl = Service.getCity;
    console.log(":" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
//        headers: {
//            "X-TENANT-ID": "tenantId2"
//        },
        success: function(data) {
        	console.log("success------>"+data);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("200 !");
            } else {
                city = data.objCommonDataControllerDTO;
            }
        },
        error: function() {
            city = [];
            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
        }
    });
}
;*/
