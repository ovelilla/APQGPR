'use strict';

/**
 * @ngdoc function
 * @name myApp.directive: exportExcell
 * @description
 * # exportExcell
 *
*/
 var app = angular.module('APQGPR');
app.directive('exportExcel', function($rootScope) {
    var me = {
        def: {
        }
    };

    me.boot = function () {

        me.def.link = function (scope, element, attrs) {
            element.bind('click', function(event) {
                var qlikid = attrs.qlikid;
                
                $rootScope.global.apps[$rootScope.app].app.getObjectProperties(qlikid).then(function(model) {
                    var table = $rootScope.global.qlik.table(model);

                    var exportOpts = {
                        download: true
                    };

                    table.exportData(exportOpts).then(function() {
                    });
                });
            });
        };

        return me.def;
    };

    return me.boot();
});


/*
IMPL:
<li>
    <a export-excel qlikid="8a01d7ba-e0f0-4072-abd4-0a7caa13d0ac">
        <i class="fa fa-download"></i>
    </a>
</li>
*/