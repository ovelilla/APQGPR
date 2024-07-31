var app = angular.module('APQXXX');
app.controller('controller.global', function($scope, $rootScope, $location, $injector, $q, api, $timeout, $window, openApp) {

    //Defines the filters that they values are not going to be displayed on selected items menu
    const HIDDEN_FILTERS = ['#'];

    var me = {};

    me.init = function() {
        //Global var to know if mashup loaded for fist time (preFilter)
        $rootScope.loadedMashup = false;
        //Globar var to know what app is current loaded
        $rootScope.loadedApp = undefined;
        // Globar var to know if is any selection active
        $rootScope.isAnySelection = false;
        //Global vars pageTitle and breadcrumbParent because as the same for all view controllers
        $rootScope.pageTitle = 'Plantilla';
        $rootScope.breadcrumbParent = 'Main';
        $rootScope.language = 'es'

        $rootScope.miArray = [
            {
                name: 'HOJA 1',
                content: [
                    {
                        name: 'HOJA 1',
                        url: './index.html#/HOJA'
                    }]
            },
            {
                name: 'HOJA 2',
                content: [
                    {
                        name: 'HOJA 2',
                        url: './index.html#/HOJA'
                    }]
            },
            {
                name: 'HOJA 3',
                content: [
                    {
                        name: 'HOJA 3',
                        url: './index.html#/HOJA1'
                    }
                ]
            },
            {
                name: 'HOJA 4',
                content: [
                    {
                        name: 'HOJA 4',
                        url: './index.html#/HOJA'
                    }
                ]
            }
        ]
    };

    me.boot = function() {
        me.init();
        me.events();
    };

    me.events = function() {




        $rootScope.global.qlik.theme.apply('theme_sense_test_2').then(function(result){
            console.log('theme applied with result: ' + result);
        });
        $rootScope.goToPage = function(link) {
            //var link = page.link;
            if (link) {
                //clearFilters
                api.destroyObjects().then(function() {
                    var vars =  window.location.href.split("?")[1] || "";
                    $location.url('/' + link + "?" + vars);
                });
                //resize to refresh the window and paint the news menus
                $rootScope.global.qlik.resize();
            }
        };

        $rootScope.subMenu = function(content){
            if(content) {
                showComboNav($event);
            }
        };




        /*
        getUpdateDateInfo
        */
        $rootScope.getUpdateDateInfo = function() {
            $rootScope.global.apps[$rootScope.app].app.variable.getContent('variable1', function(reply) {
                if (reply && reply.qContent && reply.qContent.qString) {
                    $rootScope.updateDate = reply.qContent.qString;
                }
            });
            $rootScope.global.apps[$rootScope.app].app.variable.getContent('variable2', function(reply) {
                if (reply && reply.qContent && reply.qContent.qString) {
                    $rootScope.rolNavigation = reply.qContent.qString;
                }
            });
            $rootScope.global.apps[$rootScope.app].app.variable.getContent('variable3', function(reply) {
                if (reply && reply.qContent && reply.qContent.qString) {
                    $rootScope.dataDate = reply.qContent.qString;
                }
            });
            $rootScope.global.apps[$rootScope.app].app.variable.getContent('variable4', function(reply) {
                if (reply && reply.qContent && reply.qContent.qString) {
                    if(reply.qContent.qString==='1')
                    {
                        $rootScope.fichOfi = true;
                    }
                    else
                    {
                        $rootScope.fichOfi = false;
                    };
                }
            });
        };

        $rootScope.showFilter = function() {
            $rootScope.initialFilter='0';
            $rootScope.initialIcon="./img/icons/arrow-combo.svg";
            $rootScope.labelFilter='Mostrar';
            console.log('valor inicial',$rootScope.initialFilter);
            console.log('valor inicial icono',$rootScope.initialIcon);
            $rootScope.initialShow=false;
            $rootScope.initialHeight={'height': '700px', 'width': '100%'};
            $rootScope.initialMargin={'margin': '50px 0px 50px 0px','padding-left': '20px'};

        };


        /*
        clear All Selections
        */
        $rootScope.clearAllSelections = function(appName) {
            var deferred = $q.defer();
            var appNameUsed = appName ? appName : $rootScope.app;
            var appToClear = $rootScope.global.apps[appNameUsed].app;
            appToClear.clearAll().then(function() {
                appToClear.getList("SnapshotList", function(reply){
                    deferred.resolve();
                });
            });

            return deferred.promise;
        };

        /*
        flipPanelToggle
        */
        $rootScope.flipPanelToggle = function(event) {
            var flipPanel = $(event.currentTarget).closest('.flip-panel');
            if (flipPanel) {
                flipPanel.flip('toggle');
            }

            // Adjust Visibility
            var frontPanel = $(flipPanel.children()[0]);
            frontPanel.css('visibility', (frontPanel.css('visibility')) === 'visible' ? 'hidden' : 'visible');

            var backPanel = $(flipPanel.children()[1]);
            backPanel.css('visibility', (backPanel.css('visibility')) === 'visible' ? 'hidden' : 'visible');
        };

        /*
        maximizePanelToggle
        */
        $rootScope.maximizePanelToggle = function(event) {
            var boxPanel = $(event.currentTarget).closest('.x_maximize');
            boxPanel.toggleClass('x_panel_maximize');

            var qvObject = $(boxPanel.find('.x_content div div')[0]);
            if (boxPanel.hasClass('x_panel_maximize')) {
                var maxHeight = $(window).height() -  190; // Height minus topbar and Panel header
                qvObject.css('height', maxHeight);
                $rootScope.maximizePanel();
                $('.main-container').css('overflow', 'hidden');
            } else {
                var parentHeight = $(boxPanel.find('.x_content div')[0]).css('height');
                qvObject.css('height', parentHeight);

                // Restore default values
                boxPanel.css('left', '0px');
                boxPanel.css('width', '100%');
                $('.main-container').css('overflow', 'scroll');
            }

            var icon = $(event.currentTarget).children()[0];
            if (icon) {
                $(icon).toggleClass('fa-window-maximize fa-window-restore');
            }

            $rootScope.global.qlik.resize();
        };



        $rootScope.maximizePanelToggleWithSomeElement = function(event) {
            var boxPanel = $(event.currentTarget).closest('.x_maximize');

            boxPanel.toggleClass('x_panel_maximize');

            var qvObject = $(boxPanel.find('.x_content_maximizable div div')[0]);
            if (boxPanel.hasClass('x_panel_maximize')) {
                var maxHeight = $(window).height() -  150; // Height minus topbar and Panel header
                qvObject.css('height', maxHeight);
                $rootScope.maximizePanel();
                $('.main-container').css('overflow', 'hidden');
            } else {
                var parentHeight = $(boxPanel.find('.x_content_maximizable div')[0]).css('height');
                qvObject.css('height', parentHeight);

                // Restore default values
                boxPanel.css('left', '0px');
                boxPanel.css('width', '100%');
                $('.main-container').css('overflow', 'scroll');
            }

            var icon = $(event.currentTarget).children()[0];
            if (icon) {
                $(icon).toggleClass('fa-window-maximize fa-window-restore');
            }

            $rootScope.global.qlik.resize();
        };

        $rootScope.defaultMarker = function(){
         
            };
        

        /*
        maximizePanel
        */
        $rootScope.maximizePanel = function() {
            var maximizedPanel = $('.x_panel_maximize');
            if (maximizedPanel && maximizedPanel.length > 0) {
                var sidebar = $('.sidebar');
                if (sidebar.css('display') === 'none') {
                    maximizedPanel.css('left', '0px');
                    maximizedPanel.css('width', '100%');
                } else {
                    maximizedPanel.css('left', sidebar.css('width'));
                    maximizedPanel.css('width', ($(window).width() - sidebar.width()) + 'px');
                }
            }
        };

        /*
        onMouseEnterMenuItem
        */
        $rootScope.onMouseEnterMenuItem = function(event) {
            $(event.currentTarget).find('.dropdown-menu').stop(true, true).fadeIn(500);
        };

        /*
        onMouseLeaveMenuItem
        */
        $rootScope.onMouseLeaveMenuItem = function(event) {
            $(event.currentTarget).find('.dropdown-menu').stop(true, true).delay(150).fadeOut(500);
        };
    };

    /* Resize page for reload objects */
    $scope.resize = function() {
        $rootScope.global.qlik.resize();
    };

    //function to load the objects of a page and aply de initial functions
    $rootScope.initializeController = function(pageObjects) {
    //   console.log('initializeController')
        if ($rootScope.loadedApp !== $rootScope.app) {
            $rootScope.loadedApp = $rootScope.app;
            $rootScope.getObjects(pageObjects).then(function() {
            })
         
          $rootScope.initializePageComponents();
          // $rootScope.initialFunctions();
            $rootScope.defaultMarker();
            $rootScope.initializePersonalSheets();
            $rootScope.showFilter();
        } else {
            angular.element(document).ready(function () {
                $rootScope.getObjects(pageObjects);
                //$rootScope.initializePageComponents();
                // $rootScope.initialFunctions();
            });
        }
        //$rootScope.getMenuObjects();
        $rootScope.removeBubbles();
        $rootScope.getUpdateDateInfo();
    }

    $rootScope.initializePersonalSheets = function() {
        var qlikGlobal = $rootScope.global.qlik.getGlobal($rootScope.global.apps[$rootScope.app]);
        qlikGlobal.getAuthenticatedUser(function(reply) {
            var userName = reply.qReturn.substr(reply.qReturn.toLowerCase().lastIndexOf('userid=') + 7, reply.qReturn.length);
            var userDirectory = reply.qReturn.substr(reply.qReturn.toLowerCase().lastIndexOf('UserDirectory=') + 15, reply.qReturn.toLowerCase().indexOf(';') + 1 - 15);
            getPersonalSheets(userName, userDirectory);
        });
    };

    $rootScope.getObjects = function(pageObjects) {
        var deferred = $q.defer();
        api.destroyObjects().then(function() {
            api.getObjects(pageObjects);
            deferred.resolve();
        });
        return deferred.promise;
    };

    $rootScope.initializePageComponents = function() {
        $('.slimscroll').slimscroll({
            allowPageScroll: true
        });
    };

    // $rootScope.initialFunctions = function () {
    //     $rootScope.getUpdateDateInfo();
    //     $rootScope.adjustInnerMenuItems();
    // }

    var getPersonalSheets = function(userName, userDirectory) {
        var app = $rootScope.global.apps[$rootScope.app].app;

        app.getList('sheet', function (data) {
            var sheets = [];
            var sortBy = ('title' || 'rank');
            if (data && data.qAppObjectList && data.qAppObjectList.qItems) {
                var sortedData = data.qAppObjectList.qItems.sort(function (a, b) {
                    return a.qData[sortBy] - b.qData[sortBy];
                });
                sortedData.forEach(function (item) {
                var ItemOwnerId = (item.qMeta.hasOwnProperty('owner')) ? item.qMeta.owner.userId : "";
                if ((!item.qMeta.hasOwnProperty('owner')) || ( ItemOwnerId !=="" && ItemOwnerId === userName)){
                    sheets.push({
                    id: item.qInfo.qId,
                    name: item.qMeta.title
                    });
                }
              });
              $scope.PersonalSheetList = sheets;
            }
        });
    };

    me.boot();
});
