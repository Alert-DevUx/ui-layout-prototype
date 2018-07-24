(function () {
"use strict";

angular.module('layout')
.controller('DynamicLayoutController', DynamicLayoutController)
.controller('StateController', StateController);


DynamicLayoutController.$inject = ['layout', '$uiRouter', '$rootScope', '$timeout', '$state'];
function DynamicLayoutController(topArea, $uiRouter, $rootScope, $timeout, $state) {
    
    //console.log(JSON.stringify(layout));

    console.log($uiRouter.stateRegistry.states);

    console.log(topArea.description);

    // For debugging purposes only
    $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams){
        console.log('State change from: ' + fromState + ' to state ' + toState);
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
        var url = computeUrl(state);
        


        // Check if state already exists
        var exists = $state.href(state) ? true: false;
        // Create otherwise
        if(!exists) {
            console.log('Adding state ' + state + '...');
            console.log('for url ' + url );
            $uiRouter.stateProvider
            .state(state, 
                {   
                    template: '<p>OLA</p>',
                    controller: 'StateController',
                    url: url
                }
            );

            var sAux = $state.href(state);
            if(sAux){
                console.log('State ' + state  + ' added successfuly.');
            };
        }
    }

    function computeUrl(state) {

        return state.replace($state.current.name, '').replace(new RegExp('\\.', 'g'),'/');
    }


    createStates(topArea);

    console.log($uiRouter.stateRegistry.states);

    /*
    $timeout(function(){
        console.log($state.$current.name);
        $state.go('public.dynamicLayout.inpatient');
    }, 5000)
    */






}


StateController.$inject = ['layout', '$state'];
function StateController(area, $state) {
    
    //console.log(JSON.stringify(layout));

    console.log($state.current.name);

    


}




})();
