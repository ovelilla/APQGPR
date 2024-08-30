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
        { appName: $rootScope.app, objectId: "xmYfUU" },
        { appName: $rootScope.app, objectId: "GNPMW" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "3f22b3fc-123f-4374-b3f6-32a9dded8edd" },
        { appName: $rootScope.app, objectId: "87fc8213-003b-404a-9abd-5631335d272e" },
        { appName: $rootScope.app, objectId: "dce1d7e9-e187-4e15-ac9e-227a5b425019" },
        { appName: $rootScope.app, objectId: "6f01f280-5b51-43d6-a431-58354c16987e" },
        { appName: $rootScope.app, objectId: "dcae4835-d691-472a-b277-6a4c608053ad" },
        { appName: $rootScope.app, objectId: "0b298aa6-d957-48f8-8496-6d33536d54fd" },
        { appName: $rootScope.app, objectId: "93c27e90-8cf4-4222-ac44-37ba80b9b946" },
        { appName: $rootScope.app, objectId: "ab0b5c1d-1acb-4331-a925-f2135aa358c0" },
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
