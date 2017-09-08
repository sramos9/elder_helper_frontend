const app = angular.module("MyApp",[]);

app.controller('mainController', ['$http', function($http){
  const controller = this;

  this.getIndex = function(){
    $http({
      method: 'GET',
      url: '/'
    }).then(function(response){
      console.log(response, ' -- > this is the response');

      controller.events = response.data;

    }, function(error){
      console.log("error on GET '/': ",error);
    });
  },


}]);
