var projectName = 'APQXXX';

/**
 * Apps name are used to link reference from json names with mashup app names
 */
 const APPS_NAME = {
  DUMMY: "Dummy_app"
};

window.staticObject = {
    "appConfig": [
        {
            "name": "APQVOC",
            "localId": "APQVOC - Voz360",
            "localServerId": "22170d37-328f-492e-865f-a09c567b5911",
            "devId": "7a517dc3-a416-4858-ab9b-00a17c499540",
            "preId": "6478ab8d-352e-4ba8-97cf-80021f46edd5",
            "provalId": "4a1dbc5f-45fc-4b5e-a520-070eaf161422",
            "proId": "ae8edbea-14b1-40d1-820d-afcc6201bc89"
        }
    ]
};


window.apps = {}
/* CONFIG APPIDS */
const Http = new XMLHttpRequest();
const url='globals.json';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = function () {
  if (Http.status === 200 && Http.responseText.length) {
    const data = JSON.parse(Http.responseText)
    data.appConfig.forEach(function(app) {
      window.apps[app.name] = app.id
    })
  }
}


window.globalJsonObject = window.staticObject; // Using a static object
window.getAppIdByEnvironment = function (appName) {
    var appId;
    if (window.globalJsonObject && window.globalJsonObject.appConfig && window.globalJsonObject.appConfig.length > 0) {

        appId = window.apps['APQVOC - Voz360']
        
        // window.globalJsonObject.appConfig.forEach(function (value) {
        //     if (value.name === appName) {
        //         switch (window.environment) {
        //             case 'LOCAL':
        //                 appId = value.localId;
        //                 break;
        //             case 'LOCALSERVER':
        //                 appId = value.localServerId;
        //                 break;
        //             case 'DEV':
        //                 appId = value.devId;
        //                 break;
        //             case 'PRE':
        //                 appId = value.preId;
        //                 break;
        //             case 'PROVAL':
        //                 appId = value.provalId;
        //                 break;
        //             case 'PRO':
        //                 appId = value.proId;
        //                 break;
        //             default:
        //                 console.error('ERROR Incorrect Environment: ' + window.environment);
        //                 break;
        //         }
        //     }
        // });
    } else {
        console.error("ERROR LOADING APPS: The appConfig array does not exist or is empty");
    }
    if (!appId) {
        console.error("ERROR LOADING APPS: Names do not match with mashup references. Problem with: " + appName);
    }
    return appId;
};
window.setEnvironmentLocation = function () {
  switch (window.location.hostname) {
      case 'localhost':
          window.environment = 'LOCAL';
          break;
      case 'qlsdevelop.lacaixapre.glcpre.es':
          window.environment = 'DEV';
          break;
      case 'qlspre.lacaixa.es':
          window.environment = 'PRE';
          break;
      case 'qlsproval.lacaixa.es':
          window.environment = 'PROVAL';
          break;
      case 'qlsou.lacaixa.es':
          window.environment = 'PRO';
          break;
      default:
          console.error("ERROR The hostname is not permitted: " + window.location.hostname);
          break;
  }
  if (window.environment) console.log("ENVIRONMENT DETECTED: " + window.environment);
};

window.getAppId = function (appName) {
    return window.getAppIdByEnvironment(appName);
};

// Pre-loading the qlik-loader...
// It is removed when the initial filters are applied (into init function from each page)
/*$.get('views/qlik-rain-loader.html', function(element){
    $('body').prepend(element);
}, 'html');*/

var scriptsUrl = 'extensions/' + projectName + '/';
var prefix = '/'//window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1);

var baseServerConfig = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === 'https:'
};

// var appsConfig = {
//     rrhh: {
//         config: {
//             id: window.location.hostname == 'localhost' ? 'Dummy_app.qvf':'5fd4f544-0aaa-4fc3-aaa5-24ca6aabbb1b',
//             host: window.location.hostname,
//             prefix: prefix,
//             port: window.location.port,
//             isSecure: window.location.protocol === 'https:'
//         }
//     }
// };

