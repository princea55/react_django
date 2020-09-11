import React, { Component } from 'react'
import axiosInstance from "../axiosApi";
class Logout extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    async logout(){
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('current_user');
            localStorage.removeItem('current_user_detail');
            localStorage.removeItem('islogin');
            localStorage.removeItem('std_id');
            axiosInstance.defaults.headers['Authorization'] = null;
            console.log("logout")
            this.props.history.push("/login/")
        }
        catch (e) {
            console.log(e);
        }
    }
    componentDidMount(){
        this.logout();
    }
    render() {
        return (
            <div className="container">
                <h1 className="align-middle d-flex justify-content-center">loging out</h1>
            </div>
        )
    }
}
export default Logout;