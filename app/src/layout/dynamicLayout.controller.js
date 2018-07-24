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

        var areaPath = area.p


        var s = $uiRouter.stateService.current.name + '.' + area.id;




        var exists = $state.href(s) ? true: false;

        if(!exists) {
            console.log('Adding state ' + s + '...');
            $uiRouter.stateProvider.state(s, 
                {   
                    template: '<p>OLA</p>',
                    controller: 'StateController',
                    url: '/inpatient'
                }
            );

            var sAux = $state.href(s);

            if(sAux){
                console.log('State ' + s  + ' added successfuly.');
            };
        }
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
