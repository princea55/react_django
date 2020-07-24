import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
export default class ProfessorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: "",
            invalid_college: "",
            professor_list: "",
        };
        this.record_list = this.record_list.bind(this);

    }
    async record_list(college_serach) {
        const header = localStorage.getItem("access_token");
        let professors;
        try {
            professors = await axiosInstance.get(`/professorlist/?search=${college_serach}`, { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                professor_list: professors.data
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
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>

                                        <td>{this.state.professor_list[item].username}</td>
                                        <td>{this.state.professor_list[item].email}</td>
                                        <td>{this.state.professor_list[item].department}</td>
                                        <td>{this.state.professor_list[item].role}</td>
                                        <td>{this.state.professor_list[item].college}</td>
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
