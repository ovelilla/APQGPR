var app = angular.module("APQGPR");
app.controller(
  "controller.totalInvoices",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "total-invoices";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Todas las facturas";
      $scope.titulo = "Todas las facturas";
      $scope.sectionTitle = "Todas las facturas";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "GNPMW" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },

        { appName: $rootScope.app, objectId: "NxVHBVz" },
        { appName: $rootScope.app, objectId: "wVFvQ" },
        { appName: $rootScope.app, objectId: "CmmZD" },
        { appName: $rootScope.app, objectId: "eGmFU" },
        { appName: $rootScope.app, objectId: "UPYhwHn" },
        { appName: $rootScope.app, objectId: "yrGvHEw" },

        { appName: $rootScope.app, objectId: "nFmEPv" },
        { appName: $rootScope.app, objectId: "jjJNF" },
        { appName: $rootScope.app, objectId: "cZmTrFV" },
        { appName: $rootScope.app, objectId: "ysFEC" },

        { appName: $rootScope.app, objectId: "wyPRjP" },
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
