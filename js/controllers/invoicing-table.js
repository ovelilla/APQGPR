var app = angular.module("APQGPR");
app.controller(
  "controller.invoicingTable",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "invoicing-table";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Detalle Facturas";
      $scope.titulo = "Detalle Facturas";
      $scope.sectionTitle = "Detalle Facturas";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "uycXTrY" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "4db49deb-0c1f-4323-a726-91f04fc13cf9" },
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
