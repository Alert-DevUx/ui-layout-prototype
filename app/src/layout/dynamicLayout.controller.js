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
            "Successful Transition from " + transition.from().name +
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

        // Check if state already exists
        var exists = $state.href(state) ? true: false;
        // Create otherwise
        if(!exists) {
            console.log('Adding state ' + state + '...');
            console.log('for url ' + url );
            $uiRouter.stateProvider
            .state(state, 
                {   
                    component: 'area',
                    url: url,
                    params: {
                        // Set selected area as state parameter
                        targetPath: ''
                    },
                    resolve: {
                        // Resolve area through state parameters
                        area: ['$stateParams', 'LayoutService', function ($stateParams, LayoutService) {
                            if($stateParams.targetPath) {
                                var area = layout.findArea(new Path($stateParams.targetPath)); 
                                return area;
                            } else {
                                return null;
                            }
                        }]
                    }  
                }
            );
        }
    }

    // Create the states for all areas in layout
    createStates(layout);


    $scope.selectedArea = {};
    $scope.layout = layout;

    $scope.go = function() {

        var state = LAYOUT_BASE_STATE + "." + layout.id + "." + $scope.selectedArea;

        // Jump to selected state. Send selected area through state parameters
        $state.go(state, {targetPath: layout.areas[$scope.selectedArea].path});
    }

}


})();
