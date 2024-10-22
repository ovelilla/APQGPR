var app = angular.module("APQGPR");
app.controller(
  "controller.globalView",
  function ($scope, $rootScope, $location, $injector, $q, api, $window) {
    var me = {};

    me.init = function () {
      $rootScope.app = "APQGPR";
      $rootScope.page = "global-view";
      $rootScope.parentPage = "GLOB";
      $rootScope.pageTitle = "Situación presupuestaria";
      $scope.titulo = "Situación presupuestaria";
      $scope.sectionTitle = "Situación presupuestaria";
      $rootScope.breadcrumbParent = "Global";
      $rootScope.breadcrumb = undefined;
      $rootScope.helpText = false;

      me.objects = [
        { appName: $rootScope.app, objectId: "gdxJVV" },
        { appName: $rootScope.app, objectId: "JppdeVF" },
        { appName: $rootScope.app, objectId: "wnHqC" },
        { appName: $rootScope.app, objectId: "WjJkAFx" },
        { appName: $rootScope.app, objectId: "DGnATL" },
        { appName: $rootScope.app, objectId: "CrVVQZ" },
        { appName: $rootScope.app, objectId: "PTjgjP" },
        { appName: $rootScope.app, objectId: "DJabg" },
        { appName: $rootScope.app, objectId: "cjkttbD" },
        { appName: $rootScope.app, objectId: "YgybNG" },
        { appName: $rootScope.app, objectId: "PjjQuf" },
        { appName: $rootScope.app, objectId: "WzSnQn" },
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
