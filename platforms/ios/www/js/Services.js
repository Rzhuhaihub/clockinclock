/**
 * Created by JohnsonChow on 16/12/28.
 */
angular.module('Services', [])
  .factory('checkNetWork', function ($http, $q) {
    return {
      docheckNet: function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var params = {params: {}};
        $http({
          method: "post",
          url: "http://192.168.8.97:3007/u-route/sys/ping",
          timeout: 3000,
          data: angular.toJson(params),
          dataType: 'json'
        }).success(function (data, header, config, status) {
          console.log(data.result);
          if (data.result !== null) {
            console.log("location is ture");
            localStorage.url = "http://192.168.8.97:3007/u-route/sys/";
            deferred.resolve(data);
          }
          else {
            localStorage.url = "http://42.96.157.131:3007/u-route/sys/";
            deferred.reject(data);
          }
        })
          .error(function (data, header, config, status) {
            // deferred.resolve(data);
            localStorage.url = "http://42.96.157.131:3007/u-route/sys/";
            console.log("==========1");
            deferred.reject(data);
            console.log("==========2");
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })


  .factory('updateService', function ($http, $q) {
    return {
      doupdate: function (userName, oldPassword, newPassword) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var httpparams = {params: {userId: userName, oldPassword: oldPassword, newPassword: newPassword}};
        var updateResult = new Object();
        $http({
          method: "post",
          url: localStorage.url + "mdfPassword",
          data: angular.toJson(httpparams),
          charset: 'utf-8',
          dataType: 'json'
        }).success(function (data, header, config, status) {
          updateResult = data;
          console.log(updateResult);
          console.log(data);
          if (updateResult.resCode == 0) {
            console.log("updateResult.resMsg");
            deferred.resolve(data);
          } else {
            console.log("updateResult.resMsg");
            deferred.reject(data);
          }
        }).error(function (data, header, config, status) {
          //响应失败
          console.log("异常修改");
        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        }

        return promise;
      }
    }
  })
  .factory('loginService', function ($http, $q) {
    return {
      loginDo: function (name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var httpParams = {params: {userId: name, password: pw}};
        var loginResult = new Object();
        var url = localStorage.url + "login";
        debugger;
        console.log("=====5"+localStorage.url);
        $http({
          method: "post",
          url: url,
          data: angular.toJson(httpParams),
          charset: 'utf-8',
          dataType: 'json'
        }).success(function (data, header, config, status) {
          console.log(data);
          localStorage.userMing = data.result.userName;
          //响应成功
          loginResult = data;
          //wait for value from cellback
          if (loginResult.resCode == 0) {
            console.log("登录成功");
            localStorage.position = loginResult.result.position;
            localStorage.positionId = loginResult.result.positionId;
            localStorage.userId = loginResult.result.userId;
            deferred.resolve(data);
          } else {
            deferred.reject(data);
          }
        }).error(function (data, header, config, status) {
          //响应失败
          console.log("响应失败")
        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })
  .factory('mainService', function ($http, $q) {
    return {
      findDoorsList: function (name, positionId) {
        console.log(name);
        var deferred = $q.defer();
        var promise = deferred.promise;
        var mainResult = new Object();
        var httpParams = {params: {userId: name, positionId: localStorage.positionId}};
        $http({
          method: "post",
          url: localStorage.url + "getDoorList" + "/" + localStorage.userName,
          data: angular.toJson(httpParams),
          charset: 'utf-8',
          dataType: 'json'
        }).success(function (data, header, config, status) {
          if (data.resCode === 0) {
            deferred.resolve(data);
          } else {
            deferred.reject(data);
          }
          console.log(data);
        }).error(function (data, header, config, status) {

        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })
  .factory('openDoorService', function ($http, $q) {
    return {
      openDoor: function (normalId, userId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var httpParams = {params: {doorId: normalId, positionId: localStorage.positionId}};
        var Result = new Object();
        $http({
          method: "post",
          url: localStorage.url + "ctrNormalDoor" + "/" + localStorage.userName,
          data: angular.toJson(httpParams),
          charset: 'utf-8',
          dataType: 'json'
        }).success(function (data, header, config, status) {
          console.log(data);
          //响应成功
          Result = data;
          //wait for value from cellback
          if (Result.resCode == 0) {
            if (Result.result.isOpen == 0)
              console.log("门开");
            deferred.resolve(data);
          } else {
            deferred.reject(data);
            console.log(Result.resMsg);
          }
        }).error(function (data, header, config, status) {
          //响应失败
          console.log("开门登录")
        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
  })
