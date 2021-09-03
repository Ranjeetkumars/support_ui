
var SrpId = 0;
$(document).ready(function() {
    try {
        var data = JSON.parse(localStorage.getItem('Lobject'));
        if (data.responseCode === 200) {
            $.each(data.controllerDTOs, function(i, eachitem) {
                if (eachitem.errorcode == null) {
                    SrpId = eachitem.serviceProviderId;
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

    loadingCenter_Details();
    get_TerminalMapping_Details();
    
    // get_GetWhiteListingIpAddress_Details();

});
/*
 * onchange funcations
 */

$("#ipAddressId").keypress(function() {
    $('#ipAddress_Error').empty();
});
$("#terminalNoId").keypress(function() {
    $('#terminalNumber_Error').empty();
});
$("#passwordId").keypress(function() {
    $('#password_Error').empty();
});
$("#terminalMaping_CenterId").keypress(function() {
    $('#center_Error').empty();
});





/*
 Numaric valus Characters Validations(allow only numaric valus)
 */
$(".numkeypress").on('keypress', function(event) {
    //var regex = new RegExp("^[a-zA-Z0-9]+$");//allow digits and charaters not special charaters
    var rgx = /^[0-9]*\.?[0-9]*$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!rgx.test(key)) {
        event.preventDefault();
        return false;
    }

});

/*
 * For loading the Districs based on the district ID Bharath 06-05-2019 load
 * ServiceProviderType
 */
$("#ipAddressId").blur(function() {
    get_Check_Details();
});
$("#terminalNoId").blur(function() {
    get_Check_Details();
});



/*
 * For get_Center_Details Purpose
 */
function loadingCenter_Details() {
    try {
        var strUrl = Service.GetCenterDetails;
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
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
                    var jsonArray = data.cticontrollerDTOs;
                    $.each(jsonArray, function(i, resData) {
                        var modules = "<option value=" + resData.cti_CentId + ">" + resData.cti_CentName + "</option>";
                        $(modules).appendTo('#terminalMaping_CenterId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Center_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.log("Error in get_Center_Details" + err);
    }
}
/*
 *@DESC : savesaveHhcIpTerminalMappingDetails details
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function saveHhcIpTerminalMappingDetails() {
    try {
        var conditionId = 1; //1 for insert the data
        var IpAddress = $("#ipAddressId").val();
        //validateIP(ipAddress);
        if (IpAddress === '' || IpAddress === "0" || IpAddress === undefined) {
            $('#ipAddressId').focus();
            $('#ipAddress_Error').html('Please enter public ip address').css('color', 'red');
            return false;
        }
        var terminalNoId = $("#terminalNoId").val();
        //validateIP(ipAddress);
        if (terminalNoId === '' || terminalNoId === "0" || terminalNoId === undefined) {
            $('#terminalNoId').focus();
            $('#terminalNumber_Error').html('Please enter system terminal number').css('color', 'red');
            return false;
        }
        var passwordId = $("#passwordId").val();
        //validateIP(ipAddress);
        if (passwordId === '' || passwordId === "0" || passwordId === undefined) {
            $('#passwordId').focus();
            $('#password_Error').html('Please enter terminal password').css('color', 'red');
            return false;
        }
        var centerId = $("#terminalMaping_CenterId").val();
        //validateIP(ipAddress);
        if (centerId === '' || centerId === "0" || centerId === undefined) {
            $('#centerId').focus();
            $('#center_Error').html('Please select center').css('color', 'red');
            return false;
        }
        var siteId = localStorage.getItem('active_SiteId');
        var createdByuserId = 1;
        var createdByModuleId = 1;
        var hhcTerminalIsActive = true;

        var obj_Insert = {
            conditionId: conditionId,
            hhcIpAddress: IpAddress,
            hhcTerminalNumber: terminalNoId,
            hhcTerminalPassword: passwordId,
            centerId: centerId,
            siteId: siteId,
            createdByUserid: createdByuserId,
            createdByModuleId: createdByModuleId,
            hhcTerminalIsActive: hhcTerminalIsActive

        };
        var strUrl = Service.saveHhcIpTerminalDetials;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                } else {
                    $("#termianlMappingSucessId").html('Mapped Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            },
            error: function(err) {
                console.log("Error In saveHhcIpTerminalMappingDetails Not Inserted" + err);
            }
        });

    } catch (err) {
        console.log("Error In saveHhcIpTerminalMappingDetails Not Inserted" + err);
    }
}
/*
 *@DESC : get_GetWhiteListingIpAddress_Details
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function get_TerminalMapping_Details() {
    try {
        var siteid = localStorage.getItem('active_SiteId');
         //var siteid = 1;
        var json_TerminalMapping_Details = {
            "siteId": siteid
        };
        var strUrl = Service.getTerminalMappingDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_TerminalMapping_Details),
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
                    var arraydata = data.controllerDTOs;
                    get_TerminalMappingDetails_DOM(arraydata);
                }
            }, error: function(err) {
                console.log('In Error of  json_GetWhiteListingIp_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  json_GetWhiteListingIp_Details ' + err);
    }
}

/*
 *@DESC : get_GetWhiteListingIpAddress_DOM
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */

function get_TerminalMappingDetails_DOM(strData) {
    $('#terminalTableId').empty();
    try {

        for (var i = 0; i < strData.length; i++) {
             var index = i + 1;

            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var module = strData[i].hhcIpAddress;
            if (module === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(module);
            }
            $(tbleRow).append(tablcol2);
             
            
            var tablcol4 = document.createElement("td");
            var ctiagents = strData[i].hhcTerminalNumber;
            if (ctiagents === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(ctiagents);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var ctiagents = strData[i].centerId;
            if (ctiagents === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(ctiagents);
            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tbleRow).append(tablcol6);
            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');
            $(tabiclass2).attr('onclick', 'delete_TermianlMappingDetails("' + strData[i].hhcIpAddress + '","' + strData[i].hhcTerminalNumber + '")');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol6).append(tabiclass2);
            //Appending Body Here
            $("#terminalTableId").append(tbleRow);
        }

    } catch (err) {
        console.log("=====get_GetWhiteListingIpAddress_DOM======" + err);
    }
}

/*
 *@DESC : delete_WhiteListingDetails
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function delete_TermianlMappingDetails(ipAddress, terminalNumber) {
    try {
        var cnfrm = confirm("Do you want to remove!");
        if (cnfrm === true) {
            var conditionId=2;
            var ipAddress = ipAddress;
            var terminalNumber = terminalNumber;
            var passwordId=null;
            var centerId=null;
            var siteId = null;
            var createdByuserId=null;
            var createdByModuleId=null;
            var status = "false";
            var json_Delete_Details = {
            conditionId: conditionId,
            hhcIpAddress: ipAddress,
            hhcTerminalNumber:terminalNumber,
            hhcTerminalPassword: passwordId,
            centerId: centerId,
            siteId: siteId,
            createdByUserid: createdByuserId,
            createdByModuleId: createdByModuleId,
            hhcTerminalIsActive: status
            };

            var strUrl = Service.updateHhcIpTerminalDetials;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_Delete_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (responsecode !== 200) {
                        alert('NO DATA FOUND');
                    } else {
                        $("#termianlMappingSucessId").html('Removed Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }
                }, error: function(err) {
                    console.log('In Error of  delete_TermianlMappingDetails ' + err);
                }
            });
        } else {
        }

    } catch (err) {
        console.log('In Error of  delete_TermianlMappingDetails ' + err);
    }
}

/*
 *@DESC : Is Ip Address is already exist or not checking
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function get_Check_Details() {
    try {
        var siteid = localStorage.getItem('active_SiteId');
         //var siteid = 1;
        var json_TerminalMapping_Details = {
            "siteId": siteid
        };
        var strUrl = Service.getTerminalMappingDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_TerminalMapping_Details),
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
                     var ipAddress = $('#ipAddressId').val();
                     var terminalNoId = $('#terminalNoId').val();
                           // serviceProviderName = serviceProviderName.replace(/\s/g, '');

                            var list = data.controllerDTOs;

                            $.each(list, function(i, list) {
                                if (list.hhcIpAddress === ipAddress) {
                                    $('#ipAddressId').focus();
                                    $('#ipAddress_Error').html('Entered ip address is already exist').css('color', 'red');
                                   return;
                                }
                                if (list.hhcTerminalNumber === terminalNoId) {
                                   $('#terminalNoId').focus();
                                   $('#terminalNumber_Error').html('Entered terminal number is already exist').css('color', 'red');
                                   return;
                                }
                            });
                }
            }, error: function(err) {
                console.log('In Error of  json_GetWhiteListingIp_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  json_GetWhiteListingIp_Details ' + err);
    }
}



/*
 * Reset Terminal Mapping Details
 */

function teminalMappingReset(){
   $('#terminalMaping_CenterId').val('0').trigger('chosen:updated');  
}