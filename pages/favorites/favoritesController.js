angular.module('myApp').controller('favoritesController', function ($scope, $q, $http, $window) {
    let self = $scope;
    $scope.poiShow = false;
    self.toSortPoints = [];
    let savedPoints = [];
    self.savedPoints = [];

    let token = $window.sessionStorage.getItem("token");

    savedPoints = JSON.parse($window.sessionStorage.getItem("favorites"));

    let i = 0;
    let j = 0;
    let k = 0;
    for (j; j < savedPoints.length;) {
        let fourPoints = [];
        for (i = 0; i < 4; i++) {
            if (j < savedPoints.length) {
                fourPoints[i] = savedPoints[j];
                self.toSortPoints[j] = savedPoints[i];
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

        let i = 0;
        let toSort = [];
        //savedPoints = JSON.parse($window.sessionStorage.getItem("favorites"));

        for (; i < self.savedPoints.length; i++) {
            let temp = self.savedPoints[i];
            console.log(temp);
            for (let j = 0; j < self.savedPoints[i].length; j++) {
                if (i < self.savedPoints.length) {
                    toSort[i] = savedPoints[j];
                    i++;
                }
            }
        }
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




