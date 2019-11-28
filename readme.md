# KB4L - Kanban for Life

KB4L is a purposely simplified Kanban board application that is intend to be applied in peoples professional and personal and home lives.

It allows families to easily manage who is doing what around the house, or if you a planning an event tasks can easily be divided up between friends and co-workers.

The app started life as my wife and i kept doubling up on certain chores (we are very well stocked on milk) or neglecting others, so thought it would be useful to have a place where we could store and manage our chores centrally.
 
## UX
 
Primarily the app is geared at families, as that was the original demographic i had in mind before considering that it may also be easily applicable elsewhere. With that in mind, i looked the KanBan tools (namely Jira) i used at work as my first touch point of the UX process. It was easy to identify that a home kanban board would need to be considerably simpler than a professional application, especially if kids are going to be using it too. 

While planning it also struck me that an app like this might also be useful to young adults in house shares, or even people beyond the household scope, it could be equally useful for event planning, group projects and so on, essentially any task involving more than one person became a likely candidate.

The relisation that I could extend beyond families and purely household effected the designs in that instead of making them geared towards children I felt it was a better idea to focus making the app clear and simple to use.

## UX - User Stories

**All Users**
 1. As a user I should be able to register for an account to use the application.
 2. As a user I should be able to login to an exisiting account.
 3. As a user I should be able to see my personal dashboard.
 4. As a user I should be able to see information about my current usage.
 5. As a user I should be able to purchase more boards.
 6. As a user I should be able to subscribe to the service.
 7. As a user I should be able to create a new board (See admin).
 8. As a user given a board code I should be able to join an existing board.
 9. As a user I should be able to pick up tasks from boards that I am a member of.
 10. As a user I should be able to change the swim lane that a task is in.
 11. As a user I should be able to mark tasks as compelted and pending approval from the admin
 12. As a user on my dashboard I should be able to see a personalised list of activity pertaining to boards i am a member of.
 
**Board Admins**
 1. As a board admin i should be able to create a new board.
 2. As a board admin i should be able to delete an existing board.
 3. As a board admin i should be able to add new members to the board.
 4. As a board admin i should be able remove members from a board. (🛑 incomplete)
 5. As a board admin i should be able to sign off on tasks and update the scores.
 6. As a board admin i should be able to remove tasks. (🛑 incomplete)

## UX - Scope

### Functional Requirements

1. The Application must have a persistant data store accessible by multiple users simulataneously
2. The Application must differentiate between registered and unregistered users or members of boards and not members of boards
3. Users must be able to add content to the database without directly interfacing with the database itself.
4. All data sent to the server should be validated such that it prevents XSS or SQL Injection
5. Users actions must feel meaningful and provide suitable feedback.
6. The app should be responsive and work equally well on all devices including:
   * mobiles
   * tablets
   * laptops
   * desktops - up to 4K resolution
7. The app should work in all browser.
8. App should contect to a secure payment system  (🛑 incomplete)
### Non Functional Requirements
1. The App should be intuitive and easy to use
2. The App should be eye-catching yet easy to read
### Content Requirements
1. All content should be user submitted and therefore appropriately validated and verified
2. Content should persist through database changes, i.e. if a user deletes their account, all their cocktails shouldn't be deleted with them.


### UX - Structure
The App currently consists of 3 main views, there is an index page - which has information about the app, a user dashboard when users can see their usage stats, current tasks, current scores, view and manage their boards, and a board view, which will diplay a specific board instance. Across these 3 views is a persistent drawer menu accessible from the nav bar that allows users to quickly jump between parts of the app (this drawer menu is only visible to registered users).


