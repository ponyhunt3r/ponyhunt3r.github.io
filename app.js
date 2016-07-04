var Store = angular.module("Store", ['ui.bootstrap', 'ngRoute']);

Store.config(function($routeProvider){
    $routeProvider

        .when('/product', {
            templateUrl: 'ProductPage.html',
            controller: 'StoreController'
        })

        .when('/', {
            templateUrl: 'home.html',
            controller: 'StoreController'
        })

});

Store.directive('catResults', function(){
    return{
        restrict: 'E',
        templateUrl: 'Bags.html'
    };
});

Store.directive('googleResults', function(){
    return{
        restrict: 'E',
        templateUrl: 'results.html'
    };
});


Store.directive('cartResults', function(){
    return{
        restrict: 'E',
        templateUrl: 'cart.html'
    };
});

Store.directive('topNav', function() {
    return{
        restrict: 'E',
        templateUrl: 'nav.html'
    };
});




Store.controller('StoreController', ['$http', '$scope', function ($http, $scope) {

    //     ** *** **
    //
    //
    //Custom search code
    //
    //
    //     ** *** **

    $scope.query = "";

    $scope.results = [];
    $scope.haveResults = false;
    $scope.currentPage = 1
        , $scope.numPerPage = 10
        , $scope.total = 0,
        $scope.maxSize = 5;


    $scope.getResults = function (pgnumber) {
        var url = 'https://www.googleapis.com/customsearch/v1?' +
            'googlehost=google.co.uk&safe=medium&searchType=image&num=8&start=' + pgnumber + '&' +  //get query
            'key=AIzaSyCOnaiRZtq2zfeTQGAdrFDREUciHckJ3mU&cx=005170073531244001680:l7l4mlzvw0y&q=';
        $http.get(url + $scope.query + "'").success(function (data) {
            $scope.results = data.items;  //results = searched items
            $scope.haveResults = true;
            $scope.action = true;  //hide and show certain elements on index.html
            $scope.total = data.searchInformation.totalResults;  //display total amount of results
            console.log(data.items[2].title);  //a checkout, if everything is going well

        })
    };


    $scope.numPages = function () {
        return Math.ceil($scope.total / $scope.numPerPage); // return  number of all pages
    };

    $scope.$watch('currentPage + numPerPage', function () {


        if ($scope.query) //
            $scope.getResults($scope.currentPage * 8); //call getResult function every time pagination elements is clicked


    });

    //     ** *** **
    //
    //
    //Display the product pictures
    //
    //
    //     ** *** **


    $scope.gallery = ['first.jpg', 'second.jpg', 'third.jpg'];
    $scope.items = 3;
    $scope.current = 'second.jpg'; //the initial picture
    $scope.myArr = [1, 2, 3];

    $scope.toggle = function (newPic) {
        $scope.current = newPic;
    };


    $scope.products = [
        {
            name: 'Sweater',
            price: 19,
            images: [
                'first.jpg', 'second.jpg', 'third.jpg']
        },
        {
            name: 'Shoe',
            price: 8,
            images: ['fourth.jpg', 'fifth.jpg', 'sixth.jpg']
        }
    ];

    $scope.image = 'third.jpg';


    $scope.toggle1 = function () {
        this.image = 'first.jpg';
    };
    $scope.toggle2 = function () {
        this.image = 'second.jpg';
    };


    //     ** *** **
    //
    //
    //Display client reviews
    //
    //
    //     ** *** **


    $scope.note = {};
    $scope.resp = {};

    $scope.addNote = function () {
        $scope.notesCollection.push($scope.note);
    }

    $scope.notesCollection = [
        note1 = {
            title: "My opinion",
            description: "I'm very disappointed with this product",
            author: "Jeremy Clarkson"
        },
        note2 = {
            title: "...",
            description: "I would buy this product once again if only it was available....",
            author: "Richard Hammond"
        },
        note3 = {
            title: "This is what I think",
            description: "It's not easy to put here reasonable advice, but overall product is  worth buying it",
            author: "James May"
        },
        note4 = {
            title: "One big 'NO'",
            description: "It's not easy to put here reasonable advice, but overall product is  worth buying it" +
            "A long OPTIONAL description",
            author: "James Bond"
        }
    ];

    // ****
    //
    //
    //Login controlling
    //
    //
    // *****

    $scope.isLogged = false;   //to show "login" button
    $scope.uName = ''; //to store the name in the field


    $scope.users = [
        {
            name: 'Ania',
            login: 'pony',
            password: 'js',
            salt: 'kcMJkcMJWNukOkcMJ1a9G2tD',
            psalt: 'jskcMJkcMJWNukOkcMJ1a9G2tD'
        },
        {
            name: 'Justin',
            login: 'justinbieber',
            password: 'porshe911',
            salt: 'NTAnZuskcMJNNukOkcMJ1a9G2tD',
            psalt: 'porshe911NTAnZuskcMJNNukOkcMJ1a9G2tD'

        },
        {
            name: 'John',
            login: 'admin',
            password:'admin',
            salt: 'kcMJWRkcMJukOkcMJ1a9G2tD',
            psalt: 'kcMJWRkcMJukOkcMJ1a9G2tD'
        },
        {
            name: 'John',
            login: 'jhny',
            password: 'lena123',
            salt: 'MJ1a9G2WNukOkcMJ1a9G2tD',
            psalt: "lena123MJ1a9G2WNukOkcMJ1a9G2tD"
        }
    ];

    $scope.username = '';
    $scope.password = '';

    $scope.uName = sessionStorage.getItem('userName');
    $scope.isLogged = sessionStorage.getItem('isLogged');

    $scope.toLog = function () {
        $scope.action = true;
        $scope.triesToLog = true;
    }


    $scope.login = function () {

        var login = $scope.username;
        var pass = $scope.password;

        $scope.users.forEach(function (credentials) {
            if (credentials.login == login && pass + credentials.salt== credentials.psalt) {
                $scope.uName = credentials.name;
                sessionStorage.setItem('userName', $scope.uName);
                sessionStorage.setItem('isLogged', true);

                alert("Logged as: " + $scope.uName);

                $scope.triesToLog = false;
                $scope.action = false;

                $scope.uName = sessionStorage.getItem('userName');
                $scope.isLogged = sessionStorage.getItem('isLogged');
            }

        });


        if (!$scope.isLogged){
            alert("Dane nia sa prawidłowe!");
            $scope.triesToLog = true;
            $scope.action = true;}

    };


    $scope.logout = function () {
        $scope.isLogged = false;
        $scope.username = '';

        sessionStorage.setItem('userName', undefined);
        sessionStorage.setItem('isLogged', false);
    };

    // Save data to sessionStorage


// Get saved data from sessionStorage




    $scope.$watch('isLogged', function () {

        $scope.uName = sessionStorage.getItem('userName');
        $scope.isLogged = sessionStorage.getItem('isLogged');

    });

    //
    //
    //
    //
    //
    // Cart controller
    //
    //
    //
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    $scope.cartItems = [];
    $scope.totalPrice = 0;
    $scope.items = $scope.cartItems.length;
    $scope.displayItems = false;
    $scope.catItems = []



    $scope.addToCart = function (product) {

        if (!$scope.isLogged)
        {
            alert("You have to login first!");
            $scope.toLog();
        }

        var item = {
            name: product.name,
            id: product.id,
            price: product.price,
            img: product.img
        }

        $scope.cartItems.push(item);
        console.log(item.name);
        console.log($scope.cartItems.length);
        $scope.items = $scope.cartItems.length;
        $scope.totalPrice;

        $scope.addThemAll = function() {
            for (var i = 0; i < $scope.cartItems.length; i++) {
                $scope.totalPrice = $scope.cartItems[i].price + $scope.totalPrice;
                console.log($scope.cartItems[i].price);
                console.log($scope.totalPrice);
            }
        }

    }

    $scope.removeFromChart = function(product)
    {
        for (var i = 0; i < $scope.cartItems.length; i++){
            if (product.id == $scope.cartItems[i].id){
                console.log(product.id);
                $scope.cartItems.splice(i, 1);
                $scope.items = $scope.cartItems.length;
            }
        }
    }


    $scope.displayCategory = function(categoryName){
        $scope.triesToLog = false;
        $scope.action=true;
        $scope.displayItems = true;
        $scope.displayCart = false;
        $http.get('categories.json').success(function(data){
            //alternative version: $http.get('phones/' + $routeParams.phoneId + '.json'
            $scope.catItems = data.products;
        });

        console.log($scope.catItems);
    }
    $scope.getCart = function(){
        $scope.displayItems=false;
        $scope.action=true;
        $scope.displayCart = true;

    }




}]);



