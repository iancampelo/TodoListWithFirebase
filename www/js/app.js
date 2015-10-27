// Ionic Starter App

angular.module('todo', ['ionic', 'firebase'])

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
            'name': name,
            'status': 'clear'
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
    $scope.unPurchaseItem = function(item){
      var itemRef = new Firebase('https://todolistteste.firebaseio.com/items/'+
        item.$id);
      itemRef.child('status').set('clear');
      $ionicListDelegate.closeOptionButtons();
    };
  });
