// log-in controller
angular.module("myApp")
    .controller("restorePasswordController", function ($scope, $http) {
        $scope.myFunc = function () {
            let userName = (document.getElementById("userName").value);
            let question = (document.getElementById("question").value);
            let answer = (document.getElementById("answer").value);
            console.log(userName + " " + question + " " + answer);
            self = this;

            let formdata = {
                userName: userName,
                question: question,
                answer: answer,
            };

            $http.post('http://localhost:3000/restorePassword', formdata).then(function (response) {
                if(response.data == "one or more of your inputs are wrong"){
                    window.alert("one or more of your inputs are wrong");
                    document.getElementById("userName").value = "";
                    document.getElementById("question").value = "";
                    document.getElementById("answer").value = "";
                }
                else{
                    console.log((response.data)[0]);
                    window.alert("Your password is: "+ response.data[0]['PASSWORD']);
                }
            });
        }
    });