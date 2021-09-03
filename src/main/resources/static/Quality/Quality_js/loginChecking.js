/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


function checklogin() {

    var created_user_id = localStorage.getItem("userID");
    console.log("created_user_id : " + created_user_id);
    if (created_user_id === "null" || created_user_id === null || created_user_id === " " || created_user_id === "undefined" || created_user_id === undefined)
    {
        alert("Loging failed, Please Login again");
        window.location.assign(Service.loginpage_url);
    }


}



function redirection() {
    var created_user_id = localStorage.getItem("userID");
    if (created_user_id !== "null" || created_user_id !== null || created_user_id !== " " || created_user_id !== "undefined" || created_user_id !== undefined)
    {
//            alert("Loging failed, Please Login again");
        window.location.assign(Service.dashboard_url);
    }
}