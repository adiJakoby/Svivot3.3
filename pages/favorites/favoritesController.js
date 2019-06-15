angular.module('myApp').controller('favoritesController', function ($scope,$q, $http,$window) {
    let self = $scope;
    $scope.poiShow = false;
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
                j++;
            }
        }
        self.savedPoints[k] = fourPoints;
        k++;
    }
    // //get last two saved points
    // $http({
    //     method: "GET",
    //     url: "http://localhost:3000/private/getSavedPoints",
    //     headers: {
    //         'x-auth-token': token,
    //     }
    // }).then(function (res) {
    //     let i = 0;
    //     let j = 0;
    //     let k = 0;
    //     for (j; j < res.data.length;) {
    //         let threePoints = [];
    //         for (i = 0; i < 3; i++) {
    //             if (j < res.data.length) {
    //                 threePoints[i] = res.data[j];
    //                 j++;
    //             }
    //         }
    //         self.points[k] = threePoints;
    //         k++;
    //     }
    // }, function (err) {
    //     console.log(err)
    // })

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
        var promises = [];

        for (; i < self.savedPoints.length; i++) {
            let name = self.savedPoints[i].NAME;
            {
                let sortPosition = i;
                promises.push($http({
                    method: "GET",
                    url: "http://localhost:3000/getPoint",
                    params: {
                        pointName: name
                    }
                }).then(res => {
                    res.data[0].NAME = name;
                    toSort[sortPosition] = res.data[0];
                }, function (err) {
                    console.log(err)
                }));
            }
        }

        $q.all(promises).then(function () {
            console.log(toSort);
            toSort.sort(sortByProperty('rank'));
            console.log("*****");
            console.log(toSort);

            self.points = [];
            i = 0;
            let j = 0;
            let k = 0;
            for (j; j < toSort.length;) {
                let fourPoints = [];
                for (i = 0; i < 4; i++) {
                    if (j < toSort.length) {
                        toSort[j].PICTURE = "images/" + toSort[j].NAME + ".jpg";
                        fourPoints[i] = toSort[j];
                        j++;
                    }
                }
                self.savedPoints[k] = fourPoints;
                k++;
            }
        })
    }
})
;




