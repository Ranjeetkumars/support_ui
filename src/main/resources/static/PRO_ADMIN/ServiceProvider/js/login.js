$(document).ready(function() {
    function disableBack() {
        window.history.forward();
    }

    window.onload = disableBack();
    window.onpageshow = function(evt) {
        if (evt.persisted)
            disableBack();
    }
});
function radioBtnValues() {
    $("input[name='loginType']").change(function() {
        var type = this.value;
        if (type === "otp") {
            $('#btnHaveOtp').css('display', 'block');
            $('#btnHavePwd').css('display', 'none');
        }
        else if (type === "pwd") {
            $('#btnHaveOtp').css('display', 'none');
            $('#btnHavePwd').css('display', 'block');
        }
    });
}

function logIn() {
//Next step for Password Login
    $('#btnHavePwd').click(function() {
        if ($('#userName').val() === '' || $('#userName').val() === null) {
            $('#errorMsg').html("Please Enter User Name or Mobile Number");
            $('#userName').focus();
            $('#userName').addClass('active');
            return;
        } else {
            $('#formData').css('display', 'none');
            $('#pwdForm').css('display', 'block');
            $('#otpForm').css('display', 'none');
            $('#backArrow').css('display', 'inline-block');
        }
    });
//    Next Step for Generate OTP
    $('#btnHaveOtp').click(function() {
        if ($('#userName').val() === '' || $('#userName').val() === null) {
            $('#errorMsg').html("Please Enter User Name or Mobile Number");
            $('#userName').focus();
            $('#userName').addClass('active');
            return;
        } else
        {
            $('#errorMsg').html("");
            $('#formData').css('display', 'none');
            $('#pwdForm').css('display', 'none');
            $('#otpForm').css('display', 'block');
            $('#backArrow').css('display', 'inline-block');
        }
    });
//    Back Arrow function
    $('#backArrow').click(function() {
        $('#formData').css('display', 'block');
        $('#pwdForm').css('display', 'none');
        $('#otpForm').css('display', 'none');
        $('#backArrow').css('display', 'none');
        $('#forgotPwdForm').css('display', 'none');
    });
//    Forgot Password
    $('#forgotPwdLink').click(function() {
        $('#backArrow').css('display', 'inline-block');
        $('#forgotPwdForm').css('display', 'block');
        $('#pwdForm').css('display', 'none');
    });
}

/*
 * Login With Password
 */
function loginWithPwd() {

  var userName = $('#userName').val();
  var password = $('#password1').val();
  if (password === "" || password === null || password === undefined) {
      $('#errorMsgForPwd').html("Please Enter Password");
      $('#password1').focus();
      $('#password1').addClass('active');
      return;
  } else {
      $('#errorMsgForPwd').html("");
      $('#password1').removeClass('active');
  }

  var userDetails = {
      'username': userName,
      'password': password
  };
  var strUrl = Service.loginDetailsService;
  
  $.ajax({
      type: "POST",
      url: strUrl,
      dataType: "json",
      data: JSON.stringify(userDetails),
      contentType: "application/json",
      async: false,
      crossDomain: true,
      success: function(data) {
			        	 if (data.responseCode === 200) {

				$.each(data.controllerDTOs, function(i, eachitem) {
					if (eachitem.errorcode == null) {
						window.location.href = "dashboard_1.html";
						localStorage.setItem('Lobject', JSON.stringify(data));						
						var userId = eachitem.serviceProviderId;
	                    var userName = eachitem.username;
	                    var password = eachitem.password;
	                    var ipaddress = data.serverIp;
	                    var portNumber = data.port;
	                    insertIntoTrans(userId, userName, portNumber);
	                    } else {
						$('#errorMsgInvalid').html(eachitem.errorcode);
					}
				});
			} else {
				$('#errorMsgInvalid').html('Invalid User Name or Password');
			} 
      },
      error: function(err) {
          console.error("Error in loginservice"
                  + JSON.stringify(err));
      }
  });
}

/*
 * Insert login details into logintrance table
 */

function insertIntoTrans(userId, userName,portNumber) {
    var condition = 1;
    var userId = userId;
    var userName = userName;
    var logintime = "now()";
    var logouttime = "now()";
    var ipaddress = ip;
    var portNumber = portNumber;
    var forceLogOut = "now()";
    var latitude = lat;
    var logintude = lang;
    var createdById = 1;
    var createdByModuleId = 1;
    var creaedByRoleId = 1;

    var insertDetails = {
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
    var strUrl = Service.insertLogingTransTable;
   $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(insertDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var list = data.controllerDTOs;
            $.each(list, function(i, list) {
                if (list.errorcode === 'Password do not match') {
                    $('#password1').focus();
                    $('#errorMsgInvalid').html('Invalid User Name or Password');
                    return;
                } else {
                      
                }

            });
        },
        error: function(err) {
            console.error("Error in loginservice"
                    + JSON.stringify(err));
        }
    });
}



/*
 * For Get the Client System public Ip , latitude and logitude. 
 */
var ip='';
var lat='';
var lang='';
function locationAndIp() {
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
}

/*
 * Checking user is login or Not.
 */
function isUser_LoginorNot() {
    var userId = localStorage.getItem("Lobject");
    if (userId === undefined || userId === null || userId === 'null' || userId.length === null || userId.length === '0') {
        window.location.href = 'http://localhost:2800/admin/ServiceProvider/login.html';
        
    }
    else {
    }

}