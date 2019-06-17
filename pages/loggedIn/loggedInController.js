angular.module('myApp').controller('loggedInController', function ($scope, $http, $window) {
    let self = $scope;
    $scope.poiShow = false;
    let savedPoints = [];
    let favoritesPoints = [];
    self.savedPoints = [];
    self.favoritesPoints = [];
    $scope.numOfPoints="";
    self.currPoint="";
    $scope.numOfReviews="";


    let fav=[];

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
                    pointName: res.data[i].NAME
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
            savedPoints[j].saved = true;
            $http({
                method: "GET",
                url: "http://localhost:3000/getPoint",
                params: {
                    pointName: res.data[j].name
                }
            }).then(function (res) {
                self.savedPoints[j] = res.data[0];
                self.savedPoints[j].saved = true;
                for(let x=0;x<self.favoritesPoints.length;x++){
                    if(self.savedPoints[j].NAME==self.favoritesPoints[x].NAME){
                        self.favoritesPoints[x].saved=true;
                    }
                }
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
            if(res.data.length==2){
                $scope.review1=res.data[1].REVIEW;
                $scope.date1 =(res.data[1].DATE).substring(0,10);
                $scope.numOfReviews="two";
            }
            else if(res.data.length==1){
                $scope.numOfReviews="two";
                $scope.review1=""
                $scope.date1 ="";
            }
            else{
                $scope.numOfReviews="zero";
            }
            $scope.poiShow = true;
        }, function (err) {
            console.log(err)
        })
    }

    $scope.unSave = function (name) {
        let fav =  JSON.parse(sessionStorage.getItem("favorites"));
        let temp = [];
        for(let i = 0; i < fav.length; i++){
            if(fav[i].NAME == name){
                fav[i].saved=false;
            }else{
                temp.push(fav[i]);
            }
        }
        fav = temp;
        $window.sessionStorage.setItem("favorites", JSON.stringify(fav));
        $scope.reset();
    }

    $scope.reset = function () {
        self.savedPoints=[];
        let allPoints = JSON.parse($window.sessionStorage.getItem("favorites"));
        let length =  allPoints.length;
        if(length>2){
            length=2;
        }
        for(let y=0;y<length;y++){
            allPoints[y].saved=true;
        }
        self.savedPoints = allPoints;
        for(let x=0;x<self.favoritesPoints.length;x++){
            if(self.savedPoints[j]==self.favoritesPoints[x]){
                self.favoritesPoints[x].saved=true;
            }
        }
    }

    $scope.save = function (name) {
        $http({
            method: "GET",
            url: "http://localhost:3000/getPoint",
            params: {
                pointName: name
            }
        }).then(function (res) {
            res.data[0].saved=true;
            fav.push(res.data[0]);
            $window.sessionStorage.setItem("favorites", JSON.stringify(fav));
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
});
