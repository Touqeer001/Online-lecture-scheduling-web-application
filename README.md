<h1 align="center"> Online Lecture Sheduling Module Using Mern Stack</h1> 
<h2 align="center">It's a MERN Stack web application with all the major functionalities</h2>

## Project Overview

The Online Lecture Scheduling Module Serves the process of scheduling courses and lectures. The system includes an admin panel for course and lecture management, as well as an instructor panel to view assigned lectures.

## Demo

[Check here to see the presentation video of this project](https://github.com/Touqeer001/E-Commerce-Using-MERN-Stack.git)
<br/>


<p align="center">
    <img src="https://img.shields.io/badge/React_(17.0.2)-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactjs" />
   <img src="https://img.shields.io/badge/Bootstrap%20-3bc7bd?style=for-the-badge&logo=Bootstrap&logoColor=white" alt="Bootstrap"/>
    <img src="https://img.shields.io/badge/Rest_API-02303A?style=for-the-badge&logo=react-router&logoColor=white" alt="restAPI"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb"/>
     <img src="https://img.shields.io/badge/Context api%20-3bc7bd?style=for-the-badge&logo=Context api&logoColor=white" alt="Context api"/>
    <img src="https://img.shields.io/badge/Bcrypt%20-3bc7bd?style=for-the-badge&logo=Bcrypt&logoColor=white" alt="Bcrypt"/>
</p>
  <br />
  
 ## Features

### Admin Panel

1. **List of Instructors:**
   - Admin can view a list of all instructors.

2. **Course Management:**
   - Add courses with the following details:
     - Name
     - Level
     - Description
     - Image
   - Include multiple lectures (batches) for each course.

3. **Lecture Scheduling:**
   - Assign lectures to instructors on specific dates.
   - Ensure that no two schedules for lectures clash with each other.

4. **Date Assignment:**
   - Automatically assign dates to selected instructors when a course is added.

5. **Instructor Schedule Management:**
   - Prevent the assignment of an instructor to multiple lectures on the same date.

### Instructor Panel

- **Lecture Overview:**
  - Instructors can view a list of all lectures assigned to them.
  - Details include dates and course names.

 ## Routes
- **Login 1**: For admin and user login.
- **Register 2**: admin and user register.
- **addcourses 3**: admin can add course.
- **getcourse 4**: fetch the coure from the databse.
- **getcoursename/:Id 5**: get course name with the help of id.
- **addschedule 6**: admin can schedule for lecturek.
- **getschedule 7**: get routh.
- **dateInstructorAvailability 9**: this route check availibility for date.

  


<br/>

## Glimpses of Mini-Store 🙈 :


<table>
  <tr>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/9567c1da-be31-468b-bb46-a75dbd0a1202" alt="main page" /></td>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/e3c45241-6201-428e-bbeb-30c5425e21b9" alt="register" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/84010d30-9e3b-4eca-8716-491a3c9383f0" alt="login" /></td>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/04257e93-9da6-4b67-aa09-1eb929da1d57" alt="admin homes" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/d4378da1-8169-4a8b-b71d-12a970ca603e" alt="admin instructor" /></td>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/b6619f50-bdbd-40ed-99b9-b9c7e3b80775" alt="admin lecture scheduling" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Touqeer001/Lecture-Sheduling-Module/assets/126690073/594278e9-28ca-4bff-b990-35a5938ff7fb" alt="user page" /></td>

  </tr>
</table>

<br />

## Technologies Used

- **Frontend:** React, Styled Components
- **Backend:** Node.js, Express, MongoDB
- **Additional Tools:** Axios, React Router

## Getting Started

This project was built using React v 17.0.2,Bootstrap, CSS, JavaScript, Rest API, Node JS, Express and MongoDBand . It is an Online Lecture Sheduling Module web application and for running on your local environment you should follow these guidelines.


### Prerequisites

- NPM 
- Node JS
- MongoDB

### Setup


The project repository can be found in [GitHub link](https://github.com/Touqeer001/Lecture-Sheduling-Module.git) or just clone the project using this command. 


```
Using HTTPS

# git clone  https://github.com/Touqeer001/Lecture-Sheduling-Module.git
```

+ Open terminal on your workspace with

```
cd /client
```


## Install

Install NPM

Check that you have node and npm installed

To check if you have Node.js installed, run this command in your terminal:


```
node -v
```

To confirm that you have npm installed you can run this command in your terminal:


```
npm -v
```

To confirm that you have MongoDB installed you can run this command in your terminal:


```
mongo -v
```


To install all the dependences of the project, run the following command:


```
cd client

npm install

cd ../

cd server

npm install
```


To run the application got to the client folder and run the following command:

```
npm start
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in server folder

`JWT_ACCESS_KEY`

`MONGO_PATH`


### Tools used on this project

- Visual Studio Code
- create-react-app template
- MongoDB Atlas

<br/>



## Contact

If you want to contact me, you can reach me through below handles.


[![linkedin](https://img.shields.io/badge/touqeer-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/touqeer-ansari) 


[![GitHub](https://img.shields.io/badge/Touqeer001-20232A?style=for-the-badge&logo=Github&logoColor=white)](https://github.com/Touqeer001)

© 2024 Touqeer Ansari




## Show your support

Give a ⭐️ if you like this project!




