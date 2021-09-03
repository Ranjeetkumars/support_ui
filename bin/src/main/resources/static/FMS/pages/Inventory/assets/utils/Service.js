/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SYSTEM_IP = "192.168.1.106:7000";

Service = {
    //serviceProviderRegistration
    getVehicle: 'http://' + SYSTEM_IP + '/common/inventory/getVehicleNo',
    getParameter: 'http://' + SYSTEM_IP + '/common/inventory/getParameter',
    getInventoryDetailsReport: 'http://' + SYSTEM_IP + '/common/inventory/GetInventoryDetailsReport   ',
  

};

