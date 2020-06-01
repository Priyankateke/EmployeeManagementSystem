import React, { Component } from "react";

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
export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            experience: '',
            password: '',
            isError: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                experience: '',
                password: ''
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
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
        const { isError } = this.state;
        return (
            <form>
                <h3>Sign Up</h3>


                <div className="form-group">
                    <label>First Name</label>
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
                    <input type="text" className="form-control" placeholder="Enter Gender" />
                </div>


                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="Enter City" />
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <input type="text" className="form-control" placeholder="Enter Designation" />
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

                <button type="submit" className="btn btn-primary btn-block" onClick="onSubmit()">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>

        );
    }
}
