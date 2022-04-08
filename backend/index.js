// // const http = require("http");

// const COURSES = [
//     {
//       id: 1,
//       name: "NodeJs",
//     },
//   {
//     id: 2,
//     name: "ReactJs",
//   },
// ];

// // const server = http.createServer((req, res) => {
// //   //set header
// //   res.writeHead(404, {
// //     "Content-type" : "application/json",
// //     'X-Powered-By' : 'Node.js',
// //   })
  
// //   res.end(JSON.stringify({
// //         success : false,
// //         error : 'NOT FOUND',
// //         data : null,
// //   }));
// // });

// // const PORT = 5000;
// // server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express')
// const app = express()
// app.use(express.json())

// app.get('/',(req, res)=>{
//   res.send('Hello');
// });
// app.get('/api/courses',(req, res)=>{
//   res.send(COURSES);
// });
// app.get('/api/courses/:id',(req, res)=>{
//   const course = COURSES.find(COURSES => COURSES.id === req.params.id );
//   if (!course) res.status(404).send('ID course don\'t exist ')
//   res.send(course);
// });

// app.post('/api/courses/add',(req, res)=>{
//   const course = {
//     id : req.body.id,
//     name : req.body.name,
//   }
//   COURSES.push(course);
//   res.send(JSON.stringify({
//     success: true,
//     data: COURSES
//   }));
// });
// app.put('/api/courses/edit/:id',(req, res)=>{
//     const course = COURSES.find(COURSES => COURSES.id === parseInt(req.params.id) );
//     if (!course) res.status(404).send('ID course don\'t exist ')
//     course.name = req.body.name;
//     res.send(JSON.stringify({
//       success: true,
//       data: COURSES
//     }))
// });
// app.delete('/api/courses/delete/:id',(req, res)=>{
//     const course = COURSES.find(COURSES => COURSES.id === parseInt(req.params.id ) );
//     if (!course) res.status(404).send('Id course don\'t exist ')
//     let index = COURSES.indexOf(course)
//     COURSES.splice(index,1)
//     res.send(JSON.stringify({
//       success: true,
//       data: COURSES
//     }))
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
//=======================================================================================================

const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGODB_URL,()=>{
  console.log("connected success")
})

app.use(cors())           // to avoid Cor error
app.use(cookieParser())   // to create Cookie
app.use(express.json())   // to request and response data by json

//ROUTES
app.use("/v1/auth",authRoute)
app.use("/v1/user",userRoute)

app.listen(5000,()=>{
  console.log(`Server is running on port 5000`)
})



