angular.module('myApp').controller('loggedInController', function ($scope, $http ,$window) {
    let self = $scope;
    $scope.firstPointName = "hey";

    let point0 = [];
    let point1 = [];
    let token = $window.sessionStorage.getItem("token");

    $http({
        method: "GET",
        url: "http://localhost:3000/private/getTwoPopularPoints",
        headers: {
            'x-auth-token': token,
        }
    }).then(function (res) {
        let name0 = res.data[0].NAME;
        let name1 = res.data[1].NAME;
        $scope.firstPointName = name0;
        $scope.secondPointName = name1;
        $scope.firstPointImage = 'images/'+name0+'.jpg';
        $scope.secondPointImage = 'images/'+name1+'.jpg';
    }, function (err) {
        console.log(err)
    });
    //get last two saved points
    $http({
        method: "GET",
        url: "http://localhost:3000/private/getLastTwoSavedPoints",
        headers: {
            'x-auth-token': token,
        }
    }).then(function (res) {
        console.log(res.data);
        let savedImage1 = res.data[0].name;
        let savedImage2 = res.data[1].name;
        $scope.firstSavePointName = savedImage1;
        $scope.secondSavedPointName = savedImage2;
        $scope.firstSavedPointImage = 'images/'+savedImage1+'.jpg';
        $scope.secondSavedPointImage = 'images/'+savedImage2+'.jpg';
    }, function (err) {
        console.log(err)
    })
});
