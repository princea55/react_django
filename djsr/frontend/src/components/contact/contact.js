import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../axiosApi';
import Footer from '../footer/footer';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            complaint_submit: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/contactus/', {
                message: this.state.message,
                email: this.state.email,
            });
            this.setState({ complaint_submit: true })
        } catch (error) {
            this.setState({
                errors: error.response.data
            });
        }
    }
    componentWillMount() {
        this.setState({
            complaint_submit: false,
            email: "",
            message: ""
        })
    }

    render() {
        const { complaint_submit } = this.state;
        return (
            <div>
                <div className="container mt-5 shadow p-5 mb-5 bg-white rounded">
                    <div className="d-flex justify-content-center">
                        <h1>Contact Us</h1><br />
                    </div>
                    <div className="d-flex justify-content-center">
                        {complaint_submit ? (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Complaint submit successfully! </strong>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ) : (null)}
                    </div>
                    <div className="d-flex p-4 justify-content-center ">
                        <div>
                            <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                                <TextField
                                    // error={this.state.errors.email ? true : false}
                                    className="inputs m-3"
                                    style={{ width: "30rem" }}
                                    type="text"
                                    name="email"
                                    FormHelperTextProps={{ color: "red" }}
                                    // helperText={this.state.errors.email ? this.state.errors.email : null}
                                    onChange={this.handleChange}
                                    label="Email"
                                    variant="outlined" />

                                <br />
                                <div className="form-group">
                                    <textarea
                                        style={{ width: "30rem" }}
                                        className="form-control m-3"
                                        name="message"
                                        id="exampleFormControlTextarea1"
                                        rows="5"
                                        placeholder="Write here your problem..."
                                        onChange={this.handleChange}
                                    ></textarea>
                                </div> <br />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="ml-3"
                                >
                                    Submit
                             </Button>
                            </form>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>

        )
    }
}
export default withRouter(Contact);