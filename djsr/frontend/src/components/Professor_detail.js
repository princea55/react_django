import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
import Avatar from '@material-ui/core/Avatar';
import Footer from './footer/footer';

export default class Professor_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            college: "",
            department: "",
            role: "",
            user_type: "",
            professor_detail: "",
            avatar: ""
        }
        this.serach_professor = this.serach_professor.bind(this);
    }
    async serach_professor(id) {
        let professor_detail_response;
        const header = localStorage.getItem("access_token");
        professor_detail_response = await axiosInstance.get(`professor/detail/${id}`, { headers: { "Authorization": `JWT ${header}` } });
        this.setState({
            professor_detail: professor_detail_response.data
        });
        this.setState({
            avatar: this.state.professor_detail.username[0].toUpperCase()
        })
        console.log(this.state.professor_detail);

    }
    componentDidMount() {
        const current_user = JSON.parse(localStorage.getItem("current_user"));
        this.setState({
            user_type: current_user.user_type,
        });
        const std_id = localStorage.getItem("prf_id");
        this.serach_student(prf_id);
    }
    render() {
        return (
            <div>
                <div className="container mt-3">
                    <div className="card mb-3" >
                        <div className="row no-gutters">
                            <div className="col">
                                <Avatar style={{ marginTop: "1.5rem", marginLeft: "20rem" }}>{this.state.avatar}</Avatar>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize font-weight-bolder">{this.state.professor_detail.username}</h5>
                                </div>
                                <ul className="list-group list-group-flush text-dark">
                                    <li className="list-group-item"><p className="text-muted">Email </p>{this.state.professor_detail.email}</li>
                                    <li className="list-group-item"><p className="text-muted">Department </p>{this.state.professor_detail.department}</li>
                                    <li className="list-group-item"><p className="text-muted">Semester </p>{this.state.professor_detail.role}</li>
                                    <li className="list-group-item"><p className="text-muted">College </p>{this.state.professor_detail.college}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
