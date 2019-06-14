angular.module('myApp').controller('homeController', function ($scope, $http) {
    $scope.poiShow = false;

    let self = $scope;
    self.points = [];
    let num = 1;

    $http({
        method : "GET",
        url : "http://localhost:3000/getRandomPoints",
        params : {
            minimalRank : num
        }
    }).then( function (res) {
        function fixAnswer(data) {
            data = "[" + data +"]";
            data = data.replace(/\n/gi, ",");

            return data;
        }

        let ans = fixAnswer(res.data);
        self.points = JSON.parse(ans);
        console.log(self.points);
    }, function (err) {
        console.log(err)
    })

    $scope.toShow = function (name) {
        $http({
            method : "GET",
            url : "http://localhost:3000/getPoint",
            params : {
                pointName: name
            }
        }).then( function (res) {
            console.log(res.data);
            $scope.name = name;
            $scope.imgSource = 'images/3.JPG';
            $scope.description = res.data[0].description;
            $scope.numOfViews = res.data[0].numofviews;
            $scope.rank = res.data[0].rank;
            $scope.review = res.data[0].REVIEW;
            console.log($scope.description)

            $scope.poiShow = true;
        }, function (err) {
            console.log(err)
        })

    }

    $scope.stopShow = function () {
        $scope.poiShow = false;
    }

});




