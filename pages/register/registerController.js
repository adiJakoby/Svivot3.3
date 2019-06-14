// register controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $window) {
        $scope.myFunc = function () {
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let city = document.getElementById("city").value;
            let userName = document.getElementById("userName").value;
            let password = document.getElementById("password").value;
            let e = document.getElementById("country");
            let country = e.options[e.selectedIndex].value;
            let c1 = document.getElementById("category1");
            let domain1 = c1.options[c1.selectedIndex].value;
            let question = document.getElementById("question").value;
            let answer = document.getElementById("answer").value;
            let c2 = document.getElementById("category2");
            let domain2 = c2.options[c2.selectedIndex].value;
            let email = document.getElementById("email").value;
            self = this;
            if(domain1 != domain2) {
                let formdata = {
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    userName: userName,
                    password: password,
                    country: country,
                    email: email,
                    domain1: domain1,
                    domain2: domain2,
                    question: question,
                    answer: answer,
                };

                $http.post('http://localhost:3000/register', formdata).then(function (response) {
                    if (response.data == "one or more of your inputs are wrong") {
                        window.alert("one or more of your inputs are wrong");
                        document.getElementById("firstName").value = "";
                        document.getElementById("lastName").value = "";
                        document.getElementById("city").value = "";
                        document.getElementById("userName").value = "";
                        document.getElementById("password").value = "";
                        let e = document.getElementById("country");
                        e.options[e.selectedIndex].value = "";
                        let c1 = document.getElementById("category1");
                        c1.options[c1.selectedIndex].value = "";
                        document.getElementById("question").value = "";
                        document.getElementById("answer").value = "";
                        document.getElementById("category2").value = "";
                        let c2 = document.getElementById("category2");
                        c2.options[c2.selectedIndex].value = "";
                        document.getElementById("email").value = "";
                    } else {
                        sessionStorage.setItem("token", response.data);
                        alert("Congratulations! \nYou are registered to the best website! \nTry to Log in");
                        $window.location.href = "#!logIn"
                    }
                    $scope.myWelcome = response.data;

                });
            }
            else{
                alert("You have to choose two different categories!");
                let c1 = document.getElementById("category1");
                c1.options[c1.selectedIndex].value = "";
                let c2 = document.getElementById("category2");
                c2.options[c2.selectedIndex].value = "";
            }
        }




        // $http.get('http://localhost:3000/hello').then(function (response) {
        //     $scope.myWelcome = response.data;
        // });
    });