import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axiosInstance from "../axiosApi";
import Footer from './footer/footer';
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            professor_list: "",
            user_type: "",
            college_serach_name: "",
            department_serach_name: "",
            check_approve: ""
        };
        this.record_list = this.record_list.bind(this);
        this.delete_record = this.delete_record.bind(this);

    }
    async record_list(college_serach, user, department) {
        const header = localStorage.getItem("access_token");
        let professors;
        console.log(this.state.user_type);
        try {
            if (user === 'College') {
                professors = await axiosInstance.get(`/professorlist/?search=${college_serach}+False+HOD`, { headers: { "Authorization": `Token ${header}` } });
                this.setState({
                    professor_list: professors.data
                });
            } else if (user === "Professor") {
                professors = await axiosInstance.get(`/professorlist/?search=${college_serach}+False+Professor+${department}`, { headers: { "Authorization": `Token ${header}` } });
                this.setState({
                    professor_list: professors.data
                });
            }
            console.log(this.state.professor_list);
        } catch (error) {
            console.log(error);
        }

    }
    async delete_record(id) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.delete(`professor/delete/${id}/`,
                { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            console.log(error);
        }

        this.record_list(this.state.college_serach_name, this.state.user_type, this.state.department_serach_name);
    }
    async approve_record(id) {
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.patch(`professor/update/${id}/`, {
                is_approve: "True"
            }, { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            console.log(error);
        }
        console.log(this.state.user_type);
        this.record_list(this.state.college_serach_name, this.state.user_type, this.state.department_serach_name);
    }
    componentDidMount() {
        let current_user_detail;
        this.setState({ islogin: true });
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        this.setState({
            user_type: current_user.user_type,
        });
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );

            this.setState({
                college_serach_name: current_user_detail.college,
                department_serach_name: current_user_detail.department,
                check_approve: current_user_detail.is_approve
            });

        } else {
            this.setState({ invalid_college: true })
        }
        this.record_list(current_user_detail.college, current_user.user_type, current_user_detail.department);
    }
    render() {
        if (this.state.user_type === 'College' || (this.state.user_type === 'Professor' && this.state.check_approve === true)) {
            return (
                <div>
                    <div className="container">

                        <div className="table-responsive mt-3">
                            <table className="table table-hover">
                                <caption>List of Professors</caption>
                                <thead>
                                    <tr className="table-info">
                                        <th scope="col"></th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">College</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(this.state.professor_list).map((item, i) => (

                                            this.state.professor_list[item].is_active === "True" ? (null) : (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>

                                                    <td>{this.state.professor_list[item].username}</td>
                                                    <td>{this.state.professor_list[item].email}</td>
                                                    <td>{this.state.professor_list[item].department}</td>
                                                    <td>{this.state.professor_list[item].role}</td>
                                                    <td>{this.state.professor_list[item].college}</td>
                                                    <td><Button
                                                        type="button"
                                                        variant="outline-success"
                                                        onClick={() => this.approve_record(this.state.professor_list[item].id)}

                                                    >Approve</Button></td>
                                                    <td><Button
                                                        type="button"
                                                        variant="outline-danger"
                                                        onClick={() => this.delete_record(this.state.professor_list[item].id)}
                                                    >Delete</Button></td>
                                                </tr>
                                            )
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