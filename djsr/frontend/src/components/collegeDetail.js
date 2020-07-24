import React, { Component } from "react";
import {
    main_div,
    main_body,
    paperContent,
    root,
    pos,
    title,
    warning
} from "./style";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia'
class CollegeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            city: "",
            phone: "",
            college: "",
            islogin: false,
            department: "",
            role: "",
            user_type: "",
            semester: "",
            enrollment: "",
            
        };
    }

    componentDidMount() {
        this.setState({ islogin: true });
        if (JSON.parse(localStorage.getItem("current_user"))) {
            const current_user = JSON.parse(localStorage.getItem("current_user"));
            this.setState({
                username: current_user.username,
                email: current_user.email,
                user_type: current_user.user_type,
            });
        }
        if (JSON.parse(localStorage.getItem("current_user_detail"))) {
            const current_user_detail = JSON.parse(
                localStorage.getItem("current_user_detail")
            );
            this.setState({
                city: current_user_detail.city,
                phone: current_user_detail.phone,
                college: current_user_detail.college,
                department: current_user_detail.department,
                semester: current_user_detail.semester,
                enrollment: current_user_detail.enrollment,
                role: current_user_detail.role,
                
            });
        }
    }
    render() {
        if (this.state.islogin) {
            if (this.state.user_type === "Professor") {
                return (
                    <div style={main_body}>
                        <Paper elevation={3} style={paperContent}>
                            <div>
                                <div style={main_div}>

                                    <Card style={root} variant="outlined">
                                        <CardContent>
                                            <Typography
                                                style={title}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                Username
                                            </Typography>
                                            <Typography variant="h5" style={pos} component="h2">
                                                {this.state.username}
                                            </Typography>

                                            <Typography color="textSecondary">Email</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.email}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">Department</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.department}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">Role</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.role}
                                                <br />
                                            </Typography>
                                            <Typography color="textSecondary">College</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.college}
                                                <br />
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </div>
                            </div>
                        </Paper>
                    </div>
                );
            } else if (this.state.user_type === "College") {
                return (
                    <div style={main_body}>
                        <Paper elevation={3} style={paperContent}>
                            <div>
                                <div style={main_div}>

                                    <Card style={root} variant="outlined">
                                        
                                        <CardContent>
                                            <Typography
                                                style={title}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                Username
                                            </Typography>
                                            <Typography variant="h5" style={pos} component="h2">
                                                {this.state.username}
                                            </Typography>

                                            <Typography color="textSecondary">Email</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.email}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">City</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.city}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">College</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.college}
                                                <br />
                                            </Typography>
                                            <Typography color="textSecondary">Phone</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.phone}
                                                <br />
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </div>
                            </div>
                        </Paper>
                    </div>
                );
            } else if (this.state.user_type === "Student") {
                return (
                    <div style={main_body}>
                        <Paper elevation={3} style={paperContent}>
                            <div>
                                <div style={main_div}>
                                    
                                    <Card style={root} variant="outlined">
                                    
                                        <CardContent>
                                            <Typography
                                                style={title}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                Username
                                            </Typography>
                                            <Typography variant="h5" style={pos} component="h2">
                                                {this.state.username}
                                            </Typography>

                                            <Typography color="textSecondary">Email</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.email}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">Enrollment</Typography>
                                            <Typography variant="body2" style={pos} component="p">
                                                {this.state.enrollment}
                                                <br />
                                            </Typography>

                                            <Typography color="textSecondary">Department</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.department}
                                                <br />
                                            </Typography>
                                            <Typography color="textSecondary">Semester</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.semester}
                                                <br />
                                            </Typography>
                                            <Typography color="textSecondary">College</Typography>
                                            <Typography variant="body2" style={pos} scomponent="p">
                                                {this.state.college}
                                                <br />
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </div>
                            </div>
                        </Paper>
                    </div>
                );
            }

        } else {
            return (
                <h1 style={warning}>You have to login to access this page</h1>
            )
        }
    }
}
export default CollegeDetail;
