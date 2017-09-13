# ElderHelper
Samantha Ramos and Eric Chance

## Summary

Elder Helper is a site for volunteers seeking to help elderly with the tasks they need done. An Elder in need of assistance will have as many tasks as needed listed and volunteers can choose which task and which elder to assist.

## DATA

deprecated back end repo: https://github.com/sramos9/elder_helper_backend
Back end repo: https://github.com/sramos9/elderhelperbackend_api
Front end repo: https://github.com/sramos9/elder_helper_frontend

Live site: http://elderhelper.herokuapp.com

## User Stories
Frontend flow:
![ScreenShot](/elder_helper_backend/Flowchart3.jpg)

App to help Elderly people with tasks at their home.

Elder:  (stretch: full crud)
Task: Create, Read, Update, Destroy
Volunteer: Stretch goal (model)

Structure:
Elder {:id, :Name, :email, :username, :password}

Task{:id :task_name, :location, :date_needed, :duration, :details, :phone, :elder_id, :volunteer_name[:volunteer(s)], }

Ledger {:id_elder, :id_task}

##Approach

Backend: Ruby on rails with jwt authentication.  One to many database structure composed of an Elder who can own many tasks (each task only has one Elder/author).  Elders must be created before a task can be requested/published. All tasks and elders are associated through the ledger table.  When a volunteer claims his or her task(s), their info is appended to the task's volunteer keys.  Volunteers do not have a model of their own.

The front end is a single-page app with a login/register entry in the top nav bar when they first enter the page. The login and register options appear and disappear as appropriate The pages may generally be viewed without one, but a user may only make successful task requests when they are actively logged in (this is because a task hinges on their being an existing, matching, user id associated with it).  The user may choose one of two routes: request or volunteer.  

On the volunteer path through the site, the user sees all tasks displayed (using a GET method). Each task may be clicked on and expanded to show all details.  Here, the Volunteer may enter their own information to accept the responsibility of doing the task.  After they've signed up (via a PUT method), they receive a confirmation modal which also redirects them to the home page.

As a requester, the user may publish a new task to the task list.  This uses a Create method.  They may also choose to enter in a user's name and then see all posted tasks by that user.  It is here that they may Update (PUT) or Destroy (DELETE) tasks.

##Struggles
Authentication, many aspects of the process broke our code.  Sometimes it would seem fixed, only to be broken again minutes later.  We had a heroku fail and our database stopped working at some point, and had to get time with a teacher to troubleshoot the broken backend on heroku and get it working again.  We also had a git issue with one of our repos, and had to ditch it in favor of a newer one.

## Future Goals
-show which tasks have volunteers already, and make the number of volunteers a choice that is picked by the elder/creator.
-finish styling, center text when appropriate, use flex boxes, make site scale to media
-make a confirmation modal and redirect after delete.
-after task creation, the modal passes by too fast before redirection, this should be changed.
-task deletion and alteration should be restricted to, at least, registered users, but they are not.

Separate volunteer model and login. <!-- Volunteer {:id, :Name, :phone, :email, :task_list[task_id]} -->

## Technology Used
- trello.com for day-to-day planning.
- draw.io for flow charts / user story of navigating through the site
- ruby / rails / postgresql
- jwt authentication
- postman
- heroku
- node / express / javascript / body-parser / json / angular / html / css
