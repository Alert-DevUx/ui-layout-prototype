(function () {
"use strict";

angular.module('layout')
.controller('DynamicLayoutController', DynamicLayoutController);


DynamicLayoutController.$inject = ['$scope', 'layout', '$uiRouter', '$state', '$transitions', '$timeout', '$stateParams', 'Path', 'LAYOUT_BASE_STATE'];
function DynamicLayoutController($scope, layout, $uiRouter, $state, $transitions, $timeout, $stateParams, Path, LAYOUT_BASE_STATE) {
    
    var ctrl = this;


    var BASE_STATE = $uiRouter.stateService.current.name;

    // For debugging purposes only
    $transitions.onSuccess({}, function(transition) {
        console.log("Transition from " + transition.from().name + " to " + transition.to().name + ": SUCCESS");
    });

    // For debugging purposes only
    $transitions.onError({}, function(transition) {
        console.log("Transition from " + transition.from().name + " to " + transition.to().name + ": ERROR: " + transition._error
        );
      });
      
    // Redirecet to default state.
    // TODO: Configure default state!!
    /*
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry' }, function(transition) {
        console.log('Transition hook inpatient.entry', $stateParams);
        $state.go(transition.to().name + '.mainMenu', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry.mainMenu' }, function(transition) {
        console.log('Transition hook inpatient.entry.mainMenu', $stateParams);
        $state.go(transition.to().name + '.left', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry.mainMenu.left' }, function(transition) {
        console.log('Transition hook inpatient.entry.mainMenu.left', $stateParams);
        $state.go(transition.to().name + '.barcode', $stateParams);
    });
                

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient' }, function(transition) {
        console.log('Transition hook inpatient.patient', $stateParams);
        $state.go(transition.to().name + '.mainMenu', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient.mainMenu' }, function(transition) {
        console.log('Transition hook inpatient.patient.mainMenu', $stateParams);
        $state.go(transition.to().name + '.left.clinicalInfoIcon.progressNotes', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient.mainMenu.left' }, function(transition) {
        console.log('Transition hook inpatient.patient.mainMenu.left', $stateParams)
        $state.go(transition.to().name + '.clinicalInfoIcon', $stateParams);
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools' }, function(transition) {
        console.log('Transition hook inpatient.tools', $stateParams)
        $state.go(transition.to().name + '.mainMenu', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools.mainMenu' }, function(transition) {
        console.log('Transition hook inpatient.tools.mainMenu', $stateParams)
        $state.go(transition.to().name + '.left.commontext.orderSetsTools', $stateParams);
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools.mainMenu.left' }, function(transition) {
        console.log('Transition hook inpatient.tools.mainMenu.left', $stateParams)
        $state.go(transition.to().name + '.commontext', $stateParams);
    });
    */

    /** Create states */
    function createStates(area) {

        // or $state.current.name
        var state = BASE_STATE + '.' + area.path
        // If there is nothing to draw then the state is abstract
        // Abstract: exception for 'screen' - REVIEW
        var abstract = area.buttons.length == 0 && area.id != 'screen' ? true : false;        
        //var abstract = false;
        // When using nested states, the child url is appended to the parent's url, therefore the
        // we simply have to provide the id.
        // TODO: Validate if the url is actualy needed
        var url = '/' + area.id; 
        var views = getViews(area);

        if(views) {
            createState(state, abstract, url, views, area);
        }

        for (var id in area.areas) {
            if (area.areas.hasOwnProperty(id)) {
                createStates(area.areas[id]);
            }
        }
    }

    /** Create a state from the info in the area */
    function createState (state, abstract, url, views, area) {
        
        var stateConfig = {};
        stateConfig['abstract'] = abstract;
        stateConfig['views'] = views;
        stateConfig['url'] = url;
        stateConfig['data'] = {
                layout: layout,
                areaPath: area.path
            };
        // param screenName for 'screen' states only 
        var resolve;
        if(area.type === 'screen') {
            stateConfig['params'] = { screenName: '' }

            resolve = {
                screenName: ['$stateParams', function ($stateParams) {
                    return $stateParams.screenName;
                }]
            };
        }

        if(resolve) {
            stateConfig['resolve'] =  resolve;
        }

        // Check if state already exists
        var exists = $state.href(state) ? true: false;
        // Create otherwise
        if(!exists) {
            // Log...
            logStateCreation(state, abstract, url, stateConfig['params'], views);
            // Create...
            $uiRouter.stateProvider.state(state, stateConfig);
        }
    }

    function logStateCreation(state, abstract, url, params, views) {

        var abs = abstract ? ' (abstract) ' : '';
        console.log('State ' + state + abs + ' [' + url + ' ]');
        if(params) {
            console.log('\tParams: ' + JSON.stringify(params)); 
        }
        console.log('\tViews: ' + JSON.stringify(views));
    }

    var topViewAbsName = '';
    function getViews(area) {
        var views = null;
      
        switch(area.type) {
            case 'root':
                views = { '': 'layout.root' };
            break;
            case 'top':
                // Get the views abs name to be used by the children states to reference the views
                topViewAbsName = '@' + LAYOUT_BASE_STATE + '.' + area.path;

                views = { '': 'layout.top' };
              
                for(var childAreaId in area.areas) {
                    // Views names must be absolute because they refer this state (an not the parent)
                    var viewAbsName = childAreaId + '@' + LAYOUT_BASE_STATE + '.' + area.path;
                    // Must set the component in this state to make sure that the view is drawn in this state
                    views[viewAbsName] = 'layout.' + childAreaId;
                }
                break;    
            case 'mainMenu':
                views = {}
                views['mainMenu' + topViewAbsName] = 'layout.mainMenu';
                break;
            case 'mainMenu.left':
                views = {}
                views[''] = 'layout.mainMenu.left';
                break;
            case 'mainMenu.right':
                views = {}
                views[''] = 'layout.mainMenu.right';
                break;
            case 'deepnav': 
                views = {}
                views['deepnav' + topViewAbsName] = 'layout.deepnav'; 
                break;
            case 'screen': 
                views = {}
                // Screen 
                views['screen' + topViewAbsName] = 'layout.screen'; 
                // Action buttons
                views['actionMenu' + topViewAbsName] = 'layout.actionMenu'; 
                break;
        }

        return views;
    }

    // Create the states for all areas in layout
    console.log('< < < < < States creation > > > > > >');
    createStates(layout);
    console.log('< < < < < States creation finished > > > > > >');

    $scope.selectedArea = {};
    $scope.layout = layout;

    $scope.go = function() {
        var state = LAYOUT_BASE_STATE + "." + layout.id + "." + $scope.selectedArea;
        // Jump to selected state. Send selected area through state parameters
        $state.go(state + '.mainMenu.left', $stateParams);
    }
}



})();
