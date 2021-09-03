/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    try {
        $('[data-toggle="tooltip"]').tooltip();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


var moduleId = 100;
function login() {
    var username = $('#username').val();
    var password = $('#password').val();
    if (username === '' || username === "") {
        showNotificationError("Please Enter UserName", "username", "error");
    } else if (password === '' || password === "") {
        showNotificationError("Please Enter password", "password", "error");
    }

    var objJson = {
        userName: username,
        userPassword: password
    };

    var strUrl = Service.isUserExist;
    console.log("strUrl======" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
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
                var jsonArray = data.objControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    console.log("userID--------" + resData.userID);
                    var userID = resData.userID;
                    localStorage.setItem("userID", userID); // set a variable 
                    if (userID !== "NA") {
                        checkForModule(userID);
                    }
                    else {
                        showNotificationError("User Does Not Exist", "loginId", "error");
                    }
                });
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });

}

function checkForModule(userID) {
    var userID = userID;
    var moduleId = 100;

    var objJson = {
        userID: userID,
        moduleID: moduleId
    };
    var strUrl = Service.checkForModule;
    console.log("strUrl======" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
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
                var jsonArray = data.objControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    console.log("moduleID---------" + resData.moduleID);
                    console.log("moduleName-------" + resData.moduleName);
                    var moduleID = resData.moduleID;
                    localStorage.setItem("moduleID", moduleID);
                    getRoles(moduleID, userID);
                });
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}
function getRoles(moduleID, userID) {

    var objJson = {
        moduleID: moduleID,
        userID: userID
    };
    console.log("objJson======" + JSON.stringify(objJson));
    var strUrl = Service.getRoles;
    console.log("strUrl======" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
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
                var jsonArray = data.objControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    console.log("roleID---------" + resData.roleID);
                    console.log("roleName-------" + resData.roleName);
                    var roleID = resData.roleID;
                    if (userID != null || moduleID != null || roleID != null) {
                        getPrevillages(userID, moduleID, roleID);
                    }
                });
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}
function getPrevillages(userID, moduleID, roleID) {
    var objJson = {
        userID: userID,
        moduleID: moduleID,
        roleID: roleID,
        issystemPrivilege: true
    };
    console.log("objJson======" + JSON.stringify(objJson));
    var strUrl = Service.getPrevillages;
    console.log("strUrl======" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
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
                var jsonArray = data.objControllerDTO
                $.each(jsonArray, function(i, resData) {
                    console.log("previllageId---------" + resData.previllageId);
                    console.log("previllageName-------" + resData.previllageName);
                    var previllageId = resData.previllageId;
                    if (userID != null || moduleID != null || roleID != null) {

                        loginMain(userID, moduleID);
                    }
                });
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}
function  loginMain(userID, moduleID) {
//    alert("Hello Login");

//    var userIp = getBrowserName();
//       console.log('userIp--' + userIp);
    var strUrl = Service.loginUrl;
   
    var objJson = {
        userID: userID,
        moduleID: moduleID,
        hhc_ip: '192.168.1.215',
        portNo: 450,
        unifiedgrouptypeId: 1,
        extension: 4003
    };
    console.log("objJson======" + JSON.stringify(objJson));
    console.log("strUrl======" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                if (data.count === 1 || data.count === '1') {
                    
                   
//                    window.alert("Login Success");
                    window.location.href = "http://127.0.0.1/SupplyChainManagement/dashboard.html";
//                    window.location.href = "file:///D:/SCM_UI/SupplyChainManagement/web/dashboard.html";
//                    window.location.assign("http://127.0.0.1/SupplyChainManagement/dashboard.html");
//                    window.location.replace("https://www.google.com");


                }
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}



function  logout() {
    var userID = localStorage.getItem("userID");
    var moduleID = localStorage.getItem("moduleID");
    var strUrl = Service.logout;
    console.log("strUrl======" + strUrl);
    var objJson = {
        userID: userID,
        moduleID: moduleID
    };

    console.log("objJson======" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {

            } else {
                if (data.count == 1) {

//                    window.alert("Logout Success");
                    window.location.href = "http://127.0.0.1/SupplyChainManagement/login.html";
//                    window.location.href = "file:///D:/SCM_UI/SupplyChainManagement/web/dashboard.html";
                }
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}


function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
            noop = function() {
            },
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;
    function iterateIP(ip) {
        if (!localIPs[ip])
            onNewIP(ip);
        localIPs[ip] = true;
    }
    //create a bogus data channel
    pc.createDataChannel("");
    // create offer and set local description
    pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0)
                return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }, noop);
    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))
            return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

function getBrowserName() {

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        alert('Opera');
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
        alert('Chrome');
        $.getJSON('https://api.ipify.org?format=json', function(data) {
            var systemIp = data.ip;
            return systemIp;
        });

    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        alert('Safari');
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        alert('Firefox');
        getUserIP(function(ip) {
            var systemIp = ip;
            alert('System ip address = ' + systemIp);
        });
        return systemIp;
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        alert('IE');
    }
    else {
        alert('unknown');
    }
    console.log(systemIp);
    return  systemIp;
}





/*
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 19-08-2019
 */
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