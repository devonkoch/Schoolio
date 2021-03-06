angular.module('app', ['ui.router', 'ngSanitize', 'froala', 'ui.bootstrap', 'ngAnimate', 'btford.socket-io', 'ui-notification'])
  .config(function($urlRouterProvider, $stateProvider, NotificationProvider) {

    function checkIfLoggedIn (authType) {
      return function ($q, $timeout, $http, $location, $rootScope, User){
        // url: /auth/login
        var deferred = $q.defer();

        $http.get('/auth/login').success(function(user){
            if(user.accountType === authType){
                User.setUser(user);
                deferred.resolve();
                console.log('\n\n******* LOGGED IN, success');
            } else {
                var redirect = user.accountType.toLowerCase();
                $location.url('/'+redirect+'Home');
            }
        }).error(function(error){
            console.log('\n\n******* NOT LOGGED IN, error');
            $location.url('/signin');
            deferred.reject();
        });

        return deferred;
      };
    }

    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    });

    $stateProvider
      .state("landing", {
          url: "/",
          templateUrl: "app/landing/landingView.html",
          controller: "landingCtrl"
      })
      .state("signin", {
          url: "/signin",
          templateUrl: "app/signin/signinView.html",
          controller: "signinCtrl"
      })
      .state("signup", {
          url: "/signup",
          templateUrl: "app/signup/signupView.html",
          controller: "signupCtrl"
      })
      .state("studentHome", {
          url: "/studentHome",
          templateUrl: "app/studentHome/studentHomeView.html",
          controller: "studentHomeCtrl"
      })
      .state("studentProject", {
          url: "/studentProject/:projectId",
          templateUrl: "app/studentProject/studentProjectView.html",
          controller: "studentProjectCtrl"
      })
      .state("teacherHome", {
          url: "/teacherHome",
          templateUrl: "app/teacherHome/teacherHomeView.html",
          controller: "teacherHomeCtrl"
      })
      .state("teacherProject", {
          url: "/teacherProject/:projectId",
          templateUrl: "app/teacherProject/teacherProjectView.html",
          controller: "teacherProjectCtrl"
      })
      .state("helpRequest", {
          url: "/helpRequest",
          templateUrl: "app/helpRequest/helpRequestView.html",
          controller: "helpRequestCtrl"
      })
      .state("teacherClass", {
          url: "/teacherClass/:classId",
          templateUrl: "app/teacherClass/teacherClassView.html",
          controller: "teacherClassCtrl"
      });

    $urlRouterProvider.otherwise('/');

});
