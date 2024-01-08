# University

## Description

Application University implemented in Node.js and TypeScript.
The University app provides all statistic data for analysis universities occupancy, studied subjects, offered courses and average assessment of the students. 
The application also offers the option of viewing data of one of the universities, faculties, courses or students.

## Dependencies

+  `express` - minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
+  `dotenv` - a zero-dependency librarytores, which loads environment variables from a .env file for easier management.
+  `mongoose` - elegant mongodb object modeling for node.js that provides a schema-based solution to model application data.
+  `nodemon` - a command-line tool that helps with the speedy development of Node. js applications. It monitors your project directory and automatically restarts your node application when it detects any changes.
+  `ts-node` - a TypeScript execution engine and REPL for Node. js. It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node. js without precompiling.
+  `typescript` - a strongly typed programming language that builds on JavaScript. It allows to define variable types.
+  `body-parser` - used to process data sent in an HTTP request body.
+  `log4js` - a very small but usefull JavaScript library to log events in your scripts.
+ `@types/express` - provides type definitions for express.
+ `@types/log4js` - provides type definitions for log4js.

## Getting Started

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
__________________________________

# API documentation

## Marks

### Add Mark

#### Description:

 This endpoint allows to add new mark to DB.

#### Endpoint: http://localhost:3000/api/marks
#### Method: POST
#### Request Body:

{
    "title": "String",
    "magnitude": number 
}

#### Response Body:

{
    "title": "Six",
    "magnitude": 6,
    "_id": "65958bcb99bd80784e42805a",
    "__v": 0
}

### Edit mark

#### Description:

This endpoint allows to edit mark by ID.

#### Endpoint: http://localhost:3000/api/marks/:id
#### Method: PUT
#### Parameter: id
#### Request Body:

{
    "title": "NewString",
     "magnitude": NewNumber
}

#### Response Body:

{
    "_id": "65958bcb99bd80784e42805a",
    "title": "Seven",
    "magnitude": 7,
    "__v": 0
}

### Delete mark

#### Description:

This endpoint allows to delete mark by ID.

####  Endpoint: http://localhost:3000/api/marks/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "65958bcb99bd80784e42805a",
    "title": "Seven",
    "magnitude": 7,
    "__v": 0
}

### Search mark

#### Description:

This endpoint allows to search by mark id

####  Endpoint: http://localhost:3000/api/marks/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "6595898b99bd80784e428050",
    "title": "One",
    "magnitude": 1,
    "__v": 0
}

### Get all marks

#### Description:

This endpoint allows to view all marks.

#### Endpoint: http://localhost:3000/api/marks

#### Method: GET

#### Response Body:

JSON array containing all marks

## Courses

### Add Course

#### Description:

This endpoint allows to add new course to a university.

#### Endpoint: http://localhost:3000/api/courses
#### Method: POST
#### Request Body:

{
    "title": "NameOfCourse",
    "yearOfStudying": number 
}

#### Response Body:

{
    "title": "New Course",
    "subjects": [],
    "yearOfStudying": 1,
    "_id": "659576c199bd80784e428038",
    "__v": 0
}

### Edit course

#### Description:

This endpoint allows to edit course by ID.

#### Endpoint: http://localhost:3000/api/courses/:id
#### Method: PUT
#### Parameter: id
#### Request Body:

{
    "title": "Changed Course Name",
    "yearOfStudying": NewNumber
}

#### Response Body:

{
    _id: new ObjectId('659576c199bd80784e428038'),
  title: 'Changed Course Name',
  subjects: [],
  yearOfStudying: 3,
  __v: 0
}

### Delete course

#### Description:

This endpoint allows to delete course by ID.

#### Endpoint: http://localhost:3000/api/courses/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
     "_id": "659576c199bd80784e428038",
    "title": "Changed Course Name",
    "subjects": [],
    "yearOfStudying": 3,
    "__v": 0
}

### Search course

#### Description:

This endpoint allows to search by course id

#### Endpoint: http://localhost:3000/api/courses/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "65957bf199bd80784e42803a",
    "title": "Other Course",
    "subjects": [],
    "yearOfStudying": 2,
    "__v": 0
}

### Get all courses

#### Description:

This endpoint allows to view all courses.

#### Endpoint: http://localhost:3000/api/courses

#### Method: GET

#### Response Body:

JSON array containing all courses

