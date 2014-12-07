window.app.config(['$routeProvider, $locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider

		.when('/', { controller: 'indexCtrl', templateUrl: 'views/index.html' })

	}
]);

window.app.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('');
	}
]);