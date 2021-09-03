/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
 // $("#hhhhhhhhh").hide();
});
var availableStatus;
$("#AvailableId").on('change', function () {
  //$('#functionalId').show();
 if ($(this).is(':checked')) {
  console.log("Its checked");
   $('#availText').html("Available");
         var avialble =$('#AvailableId').val();
       availableStatus = avialble;
    }
    else {
     $('#functionalId').hide();
    
        console.log("Its uncheck");
        $('#availText').html("UnAvailable");
        console.log("Its Unchecked");
        availableStatus ="off";  
    }
    console.log("availablabilitystatus==========="+availableStatus);
    $('#example').empty();
   // getAuditDetailsReport11();
});
function onclickmethod(){
  //$("#hhhhhhhhh").show();
}