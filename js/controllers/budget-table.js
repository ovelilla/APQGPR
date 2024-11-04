var app = angular.module("APQGPR");
app.controller(
  "controller.budgetTable",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "budget-table";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Detalle presupuesto";
      $scope.titulo = "Detalle presupuesto";
      $scope.sectionTitle = "Detalle presupuesto";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "gdxJVV" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "pppgjUp" },
        { appName: $rootScope.app, objectId: "RGTNY" },
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
