var app = angular.module("APQGPR");
app.controller(
  "controller.deferredAnalysis",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "deferred-analysis";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Diferido disponible";
      $scope.titulo = "Diferido disponible";
      $scope.sectionTitle = "Diferido disponible";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "gdxJVV" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "GSAVheY" },
        { appName: $rootScope.app, objectId: "FPPQKp" },
        { appName: $rootScope.app, objectId: "mpPmWM" },
        { appName: $rootScope.app, objectId: "pTxsnj" },
        { appName: $rootScope.app, objectId: "Xcm" },
        { appName: $rootScope.app, objectId: "fpRBK" },
        { appName: $rootScope.app, objectId: "pHbPXM" },
        { appName: $rootScope.app, objectId: "jfhMsRq" },
        { appName: $rootScope.app, objectId: "uSFDtX" },
        { appName: $rootScope.app, objectId: "ahab" },
        { appName: $rootScope.app, objectId: "nrexuH" },
        { appName: $rootScope.app, objectId: "MEZQxBQ" },
        { appName: $rootScope.app, objectId: "PCFgEav" },
        { appName: $rootScope.app, objectId: "Whky" },
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
