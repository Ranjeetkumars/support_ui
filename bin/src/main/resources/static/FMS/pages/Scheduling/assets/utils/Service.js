/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SYSTEM_IP = "192.168.1.106:7000";

Service = {
    //serviceProviderRegistration
    getVehicle: 'http://' + SYSTEM_IP + '/common/inventory/getVehicleNo',
   getUserName: 'http://' + SYSTEM_IP + '/common/audit/getUserName',
   getVicleDetailsDetails: 'http://' + SYSTEM_IP + '/common/audit/getVehicleDetails',
   saveScheduleingDetails: 'http://' + SYSTEM_IP + '/common/audit/generateAuditId',
   scheduleDataDetails: 'http://' + SYSTEM_IP + '/common/audit/getAuditDetailsStatus',
  getAuditDetailsReport: 'http://' + SYSTEM_IP + '/common/audit/GetAuditDetailsReport',
   getSessionName: 'http://' + SYSTEM_IP + '/common/audit/getSectionName',
  
  

};

