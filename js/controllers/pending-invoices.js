var app = angular.module("APQGPR");
app.controller(
  "controller.pendingInvoices",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "pending-invoices";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Facturas pendientes";
      $scope.titulo = "Facturas pendientes";
      $scope.sectionTitle = "Facturas pendientes";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "uycXTrY" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "FzuHPp" },
        { appName: $rootScope.app, objectId: "zJZTjQs" },
        { appName: $rootScope.app, objectId: "jHUvQrt" },
        { appName: $rootScope.app, objectId: "FWpbSuS" },
        { appName: $rootScope.app, objectId: "ejzkNE" },
        { appName: $rootScope.app, objectId: "UxcNE" },
        { appName: $rootScope.app, objectId: "kqppNR" },
        { appName: $rootScope.app, objectId: "mMzvKme" },
        { appName: $rootScope.app, objectId: "EePqWKJ" },
        { appName: $rootScope.app, objectId: "rgJP" },
        { appName: $rootScope.app, objectId: "pPgLPz" },
        { appName: $rootScope.app, objectId: "Vgakq" },
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
