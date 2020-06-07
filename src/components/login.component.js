import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//LOGIN Component
export default class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper" >
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <Link to="/employeeview" align="right"><button type="button" className="btn btn-primary btn-block" >Login</button></Link>
                    </form>
                </div>
            </div>
        );
    }
}