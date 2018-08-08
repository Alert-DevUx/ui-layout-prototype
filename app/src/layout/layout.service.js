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

        var button = new Button(buttonJson.id, buttonJson.label, buttonJson.icon, getAction(buttonJson.action), buttonJson.areaId);

        // Set button path
        button.path = parentPath.toString();

        return button;
    }    

    function getAction(actionJson) {

      // Build component
      if((actionJson.component && actionJson.component.type && actionJson.component.id)) {
        var component = new Component(actionJson.component.type, actionJson.component.id)
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
                      "type": "screen for undefined"
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
                          "type": "screen for barCode"
                        }
                      },
                      "buttons": {
                        "technicianWorkBarcode": {
                          "id": "technicianWorkBarcode",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
                        }
                      },
                      "buttons": {
                        "serviceTransfer": {
                          "id": "serviceTransfer",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ServiceTransferList.swf"
                            }
                          }
                        },
                        "myPatientesHandOfEdis": {
                          "id": "myPatientesHandOfEdis",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "HandOffMyPatientsList.swf"
                            }
                          }
                        },
                        "transferInstitution": {
                          "id": "transferInstitution",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "InstitutionTransferList.swf"
                            }
                          }
                        },
                        "requestHandOfEdis": {
                          "id": "requestHandOfEdis",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for pendingTasks"
                        }
                      },
                      "buttons": {
                        "todoList": {
                          "id": "todoList",
                          "label": "",
                          "icon": "",
                          "action": {
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
                      "label": "My patients",
                      "icon": "MyPatientsIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPGridMyPatients.swf"
                        }
                      }
                    },
                    "bmngGridDashboardServices": {
                      "id": "bmngGridDashboardServices",
                      "label": "Bed management",
                      "icon": "BedManagementIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "BedManagementDashboard.swf"
                        }
                      }
                    },
                    "allPatientDoctor": {
                      "id": "allPatientDoctor",
                      "label": "All patients",
                      "icon": "AllPatientsIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPGridAllPatients.swf"
                        }
                      }
                    },
                    "gridScheduledInpatients": {
                      "id": "gridScheduledInpatients",
                      "label": "Scheduled admissions",
                      "icon": "ScheduledIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPScheduledEpisodes.swf"
                        }
                      }
                    },
                    "birsEyeIcon": {
                      "id": "birsEyeIcon",
                      "label": "Patient location",
                      "icon": "BirdsEyeIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPBirdsEyeView.swf"
                        }
                      }
                    },
                    "barCode": {
                      "id": "barCode",
                      "label": "Patient's barcode",
                      "icon": "BarCodeIcon",
                      "action": {
                        "targetArea": "inpatient.entry.mainMenu.left.barCode"
                      }
                    },
                    "agenda": {
                      "id": "agenda",
                      "label": "Scheduler",
                      "icon": "ScheduledNewIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "CalendarMonthOverview.swf"
                        }
                      }
                    },
                    "responsabilityTransferEdis": {
                      "id": "responsabilityTransferEdis",
                      "label": "Transfers",
                      "icon": "ResponsibilityTransferIcon",
                      "action": {
                        "targetArea": "inpatient.entry.mainMenu.left.responsabilityTransferEdis"
                      }
                    },
                    "pendingTasks": {
                      "id": "pendingTasks",
                      "label": "To-do list",
                      "icon": "CheckListIcon",
                      "action": {
                        "targetArea": "inpatient.entry.mainMenu.left.pendingTasks"
                      }
                    },
                    "coding": {
                      "id": "coding",
                      "label": "Coding",
                      "icon": "CodingIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "CpMyProcessesGW.swf"
                        }
                      }
                    },
                    "alertTv": {
                      "id": "alertTv",
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
                  "type": "screen for mainMenuLeft"
                }
              },
              "buttons": {
                "alert": {
                  "id": "alert",
                  "label": "Alert messages",
                  "icon": "AlertIcon",
                  "action": {
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
                      "type": "screen for undefined"
                    }
                  },
                  "buttons": {
                    "allPatients": {
                      "id": "allPatients",
                      "label": "",
                      "icon": "",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "AdtSearchAllPatients.swf"
                        }
                      }
                    },
                    "depnvSearchActiveInp": {
                      "id": "depnvSearchActiveInp",
                      "label": "",
                      "icon": "",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPEpisodeSearchActive.swf"
                        }
                      }
                    },
                    "depnvSearchInactiveInp": {
                      "id": "depnvSearchInactiveInp",
                      "label": "",
                      "icon": "",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "INPEpisodeSearchInactive.swf"
                        }
                      }
                    },
                    "depnvSearchCancelled": {
                      "id": "depnvSearchCancelled",
                      "label": "",
                      "icon": "",
                      "action": {
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
                      "label": "Print",
                      "icon": "PrintIcon",
                      "action": {}
                    },
                    "create": {
                      "id": "create",
                      "label": "Add",
                      "icon": "AddIcon",
                      "action": {}
                    },
                    "cancel": {
                      "id": "cancel",
                      "label": "Cancel",
                      "icon": "CancelIcon",
                      "action": {}
                    },
                    "firstView": {
                      "id": "firstView",
                      "label": "First view",
                      "icon": "FirstVisionIcon",
                      "action": {}
                    },
                    "secondView": {
                      "id": "secondView",
                      "label": "Second view",
                      "icon": "SecondVisionIcon",
                      "action": {}
                    },
                    "viewsButton": {
                      "id": "viewsButton",
                      "label": "Views",
                      "icon": "ViewsIcon",
                      "action": {}
                    },
                    "advanceSearchIcon": {
                      "id": "advanceSearchIcon",
                      "label": "Advanced search",
                      "icon": "AdvancedSearchIcon",
                      "action": {}
                    },
                    "actionButton": {
                      "id": "actionButton",
                      "label": "Actions",
                      "icon": "ActionsIcon",
                      "action": {}
                    },
                    "toolsCommontext": {
                      "id": "toolsCommontext",
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
                      "label": "Details",
                      "icon": "DetailsIcon",
                      "action": {}
                    },
                    "contextHelp": {
                      "id": "contextHelp",
                      "label": "Clinical context help",
                      "icon": "ContentIcon",
                      "action": {}
                    },
                    "applicationHelp": {
                      "id": "applicationHelp",
                      "label": "Functionality help",
                      "icon": "HelpIcon",
                      "action": {}
                    },
                    "globalShortcut": {
                      "id": "globalShortcut",
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
                      "type": "screen for undefined"
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
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
                                  "type": "screen for undefined"
                                }
                              },
                              "buttons": {
                                "nutritionSummary": {
                                  "id": "nutritionSummary",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRDIASummary.swf"
                                    }
                                  }
                                },
                                "dietaryProgressNotes": {
                                  "id": "dietaryProgressNotes",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRDPNSummary.swf"
                                    }
                                  }
                                },
                                "nutriPrevIntervention": {
                                  "id": "nutriPrevIntervention",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRNutritionistIntervPlanList.swf"
                                    }
                                  }
                                },
                                "nutriReport": {
                                  "id": "nutriReport",
                                  "label": "",
                                  "icon": "",
                                  "action": {
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
                                  "type": "screen for undefined"
                                }
                              },
                              "buttons": {
                                "reasonForVisits": {
                                  "id": "reasonForVisits",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "ReasonsForVisits.swf"
                                    }
                                  }
                                },
                                "historyOfPastIllnesses": {
                                  "id": "historyOfPastIllnesses",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "HistoryOfPastIllnesses.swf"
                                    }
                                  }
                                },
                                "hp": {
                                  "id": "hp",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRHPSummary.swf"
                                    }
                                  }
                                },
                                "physicianProgressNotes": {
                                  "id": "physicianProgressNotes",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRPNSummary.swf"
                                    }
                                  }
                                },
                                "reviewsOfSystems": {
                                  "id": "reviewsOfSystems",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "ReviewsOfSystems.swf"
                                    }
                                  }
                                },
                                "physicalExams": {
                                  "id": "physicalExams",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "PhysicalExams.swf"
                                    }
                                  }
                                },
                                "bodyDiagrams": {
                                  "id": "bodyDiagrams",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRBodyDiagrams.swf"
                                    }
                                  }
                                },
                                "plans": {
                                  "id": "plans",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "IndividualEncounterPlans.swf"
                                    }
                                  }
                                },
                                "ehrDeepnavDispositionRecDoente": {
                                  "id": "ehrDeepnavDispositionRecDoente",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "DispositionInstructions.swf"
                                    }
                                  }
                                },
                                "recordsReview": {
                                  "id": "recordsReview",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "RecordsReviewList.swf"
                                    }
                                  }
                                },
                                "ehrDischargeSummaryVisitNote": {
                                  "id": "ehrDischargeSummaryVisitNote",
                                  "label": "",
                                  "icon": "",
                                  "action": {
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
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PreviousEpisSummaryPage.swf"
                                }
                              }
                            },
                            "ehrTimeline": {
                              "id": "ehrTimeline",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRepisodes.swf"
                                }
                              }
                            },
                            "plannedVisits": {
                              "id": "plannedVisits",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PlannedVisits.swf"
                                }
                              }
                            },
                            "otherEvents": {
                              "id": "otherEvents",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "OtherEvents.swf"
                                }
                              }
                            },
                            "socialSummary": {
                              "id": "socialSummary",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "SocialEHRSummary.swf"
                                }
                              }
                            },
                            "dietProcess": {
                              "id": "dietProcess",
                              "label": "",
                              "icon": "",
                              "action": {
                                "targetArea": "inpatient.patient.mainMenu.left.ehr.visits.dietProcess"
                              }
                            },
                            "activityTherapy": {
                              "id": "activityTherapy",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "ActivityTherapyEHRSummary.swf"
                                }
                              }
                            },
                            "evaluationmfr": {
                              "id": "evaluationmfr",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "MFREvaluationSummary.swf"
                                }
                              }
                            },
                            "intervalNotes": {
                              "id": "intervalNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "RPNSummary.swf"
                                }
                              }
                            },
                            "detailsOnPastIllnesses": {
                              "id": "detailsOnPastIllnesses",
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "carePlans": {
                              "id": "carePlans",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRCarePlansList.swf"
                                }
                              }
                            },
                            "individualEncounterPlans": {
                              "id": "individualEncounterPlans",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "IndividualEncounterPlans.swf"
                                }
                              }
                            },
                            "guideline": {
                              "id": "guideline",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRGuidelinesSummary.swf"
                                }
                              }
                            },
                            "protocol": {
                              "id": "protocol",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRProtocolSummary.swf"
                                }
                              }
                            },
                            "plannedSurgeries": {
                              "id": "plannedSurgeries",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRSurgEpisodesLoader.swf"
                                }
                              }
                            },
                            "referrals": {
                              "id": "referrals",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
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
                                  "type": "screen for undefined"
                                }
                              },
                              "buttons": {
                                "proceduresMfr": {
                                  "id": "proceduresMfr",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "RehabTreatmentsAllList.swf"
                                    }
                                  }
                                },
                                "rehabPlan": {
                                  "id": "rehabPlan",
                                  "label": "",
                                  "icon": "",
                                  "action": {
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
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRLabs.swf"
                                }
                              }
                            },
                            "depnvImages": {
                              "id": "depnvImages",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRImages.swf"
                                }
                              }
                            },
                            "depnvOtherExams": {
                              "id": "depnvOtherExams",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHROtherExams.swf"
                                }
                              }
                            },
                            "prescription": {
                              "id": "prescription",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PrescViewPrescribedMedication.swf"
                                }
                              }
                            },
                            "pEnsinosenfermagem": {
                              "id": "pEnsinosenfermagem",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PatientEducationAllList.swf"
                                }
                              }
                            },
                            "pProcedures": {
                              "id": "pProcedures",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "ProceduresTimeline.swf"
                                }
                              }
                            },
                            "ehrLensPresc": {
                              "id": "ehrLensPresc",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRLensPrescriptionList.swf"
                                }
                              }
                            },
                            "rehab": {
                              "id": "rehab",
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
                              "type": "screen for undefined"
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
                                  "type": "screen for undefined"
                                }
                              },
                              "buttons": {
                                "factoresRisco": {
                                  "id": "factoresRisco",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRRiskFactorsSummary.swf"
                                    }
                                  }
                                },
                                "depnvFuncEval": {
                                  "id": "depnvFuncEval",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "EHRPhysicalExamEvaluationSummary.swf"
                                    }
                                  }
                                },
                                "scores": {
                                  "id": "scores",
                                  "label": "",
                                  "icon": "",
                                  "action": {
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
                                  "type": "screen for undefined"
                                }
                              },
                              "buttons": {
                                "pediatricAssessment": {
                                  "id": "pediatricAssessment",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "PediatricAssessmentSummary.swf"
                                    }
                                  }
                                },
                                "genPediatricAssessment": {
                                  "id": "genPediatricAssessment",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "GeneralPediatricAssessment.swf"
                                    }
                                  }
                                },
                                "developmentMilestones": {
                                  "id": "developmentMilestones",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "DevelopmentMilestonesGrid.swf"
                                    }
                                  }
                                },
                                "assessmentDevelopment": {
                                  "id": "assessmentDevelopment",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "AssessmentOfDevelopment.swf"
                                    }
                                  }
                                },
                                "pediatricNutrition": {
                                  "id": "pediatricNutrition",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "PediatricNutritionGrid.swf"
                                    }
                                  }
                                },
                                "pediatricNutritionAssess": {
                                  "id": "pediatricNutritionAssess",
                                  "label": "",
                                  "icon": "",
                                  "action": {
                                    "component": {
                                      "type": "SWF",
                                      "id": "PediatricNutritionAssessment.swf"
                                    }
                                  }
                                },
                                "rendimentoEscolar": {
                                  "id": "rendimentoEscolar",
                                  "label": "",
                                  "icon": "",
                                  "action": {
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
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRProblemList.swf"
                                }
                              }
                            },
                            "ehrDeepnavPrevDiagnosis": {
                              "id": "ehrDeepnavPrevDiagnosis",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "Diagnosis.swf"
                                }
                              }
                            },
                            "historicohospitalarAlergias": {
                              "id": "historicohospitalarAlergias",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRAllergyList.swf"
                                }
                              }
                            },
                            "depnvHabitos": {
                              "id": "depnvHabitos",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRPatientHabits.swf"
                                }
                              }
                            },
                            "antecedentes": {
                              "id": "antecedentes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRPastHistorySummary.swf"
                                }
                              }
                            },
                            "identificationIdentification": {
                              "id": "identificationIdentification",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PatientAttributes.swf"
                                }
                              }
                            },
                            "familyRelationships": {
                              "id": "familyRelationships",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "GridFamily.swf"
                                }
                              }
                            },
                            "assessToolsGroup": {
                              "id": "assessToolsGroup",
                              "label": "",
                              "icon": "",
                              "action": {
                                "targetArea": "inpatient.patient.mainMenu.left.ehr.history.assessToolsGroup"
                              }
                            },
                            "ehrDepnvVitalSign": {
                              "id": "ehrDepnvVitalSign",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRVitalSigns.swf"
                                }
                              }
                            },
                            "biometric": {
                              "id": "biometric",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "BiometricRead.swf"
                                }
                              }
                            },
                            "pregnancyList": {
                              "id": "pregnancyList",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRWomanHealthPregnanciesSummary.swf"
                                }
                              }
                            },
                            "avaliacaoInfantil": {
                              "id": "avaliacaoInfantil",
                              "label": "",
                              "icon": "",
                              "action": {
                                "targetArea": "inpatient.patient.mainMenu.left.ehr.history.avaliacaoInfantil"
                              }
                            },
                            "vacinacao": {
                              "id": "vacinacao",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "nursingInitialAssessment": {
                              "id": "nursingInitialAssessment",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRNIASummary.swf"
                                }
                              }
                            },
                            "nursingProgressNotes": {
                              "id": "nursingProgressNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EHRNPNSummary.swf"
                                }
                              }
                            },
                            "nurseNotesSr": {
                              "id": "nurseNotesSr",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "NursingNotes.swf"
                                }
                              }
                            },
                            "depnvNursingCarePlan": {
                              "id": "depnvNursingCarePlan",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DashBoardLoader.swf"
                            }
                          }
                        },
                        "visits": {
                          "id": "visits",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.ehr.visits"
                          }
                        },
                        "planning": {
                          "id": "planning",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.ehr.planning"
                          }
                        },
                        "testAndTreatments": {
                          "id": "testAndTreatments",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.ehr.testAndTreatments"
                          }
                        },
                        "history": {
                          "id": "history",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.ehr.history"
                          }
                        },
                        "historicohospitalarGruposang": {
                          "id": "historicohospitalarGruposang",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "BloodList.swf"
                            }
                          }
                        },
                        "nursing": {
                          "id": "nursing",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.ehr.nursing"
                          }
                        },
                        "trials": {
                          "id": "trials",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "TrialsList.swf"
                            }
                          }
                        },
                        "mediaArchive": {
                          "id": "mediaArchive",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "physicianProgressNotes": {
                              "id": "physicianProgressNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "INPPNSummary.swf"
                                }
                              }
                            },
                            "depnvPareceres": {
                              "id": "depnvPareceres",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "OpinionList.swf"
                                }
                              }
                            },
                            "nursingProgressNotes": {
                              "id": "nursingProgressNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "NPNSummary.swf"
                                }
                              }
                            },
                            "intervalNotes": {
                              "id": "intervalNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "RPNSummary.swf"
                                }
                              }
                            },
                            "evaluationmfr": {
                              "id": "evaluationmfr",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "MFREvaluationSummary.swf"
                                }
                              }
                            },
                            "dietaryProgressNotes": {
                              "id": "dietaryProgressNotes",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "DPNSummary.swf"
                                }
                              }
                            },
                            "activityTherapy": {
                              "id": "activityTherapy",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "ActivityTherapyEHRSummary.swf"
                                }
                              }
                            },
                            "socialSummary": {
                              "id": "socialSummary",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "scores": {
                              "id": "scores",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "SeverityScoresSummary.swf"
                                }
                              }
                            },
                            "depnvFuncEval": {
                              "id": "depnvFuncEval",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "EvaluationSummary.swf"
                                }
                              }
                            },
                            "factoresRisco": {
                              "id": "factoresRisco",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "INPSummary.swf"
                            }
                          }
                        },
                        "hp": {
                          "id": "hp",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "INPHPSummary.swf"
                            }
                          }
                        },
                        "progressNotes": {
                          "id": "progressNotes",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.progressNotes"
                          }
                        },
                        "depnvProblemas": {
                          "id": "depnvProblemas",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ProblemList.swf"
                            }
                          }
                        },
                        "medicacaoAnt": {
                          "id": "medicacaoAnt",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PrescViewHomeMedication.swf"
                            }
                          }
                        },
                        "antecedentes": {
                          "id": "antecedentes",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PastHistorySummary.swf"
                            }
                          }
                        },
                        "depnvDiagnosticos": {
                          "id": "depnvDiagnosticos",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DiagnosisDifferentialList.swf"
                            }
                          }
                        },
                        "assessToolsGroup": {
                          "id": "assessToolsGroup",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon.assessToolsGroup"
                          }
                        },
                        "depnvTopografia": {
                          "id": "depnvTopografia",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "BodyDiagram.swf"
                            }
                          }
                        },
                        "consultasAnteriores": {
                          "id": "consultasAnteriores",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PreviousEpisSummaryPage.swf"
                            }
                          }
                        },
                        "emergencyEpisodeSummary": {
                          "id": "emergencyEpisodeSummary",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "depnvAnalisys": {
                              "id": "depnvAnalisys",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "LabTestsOrdersList.swf"
                                }
                              }
                            },
                            "aColheitas": {
                              "id": "aColheitas",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "AnalysisHarvest.swf"
                                }
                              }
                            },
                            "aTranpAnalises": {
                              "id": "aTranpAnalises",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "prescription": {
                              "id": "prescription",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "patientAssessment": {
                              "id": "patientAssessment",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "PatientAssessmentSummary.swf"
                                }
                              }
                            },
                            "patientEducation": {
                              "id": "patientEducation",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "proceduresMfr": {
                              "id": "proceduresMfr",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "RehabPlan.swf"
                                }
                              }
                            },
                            "rehabPlan": {
                              "id": "rehabPlan",
                              "label": "",
                              "icon": "",
                              "action": {
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "carePlans": {
                              "id": "carePlans",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "CarePlansList.swf"
                                }
                              }
                            },
                            "guideline": {
                              "id": "guideline",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "GuidelinesSummary.swf"
                                }
                              }
                            },
                            "protocol": {
                              "id": "protocol",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "CpoeGrid.swf"
                            }
                          }
                        },
                        "orderSets": {
                          "id": "orderSets",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "OrderSetOngoing.swf"
                            }
                          }
                        },
                        "depnvAnalisys": {
                          "id": "depnvAnalisys",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.depnvAnalisys"
                          }
                        },
                        "depnvImages": {
                          "id": "depnvImages",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ImageList.swf"
                            }
                          }
                        },
                        "depnvOtherExams": {
                          "id": "depnvOtherExams",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ExamList.swf"
                            }
                          }
                        },
                        "prescription": {
                          "id": "prescription",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.prescription",
                            "component": {
                              "type": "SWF",
                              "id": "PrescViewAdminAndTasks.swf"
                            }
                          }
                        },
                        "pProcedures": {
                          "id": "pProcedures",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ProceduresLoaderView.swf"
                            }
                          }
                        },
                        "pEnsinosenfermagem": {
                          "id": "pEnsinosenfermagem",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.pEnsinosenfermagem"
                          }
                        },
                        "diets": {
                          "id": "diets",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DietSummary.swf"
                            }
                          }
                        },
                        "consultRequests": {
                          "id": "consultRequests",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ParamedicalRequestList.swf"
                            }
                          }
                        },
                        "positioningInp": {
                          "id": "positioningInp",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PositioningsList.swf"
                            }
                          }
                        },
                        "physicalTherapy": {
                          "id": "physicalTherapy",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.physicalTherapy"
                          }
                        },
                        "planningGroup": {
                          "id": "planningGroup",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.orderEntry.planningGroup"
                          }
                        },
                        "suppliesProcedures": {
                          "id": "suppliesProcedures",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
                        }
                      },
                      "buttons": {
                        "nursingInitialAssessment": {
                          "id": "nursingInitialAssessment",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "NIASummary.swf"
                            }
                          }
                        },
                        "depnvNursingCarePlan": {
                          "id": "depnvNursingCarePlan",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ICNPLoaderView.swf"
                            }
                          }
                        },
                        "depnvVitalSign": {
                          "id": "depnvVitalSign",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "VitalSignsDetail.swf"
                            }
                          }
                        },
                        "biometric": {
                          "id": "biometric",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "BiometricRead.swf"
                            }
                          }
                        },
                        "hidrics": {
                          "id": "hidrics",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "FluidBalanceRequestList.swf"
                            }
                          }
                        },
                        "observacaoPeriodica": {
                          "id": "observacaoPeriodica",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "FlowSheetsLoaderViews.swf"
                            }
                          }
                        },
                        "healthProgr": {
                          "id": "healthProgr",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "HealthProgramList.swf"
                            }
                          }
                        },
                        "dischargeAltaEnfer": {
                          "id": "dischargeAltaEnfer",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
                        }
                      },
                      "buttons": {
                        "identificationIdentification": {
                          "id": "identificationIdentification",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PatientAttributes.swf"
                            }
                          }
                        },
                        "subdeepnvAdministradorPhoto": {
                          "id": "subdeepnvAdministradorPhoto",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PatientCapturePhotoDoctor.swf"
                            }
                          }
                        },
                        "barcode": {
                          "id": "barcode",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PrintPatientBarCode.swf"
                            }
                          }
                        },
                        "identificationDocumentos": {
                          "id": "identificationDocumentos",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DocumentsArchive.swf"
                            }
                          }
                        },
                        "identificationPlanossaude": {
                          "id": "identificationPlanossaude",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PatientHealthPlan.swf"
                            }
                          }
                        },
                        "idArrivedByEdis": {
                          "id": "idArrivedByEdis",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PatientArrivedBy.swf"
                            }
                          }
                        },
                        "patientPortal": {
                          "id": "patientPortal",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "AdtPatientPortalAccess.swf"
                            }
                          }
                        },
                        "advancedDirectives": {
                          "id": "advancedDirectives",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "AdvancedDirectivesSummary.swf"
                            }
                          }
                        },
                        "identificationNecessidades": {
                          "id": "identificationNecessidades",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for coding"
                        }
                      },
                      "buttons": {
                        "codingPage": {
                          "id": "codingPage",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "p1DepnavSummary": {
                              "id": "p1DepnavSummary",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "P1GridDoctorPat.swf"
                                }
                              }
                            },
                            "futureEvents": {
                              "id": "futureEvents",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "FutureEventsList.swf"
                                }
                              }
                            },
                            "surgProcCreation": {
                              "id": "surgProcCreation",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "SurgicalEpisodeLoader.swf"
                                }
                              }
                            },
                            "inpatientEpisodes": {
                              "id": "inpatientEpisodes",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DiagnosisFinalList.swf"
                            }
                          }
                        },
                        "dischargeReceita": {
                          "id": "dischargeReceita",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "PrescViewAdminAndTasks.swf"
                            }
                          }
                        },
                        "futureEvents": {
                          "id": "futureEvents",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.discharge.futureEvents"
                          }
                        },
                        "dischargeRecDoente": {
                          "id": "dischargeRecDoente",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "RecommendPatientNotes.swf"
                            }
                          }
                        },
                        "dischargeRecMedico": {
                          "id": "dischargeRecMedico",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DischargeDoctorSummary.swf"
                            }
                          }
                        },
                        "formulaires": {
                          "id": "formulaires",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "CitsCerfas.swf"
                            }
                          }
                        },
                        "coSign": {
                          "id": "coSign",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "CoSignTaskList.swf"
                            }
                          }
                        },
                        "deathRegistry": {
                          "id": "deathRegistry",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DeathRegistrySummary.swf"
                            }
                          }
                        },
                        "usDisposition": {
                          "id": "usDisposition",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "USDispositionSummary.swf"
                            }
                          }
                        },
                        "signoff": {
                          "id": "signoff",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "SignOff.swf"
                            }
                          }
                        },
                        "phyDischargeNotes": {
                          "id": "phyDischargeNotes",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DSSummary.swf"
                            }
                          }
                        },
                        "summaryInp": {
                          "id": "summaryInp",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "myPendingIssue": {
                              "id": "myPendingIssue",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "MyPendingIssues.swf"
                                }
                              }
                            },
                            "allPendingIssue": {
                              "id": "allPendingIssue",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ServiceTransferListPat.swf"
                            }
                          }
                        },
                        "physicianHandOffEdis": {
                          "id": "physicianHandOffEdis",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "HandOffListPhysician.swf"
                            }
                          }
                        },
                        "nurseHandOffEdis": {
                          "id": "nurseHandOffEdis",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "HandOffListNurse.swf"
                            }
                          }
                        },
                        "medicalTeams": {
                          "id": "medicalTeams",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "HandOffListTeams.swf"
                            }
                          }
                        },
                        "transferInstitution": {
                          "id": "transferInstitution",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "TransferInstitutionGrid.swf"
                            }
                          }
                        },
                        "transportationTransportes": {
                          "id": "transportationTransportes",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "Movements.swf"
                            }
                          }
                        },
                        "transportationDesvio": {
                          "id": "transportationDesvio",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "NewDetour.swf"
                            }
                          }
                        },
                        "allocateBedInp": {
                          "id": "allocateBedInp",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "BedAssigmentLoader.swf"
                            }
                          }
                        },
                        "pendingIssue": {
                          "id": "pendingIssue",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.patient.mainMenu.left.patientManagement.pendingIssue"
                          }
                        },
                        "idBelongingsEdis": {
                          "id": "idBelongingsEdis",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for pregnancyButton"
                        }
                      },
                      "buttons": {
                        "pregnancyList": {
                          "id": "pregnancyList",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for checklistFrontoffice"
                        }
                      },
                      "buttons": {
                        "frontofficeChecklist": {
                          "id": "frontofficeChecklist",
                          "label": "",
                          "icon": "",
                          "action": {
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
                      "label": "Electronic health record",
                      "icon": "PreviousEpisodesIcon_3",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.ehr"
                      }
                    },
                    "clinicalInfoIcon": {
                      "id": "clinicalInfoIcon",
                      "label": "Documentation",
                      "icon": "ClinicalInfoIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.clinicalInfoIcon"
                      }
                    },
                    "pdms": {
                      "id": "pdms",
                      "label": "Patient Data Management System",
                      "icon": "PDMSIcon",
                      "action": {}
                    },
                    "orderEntry": {
                      "id": "orderEntry",
                      "label": "Orders",
                      "icon": "OrderEntryIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.orderEntry"
                      }
                    },
                    "nurse": {
                      "id": "nurse",
                      "label": "Nursing process",
                      "icon": "NurseIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.nurse"
                      }
                    },
                    "patientid": {
                      "id": "patientid",
                      "label": "Patient identification",
                      "icon": "PatientIDNewIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.patientid"
                      }
                    },
                    "coding": {
                      "id": "coding",
                      "label": "Coding",
                      "icon": "CodingIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.coding"
                      }
                    },
                    "discharge": {
                      "id": "discharge",
                      "label": "Discharge",
                      "icon": "DischargeIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.discharge"
                      }
                    },
                    "agenda": {
                      "id": "agenda",
                      "label": "Scheduler",
                      "icon": "ScheduledNewIcon",
                      "action": {
                        "component": {
                          "type": "SWF",
                          "id": "CalendarMonthOverview.swf"
                        }
                      }
                    },
                    "patientManagement": {
                      "id": "patientManagement",
                      "label": "Patient management",
                      "icon": "PatientManagementIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.patientManagement"
                      }
                    },
                    "pregnancyButton": {
                      "id": "pregnancyButton",
                      "label": "Pregnancy record",
                      "icon": "PregnancyIcon",
                      "action": {
                        "targetArea": "inpatient.patient.mainMenu.left.pregnancyButton"
                      }
                    },
                    "checklistFrontoffice": {
                      "id": "checklistFrontoffice",
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
                  "type": "screen for mainMenuLeft"
                }
              },
              "buttons": {
                "alert": {
                  "id": "alert",
                  "label": "Alert messages",
                  "icon": "AlertIcon",
                  "action": {
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
                      "label": "Print",
                      "icon": "PrintIcon",
                      "action": {}
                    },
                    "create": {
                      "id": "create",
                      "label": "Add",
                      "icon": "AddIcon",
                      "action": {}
                    },
                    "advanceSearchIcon": {
                      "id": "advanceSearchIcon",
                      "label": "Advanced search",
                      "icon": "AdvancedSearchIcon",
                      "action": {}
                    },
                    "cancel": {
                      "id": "cancel",
                      "label": "Cancel",
                      "icon": "CancelIcon",
                      "action": {}
                    },
                    "toolsCommontext": {
                      "id": "toolsCommontext",
                      "label": "Most frequent texts",
                      "icon": "CommonTextIcon",
                      "action": {}
                    },
                    "actionButton": {
                      "id": "actionButton",
                      "label": "Actions",
                      "icon": "ActionsIcon",
                      "action": {}
                    },
                    "viewsButton": {
                      "id": "viewsButton",
                      "label": "Views",
                      "icon": "ViewsIcon",
                      "action": {}
                    },
                    "firstView": {
                      "id": "firstView",
                      "label": "First view",
                      "icon": "FirstVisionIcon",
                      "action": {}
                    },
                    "barListEdis": {
                      "id": "barListEdis",
                      "label": "List view",
                      "icon": "ListIcon",
                      "action": {}
                    },
                    "secondView": {
                      "id": "secondView",
                      "label": "Second view",
                      "icon": "SecondVisionIcon",
                      "action": {}
                    },
                    "chartLinesEdis": {
                      "id": "chartLinesEdis",
                      "label": "Graphic view",
                      "icon": "ChartsLinesIcon",
                      "action": {}
                    },
                    "docImport": {
                      "id": "docImport",
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
                      "label": "Details",
                      "icon": "DetailsIcon",
                      "action": {}
                    },
                    "contextHelp": {
                      "id": "contextHelp",
                      "label": "Clinical context help",
                      "icon": "ContentIcon",
                      "action": {}
                    },
                    "infoButton": {
                      "id": "infoButton",
                      "label": "Infobutton",
                      "icon": "InfoButtonIcon",
                      "action": {}
                    },
                    "applicationHelp": {
                      "id": "applicationHelp",
                      "label": "Functionality help",
                      "icon": "HelpIcon",
                      "action": {}
                    },
                    "globalShortcut": {
                      "id": "globalShortcut",
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
                          "type": "screen for undefined"
                        }
                      },
                      "buttons": {
                        "toolsEspecialidades": {
                          "id": "toolsEspecialidades",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ToolsMySpecialities.swf"
                            }
                          }
                        },
                        "backofficeGroups": {
                          "id": "backofficeGroups",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "FollowUpCareGroupsList.swf"
                            }
                          }
                        },
                        "toolsSalas": {
                          "id": "toolsSalas",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ToolsMyRoomsSet.swf"
                            }
                          }
                        },
                        "toolsTouchOption": {
                          "id": "toolsTouchOption",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ToolsDataEntryFormatSet.swf"
                            }
                          }
                        },
                        "biometrics": {
                          "id": "biometrics",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ToolsBiometricID.swf"
                            }
                          }
                        },
                        "toolsPersonalData": {
                          "id": "toolsPersonalData",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ToolsProfessionalData.swf"
                            }
                          }
                        },
                        "releaseNotes": {
                          "id": "releaseNotes",
                          "label": "",
                          "icon": "",
                          "action": {
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
                          "type": "screen for undefined"
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
                              "type": "screen for undefined"
                            }
                          },
                          "buttons": {
                            "orderSetsTools": {
                              "id": "orderSetsTools",
                              "label": "",
                              "icon": "",
                              "action": {
                                "component": {
                                  "type": "SWF",
                                  "id": "OrderSetList.swf"
                                }
                              }
                            },
                            "groupsTools": {
                              "id": "groupsTools",
                              "label": "",
                              "icon": "",
                              "action": {
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
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "MostFrequentTexts.swf"
                            }
                          }
                        },
                        "guidelineTools": {
                          "id": "guidelineTools",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "GuidelineList.swf"
                            }
                          }
                        },
                        "protocolTools": {
                          "id": "protocolTools",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "ProtocolList.swf"
                            }
                          }
                        },
                        "orderSetsTools": {
                          "id": "orderSetsTools",
                          "label": "",
                          "icon": "",
                          "action": {
                            "targetArea": "inpatient.tools.mainMenu.left.commontext.orderSetsTools"
                          }
                        },
                        "predefineDiet": {
                          "id": "predefineDiet",
                          "label": "",
                          "icon": "",
                          "action": {
                            "component": {
                              "type": "SWF",
                              "id": "DietTools.swf"
                            }
                          }
                        },
                        "toolsDocMacro": {
                          "id": "toolsDocMacro",
                          "label": "",
                          "icon": "",
                          "action": {
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
                      "label": "User configurations",
                      "icon": "PreferencesIcon",
                      "action": {
                        "targetArea": "inpatient.tools.mainMenu.left.toolsLang"
                      }
                    },
                    "commontext": {
                      "id": "commontext",
                      "label": "Content management",
                      "icon": "ContentManagmentIcon",
                      "action": {
                        "targetArea": "inpatient.tools.mainMenu.left.commontext"
                      }
                    },
                    "pdms": {
                      "id": "pdms",
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
                  "type": "screen for mainMenuLeft"
                }
              },
              "buttons": {
                "alert": {
                  "id": "alert",
                  "label": "Alert messages",
                  "icon": "AlertIcon",
                  "action": {
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
                      "label": "Print",
                      "icon": "PrintIcon",
                      "action": {}
                    },
                    "create": {
                      "id": "create",
                      "label": "Add",
                      "icon": "AddIcon",
                      "action": {}
                    },
                    "advanceSearchIcon": {
                      "id": "advanceSearchIcon",
                      "label": "Advanced search",
                      "icon": "AdvancedSearchIcon",
                      "action": {}
                    },
                    "cancel": {
                      "id": "cancel",
                      "label": "Cancel",
                      "icon": "CancelIcon",
                      "action": {}
                    },
                    "toolsCommontext": {
                      "id": "toolsCommontext",
                      "label": "Most frequent texts",
                      "icon": "CommonTextIcon",
                      "action": {}
                    },
                    "actionButton": {
                      "id": "actionButton",
                      "label": "Actions",
                      "icon": "ActionsIcon",
                      "action": {}
                    },
                    "viewsButton": {
                      "id": "viewsButton",
                      "label": "Views",
                      "icon": "ViewsIcon",
                      "action": {}
                    },
                    "docImport": {
                      "id": "docImport",
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
                      "label": "Details",
                      "icon": "DetailsIcon",
                      "action": {}
                    },
                    "applicationHelp": {
                      "id": "applicationHelp",
                      "label": "Functionality help",
                      "icon": "HelpIcon",
                      "action": {}
                    },
                    "contextHelp": {
                      "id": "contextHelp",
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
    