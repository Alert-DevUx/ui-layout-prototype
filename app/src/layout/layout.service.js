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
              "icon": "RestartIcon",
              "action": "",
              "areaId": "1"
            }
          },
          "buttonsPos": [
            "restartIcon"
          ],
          "areas": {}
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
              "icon": "ExitIcon",
              "action": "",
              "areaId": "3"
            }
          },
          "buttonsPos": [
            "exitIcon"
          ],
          "areas": {}
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
              "icon": "AlertIcon",
              "action": "",
              "areaId": "4"
            }
          },
          "buttonsPos": [
            "alertIcon"
          ],
          "areas": {}
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
                  "icon": "ClinicalInfoIcon",
                  "action": "",
                  "areaId": "5"
                },
                "previousEpisodesIcon_3": {
                  "id": "previousEpisodesIcon_3",
                  "label": "",
                  "icon": "PreviousEpisodesIcon_3",
                  "action": "",
                  "areaId": "5"
                },
                "orderEntryIcon": {
                  "id": "orderEntryIcon",
                  "label": "",
                  "icon": "OrderEntryIcon",
                  "action": "",
                  "areaId": "5"
                },
                "pDMSIcon": {
                  "id": "pDMSIcon",
                  "label": "",
                  "icon": "PDMSIcon",
                  "action": "",
                  "areaId": "5"
                },
                "nurseIcon": {
                  "id": "nurseIcon",
                  "label": "",
                  "icon": "NurseIcon",
                  "action": "",
                  "areaId": "5"
                },
                "scheduledNewIcon": {
                  "id": "scheduledNewIcon",
                  "label": "",
                  "icon": "ScheduledNewIcon",
                  "action": "",
                  "areaId": "5"
                },
                "dischargeIcon": {
                  "id": "dischargeIcon",
                  "label": "",
                  "icon": "DischargeIcon",
                  "action": "",
                  "areaId": "5"
                },
                "patientManagementIcon": {
                  "id": "patientManagementIcon",
                  "label": "Gestï¿½o de paciente",
                  "icon": "PatientManagementIcon",
                  "action": "",
                  "areaId": "5"
                },
                "patientIDNewIcon": {
                  "id": "patientIDNewIcon",
                  "label": "",
                  "icon": "PatientIDNewIcon",
                  "action": "",
                  "areaId": "5"
                },
                "pregnancyIcon": {
                  "id": "pregnancyIcon",
                  "label": "",
                  "icon": "PregnancyIcon",
                  "action": "",
                  "areaId": "5"
                },
                "checklistBackofficeIcon": {
                  "id": "checklistBackofficeIcon",
                  "label": "Listas de verificaï¿½ï¿½o",
                  "icon": "ChecklistBackofficeIcon",
                  "action": "",
                  "areaId": "5"
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
              "areas": {}
            }
          }
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
              "icon": "BackIcon",
              "action": "",
              "areaId": "10"
            }
          },
          "buttonsPos": [
            "backIcon"
          ],
          "areas": {}
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
                  "icon": "PrintIcon",
                  "action": "",
                  "areaId": "11"
                },
                "addIcon": {
                  "id": "addIcon",
                  "label": "",
                  "icon": "AddIcon",
                  "action": "",
                  "areaId": "11"
                },
                "advancedSearchIcon": {
                  "id": "advancedSearchIcon",
                  "label": "",
                  "icon": "AdvancedSearchIcon",
                  "action": "",
                  "areaId": "11"
                },
                "cancelIcon": {
                  "id": "cancelIcon",
                  "label": "",
                  "icon": "CancelIcon",
                  "action": "",
                  "areaId": "11"
                },
                "commonTextIcon": {
                  "id": "commonTextIcon",
                  "label": "",
                  "icon": "CommonTextIcon",
                  "action": "",
                  "areaId": "11"
                },
                "noIcon": {
                  "id": "noIcon",
                  "label": "",
                  "icon": "NoIcon",
                  "action": "",
                  "areaId": "11"
                },
                "actionsIcon": {
                  "id": "actionsIcon",
                  "label": "",
                  "icon": "ActionsIcon",
                  "action": "",
                  "areaId": "11"
                },
                "viewsIcon": {
                  "id": "viewsIcon",
                  "label": "",
                  "icon": "ViewsIcon",
                  "action": "",
                  "areaId": "11"
                },
                "listIcon": {
                  "id": "listIcon",
                  "label": "",
                  "icon": "ListIcon",
                  "action": "",
                  "areaId": "11"
                },
                "firstVisionIcon": {
                  "id": "firstVisionIcon",
                  "label": "",
                  "icon": "FirstVisionIcon",
                  "action": "",
                  "areaId": "11"
                },
                "chartsLinesIcon": {
                  "id": "chartsLinesIcon",
                  "label": "",
                  "icon": "ChartsLinesIcon",
                  "action": "",
                  "areaId": "11"
                },
                "secondVisionIcon": {
                  "id": "secondVisionIcon",
                  "label": "",
                  "icon": "SecondVisionIcon",
                  "action": "",
                  "areaId": "11"
                },
                "importDocIcon": {
                  "id": "importDocIcon",
                  "label": "",
                  "icon": "ImportDocIcon",
                  "action": "",
                  "areaId": "11"
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
              "areas": {}
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
                  "icon": "DetailsIcon",
                  "action": "",
                  "areaId": "11"
                },
                "contentIcon": {
                  "id": "contentIcon",
                  "label": "",
                  "icon": "ContentIcon",
                  "action": "",
                  "areaId": "11"
                },
                "infoButtonIcon": {
                  "id": "infoButtonIcon",
                  "label": "Informaï¿½ï¿½o",
                  "icon": "InfoButtonIcon",
                  "action": "",
                  "areaId": "11"
                },
                "globalShortcutIcon": {
                  "id": "globalShortcutIcon",
                  "label": "",
                  "icon": "GlobalShortcutIcon",
                  "action": "",
                  "areaId": "11"
                },
                "helpIcon": {
                  "id": "helpIcon",
                  "label": "",
                  "icon": "HelpIcon",
                  "action": "",
                  "areaId": "11"
                }
              },
              "buttonsPos": [
                "detailsIcon",
                "contentIcon",
                "infoButtonIcon",
                "globalShortcutIcon",
                "helpIcon"
              ],
              "areas": {}
            }
          }
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
              "icon": "OKIcon",
              "action": "",
              "areaId": "12"
            }
          },
          "buttonsPos": [
            "oKIcon"
          ],
          "areas": {}
        }
      }
    }
  }    
})();
    