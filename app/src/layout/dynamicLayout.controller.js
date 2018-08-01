(function () {
"use strict";

angular.module('layout')
.controller('DynamicLayoutController', DynamicLayoutController);


DynamicLayoutController.$inject = ['$scope', 'layout', '$uiRouter', '$state', '$transitions', '$timeout', '$stateParams', 'Path', 'LAYOUT_BASE_STATE'];
function DynamicLayoutController($scope, layout, $uiRouter, $state, $transitions, $timeout, $stateParams, Path, LAYOUT_BASE_STATE) {
    
    var ctrl = this;

    // For debugging purposes only
    $transitions.onSuccess({}, function(transition) {
        console.log(
            "Successful transition from " + transition.from().name +
            " to " + transition.to().name
        );
    });

          // For debugging purposes only
    $transitions.onError({}, function(transition) {
        console.log(
            "Error in transition from " + transition.from().name +
            " to " + transition.to().name
        );
      });

    function createStates(area) {

        createState(area);
        for (var id in area.areas) {
            if (area.areas.hasOwnProperty(id)) {
                createStates(area.areas[id]);
            }
        }
    }




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
        var redirectTo = getRedirectTo(area);
        // Check if state already exists
        var exists = $state.href(state) ? true: false;
        // Create otherwise
        if(!exists) {
            console.log('Adding state ' + state + '...');
            console.log('for url ' + url + ' with views: ' + JSON.stringify(views));
            $uiRouter.stateProvider
            .state(state, 
                {   
                    //abstract: abstract,
                    views: views,
                    url: url,
                    params: {
                        // Set selected area as state parameter
                        targetPath: ''
                    },
                    data: {
                        layout: layout
                    },
                    //redirectTo: redirectTo,
                    onEnter: function () {
                        console.log("entered bottom state's onEnter function");
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

    function getRedirectTo(area) {
        // TODO: For the time being is jumping for the first child area 
        // Default target area should be set by configuration.
        var state = ''


        
        for (var areaId in area.areas) {
            if (area.areas.hasOwnProperty(areaId)) {
               
                state = LAYOUT_BASE_STATE + '.' + area.areas[areaId].path;
            }
        }

        return state;
    }

    function getViews(area) {
        var views = {};

        var baseViewsAbsname = '@public.dynamicLayout.inpatient';

        var topViewsAbsname = baseViewsAbsname + '.' + area.id;
        
        var childViewName = '@public.dynamicLayout' + '.' + area.path;
      
        switch(area.pos) {
            case -1:
                views = { '': 'layout.root' };
            break;
            case 0:
                views = { '': 'layout.top' };
                for(var childAreaId in area.areas) {
                    var viewAbsName = childAreaId + baseViewsAbsname + '.' + area.id;
                    views[viewAbsName] = 'layout.' + childAreaId;
                }
 /*

            default:
                var topViewsAbsname = baseViewsAbsname + area.id;
            //views['headerLeft' + childViewName] = 'layout.area';
            //views['headerRight' + childViewName] = 'layout.area';
            //views['actionMenuLeft' + childViewName] = 'layout.area';
                views = { '': 'layout.top' };
                views['headerRight' + topViewsAbsname] = 'layout.headerRight';
                views['actionMenuLeft' + topViewsAbsname] = 'layout.headerRight';
                views['mainMenu' + topViewsAbsname + '.mainMenu'] = 'layout.area';
                views['deepnav' + topViewsAbsname] = 'layout.area'; 
                views['headerLeft' + topViewsAbsname] = 'layout.headerRight'; 
                views['actionMenuRight' + topViewsAbsname] = 'layout.headerRight'; 
                views['mainMenuLeft' + topViewsAbsname] = 'layout.headerRight'; 
                views['mainMenuRight' + topViewsAbsname] = 'layout.headerRight'; 
                views['actionMenu' + topViewsAbsname] = 'layout.area';



                break;
                */
               /*
            case 1:
                views['headerRight' + topViewsAbsname] = 'layout.headerRight';
                break;

            case 2:
                views['actionMenuLeft' + topViewsAbsname] = 'layout.actionMenuLeft';

                break;
            case 3:
           // case 4:
           //     views['mainMenu' + topViewsAbsname] = 'layout.area';
           //     break;
            case 5: 
                views['deepnav' + topViewsAbsname] = 'layout.deepnav'; 
                break;
            case 6: 
                views['headerLeft' + topViewsAbsname] = 'layout.headerLeft'; 

                break;                
            case 7: 
                views['actionMenuRight' + topViewsAbsname] = 'layout.actionMenuRight'; 

                break;
            case 8: 
                views['mainMenuLeft' + topViewsAbsname] = 'layout.mainMenuLeft'; 

                break;
            case 9: 
                views['mainMenuRight' + topViewsAbsname] = 'layout.mainMenuRight'; 

                break;
            case 10:
            case 11:
                views['actionMenu' + topViewsAbsname] = 'layout.actionMenu';
                break;
                */
//            default:
//                views['deepnav' + topViewsAbsname] = 'layout.area';
                
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
        $state.go(state, {targetPath: layout.areas[$scope.selectedArea].path});
        // For the time being must jump for a menu that has buttons with an action (see area controller)
        
        $state.go(state, {targetPath: 'inpatient.entry.mainMenu.left'});
        //$state.go(state, {'area': $scope.selectedArea});
        //$state.go('public.dynamicLayout.inpatient.entry.mainMenu.left');
        
    }

}


})();
