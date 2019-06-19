angular.module('myApp').controller('indexController', function ($scope, $window, $http,$q) {
    $scope.user = "Guest";
    $scope.loggedIn = false;

    $scope.$on('loggedIn', function (event, data) {
        $scope.user = data.userName;
        let fav1 = JSON.parse($window.sessionStorage.getItem("favorites"));
        $scope.numOfFav = fav1.length;
        $scope.loggedIn = data.loggedIn;
    })

    $scope.$on('favoritesNumber', function (event, data) {
        let fav1 = JSON.parse($window.sessionStorage.getItem("favorites"));
        $scope.numOfFav = fav1.length;
    })


    $scope.save = function () {
        let token = $window.sessionStorage.getItem("token");
        let pointToDeleteName;
        let pointToAddName;
        let fav;
        var promises = [];

        $http({
            method: "GET",
            url: "http://localhost:3000/private/getSavedPoints",
            headers: {
                'x-auth-token': token,
            }
        }).then(function (res) {
            for (let i = 0; i < res.data.length; i++) {
                pointToDeleteName = res.data[i].NAME;
                promises.push($http({
                        method: "DELETE",
                        url: "http://localhost:3000/private/deleteSavedPoint",
                        headers: {
                            'x-auth-token': token,
                        },
                        params: {
                            pointName: pointToDeleteName
                        }
                    }
                ).then(function (res) {
                        console.log(res.data);
                    }, function (err) {
                        console.log(err)
                    }
                ));
            }
        }, function (err) {
            console.log(err)
        })

        $q.all(promises).then(function () {
            fav = JSON.parse($window.sessionStorage.getItem("favorites"));
            var promises_sec = [];
            for (let i = 0; i < fav.length; i++) {
                pointToAddName = fav[i].NAME;
                promises_sec.push($http({
                        method: "PUT",
                        url: "http://localhost:3000/private/addSavePoint",
                        headers: {
                            'x-auth-token': token,
                        },
                        params: {
                            pointName: pointToAddName,
                            i: i
                        }
                    }
                ).then(function (res) {
                        console.log(res.data);
                    }, function (err) {
                        console.log(err)
                    }
                ));
            }
            $q.all(promises_sec).then(function () {
                $window.alert("Your changes have been saved!")
            })
        })
    }

})