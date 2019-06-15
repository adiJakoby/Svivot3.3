angular.module('myApp').controller('indexController', function ($scope) {
    $scope.user = "Guest";
    $scope.loggedIn = false;

    $scope.$on('loggedIn', function (event, data) {
        $scope.user = data.userName;
        $scope.loggedIn = data.loggedIn;
    })

    $scope.save = function() {
        console.log("In here");
    }
})