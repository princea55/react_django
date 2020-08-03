import React, { Component } from 'react'
import axiosInstance from "../axiosApi";

import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            student_list: "",
            college_serach_name: "",
            user_type: ""
        };
        this.record_list = this.record_list.bind(this);
        this.delete_record = this.delete_record.bind(this);

    }
    async record_list(college_serach) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.get(`/studentlist/?search=${college_serach}`, { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                student_list: students.data
            });
        } catch (error) {
            console.log(error);
        }

    }
    async delete_record(id) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.delete(`student/delete/${id}/`,
                { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            console.log(error);
        }
        this.record_list(this.state.college_serach_name);
    }
    componentDidMount() {
        let college_serach
        this.setState({ islogin: true });
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        this.setState({
            user_type: current_user.user_type,
        });
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            const current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );
            college_serach = current_user_detail.college
            this.setState({
                college_serach_name: college_serach
            });

        } else {
            this.setState({ invalid_college: true })
        }
        this.record_list(college_serach);
    }
    render() {
        if (this.state.user_type === 'College' || this.state.user_type === 'Professor') {
            return (
                <div className="container">

                    <div className="table-responsive mt-3">
                        <table className="table table-hover">
                            <caption>List of Students</caption>
                            <thead>
                                <tr className="table-info">
                                    <th scope="col"></th>
                                    <th scope="col">Enrollment</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">College</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(this.state.student_list).map((item, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>

                                            <td>{this.state.student_list[item].enrollment}</td>
                                            <td>{this.state.student_list[item].username}</td>
                                            <td>{this.state.student_list[item].email}</td>
                                            <td>{this.state.student_list[item].department}</td>
                                            <td>{this.state.student_list[item].semester}</td>
                                            <td>{this.state.student_list[item].college}</td>
                                            <td><Button
                                                variant="contained"
                                                color="secondary"
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => this.delete_record(this.state.student_list[item].id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container mt-5">
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Warning: </strong>You're not authorized to access this page!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        }

    }
}
