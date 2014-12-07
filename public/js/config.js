window.app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);

        $routeProvider
        
        .when('/', { controller: 'indexCtrl', templateUrl: 'views/index.html' })

        .otherwise('/', { controller: 'indexCtrl', templateUrl: 'views/index.html' })

    }
]);

window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('');
    }
]);