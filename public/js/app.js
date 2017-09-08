const app = angular.module("MyApp",[]);

app.controller('userController', ['$http', function($http){
  const controller = this;
  this.test="ANGULAR TEST SUCCESSFUL";
  this.pageShowing='includes/dynamic_landing.html';

  // this.getIndex = function(){
  //   $http({
  //     method: 'GET',
  //     url: '/'
  //   }).then(function(response){
  //     console.log(response, ' -- > this is the response');
  //
  //     controller.events = response.data;
  //
  //   }, function(error){
  //     console.log("error on GET '/': ",error);
  //   });
  // },

}]);
// fetch('http://localhost:3000/locations')
// .then(response => response.json())
// .then(json=>console.log(json))
// .catch(err=>console.log(err))
// window.onload = function() {
//
// }
