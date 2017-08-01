/**
 * Created by ssalvo on 30/07/2017.
 */


var trimanCtrls = angular.module('3manCtrls',[]);

trimanCtrls.controller('mainCtrl',['$scope', '$http', function ($scope,$http) {
    $scope.iisObjResult = {};
    $scope.iisObjResult.data = {};

    $scope.iisDetails = function () {

        $http.get("/listLogDetails")
            .then(function (details) {
                $scope.iisObjResult.data = details.data;
            });
    };
}]);
