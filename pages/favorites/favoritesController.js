// var images = [{
//     "src": "images/Champs-Elysees.jpg",
//     "caption": "Champs-Elysees"
//     },
//     {
//         "src": "images/Eiffel Tower.jpg",
//         "caption": "Eiffel Tower.jpg"
//     },
//     {
//         "src": "images/Ile Saint-Louis.jpg",
//         "caption": "Sisay and Maeve"
//     },
//     {
//         "src": "images/La Cuisine Paris - Cooking Classes.jpg",
//         "caption": "La Cuisine Paris - Cooking Classes"
//     },
//     {
//         "src": "images/Louvre Museum.jpg",
//         "caption": "Louvre Museum"
//     },
//     {
//         "src": "images/Parc de Bagatelle.jpg",
//         "caption": "Parc de Bagatelle"
//     }
// ];
// angular
//     .module('myApp')
//     .controller('favoritesController', function ($scope) {
//
//         var photoSource = [{
//             "src": "images/Champs-Elysees.jpg",
//             "caption": "Champs-Elysees"
//         },
//             {
//                 "src": "images/Eiffel Tower.jpg",
//                 "caption": "Eiffel Tower.jpg"
//             },
//             {
//                 "src": "images/Ile Saint-Louis.jpg",
//                 "caption": "Sisay and Maeve"
//             },
//             {
//                 "src": "images/La Cuisine Paris - Cooking Classes.jpg",
//                 "caption": "La Cuisine Paris - Cooking Classes"
//             },
//             {
//                 "src": "images/Louvre Museum.jpg",
//                 "caption": "Louvre Museum"
//             },
//             {
//                 "src": "images/Parc de Bagatelle.jpg",
//                 "caption": "Parc de Bagatelle"
//             }
//         ];
//
//         var body = "<table width='100%' height='575'>";
//
//         var row=4;
//         var col=4;
//
//         for(var i=0;i<row;i++){
//
//             body += "<tr>";
//
//             for(var j=0;j<col;j++)
//             {
//
//                 body +="<td> <img width='100%' height='100px' id='"+i+j+"' src='" + photoSource[i][j] + "'onmouseover=borderImage(this);></td>";
//             }
//             body += "</tr>";
//         }
//
//         body += "</table>";
//
//         $("#divPhoto").html(body);
//     });
//
//
// function borderImage(x) {
//     x.style.border = "2px solid yellow";
// }

angular.module('myApp')
    .controller('favoritesController', function ($scope) {

        var photoSource = [
            [ "images/Champs-Elysees.jpg","images/Eiffel Tower.jpg","images/Ile Saint-Louis.jpg"],
            [ "images/Louvre Museum.jpg","images/Parc de Bagatelle.jpg","images/La Cuisine Paris - Cooking Classes.jpg"]
        ];

        var body = "<table width='100%' height='575'>";

        var row=2;
        var col=3;

        for(var i=0;i<row;i++){

            body += "<tr>";

            for(var j=0;j<col;j++)
            {

                body +="<td> <img width='100%' height='100px' id='"+i+j+"' src='" + photoSource[i][j] + "'onmouseover=borderImage(this);></td>";
            }
            body += "</tr>";
        }

        body += "</table>";

        $("#divPhoto").html(body);
    });
