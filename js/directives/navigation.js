

'use strict';
/**
 * @ngdoc function
 * @name myApp.directive: getSelections
 * @description
 * # getSelections
 *
 */

var app = angular.module('APQGPR');

app.directive('navigation', function($rootScope, api) {

    var me = {
        def:  {}
    };
    
    var diffMenu

  me.getWithFromUl = function () {
    
      
      setTimeout(function () {
        const navWidth = document.getElementById('ulItem').offsetWidth
        const containerWidth = document.getElementById('capsuleNav').offsetWidth

        diffMenu = navWidth - containerWidth
        
        if (navWidth > containerWidth) {
          $('#navigator').css('display','flex')
        }
        else{
          $('#navigator').css('display','none')
        }
      }, 500);
  }

  me.boot = function () {

    //$rootScope.pageTitle = 'Global';

    me.def.scope = {
      navigation: '=',
      titulo: '=',
      tit2: '=',
      data:'=',
      rol: '=',
      rolsscc:'=',
      fichofi:'=',
      icono:'=',
      fieldName: '@fieldName',
      valor: '@valor'
    };
    me.def.templateUrl = "./views/components/navigation.html"
    me.def.controller = function ($scope, $element) {
      me.loadObjects();
      me.listenerResize();

      $scope.toogleFilter = function () {
        $('#modalFlag, #capsuleNav').removeClass("show")
        $('#bookmark-container').addClass('no-transition-delay');
        $('#bookmark-container').css('visibility', 'hidden')
        $('#bookmark-container').css('opacity', 0);
        $('.total-modal-bg').removeClass('show')
        $('#modalFilter').toggleClass("show")

        if ($('#modalFilter').hasClass('show')) {
          $('html').addClass('overflow-hidden')
          $('.icon-filter').addClass('icon-open')
          if($('.icon-burguer').hasClass('icon-open') && window.innerWidth < 1025){
            $('.icon-burguer').removeClass('icon-open')
          }
        } else {
          $('html').removeClass('overflow-hidden')
          $('.icon-filter').removeClass('icon-open')
        }

        // let filterHeight = window.innerHeight - 63;
        
        // document.getElementsByClassName('content-filters-header')[0].style.height = filterHeight.toString() + 'px'

        $rootScope.global.qlik.resize();
      }


      


      $scope.checkFilter = function () {

        var app = $rootScope.global.apps[$rootScope.app].app;

        if(app){
          $scope.selState = app.selectionState();
          $scope.selState.OnData.bind($scope.actionCheckFilter);
        }
      }

      $scope.actionCheckFilter = function () {
        let icon = document.getElementsByClassName('active-filter')[0]
        
        if(icon){
          if($scope.selState.selections.length > 0){
            if(icon.classList.contains('d-none')){
              icon.classList.remove('d-none')
            }
          }
          else{
            if(!icon.classList.contains('d-none')){
              icon.classList.add('d-none')
            }
          }
        }

        

        setTimeout(function () {
          if($scope.selState.selections.length > 0){
            let filters = document.querySelectorAll('#qso_CurrentSelections .qv-pager ul li .remove.current-selection-item-text')
            for(let i=0;i<filters.length;i++){
              filters[i].innerHTML = '<img class="close-icon-filter" src="./img/icons/closeIcon.png">'
            }
          }
        }, 200);

        
      }

      $scope.arrowInv = function () {

        let arrows = document.querySelectorAll('#ulItem li a img')

        
      }
      $scope.openHome = function() {
        var appConfig = $rootScope.global.apps[$rootScope.app].config;
    
        var prefix = appConfig.prefix || '/';
    
        var appUrl = (appConfig.isSecure ? 'https://' : 'http://') + appConfig.host + (appConfig.port ? ':' + appConfig.port : '') + prefix +'extensions/APQGPR/index.html#/home';
    
        window.open(appUrl, '_self');
    };
    
      $scope.toogleMenu = function () {
        $('#modalFlag, #modalFilter').removeClass("show")
        $('#bookmark-container').css('visibility', 'hidden')
        $('#bookmark-container').css('opacity', 0);
        $('.total-modal-bg').removeClass('show')
        $('#capsuleNav').toggleClass("show")
          
        if ($('#capsuleNav').hasClass('show')) {
          if(window.innerWidth < 1025){
            $('.icon-burguer').addClass('icon-open')
          }
        } else {
          if(window.innerWidth < 1025){
            $('.icon-burguer').removeClass('icon-open')
          }
        }

        if($('.icon-filter').hasClass('icon-open') && window.innerWidth < 1025){
          $('.icon-filter').removeClass('icon-open')            
        }
      }

      $scope.closeAll = function () {
        $('html').removeClass('overflow-hidden')
        $('#modalFlag, #modalFilter, #capsuleNav, .total-modal-bg').removeClass("show")
        $('#bookmark-container').css('visibility', 'hidden')
        $('.icon-filter').removeClass('icon-open')
        if(window.innerWidth < 1025){
          $('.icon-burguer').removeClass('icon-open')
        }
      }

      $scope.getSelectionPc = function(){
        if(window.innerWidth > 1024){
          document.getElementsByClassName('selection-pc')[0].innerHTML = "<div id='qso_CurrentSelections'></div>";
        }
      }

        /*
        Clear Field Selections
        */
        $scope.clearSelection = function(label, value) {
          if (value) {
              $rootScope.global.apps['APQGPR'].app.field(label).toggleSelect(value, false);
          } else {
              $rootScope.global.apps['APQGPR'].app.field(label).clear();
          }
      };

      $scope.changeFilter = function() {
        if ($rootScope.initialFilter === '0') {
            $rootScope.initialFilter = '1';
        } else {
            $rootScope.initialFilter = '0';
        }
    console.log('valor nuevo',$rootScope.initialFilter)
        if ($rootScope.labelFilter === 'Mostrar') {
            $rootScope.labelFilter = 'Ocultar';
        } else {
            $rootScope.labelFilter = 'Mostrar';
        }
        if ($rootScope.initialFilter === '0') {
          $rootScope.initialIcon = "./img/icons/arrow-combo.svg";
      } else {
          $rootScope.initialIcon = "./img/icons/arrow-combo-inv.svg";
      }
      if ($rootScope.initialFilter === '0') {
        $rootScope.initialHeight ={'height': '700px', 'width': '100%'};
        $rootScope.initialMargin ={'margin': '50px 0px 50px 0px','padding-left': '20px'};
    } else {
        $rootScope.initialHeight = {'height': '600px', 'width': '100%'};
        $rootScope.initialMargin ={'margin': '10px 0px 50px 0px','padding-left': '20px'};
    }
      console.log('Icono nuevo',$rootScope.initialIcon)
        $rootScope.initialShow = !$rootScope.initialShow;
       $rootScope.global.qlik.resize();

        $('#qso_msvsj').toggleClass('fullscreen');


    };


      $scope.getSelectionMobile = function(){
        if(window.innerWidth < 1025){
          document.getElementsByClassName('selection-mobile')[0].innerHTML = "<div id='qso_CurrentSelections'></div>";
        }
      }

      
      

      $scope.moveRight = function () {
        if($('#ulItem').css('right') != (diffMenu.toString() + 'px')){
          $('#ulItem').css('right',diffMenu)
          if(document.querySelectorAll('#navigator .right-navigator')[0] && !document.querySelectorAll('#navigator .right-navigator')[0].classList.contains('disable-button')){
            document.querySelectorAll('#navigator .right-navigator')[0].classList.add('disable-button')
          }
          if(document.querySelectorAll('#navigator .left-navigator')[0] && document.querySelectorAll('#navigator .left-navigator')[0].classList.contains('disable-button')){
            document.querySelectorAll('#navigator .left-navigator')[0].classList.remove('disable-button')
          }
        }
      }
      
      $scope.moveLeft = function () {
        if($('#ulItem').css('right') == (diffMenu.toString() + 'px')){
          $('#ulItem').css('right',0)
          if(document.querySelectorAll('#navigator .left-navigator')[0] && !document.querySelectorAll('#navigator .left-navigator')[0].classList.contains('disable-button')){
            document.querySelectorAll('#navigator .left-navigator')[0].classList.add('disable-button')
          }
          if(document.querySelectorAll('#navigator .right-navigator')[0] && document.querySelectorAll('#navigator .right-navigator')[0].classList.contains('disable-button')){
            document.querySelectorAll('#navigator .right-navigator')[0].classList.remove('disable-button')
          }
        }
      }

      $scope.showComboNav = function (e) {
        const combo = e.currentTarget
        const oldCombo = document.querySelectorAll('.show-combo-nav')
        if (oldCombo.length != 0) {
          $('.show-combo-nav').removeClass('show-combo-nav')
          $('html').removeClass('overflow-hidden')
          combo.getElementsByTagName('img')[0].src = './img/icons/arrow-combo.svg'
        } else {
          combo.classList.toggle("show-combo-nav");
          $('html').toggleClass('overflow-hidden')
          combo.getElementsByTagName('img')[0].src = './img/icons/arrow-combo-inv.svg'
        }
        
        let position = combo.clientWidth / 2 - 7
        let triangle = combo.querySelectorAll('.combo img.arrow-modal-nav.hide-tablet')[0]

        if(triangle){
          triangle.style.left = position.toString() + 'px'
        }
      }
    }


    me.def.link = function (scope, element, attrs) {

    }
    return me.def;
  };

  me.listenerResize = function () {
    window.addEventListener('resize',me.getWithFromUl)
  },

    me.loadObjects = function() {
      const objectsToLoad = [
        {
          appName: $rootScope.app, objectId: 'CurrentSelections'
        },
        { appName: $rootScope.app, objectId: 'LsQtggC' },
        { appName: $rootScope.app, objectId: 'vwZDm' },
        { appName: $rootScope.app, objectId: 'YtSwfNT' }
      ];
      api.destroyObjects().then(function () {
        api.getObjects(objectsToLoad).then(function() {
          me.getWithFromUl();
            // combo
            const navItems = document.getElementsByClassName('nav-item')
            let idNavItem = 0
            for (const i of navItems) {
                idNavItem += 1
                if (i.dataset.content !== '') {
                    i.classList.add('with-content')
                    i.id = 'navItemId' + idNavItem
                }
            }
            this.comboItems = document.querySelectorAll('.with-content')
            for (const i of this.comboItems) {
                i.click = () => {
                    i.classList.add('show-content')
                }
            }
            this.noLink = document.querySelectorAll('.with-content .main-a')
            for (const i of this.noLink) {
                i.removeAttribute('href')
            }
        });
        deferred.resolve();
      });
    }

    return me.boot();
});

