# tweetclone

Maybe a Twitter clone.

## Table of Contents
* [Checklist](#cheklist)
  * [Initial setup](#initial-setup)
  * [User - CRUD](#user---crud)
  * [User - Frontend](#user---frontend)
  * [Auth](#auth)
  * [To-Do](#to-do)


## Checklist
### Initial setup
* [x] Create an Angular project. (Later vue.js, same process)
* [x] Create a **server** and a **config** folder
  * [x] Create the _index.js_ for config
  * [x] Create _server.js_
* [x] Install node packages
  * _express_
  * _mongoose_
  * _cors_
  * _body-parser_
  * _bcrypt_
  * _joi_
* [x] Create the basics components on Angular
  * [x] home
  * [x] page-not-found
  * [x] api
* [x] Manage the routes on Angular
* [x] Make a reference of **dist** folder on server
* [x] Create a connection of mongodb with mongoose

### User - API CRUD
* [x] User routes
* [x] Create User
  * [x] Create POST signup
    * [x] Validate fields
      * [x] Create validation middleware
    * [x] Check if email is unique
    * [x] Hash the password
    * [x] Insert into DB
    * [x] Remove the password from the response body
* [x] Get Users
  * [x] Get all users
    * [x] Find all the users
    * [x] Check if the _state_ propertie is true
  * [x] Get specific user
    * [x] Find an specefic user
    * [x] Check if the _state_ propertie is true
* [ ] Edit User
  * [x] Validate fields
    * [x] Create validation middleware
  * [ ] Check that the original content is not equal to the modified
  * [x] Find an specefic user
  * [x] Check if the _state_ propertie is true
  * [x] Update the DB
* [x] Delete User
  * [x] Find an specefic user
  * [x] Check if the _state_ propertie is true
  * [x] Update the DB

#### User - Frontend
* [x] Angular routes (Vue.js)
  * [x] Landing page
  * [x] Signup page
* [ ] Form for signup
  * [x] Email, username and password fields
  * [x] Get the values of the fields
  * [ ] Form submitted
    * [x] Verify email
    * [x] Verify username
    * [x] Verify password
    * [x] Display validation errors
    * [x] POST request to the server
    * [ ] Display server errors
    * [ ] Succesful signup, redirect to login page


### Auth
* [ ] jwt
* [ ] Login
  * [ ] Get account
  * [ ] Edit account
  * [ ] Delete account

### To-Do
* [ ] Heroku repository
* [ ] Best way to manage routes, or this method is good??
* [ ] env variables
* [ ] Styles SCSS (I will try to not use bootstrap)... Ok, maybe just for the columns
