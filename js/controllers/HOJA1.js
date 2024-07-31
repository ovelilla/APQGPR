var app = angular.module('APQGPR');
app.controller('controller.HOJA1', function($scope, $rootScope, $location, $injector, $q, api, $window) {

    var me = {};

    me.init = function() {
        // console.log('init de componente')
        $rootScope.app = 'APQGPR';
        // console.log($rootScope.app)
        $rootScope.page = 'HOJA1';
        $rootScope.parentPage = 'GLOB';
        $rootScope.pageTitle = 'Prueba de título';
        $scope.titulo = 'Indicadores por centro'
        $scope.sectionTitle = 'Prueba de título'
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

        me.objects = [
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'CyaZjs' },     // Filter - HOJA1 - nivel 0
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'ZKSWP' },  // Filter - HOJA1 - nivel 1
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'qjEhgWK' },  // Filter - HOJA1 - nivel 2
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'PJsHsT' },  // Filter - HOJA1 - nivel 3
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'zZWmZ' },  // Filter - HOJA1 - Categoria oficina
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'KxYagC' },  // Filter - HOJA1 - Rural Urbana
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'brJJg' },  // Filter - HOJA1 - Segmento negocio
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'emwaJp' },  // Filter - HOJA1 - Tipo Banca retail
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'sWMGnAq' },  // Filter - HOJA1 - Fecha
        { appName: $rootScope.app, objectParam: {"noSelections": false}, objectId: 'VxTJmm' },  // Filter - HOJA1 - Centro
        { appName: $rootScope.app, objectParam: {"noSelections": true}, objectId: 'JRQGM' },     // LC - HOJA1 - SSCC
        { appName: $rootScope.app, objectParam: {"noSelections": true}, objectId: 'ttmTuc' },     // KPI - HOJA1 - KPI SSCC
        { appName: $rootScope.app, objectParam: {"noSelections": true}, objectId: 'tdNjuSC' },     // VT - HOJA1 - Territorios
        { appName: $rootScope.app, objectParam: {"noSelections": true}, objectId: 'bAqcyxS' },     // VT - Indicadores totales
        { appName: $rootScope.app, objectParam: {"noSelections": true}, objectId: 'jWgxmh' }     // VT - Indicadores centro

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
