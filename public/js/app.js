const app = angular.module("MyApp",[]);

app.controller('userController', ['$http', function($http){
  const controller = this;
  this.test="ANGULAR TEST SUCCESSFUL";
  this.pageShowing='includes/dynamic_landing.html';

  this.gettasks= function(){
    this.pageShowing='includes/dynamic_volunteer_allTasks.html';
    console.log("clicked volunteer");
    $http({
      method: 'GET',
      url: 'https://elderhelperappapi.herokuapp.com/tasks'
    }).then(function(response){
      console.log(response, ' -- > this is the response');

      controller.events = response.data;

    }).catch(error=>console.log(error));
  }

}]); //end userController

// fetch('http://localhost:3000/locations')
// .then(response => response.json())
// .then(json=>console.log(json))
// .catch(err=>console.log(err))
// window.onload = function() {
//
// }
