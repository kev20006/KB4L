# KB4L - Kanban for Life

KB4L is a purposely simplified Kanban board application that is intend to be applied in peoples professional and personal and home lives.

It allows families to easily manage who is doing what around the house, or if you a planning an event tasks can easily be divided up between friends and co-workers.

The app started life as my wife and i kept doubling up on certain chores (we are very well stocked on milk) or neglecting others, so thought it would be useful to have a place where we could store and manage our chores centrally.
 
## UX
 
Primarily the app is geared at families, as that was the original demographic i had in mind before considering that it may also be easily applicable elsewhere. With that in mind, i looked the KanBan tools (namely Jira) i used at work as my first touch point of the UX process. It was easy to identify that a home kanban board would need to be considerably simpler than a professional application, especially if kids are going to be using it too. 

While planning it also struck me that an app like this might also be useful to young adults in house shares, or even people beyond the household scope, it could be equally useful for event planning, group projects and so on, essentially any task involving more than one person became a likely candidate.

The relisation that I could extend beyond families and purely household effected the designs in that instead of making them geared towards children I felt it was a better idea to focus making the app clear and simple to use.

### User Stories

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Another feature idea

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Angular](https://jquery.com)
    - The front end of the site uses the angular framework 
- [Angular Material Components](https://jquery.com)
    - To support the framework and for some nice out of the box components i used Angular Material Components
- [Django](https://jquery.com)
    - The back end is powered by the python framework Django
- [Django Rest Framework](https://jquery.com)
    - All the API endpoints consumed by the front end utilise DRF
- [Django-JWT](https://jquery.com)
    - Authentication is managed using JSON Web Tokens
- [SQLite](https://jquery.com)
    - The database is built using SQLite
- [Gunicorn]
    - Tool for better managing python deployment on heroku
- [Heroku]
    - For Hosting the App


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

### Manual e2e Testing

1. Register a New  User:
    1. Go to the Index page
    2. Click Register to open the register modal
    3. Fill in details correctly
    4. Click Register

2. Register a New User - Fail:
    1. Go to the Index page
    2. Click Register to open the register modal
    3. Enter the same username as last time
    4. enter an invalid email
    5. enter 42 as your password
    6. enter 53 as your password
    7. click register

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
