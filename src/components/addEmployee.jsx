import React, { Component } from "react";
import $ from "jquery"

//Requires Module
var http = require('http');
// const axios = require('axios')
// var url = require('url');
// var fs = require('fs');
// var qs = require('querystring');


//Regex Patterns
const EMAIL_PATTERN = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const NAME_PATTERN = RegExp(
    /^[A-Z]{1}[a-z]{2,}$/
)

const USERNAME_PATTERN = RegExp(
    /^[A-Za-z0-9_]{3,20}$/
)

const EXPERIENCE_PATTERN = RegExp(
    /^[0-9]{0,2}$/
)

const GENDER_CITY_PATTERN = RegExp(
    /^[A-Za-z]{1,}$/
)


const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

//Component
export default class AddEmployee extends Component {

    constructor(props) {
        super(props)

        //declare states
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            gender: '',
            city: '',
            designation: '',
            experience: '',
            password: '',
            isError: {
                firstname: '',
                lastname: '',
                username: '',
                gender: '',
                city: '',
                designation: '',
                email: '',
                experience: '',
                password: ''
            }
        }
    }

    //onSubmit Action
    onSubmit = e => {

        e.preventDefault();

        if (formValid(this.state)) {
            console.log('onsubmit')
            console.log(this.state)

            this.storeData();

        } else {
            console.log("Form is invalid!");
        }
    };

    /**
     * Store data
     */
    storeData() {

        //Employee Registration data
        let registrationData = {
            "employee": {
                Firstname: this.state.firstname,
                Lastname: this.state.lastname,
                Username: this.state.username,
                Email: this.state.email,
                Gender: this.state.gender,
                City: this.state.city,
                Designation: this.state.designation,
                Experience: this.state.experience,
                Password: this.state.password
            }
        };
        console.log("Registartion" + registrationData)

        //Store data into json file
        $.ajax({
            //url:Specifies the URL to send the request to.
            url: "http://localhost:8081/addUser",

            //A function to be run when the request succeeds
            success: function (result) {
                alert(result);
            },

            //error: A function to run if the request fails.
            error: function (a, b, c) {
                debugger;
                alert('error')
            },

            //type: Specifies the type of request. (GET or POST)
            type: 'POST',

            //contentType: used when sending data to the server. 
            contentType: 'application/json',

            //data:Specifies data to be sent to the server
            //data: JSON.stringify(user)
            data: JSON.stringify(registrationData)
        });
    };


    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "firstname":
                isError.firstname = NAME_PATTERN.test(value)
                    ? ""
                    : "First Name is invalid";
                break;
            case "lastname":
                isError.lastname = NAME_PATTERN.test(value)
                    ? ""
                    : "Last Name is invalid";
                break;
            case "username":
                isError.username = USERNAME_PATTERN.test(value)
                    ? ""
                    : "Username is invalid";
                break;
            case "email":
                isError.email = EMAIL_PATTERN.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "gender":
                isError.gender = GENDER_CITY_PATTERN.test(value)
                    ? ""
                    : "gender is invalid";
                break;
            case "city":
                isError.city = GENDER_CITY_PATTERN.test(value)
                    ? ""
                    : "city is invalid";
                break;
            case "experience":
                isError.experience = EXPERIENCE_PATTERN.test(value)
                    ? ""
                    : "Experience is invalid";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        })

    };
    render() {
        console.log("render method")
        const { isError } = this.state;
        return (
            <div className="auth-wrapper" >
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit} noValidate>
                   
                        <h3>Add Employee</h3>

                        <div className="form-group">
                            <label >First Name</label>
                            <input
                                type="text"
                                className={isError.firstname.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="firstname"
                                placeholder="Enter First name"
                                onChange={this.formValChange}
                            />
                            {isError.firstname.length > 0 && (
                                <span className="invalid-feedback">{isError.firstname}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className={isError.lastname.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="lastname"
                                placeholder="Enter Last name"
                                onChange={this.formValChange}
                            />
                            {isError.lastname.length > 0 && (
                                <span className="invalid-feedback">{isError.lastname}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className={isError.username.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="username"
                                placeholder="Enter Username"
                                onChange={this.formValChange}
                            />
                            {isError.username.length > 0 && (
                                <span className="invalid-feedback">{isError.username}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="email"
                                placeholder="Enter email"
                                onChange={this.formValChange}
                            />
                            {isError.email.length > 0 && (
                                <span className="invalid-feedback">{isError.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <input
                                type="text"
                                className={isError.gender.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="gender"
                                placeholder="Enter Gender"
                                onChange={this.formValChange}
                            />
                            {isError.gender.length > 0 && (
                                <span className="invalid-feedback">{isError.gender}</span>
                            )}
                        </div>


                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                className={isError.city.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="city"
                                placeholder="Enter City"
                                onChange={this.formValChange}
                            />
                            {isError.city.length > 0 && (
                                <span className="invalid-feedback">{isError.city}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                className={isError.designation.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="designation"
                                placeholder="Enter Designation"
                                onChange={this.formValChange}
                            />
                            {isError.designation.length > 0 && (
                                <span className="invalid-feedback">{isError.designation}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Experience</label>
                            <input
                                type="text"
                                className={isError.experience.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="experience"
                                placeholder="Enter Experience"
                                onChange={this.formValChange}
                            />
                            {isError.experience.length > 0 && (
                                <span className="invalid-feedback">{isError.experience}</span>
                            )}
                        </div>


                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"}
                                name="password"
                                placeholder="Enter password"
                                onChange={this.formValChange}
                            />
                            {isError.password.length > 0 && (
                                <span className="invalid-feedback">{isError.password}</span>
                            )}
                        </div>
                        <button type="submit" align="center" className="btn btn-success btn-block">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

