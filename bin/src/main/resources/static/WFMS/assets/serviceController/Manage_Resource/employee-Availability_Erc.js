/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Get_EmployeeDetails_AvailbilityDetails() {


}

function getting_CurrentMonth_Details(){
var ctDate = new Date();
var Month ;
var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

var days ;
var CurrentYear ;
var year = ctDate.getFullYear();
var date = ctDate.getDate();
var month = ctDate.getMonth();
var day = ctDate.getDay();
var day_Name = weekday[day];
 month += 1;

switch (month) {
    case 1:
        month = "January";
        days = 31;
        break;
    case 2:
        month = "February";
        //Find the selected year is leap or not
        if (CurrentYear % 4 !== 0) {
            days = 28;
        } else {
            days = 29;
        }
        break;
    case 3:
        month = "March";
        days = 31;
        break;
    case 4:
        month = "April";
        days = 30;
        break;
    case 5:
        month = "May";
        days = 31;
        break;
    case 6:
        month = "June";
        days = 30;
        break;
    case 7:
        month = "July";
        days = 31;
        break;
    case 8:
        month = "August";
        days = 31;
        alert('month'+month);
        alert('days'+days);
        break;
    case 9:
        month = "September";
        days = 30;
        break;
    case 10:
        month = "October";
        days = 31;
        break;
    case 11:
        month = "November";
        days = 30;
        break;
    default:
        month = "December";
        days = 31;
}



//  for ($intDays = 1; $intDays <= $days; $intDays++) {
////                    $displaytoday = new DateTime("$CurrentYear-$CurrentMonth-$intDays");
////                    $displaytoday1 = "$displaytoday->format('D')";
//                    $displaytoday = date_create("$CurrentYear-$CurrentMonth-$intDays");
//                    $displaytoday1= date_format($displaytoday, 'D');
//                    var date=('<td class="drContent" align="center" width="2%" style="background-color:#ccccff">' . +date+ '<br/>' .(+displaytoday+, 'D') . '</td>');
//                }
                
}