## Departments

### Add Department

#### Description:

This endpoint allows to add new department to the university.

#### Endpoint: http://localhost:3000/api/departments

#### Method: POST

#### Request Body:

{
    "title": "NewDepartmentName",
    "courses": [    
    ]
}

#### Response Body:

{
    "title": "NewDepartmentName",
    "courses": [],
    "_id": "6596e021071198556d12ba0a",
    "__v": 0
}

### Edit department

#### Description:

This endpoint allows to edit department by ID.

#### Endpoint: http://localhost:3000/api/departments/:id
#### Method: PUT
#### Parameter: id
#### Request Body:

{
    "title": "ChangedDepartmentName",
    "courses": []
}

#### Response Body:

{
    "_id": "659690d299bd80784e428067",
    "title": "ChangedDepartmentName",
    "courses": [],
    "__v": 0
}

### Delete department

#### Description:

This endpoint allows to delete department by ID.

#### Endpoint: http://localhost:3000/api/departments/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "659692bd99bd80784e428070",
    "title": "Science ",
    "courses": [],
    "__v": 0
}

### Search department

#### Description:

This endpoint allows to search by department id

#### Endpoint: http://localhost:3000/api/departments/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659690d299bd80784e428067",
    "title": "ChangedDepartmentName",
    "courses": [],
    "__v": 0
}

### Get all departments

#### Description:

This endpoint allows to view all departments.

#### Endpoint: http://localhost:3000/api/departments

#### Method: GET

#### Response Body:

JSON array containing all departments

## Faculties

### Add Faculty

#### Description:

This endpoint allows to add new faculty to the university.

#### Endpoint: http://localhost:3000/api/faculties

#### Method: POST

#### Request Body:

{
    "title": "New faculty"
}

#### Response Body:

{
    "title": "New faculty",
    "departments": [],
    "lecturers": [],
    "_id": "6596e49a071198556d12ba12",
    "__v": 0
}

### Edit faculty

#### Description:

This endpoint allows to edit faculty by ID.

#### Endpoint: http://localhost:3000/api/faculties/:id
#### Method: PUT
#### Parameter: id
#### Request Body:

{
    "title": "NewName faculty"
}

#### Response Body:

{
    "_id": "6596e4fe071198556d12ba14",
    "title": "NewName faculty",
    "departments": [],
    "lecturers": [],
    "__v": 0
}

### Delete faculty

#### Description:

This endpoint allows to delete faculty by ID.

#### Endpoint: http://localhost:3000/api/faculties/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "6596e4fe071198556d12ba14",
    "title": "NewName faculty",
    "departments": [],
    "lecturers": [],
    "__v": 0
}

### Search faculty

#### Description:

This endpoint allows to search by faculty id

#### Endpoint: http://localhost:3000/api/faculties/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "6596e49a071198556d12ba12",
    "title": "New faculty",
    "departments": [],
    "lecturers": [],
    "__v": 0
}

### Get all faculties

#### Description:

This endpoint allows to view all faculties.

#### Endpoint: http://localhost:3000/api/faculties

#### Method: GET

#### Response Body:

JSON array containing all faculties

## Lecturers

### Add lecturer

#### Description:

This endpoint allows to add new lecturer to the university.

#### Endpoint: http://localhost:3000/api/lecturers

#### Method: POST

#### Request Body:

{
    "firstName": "Name",
    "lastName": "SurName",
    "faculty": {
    "title": "Name Faculty",
    "departments": [],
    "lecturers": [],
    "_id": "65980e93ce88586920278009",
    "__v": 0
    }
}

#### Response Body:

{
    "firstName": "Name",
    "lastName": "SurName",
    "faculty": "65980e93ce88586920278009",
    "courses": [],
    "_id": "65980eb2ce8858692027800b",
    "__v": 0
}


### Edit lecturer

#### Description:

This endpoint allows to edit lecturer by ID.

#### Endpoint: http://localhost:3000/api/lecturers/:id

#### Method: PUT

#### Request Body:

{
    "firstName": "Fill - change courses",
    "lastName": "Fullfill",
    "faculty": "65980e93ce88586920278009",
    "courses": [
        "65957bf199bd80784e42803a",
        "6595837299bd80784e428048"
    ]
}

#### Response Body:

