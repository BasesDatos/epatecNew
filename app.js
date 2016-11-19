var epa = angular.module("epatec",["ngRoute"]);

epa.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/', {
               templateUrl: 'principal.html',
               controller: 'addUserContr'
            }).
            when('/addUser', {
               templateUrl: 'Add_User.html',
               controller: 'addUserContr'
            }).
            when('/login', {
               templateUrl: 'Log_In.html',
               controller: 'addUserContr'
            }).
            when('/provedor', {
               templateUrl: 'provedores.html',
               controller: 'addUserContr'
            }).
            when('/administracion', {
               templateUrl: 'menuAdmi.html',
               controller: 'addUserContr'
            }).
            when('/verProvedor', {
               templateUrl: 'verProvedores.html',
               controller: 'verProvedorContr'
            }).
            when('/categorias', {
               templateUrl: 'categorias.html',
               controller: 'verProvedorContr'
            }).
            when('/verCategoria', {
               templateUrl: 'verCategoria.html',
               controller: 'verCategoriaContr'
            }).
            when('/productos', {
               templateUrl: 'productos.html',
               controller: 'verCategoriaContr'
            }).
            when('/pedido', {
               templateUrl: 'pedido.html',
               controller: 'pedidoContr'
            }).
            otherwise({
               redirectTo: '/'
            });
         }]);



  
     