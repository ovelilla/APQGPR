var projectName = 'APQXXX';
/*var projectVersion = 'v1.0.4';
var qlikProyectName = $('#qlikProyectName').val();
var qlikScriptsUrl = $('#qlikScriptsUrl').val();
var qlikStylesUrl = $('#qlikStylesUrl').val();
var qlikStylesUrl2 = $('#qlikStylesUrl2').val();
var qlikPrefix = $('#qlikPrefix').val();
var qlikHost = $('#qlikHost').val();
var qlikPort = $('#qlikPort').val();
var qlikProjectId = $('#qlikProjectId').val(); */

var qlikProyectName = "APQXXX";
var qlikScriptsUrl = "http://localhost:5500/";
var qlikStylesUrl = "https://qlsdevelop.lacaixapre.glcpre.es/resources/autogenerated/qlik-styles.css";
var qlikStylesUrl2 = "";
var qlikPrefix = "/";
var qlikHost = "qlsdevelop.lacaixapre.glcpre.es";
var qlikPort = "443";
var qlikProjectId_pre = "ID";
var qlikProjectId = "ID_PROYECTO";

// Definir a qué proyecto se va
//qlikProjectId = qlikProjectId_real;

var proScriptsUrl = 'extensions/' + projectName + '/'; // For Production Server
var devScriptsUrl = ''; //'static/app/'; // For Local Server 
var proPrefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1);
var devPrefix = qlikPrefix; // For Local Server

var devServerConfig = {
        host: qlikHost,
	    prefix: qlikPrefix,
	    port: qlikPort,
	    isSecure: true 
};

var devAppsConfig = {
    APQXXX: {
        config: { 
            id: qlikProjectId, 
            host: qlikHost,
            prefix: qlikPrefix,
            port: qlikPort,
            isSecure: true 
        }
    }
};

var proServerConfig = {
    host: window.location.hostname,
    prefix: '/',
    port: window.location.port,
    isSecure: window.location.protocol === 'https:'
};

var proAppsConfig = {
    APQXXX: {
        config: {
            id: '',
            host: window.location.hostname,
            prefix: prefix,
            port: window.location.port,
            isSecure: window.location.protocol === 'https:' 
        }
    }
};



var tmpCurrentApp = null;
var tmpMultiAppValues;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    var prefix = devPrefix;
    var scriptsUrl = devScriptsUrl;
    var appsConfig = devAppsConfig;
    var serverConfig = devServerConfig;

    // Pre-loading the qlik-loader...
    // It is removed when the initial filters are applied (into init function from each page)
    $.get('views/qlik-rain-loader.html', function(element){
        $('body').prepend(element);
    }, 'html'); 
} else {
    var prefix = proPrefix;
    var scriptsUrl = proScriptsUrl;
    var appsConfig = proAppsConfig;
    var serverConfig = proServerConfig;
    // Pre-loading the qlik-loader...
    // It is removed when the initial filters are applied (into init function from each page)
    $.get('views/qlik-rain-loader.html', function(element){
        $('body').prepend(element);
    }, 'html');
}

window.isIE = function () {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    return true;
  }
  return false;
};

window.isIEAlert = function () {
  if (window.isIE()) {
    alert('Este navegador no es compatible con la aplicación. Se recomienda acceder a través de Google Chrome o Microsoft Edge para una experiencia de usuario satisfactoria.');
  }
};

window.deleteQlikTicket = function () {
  let href = window.location.href;
  let finalUrl = '';

  if (href.includes('qlikTicket')) {
    href = href.split('?qlikTicket=');
    finalUrl = href[0];
    href = href[1].split('#');
    finalUrl = finalUrl + '#' + href[1];
    window.location.href = finalUrl;
  }
  else {
    if (href.includes('#undefined')) {
      finalUrl = href.replace('#undefined', '#/index');
      window.location.href = finalUrl;
    }
  }
}

require.config({
    baseUrl: (serverConfig.isSecure ? 'https://' : 'http://') + serverConfig.host + (serverConfig.port ? ':' + serverConfig.port : '') + serverConfig.prefix + 'resources',
    paths: {

        /* Controllers */
        'controller.global': prefix + scriptsUrl + 'js/controllers/global',
        'controller.bookmark': prefix + scriptsUrl + 'js/controllers/bookmark',
        'controller.componentes': prefix + scriptsUrl + 'js/controllers/componentes',
        'controller.HOJA1': prefix + scriptsUrl + 'js/controllers/HOJA1',
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

    var app = angular.module('APQXXX', [
        'ngAnimate',
        'ngRoute'
    ]);

    app.run(function($rootScope) {
        $rootScope.global = {
            qlik: qlik,
            apps: {}
        };

        angular.forEach(appsConfig, function(value, key) {
            $rootScope.global.apps[key] = {
                config: value.config,
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

            .when('/HOJA1', {
                resolve: {
                    isAppOpened: function($q, openApp) {
                        return $q.resolve(openApp.openAppMethod())
                    }
                },
                templateUrl: prefix + scriptsUrl + 'views/HOJA1.html',
                controller: 'controller.HOJA1'
            })
            .otherwise({ redirectTo: '/HOJA1' })
    })
    require([
        'domReady',
        'js/qlik',
        'angular',
        'controller.global',
        'controller.bookmark',
        'controller.componentes',
        'controller.HOJA1',
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

        if (window.location.hostname != 'localhost') {
            var client = new XMLHttpRequest();
		    client.open('GET', 'globals.json');
		    client.onreadystatechange = function() {
			    if(client.readyState === XMLHttpRequest.DONE
			    && (client.status >= 200 && client.status < 400)) {
			    var data = JSON.parse(client.responseText);
                //appsConfig['APQVOC_01'].config.id = data.appConfig.find(x=>x.name==='APQVOC - CuadroDeMando').id
                appsConfig['APQXXX'].config.id = data.appConfig[0].id
			    }
		    }
		    client.send();
        }
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
                    angular.element('div#qlik-rain-loader').remove();
                    angular.bootstrap(document, ['APQXXX', 'qlik-angular']);
                }, 1000);
        }, 'html');
    });
});

window.deleteQlikTicket();