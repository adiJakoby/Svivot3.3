angular.module('myApp').controller('favoritesController', function ($scope, $q, $http, $window) {
    let self = $scope;
    $scope.poiShow = false;
    self.toSortPoints = [];
    self.savedPoints = [];

    let token = $window.sessionStorage.getItem("token");

    let allPoints = JSON.parse($window.sessionStorage.getItem("favorites"));

    let i = 0;
    let j = 0;
    let k = 0;
    for (j; j < allPoints.length;) {
        let fourPoints = [];
        for (i = 0; i < 4; i++) {
            if (j < allPoints.length) {
                fourPoints[i] = allPoints[j];
                j++;
            }
        }
        self.savedPoints[k] = fourPoints;
        k++;
    }

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

    $scope.sortByRank = function () {
        /**
         * Generic array sorting
         *
         * @param property
         * @returns {Function}
         */
        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
            };
        };

        let toSort = allPoints;
        toSort.sort(sortByProperty('rank'));
        console.log("*****");
        console.log(toSort);

        self.savedPoints = [];
        i = 0;
        let j = 0;
        let k = 0;
        for (j; j < toSort.length;) {
            let fourPoints = [];
            for (i = 0; i < 4; i++) {
                if (j < toSort.length) {
                    fourPoints[i] = toSort[j];
                    j++;
                }
            }
            self.savedPoints[k] = fourPoints;
            k++;
        }
    }
});




