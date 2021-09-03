/**
 * 
 */

//Check logged in or not if he is not logged in move to login page
var SrpId=0;
var Username=null;
$(document).ready(function() {
	 try {
			var data = JSON.parse(localStorage.getItem('Lobject'));
			if (data.responseCode === 200) {
				$.each(data.controllerDTOs, function(i, eachitem) {
					if (eachitem.errorcode == null) {
						SrpId=eachitem.serviceProviderId;
						Username=eachitem.username;
					} else {
						window.location.href = "login.html";
					}
				});
			} else {
				window.location.href = "login.html";
			}
		
		} catch (err) {
			window.location.href = "login.html";
		}
		
		SRPDashBoardLoading();
    localStorage.removeItem('active_SiteId');
    localStorage.removeItem('active_SiteName');

    
    
    
});
/*
 * Loading All sites on Dash board based on service provider Id.
 */
function SRPDashBoardLoading() {
try{
    
  var srpuserId = SrpId;
    var userDetails = {
        'sprRegId': srpuserId

    };

    var strUrl = Service.SPRDashBoardDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(userDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {

            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var list = data.controllerDTOs;

                var divRow = document.createElement('div');
                $(divRow).addClass('row');

                $.each(list, function(i, list) {
                	var siteId = list.siteId;
                    var siteName = list.siteName;
                    var startDate = list.startDate;
                    startDate = startDate.split(' ')[0];
                    var dateAr1 = startDate.split('-');
                    startDate = dateAr1[2] + '-' + dateAr1[1] + '-' + dateAr1[0];
                    var endDate = list.endDate;
                    endDate = endDate.split(' ')[0];
                    var dateAr = endDate.split('-');
                    endDate = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0];
                    var totalAgents = list.totalAgents;
                    var status = list.status;

                    var divCol2 = document.createElement('div');
                    $(divCol2).addClass("col-md-3 col-xs-12");
                    divRow.appendChild(divCol2);

                    var messageAnchor = document.createElement('a');
                    $(messageAnchor).attr("href", "sitesingleview.html");
                    $(messageAnchor).attr('onclick', 'get_SiteId(' + siteId + ',"'+siteName+'")');
                    divCol2.appendChild(messageAnchor);


                    var divCard = document.createElement('div');
                    $(divCard).addClass("card");
                    messageAnchor.appendChild(divCard);

                    var divSub = document.createElement('div');
                    divCard.appendChild(divSub);

                    var spanTag = document.createElement('span');
                    divSub.appendChild(spanTag);

                    var smallTag = document.createElement('small');
                    $(smallTag).html(status);
                    spanTag.appendChild(smallTag);

                    var divCardchild = document.createElement('div');
                    $(divCardchild).addClass('stat-percent');
                    divSub.appendChild(divCardchild);

                    var subSmallTag = document.createElement('small');
                    divCardchild.appendChild(subSmallTag);
                    $(subSmallTag).html("48%");


                    var divProgres = document.createElement('div');
                    $(divProgres).addClass('progress progress-mini');
                    divSub.appendChild(divProgres);

                    var divSubProgres = document.createElement('div');
                    $(divSubProgres).addClass('progress-bar');
                    $(divSubProgres).attr("style", "width: 48%;");
                    divProgres.appendChild(divSubProgres);

                    var headerTag = document.createElement('h4');
                    $(headerTag).addClass('text-center text-blue');
                    $(headerTag).attr('id', 'siteName');
                    $(headerTag).html(siteName);
                    divCard.appendChild(headerTag);

                    var headerTagAgents = document.createElement('h5');
                    $(headerTagAgents).addClass('text-center p-t-sm');
                    $(headerTagAgents).html('Maximum Active Agents-' + totalAgents);
                    divCard.appendChild(headerTagAgents);

                    var altActiveTag = document.createElement('i');
                    $(altActiveTag).addClass('fas fas fa-info-circle info');
                    $(altActiveTag).attr('data-toggle', 'tooltip');
                    $(altActiveTag).attr('data-html', 'true');
                    $(altActiveTag).attr('data-placement', 'right');
                    var tooltipp=get_modules_basedon_siteid(list.siteId);
                    var formattedString = tooltipp.split(",").join("<br />")
                    $(altActiveTag).attr('title', formattedString);
                    headerTagAgents.appendChild(altActiveTag);


                    var divActivTag = document.createElement('div');
                    $(divActivTag).addClass('text-center p-t-sm');
                    divCard.appendChild(divActivTag);

                    var paragraphActivTag = document.createElement('p');
                    $(paragraphActivTag).attr('id', 'status');
                    $(paragraphActivTag).html(status);
                    if (status === 'Pending') {
                        $(paragraphActivTag).addClass('label label-warning');
                    } else if (status === 'Active') {
                        $(paragraphActivTag).addClass('label label-primary');
                    } else if (status === 'In Active') {
                        $(paragraphActivTag).addClass('label label-danger');
                    }
                    divActivTag.appendChild(paragraphActivTag);


                    var divDate = document.createElement('div');
                    $(divDate).addClass('row text-gray p-t-sm');
                    divCard.appendChild(divDate);

                    var divStartDate = document.createElement('div');
                    $(divStartDate).addClass('pull-left');
                    $(divStartDate).attr('id', 'startDateId');
                    divDate.appendChild(divStartDate);


                    var stDateSmall = document.createElement('small');
                    divStartDate.appendChild(stDateSmall);

                    var stDateStrong = document.createElement('strong');
                    $(stDateStrong).html('Start Date ');
                    stDateSmall.appendChild(stDateStrong);

                    var stbrkTag = document.createElement('br');
                    stDateSmall.appendChild(stbrkTag);

                    var startSpan = document.createElement('span');
                    $(startSpan).html(startDate);
                    stDateSmall.appendChild(startSpan);


                    var divEndDate = document.createElement('div');
                    $(divEndDate).addClass('pull-right');
                    $(divEndDate).attr('id', 'endDateId');
                    divDate.appendChild(divEndDate);


                    var edDateSmall = document.createElement('small');
                    divEndDate.appendChild(edDateSmall);

                    var edDateStrong = document.createElement('strong');
                    $(edDateStrong).html('End Date');
                    edDateSmall.appendChild(edDateStrong);

                    var brkTag = document.createElement('br');
                    edDateSmall.appendChild(brkTag);

                    var endSpan = document.createElement('span');
                    $(endSpan).html(endDate);
                    edDateSmall.appendChild(endSpan);

                    $('#content-wrap').append(divRow);


                });
            }
        },
        error: function(err) {
            console.error("Error in loading SPR dashboard"
                    + JSON.stringify(err));
        }
    });
}catch(err){
    console.error("Error in loading SPR dashboard"+err);
}
}
 function get_SiteId(siteId,siteName) {
	var local_siteId = localStorage.setItem('active_SiteId', siteId);
	var local_siteId = localStorage.setItem('active_SiteName', siteName);
}

