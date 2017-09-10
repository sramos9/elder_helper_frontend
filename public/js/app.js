const app = angular.module("MyApp",[]);

app.controller('rtController', ['$http', function($http){
  const controller = this;
  this.test="ANGULAR TEST SUCCESSFUL";
  this.pageShowing='includes/dynamic_landing.html';
  this.theVolunteerTask={};
  this.VolunteerTaskSelected=function(theTask){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_volunteer_oneTask.html';
    console.log("theTask: ",theTask);
    this.theVolunteerTask=theTask;
  };

  this.gettasks= function(){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_volunteer_allTasks.html';

    console.log("clicked volunteer");
    $http({
      method: 'GET',
      url: 'https://elderhelperappapi.herokuapp.com/tasks'
    }).then(function(response){
        console.log("typeOf response.data: ",typeof response.data);
        console.log(response.data);
        controller.allTasks=response.data;
        console.log(controller.allTasks, ' -- > this is the response');

      controller.events = response.data;

    }).catch(error=>console.log(error));
  }

}]); //end rtontroller

// fetch('http://localhost:3000/locations')
// .then(response => response.json())
// .then(json=>console.log(json))
// .catch(err=>console.log(err))
// window.onload = function() {
//
// }
