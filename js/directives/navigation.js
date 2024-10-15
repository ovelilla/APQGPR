"use strict";

var app = angular.module("APQGPR");

app.directive("navigation", function ($rootScope, api) {
  var me = {
    def: {},
  };

  me.boot = function () {
    me.def.scope = {
      navigation: "=",
    };

    me.def.templateUrl = "./views/components/navigation.html";

    me.def.controller = function () {
      me.loadObjects();
      me.dropdownMenu();
      me.filters();
    };
    return me.def;
  };

  me.loadObjects = function () {
    const objectsToLoad = [
      { appName: $rootScope.app, objectId: "CurrentSelections" },
      { appName: $rootScope.app, objectId: "xmCpNy" },
      { appName: $rootScope.app, objectId: "JZkhHjM" },
      { appName: $rootScope.app, objectId: "hfspP" },
      { appName: $rootScope.app, objectId: "CvCPsg" },
      { appName: $rootScope.app, objectId: "kLRLMrE" },
      { appName: $rootScope.app, objectId: "JUvWvm" },
      { appName: $rootScope.app, objectId: "fNQQq" },
      { appName: $rootScope.app, objectId: "PDezYFC" },
      { appName: $rootScope.app, objectId: "jfpyAmC" },
      { appName: $rootScope.app, objectId: "wvSR" },
      { appName: $rootScope.app, objectId: "yqWzd" },
      { appName: $rootScope.app, objectId: "PyeDBh" },
      { appName: $rootScope.app, objectId: "jkrDV" },
    ];
    api.destroyObjects().then(function () {
      api.getObjects(objectsToLoad);
      deferred.resolve();
    });
  };

  me.dropdownMenu = function () {
    const itemDropdownBtns = document.querySelectorAll(".nav-menu__list__item-dropdown__btn");

    itemDropdownBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const content = btn.nextElementSibling;
        const itemDropdownBtnsActive = document.querySelectorAll(
          ".nav-menu__list__item-dropdown__content--active"
        );
        itemDropdownBtnsActive.forEach((openContent) => {
          if (openContent !== content) {
            openContent.classList.remove("nav-menu__list__item-dropdown__content--active");
          }
        });
        content.classList.toggle("nav-menu__list__item-dropdown__content--active");
      });
    });

    document.addEventListener("click", (event) => {
      const itemDropdownBtnsActive = document.querySelectorAll(
        ".nav-menu__list__item-dropdown__content--active"
      );
      itemDropdownBtnsActive.forEach((openContent) => {
        if (!openContent.contains(event.target)) {
          openContent.classList.remove("nav-menu__list__item-dropdown__content--active");
        }
      });
    });
  };

  me.filters = function () {
    const filtersBtn = document.querySelector(".filters__btn");
    const filtersDropdown = document.querySelector(".filters__dropdown");

    filtersBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      filtersDropdown.classList.toggle("filters__dropdown--hidden");
    });

    document.addEventListener("click", (event) => {
      if (!filtersDropdown.contains(event.target)) {
        filtersDropdown.classList.add("filters__dropdown--hidden");
      }
    });
  };

  return me.boot();
});
