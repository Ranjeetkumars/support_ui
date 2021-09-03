/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SYSTEM_IP = "localhost:9160/quality_services";

var GATE_WAY_SYSTEM_IP = "192.168.1.215:900/gateway/quality_gateway/quality_services";
var support_system="localhost:9034";


var LOGIN="localhost:9033/login";

Service = {
    loginpage_url: 'file:///D:/GIT_PROJECT_REPO/pro_quality_ui/web/login.html',
    dashboard_url: 'file:///D:/GIT_PROJECT_REPO/pro_quality_ui/web/dashboard.html',
    //login
    login: 'http://192.168.1.215:900/gateway/login/supportlogin/login',
    //quality
    GET_MODULES: 'http://' + SYSTEM_IP + '/quality/getallModules',
    GET_QA_MODULES: 'http://' + SYSTEM_IP + '/quality/getAllQAmodules',
    GET_SECTIONS_DROPDOWN: 'http://' + SYSTEM_IP + '/quality/getAllSections',
    ADD_QUALITY_MODULES: 'http://' + SYSTEM_IP + '/quality/saveModulesForAssessment',
    GET_ALL_REGISTERED_SECTIONS: 'http://' + SYSTEM_IP + '/quality/getAllRegisteredSections',
    UPDATE_SECTIONS: 'http://' + SYSTEM_IP + '/quality/updateSectionsData',
    DELETE_SECTIONS: 'http://' + SYSTEM_IP + '/quality/deleteSectionsData',
    ADD_SECTIONS_FOR_MODULES: 'http://' + SYSTEM_IP + '/quality/saveSectionsForAssessment',
    ADD_QUESTIONS_FOR_SECTIONS: 'http://' + SYSTEM_IP + '/quality/saveQuestionsForAssessment',
    GET_ALL_REGISTERED_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/getAllRegisteredQuestions',
    SAVE_UPDATE_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/saveQuestionsForAssessment',
    DELETE_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/deleteQuestionData',
    GET_MODULE_SCORE: 'http://' + SYSTEM_IP + '/quality/getModuleScore',
    GET_SUM_OF_SECTION_SCORE: 'http://' + SYSTEM_IP + '/quality/getsumofsectionscore',
    GET_SECTION_SCORE: 'http://' + SYSTEM_IP + '/quality/getsectionscore',
    GET_SUM_OF_QUESTION_SCORE: 'http://' + SYSTEM_IP + '/quality/getsumofQuestionscore',
    GET_ALL_FATAL_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/getAllRegisteredFAtalQuestions',
    UPDATE_FATAL_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/updateFatalData',
    DELETE_FATAL_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/deleteFatalQuestionData',
    SAVE_FATAL_QUESTIONS: 'http://' + SYSTEM_IP + '/quality/saveFatalQuestionsForAssessment',
    QUALITYANALYSIS_QUEUE: 'http://' + SYSTEM_IP + '/quality/qualityAnanlysisQueue',
    QUALITY_USERS: 'http://' + SYSTEM_IP + '/quality/getusersBasedonModules',
//QUALITY ANALYSIS

   Get_Fatal_Indicator: 'http://' + SYSTEM_IP + '/quality/getFatal_indicator',
      Get_TNA_Indicator: 'http://' + SYSTEM_IP + '/quality/getTna_indicators',

     Save_Quality_Analysis_Data: 'http://' + SYSTEM_IP + '/quality/saveQualityIndicators',
     Quality_Report: 'http://' + SYSTEM_IP + '/quality/getQualityIndicatorsData',
GetQulaityReportName: 'http://' + SYSTEM_IP + '/quality/getQulaityReportName',

    GET_MASTER_DATA: 'http://' + SYSTEM_IP + '/quality/getMasterDataForAssessment',
    GET_QUEsTION_WISE_SCORE: 'http://' + SYSTEM_IP + '/quality/getQuestionScore',
    QUALITY_ANALYSIS: 'http://' + SYSTEM_IP + '/quality/qualityAnalysis',
    FATAL_QUESTIONS_FOR_ANALYSIS: 'http://' + SYSTEM_IP + '/quality/getFatalQuestions',
    SAVE_FATAL_QUALITY_ANALYSIS: 'http://' + SYSTEM_IP + '/quality/fatalQualityAnalysis',
    GET_QUESTION_BASED_ON_SECTION_ID: 'http://' + SYSTEM_IP + '/quality/getQuestionBasedonSectionId',


    
    
    GET_SHIFT_MANAGERS:  'http://' + SYSTEM_IP + '/quality/getshiftManagers',
    GET_TLS:  'http://' + SYSTEM_IP + '/quality/getTls',
    MAPPING_TLS_TO_SHIF_MANAGER:  'http://' + SYSTEM_IP + '/quality/agentsMapping',
    TLS_BASED_ON_MANAGER_ID:  'http://' + SYSTEM_IP + '/quality/getTLsbasedonShiftmanagerID',
    AGENTS:  'http://'+ SYSTEM_IP + '/quality/getAgents',
    GET_AGENT_MAP_WITH_TL_DATA:  'http://' + SYSTEM_IP + '/quality/getMappingDataAgentTL',
    GET_TL_MAP_WITH_MANAGER_DATA:  'http://' + SYSTEM_IP + '/quality/getMappingDataTlManager',
    UPDATE_TL_MANAGER_MAP_DAta: 'http://' + SYSTEM_IP + '/quality/updateTLManagerData',
    UPDATE_AGENT_TL_DATA: 'http://' + SYSTEM_IP + '/quality/updateAgentTLData',
    DELETE_AGENT_FROM_TL: 'http://' + SYSTEM_IP + '/quality/deleteAgentTLData',
    DELETE_TL_FROM_MANAGER: 'http://' + SYSTEM_IP + '/quality/deleteTLManagerData',
//login/logout
 redirectToLoginPage:'http://'+support_system+'/login.html',
	 redirectToHomepage:'http://'+support_system+'/dashboard.html',	 
	 login:'http://'+LOGIN+'/supportlogin/login',
//    
//    
//    
//    
//    
//    
////    GET_MODULES: 'http://192.168.1.215:900/gateway/quality_gateway/api/version_1/getallModules',
//    GET_MODULES: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getallModules',
//    GET_QA_MODULES: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAllQAmodules',
//    GET_SECTIONS_DROPDOWN: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAllSections',
//    ADD_QUALITY_MODULES: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/saveModulesForAssessment',
//    GET_ALL_REGISTERED_SECTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAllRegisteredSections',
//    UPDATE_SECTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/updateSectionsData',
//    DELETE_SECTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/deleteSectionsData',
//    ADD_SECTIONS_FOR_MODULES: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/saveSectionsForAssessment',
//    ADD_QUESTIONS_FOR_SECTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/saveQuestionsForAssessment',
//    GET_ALL_REGISTERED_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAllRegisteredQuestions',
//    SAVE_UPDATE_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/saveQuestionsForAssessment',
//    DELETE_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/deleteQuestionData',
//    GET_MODULE_SCORE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getModuleScore',
//    GET_SUM_OF_SECTION_SCORE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getsumofsectionscore',
//    GET_SECTION_SCORE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getsectionscore',
//    GET_SUM_OF_QUESTION_SCORE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getsumofQuestionscore',
//    GET_ALL_FATAL_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAllRegisteredFAtalQuestions',
//    UPDATE_FATAL_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/updateFatalData',
//    DELETE_FATAL_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/deleteFatalQuestionData',
//    SAVE_FATAL_QUESTIONS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/saveFatalQuestionsForAssessment',
//    QUALITYANALYSIS_QUEUE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/qualityAnanlysisQueue',
//    QUALITY_USERS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getusersBasedonModules',
//    GET_MASTER_DATA: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getMasterDataForAssessment',
//    GET_QUEsTION_WISE_SCORE: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getQuestionScore',
//    QUALITY_ANALYSIS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/qualityAnalysis',
//    FATAL_QUESTIONS_FOR_ANALYSIS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getFatalQuestions',
//    SAVE_FATAL_QUALITY_ANALYSIS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/fatalQualityAnalysis',
//    GET_QUESTION_BASED_ON_SECTION_ID: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getQuestionBasedonSectionId',
//    GET_SHIFT_MANAGERS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getshiftManagers',
//    GET_TLS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getTls',
//    MAPPING_TLS_TO_SHIF_MANAGER: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/agentsMapping',
//    TLS_BASED_ON_MANAGER_ID: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getTLsbasedonShiftmanagerID',
//    AGENTS: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getAgents',
//    GET_AGENT_MAP_WITH_TL_DATA: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getMappingDataAgentTL',
//    GET_TL_MAP_WITH_MANAGER_DATA: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/getMappingDataTlManager',
//    UPDATE_TL_MANAGER_MAP_DAta: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/updateTLManagerData',
//    UPDATE_AGENT_TL_DATA: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/updateAgentTLData',
//    DELETE_AGENT_FROM_TL: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/deleteAgentTLData',
//    DELETE_TL_FROM_MANAGER: 'http://' + GATE_WAY_SYSTEM_IP + '/quality/deleteTLManagerData',
//    
    

}














