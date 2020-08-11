import React, { Component } from "react";

import {
    warning
} from "./style";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar';
import Footer from "./footer/footer";
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

        };
    }

    componentDidMount() {
        this.setState({ islogin: true });
        if (JSON.parse(localStorage.getItem("current_user"))) {
            const current_user = JSON.parse(localStorage.getItem("current_user"));
            this.setState({
                username: current_user.username,
                email: current_user.email,
                user_type: current_user.user_type,
            });
        }
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            const current_user_detail = JSON.parse(
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
        }
    }
    render() {
        if (this.state.islogin) {
            if (this.state.user_type === "Professor") {
                return (
                    <div>
                        <div className="container mt-3">
                            <div className="card mb-3" >
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar style={{ marginTop: "1.5rem", marginLeft: "20rem" }} className="text-capitalize">{this.state.username[0]}</Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">{this.state.username}</h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item"><p className="text-muted">Email </p>{this.state.email}</li>
                                            <li className="list-group-item"><p className="text-muted">Department </p>{this.state.department}</li>
                                            <li className="list-group-item"><p className="text-muted">Role </p>{this.state.role}</li>
                                            <li className="list-group-item"><p className="text-muted">College </p>{this.state.college}</li>
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
                            <div className="card mb-3" >
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar style={{ marginTop: "1.5rem", marginLeft: "20rem" }} className="text-capitalize">{this.state.username[0]}</Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">{this.state.username}</h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item"><p className="text-muted">Email </p>{this.state.email}</li>
                                            <li className="list-group-item"><p className="text-muted">City </p>{this.state.city}</li>
                                            <li className="list-group-item"><p className="text-muted">Phone </p>{this.state.phone}</li>
                                            <li className="list-group-item"><p className="text-muted">College </p>{this.state.college}</li>
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
                            <div className="card mb-3" >
                                <div className="row no-gutters">
                                    <div className="col">
                                        <Avatar style={{ marginTop: "1.5rem", marginLeft: "20rem" }} className="text-capitalize">{this.state.username[0]}</Avatar>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize font-weight-bolder">{this.state.username}</h5>
                                        </div>

                                        <ul className="list-group list-group-flush text-dark">
                                            <li className="list-group-item"><p className="text-muted">Email </p>{this.state.email}</li>
                                            <li className="list-group-item"><p className="text-muted">Enrollment </p>{this.state.enrollment}</li>
                                            <li className="list-group-item"><p className="text-muted">Department </p>{this.state.department}</li>
                                            <li className="list-group-item"><p className="text-muted">Semester </p>{this.state.semester}</li>
                                            <li className="list-group-item"><p className="text-muted">College </p>{this.state.college}</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <Footer />
                    </div>

                )
            }

        } else {
            return (
                <div>
                    <h1 style={warning}>You have to login to access this page</h1>
                    <Footer />
                </div>

            )
        }
    }
}
export default CollegeDetail;
