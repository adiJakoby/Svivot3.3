angular.module('myApp').controller('searchPOIController', function ($scope, $q, $http, $window) {
    $scope.poiShow = false;

    let self = $scope;
    self.points = [];
    self.allPoints = [];
    let fav;
    self.currPoint = "";
    if($scope.loggedIn) {
        fav =  JSON.parse(sessionStorage.getItem("favorites"));
    }

    $http({
        method: "GET",
        url: "http://localhost:3000/getAllPoints",
    }).then(function (res) {
        self.allPoints = res.data;
        let i = 0;
        let j = 0;
        let k = 0;
        for (j; j < res.data.length;) {
            let threePoints = [];
            for (i = 0; i < 3; i++) {
                if (j < res.data.length) {
                    let isSaved = false;
                    if($scope.loggedIn) {
                        let m = 0;
                        for(; m < fav.length; m++){
                            if(fav[m].NAME == res.data[j].NAME){
                                isSaved = true;
                            }
                        }
                    }
                    res.data[j].saved = isSaved;
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

    $scope.setCurrPoint = function (name) {
        self.currPoint = name;
    }

    $scope.reset = function () {
        self.points = [];
        self.allPoints = [];

        $http({
            method: "GET",
            url: "http://localhost:3000/getAllPoints",
        }).then(function (res) {
            self.allPoints = res.data;
            let i = 0;
            let j = 0;
            let k = 0;
            for (j; j < res.data.length;) {
                let threePoints = [];
                for (i = 0; i < 3; i++) {
                    if (j < res.data.length) {
                        let isSaved = false;
                        if($scope.loggedIn) {
                            let m = 0;
                            for(; m < fav.length; m++){
                                if(fav[m].NAME == res.data[j].NAME){
                                    isSaved = true;
                                }
                            }
                        }
                        res.data[j].saved = isSaved;
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

    $scope.unSave = function (name) {
        let temp = [];
        for(let i = 0; i < fav.length; i++){
            if(fav[i].NAME == name){

            }else{
                temp.push(fav[i]);
            }
        }
        fav = temp;
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
            $scope.reset();
        }, function (err) {
            console.log(err)
        })
    }

    $scope.review = function () {
        let token = $window.sessionStorage.getItem("token");
        let comment = document.getElementById('comment').value;
        let point = self.currPoint;
        let rank = 0
        if(document.getElementById("1").checked){
            rank = 1;
        }
        else if(document.getElementById("2").checked){
            rank = 2;
        }
        else if(document.getElementById("3").checked){
            rank = 3;
        }
        else if(document.getElementById("4").checked){
            rank = 4;
        }
        else if(document.getElementById("5").checked){
            rank = 5;
        }

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
            $window.alert("Your review has added,\nThank you")
        }, function (err) {
            console.log(err)
        });
    }

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
            $scope.imgSource = res.data[0].numofviews.PICTURE;
            $scope.description = res.data[0].description;
            $scope.numOfViews = res.data[0].numofviews;
            $scope.rank = res.data[0].rank;
            $scope.review = res.data[0].REVIEW;

            $scope.poiShow = true;
        }, function (err) {
            console.log(err)
        })

    }

    $scope.search = function () {
        self.points = [];
        let pName = document.getElementById('input').value;
        $http({
            method: "GET",
            url: "http://localhost:3000/getPoint",
            params: {
                pointName: pName
            }
        }).then(function (res) {
            if (res.data == "no points to show") {
                window.alert("The point: " + pName + " \nIs not exist,\nPlease try again. ")
            } else {
                console.log(res.data);
                res.data[0].NAME = pName;
                res.data[0].PICTURE = "images/" + pName + ".jpg";
                self.allPoints = res.data;
                self.points[0] = res.data;
            }
        }, function (err) {
            console.log(err)
        })
    }


    $scope.filterByCategory = function (category) {
        self.points = [];

        $http({
            method: "GET",
            url: "http://localhost:3000/getPointsByCatagory",
            params: {
                category: category
            }
        }).then(function (res) {
            self.allPoints = res.data;
            let i = 0;
            let j = 0;
            let k = 0;
            for (j; j < res.data.length;) {
                let threePoints = [];
                for (i = 0; i < 3; i++) {
                    if (j < res.data.length) {
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

    $scope.sort = function () {
        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
            };
        };

        let i = 0;
        let toSort = [];
        var promises = [];

        for (; i < self.allPoints.length; i++) {
            let name = self.allPoints[i].NAME;
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
                let threePoints = [];
                for (i = 0; i < 3; i++) {
                    if (j < toSort.length) {
                        toSort[j].PICTURE = "images/" + toSort[j].NAME + ".jpg";
                        threePoints[i] = toSort[j];
                        j++;
                    }
                }
                self.points[k] = threePoints;
                k++;
            }
        })
    }

});




