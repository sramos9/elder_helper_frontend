const app = angular.module("MyApp",[]);

app.controller('rtController', ['$http', function($http){
  const controller = this;
  this.test="ANGULAR TEST SUCCESSFUL";
  this.pageShowing='includes/dynamic_landing.html';
  this.ReadOneSubShowing="";
  this.theVolunteerTask={};
  this.theRequesterTask={};
  this.isVolunteered=false;

  this.isVolunteeredReset=function(){
    this.isVolunteered=false; //reinitialize .isVolunteered
    this.pageShowing='includes/dynamic_landing.html';
  }

  // this is for jwt testing and function
  var self = this;
  this.url = 'http://localhost:3000';
  this.elder = {};
  this.elders = [];
  this.elderPass = {};

  this.login = function(elderPass) {
    console.log(elderPass);
    $http({
      method: 'POST',
      url: this.url + '/elders/login',
      data: { elder: { username: elderPass.username, password: elderPass.password }},
    }).then(function(response) {
      console.log(response);
      this.loggedIn = true;
      self.elder = response.data.elder;
      console.log(self.elder);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      console.log(localStorage.token, " This is the token or at least it should be");
      this.getElders();
    }.bind(this));

  }

  this.getElders = function() {
    $http({
      url: this.url + '/elders',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      console.log(response);
      if (response.data.status == 401) {
          this.error = "Unauthorized";
      } else {
        this.elders = response.data;
      }
    }.bind(this));
  }

  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }




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
    //reinitializes so delete and update show correctly
    //  on single task breakout page
    this.ReadOneSubShowing="";

    // console.log("submitted: ",controller.elderName);
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

  this.newRequest = function(){
    $http({
      method: 'POST',
      url: 'https://elderhelperappapi.herokuapp.com/elders/2/tasks',
      data: {
        // task_name: this.title,
        // date_needed: this.date_needed,
        // details: this.details,
        // duration: this.duration,
        // location: this.location,
        // elder: {name: this.creator_name},
        // elder_id:1234567890
        task_name: "fakey 2 task master",
        date_needed: "2017-09-30",
        location: "90042",
        duration: "36.5",
        details: "fake sauce, fake meal",
        phone: "000.000.0000",
        email: "fakey@fakefaker.com",
        elder_id: 2222,
        // elder [id: 1001, name: "bob", phone:"0", email:"bobs@bob.com"]
      }
    }).then(function(response){
      console.log(response);

      //empties form upon successful new event post
      task_name= "";
      date_needed= 0;
      details= "";
      duration= 0;
      location= "";
      elder.name= "";
    }, function(error){
      console.log('error: ',error);
  });
}

this.updateTask = function(){
  console.log("task_name",controller.title); console.log("this.details",this.details);
  $http({
    method: 'PUT',
    url:'https://elderhelperappapi.herokuapp.com/elders/'+this.theRequesterTask.elder_id+'/tasks/'+this.theRequesterTask.id,

    data:{
      task_name: controller.title
    }

  }).then(function(response){

  }, function(error){
    console.log(error);
  });
};
this.updateTask_volunteer = function(){
  console.log("updateTask_volunteer submitting");
  console.log("theVolunteerTask.elder_id: ",this.theVolunteerTask.elder_id);
  console.log(".volunteer_name: ", controller.volunteer_name);
  // console.log(".volunteer_email: ", this.volunteer_email);
  // console.log(".volunteer_phone: ", this.volunteer_phone);
  console.log('https://elderhelperappapi.herokuapp.com/elders/'+this.theVolunteerTask.elder_id+'/tasks/'+this.theVolunteerTask.id);
  // this.theVolunteerTask.volunteer_email=this.volunteer_email;
  // this.theVolunteerTask.volunteer_name=this.volunteer_name;
  // this.theVolunteerTask.volunteer_phone=this.volunteer_phone;
  // console.log("this.theVolunteerTask: '\n'",this.theVolunteerTask);
  $http({
    method: 'PUT',
    url:'https://elderhelperappapi.herokuapp.com/elders/'+this.theVolunteerTask.elder_id+'/tasks/'+this.theVolunteerTask.id,

    data:{
      // elder_id:this.theVolunteerTask.elder_id,
      // id:this.theVolunteerTask.id,
      // volunteer_email:this.volunteer_name,
      volunteer_name:controller.volunteer_name,
      // volunteer_phone:this.volunteer_phone
    }

  }).then(function(response){
    console.log("RESPONSE: ",response);
    controller.isVolunteered=true;
    controller.pageShowing='includes/dynamic_volunteer_oneTask_afterPUT.html';
  }, function(error){
    console.log(error);
    controller.isVolunteered=false;
    controller.pageShowing='includes/dynamic_volunteer_oneTask_afterPUT.html';
  });
};

this.deleteTask = function(){
  console.log("delete this? ",this.theRequesterTask);
    $http({
      method: 'DELETE',
      url: 'https://elderhelperappapi.herokuapp.com/tasks/' + this.theRequesterTask.id,
    }).then(function(response){
      // console.log(response);

    }, function(error){
      console.log('error');
    });
};

}]); //end rtController

// fetch('http://localhost:3000/locations')
// .then(response => response.json())
// .then(json=>console.log(json))
// .catch(err=>console.log(err))
// window.onload = function() {
//
// }
