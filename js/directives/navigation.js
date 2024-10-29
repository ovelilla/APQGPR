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
      { appName: $rootScope.app, objectId: "hfspP" },
      { appName: $rootScope.app, objectId: "CvCPsg" },
      { appName: $rootScope.app, objectId: "kLRLMrE" },
      { appName: $rootScope.app, objectId: "JUvWvm" },
      { appName: $rootScope.app, objectId: "fNQQq" },
      { appName: $rootScope.app, objectId: "yqWzd" },
	    { appName: $rootScope.app, objectId: "6c8a7463-beaa-467a-8584-57ca05f629c2" },
      { appName: $rootScope.app, objectId: "uYpcz" },
      { appName: $rootScope.app, objectId: "3b564a4e-7a55-4694-a6bb-5ef6da3acc1e" },
      { appName: $rootScope.app, objectId: "8e86873b-c464-4b86-95bb-046e3f3cc8df" },
      { appName: $rootScope.app, objectId: "7e138633-ef63-4b63-a413-d1942c8e6e84" },
      { appName: $rootScope.app, objectId: "f8611af9-1aa0-4bef-8300-4111c1b75f3a" },
      { appName: $rootScope.app, objectId: "3ad5cbb8-22fd-4aee-960d-0ca208ef9648" },
      { appName: $rootScope.app, objectId: "mDpVJvN" },
      { appName: $rootScope.app, objectId: "pdPvHfJ" },
      { appName: $rootScope.app, objectId: "a470bd2f-cbbe-4f30-8d58-79874ce886ae" },
      { appName: $rootScope.app, objectId: "mKSYJp" },
      { appName: $rootScope.app, objectId: "vqFxQ" },
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
