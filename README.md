# Squashem 

## Overview

**Squashem** is a web application that allows programmers to log in and create a list of bugs that they need to fix. They can then add bugs to the list, and cross them off as they fix them. Squashem allows programmers to create concise bug reports essential to the debugging process. Main features include:
  - Bug Reporting
  - Bug Assignment
  - Bug Categorization
  - Bug Prioritization
  - Comments
  - Search and Filters
  - Potential Dependencies

## Data Model

* users can have multiple lists (via references)
* each list can have multiple items (by embedding)

(__TODO__: sample documents)

An Example User:

```javascript
{
  username: "shannonbugsquasher",
  hash: // a password hash,
  lists: ["reported_bugs", "assigned_bugs", "comments"],
  name: "Shannon",
}
```

An Example Reported Bugs List:

```javascript
{
  user: // a reference to a User object
  name: "reported_bugs",
  bugs: [
    { name: "heisenbug", priority: "1", status: "closed"},
    { name: "mandelbug", priority: "2", status: "open"},
    { name: "schroedinbug", priority: "3", status: "open"}
  ],
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.mjs) 

## Wireframes


![dashboard](wireframes/dashboard.jpeg)
![login](wireframes/login.jpeg)
![new](wireframes/new.jpeg)
![reported](wireframes/reported.jpeg)
![signup](wireframes/signup.jpeg)
![report](wireframes/report.jpeg)
![user](wireframes/user.jpeg)
## Site map

![sitemap](documentation/sitemap.jpeg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account on Squashem
2. as a user, I can login to Squashem with my username and password
3. as a user, I can create a bug report with a title, description, and priority, tags, and dependencies
4. as a user, I can assign a bug to myself or another user
5. as a user, I can change the status of a bug
6. as a user, I can comment on a bug
7. as a user, I can search for bugs by title, description, priority, tags, and dependencies
8. as a user, I can filter bugs by status, priority, tags, and dependencies
9. as a user, I can view the bug dashboard, which shows all bugs that I have reported, assigned, and commented on

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points


## [Link to Initial Main Project File](app.mjs) 

## Annotations / References Used

1. [Heisenbug](https://en.wikipedia.org/wiki/Heisenbug)
2. [Software Bug](https://en.wikipedia.org/wiki/Software_bug) 
3. [Vue.js](https://vuejs.org/)
