import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
import Avatar from '@material-ui/core/Avatar';

export default class Student_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            college: "",
            department: "",
            semester: "",
            enrollment: "",
            user_type: "",
            student_detail: "",
            avatar: ""
        }
        this.serach_student = this.serach_student.bind(this);
    }
    async serach_student(id) {
        let student_detail_response;
        const header = localStorage.getItem("access_token");
        student_detail_response = await axiosInstance.get(`student/detail/${id}`, { headers: { "Authorization": `JWT ${header}` } });
        this.setState({
            student_detail: student_detail_response.data
        });
        this.setState({
            avatar: this.state.student_detail.username[0].toUpperCase()
        })
        console.log(this.state.student_detail);

    }
    componentDidMount() {
        const current_user = JSON.parse(localStorage.getItem("current_user"));
        this.setState({
            user_type: current_user.user_type,
        });
        const std_id = localStorage.getItem("std_id");
        this.serach_student(std_id);
    }
    render() {
        return (
            <div className="container mt-3">
                <div className="card mb-3" >
                    <div className="row no-gutters">
                        <div className="col">
                            <Avatar style={{ marginTop: "1.5rem", marginLeft: "20rem" }}>{this.state.avatar}</Avatar>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title text-capitalize font-weight-bolder">{this.state.student_detail.username}</h5>
                            </div>

                            <ul className="list-group list-group-flush text-dark">
                                <li className="list-group-item"><p className="text-muted">Email </p>{this.state.student_detail.email}</li>
                                <li className="list-group-item"><p className="text-muted">Enrollment </p>{this.state.student_detail.enrollment}</li>
                                <li className="list-group-item"><p className="text-muted">Department </p>{this.state.student_detail.department}</li>
                                <li className="list-group-item"><p className="text-muted">Semester </p>{this.state.student_detail.semester}</li>
                                <li className="list-group-item"><p className="text-muted">College </p>{this.state.student_detail.college}</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
