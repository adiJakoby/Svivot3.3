angular.module('myApp').controller('loggedInController', function ($scope, $http, $window) {
    let self = $scope;
    $scope.poiShow = false;
    let savedPoints = [];
    let favoritesPoints = [];
    self.savedPoints = [];
    self.favoritesPoints = [];
    $scope.numOfPoints="";

    let token = $window.sessionStorage.getItem("token");

    $http({
        method: "GET",
        url: "http://localhost:3000/private/getTwoPopularPoints",
        headers: {
            'x-auth-token': token,
        }
    }).then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
            favoritesPoints[i] = res.data[i];
            $http({
                method: "GET",
                url: "http://localhost:3000/getPoint",
                params: {
                    pointName: favoritesPoints[i].NAME
                }
            }).then(function (res) {
                self.favoritesPoints[i] = res.data[0];
            }, function (err) {
                console.log(err)
            })
        }
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
        if(res.data=="no points saved"){
            $scope.numOfPoints="zero";
        }
        else{
            $scope.numOfPoints="Bigger";
        }
        for (let j = 0; j < res.data.length; j++) {
            savedPoints[j] = res.data[j];
            $http({
                method: "GET",
                url: "http://localhost:3000/getPoint",
                params: {
                    pointName: savedPoints[j].name
                }
            }).then(function (res) {
                self.savedPoints[j] = res.data[0];
            }, function (err) {
                console.log(err)
            })
        }
    }, function (err) {
        console.log(err)
    })

    $scope.toShow = function (name) {
        $http({
            method: "GET",
            url: "http://localhost:3000/getPoint",
            params: {
                pointName: name
            }
        }).then(function (res) {
            $scope.name = name;
            $scope.imgSource = res.data[0].PICTURE;
            $scope.description = res.data[0].description;
            $scope.numOfViews = res.data[0].numofviews;
            $scope.rank = res.data[0].rank;
            $scope.review = res.data[0].REVIEW;

            $scope.poiShow = true;
        }, function (err) {
            console.log(err)
        })
    }
});
