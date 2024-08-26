var app = angular.module("APQGPR");
app.controller(
  "controller.managementKPIs",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "management-kpis";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "KPIs de Gestión";
      $scope.titulo = "KPIs de Gestión";
      $scope.sectionTitle = "KPIs de Gestión";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "xmYfUU" },
        { appName: $rootScope.app, objectId: "GNPMW" },
        { appName: $rootScope.app, objectId: "wnHqC" },
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
