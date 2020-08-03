import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            professor_list: "",
            user_type: "",
            college_serach_name: ""
        };
        this.record_list = this.record_list.bind(this);
        this.delete_record = this.delete_record.bind(this);

    }
    async record_list(college_serach) {
        const header = localStorage.getItem("access_token");
        let professors;
        try {
            professors = await axiosInstance.get(`/professorlist/?search=${college_serach}`, { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                professor_list: professors.data
            });
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
        if (this.state.user_type === 'College') {
            return (
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
                                                    <td><button type="button" onClick={() => this.delete_record(this.state.professor_list[item].id)} className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            )
                                        

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
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )

        }

    }
}
