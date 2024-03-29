angular.module('myApp').controller('favoritesController', function ($scope, $q, $http, $window) {
    let self = $scope;
    $scope.poiShow = false;
    self.toSortPoints = [];
    self.savedPoints = [];
    $scope.numOfPoints = "";
    $scope.numOfReviews = "";
    self.currPoint = "";
    $scope.numOfFavorites = [];

    let token = $window.sessionStorage.getItem("token");

    let allPoints = JSON.parse($window.sessionStorage.getItem("favorites"));

    var setNumOfPoints = function () {
        for (let i = 0; i < allPoints.length; i++) {
            $scope.numOfFavorites[i] = i;
        }
    }

    setNumOfPoints();

    if (allPoints.length > 0) {
        $scope.numOfPoints = "Bigger";
    } else {
        $scope.numOfPoints = "zero";
    }

    for (let y = 0; y < allPoints.length; y++) {
        allPoints[y].saved = true;
    }

    let i = 0;
    let j = 0;
    let k = 0;
    for (j; j < allPoints.length;) {
        let fourPoints = [];
        for (i = 0; i < 4; i++) {
            if (j < allPoints.length) {
                fourPoints[i] = allPoints[j];
                fourPoints[i].index = j;
                // fourPoints[i].saved=true;
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
            $scope.date = (res.data[0].DATE).substring(0, 10);
            if (res.data.length == 2) {
                $scope.review1 = res.data[1].REVIEW;
                $scope.date1 = (res.data[1].DATE).substring(0, 10);
                $scope.numOfReviews = "two";
            } else if (res.data.length == 1) {
                $scope.numOfReviews = "two";
                $scope.review1 = ""
                $scope.date1 = "";
            } else {
                $scope.numOfReviews = "zero";
            }
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
        toSort.sort(sortByProperty('RANK'));
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

    $scope.saveChanges = function () {
        let pointsByOrder = [];
        let pointName = "";
        let order;
        let thePoint;
        let indexex=[];

        for (let y = 0; y < allPoints.length; y++) {
            thePoint = allPoints[y];
            pointName = allPoints[y].NAME;
            order = document.getElementById(pointName).value;
            thePoint.ORDER = parseInt(order.substring(7), 10);
            indexex=parseInt(order.substring(7), 10);
            pointsByOrder[y] = thePoint;
        }
        let o=0;
        // let x;
        for(o;o<indexex.length;o++){
            let currentIndex=indexex[o];
            for(let x=o+1;x<indexex.length;x++){
                if(indexex[x]==currentIndex){
                    $window.alert("You insert the same index twice, please try again");
                }
            }
        }

        /**
         * Generic array sorting
         *
         * @param property
         * @returns {Function}
         */
        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? -1 : 1));
            };
        };
        let toSort = pointsByOrder;
        toSort.sort(sortByProperty('ORDER'));
        console.log("*****");
        console.log(toSort);

        self.savedPoints = [];

        i = 0;
        j = 0;
        k = 0;
        for (j; j < pointsByOrder.length;) {
            let fourPoints = [];
            for (i = 0; i < 4; i++) {
                if (j < pointsByOrder.length) {
                    pointsByOrder[j].saved = true;
                    fourPoints[i] = pointsByOrder[j];
                    j++;
                }
            }
            self.savedPoints[k] = fourPoints;
            k++;
        }
        $window.sessionStorage.setItem('favorites', JSON.stringify(pointsByOrder));
    }

    $scope.reset = function () {
        self.savedPoints = [];
        let allPoints = JSON.parse($window.sessionStorage.getItem("favorites"));

        for (let y = 0; y < allPoints.length; y++) {
            allPoints[y].saved = true;
        }

        let i = 0;
        let j = 0;
        let k = 0;
        for (j; j < allPoints.length;) {
            let fourPoints = [];
            for (i = 0; i < 4; i++) {
                if (j < allPoints.length) {
                    fourPoints[i] = allPoints[j];
                    // fourPoints[i].saved=true;
                    j++;
                }
            }
            self.savedPoints[k] = fourPoints;
            k++;
        }
    }

    $scope.sortByCategory = function () {
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
        toSort.sort(sortByProperty('CATEGORY'));
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

    $scope.unSave = function (name) {
        let fav = JSON.parse(sessionStorage.getItem("favorites"));
        let temp = [];
        for (let i = 0; i < fav.length; i++) {
            if (fav[i].NAME == name) {
                fav[i].saved = false;
            } else {
                temp.push(fav[i]);
            }
        }
        fav = temp;
        $window.sessionStorage.setItem("favorites", JSON.stringify(fav));
        $scope.$emit('favoritesNumber');
        $scope.reset();
    }
    $scope.save = function (name) {
        $http({
            method: "GET",
            url: "http://localhost:3000/getPoint",
            params: {
                pointName: name
            }
        }).then(function (res) {
            fav.push(res.data[0]);
            $window.sessionStorage.setItem("favorites", JSON.stringify(fav));
            $scope.$emit('favoritesNumber');
            $scope.reset();
        }, function (err) {
            console.log(err)
        })
    }

    $scope.setCurrPoint = function (name) {
        self.currPoint = name;
    }

    $scope.review = function () {
        let token = $window.sessionStorage.getItem("token");
        let comment = document.getElementById('comment').value;
        let point = self.currPoint;
        let rank = 0
        if (document.getElementById("1").checked) {
            rank = 1;
        } else if (document.getElementById("2").checked) {
            rank = 2;
        } else if (document.getElementById("3").checked) {
            rank = 3;
        } else if (document.getElementById("4").checked) {
            rank = 4;
        } else if (document.getElementById("5").checked) {
            rank = 5;
        }

        // self.currPoint.rank.rank);
        // self.currPoint.review.add(comment);
        console.log(rank);
        $http({
            method: "PUT",
            url: "http://localhost:3000/private/addRank",
            headers: {
                'x-auth-token': token,
            },
            params: {
                pointName: point,
                rank: rank
            }
        }).then(function (res) {
            console.log(res.data);
        }, function (err) {
            console.log(err)
        });

        $http({
            method: "PUT",
            url: "http://localhost:3000/private/addReview",
            headers: {
                'x-auth-token': token,
            },
            params: {
                pointName: point,
                review: comment
            }
        }).then(function (res) {
            console.log(res.data)
            $window.alert("Your review has added,\nThank you")
        }, function (err) {
            console.log(err)
        });
    }
})
;