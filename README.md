[![Build Status](https://travis-ci.org/nraufu/portofolio.svg?branch=develop)](https://travis-ci.org/nraufu/portofolio)
[![Coverage Status](https://coveralls.io/repos/github/nraufu/portofolio/badge.svg?branch=develop)](https://coveralls.io/github/nraufu/portofolio?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/bfedb3fb916fd1597118/maintainability)](https://codeclimate.com/github/nraufu/portofolio/maintainability)

# portfolio

This is my portfolio website :tada:

# features :sparkles:

- An admin can login into his account.
- An admin can create a blog post.
- An admin can edit a blog post.
- An admin can delete a blog post.
- A user can view all blog post.
- A user can view a specific blog post.
- An admin can view all queries.
- An admin can view a specific query.
- An admin can delete a specific query.
- A user can add a comment on a specific blog post.
- A user can like a specific blog post.

# UI Template :lipstick:
To view the UI [click here](https://nraufu.github.io/portofolio/UI/)

# API Host :globe_with_meridians:
API endpoints are hosted [Here](https://portfolio-nr.herokuapp.com/)

# API Documentation :pencil:
API endpoints Documentation are hosted [Here](https://portfolio-nr.herokuapp.com/api-docs/)

## Technologies && Tools

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
* [MongoDb](https://www.mongodb.com/) - A document database, which means it stores data in JSON-like documents.
* [Mocha](mochajs.org) - A JavaScript test framework for Node.js programs, asynchronous testing, test coverage reports, and use of any assertion library

## Getting Started

 ### Prerequisites

 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
 
### Installation

Clone the app
* ```https://github.com/nraufu/portofolio.git```

Install all the packages
* ```npm install ```

Run the server
*  ```npm start ```

## Testing
Run Test case
* ```npm run test```


## Working Routes

| Endpoint                |             Functionality             |
| ----------------------- | :-----------------------------------: |
| POST /auth/login        |      admin log into his account       |
| POST /posts/            |       Admin create a blog post        |
| GET /posts/             |        retrieve all blog posts        |
| GET /posts/:id          |     retrieve a specific blog post     |
| PATCH /posts/:id        |   Admin modify a specific blog post   |
| DELETE /posts/:id       |      delete a specific blog post      |
| POST /queries/          |            create a query             |
| GET  /queries/          |      Admin retrieve all queries       |
| GET  /queries/:id       |    Admin retrieve a specific query    |
| DELETE /queries/:id     |     Admin delete a specific query     |
| POST /posts/comment/:id | add a comment on a specific blog post |
| POST /posts/like/:id    |  add a like on a specific blog post   |


## ScreenShot
![portfolio](https://user-images.githubusercontent.com/49249449/91164932-2c5b7a00-e6d0-11ea-8091-fb59f5a88db2.PNG)
![about](https://user-images.githubusercontent.com/49249449/91164949-32515b00-e6d0-11ea-95de-74fc37ff77d1.PNG)

## License
- MIT

### Author

[NIYONZI Raufu](https://github.com/nraufu/) ✌😎

