/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SYSTEM_IP = "192.168.1.106:7000";

Service = {
    //serviceProviderRegistration
    getAuditDetails: 'http://' + SYSTEM_IP + '/common/audit/getAuditDetails',
    getDistrict: 'http://' + SYSTEM_IP + '/common/audit/getdistricts',
    getSearchAuditDetails: 'http://' + SYSTEM_IP + '/common/audit/searchAuditDetails',
    getAuditId: 'http://' + SYSTEM_IP + '/common/audit/getAuditId',
     getAuditDetailsReport: 'http://' + SYSTEM_IP + '/common/audit/GetAuditDetailsReport',
     getSessionName: 'http://' + SYSTEM_IP + '/common/audit/getSectionName',

};

