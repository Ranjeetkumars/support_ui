
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
    //loading dropdowns:
    get_GetWhiteListingIpAddress_Details();

});
/*
 * onchange funcations
 */

$("#individuleIPId").keypress(function() {
   $('#individuleIPId_Error').empty();
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
 *@DESC : saveinsertWhiteListingIpAddress details
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function insertWhiteListingIpAddress() {
    try {
        var IpAddress = $("#individuleIPId").val();
        //validateIP(ipAddress);
        if (IpAddress === '' || IpAddress === "0" || IpAddress === undefined) {
            $('#individuleIPId').focus();
            $('#individuleIPId_Error').html('Please Enter Public IP Address').css('color', 'red');
            return false;
        }
        var siteId = localStorage.getItem('active_SiteId');
        var srpId = SrpId;
        var createdByuserId = 1;
        var createdByModuleId = 1;
        var createdByRoleId = 1;


        var obj_Insert = {
            ipAddress: IpAddress,
            siteId: siteId,
            srpId: srpId,
            createdById: createdByuserId,
            createdByModuelId: createdByModuleId,
            createdByRoleId: createdByRoleId


        };
        var strUrl = Service.saveWhiteListingIpAddress;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var output = data.output;
                if (output === 'This IP_ADDRESSS already exist in the table') {
                    $("#individuleIPId_Error").html('Ip_address already exist, Please try another Ip.').css('color', 'red');
                     return;
                }
                else {
                    $("#Add_button_Success").html(IpAddress+" "+'Ip Added Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            },
            error: function(err) {
                console.log("Error In insertWhiteListingIpAddress Not Inserted" + err);
            }
        });

    } catch (err) {
        console.log("Error In insertWhiteListingIpAddress Not Inserted" + err);
    }
}
/*
 *@DESC : get_GetWhiteListingIpAddress_Details
 *@AuthorName : Bharath
 *@DATE : 05-12-2019
 */
function get_GetWhiteListingIpAddress_Details() {
    try {
        var siteid = localStorage.getItem('active_SiteId');
        var json_GetWhiteListingIp_Details = {
            "siteId": siteid
        };
        var strUrl = Service.GetWhiteListingIpAddress;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_GetWhiteListingIp_Details),
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
                    get_GetWhiteListingIpAddress_DOM(arraydata);
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

function get_GetWhiteListingIpAddress_DOM(strData) {
    $('#whitelistingTableId').empty();
    try {

        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            //  console.log('JSON DATA ----> ' + JSON.stringify(strData));
            
            var index = i + 1;

            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var module = strData[i].ipAddress;
            if (module === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(module);
            }
            $(tbleRow).append(tablcol2);



            var tablcol5 = document.createElement("td");
            $(tbleRow).append(tablcol5);
            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');
           $(tabiclass2).attr('onclick', 'delete_WhiteListingDetails("'+ strData[i].ipAddress+'",' + strData[i].serial_Id + ',' + strData[i].siteId + ')');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol5).append(tabiclass2);
            //Appending Body Here
            $("#whitelistingTableId").append(tbleRow);
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
function delete_WhiteListingDetails(ipAddress, serialId, siteId) {
    try {
        var cnfrm = confirm("Do you want to remove! Removed Ip will Not be allow to in Whitelisting");
        if (cnfrm === true) {
            var ipAddress = ipAddress;
            var serialId = serialId;
            var siteId = siteId;
            var status = "false";
            var json_whitelistDetails = {
                ipAddress: ipAddress,
                serial_Id: serialId,
                siteId: siteId,
                activeStatus: status
            };

            var strUrl = Service.updateWhiteListingIpAddress;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_whitelistDetails),
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
                        $("#Add_button_Success").html('Removed Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }
                }, error: function(err) {
                    console.log('In Error of  delete_WhiteListingDetails ' + err);
                }
            });
        } else {
        }

    } catch (err) {
        console.log('In Error of  delete_WhiteListingDetails ' + err);
    }
}