{
    "_id": "659bba03e4df293c8e60877d",
    "firstName": "Fill - change courses",
    "lastName": "Fullfill",
    "faculty": "65980e93ce88586920278009",
    "courses": [
        "65957bf199bd80784e42803a",
        "6595837299bd80784e428048"
    ],
    "__v": 0
}

### Delete lecturer

#### Description:

This endpoint allows to delete lecturer by ID.

#### Endpoint: http://localhost:3000/api/lecturers/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "65980fa1ce8858692027800d",
    "firstName": "Other person name",
    "lastName": "Other SurName",
    "faculty": "65980e93ce88586920278009",
    "courses": [],
    "__v": 0
}

### Search lecturer

#### Description:

This endpoint allows to search by lecturer id

#### Endpoint: http://localhost:3000/api/lecturers/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659bba03e4df293c8e60877d",
    "firstName": "Fill - change courses",
    "lastName": "Fullfill",
    "faculty": "65980e93ce88586920278009",
    "courses": [
        "65957bf199bd80784e42803a",
        "6595837299bd80784e428048"
    ],
    "__v": 0
}

### Get all lecturers

#### Description:

This endpoint allows to view all lecturers.

#### Endpoint: http://localhost:3000/api/lecturers

#### Method: GET

#### Response Body:

JSON array containing all lecturers

## Students

### Add student

#### Description:

This endpoint allows to add new student to the university.

#### Endpoint: http://localhost:3000/api/students

#### Method: POST

#### Request Body:

{
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "course": "659585b699bd80784e42804e",
    "marks": [ "65958a0e99bd80784e428058",
               "65958a0e99bd80784e428058",
               "659589d199bd80784e428056",
               "659589d199bd80784e428056"
    ]
}

#### Response Body:

{
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "course": "659585b699bd80784e42804e",
    "marks": [
        "65958a0e99bd80784e428058",
        "65958a0e99bd80784e428058",
        "659589d199bd80784e428056",
        "659589d199bd80784e428056"
    ],
    "_id": "659bbffde4df293c8e608783",
    "__v": 0
}


### Edit student

#### Description:

This endpoint allows to edit student by ID.

#### Endpoint: http://localhost:3000/api/students/:id

#### Method: PUT

#### Request Body:

{
    "firstName": "Nadya",
    "lastName": "Ivanova",
    "course": "659585b699bd80784e42804e",
    "marks": [ "659589d199bd80784e428056",
               "659589d199bd80784e428056",
               "659589d199bd80784e428056",
               "659589d199bd80784e428056"
    ]
}

#### Response Body:

{
    "_id": "659bc0f7e4df293c8e608785",
    "firstName": "Nadya",
    "lastName": "Ivanova",
    "course": "659585b699bd80784e42804e",
    "marks": [
        "659589d199bd80784e428056",
        "659589d199bd80784e428056",
        "659589d199bd80784e428056",
        "659589d199bd80784e428056"
    ],
    "__v": 0
}

### Delete student

#### Description:

This endpoint allows to delete student by ID.

#### Endpoint: http://localhost:3000/api/students/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "659bc22de4df293c8e608788",
    "firstName": "Olya",
    "lastName": "Olina",
    "course": "659585b699bd80784e42804e",
    "marks": [
        "659589d199bd80784e428056",
        "659589d199bd80784e428056"
    ],
    "__v": 0
}

### Search student

#### Description:

This endpoint allows to search by student id

#### Endpoint: http://localhost:3000/api/students/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659bc0f7e4df293c8e608785",
    "firstName": "Nadya",
    "lastName": "Ivanova",
    "course": "659585b699bd80784e42804e",
    "marks": [
        "659589d199bd80784e428056",
        "659589d199bd80784e428056",
        "659589d199bd80784e428056",
        "659589d199bd80784e428056"
    ],
    "__v": 0
}

### Get all students

#### Description:

This endpoint allows to view all students.

#### Endpoint: http://localhost:3000/api/students

#### Method: GET

#### Response Body:

JSON array containing all students

### Search student's marks

#### Description:

This endpoint allows to search all marks of particular student

#### Endpoint: http://localhost:3000/api/students/:id/marks
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659c43ebe4d947b6be40e22a",
    "marks": [
        "659589d199bd80784e428056",
        "659589d199bd80784e428056"
    ]
}


### Find student of particular course with particular mark

#### Description:

This endpoint allows to search a student of particular course with particular mark

