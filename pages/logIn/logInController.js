// log-in controller
angular.module("myApp")
    .controller("logInController", function ($scope, $http, $window) {
        $scope.myFunc = function () {
            let userName = (document.getElementById("userName").value);
            let password = (document.getElementById("password").value);
            console.log(userName +" " + password);
            self = this;

            let formdata = {
                userName: userName,
                password: password,
            };

            $http.post('http://localhost:3000/logIn', formdata).then(function (response) {
                if(response.data == "one or more of your inputs are wrong"){
                    window.alert("one or more of your inputs are wrong");
                    document.getElementById("userName").value = "";
                    document.getElementById("password").value = "";
                }
                else{
                    sessionStorage.setItem("token", response.data);
                    let token = response.data;

                    $http({
                        method: "GET",
                        url: "http://localhost:3000/private/getSavedPoints",
                        headers: {
                            'x-auth-token': token,
                        }
                    }).then(function (res) {
                        sessionStorage.setItem("favorites", JSON.stringify(res.data));
                    }, function (err) {
                        console.log(err)
                    });

                    $scope.$emit('loggedIn', {userName: userName, loggedIn: true});
                    $window.location.href = "#!loggedIn"
                }
                // $scope.myWelcome = response.data;
            });
        }
    });