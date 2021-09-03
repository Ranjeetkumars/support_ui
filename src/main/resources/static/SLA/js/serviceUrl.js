/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var SYSTEM_IP = "52.172.54.113:9032/sla_services";
var SYSTEM_IP1 = "localhost:9032/sla_services";

Service = {
	

// login:'http://192.168.1.149:900/gateway/login/supportlogin/login',
//  saveSlaMonthlyBillinge: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveSlaMonthlyBillinge',
//    getSectionDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getSectionDetails',
//    deleteSectionsDetailsData: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/deleteSectionsDetailsData',
//    getSectionName: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getSlaMonthlyBillingDetails',
//    saveAssessmentDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveAssessment',
//    getAssessmentDetailsList: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getAssessmentDetails',
//    deleteAssesmentDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/deleteAssessmentDetailsData',
//    saveMeasureMentDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveMeasurementDetails',
//    getAssessmentList: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getAssessmentList',
//    getMeasurementDetailsList: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getMeasurementDetails',
//    deleteMeasurementDetailsData: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/deleteMeasurementDetailsData',
//    getTargetListDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getTargetListDetails',
//    
//    saveTargetDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveTargetDetails',
//    deleteTargetDetailsData: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/deleteTargetDetailsData',
//    getMeasureMentList: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getMeasureMentList',
//    getSlaMeasurementPenalityValuesView: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getSlaMeasurementPenalityValuesView',
//    getTargetName: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getTargetListBasedOnSection',
//    getPenalityandmonthlyBillingValue: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getPenalityandmonthlyBillingValue',
//    //Equipemt
//    saveEquipmentDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveEquipemtDetails',
//    getEquipemtDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getEquipemtDetails',
//     deleteEquipemtDetailsData: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/deleteEquipemtDetailsData',
//    //complain
//  savecomplainDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/savecomplainDetails',
//  getEquipmentName: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getEquipemtName',
//  getcomplainDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getcomplainDetails',
//  getEquipmentTransDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getEquipmentTransDetails',
//  saveResolutionDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/saveResolutionDetails',
//  getStatus: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getStatus',
//  getResolutionDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/getResolutionDetails',
//  savecomplainVerificationDataDetails: 'http://192.168.1.149:900/gateway/sla_gateway/sla_services/sla/savecomplainVerificationDataDetails',
 

 
 login:'SYSTEM_IP1/login/supportlogin/login',
  saveSlaMonthlyBillinge: 'http://' + SYSTEM_IP1 + '/sla/saveSlaMonthlyBillinge',
    getSectionDetails: 'http://' + SYSTEM_IP1 + '/sla/getSectionDetails',
    deleteSectionsDetailsData: 'http://' + SYSTEM_IP1 + '/sla/deleteSectionsDetailsData',
    getSectionName: 'http://' + SYSTEM_IP1 + '/sla/getSlaMonthlyBillingDetails',
    saveAssessmentDetails: 'http://' + SYSTEM_IP1 + '/sla/saveAssessment',
    getAssessmentDetailsList: 'http://' + SYSTEM_IP1 + '/sla/getAssessmentDetails',
    deleteAssesmentDetails: 'http://' + SYSTEM_IP1 + '/sla/deleteAssessmentDetailsData',
    saveMeasureMentDetails: 'http://' + SYSTEM_IP1 + '/sla/saveMeasurementDetails',
    getAssessmentList:'http://' + SYSTEM_IP1 + '/sla/getAssessmentList',
    getMeasurementDetailsList: 'http://' + SYSTEM_IP1+ '/sla/getMeasurementDetails',
    deleteMeasurementDetailsData: 'http://' + SYSTEM_IP1 + '/sla/deleteMeasurementDetailsData',
    getTargetListDetails: 'http://' + SYSTEM_IP1 + '/sla/getTargetListDetails',
    
    saveTargetDetails: 'http://' + SYSTEM_IP1 + '/sla/saveTargetDetails',
    deleteTargetDetailsData: 'http://' + SYSTEM_IP1 + '/sla/deleteTargetDetailsData',
    getMeasureMentList: 'http://' + SYSTEM_IP1 + '/sla/getMeasureMentList',
    getSlaMeasurementPenalityValuesView: 'http://' + SYSTEM_IP1 + '/sla/getSlaMeasurementPenalityValuesView',
    getTargetName: 'http://' + SYSTEM_IP1 + '/sla/getTargetListBasedOnSection',
    getPenalityandmonthlyBillingValue: 'http://' + SYSTEM_IP1 + '/sla/getPenalityandmonthlyBillingValue',
    //Equipemt
    saveEquipmentDetails: 'http://' + SYSTEM_IP1 + '/sla/saveEquipemtDetails',
    getEquipemtDetails: 'http://' + SYSTEM_IP1 + '/sla/getEquipemtDetails',
     deleteEquipemtDetailsData: 'http://' + SYSTEM_IP1 + '/sla/deleteEquipemtDetailsData',
    //complain
  savecomplainDetails: 'http://' + SYSTEM_IP1 + '/sla/savecomplainDetails',
  getEquipmentName: 'http://' + SYSTEM_IP1 + '/sla/getEquipemtName',
  getcomplainDetails: 'http://' + SYSTEM_IP1 + '/sla/getcomplainDetails',
  getEquipmentTransDetails: 'http://' + SYSTEM_IP1 + '/sla/getEquipmentTransDetails',
  saveResolutionDetails: 'http://' + SYSTEM_IP1 + '/sla/saveResolutionDetails',
  getStatus: 'http://' + SYSTEM_IP1 + '/sla/getStatus',
  getResolutionDetails: 'http://' + SYSTEM_IP1 + '/sla/getResolutionDetails',
  savecomplainVerificationDataDetails: 'http://' + SYSTEM_IP1 + '/sla/savecomplainVerificationDataDetails',
 
};


