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
                let exist = false;
                let fav = JSON.parse($window.sessionStorage.getItem("favorites"));
                for (let i = 0; i < res.data.length; i++) {
                    exist = false;
                    for (let j = 0; j < fav.length; j++) {
                        if (res.data[i].NAME == fav[j].NAME) {
                            exist = true;
                        }
                    }
                    if (!exist) {
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
                            },function (err) {
                                console.log(err)
                            }
                        );
                    }
                }

                for (let i = 0; i < fav.length; i++) {
                    exist = false;
                    for (let j = 0; j < res.data.length; j++) {
                        if (res.data[j].NAME == fav[i].NAME) {
                            exist = true;
                        }
                    }
                    if (!exist) {
                        let name = fav[i].NAME;
                        $http({
                                method: "PUT",
                                url: "http://localhost:3000/private/addSavePoint",
                                headers: {
                                    'x-auth-token': token,
                                },
                                params: {
                                    pointName: name,
                                    i : 1
                                }
                            }
                        ).then(function (res) {
                            console.log(res.data);
                            $window.alert("Your changes have been saved!")
                            },function (err) {
                                console.log(err)
                            }
                        );
                    }
                }

            },

            function (err) {
                console.log(err)
            }
        )
        ;

    }
})