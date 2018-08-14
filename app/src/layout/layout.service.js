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

        var buttons = []
        buttonsJson.forEach(function(bJson) {
            buttons.push(getButton(bJson, parentPath));
        });

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
                        "buttons": [{
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": [{
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        ]
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
                                "type": "mainMenu.left",
                                "areas": {
                                    "screen": {
                                        "id": "screen",
                                        "description": "Screen",
                                        "pos": 12,
                                        "type": "screen",
                                        "areas": {
                                            "actionMenu": {
                                                "id": "actionMenu",
                                                "description": "Action",
                                                "pos": 13,
                                                "type": "actionMenu",
                                                "areas": {
                                                    "left": {
                                                        "id": "left",
                                                        "description": "Action",
                                                        "pos": 14,
                                                        "type": "actionMenu.left",
                                                        "buttons": [{
                                                                "id": "noEdis",
                                                                "status": "A",
                                                                "label": "Negative for all discriminators on this page",
                                                                "icon": "NoIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "print",
                                                                "status": "A",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            }, {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            }, {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        ]
                                                    },
                                                    "right": {
                                                        "id": "right",
                                                        "description": "Action",
                                                        "pos": 15,
                                                        "type": "actionMenu.right",
                                                        "buttons": [{
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "I",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "I",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "I",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "I",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "I",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                        ]
                                    }
                                },
                                "buttons": [{
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
                                    }, {
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
                                    }, {
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
                                    }, {
                                        "id": "barCode",
                                        "status": "A",
                                        "label": "Patient's barcode",
                                        "icon": "BarCodeIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.barCode"
                                        }
                                    }, {
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
                                    }, {
                                        "id": "responsabilityTransferEdis",
                                        "status": "A",
                                        "label": "Transfers",
                                        "icon": "ResponsibilityTransferIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis"
                                        }
                                    }, {
                                        "id": "pendingTasks",
                                        "status": "A",
                                        "label": "To-do list",
                                        "icon": "CheckListIcon",
                                        "action": {
                                            "targetArea": "inpatient.entry.mainMenu.left.pendingTasks"
                                        }
                                    }, {
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
                                    }, {
                                        "id": "alertTv",
                                        "status": "A",
                                        "label": "Corporate TV",
                                        "icon": "AlertTVIcon",
                                        "action": {}
                                    }, {
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
                                    }, {
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
                                    }
                                ]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": [{
                                "id": "tools",
                                "status": "A",
                                "label": "Settings ",
                                "icon": "ToolsIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": [{
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        ]
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
                                "areas": {
                                    "actionMenu": {
                                        "id": "actionMenu",
                                        "description": "Action",
                                        "pos": 13,
                                        "type": "actionMenu",
                                        "areas": {
                                            "left": {
                                                "id": "left",
                                                "description": "Action",
                                                "pos": 14,
                                                "type": "actionMenu.left",
                                                "buttons": [{
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "viewsButton",
                                                        "status": "I",
                                                        "label": "View modes",
                                                        "icon": "",
                                                        "action": {}
                                                    }
                                                ]
                                            },
                                            "right": {
                                                "id": "right",
                                                "description": "Action",
                                                "pos": 15,
                                                "type": "actionMenu.right",
                                                "buttons": [{
                                                        "id": "eye",
                                                        "status": "I",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "buttons": [{
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
                        ]
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
                                        "areas": {
                                            "actionMenu": {
                                                "id": "actionMenu",
                                                "description": "Action",
                                                "pos": 13,
                                                "type": "actionMenu",
                                                "areas": {
                                                    "left": {
                                                        "id": "left",
                                                        "description": "Action",
                                                        "pos": 14,
                                                        "type": "actionMenu.left",
                                                        "buttons": [{
                                                                "id": "print",
                                                                "status": "I",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "create",
                                                                "status": "A",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "cancel",
                                                                "status": "A",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "viewsButton",
                                                                "status": "A",
                                                                "label": "View modes",
                                                                "icon": "",
                                                                "action": {}
                                                            }, {
                                                                "id": "advanceSearch",
                                                                "status": "A",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "actionButton",
                                                                "status": "A",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            }
                                                        ]
                                                    },
                                                    "right": {
                                                        "id": "right",
                                                        "description": "Action",
                                                        "pos": 15,
                                                        "type": "actionMenu.right",
                                                        "buttons": [{
                                                                "id": "eye",
                                                                "status": "A",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "buttons": [{
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
                                    }, {
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
                                    }, {
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
                                    }, {
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
                                    }
                                ]
                            }
                        },
                        "buttons": [{
                                "id": "search",
                                "status": "A",
                                "label": "Patient search",
                                "icon": "SearchIcon",
                                "action": {
                                    "targetArea": "inpatient.entry.mainMenuRight.search"
                                }
                            }
                        ]
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
                                "type": "actionMenu.left",
                                "buttons": [{
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    }, {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    }, {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    }, {
                                        "id": "firstView",
                                        "status": "A",
                                        "label": "First view",
                                        "icon": "FirstVisionIcon",
                                        "action": {}
                                    }, {
                                        "id": "secondView",
                                        "status": "A",
                                        "label": "Second view",
                                        "icon": "SecondVisionIcon",
                                        "action": {}
                                    }, {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    }, {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    }, {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    }, {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    }
                                ]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu.right",
                                "buttons": [{
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    }, {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    }, {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    }, {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    }
                                ]
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
                        "buttons": [{
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": [{
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        ]
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
                                "type": "mainMenu.left",
                                "areas": {
                                    "screen": {
                                        "id": "screen",
                                        "description": "Screen",
                                        "pos": 12,
                                        "type": "screen",
                                        "areas": {
                                            "actionMenu": {
                                                "id": "actionMenu",
                                                "description": "Action",
                                                "pos": 13,
                                                "type": "actionMenu",
                                                "areas": {
                                                    "left": {
                                                        "id": "left",
                                                        "description": "Action",
                                                        "pos": 14,
                                                        "type": "actionMenu.left",
                                                        "buttons": [{
                                                                "id": "print",
                                                                "status": "I",
                                                                "label": "Print tool",
                                                                "icon": "PrintIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "create",
                                                                "status": "I",
                                                                "label": "Add or edit records",
                                                                "icon": "AddIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "cancel",
                                                                "status": "I",
                                                                "label": "Cancel records",
                                                                "icon": "CancelIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "advanceSearch",
                                                                "status": "I",
                                                                "label": "Advanced search",
                                                                "icon": "AdvancedSearchIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "actionButton",
                                                                "status": "I",
                                                                "label": "Actions",
                                                                "icon": "",
                                                                "action": {}
                                                            }, {
                                                                "id": "toolsCommonText",
                                                                "status": "I",
                                                                "label": "Predefined texts",
                                                                "icon": "CommonTextIcon",
                                                                "action": {}
                                                            }
                                                        ]
                                                    },
                                                    "right": {
                                                        "id": "right",
                                                        "description": "Action",
                                                        "pos": 15,
                                                        "type": "actionMenu.right",
                                                        "buttons": [{
                                                                "id": "eye",
                                                                "status": "I",
                                                                "label": "Record details",
                                                                "icon": "DetailsIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "applicationHelp",
                                                                "status": "A",
                                                                "label": "Help",
                                                                "icon": "HelpIcon",
                                                                "action": {}
                                                            }, {
                                                                "id": "globalShortcut",
                                                                "status": "A",
                                                                "label": "Shortcuts",
                                                                "icon": "GlobalShortcutIcon",
                                                                "action": {}
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "noEdis",
                                                                                "status": "I",
                                                                                "label": "Negative for all discriminators on this page",
                                                                                "icon": "NoIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "I",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
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
                                                                "areas": {
                                                                    "actionMenu": {
                                                                        "id": "actionMenu",
                                                                        "description": "Action",
                                                                        "pos": 13,
                                                                        "type": "actionMenu",
                                                                        "areas": {
                                                                            "left": {
                                                                                "id": "left",
                                                                                "description": "Action",
                                                                                "pos": 14,
                                                                                "type": "actionMenu.left",
                                                                                "buttons": [{
                                                                                        "id": "print",
                                                                                        "status": "A",
                                                                                        "label": "Print tool",
                                                                                        "icon": "PrintIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "create",
                                                                                        "status": "I",
                                                                                        "label": "Add or edit records",
                                                                                        "icon": "AddIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "cancel",
                                                                                        "status": "I",
                                                                                        "label": "Cancel records",
                                                                                        "icon": "CancelIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "advanceSearch",
                                                                                        "status": "I",
                                                                                        "label": "Advanced search",
                                                                                        "icon": "AdvancedSearchIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "actionButton",
                                                                                        "status": "I",
                                                                                        "label": "Actions",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "toolsCommonText",
                                                                                        "status": "I",
                                                                                        "label": "Predefined texts",
                                                                                        "icon": "CommonTextIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "id": "right",
                                                                                "description": "Action",
                                                                                "pos": 15,
                                                                                "type": "actionMenu.right",
                                                                                "buttons": [{
                                                                                        "id": "eye",
                                                                                        "status": "I",
                                                                                        "label": "Record details",
                                                                                        "icon": "DetailsIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "applicationHelp",
                                                                                        "status": "A",
                                                                                        "label": "Help",
                                                                                        "icon": "HelpIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "globalShortcut",
                                                                                        "status": "A",
                                                                                        "label": "Shortcuts",
                                                                                        "icon": "GlobalShortcutIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttons": [{
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                        ]
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
                                                                "areas": {
                                                                    "actionMenu": {
                                                                        "id": "actionMenu",
                                                                        "description": "Action",
                                                                        "pos": 13,
                                                                        "type": "actionMenu",
                                                                        "areas": {
                                                                            "left": {
                                                                                "id": "left",
                                                                                "description": "Action",
                                                                                "pos": 14,
                                                                                "type": "actionMenu.left",
                                                                                "buttons": [{
                                                                                        "id": "print",
                                                                                        "status": "A",
                                                                                        "label": "Print tool",
                                                                                        "icon": "PrintIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "create",
                                                                                        "status": "I",
                                                                                        "label": "Add or edit records",
                                                                                        "icon": "AddIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "cancel",
                                                                                        "status": "I",
                                                                                        "label": "Cancel records",
                                                                                        "icon": "CancelIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "advanceSearch",
                                                                                        "status": "I",
                                                                                        "label": "Advanced search",
                                                                                        "icon": "AdvancedSearchIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "actionButton",
                                                                                        "status": "I",
                                                                                        "label": "Actions",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "toolsCommonText",
                                                                                        "status": "I",
                                                                                        "label": "Predefined texts",
                                                                                        "icon": "CommonTextIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "id": "right",
                                                                                "description": "Action",
                                                                                "pos": 15,
                                                                                "type": "actionMenu.right",
                                                                                "buttons": [{
                                                                                        "id": "eye",
                                                                                        "status": "I",
                                                                                        "label": "Record details",
                                                                                        "icon": "DetailsIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "applicationHelp",
                                                                                        "status": "A",
                                                                                        "label": "Help",
                                                                                        "icon": "HelpIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "globalShortcut",
                                                                                        "status": "A",
                                                                                        "label": "Shortcuts",
                                                                                        "icon": "GlobalShortcutIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttons": [{
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }
                                                        ]
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
                                                        "id": "detailsOnPastIllnesses",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.detailsOnPastIllnesses"
                                                        }
                                                    }, {
                                                        "id": "dietProcess",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess"
                                                        }
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "I",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "I",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "I",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "I",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "infoButton",
                                                                                "status": "A",
                                                                                "label": "Infobutton",
                                                                                "icon": "InfoButtonIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
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
                                                                "areas": {
                                                                    "actionMenu": {
                                                                        "id": "actionMenu",
                                                                        "description": "Action",
                                                                        "pos": 13,
                                                                        "type": "actionMenu",
                                                                        "areas": {
                                                                            "left": {
                                                                                "id": "left",
                                                                                "description": "Action",
                                                                                "pos": 14,
                                                                                "type": "actionMenu.left",
                                                                                "buttons": [{
                                                                                        "id": "print",
                                                                                        "status": "A",
                                                                                        "label": "Print tool",
                                                                                        "icon": "PrintIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "create",
                                                                                        "status": "A",
                                                                                        "label": "Add or edit records",
                                                                                        "icon": "AddIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "cancel",
                                                                                        "status": "A",
                                                                                        "label": "Cancel records",
                                                                                        "icon": "CancelIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "viewsButton",
                                                                                        "status": "A",
                                                                                        "label": "View modes",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "advanceSearch",
                                                                                        "status": "A",
                                                                                        "label": "Advanced search",
                                                                                        "icon": "AdvancedSearchIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "actionButton",
                                                                                        "status": "A",
                                                                                        "label": "Actions",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "toolsCommonText",
                                                                                        "status": "A",
                                                                                        "label": "Predefined texts",
                                                                                        "icon": "CommonTextIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "id": "right",
                                                                                "description": "Action",
                                                                                "pos": 15,
                                                                                "type": "actionMenu.right",
                                                                                "buttons": [{
                                                                                        "id": "eye",
                                                                                        "status": "A",
                                                                                        "label": "Record details",
                                                                                        "icon": "DetailsIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "applicationHelp",
                                                                                        "status": "A",
                                                                                        "label": "Help",
                                                                                        "icon": "HelpIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "globalShortcut",
                                                                                        "status": "A",
                                                                                        "label": "Shortcuts",
                                                                                        "icon": "GlobalShortcutIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttons": [{
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
                                                            }, {
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
                                                        ]
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
                                                        "id": "rehab",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments.rehab"
                                                        }
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "infoButton",
                                                                                "status": "A",
                                                                                "label": "Infobutton",
                                                                                "icon": "InfoButtonIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
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
                                                                "areas": {
                                                                    "actionMenu": {
                                                                        "id": "actionMenu",
                                                                        "description": "Action",
                                                                        "pos": 13,
                                                                        "type": "actionMenu",
                                                                        "areas": {
                                                                            "left": {
                                                                                "id": "left",
                                                                                "description": "Action",
                                                                                "pos": 14,
                                                                                "type": "actionMenu.left",
                                                                                "buttons": [{
                                                                                        "id": "noEdis",
                                                                                        "status": "I",
                                                                                        "label": "Negative for all discriminators on this page",
                                                                                        "icon": "NoIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "print",
                                                                                        "status": "A",
                                                                                        "label": "Print tool",
                                                                                        "icon": "PrintIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "create",
                                                                                        "status": "A",
                                                                                        "label": "Add or edit records",
                                                                                        "icon": "AddIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "cancel",
                                                                                        "status": "A",
                                                                                        "label": "Cancel records",
                                                                                        "icon": "CancelIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "viewsButton",
                                                                                        "status": "I",
                                                                                        "label": "View modes",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "advanceSearch",
                                                                                        "status": "I",
                                                                                        "label": "Advanced search",
                                                                                        "icon": "AdvancedSearchIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "actionButton",
                                                                                        "status": "A",
                                                                                        "label": "Actions",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "toolsCommonText",
                                                                                        "status": "A",
                                                                                        "label": "Predefined texts",
                                                                                        "icon": "CommonTextIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "id": "right",
                                                                                "description": "Action",
                                                                                "pos": 15,
                                                                                "type": "actionMenu.right",
                                                                                "buttons": [{
                                                                                        "id": "eye",
                                                                                        "status": "A",
                                                                                        "label": "Record details",
                                                                                        "icon": "DetailsIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "applicationHelp",
                                                                                        "status": "A",
                                                                                        "label": "Help",
                                                                                        "icon": "HelpIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "globalShortcut",
                                                                                        "status": "A",
                                                                                        "label": "Shortcuts",
                                                                                        "icon": "GlobalShortcutIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttons": [{
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
                                                            }, {
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
                                                            }, {
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
                                                            }
                                                        ]
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
                                                                "areas": {
                                                                    "actionMenu": {
                                                                        "id": "actionMenu",
                                                                        "description": "Action",
                                                                        "pos": 13,
                                                                        "type": "actionMenu",
                                                                        "areas": {
                                                                            "left": {
                                                                                "id": "left",
                                                                                "description": "Action",
                                                                                "pos": 14,
                                                                                "type": "actionMenu.left",
                                                                                "buttons": [{
                                                                                        "id": "print",
                                                                                        "status": "A",
                                                                                        "label": "Print tool",
                                                                                        "icon": "PrintIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "create",
                                                                                        "status": "A",
                                                                                        "label": "Add or edit records",
                                                                                        "icon": "AddIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "cancel",
                                                                                        "status": "A",
                                                                                        "label": "Cancel records",
                                                                                        "icon": "CancelIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "viewsButton",
                                                                                        "status": "A",
                                                                                        "label": "View modes",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "advanceSearch",
                                                                                        "status": "I",
                                                                                        "label": "Advanced search",
                                                                                        "icon": "AdvancedSearchIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "actionButton",
                                                                                        "status": "A",
                                                                                        "label": "Actions",
                                                                                        "icon": "",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "toolsCommonText",
                                                                                        "status": "A",
                                                                                        "label": "Predefined texts",
                                                                                        "icon": "CommonTextIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "id": "right",
                                                                                "description": "Action",
                                                                                "pos": 15,
                                                                                "type": "actionMenu.right",
                                                                                "buttons": [{
                                                                                        "id": "eye",
                                                                                        "status": "A",
                                                                                        "label": "Record details",
                                                                                        "icon": "DetailsIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "applicationHelp",
                                                                                        "status": "A",
                                                                                        "label": "Help",
                                                                                        "icon": "HelpIcon",
                                                                                        "action": {}
                                                                                    }, {
                                                                                        "id": "globalShortcut",
                                                                                        "status": "A",
                                                                                        "label": "Shortcuts",
                                                                                        "icon": "GlobalShortcutIcon",
                                                                                        "action": {}
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "buttons": [{
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }, {
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
                                                            }
                                                        ]
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
                                                        "id": "assessToolsGroup",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup"
                                                        }
                                                    }, {
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
                                                    }, {
                                                        "id": "avaliacaoInfantil",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil"
                                                        }
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "I",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "I",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "I",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "I",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
                                                "id": "visits",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.visits"
                                                }
                                            }, {
                                                "id": "planning",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.planning"
                                                }
                                            }, {
                                                "id": "testAndTreatments",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments"
                                                }
                                            }, {
                                                "id": "history",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.history"
                                                }
                                            }, {
                                                "id": "nursing",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing"
                                                }
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "infoButton",
                                                                        "status": "A",
                                                                        "label": "Infobutton",
                                                                        "icon": "InfoButtonIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "I",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "noEdis",
                                                                                "status": "I",
                                                                                "label": "Negative for all discriminators on this page",
                                                                                "icon": "NoIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "I",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "progressNotes",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes"
                                                }
                                            }, {
                                                "id": "assessToolsGroup",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup"
                                                }
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "A",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "A",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "infoButton",
                                                                        "status": "A",
                                                                        "label": "Infobutton",
                                                                        "icon": "InfoButtonIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "infoButton",
                                                                                "status": "A",
                                                                                "label": "Infobutton",
                                                                                "icon": "InfoButtonIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "infoButton",
                                                                                "status": "A",
                                                                                "label": "Infobutton",
                                                                                "icon": "InfoButtonIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
                                                        "id": "prescription",
                                                        "status": "A",
                                                        "label": "",
                                                        "icon": "",
                                                        "action": {
                                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.prescription.screen",
                                                            "component": {
                                                                "type": "SWF",
                                                                "id": "PrescViewAdminAndTasks.swf"
                                                            }
                                                        }
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "infoButton",
                                                                                "status": "A",
                                                                                "label": "Infobutton",
                                                                                "icon": "InfoButtonIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }
                                                ]
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "planningGroup",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup"
                                                }
                                            }, {
                                                "id": "depnvAnalisys",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys"
                                                }
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "physicalTherapy",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.physicalTherapy"
                                                }
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "pEnsinosenfermagem",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.orderEntry.pEnsinosenfermagem"
                                                }
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "A",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "A",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "A",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "I",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "infoButton",
                                                                        "status": "A",
                                                                        "label": "Infobutton",
                                                                        "icon": "InfoButtonIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                    }, {
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
                                                    }, {
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
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "futureEvents",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents"
                                                }
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "A",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "A",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "A",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "A",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "viewsButton",
                                                                                "status": "A",
                                                                                "label": "View modes",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "I",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "I",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "I",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "pendingIssue",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.patient.mainMenu.left.patientManagement.pendingIssue"
                                                }
                                            }
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "A",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "A",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "A",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "A",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                        ]
                                    }
                                },
                                "buttons": [{
                                        "id": "ehr",
                                        "status": "A",
                                        "label": "Electronic health record",
                                        "icon": "PreviousEpisodesIcon_3",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.ehr"
                                        }
                                    }, {
                                        "id": "clinicalInfoIcon",
                                        "status": "A",
                                        "label": "Documentation",
                                        "icon": "ClinicalInfoIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon"
                                        }
                                    }, {
                                        "id": "coding",
                                        "status": "A",
                                        "label": "Coding",
                                        "icon": "CodingIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.coding"
                                        }
                                    }, {
                                        "id": "discharge",
                                        "status": "A",
                                        "label": "Discharge",
                                        "icon": "DischargeIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.discharge"
                                        }
                                    }, {
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
                                    }, {
                                        "id": "patientManagement",
                                        "status": "A",
                                        "label": "Patient management",
                                        "icon": "PatientManagementIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.patientManagement"
                                        }
                                    }, {
                                        "id": "pregnancyButton",
                                        "status": "A",
                                        "label": "Pregnancy record",
                                        "icon": "PregnancyIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.pregnancyButton"
                                        }
                                    }, {
                                        "id": "pdms",
                                        "status": "A",
                                        "label": "Patient Data Management System",
                                        "icon": "PDMSIcon",
                                        "action": {}
                                    }, {
                                        "id": "orderEntry",
                                        "status": "A",
                                        "label": "Orders",
                                        "icon": "OrderEntryIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry"
                                        }
                                    }, {
                                        "id": "checklistFrontoffice",
                                        "status": "A",
                                        "label": "Checklists",
                                        "icon": "ChecklistBackofficeIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.checklistFrontoffice"
                                        }
                                    }, {
                                        "id": "nurse",
                                        "status": "A",
                                        "label": "Nursing process",
                                        "icon": "NurseIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.nurse"
                                        }
                                    }, {
                                        "id": "patientid",
                                        "status": "A",
                                        "label": "Patient identification",
                                        "icon": "PatientIDNewIcon",
                                        "action": {
                                            "targetArea": "inpatient.patient.mainMenu.left.patientid"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": [{
                                "id": "reset",
                                "status": "A",
                                "label": "Go back to patient area",
                                "icon": "RestartIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": [{
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        ]
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
                                "areas": {
                                    "actionMenu": {
                                        "id": "actionMenu",
                                        "description": "Action",
                                        "pos": 13,
                                        "type": "actionMenu",
                                        "areas": {
                                            "left": {
                                                "id": "left",
                                                "description": "Action",
                                                "pos": 14,
                                                "type": "actionMenu.left",
                                                "buttons": [{
                                                        "id": "print",
                                                        "status": "I",
                                                        "label": "Print tool",
                                                        "icon": "PrintIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "create",
                                                        "status": "I",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "actionButton",
                                                        "status": "I",
                                                        "label": "Actions",
                                                        "icon": "",
                                                        "action": {}
                                                    }, {
                                                        "id": "toolsCommonText",
                                                        "status": "I",
                                                        "label": "Predefined texts",
                                                        "icon": "CommonTextIcon",
                                                        "action": {}
                                                    }
                                                ]
                                            },
                                            "right": {
                                                "id": "right",
                                                "description": "Action",
                                                "pos": 15,
                                                "type": "actionMenu.right",
                                                "buttons": [{
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "buttons": [{
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
                        ]
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
                                "type": "actionMenu.left",
                                "buttons": [{
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    }, {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    }, {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    }, {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    }, {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    }, {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    }, {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    }, {
                                        "id": "firstView",
                                        "status": "A",
                                        "label": "First view",
                                        "icon": "FirstVisionIcon",
                                        "action": {}
                                    }, {
                                        "id": "barListEdis",
                                        "status": "A",
                                        "label": "List view",
                                        "icon": "ListIcon",
                                        "action": {}
                                    }, {
                                        "id": "secondView",
                                        "status": "A",
                                        "label": "Second view",
                                        "icon": "SecondVisionIcon",
                                        "action": {}
                                    }, {
                                        "id": "chartLinesEdis",
                                        "status": "A",
                                        "label": "Graphic view",
                                        "icon": "ChartsLinesIcon",
                                        "action": {}
                                    }, {
                                        "id": "docImport",
                                        "status": "A",
                                        "label": "Import documents",
                                        "icon": "ImportDocIcon",
                                        "action": {}
                                    }
                                ]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu.right",
                                "buttons": [{
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    }, {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    }, {
                                        "id": "infoButton",
                                        "status": "A",
                                        "label": "Infobutton",
                                        "icon": "InfoButtonIcon",
                                        "action": {}
                                    }, {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    }, {
                                        "id": "globalShortcut",
                                        "status": "A",
                                        "label": "Shortcuts",
                                        "icon": "GlobalShortcutIcon",
                                        "action": {}
                                    }
                                ]
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
                        "buttons": [{
                                "id": "logout",
                                "status": "A",
                                "label": "Exit application",
                                "icon": "ExitIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuLeft": {
                        "id": "actionMenuLeft",
                        "description": "Back button area",
                        "pos": 2,
                        "type": "actionMenuLeft",
                        "buttons": [{
                                "id": "back",
                                "status": "A",
                                "label": "Go back",
                                "icon": "BackIcon",
                                "action": {}
                            }
                        ]
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
                                "type": "mainMenu.left",
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "noEdis",
                                                                        "status": "I",
                                                                        "label": "Negative for all discriminators on this page",
                                                                        "icon": "NoIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "print",
                                                                        "status": "I",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "I",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "I",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "I",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                        ]
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
                                                "areas": {
                                                    "actionMenu": {
                                                        "id": "actionMenu",
                                                        "description": "Action",
                                                        "pos": 13,
                                                        "type": "actionMenu",
                                                        "areas": {
                                                            "left": {
                                                                "id": "left",
                                                                "description": "Action",
                                                                "pos": 14,
                                                                "type": "actionMenu.left",
                                                                "buttons": [{
                                                                        "id": "print",
                                                                        "status": "I",
                                                                        "label": "Print tool",
                                                                        "icon": "PrintIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "create",
                                                                        "status": "A",
                                                                        "label": "Add or edit records",
                                                                        "icon": "AddIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "cancel",
                                                                        "status": "A",
                                                                        "label": "Cancel records",
                                                                        "icon": "CancelIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "viewsButton",
                                                                        "status": "I",
                                                                        "label": "View modes",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "advanceSearch",
                                                                        "status": "I",
                                                                        "label": "Advanced search",
                                                                        "icon": "AdvancedSearchIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "actionButton",
                                                                        "status": "I",
                                                                        "label": "Actions",
                                                                        "icon": "",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "toolsCommonText",
                                                                        "status": "I",
                                                                        "label": "Predefined texts",
                                                                        "icon": "CommonTextIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "id": "right",
                                                                "description": "Action",
                                                                "pos": 15,
                                                                "type": "actionMenu.right",
                                                                "buttons": [{
                                                                        "id": "eye",
                                                                        "status": "A",
                                                                        "label": "Record details",
                                                                        "icon": "DetailsIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "applicationHelp",
                                                                        "status": "A",
                                                                        "label": "Help",
                                                                        "icon": "HelpIcon",
                                                                        "action": {}
                                                                    }, {
                                                                        "id": "globalShortcut",
                                                                        "status": "A",
                                                                        "label": "Shortcuts",
                                                                        "icon": "GlobalShortcutIcon",
                                                                        "action": {}
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
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
                                                        "areas": {
                                                            "actionMenu": {
                                                                "id": "actionMenu",
                                                                "description": "Action",
                                                                "pos": 13,
                                                                "type": "actionMenu",
                                                                "areas": {
                                                                    "left": {
                                                                        "id": "left",
                                                                        "description": "Action",
                                                                        "pos": 14,
                                                                        "type": "actionMenu.left",
                                                                        "buttons": [{
                                                                                "id": "print",
                                                                                "status": "I",
                                                                                "label": "Print tool",
                                                                                "icon": "PrintIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "create",
                                                                                "status": "A",
                                                                                "label": "Add or edit records",
                                                                                "icon": "AddIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "cancel",
                                                                                "status": "A",
                                                                                "label": "Cancel records",
                                                                                "icon": "CancelIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "advanceSearch",
                                                                                "status": "A",
                                                                                "label": "Advanced search",
                                                                                "icon": "AdvancedSearchIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "actionButton",
                                                                                "status": "A",
                                                                                "label": "Actions",
                                                                                "icon": "",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "toolsCommonText",
                                                                                "status": "A",
                                                                                "label": "Predefined texts",
                                                                                "icon": "CommonTextIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    },
                                                                    "right": {
                                                                        "id": "right",
                                                                        "description": "Action",
                                                                        "pos": 15,
                                                                        "type": "actionMenu.right",
                                                                        "buttons": [{
                                                                                "id": "eye",
                                                                                "status": "A",
                                                                                "label": "Record details",
                                                                                "icon": "DetailsIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "applicationHelp",
                                                                                "status": "A",
                                                                                "label": "Help",
                                                                                "icon": "HelpIcon",
                                                                                "action": {}
                                                                            }, {
                                                                                "id": "globalShortcut",
                                                                                "status": "A",
                                                                                "label": "Shortcuts",
                                                                                "icon": "GlobalShortcutIcon",
                                                                                "action": {}
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "buttons": [{
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
                                                    }, {
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
                                                ]
                                            }
                                        },
                                        "buttons": [{
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
                                            }, {
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
                                            }, {
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
                                            }, {
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
                                            }, {
                                                "id": "orderSetsTools",
                                                "status": "A",
                                                "label": "",
                                                "icon": "",
                                                "action": {
                                                    "targetArea": "inpatient.tools.mainMenu.left.commontext.orderSetsTools"
                                                }
                                            }, {
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
                                            }
                                        ]
                                    }
                                },
                                "buttons": [{
                                        "id": "commontext",
                                        "status": "A",
                                        "label": "Content management",
                                        "icon": "ContentManagmentIcon",
                                        "action": {
                                            "targetArea": "inpatient.tools.mainMenu.left.commontext"
                                        }
                                    }, {
                                        "id": "pdms",
                                        "status": "A",
                                        "label": "Patient Data Management System",
                                        "icon": "PDMSIcon",
                                        "action": {}
                                    }, {
                                        "id": "toolsLang",
                                        "status": "A",
                                        "label": "User configurations",
                                        "icon": "PreferencesIcon",
                                        "action": {
                                            "targetArea": "inpatient.tools.mainMenu.left.toolsLang"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "headerLeft": {
                        "id": "headerLeft",
                        "description": "Personal settings area",
                        "pos": 6,
                        "type": "headerLeft",
                        "buttons": [{
                                "id": "reset",
                                "status": "A",
                                "label": "Go back to patient area",
                                "icon": "RestartIcon",
                                "action": {}
                            }
                        ]
                    },
                    "actionMenuRight": {
                        "id": "actionMenuRight",
                        "description": "Ok area",
                        "pos": 7,
                        "type": "actionMenuRight",
                        "buttons": [{
                                "id": "ok",
                                "status": "A",
                                "label": "Confirm/proceed",
                                "icon": "OKIcon",
                                "action": {}
                            }
                        ]
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
                                "areas": {
                                    "actionMenu": {
                                        "id": "actionMenu",
                                        "description": "Action",
                                        "pos": 13,
                                        "type": "actionMenu",
                                        "areas": {
                                            "left": {
                                                "id": "left",
                                                "description": "Action",
                                                "pos": 14,
                                                "type": "actionMenu.left",
                                                "buttons": [{
                                                        "id": "create",
                                                        "status": "A",
                                                        "label": "Add or edit records",
                                                        "icon": "AddIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "cancel",
                                                        "status": "I",
                                                        "label": "Cancel records",
                                                        "icon": "CancelIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "advanceSearch",
                                                        "status": "I",
                                                        "label": "Advanced search",
                                                        "icon": "AdvancedSearchIcon",
                                                        "action": {}
                                                    }
                                                ]
                                            },
                                            "right": {
                                                "id": "right",
                                                "description": "Action",
                                                "pos": 15,
                                                "type": "actionMenu.right",
                                                "buttons": [{
                                                        "id": "eye",
                                                        "status": "A",
                                                        "label": "Record details",
                                                        "icon": "DetailsIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "applicationHelp",
                                                        "status": "A",
                                                        "label": "Help",
                                                        "icon": "HelpIcon",
                                                        "action": {}
                                                    }, {
                                                        "id": "globalShortcut",
                                                        "status": "A",
                                                        "label": "Shortcuts",
                                                        "icon": "GlobalShortcutIcon",
                                                        "action": {}
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "buttons": [{
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
                        ]
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
                                "type": "actionMenu.left",
                                "buttons": [{
                                        "id": "print",
                                        "status": "A",
                                        "label": "Print",
                                        "icon": "PrintIcon",
                                        "action": {}
                                    }, {
                                        "id": "create",
                                        "status": "A",
                                        "label": "Add",
                                        "icon": "AddIcon",
                                        "action": {}
                                    }, {
                                        "id": "advanceSearchIcon",
                                        "status": "A",
                                        "label": "Advanced search",
                                        "icon": "AdvancedSearchIcon",
                                        "action": {}
                                    }, {
                                        "id": "cancel",
                                        "status": "A",
                                        "label": "Cancel",
                                        "icon": "CancelIcon",
                                        "action": {}
                                    }, {
                                        "id": "toolsCommontext",
                                        "status": "A",
                                        "label": "Most frequent texts",
                                        "icon": "CommonTextIcon",
                                        "action": {}
                                    }, {
                                        "id": "actionButton",
                                        "status": "A",
                                        "label": "Actions",
                                        "icon": "ActionsIcon",
                                        "action": {}
                                    }, {
                                        "id": "viewsButton",
                                        "status": "A",
                                        "label": "Views",
                                        "icon": "ViewsIcon",
                                        "action": {}
                                    }, {
                                        "id": "docImport",
                                        "status": "A",
                                        "label": "Import documents",
                                        "icon": "ImportDocIcon",
                                        "action": {}
                                    }
                                ]
                            },
                            "right": {
                                "id": "right",
                                "description": "Bottom menu right",
                                "pos": 11,
                                "type": "actionMenu.right",
                                "buttons": [{
                                        "id": "eye",
                                        "status": "A",
                                        "label": "Details",
                                        "icon": "DetailsIcon",
                                        "action": {}
                                    }, {
                                        "id": "applicationHelp",
                                        "status": "A",
                                        "label": "Functionality help",
                                        "icon": "HelpIcon",
                                        "action": {}
                                    }, {
                                        "id": "contextHelp",
                                        "status": "A",
                                        "label": "Clinical context help",
                                        "icon": "ContentIcon",
                                        "action": {}
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  }    
})();
    