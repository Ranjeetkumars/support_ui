
//Login
function loginSla() {
  
    var username = $('#usernameid').val();
    var password = $('#passwordid').val();
    var objJson = {
        "username": username,
        "password": password,
        "localIp": "192.168.1.149",
        "publicIp": "192.168.1.149",
        "siteID": "34",
        "loginDateandTime": "now()"
    };
    var strUrl = Service.login;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var userID, roleid,moduleid, tokenid, errormessage;
          //  var moduleid=[];
            var responsecode = data.objSupportLoginControllerDTOs;
            for (var i = 0; i < responsecode.length; i++) {
                //errormessage = responsecode[i].errorName;
//				if(errormessage!==null){
//			    //Displaying toast message
//				$('#toastid').show();
//			     window.setTimeout(function () {
//			    	 $('#toastid').hide();
//			        }, 800);	
//				return false;
//				}else{
                userID = responsecode[i].userID;
                console.log("userID===>" + userID);
                var token = responsecode[i].tockenID;
            
                tokenid =  token;
                alert("token========"+token);
                console.log("token=====>" + token);
                var jsonRoles = responsecode[i].modules;
                for (var i = 0; i < jsonRoles.length; i++) {
                    //console.log("roleid ===>  " + jsonRoles[i].roleID);
                   // roleid = jsonRoles[i].roleID;
                   // console.log("roles====>" + roleid);
                    moduleid = jsonRoles[i].moduleid;
                    alert("moduleid====="+moduleid);
                    console.log("ModuleId ===>  " + moduleid);
                }
                //}
            }
            //setting data to local Storage
            localStorage.setItem("roleid", roleid);
            localStorage.setItem("moduleid", moduleid);
            localStorage.setItem("userID", userID);
            localStorage.setItem("token", tokenid);
            //getting data from localStorage
            var user_id = localStorage.getItem("userID");
            var module_id = localStorage.getItem("moduleid");
            var token_id = localStorage.getItem("token");
           
            //Redirect to home page
           // if (module_id === "25"  && user_id !== null && token_id === tokenid) {
           if (module_id === "25") {
                window.location.href = "file:///G:/Ranjit/sla/QA/web/dashboard.html";
            } else {
                $('#toastid').show();
                window.setTimeout(function() {
                    $('#toastid').hide();
                }, 800);
                return false;
            }
        },
        error: function() {
            console.log('In Error of  Details ');
        }
    });

}
function logout() {
    localStorage.clear();
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("moduleid");
    var role_id = localStorage.getItem("roleid");
    var token_id = localStorage.getItem("token");
    console.log("userid====>" + user_id);
    console.log("module_id====>" + module_id);
    console.log("role_id====>" + role_id);
    if (module_id === null && user_id === null && role_id === null && token_id === null) {
        window.location.href = "file:///G:/Ranjit/sla/QA/web/sla_htmlpages/login.html";
    }
}

