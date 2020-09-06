import React, { Component } from "react";

import axiosInstance from "../axiosApi";
import { warning } from "./style";

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from "@material-ui/core/Avatar";
import Footer from "./footer/footer";
import Attendance from "./Attendance";
import uuid from 'react-uuid';
class CollegeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            city: "",
            phone: "",
            college: "",
            islogin: false,
            department: "",
            role: "",
            user_type: "",
            semester: "",
            enrollment: "",
            sem_group: "",
            student_list: [],
            SemSearchField: "",
            MonthSearchField: "09",
            
        };
        this.attendance_list = this.attendance_list.bind(this);
    }

    async attendance_list(enrollment) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.get(
                `/attendancelist/?search=${enrollment}`,
                { headers: { Authorization: `JWT ${header}` } }
            );
            this.setState({
                student_list: students.data,
            });
            // console.log(this.state.student_list[1].created_date.substring(5, 7));
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        let current_user, current_user_detail;
        this.setState({ islogin: true });
        if (JSON.parse(localStorage.getItem("current_user"))) {
            current_user = JSON.parse(localStorage.getItem("current_user"));
            this.setState({
                username: current_user.username,
                email: current_user.email,
                user_type: current_user.user_type,
            });
        }
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );
            this.setState({
                city: current_user_detail.city,
                phone: current_user_detail.phone,
                college: current_user_detail.college,
                department: current_user_detail.department,
                semester: current_user_detail.semester,
                enrollment: current_user_detail.enrollment,
                role: current_user_detail.role,
            });
            this.setState({ SemSearchField: current_user_detail.semester })
            if (current_user.user_type === 'Student') {
                this.attendance_list(current_user_detail.enrollment);
            }

        }
    }
    render() {
        console.log(this.state.SemSearchField);
        console.log(this.state.MonthSearchField);
        const filterstdlist = this.state.student_list.filter(
            (std) => (std.sem == this.state.SemSearchField && std.created_date.substring(5, 7) == this.state.MonthSearchField)
        );
        // console.log(filterstdlist);
        if (this.state.islogin) {
            if (this.state.user_type === "Professor") {
                return (
                    <div>
                        <div className="container mt-3">
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar
                                            style={{ marginTop: "1.5rem", marginLeft: "20rem" }}
                                            className="text-capitalize"
                                        >
                                            {this.state.username[0]}
                                        </Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">
                                                {this.state.username}
                                            </h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item">
                                                <p className="text-muted">Email </p>
                                                {this.state.email}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Department </p>
                                                {this.state.department}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Role </p>
                                                {this.state.role}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">College </p>
                                                {this.state.college}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>
                );
            } else if (this.state.user_type === "College") {
                return (
                    <div>
                        <div className="container mt-3">
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar
                                            style={{ marginTop: "1.5rem", marginLeft: "20rem" }}
                                            className="text-capitalize"
                                        >
                                            {this.state.username[0]}
                                        </Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">
                                                {this.state.username}
                                            </h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item">
                                                <p className="text-muted">Email </p>
                                                {this.state.email}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">City </p>
                                                {this.state.city}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Phone </p>
                                                {this.state.phone}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">College </p>
                                                {this.state.college}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                );
            } else if (this.state.user_type === "Student") {
                return (
                    <div>
                        <div className="container mt-3">
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar
                                            style={{ marginTop: "1.5rem", marginLeft: "20rem" }}
                                            className="text-capitalize"
                                        >
                                            {this.state.username[0]}
                                        </Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">
                                                {this.state.username}
                                            </h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item">
                                                <p className="text-muted">Email </p>
                                                {this.state.email}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Enrollment </p>
                                                {this.state.enrollment}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Department </p>
                                                {this.state.department}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">Semester </p>
                                                {this.state.semester}
                                            </li>
                                            <li className="list-group-item">
                                                <p className="text-muted">College </p>
                                                {this.state.college}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           

                        </div>

                        <div className="container mt-3">


                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search By Semester"
                                                onChange={(e) => this.setState({ SemSearchField: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Search By Month"
                                            onChange={(e) => this.setState({ MonthSearchField: e.target.value })}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Attendance filterlst={filterstdlist} />
                        </div>

                        <div className="mt-4">
                            <Footer />
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <h1 style={warning}>You have to login to access this page</h1>
                    <Footer />
                </div>
            );
        }
    }
}
export default CollegeDetail;
