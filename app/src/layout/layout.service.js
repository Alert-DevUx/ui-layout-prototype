(function () {
  "use strict";

  angular.module('layout')
  .service('LayoutService', LayoutService);

  LayoutService.$inject = ['$q'];
  function LayoutService($q) {
    var service = this;

    service.getLayout = function () {

      var jsonDeferred = $q.defer();

      jsonDeferred.resolve(service.JSON_MOCK);

      return jsonDeferred.promise;
    }

    service.JSON_MOCK = {  
        "id": "0",
        "description": "Default layout for EDIS",
        "pos": "0",
        "areaName": "",
        "buttons": {},
        "buttonsPos": [],
        "areas": {
          "1": {
            "id": "1",
            "description": "Personal settings area",
            "pos": 6,
            "areaName": "leftTopHeader",
            "buttons": {
              "restartIcon": {
                "id": "restartIcon",
                "label": "",
                "icon": "RestartIcon"
              }
            },
            "buttonsPos": [
              "restartIcon"
            ],
                  "areas":{  
         
                  },
                  "component":""
          },
          "3": {
            "id": "3",
            "description": "Logout button area",
            "pos": 1,
            "areaName": "rightTopHeader",
            "buttons": {
              "exitIcon": {
                "id": "exitIcon",
                "label": "",
                "icon": "ExitIcon"
              }
            },
            "buttonsPos": [
              "exitIcon"
            ],
                  "areas":{  
         
                  },
                  "component":""
          },
          "4": {
            "id": "4",
            "description": "Alerts area",
            "pos": 8,
            "areaName": "leftBottomHeader",
            "buttons": {
              "alertIcon": {
                "id": "alertIcon",
                "label": "",
                "icon": "AlertIcon"
              }
            },
            "buttonsPos": [
              "alertIcon"
            ],
                  "areas":{  
         
                  },
                  "component":""
          },
          "5": {
            "id": "5",
            "description": "Top menu",
            "pos": 3,
            "areaName": "middleBottomHeader",
            "buttons": {},
            "buttonsPos": [],
            "areas": {
              "1": {
                "id": "1",
                "description": "Top menu left",
                "pos": 3,
                "areaName": "middleBottomHeader",
                "buttons": {
                  "clinicalInfoIcon": {
                    "id": "clinicalInfoIcon",
                    "label": "",
                    "icon": "ClinicalInfoIcon"
                  },
                  "previousEpisodesIcon_3": {
                    "id": "previousEpisodesIcon_3",
                    "label": "",
                    "icon": "PreviousEpisodesIcon_3"
                  },
                  "orderEntryIcon": {
                    "id": "orderEntryIcon",
                    "label": "",
                    "icon": "OrderEntryIcon"
                  },
                  "pDMSIcon": {
                    "id": "pDMSIcon",
                    "label": "",
                    "icon": "PDMSIcon"
                  },
                  "nurseIcon": {
                    "id": "nurseIcon",
                    "label": "",
                    "icon": "NurseIcon"
                  },
                  "scheduledNewIcon": {
                    "id": "scheduledNewIcon",
                    "label": "",
                    "icon": "ScheduledNewIcon"
                  },
                  "dischargeIcon": {
                    "id": "dischargeIcon",
                    "label": "",
                    "icon": "DischargeIcon"
                  },
                  "patientManagementIcon": {
                    "id": "patientManagementIcon",
                    "label": "Gest�o de paciente",
                    "icon": "PatientManagementIcon"
                  },
                  "patientIDNewIcon": {
                    "id": "patientIDNewIcon",
                    "label": "",
                    "icon": "PatientIDNewIcon"
                  },
                  "pregnancyIcon": {
                    "id": "pregnancyIcon",
                    "label": "",
                    "icon": "PregnancyIcon"
                  },
                  "checklistBackofficeIcon": {
                    "id": "checklistBackofficeIcon",
                    "label": "Listas de verifica��o",
                    "icon": "ChecklistBackofficeIcon"
                  }
                },
                "buttonsPos": [
                  "clinicalInfoIcon",
                  "previousEpisodesIcon_3",
                  "orderEntryIcon",
                  "pDMSIcon",
                  "pDMSIcon",
                  "pDMSIcon",
                  "pDMSIcon",
                  "nurseIcon",
                  "scheduledNewIcon",
                  "dischargeIcon",
                  "patientManagementIcon",
                  "patientIDNewIcon",
                  "pregnancyIcon",
                  "checklistBackofficeIcon"
                ],
                        "areas":{  
         
                        },
                        "component":""
            }
          },
                  "component":""
               },
          "10": {
            "id": "10",
            "description": "Back button area",
            "pos": 2,
            "areaName": "leftFooter",
            "buttons": {
              "backIcon": {
                "id": "backIcon",
                "label": "",
                "icon": "BackIcon"
              }
            },
            "buttonsPos": [
              "backIcon"
            ],
                  "areas":{  
         
                  },
                  "component":""
          },
          "11": {
            "id": "11",
            "description": "Bottom menu",
            "pos": 10,
            "areaName": "middleFooter",
            "buttons": {},
            "buttonsPos": [],
            "areas": {
              "1": {
                "id": "1",
                "description": "Bottom menu left",
                "pos": 10,
                "areaName": "middleFooter",
                "buttons": {
                  "printIcon": {
                    "id": "printIcon",
                    "label": "",
                    "icon": "PrintIcon"
                  },
                  "addIcon": {
                    "id": "addIcon",
                    "label": "",
                    "icon": "AddIcon"
                  },
                  "advancedSearchIcon": {
                    "id": "advancedSearchIcon",
                    "label": "",
                    "icon": "AdvancedSearchIcon"
                  },
                  "cancelIcon": {
                    "id": "cancelIcon",
                    "label": "",
                    "icon": "CancelIcon"
                  },
                  "commonTextIcon": {
                    "id": "commonTextIcon",
                    "label": "",
                    "icon": "CommonTextIcon"
                  },
                  "noIcon": {
                    "id": "noIcon",
                    "label": "",
                    "icon": "NoIcon"
                  },
                  "actionsIcon": {
                    "id": "actionsIcon",
                    "label": "",
                    "icon": "ActionsIcon"
                  },
                  "viewsIcon": {
                    "id": "viewsIcon",
                    "label": "",
                    "icon": "ViewsIcon"
                  },
                  "listIcon": {
                    "id": "listIcon",
                    "label": "",
                    "icon": "ListIcon"
                  },
                  "firstVisionIcon": {
                    "id": "firstVisionIcon",
                    "label": "",
                    "icon": "FirstVisionIcon"
                  },
                  "chartsLinesIcon": {
                    "id": "chartsLinesIcon",
                    "label": "",
                    "icon": "ChartsLinesIcon"
                  },
                  "secondVisionIcon": {
                    "id": "secondVisionIcon",
                    "label": "",
                    "icon": "SecondVisionIcon"
                  },
                  "importDocIcon": {
                    "id": "importDocIcon",
                    "label": "",
                    "icon": "ImportDocIcon"
                  }
                },
                "buttonsPos": [
                  "printIcon",
                  "addIcon",
                  "advancedSearchIcon",
                  "cancelIcon",
                  "commonTextIcon",
                  "noIcon",
                  "actionsIcon",
                  "viewsIcon",
                  "listIcon",
                  "firstVisionIcon",
                  "chartsLinesIcon",
                  "secondVisionIcon",
                  "importDocIcon"
                ],
                        "areas":{  
         
                        },
                        "component":""
              },
              "2": {
                "id": "2",
                "description": "Bottom menu right",
                "pos": 11,
                "areaName": "middleFooter",
                "buttons": {
                  "detailsIcon": {
                    "id": "detailsIcon",
                    "label": "",
                    "icon": "DetailsIcon"
                  },
                  "contentIcon": {
                    "id": "contentIcon",
                    "label": "",
                    "icon": "ContentIcon"
                  },
                  "infoButtonIcon": {
                    "id": "infoButtonIcon",
                    "label": "Informa��o",
                    "icon": "InfoButtonIcon"
                  },
                  "globalShortcutIcon": {
                    "id": "globalShortcutIcon",
                    "label": "",
                    "icon": "GlobalShortcutIcon"
                  },
                  "helpIcon": {
                    "id": "helpIcon",
                    "label": "",
                    "icon": "HelpIcon"
                  }
                },
                "buttonsPos": [
                  "detailsIcon",
                  "contentIcon",
                  "infoButtonIcon",
                  "globalShortcutIcon",
                  "helpIcon"
                ],
                        "areas":{  
         
                        },
                        "component":""
            }
          },
                  "component":""
               },
          "12": {
            "id": "12",
            "description": "Ok area",
            "pos": 7,
            "areaName": "rightFooter",
            "buttons": {
              "oKIcon": {
                "id": "oKIcon",
                "label": "",
                "icon": "OKIcon"
              }
            },
            "buttonsPos": [
              "oKIcon"
            ],
                  "areas":{  
         
                  },
                  "component":""
      }
            },
            "component":""
   }

  }    
})();
    