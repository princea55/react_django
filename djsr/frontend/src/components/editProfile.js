import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';


import { submit, main_div, main_body, component_margin, paperContent, warning } from './style';
import axiosInstance from "../axiosApi";

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            username: "",
            email: "",
            user_type: "",
            password: "",
            user_errors: {},
            islogin: false,
        }
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmitWThen(event) {
        event.preventDefault();
        const header = localStorage.getItem("access_token");
        
        try {
            await axiosInstance.put(`user/update/${this.state.id}/`, {
                username: this.state.username,
                email: this.state.email,
                user_type: this.state.user_type,
                password: this.state.password
            }, { headers: { "Authorization": `JWT ${header}` } });

        } catch (error) {
            this.setState({
                errors: error.response.data
            });
            console.log(error);
        }
       
    }
    componentDidMount() {
        this.setState({ islogin: true });
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        this.setState({
            id :current_user.id,
            username: current_user.username,
            email: current_user.email,
            user_type: current_user.user_type,

        });
    }
    render() {

        if (this.state.islogin) {
            return (
                <div style={main_body}>
                    <Paper elevation={3} style={paperContent}>
                        <div >
                            <div style={main_div}>
                                <form onSubmit={this.handleSubmitWThen} noValidate autoComplete="off">
                                    <TextField
                                        error={this.state.user_errors.username ? true : false}
                                        style={component_margin}
                                        className="inputs componentsMargin"
                                        helperText={this.state.user_errors.username ? this.state.user_errors.username : null}
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        label="Username"
                                        variant="outlined" />
                                    <br />
                                    <TextField
                                        error={this.state.user_errors.email ? true : false}
                                        style={component_margin}
                                        className="inputs componentsMargin"
                                        helperText={this.state.user_errors.email ? this.state.user_errors.email : null}
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        label="Email"
                                        variant="outlined" />

                                    <br />
                                    <FormControl required
                                        style={{
                                            margin: "5px",
                                            width: "27rem",
                                        }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            name="user_type"
                                            value={this.state.user_type}
                                            onChange={this.handleChange}
                                            className="componentsMargin"
                                        >
                                            <MenuItem value="College">College</MenuItem>
                                            <MenuItem value="Professor">Professor</MenuItem>
                                            <MenuItem value="Student">Student</MenuItem>
                                        </Select>
                                        <FormHelperText>Select Your type</FormHelperText>
                                    </FormControl><br />
                                    <TextField
                                        error={this.state.user_errors.password ? true : false}
                                        style={component_margin}
                                        helperText={this.state.user_errors.password ? this.state.user_errors.password : null}
                                        className="inputs componentsMargin"
                                        id="outlined-basic"
                                        type="text"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        label="Password"
                                        variant="outlined" />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={submit}
                                        type="submit"
                                    >
                                        Update
                                 </Button>
                                </form>
                            </div>
                        </div>
                    </Paper>
                </div>
            )
        } else {
            return (
                <h1 style={warning}>You have to login to access this page</h1>
            )
        }
    }

}