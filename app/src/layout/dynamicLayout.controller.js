(function () {
"use strict";

angular.module('layout')
.controller('DynamicLayoutController', DynamicLayoutController);


DynamicLayoutController.$inject = ['$scope', 'layout', '$uiRouter', '$state', '$transitions', '$timeout', '$stateParams'];
function DynamicLayoutController($scope, layout, $uiRouter, $state, $transitions, $timeout, $stateParams) {
    
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
                    //templateUrl: 'src/layout/views/area.html',
                    url: url,
                    params: {
                        // Set selected area as state parameter
                        area: layout.areas[$scope.selectedArea]
                    },
                    resolve: {
                        // Resolve area through state parameters
                        area: ['$stateParams', function ($stateParams) {
                          return $stateParams.area;
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

    $scope.update = function() {
        // Jump to selected state. Send selected area through state parameters
        $state.go("public.dynamicLayout.inpatient." + $scope.selectedArea, 
            {area: layout.areas[$scope.selectedArea]});
    }

}


})();
