const app = angular.module("MyApp",[]);

app.controller('rtController', ['$http', function($http){
  const controller = this;
  this.test="ANGULAR TEST SUCCESSFUL";
  this.pageShowing='includes/dynamic_landing.html';
  this.theVolunteerTask={};
  this.theRequesterTask={};

  this.VolunteerTaskSelected=function(theTask){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_volunteer_oneTask.html';
    console.log("theTask: ",theTask);
    this.theVolunteerTask=theTask;
  };
  this.RequesterTaskSelected=function(theTask){
    //RENDER the following includes/*.html on index.html
    this.pageShowing='includes/dynamic_requester_ReadOne_UD.html';
    console.log("theTask: ",theTask);
    this.theRequesterTask=theTask;
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

    }).catch(error=>console.log(error));
  };

  this.getTasksByElder=function(){

    console.log("submitted: ",controller.elderName);
    $http({
      method: 'GET',
      url: 'https://elderhelperappapi.herokuapp.com/tasks'
    }).then(function(response){
      controller.allTasks=response.data;
      console.log("number of tasks:",controller.allTasks.length);
      controller.allTasksByElder=[];
      for (let i = 0; i < controller.allTasks.length; i++) {
        if(controller.allTasks[i].elder.name==controller.elderName){
          console.log("Comparing: ",controller.allTasks[i].elder.name);
          controller.allTasksByElder.push(controller.allTasks[i]);
        }
      }
      if(controller.allTasksByElder.length==0){
        controller.allTasksByElder=[{id:1,task_name: "No Results Found"}];
      }
      console.log(controller.allTasksByElder);
      //NOTE: ONLY RENDER PAGE AFTER .then() HAS ALL EXECUTED
      //-since it runs asynchronously, dependent upon the data retrieval,
      //  we reinitialize this.pageShowing here to make sure
      //  all the data is available when the next .html snippet loads
      //  RENDER the following includes/*.html on index.html
      //-have to writer it as controller.pageShowing because this.pageShowing
      //  is not properly in scope within the $html function
      controller.pageShowing='includes/dynamic_requester_search_results.html';
    }).catch(error=>console.log(error));
    // //RENDER the following includes/*.html on index.html
    // this.pageShowing='includes/dynamic_requester_search_results.html';
    // console.log("switched pageShowing");
  };


}]); //end rtontroller

// fetch('http://localhost:3000/locations')
// .then(response => response.json())
// .then(json=>console.log(json))
// .catch(err=>console.log(err))
// window.onload = function() {
//
// }
