import React, { Component } from 'react'
import axiosInstance from "../axiosApi";

// import Button from '@material-ui/core/Button';
import { Button } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import Footer from './footer/footer';
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            student_list: "",
            college_search_name: "",
            department_search_name: "",
            user_type: "",
            approve: "False",
            check_approve: ""
        };
        this.record_list = this.record_list.bind(this);
        this.approve_record = this.approve_record.bind(this);
        this.delete_record = this.delete_record.bind(this);

    }
    async record_list(college_serach, department_search) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.get(`/studentlist/?search=${college_serach}+${department_search}+${this.state.approve}`, { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                student_list: students.data
            });
        } catch (error) {
            console.log(error);
        }

    }
    async approve_record(id) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.patch(`student/update/${id}/`, {
                is_approve: "True"
            }, { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            console.log(error);
        }
        this.record_list(this.state.college_search_name, this.state.department_search_name);
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
        this.record_list(this.state.college_search_name, this.state.department_search_name);
    }
    componentDidMount() {
        let college_serach, department_search;
        this.setState({ islogin: true });
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        this.setState({
            user_type: current_user.user_type,
        });
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            const current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );
            college_serach = current_user_detail.college;
            department_search = current_user_detail.department;
            this.setState({
                college_search_name: college_serach,
                department_search_name: department_search,
                check_approve: current_user_detail.is_approve
            });

        } else {
            this.setState({ invalid_college: true })
        }
        this.record_list(college_serach, department_search);
    }
    render() {
        if ((this.state.user_type === 'College') || (this.state.user_type === 'Professor' && this.state.check_approve === true)) {
            return (
                <div>
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
                                                    variant="outline-success"
                                                    color="secondary"
                                                    type="button"

                                                    onClick={() => this.approve_record(this.state.student_list[item].id)}

                                                >
                                                    Approve
                                                </Button></td>
                                                <td><Button
                                                    variant="outline-danger"
                                                    color="secondary"
                                                    type="button"
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
                    <Footer />
                </div>

            )
        } else {
            return (
                <div>
                    <div className="container mt-5">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Warning: </strong>You're not authorized to access this page!
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }

    }
}
