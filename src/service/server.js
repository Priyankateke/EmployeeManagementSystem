var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors');
const bodyParser = require('body-parser')

app.options('*', cors());
app.use(cors());

app.use(bodyParser.urlencoded({
   extended: true
}))

app.use(bodyParser.json())

app.post('/endpoint', (req, res) => {
   console.log(req.body.todo)
})

app.get('/listUsers', function (req, res) {
   fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      console.log(data);
      res.header('Access-Control-Allow-Credentials', true);
      res.end(data);
   });
})

app.get('/getEmployee/:empid', function (req, res) {
   var id = req.params.empid;

   fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      let emp = data.find(record => record.EmpId === parseInt(id));
      console.log(emp);
      res.header('Access-Control-Allow-Credentials', true);
      res.end(JSON.stringify(emp));
   });
})

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      var exist;
      data = JSON.parse(data);
      var id = 1;
      if (data != undefined && data.length > 0) {

         exist = data.filter(function(value){ return value.Username.toLowerCase() === req.body.employee.Username.toLowerCase();})

         id = data.reduce(function (prev, current) {
            return (prev.EmpId > current.EmpId) ? prev : current
         });
         id = id.EmpId + 1;
      }

      if (exist != undefined && exist.length > 0) {
         res.end("User Name already exist");
      }
      else {

         req.body.employee.EmpId = id;
         data.push(req.body.employee);

         let json = JSON.stringify(data);
         fs.writeFile(__dirname + "/data/" + "users.json", json, function (err) {
            console.log(data);
         });
         res.end("New Employee added successfully");
      }
   });
});

app.post('/editUser', function (req, res) {
   // First read existing users.
   var empId = req.body.employee.EmpId;
   fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      if (data != undefined && data.length > 0) {
         let emp = data.find(record => record.EmpId === parseInt(empId));
         if (emp != undefined) {
            
            data = RemoveNode(data,req.body.employee.Username);      
            data.push(req.body.employee);
   
            let json = JSON.stringify(data);
            fs.writeFile(__dirname + "/data/" + "users.json", json, function (err) {
               console.log(data);
            });
            res.end("Employee updated successfully");
         }
         else {   
            res.end("Employee not found");
         }     
      }
      res.end("Employee not found");    
   });
});

app.post('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      
      data = RemoveNode(data,req.body.username);

      let json = JSON.stringify(data);
      fs.writeFile(__dirname + "/data/" + "users.json", json, function (err) {
         console.log(data);
      });
      res.end(JSON.stringify(data));
   });
});

function RemoveNode( d, UserName){
   d.forEach(function(e, index){
   if(UserName.toLowerCase() == e.Username.toLowerCase()){
       d.splice(index, 1);
   }
 })
 return d;
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})