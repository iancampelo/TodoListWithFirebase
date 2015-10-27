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
            'status': 'uncompleted'
          });
        }
      });
    };
    $scope.removeItem = function(item){
      $ionicPopup.confirm({
        title: 'Remove TODO Item',
        cssClass: 'ionicModal',
        template: 'Are you sure about this?'
      }).then(function(res){
        if(res) {
          $scope.items.$remove(item);
        }
      });
    };
    $scope.completeItem = function(item){
      var itemRef = new Firebase('https://todolistteste.firebaseio.com/items/'+ item.$id);
      if(item.status == 'uncompleted')
        itemRef.child('status').set('completed');
      else
        itemRef.child('status').set('uncompleted');
      $ionicListDelegate.closeOptionButtons();
    };
    $scope.appliedClass = function(classe){
      if(classe.status == 'uncompleted')
        return "button-calm uncompleted";
      else
        return "button-dark completed";
    };
  });
