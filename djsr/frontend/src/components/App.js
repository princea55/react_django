
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import axiosInstance from "../axiosApi";
import College from "./college";
import Dashboard from "./dashboard";
import CollegeDetail from './collegeDetail';


class App extends Component {

    render() {
        
        return (
            <div className="site">
                <Dashboard />
                
            </div>
        );
    }
}

export default App;