"use strict";

var app = angular.module("APQGPR");

app.directive("navigation", function ($rootScope, api) {
  var me = {
    def: {},
  };

  me.boot = function () {
    me.def.scope = {
      navigation: "=",
      titulo: "=",
      tit2: "=",
      data: "=",
      rol: "=",
      rolsscc: "=",
      fichofi: "=",
      icono: "=",
      fieldName: "@fieldName",
      valor: "@valor",
    };

    me.def.templateUrl = "./views/components/navigation.html";

    me.def.controller = function ($scope, $element) {
      me.loadObjects();
      me.dropdownMenu();
      me.filters();
    };

    me.def.link = function (scope, element, attrs) {};
    return me.def;
  };

  me.loadObjects = function () {
    const objectsToLoad = [
      { appName: $rootScope.app, objectId: "CurrentSelections" },
      { appName: $rootScope.app, objectId: "nvGqzF" },
    ];
    api.destroyObjects().then(function () {
      api.getObjects(objectsToLoad).then(function () {
        me.getWithFromUl();
      });
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

    setTimeout(() => {
      filtersDropdown.classList.add("filters__dropdown--hidden");
    }, 1000);

    filtersBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      filtersDropdown.classList.toggle("filters__dropdown--hidden");
    });

    document.addEventListener("click", (event) => {
      if (!filtersBtn.contains(event.target)) {
        filtersDropdown.classList.add("filters__dropdown--hidden");
      }
    });
  };

  return me.boot();
});
