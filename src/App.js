//import modules
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import components
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import EmployeeView from "./components/employeeView";
import AddEmployee from "./components/addEmployee"
import EditEmployee from "./components/editEmployee"

//Parent Component 
function App() {

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>EMPLOYEE MANAGEMENT SYSTEM</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/employeeview"}>Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/employeeview" component={EmployeeView} />
            <Route path="/addEmployee" component={AddEmployee} />
            <Route path="/editEmployee/:empid" component={EditEmployee} />
          </Switch>

      
    </div></Router>
  );
}

export default App;
