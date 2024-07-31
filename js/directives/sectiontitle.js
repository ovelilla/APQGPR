
'use strict';
/**
 * @ngdoc function
 * @name myApp.directive: getSelections
 * @description
 * # getSelections
 *
 */

 var app = angular.module('APQXXX');
app.directive('sectiontitle', function($rootScope) {
    var me = {
        def: {
        }
    };

    me.boot = function () {

        me.def.scope = {
            sectiontitle: '=',
            fieldName: '@fieldName',
            valor: '@valor'
        };
        me.def.templateUrl = "./views/components/sectiontitle.html"

        me.def.controller = function($scope, $element) {

            $scope.functionExample = function () {
                alert("Example function")
            }
           
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
            
        }

        me.def.link = function(scope, element, attrs) {

        }

        return me.def;
    };

    return me.boot();
});
