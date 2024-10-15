var app = angular.module("APQGPR");
app.controller(
  "controller.paidInvoices",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "paid-invoices";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Facturas pagadas";
      $scope.titulo = "Facturas pagadas";
      $scope.sectionTitle = "Facturas pagadas";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "GNPMW" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },

        { appName: $rootScope.app, objectId: "BGcTFJ" },
        { appName: $rootScope.app, objectId: "PFVwfG" },
        { appName: $rootScope.app, objectId: "mxEXJd" },
        { appName: $rootScope.app, objectId: "fSPQncS" },
        { appName: $rootScope.app, objectId: "jyyPpC" },
        { appName: $rootScope.app, objectId: "UdWFHwp" },
        { appName: $rootScope.app, objectId: "KvmDJdK" },
        { appName: $rootScope.app, objectId: "KAcLmG" },
        { appName: $rootScope.app, objectId: "jPfBQA" },
        { appName: $rootScope.app, objectId: "jKHzr" },
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
