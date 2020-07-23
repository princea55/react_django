
import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class CollegeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            current_id : this.props.current_user_id,
        };

        this.getMessage = this.getMessage.bind(this)
    }

    async getMessage() {
        try {
            let response = await axiosInstance.get(`/college/detail/${this.state.current_id}`);
            const message = response.data;

            this.setState({
                message: message,
            });
            return message;
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }
    componentDidMount() {
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        const messageData1 = this.getMessage();
        console.log("messageData1: ", JSON.stringify(messageData1, null, 4));
    }

    render() {
        console.log(this.state.message);
        return (
            <div>
                <p>{this.state.message.college}</p>
                <p>{this.state.message.city}</p>
                <p>{this.state.message.phone}</p>

            </div>
        )
    }
}

export default CollegeDetail;