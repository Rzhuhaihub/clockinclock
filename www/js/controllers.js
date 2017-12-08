/**
 * Created by JohnsonChow on 17/1/1.
 */
angular.module('Controllers', ['Services'])

  .controller('loginController', function ($scope, loginService, $state, $timeout, $cordovaToast, checkNetWork, $cordovaGeolocation,$cacheFactory) {
    $scope.width = localStorage.windowWidth + "px";
    $scope.height = localStorage.windowHeight + "px";
    $scope.logoWidth = localStorage.windowWidth * 0.33 + "px";
    $scope.logoHeight = localStorage.windowWidth * 0.33 * 0.65 + "px";
    
    var flagNet = false;

    // function getCurrentPosition() {
    //   var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //   $cordovaGeolocation
    //     .getCurrentPosition(posOptions)
    //     .then(function (position) {
    //       $rootScope.$broadcast('selfLocation:update', position);
    //       var lat = position.coords.latitude;
    //       var long = position.coords.longitude;
    //     }, function (err) {
    //       // error
    //     });
    //
    //   $scope.$on('selfLocation:update', function (_, location) {
    //     //不断更新的值
    //     $scope.currentPosition = {
    //       latitude: location.latitude,
    //       longitude: location.longitude
    //     };
    //   });
    //


    //have a url


    // if(flagNet){
    //   localStorage.url="http://192.168.8.97:3007/u-route/sys/";
    // }else {
    //   localStorage.url="http://42.96.157.131:3007/u-route/sys/"
    // }


    //
    //    var posOptions={timeout:10000,enableHighAccuracy:false};
    // $cordovaGeolocation
    //   .getCurrentPosition(posOptions)
    //   .then(function (position) {
    //     var lat  = position.coords.latitude;
    //     var long = position.coords.longitude;
    //     var longCom=118.64413477754589;
    //     var latCom= 31.932650585502884;
    //     var dis=Math.abs(6370000*Math.acos(Math.sin(lat)*Math.sin(latCom)+Math.cos(lat)*Math.cos(latCom)*Math.cos(long-longCom)));
    //     if(true){
    //       checkNetWork.docheckNet().success(function (data) {
    //               console.log(" checkNet is success");
    //       }
    //         .error(function (error) {
    //              console.log(" checkNet is error")
    //         }));
    //     }else{
    //       $cordovaToast.showShortBottom("当前位置不可登录，请确认位置").then(function (success) {
    //         $state.go('login')
    //       })
    //     }
    //   }, function(err) {
    //     // error
    //     $cordovaToast.showShortBottom("位置错误").then(function (success) {
    //       $state.go('login')
    //     })
    //   });


      checkNetWork.docheckNet().success(function (data) {
        flagNet = true;
        console.log(" checkNet is success");
        console.log("==========3");
      }).error(function (data) {
        flagNet = false;
        console.log("==========4");
        console.log(localStorage.url);
      });

    $scope.login = function () {

      $scope.loadingDialog = true;
      //jobNumber是员工密码
      localStorage.jobNumber = $scope.jobNumber;
      //userName是员工手机号
      localStorage.userName = $scope.userName;
      console.log($scope.jobNumber + "====" + $scope.userName);
      //login判断符
      var isSuccessLogin = false;
      //内部测试账号（后台）
      if ($scope.userName == "8008008000" && $scope.jobNumber === "800abcd") {
        isSuccessLogin = true;
        localStorage.position = "测试员";
        localStorage.positionId = "123456";
        localStorage.userId = "Test001";
      } else {
        console.log("jinqule");
        loginService.loginDo($scope.userName, $scope.jobNumber).success(function (fn) {
          console.log("success");
          isSuccessLogin = true;
          $cordovaToast.showShortBottom('登录成功').then(function (success) {
          });
        }).error(function (error) {
          console.log("error");
          isSuccessLogin = false;
          $cordovaToast.showShortBottom(error.resMsg).then(function (success) {
          });
        })

      }
      var toDo = function () {
        $scope.loadingDialog = false;
        if (isSuccessLogin) {
          $state.go('main');
        }
      }
      $timeout(toDo, 3000);
    }

    $scope.onTouchItem = function () {
      $scope.login_button = true;
    }
    $scope.onReleaseItem = function () {
      $scope.login_button = false;
    }
    $scope.linkPasswordHtml = function () {
      $state.go('password');
    }


  })

  .controller('passwordController', function ($scope, updateService, $state, $cordovaToast) {
    $scope.arrowTop = localStorage.windowHeight * 0.04 + "px";
    $scope.width = localStorage.windowWidth + "px";
    $scope.height = localStorage.windowHeight + "px";
    $scope.arrowWidth = localStorage.windowHeight * 0.035 * 19 / 34 + "px";
    $scope.arrowheigth = localStorage.windowHeight * 0.035 + "px";
    $scope.myVarN = false;
    $scope.myVarR = false;
    $scope.cellbackPage = function () {
      $state.go('login');
    }
    $scope.checkNewPass = function () {
      if ($scope.oldPassword !== null && $scope.newPassword.length !== null) {
        if ($scope.oldPassword === $scope.newPassword) {
          $scope.myVarN = true;
        } else {
          $scope.myVarN = false;
        }
      }
    }
    $scope.checkReNewPass = function () {
      if ($scope.oldPassword !== null && $scope.newPassword !== null && $scope.newRePassword !== null) {
        if ($scope.newPassword != $scope.newRePassword) {
          $scope.myVarR = true;
        } else {
          $scope.myVarR = false;
        }
      }
    }
    $scope.updatePassword = function () {
      localStorage.userName = $scope.userName;
      /*  localStorage.oldpassword = $scope.oldPassword;
       localStorage.newpassWord = $scope.newPassword;
       localStorage.newRePassword = $scope.newRePassword;*/
      if ($scope.oldPassword !== $scope.newPassword && $scope.newPassword === $scope.newRePassword) {
        updateService.doupdate($scope.userName, $scope.oldPassword, $scope.newRePassword).success(function (fn) {
          // debugger;
          console.log(fn);
          $state.go('login');
        })
      } else {
        $cordovaToast.showShortBottom("修改错误，请重新填写").then(function (success) {
        }, function (error) {
        });
      }
    }
  })
  .controller('setUpController', function ($ionicPopup, $scope, $state) {
    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '退出登录',
        template: '是否确定注销登录?',
        okText: "确认",
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          //localStorage.removeItem("UserId");
          //localStorage.removeItem("TenantId");
          //此方法还是不行
          //ionic.Platform.exitApp();
          localStorage.removeItem("jobNumber");
          localStorage.removeItem("position");
          localStorage.removeItem("positionId");
          localStorage.removeItem("userId");
          localStorage.removeItem("userMing");
          localStorage.removeItem("userName");
          $state.go('login')
        } else {

        }
      });
    };
  })

  .controller('INDEXController', function ($scope, $cordovaNfc, $cordovaNfcUtil, $ionicPlatform, $cordovaBarcodeScanner, mainService, openDoorService,
                                           $cordovaBarcodeScanner, $timeout, $cordovaProgress, $ionicActionSheet, $cordovaCamera, $cordovaToast, $cordovaGeolocation) {
    $scope.loadingDialog = false;
    //Layout Percentage In Index
    $scope.height = localStorage.windowHeight * 0.38 + "px";
    $scope.cardHeight = localStorage.windowHeight * 0.38 * 0.8 + "px";
    $scope.cardMaginHeight = localStorage.windowHeight * 0.38 * 0.05 + "px";
    $scope.ic_scanMarginTop = localStorage.windowHeight * 0.38 * 0.1 + "px";
    $scope.ic_scanMarginLeft = localStorage.windowHeight * 0.38 * 0.1 + "px";
    $scope.ic_setupMarginRight = localStorage.windowHeight * 0.38 * 0.1 + "px";
    $scope.avatar_height = localStorage.windowHeight * 0.38 * 0.8 * 0.28 + "px";
    $scope.avatar_width = localStorage.windowHeight * 0.38 * 0.8 * 0.28 + "px";
    $scope.department_height = localStorage.windowHeight * 0.38 * 0.8 * 0.2 + "px";
    $scope.department_marginLeft = localStorage.windowHeight * 0.38 * 0.13 + "px";
    $scope.doorContnetHeight = localStorage.windowHeight * 0.62 + "px";
    $scope.doorContnetMarginTop = localStorage.windowHeight * 0.38 - 44 + "px";
    $scope.gateHeight = localStorage.windowHeight * 0.066 + "px";
    $scope.gatewidth = localStorage.windowHeight * 0.066 * 0.63 + "px";
    $scope.turnOnButtonWidth = localStorage.windowWidth * 0.20 + "px";
    $scope.turnOnButtonHeight = localStorage.windowWidth * 0.20 * 0.45 + "px";

    var flagDis = false;

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var longCom = 118.64413477754589;
        var latCom = 31.932650585502884;
        var dis = Math.abs(6370000 * Math.acos(Math.sin(lat) * Math.sin(latCom) + Math.cos(lat) * Math.cos(latCom) * Math.cos(long - longCom)));
        if (dis < 500) {
          flagDis = ture;
        }
      });

    //must be findDoorList
    if (true) {

      mainService.findDoorsList(localStorage.userName, localStorage.positionId).success(function (fn) {
        //var objs =[{a:1},{a:2}];
        //angular.forEach(objs, function(data,index,array){
        ////data等价于array[index]
        //  console.log(data.a+'='+array[index].a);
        //});
        angular.forEach(fn.result.normalList, function (data, index, array) {

        })
        $scope.doorsList = fn.result.normalList;
        $scope.gate = fn.result.gate;
        console.log("ok");


      }).error(function (data) {

      });
    }

    $scope.pic = 'img/avatar_male.png';
    $scope.jobNumber = localStorage.jobNumber;
    $scope.userName = localStorage.userName;
    $scope.positionP = localStorage.position;
    $scope.userMing = localStorage.userMing;
    $scope.userId = localStorage.userId;

    $ionicPlatform.ready(function () {
      //Because of the problem about the async-ness of the nfc plugin, we need to wait
      //for it to be ready.
      $cordovaNfc.then(function (nfcInstance) {

        //Use the plugins interface as you go, in a more "angular" way
        nfcInstance.addNdefListener(function (event) {
          //Callback when ndef got triggered
        })
          .then(
            //Success callback
            function (event) {
              console.log("nfc bound success");
            },
            //Fail callback
            function (err) {
              console.log("nfc error");
            });
      });

      $cordovaNfcUtil.then(function (nfcUtil) {
        console.log(nfcUtil.bytesToString("some bytes"));
      });
    });

    $scope.onTouchItem = function (index, gate) {
      if (index === 999 && gate === 20) {
        $scope.gateCss = true;
      } else {
        $scope["gate" + index] = true;
      }
    }
    $scope.onReleaseItem = function (index, gate) {
      if (index === 999 && gate === 20) {
        $scope.gateCss = false;
      } else {
        $scope["gate" + index] = false;
      }

    }

    $scope.scanner = function () {
      $ionicPlatform.ready(function () {
        console.log("CLICK THE SCANNER!!!")
        $cordovaBarcodeScanner
          .scan()
          .then(function (success) {
            console.log("We got a barcode\n" +
              "Result: " + success.text + "\n" +
              "Format: " + success.format + "\n" +
              "Cancelled: " + success.cancelled);
            // Success!
          }, function (error) {
            // An error occurred
          }, {
            preferFrontCamera: true, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            prompt: "请将二维码放入屏幕内扫描区域", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true // iOS
          });
      });
    }
    $scope.loadingOpeningLar = function (normalId, userId) {
      var isOpen = false;
      var hintErrorInfo;
      $scope.loadingDialog = true;
      openDoorService.openDoor(normalId, userId).success(function (fn) {
        console.log("大门开");
        isOpen = true;
      }).error(function (error) {
        isOpen = false;
        hintErrorInfo = data.resMsg;
      });
      var toDo = function () {
        $scope.loadingDialog = false;
        if (isOpen == false) {
          $cordovaToast.showShortBottom(hintErrorInfo).then(function (success) {

          }, function (error) {

          });
        }
      };
      $timeout(toDo, 3000);


    };

    $scope.loadingOpening = function (normalId, userId) {
      $scope.loadingDialog = true;
      var isOpen = false;
      var hintErrorInfo;
      openDoorService.openDoor(normalId, userId).success(function (fn) {
        console.log("门开");
        isOpen = true;
      }).error(function (data) {
        isOpen = false;
        hintErrorInfo = data.resMsg;
      });
      var toDo = function () {
        $scope.loadingDialog = false;
        if (isOpen == false) {
          $cordovaToast.showShortBottom(hintErrorInfo).then(function (success) {

          }, function (error) {

          });
        }
      };
      $timeout(toDo, 3000)
    };


    $scope.changePic = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '图库'},
          {text: '相机'}
        ],
        //destructiveText: 'Delete',
        titleText: '请选择以下方式更改头像',
        cancelText: '取消',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          //Click the Camera button
          $ionicPlatform.ready(function () {
            console.log("相机准备好设备");
            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: index,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
              //"data:image/jpeg;base64," + imageData
              //此处要上传头像之后更改localStorage.pic的值然后重新赋给头像
              $cordovaProgress.showSimpleWithLabel(true, "正在上传头像...");
              //上传函数
              update(imageData);
            }, function (err) {
              $cordovaToast.showShortCenter("请检查您的设备,未能成功获取头像.")
            });


          });
          return true;
        }
      });

      var update = function (imageData) {
        $timeout(function () {
          $cordovaProgress.hide();
          //以下是Fake Data
          localStorage.pic = imageData;
          $scope.pic = localStorage.pic;
          console.log("localStorage.pic" + localStorage.pic);
        }, 3000);
      }
    }


  })

