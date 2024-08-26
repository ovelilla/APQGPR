var app = angular.module("APQGPR");
app.controller(
  "controller.global",
  function ($scope, $rootScope, $location, $injector, $q, api, $timeout, $window, openApp) {
    var me = {};

    me.init = function () {
      $rootScope.loadedMashup = false;
      $rootScope.loadedApp = undefined;
      $rootScope.isAnySelection = false;
      $rootScope.pageTitle = "Plantilla";
      $rootScope.breadcrumbParent = "Main";
      $rootScope.language = "es";

      $rootScope.navigation = [
        {
          name: "Global View",
          content: [
            {
              name: "Global View",
              url: "./index.html#/global-view",
            },
          ],
        },
        {
          name: "Budget Analysis",
          content: [
            {
              name: "Budget Analysis",
              url: "./index.html#/budget-analysis",
            },
          ],
        },
        {
          name: "Deferred Analysis",
          content: [
            {
              name: "Deferred Analysis",
              url: "./index.html#/deferred-analysis",
            },
          ],
        },
        {
          name: "Total Invoices",
          content: [
            {
              name: "Total Invoices",
              url: "./index.html#/total-invoices",
            },
          ],
        },
        {
          name: "Paid Invoices",
          content: [
            {
              name: "Paid Invoices",
              url: "./index.html#/paid-invoices",
            },
          ],
        },
        {
          name: "Pending Invoices",
          content: [
            {
              name: "Pending Invoices",
              url: "./index.html#/pending-invoices",
            },
          ],
        },
        {
          name: "Management KPIs",
          content: [
            {
              name: "Management KPIs",
              url: "./index.html#/management-kpis",
            },
          ],
        },
        {
          name: "Budget Table",
          content: [
            {
              name: "Budget Table",
              url: "./index.html#/budget-table",
            },
          ],
        },
        {
          name: "Invoicing Table",
          content: [
            {
              name: "Invoicing Table",
              url: "./index.html#/invoicing-table",
            },
          ],
        },
      ];
    };

    me.boot = function () {
      me.init();
      me.events();
    };

    me.events = function () {
      $rootScope.goToPage = function (link) {
        if (link) {
          api.destroyObjects().then(function () {
            var vars = window.location.href.split("?")[1] || "";
            $location.url("/" + link + "?" + vars);
          });
          $rootScope.global.qlik.resize();
        }
      };

      $rootScope.subMenu = function (content) {
        if (content) {
          showComboNav($event);
        }
      };
    };

    /* Resize page for reload objects */
    $scope.resize = function () {
      $rootScope.global.qlik.resize();
    };

    $rootScope.initializeController = function (pageObjects) {
      if ($rootScope.loadedApp !== $rootScope.app) {
        $rootScope.loadedApp = $rootScope.app;
        $rootScope.getObjects(pageObjects).then(function () {});
        $rootScope.initializePersonalSheets();
      } else {
        angular.element(document).ready(function () {
          $rootScope.getObjects(pageObjects);
        });
      }
      $rootScope.removeBubbles();
    };

    $rootScope.initializePersonalSheets = function () {
      var qlikGlobal = $rootScope.global.qlik.getGlobal($rootScope.global.apps[$rootScope.app]);
      qlikGlobal.getAuthenticatedUser(function (reply) {
        var userName = reply.qReturn.substr(
          reply.qReturn.toLowerCase().lastIndexOf("userid=") + 7,
          reply.qReturn.length
        );
        var userDirectory = reply.qReturn.substr(
          reply.qReturn.toLowerCase().lastIndexOf("UserDirectory=") + 15,
          reply.qReturn.toLowerCase().indexOf(";") + 1 - 15
        );
        getPersonalSheets(userName, userDirectory);
      });
    };

    $rootScope.getObjects = function (pageObjects) {
      var deferred = $q.defer();
      api.destroyObjects().then(function () {
        api.getObjects(pageObjects);
        deferred.resolve();
      });
      return deferred.promise;
    };

    var getPersonalSheets = function (userName, userDirectory) {
      var app = $rootScope.global.apps[$rootScope.app].app;

      app.getList("sheet", function (data) {
        var sheets = [];
        var sortBy = "title" || "rank";
        if (data && data.qAppObjectList && data.qAppObjectList.qItems) {
          var sortedData = data.qAppObjectList.qItems.sort(function (a, b) {
            return a.qData[sortBy] - b.qData[sortBy];
          });
          sortedData.forEach(function (item) {
            var ItemOwnerId = item.qMeta.hasOwnProperty("owner") ? item.qMeta.owner.userId : "";
            if (
              !item.qMeta.hasOwnProperty("owner") ||
              (ItemOwnerId !== "" && ItemOwnerId === userName)
            ) {
              sheets.push({
                id: item.qInfo.qId,
                name: item.qMeta.title,
              });
            }
          });
          $scope.PersonalSheetList = sheets;
        }
      });
    };

    me.boot();
  }
);
