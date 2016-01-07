angular
  .module('picturemeApp', ['satellizer', 'ui.router', 'ngFileUpload'])
  .constant('API_URL', (function(){
    if(/localhost/.test(document.domain))
      return 'http://localhost:3000'
    else
      return 'http://picture-me-api.herokuapp.com'
  })())
  .config(oauthConfig)
  .config(MainRouter);


oauthConfig.$inject = ['API_URL', '$authProvider'];
function oauthConfig(API_URL, $authProvider) {
  

  $authProvider.facebook({
    url: API_URL + '/auth/facebook',
    clientId: '1535623983421042',
    redirectUri: window.location.href = url;
    });
}

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', { 
      url: "", 
      templateUrl: "home.html"  
    })
    .state('home', { 
      url: "/", 
      templateUrl: "home.html" 
    })
    .state('add_photos', {
      url: "/add_photos", 
      templateUrl: "add_photos.html",
      controller: "GridController"
    })
    
    .state('picture_me', {
      url: "/picture_me",
      templateUrl: "picture_me.html",
      controller: "GridController"
    })
    
    .state('about', {
      url: "/about", 
      templateUrl: "about.html"
    });

  $urlRouterProvider.otherwise("/");
}