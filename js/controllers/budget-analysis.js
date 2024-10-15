var app = angular.module("APQGPR");
app.controller(
  "controller.budgetAnalysis",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "budget-analysis";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Detalle presupuesto";
      $scope.titulo = "Detalle presupuesto";
      $scope.sectionTitle = "Detalle presupuesto";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "GNPMW" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "86ad78f7-ef8b-4c7b-bd1e-3566cfd22f40" },
        { appName: $rootScope.app, objectId: "rUcJZkP" },
        { appName: $rootScope.app, objectId: "ePJjNPc" },
        { appName: $rootScope.app, objectId: "ZadC" },
        { appName: $rootScope.app, objectId: "RZJhG" },
        { appName: $rootScope.app, objectId: "UxPLa" },
        { appName: $rootScope.app, objectId: "SqQZDkS" },
        { appName: $rootScope.app, objectId: "zjpxpYy" },
        { appName: $rootScope.app, objectId: "LZjJ" },
      ];

      angular.element(document).ready(function () {
        $rootScope.initializeController(me.objects);
      });
    };

    me.boot = function () {
      me.init();
      me.events();
    };

    me.events = function () {
      me.getObjects = function () {
        var deferred = $q.defer();
        api.destroyObjects().then(function () {
          api.getObjects(me.objects);
          deferred.resolve();
        });
        return deferred.promise;
      };
    };

    me.boot();
  }
);
