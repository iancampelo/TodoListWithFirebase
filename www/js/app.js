// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items',['$firebaseArray', function($firebaseArray){
    var itemsRef = new Firebase('https://todolistteste.firebaseio.com/items');
    return $firebaseArray(itemsRef);
  }])

.controller('ListCtrl', function($scope, $ionicListDelegate, $ionicPopup, Items){
    $scope.items = Items;
    $scope.addItem = function(){
      $ionicPopup.prompt({
        title: 'Todo name',
        template: 'Enter the TODO name',
        inputPlaceholder: 'My new TODO item!',
        cssClass: 'ionicModal'
      }).then(function(name){
        if(name) {
          $scope.items.$add({
            'name': name
          });
        }
      });
    };
    $scope.purchaseItem = function(item){
      var itemRef = new Firebase('https://todolistteste.firebaseio.com/items/'+
      item.$id);
      itemRef.child('status').set('purchased');
      $ionicListDelegate.closeOptionButtons();
    };
  });
