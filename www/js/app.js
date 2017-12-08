// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'Controllers','ngCordova.plugins.nfc','ngCordova'])

  .run(function ($ionicPlatform,$state,$cordovaStatusbar,loginService,$cordovaToast) {

      //  var posOptions={timeout:10000,enableHighAccuracy:false};
      // $cordovaGeolocation
      //   .getCurrentPosition(posOptions)
      //   .then(function (position) {
      //     var lat  = position.coords.latitude;
      //     var long = position.coords.longitude;
      //     if(long<118.644134777545889&&long>118.6441347775458891&&lat<31.9326505855028839&&lat>31.9326505855028841){
      //       checkNetWork.docheckNet().success(function (data) {
      //         if(data.result !==null){
      //           localStorage.url="http://192.168.8.97:3007/u-route/sys/";
      //         }else{
      //           localStorage.url="http://192.168.8.62:3007/u-route/sys/";
      //         }
      //       }
      //         .error(function (error) {
      //           localStorage.url="http://192.168.8.62:3007/u-route/sys/";
      //         }));
      //     }else{
      //       $cordovaToast.showShortBottom("当前位置不可登录，请确认位置").then(function (success) {
      //       })
      //     }
      //   }, function(err) {
      //     // error
      //     $cordovaToast.showShortBottom("位置错误").then(function (success) {
      //     })
      //   });


   /* $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var type = $cordovaNetwork.getNetwork();
      var onlineState = networkState;
      if (type == Connection.WIFI) {
        //TODO something

      }else if (type == Connection.CELL_4G || type == Connection.CELL_3G){
        //TODO something
      }
    })*/

    $ionicPlatform.ready(function () {
     //
      //localStorage.url="http://42.96.157.131:3007/u-route/sys/";

      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
        StatusBar.styleLightContent();
      }
      if(localStorage.userName == null ||localStorage.userName == undefined){
          $state.go('login');
      }

      // if(localStorage.userName !== null ||localStorage.userName !== undefined){
      //   loginService.loginDo(localStorage.userName,localStorage.jobNumber).success(function (data) {
      //     $cordovaToast.showShortBottom("登录成功").then(function (success) {
      //       $state.go('main');
      //     })
      //   })
      //     .error(function (error) {
      //       $cordovaToast.showShortBottom("error.resMsg").then(function (error) {
      //         $state.go('login');
      //       });
      //     })
      // }else {
      //   $state.go('login');
      // }

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('login', {
        url: '/login',
        templateUrl:'login.html',
        controller:'loginController'
      })
      .state('password',{
        url:'/password',
        templateUrl:'password.html',
        controller:'passwordController'
      })

      .state('main', {
        cache:false,
        url: '/main',
        templateUrl:'main.html',
        controller:'INDEXController'
      })

      .state('setup',{
        url:'/setup',
        templateUrl:'setup.html',
        controller:'setUpController'
      })

    $urlRouterProvider.otherwise('/main');
  })

