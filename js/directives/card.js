// qlikresize
'use strict';
/**
 * @ngdoc function
 * @name myApp.directive: getSelections
 * @description
 * # getSelections
 *
 */

var app = angular.module('APQXXX');
app.directive('card', function ($rootScope, api) {
  var me = {
    def: {
    }
  };

  me.boot = function () {

    me.def.scope = {
      card: '=',
      appName: '@appName',
      appId: '@appId',
      idobject: '@idobject'
    };

    me.def.templateUrl = "./views/components/card.html"

    me.def.controller = function ($scope, $element) {
      me.loadObjects($scope.idobject);

      $scope.changeVariable = function (variable) {
        var botonera = { '1': 'Texto A', '2': 'Texto B', '3': 'Texto C' };
        $rootScope.variableFiltro = variable
        $rootScope.global.apps[$rootScope.app].app.variable.setContent('vl_title2', botonera[variable]);
        $rootScope.global.qlik.resize();
      };

      $scope.getPositionDropdown = function (id) {
        let menuDropdown = document.querySelectorAll('#' + id + ' + ul')[0];
        let positionSelect = document.getElementById(id).getBoundingClientRect().x;
        let screenWith = window.innerWidth;

        if(positionSelect < screenWith/2){
            menuDropdown.classList.add('dropdown-menu-left')
        }else{
            menuDropdown.classList.add('dropdown-menu-right')
        }
      }

      $scope.getOptionSelector = function (option, idSelector, img) {
        let textOption = option.target.innerText;

        let dropdownActive = document.querySelectorAll("#" + idSelector + " + ul li")

        for (let i = 0; i < dropdownActive.length; i++) {
            if(dropdownActive[i].classList.contains('dropdown-menu-active')){
                dropdownActive[i].classList.remove('dropdown-menu-active')
            }
        }
        
        option.target.classList.add('dropdown-menu-active')
        if(img){
            
            document.querySelectorAll("#" + idSelector + " img")[0].src = img;
        }
        document.querySelectorAll("#" + idSelector + " .text")[0].innerText = textOption;
      }

      $scope.expandInfo = function (idInfo) {
        let infoContent = document.querySelectorAll('#' + idInfo + ' .tooltiptext-custom')[0];

        if(infoContent.classList.contains('d-none')){
          infoContent.classList.remove('d-none')
        }else{
          infoContent.classList.add('d-none')
        }

        let positionTooltip = document.getElementById(idInfo).getBoundingClientRect().y;
        let screenHeight = window.innerHeight;

        if(positionTooltip < screenHeight/2){
          if(!infoContent.classList.contains('tooltiptext-bottom')){
            infoContent.classList.add('tooltiptext-bottom')
          }
          if(infoContent.classList.contains('tooltiptext-top')){
            infoContent.classList.remove('tooltiptext-top')
          }
        }else{
          if(!infoContent.classList.contains('tooltiptext-top')){
            infoContent.classList.add('tooltiptext-top')
          }
          if(infoContent.classList.contains('tooltiptext-bottom')){
            infoContent.classList.remove('tooltiptext-bottom')
          }
        }

        let iconX = document.getElementById(idInfo).getBoundingClientRect().x;
        let tooltipX = infoContent.getBoundingClientRect().x;

        // let finalPosition = iconX - tooltipX + 10
        let finalPosition = iconX + 12

        finalPosition = finalPosition.toString() + 'px'

        let finalPositionTooltip = document.getElementById(idInfo).getBoundingClientRect().x + 5
        finalPositionTooltip = finalPositionTooltip.toString() + 'px'

        infoContent.style.setProperty("--left-position", finalPosition);
        // infoContent.style.setProperty("--left-position-tooltip",finalPositionTooltip)
      }

      

    }
    me.def.link = function (scope, element, attrs) {

    }

    return me.def;
  };

  me.loadObjects = function (object) {

    const objectsToLoad = [
      {
        appName: $rootScope.app, objectId: object
      }
    ];
    api.destroyObjects().then(function () {
      api.getObjects(objectsToLoad);
      deferred.resolve();
    });
  }

  
  return me.boot();
});

