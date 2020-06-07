import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const axios = require('axios')
export default class EmployeeView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    editemployee = (empid) => {
        this.props.history.push({
            pathname: '/editEmployee/' + empid
        });
    };

    fetchEmployee() {
        axios.get('http://localhost:8081/listUsers', {
            responseType: 'json'
        }).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        this.fetchEmployee()
    }

    onDelete = e => {

        var EmpId = e.target.attributes.getNamedItem('data-empid').value;
        var Username = e.target.attributes.getNamedItem('data-username').value;
        
        axios.post('http://localhost:8081/deleteUser', {
            username: Username
        }).then(() => {
            console.log("Deleted: " + Username);
            this.fetchEmployee();
        })
            .catch(err => console.log(err));;

    };


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (


                <div className="auth-wrapper" >
                    <div className="auth-inner-full"  >
                        <h3>Employee List</h3>
                        <Link to="/addEmployee" align="right"><button type="button" className="btn btn-success" > Add Employee </button></Link>
                        <br />
                        <br />
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>First Name </th>
                                    <th>Last name</th>
                                    <th>User name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>City</th>
                                    <th>Designation</th>
                                    <th>Experience</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item => (
                                        <tr>
                                            <td> {item.Firstname}</td>
                                            <td> {item.Lastname}</td>
                                            <td>{item.Username}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Gender}</td>
                                            <td>{item.City}</td>
                                            <td>{item.Designation}</td>
                                            <td>{item.Experience}</td>
                                            <td><button type="button" id="btnEdit" class="btn btn-warning btn-sm" data-username={item.Username} data-empid={item.EmpId} onClick={() => { this.editemployee(item.EmpId) }}>  Edit</button></td>
                                            <td><button type="button" id="btnDelete" class="btn btn-danger btn-sm" data-username={item.Username} data-empid={item.EmpId} onClick={this.onDelete}>Delete</button></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
};




