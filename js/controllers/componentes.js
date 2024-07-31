var app = angular.module('APQGPR');
app.controller('controller.componentes', function($scope, $rootScope, $location, $injector, $q, api, $window) {

    var me = {};

    me.init = function() {
        // console.log('init de componente')
        $rootScope.app = 'APQGPR';
        // console.log($rootScope.app)
        $rootScope.page = 'componentes';
        $rootScope.parentPage = 'GLOB';
        $rootScope.pageTitle = 'Global';
        $rootScope.breadcrumbParent = 'Global';
        $rootScope.breadcrumb = undefined;
        $rootScope.helpText = false;
        //-----

         $scope.myObj = [
            {
                appId: 'A01',
                app: 'dummy'
            },
            {
                appId: 'A02',
                app: 'consultant'
            },
            {
                appId: 'A03',
                app: 'bussiness'
            }
            ]

            $scope.modifyCard = function () {
                setTimeout(function(){ 
                    let graphTitle = document.querySelectorAll('.two-selectors-card .data-data header h1 div');

                    if(graphTitle.length > 0){
                        graphTitle = graphTitle[0].innerText
                        document.querySelectorAll('.two-selectors-card .card-header h2 span')[0].innerText = graphTitle;
                    }
                    else{
                        setTimeout(function(){ 
                            graphTitle = document.querySelectorAll('.two-selectors-card .data-data header h1 div');
        
                            if(graphTitle.length > 0){
                                graphTitle = graphTitle[0].innerText
                                document.querySelectorAll('.two-selectors-card .card-header h2 span')[0].innerText = graphTitle;
                            }                            
                        }, 1000);
                    }

                    let cardWidth = document.getElementsByClassName('two-selectors-card')[0]

                    if(cardWidth){
                        cardWidth = cardWidth.clientWidth.toString() + 'px';

                        document.querySelectorAll('.graphic .qv-object-wrapper')[0].style.setProperty("--border-width", cardWidth);
                    }

                   

                }, 1000);
                
            };

        //-----
      me.objects = [
        { appName: $rootScope.app, objectId: 'QUNq' },
        { appName: $rootScope.app, objectId: 'RwejC' },
        { appName: $rootScope.app, objectId: 'JWCMt' },
        { appName: $rootScope.app, objectId: 'spbjQ' },
        { appName: $rootScope.app, objectId: 'cpwBYF' }
      ];

        /*
        Due to very poor performance in IE, the flow to load objects must be:
            - load app
            - apply initial filters
            - remove qlik-rain-loader
            - load main page objects --> getObjects function has to be a promise
            - load menu objects
        */
        angular.element(document).ready(function () {
          
          $rootScope.initializeController(me.objects);
        });
    };

    me.boot = function() {
        me.init();
        me.events();
    };

    me.events = function() {
        me.getObjects = function() {
            var deferred = $q.defer();
            api.destroyObjects().then(function() {
                api.getObjects(me.objects);
                deferred.resolve();
            });
            return deferred.promise;
        };

        me.initializePageComponents = function() {
            $('.slimscroll').slimscroll({
                allowPageScroll: true
            });
        };
    };

    me.boot();
});
