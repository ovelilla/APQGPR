var app = angular.module("APQGPR");

app.service("openApp", function ($rootScope, $q) {
  this.openAppMethod = function () {
    var deferred = $q.defer();
    var self = this;
    var appsToOpen = Object.keys($rootScope.global.apps);

    var promises = appsToOpen.map(function (app) {
      return self.openSingleApp(app);
    });

    $q.all(promises).then(function (reply) {
      deferred.resolve();
    });
    return deferred.promise;
  };

  this.openSingleApp = function (appname) {
    var app = $rootScope.global.apps[appname];
    var deferred = $q.defer();

    if (app.app === null) {
      var openApp = $rootScope.global.qlik.openApp(app.config.id, app.config);
      openApp.clearAll().then(function () {
        openApp.getList("SnapshotList", function (reply) {
          deferred.resolve();
        });
      });

      app.app = openApp;
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  };
});
