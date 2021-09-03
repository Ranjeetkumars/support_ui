/**
 * 
 * @author:Bhuvi
 */


function getCountry() {
	//alert("country function calling...1")
    var objJson = {
        "country": 1
    };
    var strUrl = Service.getCountry;
    console.log(":" + strUrl);
   // alert("strurl------->"+strUrl)
    $.ajax({
    	type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
      /*  headers: {
            "X-TENANT-ID": "tenantId2"
        },*/
        success: function(data) {
        	//alert("success data------->"+data.objCommonDataControllerDTO)
        	console.log("sucess--------->"+data);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("200 !");
            } else {
            	countryid = data.objCommonDataControllerDTO;
            }
        },
        error: function() {
            state = [];
            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
        }
    });
}
;

function getState() {
//alert("get State function is calling....1");
    var objJson = {
        "countryId": 1
    };
    var strUrl = Service.getState;
    console.log(":" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
      /*  headers: {
            "X-TENANT-ID": "tenantId2"
        },*/
        success: function(data) {
        	console.log("sucessdddd--------->"+data);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("200 !");
            } else {
                state = data.objCommonDataControllerDTO;
            }
        },
        error: function() {
            state = [];
            console.log('Error in loading getgeneraltenderreports Data' + strUrl);
        }
    });
}
;


/*
 *getDistrict
 * @param {type} listOfState
 * @returns {undefined}
 */
function getDistrict(listOfState) {
	console.log("getDistrict"+listOfState);
    var objJson = {
        "stateId": listOfState
    };
    var strUrl = Service.getDistricts;
    console.log(":" + strUrl);

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
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
                district = data.objCommonDataControllerDTO;
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
 */
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

/**
 *@controller:userAdminController 
 * getCity
 * @param {type} listOfMandal
 * @returns {undefined}
 */
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
;
