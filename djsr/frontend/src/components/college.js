import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { submit, main_div, main_body, component_margin, paperContent, warning } from './style';
import React, { Component } from "react";
import uuid from 'react-uuid';
import axiosInstance from "../axiosApi";
import Footer from './footer/footer';


class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custom_user_id: "",
            username: "",
            email: "",
            user_type: "",
            password: "",
            college: "",
            user_id: "",
            id: "",
            phone: "",
            city: "",
            department: "",
            semester: "",
            enrollment: "",
            errors: {},
            user_errors: {},
            islogin: false,
            current_user_detail: "",
            role: "",

            collagelist: ["GOVERNMENT ENGINEERING COLLEGE, BHARUCH",
                "GOVERNMENT ENGINEERING COLLEGE,BHAVNAGAR",
                "GOVERNMENT ENGINEERING COLLEGE, BHUJ",
                "GOVERNMENT ENGINEERING COLLEGE, DAHOD",
                "GOVERNMENT ENGINEERING COLLEGE,GANDHINAGAR",
            ]

        };

        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.get_message = this.get_message.bind(this);
        // this.onImageChange = this.onImageChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmitWThen(event) {
        event.preventDefault();
        const header = localStorage.getItem("access_token");

        try {
            if (this.state.user_type === "College") {
                if (this.state.id) {
                    await axiosInstance.put(`college/update/${this.state.id}/`, {
                        college: this.state.college,
                        phone: this.state.phone,
                        city: this.state.city,
                        user_id: this.state.id
                    }, { headers: { "Authorization": `JWT ${header}` } });

                } else {
                    await axiosInstance.post('/college/', {
                        college: this.state.college,
                        phone: this.state.phone,
                        city: this.state.city,
                    }, { headers: { "Authorization": `JWT ${header}` } });
                }
            } else if (this.state.user_type === "Professor") {
                if (this.state.id) {
                    await axiosInstance.put(`professor/update/${this.state.id}/`, {
                        college: this.state.college,
                        department: this.state.department,
                        role: this.state.role,
                        user_id: this.state.id
                    }, { headers: { "Authorization": `JWT ${header}` } });

                } else {
                    await axiosInstance.post('/professor/', {
                        college: this.state.college,
                        department: this.state.department,
                        role: this.state.role,
                    }, { headers: { "Authorization": `JWT ${header}` } });
                }
            } else if (this.state.user_type === "Student") {
                if (this.state.id) {
                    await axiosInstance.put(`student/update/${this.state.id}/`, {
                        college: this.state.college,
                        department: this.state.department,
                        enrollment: this.state.enrollment,
                        semester: this.state.semester,
                        user_id: this.state.id
                    }, { headers: { "Authorization": `JWT ${header}` } });

                } else {
                    await axiosInstance.post('/students/', {
                        college: this.state.college,
                        department: this.state.department,
                        enrollment: this.state.enrollment,
                        semester: this.state.semester,
                    }, { headers: { "Authorization": `JWT ${header}` } });
                }
            }

        } catch (error) {
            this.setState({
                errors: error.response.data
            });
            console.log(error);
        }
        this.get_message()
    }
    // onImageChange(event){
    //     this.setState({
    //         img: event.target.files[0]
    //     });
    //     console.log(event.target.files[0]);
    // }
    async get_message() {
        let college_detail_response;
        try {
            if (this.state.user_type === "College") {
                college_detail_response = await axiosInstance.get(`/college/list/?search=${this.state.phone}`, { headers: { "Authorization": `Token ${this.state.token}` } });
            } else if (this.state.user_type === "Professor") {
                college_detail_response = await axiosInstance.get(`professorlist/?search=${this.state.username}`, { headers: { "Authorization": `Token ${this.state.token}` } });
            } else if (this.state.user_type === "Student") {
                college_detail_response = await axiosInstance.get(`studentlist/?search=${this.state.username}`, { headers: { "Authorization": `Token ${this.state.token}` } });
            }

            this.setState({
                current_user_detail: college_detail_response.data[0]
            });
            localStorage.setItem('current_user_detail', JSON.stringify(this.state.current_user_detail));
        } catch (error) {
            console.log(error);
        }
        this.props.history.push("/profile/")
    }
    componentDidMount() {
        this.setState({ islogin: true });
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        this.setState({
            custom_user_id: current_user.id,
            username: current_user.username,
            email: current_user.email,
            user_type: current_user.user_type,

        });
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            const current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );
            this.setState({
                id: current_user_detail.id,
                city: current_user_detail.city,
                phone: current_user_detail.phone,
                college: current_user_detail.college,
                department: current_user_detail.department,
                user_id: current_user_detail.user_id,
                role: current_user_detail.role,
                enrollment: current_user_detail.enrollment,
                semester: current_user_detail.semester,

            });
        }

    }
    render() {

        if (this.state.islogin) {
            if (this.state.user_type === "College") {
                return (
                    <div>
                        <div className="container mt-5 shadow p-5 mb-5 bg-white rounded">
                            <div className="d-flex justify-content-center">

                                <h5 className="text-danger">{this.state.errors ? this.state.errors.detail : null}</h5><br />
                            </div>
                            <div className="d-flex p-4 justify-content-center ">

                                <div>

                                    <form onSubmit={this.handleSubmitWThen} noValidate autoComplete="off">
                                        <FormControl required
                                            style={{
                                                margin: "5px",
                                                width: "27rem",
                                            }}
                                        >
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                name="college"
                                                value={this.state.college}
                                                onChange={this.handleChange}
                                                className="componentsMargin"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {this.state.collagelist.map(i =>
                                                    <MenuItem value={i} key={uuid()}>
                                                        {i}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                            <FormHelperText>Select Your College</FormHelperText>
                                        </FormControl><br />
                                        <TextField
                                            error={this.state.errors.phone ? true : false}
                                            style={component_margin}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            helperText={this.state.errors.phone ? this.state.errors.phone : null}
                                            type="number"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
                                            label="Phone"
                                            variant="outlined" />

                                        <br />
                                        <TextField
                                            error={this.state.errors.city ? true : false}
                                            style={component_margin}
                                            helperText={this.state.errors.city ? this.state.errors.city : null}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            type="text"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.handleChange}
                                            label="City"
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

                        </div>
                        <Footer />
                    </div>

                )
            } else if (this.state.user_type === "Professor") {
                return (
                    <div>
                        <div className="container mt-5 shadow p-5 mb-5 bg-white rounded">
                            <div className="d-flex justify-content-center">

                                <h5 className="text-danger">{this.state.errors ? this.state.errors.detail : null}</h5><br />
                            </div>
                            <div className="d-flex p-4 justify-content-center ">
                                <div>
                                    <form onSubmit={this.handleSubmitWThen} noValidate autoComplete="off">

                                        <FormControl required
                                            style={{
                                                margin: "5px",
                                                width: "27rem",
                                            }}
                                        >
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                name="college"
                                                value={this.state.college}
                                                onChange={this.handleChange}
                                                className="componentsMargin"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {this.state.collagelist.map(i =>
                                                    <MenuItem value={i} key={uuid()}>
                                                        {i}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                            <FormHelperText>Select Your College</FormHelperText>
                                        </FormControl><br />
                                        <FormControl required
                                            style={{
                                                margin: "5px",
                                                width: "27rem",
                                            }}
                                        >
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                name="role"
                                                value={this.state.role}
                                                onChange={this.handleChange}
                                                className="componentsMargin"
                                            >

                                                <MenuItem value="HOD">HOD</MenuItem>
                                                <MenuItem value="Professor">Professor</MenuItem>

                                            </Select>
                                            <FormHelperText>Select Your Role</FormHelperText>
                                        </FormControl><br />
                                        <TextField
                                            error={this.state.errors.department ? true : false}
                                            style={component_margin}
                                            helperText={this.state.errors.department ? this.state.errors.department : null}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            type="text"
                                            name="department"
                                            value={this.state.department}
                                            onChange={this.handleChange}
                                            label="Department"
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
                        </div>
                        <Footer />
                    </div>


                )
            } else if (this.state.user_type === "Student") {
                return (
                    <div>
                        <div className="container mt-5 shadow p-5 mb-5 bg-white rounded">
                            <div className="d-flex justify-content-center">

                                <h5 className="text-danger">{this.state.errors ? this.state.errors.detail : null}</h5><br />
                            </div>
                            <div className="d-flex p-4 justify-content-center ">
                                <div>
                                    <form onSubmit={this.handleSubmitWThen} noValidate autoComplete="off">
                                        <FormControl required
                                            style={{
                                                margin: "5px",
                                                width: "27rem",
                                            }}
                                        >
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                name="college"
                                                value={this.state.college}
                                                onChange={this.handleChange}
                                                className="componentsMargin"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {this.state.collagelist.map(i =>
                                                    <MenuItem value={i} key={uuid()}>
                                                        {i}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                            <FormHelperText>Select Your College</FormHelperText>
                                        </FormControl><br />

                                        <TextField
                                            error={this.state.errors.department ? true : false}
                                            style={component_margin}
                                            helperText={this.state.errors.department ? this.state.errors.department : null}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            type="text"
                                            name="department"
                                            value={this.state.department}
                                            onChange={this.handleChange}
                                            label="Department"
                                            variant="outlined" />
                                        <br />
                                        <TextField
                                            error={this.state.errors.semester ? true : false}
                                            style={component_margin}
                                            helperText={this.state.errors.semester ? this.state.errors.semester : null}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            type="text"
                                            name="semester"
                                            value={this.state.semester}
                                            onChange={this.handleChange}
                                            label="Semester"
                                            variant="outlined" />
                                        <br />
                                        <TextField
                                            error={this.state.errors.enrollment ? true : false}
                                            style={component_margin}
                                            helperText={this.state.errors.enrollment ? this.state.errors.enrollment : null}
                                            className="inputs componentsMargin"
                                            id="outlined-basic"
                                            type="text"
                                            name="enrollment"
                                            value={this.state.enrollment}
                                            onChange={this.handleChange}
                                            label="Enrollment"
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
                        </div>
                        <Footer />
                    </div>

                )
            }

        } else {
            return (
                <div>
                    <h1 style={warning}>You have to login to access this page</h1>
                    <Footer />
                </div>

            )
        }
    }
}

export default Hello;