var app = angular.module("APQGPR");
app.service("api", function ($q, $rootScope) {
  var me = this;

  me.isRootQlikObject = function (objectId, appName) {
    var isRootOject = false;
    if ($rootScope.qlikRootObjects && $rootScope.qlikRootObjects[appName]) {
      var rootQlikObjects = $rootScope.qlikRootObjects[appName];
      isRootOject = rootQlikObjects.indexOf(objectId) === -1;
    }

    return isRootOject;
  };

  me.setLoaderGif = function (objectId) {
    var element = angular.element(document.querySelector("#qso_" + objectId));
    element.append('<div class="loader"></div>');
  };

  me.getObjects = function (objects) {
    var promises = [];
    var appObject = null;
    var objectsRetrieved = false;
    objects.forEach(function (obj) {
      if (obj.appName && obj.objectId) {
        appObject = $rootScope.global.apps[obj.appName];
        if (appObject) {
          if (me.isRootQlikObject(obj.objectId, obj.appName)) {
            me.setLoaderGif(obj.objectId);
          }

          var promise = appObject.app.getObject(
            "qso_" + obj.objectId,
            obj.objectId,
            obj.objectParam
          );
          promises.push(promise);
        }
      }
    });
    return $q
      .all(promises)
      .then(function (response) {
        response.forEach(function (res) {
          appObject.model.push(res);
        });
        objectsRetrieved = true;
        var response = {
          objectsRetrieved: objectsRetrieved,
          appObject: appObject.model,
        };
        return $q.when(response);
      })
      .catch(function (error) {
        // throw new Error(error);
      });
  };

  me.destroyObjects = function () {
    var promises = [];
    angular.forEach($rootScope.global.apps, function (value, key) {
      if (value.model.length > 0) {
        for (var i = 0; i < value.model.length; i++) {
          if (
            !$rootScope.qlikRootObjects ||
            ($rootScope.app &&
              $rootScope.qlikRootObjects[$rootScope.app] &&
              $rootScope.qlikRootObjects[$rootScope.app].indexOf(value.model[i].id) === -1)
          ) {
            const promise = value.app.destroySessionObject(value.model[i].id);
            promises.push(promise);
            value.model[i] = null;
          }
        }
        value.model = value.model.filter(function (n) {
          return n && typeof n !== "undefined";
        });
      }
    });
    return $q.all(promises);
  };

  me.destroyMenuObjects = function (app, menuObjects) {
    var promises = [];

    menuObjects.forEach(function (menu) {
      const promise = app.app.destroySessionObject(menu.objectId);
      promises.push(promise);
    });

    return $q.all(promises);
  };
});
