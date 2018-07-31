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
        if(!exists && views) {
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
                    //data: {
                    //    area: area
                    //},
                    redirectTo: redirectTo,
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

        var viewAbsName = '@public.dynamicLayout.inpatient';
      
        switch(area.pos) {
            case -1:
            views = { '': 'layout.root' };
            break;
            case 0:
            views['headerLeft' + viewAbsName] = 'layout.area';
            views['headerRight' + viewAbsName] = 'layout.area';
            views['actionMenuLeft' + viewAbsName] = 'layout.area';
            views['actionMenuRight' + viewAbsName] = 'layout.area';
            break;
            case 3:
            views['mainMenu' + viewAbsName] = 'layout.area';
            views['mainMenuLeft' + viewAbsName] = 'layout.area';
            case 4:
            views['mainMenuRight' + viewAbsName] = 'layout.area';
            break;
            case 5: 
            views['deepnav' + viewAbsName] = 'layout.area'; 
            case 10:
            case 11:
            views['actionMenu' + viewAbsName] = 'layout.area';
            default:
            views['deepnav' + viewAbsName] = 'layout.area';
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
        //$state.go(state, {targetPath: layout.areas[$scope.selectedArea].path});
        // For the time being must jump for a menu that has buttons with an action (see area controller)
        $state.go(state);

        //$state.go('public.dynamicLayout.inpatient.entry.mainMenu.left');
        
    }

}


})();