**landing page (index)**
![index page](https://github.com/kev20006/KB4L/blob/master/documentation/screenshots/Capture.PNG)


When a user lands on the site they encounter a landing page that introduces the app and mentions some of the key features, the pricing details and lists upcoming features.

This page uses a very similar structure to many other app landing pages, so should be a familiar experience for most users.

**Dashboard**

![Dashboard](https://github.com/kev20006/KB4L/blob/master/documentation/screenshots/dashboard.PNG)

When a user logs in they see a personalised dashboard. The Header of this dashboard nforms them of current usage as well as any currently open tasks, and lists the boards they are a member of along with there current score (score is accrued by completing tasks). I felt that it was important to include this overview here, as i felt that these things were perhaps the most pertinent information that a user may be interested in when opening the app. The exception to this is the current usage, but having this information front and center, but not intrusive may encourage more subscription conversions.

Following this header is the board list, boards are rendered as card elements and titled according to screen size. This method was chosen as cards are common place in modern ux design and will be intuitive for most users.

At the foot of this page is a list of recent activities, carried out on boards that the user is a member.

**Boards**

![Boards](https://github.com/kev20006/KB4L/blob/master/documentation/screenshots/boards.PNG)

The board page has some controls at the top, these controls vary depending on the level of access a user has, i.e. admins will have more power than standard users.

The kanban boards on medium devices and up use a drag and drop interface, so tasks can be taken from one  board and dropped in another, where as on smaller devices this uses a tabbed lists, with controls on the cards to move them between lists.


## UX - Skeleton

Much of the layout is discussed above attached here are my original wireframes for the desktop version of the site, unfortunately the mobile ones seem to have gotten lost 😭

The wireframes can be view in the following folder in this repo 
[Wireframes](https://github.com/kev20006/KB4L/tree/master/documentation)

## Design - Data

The following schema was used in the app - with some minor alterations

![Dashboard](https://github.com/kev20006/KB4L/blob/master/documentation/schema.PNG)

In the final app an additional table was added to store the subscription details this table had a 1 to 1 relationship with the user table. Database was implemented using Django Models and was powered by a SQLite database.

The models are all documented in the Django codebase. Below is a list of the Apps in the Django project and any corresponding models.

**Boards** : Boards and Members,
**recent_activity**: RecentActivity
**tasks**: Jobs
**Users**: Subscriptions

The users table uses the default django user table.

## Design - Angular App

I'll be the first to admit the structure of the angular app could be better.

I opted to structure the app using global services to manage app state, these global services are persistant stores of cached data, that all the components have access to.

These servies are found in the services folder and contain:

* **API-Service** : Which imports the HTTP module and handles all requests to the backend REST API - I considered how to do this more dynamically instead of having a big list of get and set methods, but time makes fools of us all

* **board-service** : This stores all the data about tasks for a board as well as boards for a user, this should probably have been abstracted into an number of different components

* **user-service** : Manages the JWT token auth, as well as current user data

* **Date-service/Task-serivce**: provide single method utility functionality that is used in a number of places.

Components are structured by functionality, little thought was given to global components until the end, so again this could be better but is largely self explanatory.

that said the **open-modal-component** (which should really be extracted into a service) - dynamically populates a model pop up with a list of components, so throughout the app there is only one modal, but any data going into it is injected via this component.

## Features

**I have to caveatt this section as I ran out of time, so a number of features were stripped out, which i will mention in a sub section of this section**
 
### Existing Features
* User Accounts: Each user can create a unique account with a secure encrypted and salted password - user sessions are manged using JWT tokens.

* Add or Join Boards: Users can create a finite amount of boards or join an infinite amount of board created by other users.

* Update tasks and record progress: Users can complete tasks and update a running score for each board they join.

* Send emails to newly invited members that deeplinks into the registration form 

* Responsive design: The page design rearranges itself on large and small devices to allow the best user experience for each of these devices.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features That should be Implemented, but i ran out of time  😭
- Shared shopping lists, as well as kanban boards, each board should also have a shopping list, this would look similar to the boards, but items could simply be ticked off

- I also intended to implement the ability to comment on tasks or boards.

- payment via stripe, instead of the mocked up card payment that is there now

-board management, reset board, start next sprint etc.

- Complete validation on all forms - i implemented angular reactive forms for quality validation on the register form but not the others

### Features That I would like to Implement
- Websocket using django channels to keep the boards up to date in real time

- a chat channel for each board

- s3 buckets or other for storing images, that could be attached to boards, tasks or shopping lists for additional info


## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Angular](https://angular.io/)
    - The front end of the site uses the angular framework 
- [Angular Material Components](https://material.angular.io/)
    - To support the framework and for some nice out of the box components i used Angular Material Components
- [Google Fonts and Google Material Icons](https://fonts.google.com/)
    - for fonts and icons
- [Responsive Credit Card Component](https://angularscript.com/responsive-credit-card-component-for-angular/)
   - for a particulary slick credit card input interface, packaged with all the validation
- [Django](https://jquery.com)(https://www.djangoproject.com)
    - The back end is powered by the python framework Django
- [Django Rest Framework](https://jpadilla.github.io/django-rest-framework-jwt/)
    - All the API endpoints consumed by the front end utilise DRF
- [Django-JWT](https://github.com/jpadilla/django-rest-framework-jwt)
    - Authentication is managed using JSON Web Tokens
- [SQLite](https://www.sqlite.org)
    - The database is built using SQLite
- [gunicorn](https://gunicorn.org/)
    - Tool for better managing python deployment on heroku
- [dotenv](https://pypi.org/project/python-dotenv/)   
   - quick and easy access to environment variables
- [Heroku]
    - For Hosting the App


## Testing

### Automated Testing

I manually test as i go:

- each end point added is tested to see if it responds as expected, before being plugged into the angular app, which is then manually tested again using far too many console logs

-each new bit of functionality added is checked with the same rigour

while i'm doing this i have mentally noted where automated tests should be, however never get round to adding them.

Tried to retro-fit the tests, but wasn't quite clear how to rest again the Django Rest Framework, and the less said about using karma with angular material components the better, my console exploded. 

So long story short, i did not include automated test in this project.

### Manual Testing
I tested each of the user stories on:

**Desktop - Windows 10**
Google Chrome
Microsoft Edge

**Samsung A7 (2017) - Android**
Chrome

**Macbook Pro** Safari

### User Story Tests

#### All users

**1. As a user I should be able to register for an account to use the application.**

Deeplinking from email looks awful, as component is rendered outside of a card

**2. As a user I should be able to login to an exisiting account.**

Password error message forces modal to resize.

**3. As a user I should be able to see my personal dashboard.**

As expected

**4. As a user I should be able to see information about my current usage.**
On small viewports users were not being informed that the had subscriptions despite the flag being there, additionally they were still being prompted to subscribe, logic applied to prevent this behavior

**5. As a user I should be able to purchase more boards.**
**6. As a user I should be able to subscribe to the service.**

As above, this option was being obscured for some users

**7. As a user I should be able to create a new board (See admin).**

Users could create boards far beyond there allowed board limit

**8. As a user given a board code I should be able to join an existing board.**

**9. As a user I should be able to pick up tasks from boards that I am a member of.**

Assign to me wasn't working as expected, turns out the function was being called with a user parameter

**10. As a user I should be able to change the swim lane that a task is in.**
**11. As a user I should be able to mark tasks as compelted and pending approval from the admin**
**12. As a user on my dashboard I should be able to see a personalised list of activity pertaining to boards i am a member of.**
As expected


#### Admin

**1. As a board admin i should be able to create a new board.**

as before unlimited boards could be created - added a check on the backend to stop boards being added over the limit and return an error

**2. As a board admin i should be able to delete an existing board.**

Button was moved from dashboard to board view as it made more sense but functionality was not moved across so button was dead.

**3. As a board admin i should be able to add new members to the board.**

emails were not getting sent, accidently deployed with the wrong environment variables.

4. As a board admin i should be able remove members from a board. (🛑 incomplete)

**5. As a board admin i should be able to sign off on tasks and update the scores.**

as expected

6. As a board admin i should be able to remove tasks. (🛑 incomplete)

## Deployment

This app lives in two different Repos, this github repo contains everything, there is an additional heroku repo that only contains the django app and the production built angular app.

### running the app locally

1. Pull down [this repo] (https://github.com/kev20006/KB4L)
2. navigate to backend directory
3. run ```>  pip install -r requirements.txt``` to install all the required packages
4. add a '.env' file in the same directoy as settings.py > backend/api

in the .env file inclue the following:
```
SECRET_KEY = any secret key you like
EMAIL_HOST_USER = 'any gmail email address'
EMAIL_HOST_PASSWORD = 'the password of that email account'
```
if you don't want to use the google smtp server in settings.py change
```
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_PORT = '2525'
EMAIL_PORT = '587'
EMAIL_USE_TLS = True
```

to the details for your own prefered smtp server.

5. run ```python manage.py migrate``` to build the database
6. run ```python manage.py runserver``` to run the app.
7. point your browser towards localhost:8000

### Running the app for future development

The steps above also apply to running the app for dev, however, unless you want to work with minified and packaged js you'll also need to deploy the angular app.

1. to do this navigate to the frontend folder and run ```npm install```

if you don't already have node and npm then [head here to get it](https://nodejs.org/en/)

2. once all the packages have installed you can run ```ng serve``` to run the angular dev server.

3. point your browser towards localhost:4200

### deploying the app

the deployed app's base route is in the backend folder, you will see the procfile in there as well as a requirements.txt and runtime.txt which are both files heroku will need to deploy the app.

1. from the frontend directory run ```ng build --prod --aot --output-hashing none``` - this wil build the angular app, into pure html, css and js ready for deployment, it also runs a very aggressive linter against the code to ensure that it's stable.

2. once the build is complete you can go to the backend directory.

3. login through the heroku cli

4. create a new heroku app in the terminal ```heroku create [your app name]```, on completion you should see a url for your app

5. go to heroku.com to see your new app and in that app under settings, congfig vars add the exact same keys and vars as you have in you .env file

6. add your apps url to allowed hosts in the settings.py file you can overwrite the kb4l.herokuapp.com one.
```
ALLOWED_HOSTS = [
    'kb4l.herokuapp.com',
    'localhost',
    '127.0.0.1'
]
```

7. connect the app to your heroku git remote by running ```heroku git:remote -a [your app name]```

8. stage and commit your code ```git add .``` and then ```git commit -m "some message, probably initial commit"

9. push the project to your remote ```git push heroku master```

10. if you get an error about collect static, simply disable it by typing ```heroku config:set DISABLE_COLLECTSTATIC=1``` and then rerun ```git push heroku master``` 

11. You should see a message saying deployment is done, however your database isn't setup yet on heroku, so finally run ```heroku run python manage.py migrate```

12 Navigate to your heroku url and you should see the landing page of the app.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
