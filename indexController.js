angular.module('myApp').controller('indexController', function ($scope, $window, $http) {
    $scope.user = "Guest";
    $scope.loggedIn = false;

    $scope.$on('loggedIn', function (event, data) {
        $scope.user = data.userName;
        $scope.loggedIn = data.loggedIn;
    })

    $scope.save = function () {
        let token = $window.sessionStorage.getItem("token");

        $http({
            method: "GET",
            url: "http://localhost:3000/private/getSavedPoints",
            headers: {
                'x-auth-token': token,
            }
        }).then(function (res) {
                let fav = JSON.parse($window.sessionStorage.getItem("favorites"));
                for (let i = 0; i < res.data.length; i++) {
                    let name = res.data[i].NAME;
                    $http({
                            method: "DELETE",
                            url: "http://localhost:3000/private/deleteSavedPoint",
                            headers: {
                                'x-auth-token': token,
                            },
                            params: {
                                pointName: name
                            }
                        }
                    ).then(function (res) {
                            console.log(res.data);
                        }, function (err) {
                            console.log(err)
                        }
                    );
                }
                for (let i = 0; i < fav.length; i++) {
                    let name = fav[i].NAME;
                    $http({
                            method: "PUT",
                            url: "http://localhost:3000/private/addSavePoint",
                            headers: {
                                'x-auth-token': token,
                            },
                            params: {
                                pointName: name,
                                i: i
                            }
                        }
                    ).then(function (res) {
                            console.log(res.data);
                        }, function (err) {
                            console.log(err)
                        }
                    );
                    $window.alert("Your changes have been saved!")
                }
            },

            function (err) {
                console.log(err)
            }
        )
        ;

    }
})