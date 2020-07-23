import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import { h1_style, submit, main_div, alert, component_margin, main_body, paperContent } from './style';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            data: "",
            current_user: "",
            current_user_detail: "",
            token: localStorage.getItem("access_token"),
            errors: {},
            islogin: true

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmitWThen(event) {
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
            username: this.state.username,
            password: this.state.password
        }).then(
            result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                this.setState({ data: result })
                this.setState({
                    errors: ""
                });
                this.getMessage()
            }
        ).catch(error => {
            this.setState({
                errors: error.response.data
            });
        })
    }
    async getMessage() {
        try {
            // get user data from customeuser table
            let response = await axiosInstance.get('/hello/');
            this.setState({
                current_user: response.data.hello,
            });
            if (this.state.current_user.user_type === "College") {
                // search detail for user in college table
                let college_detail_response = await axiosInstance.get(`/college/list/?search=${this.state.current_user.username}`, { headers: { "Authorization": `Token ${this.state.token}` } });
                this.setState({
                    current_user_detail: college_detail_response.data[0]
                });
            } else if (this.state.current_user.user_type === "Professor") {
                // search detail for user in Professor table
                let professor_detail_response = await axiosInstance.get(`/professorlist/?search=${this.state.current_user.username}`, { headers: { "Authorization": `Token ${this.state.token}` } });
                this.setState({
                    current_user_detail: professor_detail_response.data[0]
                });
            } else if (this.state.current_user.user_type === "Student") {
                // search detail for user in Student table
                let student_detail_response = await axiosInstance.get(`/studentlist/?search=${this.state.current_user.username}`, { headers: { "Authorization": `Token ${this.state.token}` } });
                this.setState({
                    current_user_detail: student_detail_response.data[0]
                });
            }
            localStorage.setItem('islogin', this.state.islogin);
            localStorage.setItem('current_user', JSON.stringify(this.state.current_user));
            if (this.state.current_user_detail) {
                localStorage.setItem('current_user_detail', JSON.stringify(this.state.current_user_detail));
            }


            this.props.history.push("/profile/")
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    render() {


        return (
            <div style={main_body}>
                <Paper elevation={3} style={paperContent}>
                    <div >
                        <h1 style={h1_style}>Login</h1>
                        <h5 style={alert}>{this.state.errors ? this.state.errors.detail : null}</h5>
                        <div style={main_div}>

                            <form onSubmit={this.handleSubmitWThen} noValidate autoComplete="off">
                                <TextField
                                    style={component_margin}
                                    className="inputs componentsMargin"

                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    label="Username"
                                    variant="outlined" />
                                {/* {this.state.errors.username ? this.state.errors.username : null} */}
                                <br />
                                <TextField
                                    style={component_margin}
                                    className="inputs componentsMargin"

                                    type="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                {/* {this.state.errors.password ? this.state.errors.password : null} */}
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={submit}
                                    type="submit"
                                >
                                    Login
                    </Button>
                            </form>

                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}
export default Login;