
'use strict';
/**
 * @ngdoc function
 * @name myApp.directive: getSelections
 * @description
 * # getSelections
 *
 */

 var app = angular.module('APQGPR');
app.directive('test', function($rootScope) {
    var me = {
        def: {
        }
    };

    me.boot = function () {

        me.def.scope = {
            test: '=',
            fieldName: '@fieldName',
            valor: '@valor'
        };
        me.def.templateUrl = "./views/components/navigation.html"

        me.def.controller = function($scope, $element) {

        }

        me.def.link = function(scope, element, attrs) {

        }

        return me.def;
    };

    return me.boot();
});
