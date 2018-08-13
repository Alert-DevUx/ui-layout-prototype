(function () {
  "use strict";

  angular.module('layout')
  .service('LayoutService', LayoutService);

  LayoutService.$inject = ['$q', 'Path', 'Area', 'Button', 'Action', 'Component'];
  function LayoutService($q, Path, Area, Button, Action, Component) {
    var service = this;

    service.getLayout = function() {

      return getLayoutJson().then(function(layout){

        var topArea = new Area(layout.id, layout.description, layout.pos, layout.type);
        
        var path = new Path(layout.id);
        
        topArea.path = path.toString();

        topArea.setAreas(getAreas(layout.areas, path));

        return (topArea);
      });
    }
    
    function getLayoutJson() {

      var jsonDeferred = $q.defer();

      jsonDeferred.resolve(service.JSON_MOCK);

      return jsonDeferred.promise;
    }
    


    function getAreas(areasJson, path) {

        if(!areasJson) 
            return;

        var areas = {}
        for (var key in areasJson) {
            if (areasJson.hasOwnProperty(key)) {
                
                areas[key] = getArea(areasJson[key], path);
        
            }
        }
        return areas;
    }

    function getArea(areaJson, parentPath) {

        var area = new Area(areaJson.id, areaJson.description, areaJson.pos, areaJson.type);
        
        var path = new Path(parentPath.toString());
        path.append(areaJson.id);

        // Set area Path
        area.path = path.toString();
        area.areas = getAreas(areaJson.areas, path);

        area.setButtons(getButtons(areaJson.buttons, path));

        return area;
    }

    function getButtons(buttonsJson, parentPath) {

        if(!buttonsJson) 
            return;

        var buttons = {}
        for (var key in buttonsJson) {
            if (buttonsJson.hasOwnProperty(key)) {
                
                buttons[key] = getButton(buttonsJson[key], parentPath);
            }
        }
        return buttons;
    }


    function getButton(buttonJson, parentPath) {

        var button = new Button(buttonJson.id, buttonJson.status, buttonJson.label, buttonJson.icon, getAction(buttonJson.action), buttonJson.areaId);

        // Set button path
        button.path = parentPath.toString();

        return button;
    }    

    function getAction(actionJson) {

      // Build component
      if((actionJson.component && actionJson.component.type && actionJson.component.id)) {
        var component = new Component(actionJson.component.type, actionJson.component.id);

      }

      return new Action(actionJson.targetArea, actionJson.button, component);
    }


    service.JSON_MOCK = {
        "id": "inpatient",
        "description": "Default layout for INPATIENT",
        "pos": -1,
        "type": "",
        "areas": {
            "entry": {
                "id": "entry",
                "description": "Inpatient main grid",
                "pos": 0,
                "type": "",
                "areas": {
                    "headerRight": {
                        "id": "headerRight",
                        "description": "Logout button area",
                        "pos": 1,
                        "type": "headerRight",
                        "buttons": {
                            "logout": {
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["logout"]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": {
                            "back": {
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["back"]
                    },
                    "mainMenu": {
                        "id": "mainMenu",
                        "description": "Main menu",
                        "pos": 3,
                        "type": "mainMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Main menu left",
                                "pos": 3,
                                "type": "mainMenu",
                                "areas": {
                                    "screen": {
                                        "id": "screen",
                                        "description": "Screen",
                                        "pos": 12,
                                        "type": "screen",
                                        "buttons": {
                                            "actionButton": {
                                                "id": "actionButton",
                                                "status": "A",
                                                "label": "Actions",
                                                "icon": "",
                                                "action": {}
                                            },
                                            "applicationHelp": {
                                                "id": "applicationHelp",
                                                "status": "A",
                                                "label": "Help",
                                                "icon": "HelpIcon",
                                                "action": {}
                                            },
                                            "cancel": {
                                                "id": "cancel",
                                                "status": "A",
                                                "label": "Cancel records",
                                                "icon": "CancelIcon",
                                                "action": {}
                                            },
                                            "create": {
                                                "id": "create",
                                                "status": "A",
                                                "label": "Add or edit records",
                                                "icon": "AddIcon",
                                                "action": {}
                                            },
                                            "eye": {
                                                "id": "eye",
                                                "status": "A",
                                                "label": "Record details",
                                                "icon": "DetailsIcon",
                                                "action": {}
                                            },
                                            "viewsButton": {
                                                "id": "viewsButton",
                                                "status": "A",
                                                "label": "View modes",
                                                "icon": "",
                                                "action": {}
                                            },
                                            "globalShortcut": {
                                                "id": "globalShortcut",
                                                "status": "A",
                                                "label": "Shortcuts",
                                                "icon": "GlobalShortcutIcon",
                                                "action": {}
                                            },
                                            "ok": {
                                                "id": "ok",
                                                "status": "A",
                                                "label": "Confirm and continue",
                                                "icon": "OKIcon",
                                                "action": {}
                                            },
                                            "print": {
                                                "id": "print",
                                                "status": "A",
                                                "label": "Print tool",
                                                "icon": "PrintIcon",
                                                "action": {}
                                            },
                                            "advanceSearch": {
                                                "id": "advanceSearch",
                                                "status": "A",
                                                "label": "Advanced search",
                                                "icon": "AdvancedSearchIcon",
                                                "action": {}
                                            },
                                            "toolsCommonText": {
                                                "id": "toolsCommonText",
                                                "status": "A",
                                                "label": "Predefined texts",
                                                "icon": "CommonTextIcon",
                                                "action": {}
                                            },
                                            "noEdis": {
                                                "id": "noEdis",
                                                "status": "A",
                                                "label": "Negative for all discriminators on this page",
                                                "icon": "NoIcon",
                                                "action": {}
                                            }
                                        },
                                        "buttonsPos": ["actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText"]
                                    },
                                    "barCode": {
                                        "id": "barCode",
                                        "description": "barCode deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                                            }
                                        },
                                        "buttons": {
                                            "technicianWorkBarcode": {
                                                "id": "technicianWorkBarcode",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.barCode.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "SearchPatientBarcode.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["technicianWorkBarcode"]
                                    },
                                    "responsabilityTransferEdis": {
                                        "id": "responsabilityTransferEdis",
                                        "description": "responsabilityTransferEdis deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                                            }
                                        },
                                        "buttons": {
                                            "serviceTransfer": {
                                                "id": "serviceTransfer",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ServiceTransferList.swf"
                                                    }
                                                }
                                            },
                                            "myPatientesHandOfEdis": {
                                                "id": "myPatientesHandOfEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HandOffMyPatientsList.swf"
                                                    }
                                                }
                                            },
                                            "transferInstitution": {
                                                "id": "transferInstitution",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "InstitutionTransferList.swf"
                                                    }
                                                }
                                            },
                                            "requestHandOfEdis": {
                                                "id": "requestHandOfEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HandOffRequestsList.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["serviceTransfer", "myPatientesHandOfEdis", "transferInstitution", "requestHandOfEdis"]
                                    },
                                    "pendingTasks": {
                                        "id": "pendingTasks",
                                        "description": "pendingTasks deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print"]
                                            }
                                        },
                                        "buttons": {
                                            "todoList": {
                                                "id": "todoList",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.entry.mainMenu.left.pendingTasks.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "GridTodoList.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["todoList"]
                                    }
                                },
                                "buttons": {
                                    "myPatientDoctor": {
                                        "id": "myPatientDoctor",
                                        "status": "A",
                                        "label": "My patients",
                                        "icon": "MyPatientsIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPGridMyPatients.swf"
                                            }
                                        }
                                    },
                                    "bmngGridDashboardServices": {
                                        "id": "bmngGridDashboardServices",
                                        "status": "A",
                                        "label": "Bed management",
                                        "icon": "BedManagementIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "BedManagementDashboard.swf"
                                            }
                                        }
                                    },
                                    "allPatientDoctor": {
                                        "id": "allPatientDoctor",
                                        "status": "A",
                                        "label": "All patients",
                                        "icon": "AllPatientsIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPGridAllPatients.swf"
                                            }
                                        }
                                    },
                                    "gridScheduledInpatients": {
                                        "id": "gridScheduledInpatients",
                                        "status": "A",
                                        "label": "Scheduled admissions",
                                        "icon": "ScheduledIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPScheduledEpisodes.swf"
                                            }
                                        }
                                    },
                                    "birsEyeIcon": {
                                        "id": "birsEyeIcon",
                                        "status": "A",
                                        "label": "Patient location",
                                        "icon": "BirdsEyeIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPBirdsEyeView.swf"
                                            }
                                        }
                                    },
                                    "barCode": {
                                        "id": "barCode",
                                        "status": "A",
                                        "label": "Patient's barcode",
                                        "icon": "BarCodeIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.barCode"
                                        }
                                    },
                                    "agenda": {
                                        "id": "agenda",
                                        "status": "A",
                                        "label": "Scheduler",
                                        "icon": "ScheduledNewIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "CalendarMonthOverview.swf"
                                            }
                                        }
                                    },
                                    "responsabilityTransferEdis": {
                                        "id": "responsabilityTransferEdis",
                                        "status": "A",
                                        "label": "Transfers",
                                        "icon": "ResponsibilityTransferIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis"
                                        }
                                    },
                                    "pendingTasks": {
                                        "id": "pendingTasks",
                                        "status": "A",
                                        "label": "To-do list",
                                        "icon": "CheckListIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.pendingTasks"
                                        }
                                    },
                                    "coding": {
                                        "id": "coding",
                                        "status": "A",
                                        "label": "Coding",
                                        "icon": "CodingIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "CpMyProcessesGW.swf"
                                            }
                                        }
                                    },
                                    "alertTv": {
                                        "id": "alertTv",
                                        "status": "A",
                                        "label": "Corporate TV",
                                        "icon": "AlertTVIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["myPatientDoctor", "bmngGridDashboardServices", "allPatientDoctor", "gridScheduledInpatients", "birsEyeIcon", "barCode", "agenda", "responsabilityTransferEdis", "pendingTasks", "coding", "alertTv"]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": {
                            "tools": {
                                "id": "tools",
                                "status": "A",
                                "label": "Settings ",
                                "icon": "ToolsIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["tools"]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": {
                            "ok": {
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["ok"]
                    },
                    "mainMenuLeft": {
                        "id": "mainMenuLeft",
                        "description": "Alerts area",
                        "pos": 8,
                        "type": "mainMenuLeft",
                        "areas": {
                            "screen": {
                                "id": "screen",
                                "description": "Screen",
                                "pos": 12,
                                "type": "screen",
                                "buttons": {
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "I",
                                        "label": "Cancel records",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add or edit records",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "eye": {
                                        "id": "eye",
                                        "status": "I",
                                        "label": "Record details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "viewsButton": {
                                        "id": "viewsButton",
                                        "status": "I",
                                        "label": "View modes",
                                        "icon": "",
                                        "action": {}
                                    },
                                    "globalShortcut": {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    },
                                    "ok": {
                                        "id": "ok",
                                        "status": "A",
                                        "label": "Confirm and continue",
                                        "icon": "OKIcon",
                                        "action": {}
                                    },
                                    "print": {
                                        "id": "print",
                                        "status": "I",
                                        "label": "Print tool",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                            }
                        },
                        "buttons": {
                            "alert": {
                                "id": "alert",
                                "status": "A",
                                "label": "Alert messages",
                                "icon": "AlertIcon",
                                "action": {
                                    "targetArea": "inpatient.entry.mainMenuLeft.screen",
                                    "component": {
                                        "type": "SWF",
                                        "id": "AlertsInpatient.swf"
                                    }
                                }
                            }
                        },
                        "buttonsPos": ["alert"]
                    },
                    "mainMenuRight": {
                        "id": "mainMenuRight",
                        "description": "Search area",
                        "pos": 9,
                        "type": "mainMenuRight",
                        "areas": {
                            "search": {
                                "id": "search",
                                "description": "search deepnavs",
                                "pos": 5,
                                "type": "deepnav",
                                "areas": {
                                    "screen": {
                                        "id": "screen",
                                        "description": "Screen",
                                        "pos": 12,
                                        "type": "screen",
                                        "buttons": {
                                            "actionButton": {
                                                "id": "actionButton",
                                                "status": "A",
                                                "label": "Actions",
                                                "icon": "",
                                                "action": {}
                                            },
                                            "advanceSearch": {
                                                "id": "advanceSearch",
                                                "status": "A",
                                                "label": "Advanced search",
                                                "icon": "AdvancedSearchIcon",
                                                "action": {}
                                            },
                                            "applicationHelp": {
                                                "id": "applicationHelp",
                                                "status": "A",
                                                "label": "Help",
                                                "icon": "HelpIcon",
                                                "action": {}
                                            },
                                            "cancel": {
                                                "id": "cancel",
                                                "status": "I",
                                                "label": "Cancel records",
                                                "icon": "CancelIcon",
                                                "action": {}
                                            },
                                            "create": {
                                                "id": "create",
                                                "status": "A",
                                                "label": "Add or edit records",
                                                "icon": "AddIcon",
                                                "action": {}
                                            },
                                            "eye": {
                                                "id": "eye",
                                                "status": "I",
                                                "label": "Record details",
                                                "icon": "DetailsIcon",
                                                "action": {}
                                            },
                                            "viewsButton": {
                                                "id": "viewsButton",
                                                "status": "I",
                                                "label": "View modes",
                                                "icon": "",
                                                "action": {}
                                            },
                                            "globalShortcut": {
                                                "id": "globalShortcut",
                                                "status": "A",
                                                "label": "Shortcuts",
                                                "icon": "GlobalShortcutIcon",
                                                "action": {}
                                            },
                                            "ok": {
                                                "id": "ok",
                                                "status": "A",
                                                "label": "Confirm and continue",
                                                "icon": "OKIcon",
                                                "action": {}
                                            },
                                            "print": {
                                                "id": "print",
                                                "status": "I",
                                                "label": "Print tool",
                                                "icon": "PrintIcon",
                                                "action": {}
                                            }
                                        },
                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                                    }
                                },
                                "buttons": {
                                    "allPatients": {
                                        "id": "allPatients",
                                        "status": "A",
                                        "label": "",
                                        "icon": "",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenuRight.search.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "AdtSearchAllPatients.swf"
                                            }
                                        }
                                    },
                                    "depnvSearchActiveInp": {
                                        "id": "depnvSearchActiveInp",
                                        "status": "A",
                                        "label": "",
                                        "icon": "",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenuRight.search.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPEpisodeSearchActive.swf"
                                            }
                                        }
                                    },
                                    "depnvSearchInactiveInp": {
                                        "id": "depnvSearchInactiveInp",
                                        "status": "A",
                                        "label": "",
                                        "icon": "",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenuRight.search.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "INPEpisodeSearchInactive.swf"
                                            }
                                        }
                                    },
                                    "depnvSearchCancelled": {
                                        "id": "depnvSearchCancelled",
                                        "status": "A",
                                        "label": "",
                                        "icon": "",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenuRight.search.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "SearchCanceledPatients.swf"
                                            }
                                        }
                                    }
                                },
                                "buttonsPos": ["allPatients", "depnvSearchActiveInp", "depnvSearchInactiveInp", "depnvSearchCancelled"]
                            }
                        },
                        "buttons": {
                            "search": {
                                "id": "search",
                                "status": "A",
                                "label": "Patient search",
                                "icon": "SearchIcon",
                                "action": {
                                    "targetArea": "inpatient.entry.mainMenuRight.search"
                                }
                            }
                        },
                        "buttonsPos": ["search"]
                    },
                    "actionMenu": {
                        "id": "actionMenu",
                        "description": "Bottom menu",
                        "pos": 10,
                        "type": "actionMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Bottom menu left",
                                "pos": 10,
                                "type": "actionMenu",
                                "buttons": {
                                    "print": {
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "firstView": {
                                        "id": "firstView",
                                        "status": "A",
                                        "label": "First view",
                                        "icon": "FirstVisionIcon",
                                        "action": {}
                                    },
                                    "secondView": {
                                        "id": "secondView",
                                        "status": "A",
                                        "label": "Second view",
                                        "icon": "SecondVisionIcon",
                                        "action": {}
                                    },
                                    "viewsButton": {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    },
                                    "advanceSearchIcon": {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    },
                                    "actionButton": {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    },
                                    "toolsCommontext": {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["print", "create", "cancel", "firstView", "secondView", "viewsButton", "advanceSearchIcon", "actionButton", "viewsButton", "toolsCommontext"]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu",
                                "buttons": {
                                    "eye": {
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "contextHelp": {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    },
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "globalShortcut": {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["eye", "contextHelp", "applicationHelp", "globalShortcut"]
                            }
                        }
                    }
                }
            },
            "patient": {
                "id": "patient",
                "description": "Inpatient patient area",
                "pos": 0,
                "type": "",
                "areas": {
                    "headerRight": {
                        "id": "headerRight",
                        "description": "Logout button area",
                        "pos": 1,
                        "type": "headerRight",
                        "buttons": {
                            "logout": {
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["logout"]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": {
                            "back": {
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["back"]
                    },
                    "mainMenu": {
                        "id": "mainMenu",
                        "description": "Main menu",
                        "pos": 3,
                        "type": "mainMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Main menu left",
                                "pos": 3,
                                "type": "mainMenu",
                                "areas": {
                                    "screen": {
                                        "id": "screen",
                                        "description": "Screen",
                                        "pos": 12,
                                        "type": "screen",
                                        "buttons": {
                                            "actionButton": {
                                                "id": "actionButton",
                                                "status": "I",
                                                "label": "Actions",
                                                "icon": "",
                                                "action": {}
                                            },
                                            "advanceSearch": {
                                                "id": "advanceSearch",
                                                "status": "I",
                                                "label": "Advanced search",
                                                "icon": "AdvancedSearchIcon",
                                                "action": {}
                                            },
                                            "applicationHelp": {
                                                "id": "applicationHelp",
                                                "status": "A",
                                                "label": "Help",
                                                "icon": "HelpIcon",
                                                "action": {}
                                            },
                                            "cancel": {
                                                "id": "cancel",
                                                "status": "I",
                                                "label": "Cancel records",
                                                "icon": "CancelIcon",
                                                "action": {}
                                            },
                                            "create": {
                                                "id": "create",
                                                "status": "I",
                                                "label": "Add or edit records",
                                                "icon": "AddIcon",
                                                "action": {}
                                            },
                                            "eye": {
                                                "id": "eye",
                                                "status": "I",
                                                "label": "Record details",
                                                "icon": "DetailsIcon",
                                                "action": {}
                                            },
                                            "globalShortcut": {
                                                "id": "globalShortcut",
                                                "status": "A",
                                                "label": "Shortcuts",
                                                "icon": "GlobalShortcutIcon",
                                                "action": {}
                                            },
                                            "ok": {
                                                "id": "ok",
                                                "status": "A",
                                                "label": "Confirm and continue",
                                                "icon": "OKIcon",
                                                "action": {}
                                            },
                                            "print": {
                                                "id": "print",
                                                "status": "I",
                                                "label": "Print tool",
                                                "icon": "PrintIcon",
                                                "action": {}
                                            },
                                            "toolsCommonText": {
                                                "id": "toolsCommonText",
                                                "status": "I",
                                                "label": "Predefined texts",
                                                "icon": "CommonTextIcon",
                                                "action": {}
                                            }
                                        },
                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                    },
                                    "ehr": {
                                        "id": "ehr",
                                        "description": "ehr deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            },
                                            "visits": {
                                                "id": "visits",
                                                "description": "visits deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "noEdis": {
                                                                "id": "noEdis",
                                                                "status": "I",
                                                                "label": "Negative for all discriminators on this page",
                                                                "icon": "NoIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "I",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            },
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    },
                                                    "dietProcess": {
                                                        "id": "dietProcess",
                                                        "description": "dietProcess deepnavs",
                                                        "pos": 5,
                                                        "type": "deepnav",
                                                        "areas": {
                                                            "screen": {
                                                                "id": "screen",
                                                                "description": "Screen",
                                                                "pos": 12,
                                                                "type": "screen",
                                                                "buttons": {
                                                                    "advanceSearch": {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    },
                                                                    "applicationHelp": {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    },
                                                                    "cancel": {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    },
                                                                    "create": {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    },
                                                                    "eye": {
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    },
                                                                    "globalShortcut": {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    },
                                                                    "ok": {
                                                                        "id": "ok",
                                                                        "status": "I",
                                                                        "label": "Confirm and continue",
                                                                        "icon": "OKIcon",
                                                                        "action": {}
                                                                    },
                                                                    "print": {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    },
                                                                    "actionButton": {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "toolsCommonText": {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                },
                                                                "buttonsPos": ["advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                            }
                                                        },
                                                        "buttons": {
                                                            "nutritionSummary": {
                                                                "id": "nutritionSummary",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRDIASummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "dietaryProgressNotes": {
                                                                "id": "dietaryProgressNotes",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRDPNSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "nutriPrevIntervention": {
                                                                "id": "nutriPrevIntervention",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRNutritionistIntervPlanList.swf"
                                                                    }
                                                                }
                                                            },
                                                            "nutriReport": {
                                                                "id": "nutriReport",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRNVNSummary.swf"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttonsPos": ["nutritionSummary", "dietaryProgressNotes", "nutriPrevIntervention", "nutriReport"]
                                                    },
                                                    "detailsOnPastIllnesses": {
                                                        "id": "detailsOnPastIllnesses",
                                                        "description": "detailsOnPastIllnesses deepnavs",
                                                        "pos": 5,
                                                        "type": "deepnav",
                                                        "areas": {
                                                            "screen": {
                                                                "id": "screen",
                                                                "description": "Screen",
                                                                "pos": 12,
                                                                "type": "screen",
                                                                "buttons": {
                                                                    "actionButton": {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "advanceSearch": {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    },
                                                                    "applicationHelp": {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    },
                                                                    "cancel": {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    },
                                                                    "create": {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    },
                                                                    "eye": {
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    },
                                                                    "globalShortcut": {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    },
                                                                    "ok": {
                                                                        "id": "ok",
                                                                        "status": "I",
                                                                        "label": "Confirm and continue",
                                                                        "icon": "OKIcon",
                                                                        "action": {}
                                                                    },
                                                                    "print": {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    },
                                                                    "toolsCommonText": {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                },
                                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                            }
                                                        },
                                                        "buttons": {
                                                            "reasonForVisits": {
                                                                "id": "reasonForVisits",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "ReasonsForVisits.swf"
                                                                    }
                                                                }
                                                            },
                                                            "historyOfPastIllnesses": {
                                                                "id": "historyOfPastIllnesses",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "HistoryOfPastIllnesses.swf"
                                                                    }
                                                                }
                                                            },
                                                            "hp": {
                                                                "id": "hp",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRHPSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "physicianProgressNotes": {
                                                                "id": "physicianProgressNotes",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRPNSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "reviewsOfSystems": {
                                                                "id": "reviewsOfSystems",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "ReviewsOfSystems.swf"
                                                                    }
                                                                }
                                                            },
                                                            "physicalExams": {
                                                                "id": "physicalExams",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "PhysicalExams.swf"
                                                                    }
                                                                }
                                                            },
                                                            "bodyDiagrams": {
                                                                "id": "bodyDiagrams",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRBodyDiagrams.swf"
                                                                    }
                                                                }
                                                            },
                                                            "plans": {
                                                                "id": "plans",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "IndividualEncounterPlans.swf"
                                                                    }
                                                                }
                                                            },
                                                            "ehrDeepnavDispositionRecDoente": {
                                                                "id": "ehrDeepnavDispositionRecDoente",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "DispositionInstructions.swf"
                                                                    }
                                                                }
                                                            },
                                                            "recordsReview": {
                                                                "id": "recordsReview",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "RecordsReviewList.swf"
                                                                    }
                                                                }
                                                            },
                                                            "ehrDischargeSummaryVisitNote": {
                                                                "id": "ehrDischargeSummaryVisitNote",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRDSSummary.swf"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttonsPos": ["reasonForVisits", "historyOfPastIllnesses", "hp", "physicianProgressNotes", "reviewsOfSystems", "physicalExams", "bodyDiagrams", "plans", "ehrDeepnavDispositionRecDoente", "recordsReview", "ehrDischargeSummaryVisitNote"]
                                                    }
                                                },
                                                "buttons": {
                                                    "consultasAnteriores": {
                                                        "id": "consultasAnteriores",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PreviousEpisSummaryPage.swf"
                                                            }
                                                        }
                                                    },
                                                    "ehrTimeline": {
                                                        "id": "ehrTimeline",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRepisodes.swf"
                                                            }
                                                        }
                                                    },
                                                    "plannedVisits": {
                                                        "id": "plannedVisits",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PlannedVisits.swf"
                                                            }
                                                        }
                                                    },
                                                    "otherEvents": {
                                                        "id": "otherEvents",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "OtherEvents.swf"
                                                            }
                                                        }
                                                    },
                                                    "socialSummary": {
                                                        "id": "socialSummary",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "SocialEHRSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "dietProcess": {
                                                        "id": "dietProcess",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess"
                                                        }
                                                    },
                                                    "activityTherapy": {
                                                        "id": "activityTherapy",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "ActivityTherapyEHRSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "evaluationmfr": {
                                                        "id": "evaluationmfr",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "MFREvaluationSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "intervalNotes": {
                                                        "id": "intervalNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "RPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "detailsOnPastIllnesses": {
                                                        "id": "detailsOnPastIllnesses",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses"
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["consultasAnteriores", "ehrTimeline", "plannedVisits", "otherEvents", "socialSummary", "dietProcess", "activityTherapy", "evaluationmfr", "intervalNotes", "detailsOnPastIllnesses"]
                                            },
                                            "planning": {
                                                "id": "planning",
                                                "description": "planning deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "I",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "carePlans": {
                                                        "id": "carePlans",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRCarePlansList.swf"
                                                            }
                                                        }
                                                    },
                                                    "individualEncounterPlans": {
                                                        "id": "individualEncounterPlans",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "IndividualEncounterPlans.swf"
                                                            }
                                                        }
                                                    },
                                                    "guideline": {
                                                        "id": "guideline",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRGuidelinesSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "protocol": {
                                                        "id": "protocol",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRProtocolSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "plannedSurgeries": {
                                                        "id": "plannedSurgeries",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRSurgEpisodesLoader.swf"
                                                            }
                                                        }
                                                    },
                                                    "referrals": {
                                                        "id": "referrals",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRReferrals.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["carePlans", "individualEncounterPlans", "guideline", "protocol", "plannedSurgeries", "referrals"]
                                            },
                                            "testAndTreatments": {
                                                "id": "testAndTreatments",
                                                "description": "testAndTreatments deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "I",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "I",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            },
                                                            "infoButton": {
                                                                "id": "infoButton",
                                                                "status": "A",
                                                                "label": "Infobutton",
                                                                "icon": "InfoButtonIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    },
                                                    "rehab": {
                                                        "id": "rehab",
                                                        "description": "rehab deepnavs",
                                                        "pos": 5,
                                                        "type": "deepnav",
                                                        "areas": {
                                                            "screen": {
                                                                "id": "screen",
                                                                "description": "Screen",
                                                                "pos": 12,
                                                                "type": "screen",
                                                                "buttons": {
                                                                    "actionButton": {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "advanceSearch": {
                                                                        "id": "advanceSearch",
                                                                        "status": "A",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    },
                                                                    "applicationHelp": {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    },
                                                                    "cancel": {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    },
                                                                    "create": {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    },
                                                                    "eye": {
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    },
                                                                    "globalShortcut": {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    },
                                                                    "ok": {
                                                                        "id": "ok",
                                                                        "status": "A",
                                                                        "label": "Confirm and continue",
                                                                        "icon": "OKIcon",
                                                                        "action": {}
                                                                    },
                                                                    "print": {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    },
                                                                    "toolsCommonText": {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    },
                                                                    "viewsButton": {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }
                                                                },
                                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                                                            }
                                                        },
                                                        "buttons": {
                                                            "proceduresMfr": {
                                                                "id": "proceduresMfr",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.rehab.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "RehabTreatmentsAllList.swf"
                                                                    }
                                                                }
                                                            },
                                                            "rehabPlan": {
                                                                "id": "rehabPlan",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.rehab.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRRehabPlanHistory.swf"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttonsPos": ["proceduresMfr", "rehabPlan"]
                                                    }
                                                },
                                                "buttons": {
                                                    "depnvAnalisys": {
                                                        "id": "depnvAnalisys",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRLabs.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvImages": {
                                                        "id": "depnvImages",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRImages.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvOtherExams": {
                                                        "id": "depnvOtherExams",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHROtherExams.swf"
                                                            }
                                                        }
                                                    },
                                                    "prescription": {
                                                        "id": "prescription",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PrescViewPrescribedMedication.swf"
                                                            }
                                                        }
                                                    },
                                                    "pEnsinosenfermagem": {
                                                        "id": "pEnsinosenfermagem",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PatientEducationAllList.swf"
                                                            }
                                                        }
                                                    },
                                                    "pProcedures": {
                                                        "id": "pProcedures",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "ProceduresTimeline.swf"
                                                            }
                                                        }
                                                    },
                                                    "ehrLensPresc": {
                                                        "id": "ehrLensPresc",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRLensPrescriptionList.swf"
                                                            }
                                                        }
                                                    },
                                                    "rehab": {
                                                        "id": "rehab",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.rehab"
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["depnvAnalisys", "depnvImages", "depnvOtherExams", "prescription", "pEnsinosenfermagem", "pProcedures", "ehrLensPresc", "rehab"]
                                            },
                                            "history": {
                                                "id": "history",
                                                "description": "history deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "infoButton": {
                                                                "id": "infoButton",
                                                                "status": "A",
                                                                "label": "Infobutton",
                                                                "icon": "InfoButtonIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    },
                                                    "assessToolsGroup": {
                                                        "id": "assessToolsGroup",
                                                        "description": "assessToolsGroup deepnavs",
                                                        "pos": 5,
                                                        "type": "deepnav",
                                                        "areas": {
                                                            "screen": {
                                                                "id": "screen",
                                                                "description": "Screen",
                                                                "pos": 12,
                                                                "type": "screen",
                                                                "buttons": {
                                                                    "actionButton": {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "advanceSearch": {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    },
                                                                    "applicationHelp": {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    },
                                                                    "cancel": {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    },
                                                                    "create": {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    },
                                                                    "eye": {
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    },
                                                                    "globalShortcut": {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    },
                                                                    "ok": {
                                                                        "id": "ok",
                                                                        "status": "I",
                                                                        "label": "Confirm and continue",
                                                                        "icon": "OKIcon",
                                                                        "action": {}
                                                                    },
                                                                    "print": {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    },
                                                                    "toolsCommonText": {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    },
                                                                    "viewsButton": {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "noEdis": {
                                                                        "id": "noEdis",
                                                                        "status": "I",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }
                                                                },
                                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText"]
                                                            }
                                                        },
                                                        "buttons": {
                                                            "factoresRisco": {
                                                                "id": "factoresRisco",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRRiskFactorsSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "depnvFuncEval": {
                                                                "id": "depnvFuncEval",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "EHRPhysicalExamEvaluationSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "scores": {
                                                                "id": "scores",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "SeverityScoresSummaryHist.swf"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttonsPos": ["factoresRisco", "depnvFuncEval", "scores"]
                                                    },
                                                    "avaliacaoInfantil": {
                                                        "id": "avaliacaoInfantil",
                                                        "description": "avaliacaoInfantil deepnavs",
                                                        "pos": 5,
                                                        "type": "deepnav",
                                                        "areas": {
                                                            "screen": {
                                                                "id": "screen",
                                                                "description": "Screen",
                                                                "pos": 12,
                                                                "type": "screen",
                                                                "buttons": {
                                                                    "actionButton": {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    },
                                                                    "advanceSearch": {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    },
                                                                    "applicationHelp": {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    },
                                                                    "cancel": {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    },
                                                                    "create": {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    },
                                                                    "eye": {
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    },
                                                                    "globalShortcut": {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    },
                                                                    "ok": {
                                                                        "id": "ok",
                                                                        "status": "A",
                                                                        "label": "Confirm and continue",
                                                                        "icon": "OKIcon",
                                                                        "action": {}
                                                                    },
                                                                    "print": {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    },
                                                                    "toolsCommonText": {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    },
                                                                    "viewsButton": {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }
                                                                },
                                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                            }
                                                        },
                                                        "buttons": {
                                                            "pediatricAssessment": {
                                                                "id": "pediatricAssessment",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "PediatricAssessmentSummary.swf"
                                                                    }
                                                                }
                                                            },
                                                            "genPediatricAssessment": {
                                                                "id": "genPediatricAssessment",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "GeneralPediatricAssessment.swf"
                                                                    }
                                                                }
                                                            },
                                                            "developmentMilestones": {
                                                                "id": "developmentMilestones",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "DevelopmentMilestonesGrid.swf"
                                                                    }
                                                                }
                                                            },
                                                            "assessmentDevelopment": {
                                                                "id": "assessmentDevelopment",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "AssessmentOfDevelopment.swf"
                                                                    }
                                                                }
                                                            },
                                                            "pediatricNutrition": {
                                                                "id": "pediatricNutrition",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "PediatricNutritionGrid.swf"
                                                                    }
                                                                }
                                                            },
                                                            "pediatricNutritionAssess": {
                                                                "id": "pediatricNutritionAssess",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "PediatricNutritionAssessment.swf"
                                                                    }
                                                                }
                                                            },
                                                            "rendimentoEscolar": {
                                                                "id": "rendimentoEscolar",
                                                                "status": "A",
                                                                "label": "",
                                                                "icon": "",
                                                                "action": {
                                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil.screen",
                                                                    "component": {
                                                                        "type": "SWF",
                                                                        "id": "SchoolPerformance.swf"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttonsPos": ["pediatricAssessment", "genPediatricAssessment", "developmentMilestones", "assessmentDevelopment", "pediatricNutrition", "pediatricNutritionAssess", "rendimentoEscolar"]
                                                    }
                                                },
                                                "buttons": {
                                                    "depnvProblemas": {
                                                        "id": "depnvProblemas",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRProblemList.swf"
                                                            }
                                                        }
                                                    },
                                                    "ehrDeepnavPrevDiagnosis": {
                                                        "id": "ehrDeepnavPrevDiagnosis",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "Diagnosis.swf"
                                                            }
                                                        }
                                                    },
                                                    "historicohospitalarAlergias": {
                                                        "id": "historicohospitalarAlergias",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRAllergyList.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvHabitos": {
                                                        "id": "depnvHabitos",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRPatientHabits.swf"
                                                            }
                                                        }
                                                    },
                                                    "antecedentes": {
                                                        "id": "antecedentes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRPastHistorySummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "identificationIdentification": {
                                                        "id": "identificationIdentification",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PatientAttributes.swf"
                                                            }
                                                        }
                                                    },
                                                    "familyRelationships": {
                                                        "id": "familyRelationships",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "GridFamily.swf"
                                                            }
                                                        }
                                                    },
                                                    "assessToolsGroup": {
                                                        "id": "assessToolsGroup",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup"
                                                        }
                                                    },
                                                    "ehrDepnvVitalSign": {
                                                        "id": "ehrDepnvVitalSign",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRVitalSigns.swf"
                                                            }
                                                        }
                                                    },
                                                    "biometric": {
                                                        "id": "biometric",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "BiometricRead.swf"
                                                            }
                                                        }
                                                    },
                                                    "pregnancyList": {
                                                        "id": "pregnancyList",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRWomanHealthPregnanciesSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "avaliacaoInfantil": {
                                                        "id": "avaliacaoInfantil",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil"
                                                        }
                                                    },
                                                    "vacinacao": {
                                                        "id": "vacinacao",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRVaccinationSummaryPage.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["depnvProblemas", "ehrDeepnavPrevDiagnosis", "historicohospitalarAlergias", "depnvHabitos", "antecedentes", "identificationIdentification", "familyRelationships", "assessToolsGroup", "ehrDepnvVitalSign", "biometric", "pregnancyList", "avaliacaoInfantil", "vacinacao"]
                                            },
                                            "nursing": {
                                                "id": "nursing",
                                                "description": "nursing deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "I",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "nursingInitialAssessment": {
                                                        "id": "nursingInitialAssessment",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRNIASummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "nursingProgressNotes": {
                                                        "id": "nursingProgressNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EHRNPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "nurseNotesSr": {
                                                        "id": "nurseNotesSr",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "NursingNotes.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvNursingCarePlan": {
                                                        "id": "depnvNursingCarePlan",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "NursingDiagnosisInterventions.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["nursingInitialAssessment", "nursingProgressNotes", "nurseNotesSr", "depnvNursingCarePlan"]
                                            }
                                        },
                                        "buttons": {
                                            "dashboard": {
                                                "id": "dashboard",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DashBoardLoader.swf"
                                                    }
                                                }
                                            },
                                            "visits": {
                                                "id": "visits",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits"
                                                }
                                            },
                                            "planning": {
                                                "id": "planning",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.planning"
                                                }
                                            },
                                            "testAndTreatments": {
                                                "id": "testAndTreatments",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments"
                                                }
                                            },
                                            "history": {
                                                "id": "history",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history"
                                                }
                                            },
                                            "historicohospitalarGruposang": {
                                                "id": "historicohospitalarGruposang",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "BloodList.swf"
                                                    }
                                                }
                                            },
                                            "nursing": {
                                                "id": "nursing",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing"
                                                }
                                            },
                                            "trials": {
                                                "id": "trials",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "TrialsList.swf"
                                                    }
                                                }
                                            },
                                            "mediaArchive": {
                                                "id": "mediaArchive",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DocumentsArchive.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["dashboard", "visits", "planning", "testAndTreatments", "history", "historicohospitalarGruposang", "nursing", "trials", "mediaArchive"]
                                    },
                                    "clinicalInfoIcon": {
                                        "id": "clinicalInfoIcon",
                                        "description": "clinicalInfoIcon deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "I",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    },
                                                    "infoButton": {
                                                        "id": "infoButton",
                                                        "status": "A",
                                                        "label": "Infobutton",
                                                        "icon": "InfoButtonIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            },
                                            "progressNotes": {
                                                "id": "progressNotes",
                                                "description": "progressNotes deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "I",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            },
                                                            "noEdis": {
                                                                "id": "noEdis",
                                                                "status": "I",
                                                                "label": "Negative for all discriminators on this page",
                                                                "icon": "NoIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "applicationHelp", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "physicianProgressNotes": {
                                                        "id": "physicianProgressNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "INPPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvPareceres": {
                                                        "id": "depnvPareceres",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "OpinionList.swf"
                                                            }
                                                        }
                                                    },
                                                    "nursingProgressNotes": {
                                                        "id": "nursingProgressNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "NPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "intervalNotes": {
                                                        "id": "intervalNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "RPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "evaluationmfr": {
                                                        "id": "evaluationmfr",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "MFREvaluationSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "dietaryProgressNotes": {
                                                        "id": "dietaryProgressNotes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "DPNSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "activityTherapy": {
                                                        "id": "activityTherapy",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "ActivityTherapyEHRSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "socialSummary": {
                                                        "id": "socialSummary",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "SocialSummary.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["physicianProgressNotes", "depnvPareceres", "nursingProgressNotes", "intervalNotes", "evaluationmfr", "dietaryProgressNotes", "activityTherapy", "socialSummary"]
                                            },
                                            "assessToolsGroup": {
                                                "id": "assessToolsGroup",
                                                "description": "assessToolsGroup deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "I",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "scores": {
                                                        "id": "scores",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "SeverityScoresSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "depnvFuncEval": {
                                                        "id": "depnvFuncEval",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "EvaluationSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "factoresRisco": {
                                                        "id": "factoresRisco",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "RiskFactorsSummary.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["scores", "depnvFuncEval", "factoresRisco"]
                                            }
                                        },
                                        "buttons": {
                                            "summaryInp": {
                                                "id": "summaryInp",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "INPSummary.swf"
                                                    }
                                                }
                                            },
                                            "hp": {
                                                "id": "hp",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "INPHPSummary.swf"
                                                    }
                                                }
                                            },
                                            "progressNotes": {
                                                "id": "progressNotes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes"
                                                }
                                            },
                                            "depnvProblemas": {
                                                "id": "depnvProblemas",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ProblemList.swf"
                                                    }
                                                }
                                            },
                                            "medicacaoAnt": {
                                                "id": "medicacaoAnt",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PrescViewHomeMedication.swf"
                                                    }
                                                }
                                            },
                                            "antecedentes": {
                                                "id": "antecedentes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PastHistorySummary.swf"
                                                    }
                                                }
                                            },
                                            "depnvDiagnosticos": {
                                                "id": "depnvDiagnosticos",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DiagnosisDifferentialList.swf"
                                                    }
                                                }
                                            },
                                            "assessToolsGroup": {
                                                "id": "assessToolsGroup",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup"
                                                }
                                            },
                                            "depnvTopografia": {
                                                "id": "depnvTopografia",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "BodyDiagram.swf"
                                                    }
                                                }
                                            },
                                            "consultasAnteriores": {
                                                "id": "consultasAnteriores",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PreviousEpisSummaryPage.swf"
                                                    }
                                                }
                                            },
                                            "emergencyEpisodeSummary": {
                                                "id": "emergencyEpisodeSummary",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "EDISEpisodeSummary.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["summaryInp", "hp", "progressNotes", "depnvProblemas", "medicacaoAnt", "antecedentes", "depnvDiagnosticos", "assessToolsGroup", "depnvTopografia", "consultasAnteriores", "emergencyEpisodeSummary"]
                                    },
                                    "orderEntry": {
                                        "id": "orderEntry",
                                        "description": "orderEntry deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "A",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    },
                                                    "infoButton": {
                                                        "id": "infoButton",
                                                        "status": "A",
                                                        "label": "Infobutton",
                                                        "icon": "InfoButtonIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            },
                                            "depnvAnalisys": {
                                                "id": "depnvAnalisys",
                                                "description": "depnvAnalisys deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "I",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "infoButton": {
                                                                "id": "infoButton",
                                                                "status": "A",
                                                                "label": "Infobutton",
                                                                "icon": "InfoButtonIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "depnvAnalisys": {
                                                        "id": "depnvAnalisys",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "LabTestsOrdersList.swf"
                                                            }
                                                        }
                                                    },
                                                    "aColheitas": {
                                                        "id": "aColheitas",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "AnalysisHarvest.swf"
                                                            }
                                                        }
                                                    },
                                                    "aTranpAnalises": {
                                                        "id": "aTranpAnalises",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "AnalysisHarvestTransport.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["depnvAnalisys", "aColheitas", "aTranpAnalises"]
                                            },
                                            "prescription": {
                                                "id": "prescription",
                                                "description": "prescription deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "infoButton": {
                                                                "id": "infoButton",
                                                                "status": "A",
                                                                "label": "Infobutton",
                                                                "icon": "InfoButtonIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "prescription": {
                                                        "id": "prescription",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.prescription.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PrescViewMedicationMistakes.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["prescription", "prescription", "prescription", "prescription", "prescription", "prescription"]
                                            },
                                            "pEnsinosenfermagem": {
                                                "id": "pEnsinosenfermagem",
                                                "description": "pEnsinosenfermagem deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            },
                                                            "infoButton": {
                                                                "id": "infoButton",
                                                                "status": "A",
                                                                "label": "Infobutton",
                                                                "icon": "InfoButtonIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "patientAssessment": {
                                                        "id": "patientAssessment",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.pEnsinosenfermagem.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PatientAssessmentSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "patientEducation": {
                                                        "id": "patientEducation",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.pEnsinosenfermagem.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PatientEducationList.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["patientAssessment", "patientEducation", "patientEducation"]
                                            },
                                            "physicalTherapy": {
                                                "id": "physicalTherapy",
                                                "description": "physicalTherapy deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "proceduresMfr": {
                                                        "id": "proceduresMfr",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.physicalTherapy.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "RehabPlan.swf"
                                                            }
                                                        }
                                                    },
                                                    "rehabPlan": {
                                                        "id": "rehabPlan",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.physicalTherapy.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "RehabTreatmentPlanView.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["proceduresMfr", "rehabPlan", "rehabPlan"]
                                            },
                                            "planningGroup": {
                                                "id": "planningGroup",
                                                "description": "planningGroup deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "carePlans": {
                                                        "id": "carePlans",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "CarePlansList.swf"
                                                            }
                                                        }
                                                    },
                                                    "guideline": {
                                                        "id": "guideline",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "GuidelinesSummary.swf"
                                                            }
                                                        }
                                                    },
                                                    "protocol": {
                                                        "id": "protocol",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "ProtocolSummary.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["carePlans", "guideline", "protocol"]
                                            }
                                        },
                                        "buttons": {
                                            "cpoe": {
                                                "id": "cpoe",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "CpoeGrid.swf"
                                                    }
                                                }
                                            },
                                            "orderSets": {
                                                "id": "orderSets",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "OrderSetOngoing.swf"
                                                    }
                                                }
                                            },
                                            "depnvAnalisys": {
                                                "id": "depnvAnalisys",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys"
                                                }
                                            },
                                            "depnvImages": {
                                                "id": "depnvImages",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ImageList.swf"
                                                    }
                                                }
                                            },
                                            "depnvOtherExams": {
                                                "id": "depnvOtherExams",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ExamList.swf"
                                                    }
                                                }
                                            },
                                            "prescription": {
                                                "id": "prescription",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PrescViewAdminAndTasks.swf"
                                                    }
                                                }
                                            },
                                            "pProcedures": {
                                                "id": "pProcedures",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ProceduresLoaderView.swf"
                                                    }
                                                }
                                            },
                                            "pEnsinosenfermagem": {
                                                "id": "pEnsinosenfermagem",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.pEnsinosenfermagem"
                                                }
                                            },
                                            "diets": {
                                                "id": "diets",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DietSummary.swf"
                                                    }
                                                }
                                            },
                                            "consultRequests": {
                                                "id": "consultRequests",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ParamedicalRequestList.swf"
                                                    }
                                                }
                                            },
                                            "positioningInp": {
                                                "id": "positioningInp",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PositioningsList.swf"
                                                    }
                                                }
                                            },
                                            "physicalTherapy": {
                                                "id": "physicalTherapy",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.physicalTherapy"
                                                }
                                            },
                                            "planningGroup": {
                                                "id": "planningGroup",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup"
                                                }
                                            },
                                            "suppliesProcedures": {
                                                "id": "suppliesProcedures",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "SuppliesList.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["cpoe", "orderSets", "depnvAnalisys", "depnvImages", "depnvOtherExams", "prescription", "pProcedures", "pEnsinosenfermagem", "diets", "consultRequests", "positioningInp", "physicalTherapy", "planningGroup", "suppliesProcedures"]
                                    },
                                    "nurse": {
                                        "id": "nurse",
                                        "description": "nurse deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "A",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "I",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            }
                                        },
                                        "buttons": {
                                            "nursingInitialAssessment": {
                                                "id": "nursingInitialAssessment",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "NIASummary.swf"
                                                    }
                                                }
                                            },
                                            "depnvNursingCarePlan": {
                                                "id": "depnvNursingCarePlan",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ICNPLoaderView.swf"
                                                    }
                                                }
                                            },
                                            "depnvVitalSign": {
                                                "id": "depnvVitalSign",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "VitalSignsDetail.swf"
                                                    }
                                                }
                                            },
                                            "biometric": {
                                                "id": "biometric",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "BiometricRead.swf"
                                                    }
                                                }
                                            },
                                            "hidrics": {
                                                "id": "hidrics",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "FluidBalanceRequestList.swf"
                                                    }
                                                }
                                            },
                                            "observacaoPeriodica": {
                                                "id": "observacaoPeriodica",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "FlowSheetsLoaderViews.swf"
                                                    }
                                                }
                                            },
                                            "healthProgr": {
                                                "id": "healthProgr",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HealthProgramList.swf"
                                                    }
                                                }
                                            },
                                            "dischargeAltaEnfer": {
                                                "id": "dischargeAltaEnfer",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.nurse.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "NursingDischarge.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["nursingInitialAssessment", "depnvNursingCarePlan", "depnvVitalSign", "biometric", "hidrics", "observacaoPeriodica", "healthProgr", "dischargeAltaEnfer"]
                                    },
                                    "patientid": {
                                        "id": "patientid",
                                        "description": "patientid deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            }
                                        },
                                        "buttons": {
                                            "identificationIdentification": {
                                                "id": "identificationIdentification",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientAttributes.swf"
                                                    }
                                                }
                                            },
                                            "subdeepnvAdministradorPhoto": {
                                                "id": "subdeepnvAdministradorPhoto",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientCapturePhotoDoctor.swf"
                                                    }
                                                }
                                            },
                                            "barcode": {
                                                "id": "barcode",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PrintPatientBarCode.swf"
                                                    }
                                                }
                                            },
                                            "identificationDocumentos": {
                                                "id": "identificationDocumentos",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DocumentsArchive.swf"
                                                    }
                                                }
                                            },
                                            "identificationPlanossaude": {
                                                "id": "identificationPlanossaude",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientHealthPlan.swf"
                                                    }
                                                }
                                            },
                                            "idArrivedByEdis": {
                                                "id": "idArrivedByEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientArrivedBy.swf"
                                                    }
                                                }
                                            },
                                            "patientPortal": {
                                                "id": "patientPortal",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "AdtPatientPortalAccess.swf"
                                                    }
                                                }
                                            },
                                            "advancedDirectives": {
                                                "id": "advancedDirectives",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "AdvancedDirectivesSummary.swf"
                                                    }
                                                }
                                            },
                                            "identificationNecessidades": {
                                                "id": "identificationNecessidades",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientid.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientNeeds.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["identificationIdentification", "subdeepnvAdministradorPhoto", "barcode", "identificationDocumentos", "identificationPlanossaude", "idArrivedByEdis", "patientPortal", "advancedDirectives", "identificationNecessidades"]
                                    },
                                    "coding": {
                                        "id": "coding",
                                        "description": "coding deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "A",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "A",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText"]
                                            }
                                        },
                                        "buttons": {
                                            "codingPage": {
                                                "id": "codingPage",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.coding.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "CpPatientGW.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["codingPage"]
                                    },
                                    "discharge": {
                                        "id": "discharge",
                                        "description": "discharge deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "infoButton": {
                                                        "id": "infoButton",
                                                        "status": "A",
                                                        "label": "Infobutton",
                                                        "icon": "InfoButtonIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "I",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "infoButton", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            },
                                            "futureEvents": {
                                                "id": "futureEvents",
                                                "description": "futureEvents deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "p1DepnavSummary": {
                                                        "id": "p1DepnavSummary",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "P1GridDoctorPat.swf"
                                                            }
                                                        }
                                                    },
                                                    "futureEvents": {
                                                        "id": "futureEvents",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "FutureEventsList.swf"
                                                            }
                                                        }
                                                    },
                                                    "surgProcCreation": {
                                                        "id": "surgProcCreation",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "SurgicalEpisodeLoader.swf"
                                                            }
                                                        }
                                                    },
                                                    "inpatientEpisodes": {
                                                        "id": "inpatientEpisodes",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "InpatientEpisodesListLoader.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["p1DepnavSummary", "futureEvents", "surgProcCreation", "inpatientEpisodes"]
                                            }
                                        },
                                        "buttons": {
                                            "dischargeDiagSaida": {
                                                "id": "dischargeDiagSaida",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DiagnosisFinalList.swf"
                                                    }
                                                }
                                            },
                                            "dischargeReceita": {
                                                "id": "dischargeReceita",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PrescViewAdminAndTasks.swf"
                                                    }
                                                }
                                            },
                                            "futureEvents": {
                                                "id": "futureEvents",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents"
                                                }
                                            },
                                            "dischargeRecDoente": {
                                                "id": "dischargeRecDoente",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "RecommendPatientNotes.swf"
                                                    }
                                                }
                                            },
                                            "dischargeRecMedico": {
                                                "id": "dischargeRecMedico",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DischargeDoctorSummary.swf"
                                                    }
                                                }
                                            },
                                            "formulaires": {
                                                "id": "formulaires",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "CitsCerfas.swf"
                                                    }
                                                }
                                            },
                                            "coSign": {
                                                "id": "coSign",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "CoSignTaskList.swf"
                                                    }
                                                }
                                            },
                                            "deathRegistry": {
                                                "id": "deathRegistry",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DeathRegistrySummary.swf"
                                                    }
                                                }
                                            },
                                            "usDisposition": {
                                                "id": "usDisposition",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "USDispositionSummary.swf"
                                                    }
                                                }
                                            },
                                            "signoff": {
                                                "id": "signoff",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "SignOff.swf"
                                                    }
                                                }
                                            },
                                            "phyDischargeNotes": {
                                                "id": "phyDischargeNotes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DSSummary.swf"
                                                    }
                                                }
                                            },
                                            "summaryInp": {
                                                "id": "summaryInp",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "INPSummary.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["dischargeDiagSaida", "dischargeReceita", "futureEvents", "dischargeRecDoente", "dischargeRecMedico", "formulaires", "coSign", "deathRegistry", "usDisposition", "signoff", "phyDischargeNotes", "summaryInp"]
                                    },
                                    "patientManagement": {
                                        "id": "patientManagement",
                                        "description": "patientManagement deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "A",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            },
                                            "pendingIssue": {
                                                "id": "pendingIssue",
                                                "description": "pendingIssue deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "viewsButton": {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "myPendingIssue": {
                                                        "id": "myPendingIssue",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.patientManagement.pendingIssue.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "MyPendingIssues.swf"
                                                            }
                                                        }
                                                    },
                                                    "allPendingIssue": {
                                                        "id": "allPendingIssue",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.patientManagement.pendingIssue.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "AllPendingIssues.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["myPendingIssue", "allPendingIssue"]
                                            }
                                        },
                                        "buttons": {
                                            "patientTransfers": {
                                                "id": "patientTransfers",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ServiceTransferListPat.swf"
                                                    }
                                                }
                                            },
                                            "physicianHandOffEdis": {
                                                "id": "physicianHandOffEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HandOffListPhysician.swf"
                                                    }
                                                }
                                            },
                                            "nurseHandOffEdis": {
                                                "id": "nurseHandOffEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HandOffListNurse.swf"
                                                    }
                                                }
                                            },
                                            "medicalTeams": {
                                                "id": "medicalTeams",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "HandOffListTeams.swf"
                                                    }
                                                }
                                            },
                                            "transferInstitution": {
                                                "id": "transferInstitution",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "TransferInstitutionGrid.swf"
                                                    }
                                                }
                                            },
                                            "transportationTransportes": {
                                                "id": "transportationTransportes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "Movements.swf"
                                                    }
                                                }
                                            },
                                            "transportationDesvio": {
                                                "id": "transportationDesvio",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "NewDetour.swf"
                                                    }
                                                }
                                            },
                                            "allocateBedInp": {
                                                "id": "allocateBedInp",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "BedAssigmentLoader.swf"
                                                    }
                                                }
                                            },
                                            "pendingIssue": {
                                                "id": "pendingIssue",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.pendingIssue"
                                                }
                                            },
                                            "idBelongingsEdis": {
                                                "id": "idBelongingsEdis",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "PatientBelongings.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["patientTransfers", "physicianHandOffEdis", "nurseHandOffEdis", "medicalTeams", "transferInstitution", "transportationTransportes", "transportationTransportes", "transportationDesvio", "allocateBedInp", "pendingIssue", "idBelongingsEdis"]
                                    },
                                    "pregnancyButton": {
                                        "id": "pregnancyButton",
                                        "description": "pregnancyButton deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "A",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            }
                                        },
                                        "buttons": {
                                            "pregnancyList": {
                                                "id": "pregnancyList",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.pregnancyButton.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "WomanHealthPregnanciesSummary.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["pregnancyList"]
                                    },
                                    "checklistFrontoffice": {
                                        "id": "checklistFrontoffice",
                                        "description": "checklistFrontoffice deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "A",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "A",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText"]
                                            }
                                        },
                                        "buttons": {
                                            "frontofficeChecklist": {
                                                "id": "frontofficeChecklist",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.checklistFrontoffice.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ChecklistGrid.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["frontofficeChecklist"]
                                    }
                                },
                                "buttons": {
                                    "ehr": {
                                        "id": "ehr",
                                        "status": "A",
                                        "label": "Electronic health record",
                                        "icon": "PreviousEpisodesIcon_3",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.ehr"
                                        }
                                    },
                                    "clinicalInfoIcon": {
                                        "id": "clinicalInfoIcon",
                                        "status": "A",
                                        "label": "Documentation",
                                        "icon": "ClinicalInfoIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon"
                                        }
                                    },
                                    "pdms": {
                                        "id": "pdms",
                                        "status": "A",
                                        "label": "Patient Data Management System",
                                        "icon": "PDMSIcon",
                                        "action": {}
                                    },
                                    "orderEntry": {
                                        "id": "orderEntry",
                                        "status": "A",
                                        "label": "Orders",
                                        "icon": "OrderEntryIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry"
                                        }
                                    },
                                    "nurse": {
                                        "id": "nurse",
                                        "status": "A",
                                        "label": "Nursing process",
                                        "icon": "NurseIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.nurse"
                                        }
                                    },
                                    "patientid": {
                                        "id": "patientid",
                                        "status": "A",
                                        "label": "Patient identification",
                                        "icon": "PatientIDNewIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.patientid"
                                        }
                                    },
                                    "coding": {
                                        "id": "coding",
                                        "status": "A",
                                        "label": "Coding",
                                        "icon": "CodingIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.coding"
                                        }
                                    },
                                    "discharge": {
                                        "id": "discharge",
                                        "status": "A",
                                        "label": "Discharge",
                                        "icon": "DischargeIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.discharge"
                                        }
                                    },
                                    "agenda": {
                                        "id": "agenda",
                                        "status": "A",
                                        "label": "Scheduler",
                                        "icon": "ScheduledNewIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.screen",
                                            "component": {
                                                "type": "SWF",
                                                "id": "CalendarMonthOverview.swf"
                                            }
                                        }
                                    },
                                    "patientManagement": {
                                        "id": "patientManagement",
                                        "status": "A",
                                        "label": "Patient management",
                                        "icon": "PatientManagementIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.patientManagement"
                                        }
                                    },
                                    "pregnancyButton": {
                                        "id": "pregnancyButton",
                                        "status": "A",
                                        "label": "Pregnancy record",
                                        "icon": "PregnancyIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.pregnancyButton"
                                        }
                                    },
                                    "checklistFrontoffice": {
                                        "id": "checklistFrontoffice",
                                        "status": "A",
                                        "label": "Checklists",
                                        "icon": "ChecklistBackofficeIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.checklistFrontoffice"
                                        }
                                    }
                                },
                                "buttonsPos": ["ehr", "clinicalInfoIcon", "pdms", "orderEntry", "nurse", "patientid", "coding", "discharge", "agenda", "patientManagement", "pregnancyButton", "checklistFrontoffice"]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": {
                            "reset": {
                                "id": "reset",
                                "status": "A",
                                "label": "Go back to patient area",
                                "icon": "RestartIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["reset"]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": {
                            "ok": {
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["ok"]
                    },
                    "mainMenuLeft": {
                        "id": "mainMenuLeft",
                        "description": "Alerts area",
                        "pos": 8,
                        "type": "mainMenuLeft",
                        "areas": {
                            "screen": {
                                "id": "screen",
                                "description": "Screen",
                                "pos": 12,
                                "type": "screen",
                                "buttons": {
                                    "actionButton": {
                                        "id": "actionButton",
                                        "status": "I",
                                        "label": "Actions",
                                        "icon": "",
                                        "action": {}
                                    },
                                    "advanceSearch": {
                                        "id": "advanceSearch",
                                        "status": "I",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    },
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "I",
                                        "label": "Cancel records",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "I",
                                        "label": "Add or edit records",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "eye": {
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Record details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "globalShortcut": {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    },
                                    "ok": {
                                        "id": "ok",
                                        "status": "A",
                                        "label": "Confirm and continue",
                                        "icon": "OKIcon",
                                        "action": {}
                                    },
                                    "print": {
                                        "id": "print",
                                        "status": "I",
                                        "label": "Print tool",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    },
                                    "toolsCommonText": {
                                        "id": "toolsCommonText",
                                        "status": "I",
                                        "label": "Predefined texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                            }
                        },
                        "buttons": {
                            "alert": {
                                "id": "alert",
                                "status": "A",
                                "label": "Alert messages",
                                "icon": "AlertIcon",
                                "action": {
                                    "targetArea": "inpatient.patient.mainMenuLeft.screen",
                                    "component": {
                                        "type": "SWF",
                                        "id": "AlertsInpatient.swf"
                                    }
                                }
                            }
                        },
                        "buttonsPos": ["alert"]
                    },
                    "actionMenu": {
                        "id": "actionMenu",
                        "description": "Bottom menu",
                        "pos": 10,
                        "type": "actionMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Bottom menu left",
                                "pos": 10,
                                "type": "actionMenu",
                                "buttons": {
                                    "print": {
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "advanceSearchIcon": {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "toolsCommontext": {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    },
                                    "actionButton": {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    },
                                    "viewsButton": {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    },
                                    "firstView": {
                                        "id": "firstView",
                                        "status": "A",
                                        "label": "First view",
                                        "icon": "FirstVisionIcon",
                                        "action": {}
                                    },
                                    "barListEdis": {
                                        "id": "barListEdis",
                                        "status": "A",
                                        "label": "List view",
                                        "icon": "ListIcon",
                                        "action": {}
                                    },
                                    "secondView": {
                                        "id": "secondView",
                                        "status": "A",
                                        "label": "Second view",
                                        "icon": "SecondVisionIcon",
                                        "action": {}
                                    },
                                    "chartLinesEdis": {
                                        "id": "chartLinesEdis",
                                        "status": "A",
                                        "label": "Graphic view",
                                        "icon": "ChartsLinesIcon",
                                        "action": {}
                                    },
                                    "docImport": {
                                        "id": "docImport",
                                        "status": "A",
                                        "label": "Import documents",
                                        "icon": "ImportDocIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["print", "create", "advanceSearchIcon", "cancel", "toolsCommontext", "actionButton", "viewsButton", "firstView", "barListEdis", "secondView", "chartLinesEdis", "docImport"]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu",
                                "buttons": {
                                    "eye": {
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "contextHelp": {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    },
                                    "infoButton": {
                                        "id": "infoButton",
                                        "status": "A",
                                        "label": "Infobutton",
                                        "icon": "InfoButtonIcon",
                                        "action": {}
                                    },
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "globalShortcut": {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["eye", "contextHelp", "infoButton", "applicationHelp", "globalShortcut"]
                            }
                        }
                    }
                }
            },
            "tools": {
                "id": "tools",
                "description": "Inpatient tools area",
                "pos": 0,
                "type": "",
                "areas": {
                    "headerRight": {
                        "id": "headerRight",
                        "description": "Logout button area",
                        "pos": 1,
                        "type": "headerRight",
                        "buttons": {
                            "logout": {
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["logout"]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": {
                            "back": {
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["back"]
                    },
                    "mainMenu": {
                        "id": "mainMenu",
                        "description": "Main menu",
                        "pos": 3,
                        "type": "mainMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Main menu left",
                                "pos": 3,
                                "type": "mainMenu",
                                "areas": {
                                    "toolsLang": {
                                        "id": "toolsLang",
                                        "description": "toolsLang deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "I",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "noEdis": {
                                                        "id": "noEdis",
                                                        "status": "I",
                                                        "label": "Negative for all discriminators on this page",
                                                        "icon": "NoIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "noEdis", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print"]
                                            }
                                        },
                                        "buttons": {
                                            "toolsEspecialidades": {
                                                "id": "toolsEspecialidades",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ToolsMySpecialities.swf"
                                                    }
                                                }
                                            },
                                            "backofficeGroups": {
                                                "id": "backofficeGroups",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "FollowUpCareGroupsList.swf"
                                                    }
                                                }
                                            },
                                            "toolsSalas": {
                                                "id": "toolsSalas",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ToolsMyRoomsSet.swf"
                                                    }
                                                }
                                            },
                                            "toolsTouchOption": {
                                                "id": "toolsTouchOption",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ToolsDataEntryFormatSet.swf"
                                                    }
                                                }
                                            },
                                            "biometrics": {
                                                "id": "biometrics",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ToolsBiometricID.swf"
                                                    }
                                                }
                                            },
                                            "toolsPersonalData": {
                                                "id": "toolsPersonalData",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ToolsProfessionalData.swf"
                                                    }
                                                }
                                            },
                                            "releaseNotes": {
                                                "id": "releaseNotes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.toolsLang.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ReleaseNoteList.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["toolsEspecialidades", "backofficeGroups", "toolsSalas", "toolsTouchOption", "biometrics", "toolsPersonalData", "releaseNotes"]
                                    },
                                    "commontext": {
                                        "id": "commontext",
                                        "description": "commontext deepnavs",
                                        "pos": 5,
                                        "type": "deepnav",
                                        "areas": {
                                            "screen": {
                                                "id": "screen",
                                                "description": "Screen",
                                                "pos": 12,
                                                "type": "screen",
                                                "buttons": {
                                                    "actionButton": {
                                                        "id": "actionButton",
                                                        "status": "A",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "advanceSearch": {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    },
                                                    "applicationHelp": {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    },
                                                    "cancel": {
                                                        "id": "cancel",
                                                        "status": "A",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    },
                                                    "create": {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    },
                                                    "eye": {
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    },
                                                    "viewsButton": {
                                                        "id": "viewsButton",
                                                        "status": "A",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    },
                                                    "globalShortcut": {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    },
                                                    "ok": {
                                                        "id": "ok",
                                                        "status": "A",
                                                        "label": "Confirm and continue",
                                                        "icon": "OKIcon",
                                                        "action": {}
                                                    },
                                                    "print": {
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    },
                                                    "toolsCommonText": {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                },
                                                "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "viewsButton", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok"]
                                            },
                                            "orderSetsTools": {
                                                "id": "orderSetsTools",
                                                "description": "orderSetsTools deepnavs",
                                                "pos": 5,
                                                "type": "deepnav",
                                                "areas": {
                                                    "screen": {
                                                        "id": "screen",
                                                        "description": "Screen",
                                                        "pos": 12,
                                                        "type": "screen",
                                                        "buttons": {
                                                            "actionButton": {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            },
                                                            "advanceSearch": {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            },
                                                            "applicationHelp": {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            },
                                                            "cancel": {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            },
                                                            "create": {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            },
                                                            "eye": {
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            },
                                                            "globalShortcut": {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            },
                                                            "ok": {
                                                                "id": "ok",
                                                                "status": "A",
                                                                "label": "Confirm and continue",
                                                                "icon": "OKIcon",
                                                                "action": {}
                                                            },
                                                            "print": {
                                                                "id": "print",
                                                                "status": "I",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            },
                                                            "toolsCommonText": {
                                                                "id": "toolsCommonText",
                                                                "status": "A",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        },
                                                        "buttonsPos": ["actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText", "actionButton", "advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok", "print", "toolsCommonText"]
                                                    }
                                                },
                                                "buttons": {
                                                    "orderSetsTools": {
                                                        "id": "orderSetsTools",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.tools.mainMenu.left.commontext.orderSetsTools.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "OrderSetList.swf"
                                                            }
                                                        }
                                                    },
                                                    "groupsTools": {
                                                        "id": "groupsTools",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.tools.mainMenu.left.commontext.orderSetsTools.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "GroupsList.swf"
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttonsPos": ["orderSetsTools", "groupsTools"]
                                            }
                                        },
                                        "buttons": {
                                            "frequentText": {
                                                "id": "frequentText",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "MostFrequentTexts.swf"
                                                    }
                                                }
                                            },
                                            "guidelineTools": {
                                                "id": "guidelineTools",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "GuidelineList.swf"
                                                    }
                                                }
                                            },
                                            "protocolTools": {
                                                "id": "protocolTools",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "ProtocolList.swf"
                                                    }
                                                }
                                            },
                                            "orderSetsTools": {
                                                "id": "orderSetsTools",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.orderSetsTools"
                                                }
                                            },
                                            "predefineDiet": {
                                                "id": "predefineDiet",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DietTools.swf"
                                                    }
                                                }
                                            },
                                            "toolsDocMacro": {
                                                "id": "toolsDocMacro",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.screen",
                                                    "component": {
                                                        "type": "SWF",
                                                        "id": "DocumentationMacrosGrid.swf"
                                                    }
                                                }
                                            }
                                        },
                                        "buttonsPos": ["frequentText", "guidelineTools", "protocolTools", "orderSetsTools", "predefineDiet", "toolsDocMacro"]
                                    }
                                },
                                "buttons": {
                                    "toolsLang": {
                                        "id": "toolsLang",
                                        "status": "A",
                                        "label": "User configurations",
                                        "icon": "PreferencesIcon",
                                        "action": {
                                            "targetArea": "inpatient.tools.mainMenu.left.toolsLang"
                                        }
                                    },
                                    "commontext": {
                                        "id": "commontext",
                                        "status": "A",
                                        "label": "Content management",
                                        "icon": "ContentManagmentIcon",
                                        "action": {
                                            "targetArea": "inpatient.tools.mainMenu.left.commontext"
                                        }
                                    },
                                    "pdms": {
                                        "id": "pdms",
                                        "status": "A",
                                        "label": "Patient Data Management System",
                                        "icon": "PDMSIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["toolsLang", "commontext", "pdms"]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": {
                            "reset": {
                                "id": "reset",
                                "status": "A",
                                "label": "Go back to patient area",
                                "icon": "RestartIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["reset"]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": {
                            "ok": {
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        },
                        "buttonsPos": ["ok"]
                    },
                    "mainMenuLeft": {
                        "id": "mainMenuLeft",
                        "description": "Alerts area",
                        "pos": 8,
                        "type": "mainMenuLeft",
                        "areas": {
                            "screen": {
                                "id": "screen",
                                "description": "Screen",
                                "pos": 12,
                                "type": "screen",
                                "buttons": {
                                    "advanceSearch": {
                                        "id": "advanceSearch",
                                        "status": "I",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    },
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "I",
                                        "label": "Cancel records",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add or edit records",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "eye": {
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Record details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "globalShortcut": {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    },
                                    "ok": {
                                        "id": "ok",
                                        "status": "A",
                                        "label": "Confirm and continue",
                                        "icon": "OKIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["advanceSearch", "applicationHelp", "cancel", "create", "eye", "globalShortcut", "ok"]
                            }
                        },
                        "buttons": {
                            "alert": {
                                "id": "alert",
                                "status": "A",
                                "label": "Alert messages",
                                "icon": "AlertIcon",
                                "action": {
                                    "targetArea": "inpatient.tools.mainMenuLeft.screen",
                                    "component": {
                                        "type": "SWF",
                                        "id": "AlertsInpatient.swf"
                                    }
                                }
                            }
                        },
                        "buttonsPos": ["alert"]
                    },
                    "actionMenu": {
                        "id": "actionMenu",
                        "description": "Bottom menu",
                        "pos": 10,
                        "type": "actionMenu",
                        "areas": {
                            "left": {
                                "id": "left",
                                "description": "Bottom menu left",
                                "pos": 10,
                                "type": "actionMenu",
                                "buttons": {
                                    "print": {
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    },
                                    "create": {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    },
                                    "advanceSearchIcon": {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    },
                                    "cancel": {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    },
                                    "toolsCommontext": {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    },
                                    "actionButton": {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    },
                                    "viewsButton": {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    },
                                    "docImport": {
                                        "id": "docImport",
                                        "status": "A",
                                        "label": "Import documents",
                                        "icon": "ImportDocIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["print", "create", "advanceSearchIcon", "cancel", "toolsCommontext", "actionButton", "viewsButton", "docImport"]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu",
                                "buttons": {
                                    "eye": {
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    },
                                    "applicationHelp": {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    },
                                    "contextHelp": {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    }
                                },
                                "buttonsPos": ["eye", "applicationHelp", "contextHelp"]
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
  }    
})();
    