import React, { Component } from 'react'
import axiosInstance from "../axiosApi";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Footer from './footer/footer';

export default class Professor_search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            enrollment: "",
            semester: "",
            department: "",
            role: "",
            college_serach_name: "",
            professors_list: "",
            check_approve:"true"

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete_record = this.delete_record.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    async handleSubmit(event) {
        event.preventDefault();
        const header = localStorage.getItem("access_token");
        let professors;
        try {
            professors = await axiosInstance.get(`/professorlist/?search=${this.state.username}+${this.state.role}+${this.state.department}+${this.state.college_serach_name}`,
                { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                professors_list: professors.data
            });
        } catch (error) {
            console.log(error);
        }
    }
    async delete_record(id) {
        const header = localStorage.getItem("access_token");
        let delete_professor;
        try {
            delete_professor = await axiosInstance.delete(`professor/delete/${id}/`,
                { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            console.log(error);
        }
        this.handleSubmit(event);
    }
    componentDidMount() {
        let college_serach,approve;
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
            if(current_user.user_type === "Professor"){
                approve = current_user_detail.is_approve
                this.setState({check_approve: approve});
            }
            
            this.setState({
                college_serach_name: college_serach
                
            });
        } else {
            this.setState({ invalid_college: true })
        }
    }
    render() {
        
        return (
            <div>
                <div className="container my-5 pb-5">
                    {/* serach bar */}
                    <div className="my-4 p-3">
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                            <div className="row ">
                                <div className="col-sm">
                                    <div className="input-group mb-3">
                                        <TextField
                                            type="text"
                                            className="form-control mb-3"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            label="Username"
                                            variant="outlined" />
                                    </div>
                                </div>
                                <div className="col-sm ">
                                    <div className="input-group mb-3">
                                        <TextField
                                            type="text"
                                            className="form-control mb-3"
                                            name="role"
                                            value={this.state.role}
                                            onChange={this.handleChange}
                                            label="Role"
                                            variant="outlined" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <TextField
                                            type="text"
                                            className="form-control mb-3"
                                            name="department"
                                            value={this.state.department}
                                            onChange={this.handleChange}
                                            label="Department"
                                            variant="outlined" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="form-control"
                                            type="submit"
                                            disabled={this.state.check_approve? false:true}
                                        >
                                            Search
                                    </Button>
                                        {/* <button type="submit" className="btn btn-outline-primary btn-lg form-control">Search</button> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* show list of students */}
                    <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                        {
                            Object.keys(this.state.professors_list).map((item, i) => (
                                <div className="card mx-4 my-2  shadow bg-white rounded" style={{ width: "20rem" }} key={i}>
                                    <div className="card-body" >
                                        <h3 className="card-title text-capitalize">{this.state.professors_list[item].username}</h3>
                                    </div>
                                    <ul className="list-group list-group-flush text-dark">
                                        <li className="list-group-item"><p className="text-muted">Role </p>{this.state.professors_list[item].role}</li>
                                        <li className="list-group-item"><p className="text-muted">Department </p>{this.state.professors_list[item].department}</li>
                                        <li className="list-group-item"><p className="text-muted">Email </p>{this.state.professors_list[item].email}</li>
                                    </ul>
                                    <div className="card-footer">

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => this.delete_record(this.state.professors_list[item].id)}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                    </Button>
                                        {/* <a href="#" className="card-link">Another link</a> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}