/*
 * Get Modules Based on site Id
 */

function get_modules_basedon_siteid(siteId) {
	try{
    var sr_siteid = siteId; 
    var json_srgDetails = {
        "sr_siteid": siteId
    };

    var finall='';
    var strUrl = Service.GetUserSegregationDetails;
   // console.log("===GetUserSegregationDetails url=="+strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_srgDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
            	 finall='No Modules Registered with this Site';
            } else {

                var jsonArray = data.siteRegistrationControllerDTO;
            	 $.each(jsonArray, function(i, jsonArray) {
                     finall=finall+jsonArray.modulename+'-'+jsonArray.sr_module_wise_agents+',';

            	 });
               
            }
        }, error: function(err) {
            console.log('In Error of  get_modules_basedon_siteid ' + err);
        }
    });
    return finall;
	}catch(err){
        console.log('In Error of  get_modules_basedon_siteid ' + err);
	} 
}

/*
 * Logout the application from Dash board.
 */

function serviceProviderLogout(){
	try{
	var condition = 2;
    var userId = SrpId;
    var userName = Username;
    var logintime = "now()";
    var logouttime = "now()";
    var ipaddress = ip;
    var portNumber = 1000;
    var forceLogOut = "now()";
    var latitude = lat;
    var logintude = lang;
    var createdById = 1;
    var createdByModuleId = 1;
    var creaedByRoleId = 1;

    var logoutDetails = {
        conditionId: condition,
        userName: userName,
        userId: userId,
        loginTime: logintime,
        logoutTime: logouttime,
        ipAddress: ipaddress,
        portNumber: portNumber,
        forceLogoutTime: forceLogOut,
        latitude: latitude,
        logitude: logintude,
        createdById: createdById,
        createdByModuleId: createdByModuleId,
        createdByRoleId: creaedByRoleId

    };
   
    var strUrl = Service.serviceProverlogout;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(logoutDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        
        success: function(data) {
            
            
            var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
           
                    window.location.href = 'login.html';
                }

          
        },
        error: function(err) {
            console.error("Error in loginservice"
                    + JSON.stringify(err));
        }
    });
}catch(err){
    console.log('In Error of  get_modules_basedon_siteid ' + err);
}
}



/*
 * Get Client system Ip and  latitude and logitude.
 */

var ip='';
var lat='';
var lang='';
function locationAndIp() {
	try{
    $.ajax({
        url: 'https://json.geoiplookup.io',
        dataType: 'json',
        success: function(data) {
             ip = data.ip;
            var city = data.city;
             lat = data.latitude;
             lang = data.longitude;
            var country = data.country_name;
          //  alert(ip + "<br>" + city + "<br>" + lat + "<br>" + lang + "<br>" + country + "<br>");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Please Check you API" + errorThrown);
        }

    });

}catch(err){
console.log("Please Check you API" + err);
}
}


///*
// * Internet connection connection checking validation
// */
//function checkconnection() {
//    var status = navigator.onLine;
//    if (status) {
//        alert('Internet connected !!');
//    } else {
//        alert('No internet Connection !!');
//    }
//}
