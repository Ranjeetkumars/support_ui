/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var SYSTEM_IP = "52.172.54.113:9031";
var SYSTEM_IP = "52.172.54.113:9031";
Service = {
    //serviceProviderRegistration
    getVehicle: 'http://' + SYSTEM_IP + '/FleetManagement/inventory/getVehicleNo',
    getParameter: 'http://' + SYSTEM_IP + '/FleetManagement/inventory/getParameter',
    getInventoryDetailsReport: 'http://' + SYSTEM_IP + '/FleetManagement/inventory/GetInventoryDetailsReport   ',
  

};

