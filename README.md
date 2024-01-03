# University
____

## Description
____

Application University implemented in Node.js and TypeScript.
The University app provides all statistic data for analysis universities occupancy, studied subjects, offered courses and average assessment of the students. 
The application also offers the option of viewing data of one of the universities, faculties, courses or students.
____

## Dependencies
____
+  `express` - minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
+  `dotenv` - a zero-dependency librarytores, which loads environment variables from a .env file for easier management.
+  `mongoose` - elegant mongodb object modeling for node.js that provides a schema-based solution to model application data.
+  `nodemon` - a command-line tool that helps with the speedy development of Node. js applications. It monitors your project directory and automatically restarts your node application when it detects any changes.
+  `ts-node` - a TypeScript execution engine and REPL for Node. js. It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node. js without precompiling.
+  `typescript` - a strongly typed programming language that builds on JavaScript. It allows to define variable types.
+  `body-parser` - used to process data sent in an HTTP request body.
+  `log4js` - a very small but usefull JavaScript library to log events in your scripts.
____

## Getting Started
____

### Prerequisites
+  Node.js
+  npm
+  MongoDB

### Installation
+  Clone this repository.

```
git clone https://github.com/olpapina/university.git

```
+  Open package with project in your IDE
+  Install dependencies npm install

```
npm install

```
npm install

_____

# API documentation
_____

## Marks
______

### Add Mark

Description

This endpoint allows to add new mark to DB.

Endpoint http://localhost:3000/api/marks
Method: POST
Request Body
{
    "title": "String",
    "magnitude": number 
}
Response Body
{
    "title": "Six",
    "magnitude": 6,
    "_id": "65958bcb99bd80784e42805a",
    "__v": 0
}
_____________
### Edit mark

Description

This endpoint allows to edit mark by ID.

Endpoint http://localhost:3000/api/marks/:id
Method: PUT
Parameter: id
Request Body
{
    "title": "NewString",
     "magnitude": NewNumber
}
Response Body
{
    "_id": "65958bcb99bd80784e42805a",
    "title": "Seven",
    "magnitude": 7,
    "__v": 0
}
______
### Delete mark

Description

This endpoint allows to delete mark by ID.

Endpoint http://localhost:3000/api/marks/:id
Method: DELETE
Parameter: id
Response Body
{
    "_id": "65958bcb99bd80784e42805a",
    "title": "Seven",
    "magnitude": 7,
    "__v": 0
}
_______
### Search mark

Description

This endpoint allows to search by mark id

Endpoint http://localhost:3000/api/marks/:id
Method: GET
Parameter: id
Response Body
{
    "_id": "6595898b99bd80784e428050",
    "title": "One",
    "magnitude": 1,
    "__v": 0
}

### Get all marks

Description

This endpoint allows to view all marks.

Endpoint http://localhost:3000/api/marks

Method: GET

Response Body

JSON array containing all marks
_____

## Courses
______

### Add Course

Description

This endpoint allows to add new course to a university.

Endpoint http://localhost:3000/api/courses
Method: POST
Request Body
{
    "title": "NameOfCourse",
    "yearOfStudying": number 
}
Response Body
{
    "title": "New Course",
    "subjects": [],
    "yearOfStudying": 1,
    "_id": "659576c199bd80784e428038",
    "__v": 0
}
_____________
### Edit course

Description

This endpoint allows to edit course by ID.

Endpoint http://localhost:3000/api/courses/:id
Method: PUT
Parameter: id
Request Body
{
    "title": "Changed Course Name",
    "yearOfStudying": NewNumber
}
Response Body
{
    _id: new ObjectId('659576c199bd80784e428038'),
  title: 'Changed Course Name',
  subjects: [],
  yearOfStudying: 3,
  __v: 0
}
______
### Delete course

Description

This endpoint allows to delete course by ID.

Endpoint http://localhost:3000/api/courses/:id
Method: DELETE
Parameter: id
Response Body
{
     "_id": "659576c199bd80784e428038",
    "title": "Changed Course Name",
    "subjects": [],
    "yearOfStudying": 3,
    "__v": 0
}
_______
### Search course

Description

This endpoint allows to search by course id

Endpoint http://localhost:3000/api/courses/:id
Method: GET
Parameter: id
Response Body
{
    "_id": "65957bf199bd80784e42803a",
    "title": "Other Course",
    "subjects": [],
    "yearOfStudying": 2,
    "__v": 0
}

### Get all courses

Description

This endpoint allows to view all courses.

Endpoint http://localhost:3000/api/courses

Method: GET

Response Body

JSON array containing all courses

______

## Departments
______

### Add Department

Description

This endpoint allows to add new department to the university.

Endpoint http://localhost:3000/api/departments
Method: POST
Request Body

   