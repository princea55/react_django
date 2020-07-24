import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            student_list: "",
        };
        this.record_list = this.record_list.bind(this);

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
        ``
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


        } else {
            this.setState({ invalid_college: true })
        }
        this.record_list(college_serach);
    }
    render() {

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
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
