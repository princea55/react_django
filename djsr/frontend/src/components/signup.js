
import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import { h1_style, submit, main_div, component_margin, dropdown, paperContent, main_body } from './style';



import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Footer from "./footer/footer";



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            user_type: "Student",
            confirm_password: "",
            errors: {},
            invalid_confirm: false,
            

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.password === this.state.confirm_password) {
            this.setState({ invalid_confirm: false })
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.password != this.state.confirm_password) {
            this.setState({ invalid_confirm: true })
        } else {
            this.setState({ invalid_confirm: false })
            try {
                const response = await axiosInstance.post('/user/create/', {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    user_type: this.state.user_type
                });
                this.props.history.push("/login/")
            } catch (error) {
                this.setState({
                    errors: error.response.data
                });
            }
        }
    }


    render() {
        return (
            <div>
                <div className="container mt-5 shadow p-5 mb-5 bg-white rounded">

<div className="d-flex justify-content-center">
    <h1>Signup</h1><br />

</div>
<div className="d-flex p-4 justify-content-center ">
    <div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
            <TextField
                error={this.state.errors.username ? true : false}
                style={component_margin}
                className="inputs componentsMargin"

                type="text"
                name="username"
                FormHelperTextProps={{ color: "red" }}
                helperText={this.state.errors.username ? this.state.errors.username : null}
                value={this.state.username}
                onChange={this.handleChange}
                label="Username"
                variant="outlined" />

            <br />

            <TextField
                error={this.state.errors.email ? true : false}
                style={component_margin}
                className="inputs componentsMargin"

                type="email"
                name="email"
                label="Email"
                variant="outlined"
                value={this.state.email}
                helperText={this.state.errors.email ? this.state.errors.email : null}
                onChange={this.handleChange} />

            <br />
            <FormControl required
                style={dropdown}
            >

                <Select

                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    name="user_type"
                    value={this.state.user_type}
                    onChange={this.handleChange}
                    className="componentsMargin"
                >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="College">College</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>

                </Select>
                <FormHelperText>Select Your type</FormHelperText>
            </FormControl><br />
            <TextField
                error={this.state.errors.password ? true : false}
                style={component_margin}
                className="inputs componentsMargin"

                type="password"
                name="password"
                label="Password"
                variant="outlined"
                value={this.state.password}
                helperText={this.state.errors.password ? this.state.errors.password : null}
                onChange={this.handleChange} />

            <br />

            <TextField
                error={this.state.invalid_confirm ? true : false}
                style={component_margin}
                className="inputs componentsMargin"

                type="password"
                name="confirm_password"
                label="Confirm Password"
                variant="outlined"
                helperText="Both password should be match"
                value={this.state.confirm_password}
                onChange={this.handleChange} />

            <br />

            <Button
                variant="contained"
                color="primary"
                style={submit}
                type="submit"
            >
                Signup
             </Button>
        </form>
    </div>
</div>
</div>

<Footer/>
            </div>
            
        )
    }
}

export default Signup;