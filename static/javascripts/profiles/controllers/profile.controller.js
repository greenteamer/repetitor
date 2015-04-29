/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('ProfileController', ProfileController);


    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];


    ///**my test*/
    //ProfileController.$inject = ['$location', '$scope', 'Authentication', '$routeParams', 'Posts', 'Profile', 'Snackbar'];
    //
    //function ProfileController($scope, $location, $routeParams, Authentication, Posts, Snackbar, Profile){
    //    var vm = this;
    //
    //    vm.profile = undefined;
    //    vm.posts = [];
    //
    //    activate();
    //
    //    function activate(){
    //
    //        var username = $routeParams.username.substr(1);
    //
    //        Profile.get(username).then(profileSuccessFn, profileErrorFn);
    //
    //        Posts.all().then(postsSuccessFn, postsErrorFn);
    //
    //        //$scope.$on('post.created', function(event, post){
    //        //   vm.posts.unshift(post);
    //        //});
    //
    //        //$scope.$on('post.error', function(){
    //        //   vm.posts.shift();
    //        //});
    //
    //        function postsSuccessFn(data, status, headers, config){
    //            vm.posts = data.data;
    //        }
    //
    //        function postsErrorFn(data, status, headers, config){
    //            Snackbar.error(data.error);
    //        }
    //
    //        function profileSuccessFn(data, status, headers, config){
    //            vm.profile = data.data;
    //        }
    //
    //        function profileErrorFn(data, status, headers, config){
    //            $location.url('/');
    //            Snackbar.error('Пользователя не существует.');
    //        }
    //
    //    }
    //
    //}


  /**
  * @namespace ProfileController
  */
  function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
    var vm = this;

    vm.profile = undefined;
    vm.posts = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfileController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Posts.get(username).then(postsSuccessFn, postsErrorFn);

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
          //Snackbar.show(vm.profile.username);
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }


      /**
        * @name postsSucessFn
        * @desc Update `posts` on viewmodel
        */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
          //Snackbar.show(vm.posts);
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();