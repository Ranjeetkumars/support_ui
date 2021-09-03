/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SYSTEM_IP = "10.110.4.152:9161";
Service = {
    //serviceProviderRegistration
    getVehicle: 'http://' + SYSTEM_IP + '/FleetManagement/inventory/getVehicleNo',
    getUserName: 'http://' + SYSTEM_IP + '/FleetManagement/audit/getUserName',
    getVicleDetailsDetails: 'http://' + SYSTEM_IP + '/FleetManagement/audit/getVehicleDetails',
    saveScheduleingDetails: 'http://' + SYSTEM_IP + '/FleetManagement/audit/generateAuditId',
    scheduleDataDetails: 'http://' + SYSTEM_IP + '/FleetManagement/audit/getAuditDetailsStatus',
    getAuditDetailsReport: 'http://' + SYSTEM_IP + '/FleetManagement/audit/GetAuditDetailsReport',
    getSessionName: 'http://' + SYSTEM_IP + '/FleetManagement/audit/getSectionName',
};