#### Endpoint: http://localhost:3000/api/students?course=:title&mark=:magnitude
#### Method: GET
#### Parameter: title, magnitude
#### Response Body:

{
        "_id": "659c43fce4d947b6be40e22e",
        "firstName": "Luka",
        "lastName": "Olin",
        "course": "659c48015580e6dd171657e6",
        "marks": [
            "659c47425580e6dd171657e0",
            "659c47425580e6dd171657e0"
        ],
        "__v": 0
    }

## Subjects

### Add subject

#### Description:

This endpoint allows to add new subject to the DB.

#### Endpoint: http://localhost:3000/api/subjects

#### Method: POST

#### Request Body:

{
    "title": "Physics",
    "quantityOfHours": 32,
    "lecturer": "65980eb2ce8858692027800b"
}

#### Response Body:

{
    "title": "Physics",
    "quantityOfHours": 32,
    "lecturer": "65980eb2ce8858692027800b",
    "_id": "659bcb0a8a11b79b51437ac0",
    "__v": 0
}

### Edit subject

#### Description:

This endpoint allows to edit subject by ID.

#### Endpoint: http://localhost:3000/api/subjects/:id

#### Method: PUT

#### Request Body:

{
    "title": "Physics",
    "quantityOfHours": 72,
    "lecturer": "65980eb2ce8858692027800b"
}

#### Response Body:

{
    "_id": "659bcb0a8a11b79b51437ac0",
    "title": "Physics",
    "quantityOfHours": 72,
    "lecturer": "65980eb2ce8858692027800b",
    "__v": 0
}

### Delete subject

#### Description:

This endpoint allows to delete subject by ID.

#### Endpoint: http://localhost:3000/api/subjects/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "659bcb0a8a11b79b51437ac0",
    "title": "Physics",
    "quantityOfHours": 72,
    "lecturer": "65980eb2ce8858692027800b",
    "__v": 0
}

### Search subject

#### Description:

This endpoint allows to search by subject id

#### Endpoint: http://localhost:3000/api/subjects/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659bcbb78a11b79b51437ac2",
    "title": "Math",
    "quantityOfHours": 52,
    "lecturer": "65980eb2ce8858692027800b",
    "__v": 0
}

### Get all subjects

#### Description:

This endpoint allows to view all subjects.

#### Endpoint: http://localhost:3000/api/subjects

#### Method: GET

#### Response Body:

JSON array containing all subjects

## Universities

### Add university

#### Description:

This endpoint allows to add new university to the DB.

#### Endpoint: http://localhost:3000/api/universities

#### Method: POST

#### Request Body:

{
    "title": "BSUIR",
    "address": "Brovki, 6",
    "faculties": [ ]
}

#### Response Body:

{
    "title": "BSUIR",
    "address": "Brovki, 6",
    "faculties": [],
    "_id": "659bd1628a11b79b51437ad0",
    "__v": 0
}

### Edit university

#### Description:

This endpoint allows to edit university by ID.

#### Endpoint: http://localhost:3000/api/universities/:id

#### Method: PUT

#### Request Body:

{
    "title": "BNTU- changed",
    "address": "Independent str., 88",
    "faculties": [ ]
}

#### Response Body:

{
    "_id": "659bdad18a11b79b51437ad4",
    "title": "BNTU- changed",
    "address": "Independent str., 88",
    "faculties": [],
    "__v": 0
}

### Delete university

#### Description:

This endpoint allows to delete university by ID.

#### Endpoint: http://localhost:3000/api/universities/:id
#### Method: DELETE
#### Parameter: id
#### Response Body:

{
    "_id": "659bdad18a11b79b51437ad4",
    "title": "BNTU- changed",
    "address": "Independent str., 88",
    "faculties": [],
    "__v": 0
}

### Search university

#### Description:

This endpoint allows to search by university id

#### Endpoint: http://localhost:3000/api/universities/:id
#### Method: GET
#### Parameter: id
#### Response Body:

{
    "_id": "659bd1ac8a11b79b51437ad2",
    "title": "BSU",
    "address": "Kirova, 6",
    "faculties": [],
    "__v": 0
}

### Get all universities

#### Description:

This endpoint allows to view all universities.

#### Endpoint: http://localhost:3000/api/universities

#### Method: GET

#### Response Body:

JSON array containing all universities