var tmpCurrentApp = null;
var tmpMultiAppValues;

require.config({
    baseUrl: (baseServerConfig.isSecure ? 'https://' : 'http://') + baseServerConfig.host + (baseServerConfig.port ? ':' + baseServerConfig.port : '') + baseServerConfig.prefix + 'resources',
    paths: {
        /* Controllers */
        'controller.global': prefix + scriptsUrl + 'js/controllers/global',
        'controller.bookmark': prefix + scriptsUrl + 'js/controllers/bookmark',
        'controller.componentes': prefix + scriptsUrl + 'js/controllers/componentes',
        /* Services */
        'service.api': prefix + scriptsUrl + 'js/services/api',
        'service.openApp': prefix + scriptsUrl + 'js/services/openApp',
        /* Directives */
        'exportExcel': prefix + scriptsUrl + 'js/directives/exportExcel',
        'exportPdf': prefix + scriptsUrl + 'js/directives/exportPdf',
        'test': prefix + scriptsUrl + 'js/directives/test',
        'sectiontitle': prefix + scriptsUrl + 'js/directives/sectiontitle',
        'navigation': prefix + scriptsUrl + 'js/directives/navigation',
        'card': prefix + scriptsUrl + 'js/directives/card',
        'getTitle': prefix + scriptsUrl + 'js/directives/getTitle',
        /* Libs */
        'domReady': prefix + scriptsUrl + 'vendors/ajax/domready/ready.min',
        'flip': prefix + scriptsUrl + 'vendors/jquery-flip/jquery.flip',
        'slimscroll': prefix + scriptsUrl + 'vendors/jquery-slimscroll/jquery.slimscroll.min',
        'datepicker': prefix + scriptsUrl + 'vendors/bootstrap/js/bootstrap-datepicker_custom'
    }
});

define([
    'require',
    'angular',
    'js/qlik'
], function(require, angular, qlik) {
    'use strict';
    window.setEnvironmentLocation();

    window.globalJsonObject = window.staticObject; // Using a static object

    var app = angular.module('APQXXX', [
        'ngAnimate',
        'ngRoute'
    ]);

    app.run(function($rootScope) {
        $rootScope.global = {
            qlik: qlik,
            apps: {}
        };

        /**
         * Apps config
         */
        var appsConfig = {
          dummy: window.getAppId(APPS_NAME.DUMMY),
        };

        angular.forEach(appsConfig, function(value, key) {
            $rootScope.global.apps[key] = {
                config: {
                  id: value,
                  host: window.location.hostname,
                  prefix: prefix,
                  port: window.location.port,
                  isSecure: window.location.protocol === 'https:'
                },
                app: null,
                model: []
            };
        });

        $rootScope.removeBubbles = function() {
            angular.element('div#qlik-rain-loader').remove();
        };
    });

    app.config(function($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/componentes', {
                resolve: {
                    isAppOpened: function($q, openApp) {
                        return $q.resolve(openApp.openAppMethod())
                    }
                },
                templateUrl: prefix + scriptsUrl + 'views/componentes.html',
                controller: 'controller.componentes'
            })
            .otherwise({ redirectTo: '/componentes' })
    })
    require([
        'domReady',
        'js/qlik',
        'angular',
        'controller.global',
        'controller.bookmark',
        'controller.componentes',
        'exportExcel',
        'exportPdf',
        'getTitle',
        'test',
        'sectiontitle',
        'navigation',
        'card',
        'service.api',
        'service.openApp',
        'flip',
        'slimscroll',
        'datepicker'
    ], function(document, qlik) {
        qlik.setOnError(function(error) {
            if (!angular.isUndefined(error) && error.code == 16) {
                location.reload();
            } else {
                // console.log(error);
            }
        });

        var $injector = angular.injector(['ng']);
            $injector.invoke(function($timeout) {
                $timeout(function(){
                    //angular.element('div#qlik-rain-loader').remove();
                    angular.bootstrap(document, ['APQXXX', 'qlik-angular'])
                }, 1000);
        }, 'html');


    });
});
