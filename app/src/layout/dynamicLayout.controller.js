(function () {
"use strict";

angular.module('layout')
.controller('DynamicLayoutController', DynamicLayoutController);


DynamicLayoutController.$inject = ['$scope', 'layout', '$uiRouter', '$state', '$transitions', '$timeout', '$stateParams', 'Path', 'LAYOUT_BASE_STATE'];
function DynamicLayoutController($scope, layout, $uiRouter, $state, $transitions, $timeout, $stateParams, Path, LAYOUT_BASE_STATE) {
    
    var ctrl = this;

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
    
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry' }, function(transition) {
        $state.go(transition.to().name + '.mainMenu');
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry.mainMenu' }, function(transition) {
        $state.go(transition.to().name + '.left');
    });
    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.entry.mainMenu.left' }, function(transition) {
        $state.go(transition.to().name + '.barcode');
    });            

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient' }, function(transition) {
        $state.go(transition.to().name + '.mainMenu');
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient.mainMenu' }, function(transition) {
        $state.go(transition.to().name + '.left');
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.patient.mainMenu.left' }, function(transition) {
        $state.go(transition.to().name + '.clinicalInfoIcon');
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools' }, function(transition) {
        $state.go(transition.to().name + '.mainMenu');
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools.mainMenu' }, function(transition) {
        $state.go(transition.to().name + '.left');
    });

    $transitions.onSuccess({ entering: LAYOUT_BASE_STATE + '.inpatient.tools.mainMenu.left' }, function(transition) {
        $state.go(transition.to().name + '.commontext');
    });

    /** Create states */
    function createStates(area) {

        createState(area);
        for (var id in area.areas) {
            if (area.areas.hasOwnProperty(id)) {
                createStates(area.areas[id]);
            }
        }
    }

    /** Create a state from the info in the area */
    function createState (area) {

        // or $state.current.name
        var state = $uiRouter.stateService.current.name + '.' + area.path;
        // When using nested states, the child url is appended to the parent's url, therefore the
        // we simply have to provide the id.
        // TODO: Validate if the url is actualy needed
        var url = '/' + area.id; 

        // If there is nothing to draw then the state is abstract
        var abstract = area.buttons ? false : true;
        var views = getViews(area);
        // Check if state already exists
        var exists = $state.href(state) ? true: false;
        // Create otherwise
        if(!exists && views) {
            console.log('Adding state ' + state + '. Views: ' + JSON.stringify(views) + '. Url: ' + url);
            $uiRouter.stateProvider
            .state(state, 
                {   
                    abstract: abstract,
                    views: views,
                    url: url,
                    data: {
                        layout: layout,
                        areaPath: area.path
                    },
                    onEnter: function () {
                        console.log("entered " + state + " state's onEnter function");
                    },                    
                    resolve: {
                       // Resolve area through state parameters
                       area: function () {

                           var path = new Path(state).removeHead().removeHead();
                           // Remove 
                           var area = layout.findArea(path); 
                           return area;
                       }
                    }  
                }
            );
        }
    }

    var topViewAbsName = '';
    function getViews(area) {
        var views = null;
      
        switch(area.pos) {
            case -1:
                views = { '': 'layout.root' };
            break;
            case 0:
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
            
            case 3:
                // MainMenu and MainMenuLeft have both value 3 for "pos"
                if(area.buttonsPos.length == 0) {
                    // Main menu targets the base state
                    views = {}
                    views['mainMenu' + topViewAbsName] = 'layout.mainMenu';
                } else {
                    
                    views = {}
                    // Main menu left targets parent's unamed view
                    views[''] = 'layout.mainMenu.left';
                    // and top's "screen" view
                    views['screen' + topViewAbsName] = 'layout.screen';
                }
                break;
            case 4:
                views = {}
                views[''] = 'layout.mainMenu.right';
                views['screen' + topViewAbsName] = 'layout.screen';
                break;
            case 5: 
                views = {}
                views['deepnav' + topViewAbsName] = 'layout.deepnav'; 
                break;               
        }

        return views;
    }

    // Create the states for all areas in layout
    createStates(layout);


    $scope.selectedArea = {};
    $scope.layout = layout;

    $scope.go = function() {
        var state = LAYOUT_BASE_STATE + "." + layout.id + "." + $scope.selectedArea;
        // Jump to selected state. Send selected area through state parameters
        $state.go(state);
    }
}


})();
