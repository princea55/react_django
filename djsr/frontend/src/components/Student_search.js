import React, { Component } from 'react'
import axiosInstance from "../axiosApi";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Footer from './footer/footer';

export default class Student_search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            enrollment: "",
            semester: "",
            department: "",
            college_serach_name: "",
            student_list: "",
            check_approve:"true"

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.student_detail = this.student_detail.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    async handleSubmit(event) {
        event.preventDefault();
        const header = localStorage.getItem("access_token");
        let students;
        try {
            students = await axiosInstance.get(`/studentlist/?search=${this.state.username}+${this.state.enrollment}+${this.state.semester}+${this.state.department}+${this.state.college_serach_name}`,
                { headers: { "Authorization": `Token ${header}` } });
            this.setState({
                student_list: students.data
            });
        } catch (error) {
            console.log(error);
        }
    }
    student_detail(id){
        localStorage.setItem('std_id', id);
        this.props.history.push("/student_profile/");
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
                                        name="enrollment"
                                        value={this.state.enrollment}
                                        onChange={this.handleChange}
                                        label="Enrollment"
                                        variant="outlined" />
                                </div>
                            </div>
                            <div className="col-sm">
                                <FormControl required
                                    className="form-control"
                                >
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        name="semester"
                                        value={this.state.semester}
                                        onChange={this.handleChange}
                                        className="componentsMargin"
                                    >   <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                        <MenuItem value="6">6</MenuItem>
                                        <MenuItem value="7">7</MenuItem>
                                        <MenuItem value="8">8</MenuItem>
                                    </Select>
                                    <FormHelperText>Select Semester</FormHelperText>
                                </FormControl>
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
                        Object.keys(this.state.student_list).map((item, i) => (
                            <div className="card mx-4 my-2  shadow bg-white rounded" style={{ width: "20rem" }} key={i}>
                                <div className="card-body" >
                                    <h3 className="card-title text-capitalize">{this.state.student_list[item].username}</h3>
                                </div>
                                <ul className="list-group list-group-flush text-dark">
                                    <li className="list-group-item"><p className="text-muted">Enrollment </p>{this.state.student_list[item].enrollment}</li>
                                    <li className="list-group-item"><p className="text-muted">Department </p>{this.state.student_list[item].department}</li>
                                    <li className="list-group-item"><p className="text-muted">Semester </p>{this.state.student_list[item].semester}</li>
                                </ul>
                                <div className="card-footer">
                                    
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => this.student_detail(this.state.student_list[item].id)}
                                        type="submit"

                                    >
                                        <a target="_blank"> DETAIL VIEW</a>
                                    </Button>
                                    {/* <a href="#" className="card-link">Another link</a> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
                <Footer/>
            </div>
           
        )
    }
}
