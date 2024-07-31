'use strict';

/**
 * @ngdoc function
 * @name myApp.directive: getTitle
 * @description
 * # getTitle
 *
 */
var app = angular.module('APQXXX');
app.directive('getTitle', function ($rootScope) {
  var me = {
    def: {
    }
  };

  me.boot = function () {
    me.def.link = function (scope, element, attrs) {
      //element es un elemento jquery
      var e = element;
      var varName = attrs.getTitle
      var defaultTitle = attrs.default

      e[0].classList.add("get-title-css")

      $rootScope.global.apps[$rootScope.app].app.createGenericObject({ 
        title: { qStringExpression: varName } 
      }, function (reply) { 
        if (reply && reply.title) {
          var title = (reply.title === '-' && defaultTitle) ? defaultTitle : reply.title
          // If the scope is destroyed, then all its $watchers die with it. On page change your scope'll be destroyed by angular
          attrs.$observe('getTitle', function (data) {
            e.html(title);
          }, true)
        } 
      })

    }
    return me.def;
  };

  return me.boot();
});


/*
IMPLEMENTACIÓN:
<b get-title='titulo del mapa' default='Título por defecto'></b>

*/