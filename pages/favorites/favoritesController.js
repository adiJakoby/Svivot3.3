angular.module('myApp').controller('favoritesController', function ($scope, $http) {
    $scope.poiShow = false;

    let self = $scope;
    self.points = [];

    sessionStorage.getItem('favorites');

    $http({
        method: "GET",
        url: "http://localhost:3000/getAllPoints",
    }).then(function (res) {
        let i = 0;
        let j = 0;
        let k = 0;
        for (j; j < res.data.length;) {
            let threePoints = [];
            for (i = 0; i < 3; i++) {
                if(j < res.data.length){
                    threePoints[i] = res.data[j];
                    j++;
                }
            }
            self.points[k] = threePoints;
            k++;
        }

        // self.points = res.data;

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
            console.log(res.data);
            $scope.name = name;
            $scope.imgSource = 'images/3.JPG';
            $scope.description = res.data[0].description;
            $scope.numOfViews = res.data[0].numofviews;
            $scope.rank = res.data[0].rank;
            $scope.review = res.data[0].REVIEW;

            $scope.poiShow = true;
        }, function (err) {
            console.log(err)
        })

    }

    $scope.filterByCategory = function (category) {
        self.points = [];

        $http({
            method: "GET",
            url: "http://localhost:3000/getPointsByCategory",
            params: {
                category: name
            }
        }).then(function (res) {
            let i = 0;
            let j = 0;
            let k = 0;
            for (j; j < res.data.length;) {
                let threePoints = [];
                for (i = 0; i < 3; i++) {
                    if(j < res.data.length){
                        threePoints[i] = res.data[j];
                        j++;
                    }
                }
                self.points[k] = threePoints;
                k++;
            }

            // self.points = res.data;

        }, function (err) {
            console.log(err)
        })
    }


});




