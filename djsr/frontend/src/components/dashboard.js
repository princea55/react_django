import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Clock from 'react-live-clock';
import logo from './img/m2.png';
import Login from "./login";
import Signup from "./signup";
import College from "./college";
import Logout from "./Logout";
import CollegeDetail from './collegeDetail';
import ProfessorList from './ProfessorList';
import StudentList from './StudentList';
import Student_search from './Student_search';
import Student_detail from './Student_detail';
import Professor_search from './Professor_search';
import Contact from './contact/contact';
import Home from './home/Home';
import css from '../components/style_back.css';
import Help from './help/Help';
import { FormHelperText } from '@material-ui/core';

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1
    },
    grow: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,

    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    bodyContent: {
        height: "100%"

    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

const MyToolbar = withStyles(styles)(
    ({ classes, title, onMenuClick }) => (
        <Fragment>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>
                        {/* <Link to="/home/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/home/')}>Home</Link>
                        <Link to="/contactus/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/contactus/')} >Contact Us</Link>
                        <Link to="/contactus/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/contactus/')}>Help</Link> */}
                        <div className="mt-1  logo-name">
                            <div className=" mb-1 img-logo">
                                <img src={logo} height="50" width="50" />
                            </div>
                            <div className="mt-1 text-logo">
                                <h4 className="logo">muster</h4>
                            </div>


                        </div>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography className="my-4">
                            <Link to="/home/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/home/')}>Home</Link>
                            <Link to="/contactus/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/contactus/')} >Contact Us</Link>
                            <Link to="/help/" className="text-decoration-none text-white mx-2" onClick={() => history.push('/help/')}>Help</Link>
                            {/* <Clock format={'dddd, MMMM Mo, h:mm:ss A'} ticking={true} timezone={'IN/Pacific'} /> */}
                        </Typography>

                    </div>
                </Toolbar>

            </AppBar>
            <div className={classes.toolbarMargin} />
        </Fragment>
    )
);

const OnlyLoginSignup = withStyles(styles)(
    ({ classes, variant, open, onClose, onItemClick }) => (
        <Router history={history}>
            <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === 'persistent'
                    })}
                />

                <List>
                    <ListItem button component={Link} to="/login/" onClick={onItemClick('Login')}>
                        <ListItemText>Login</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/signup/" onClick={onItemClick('Signup')}>
                        <ListItemText>Signup</ListItemText>
                    </ListItem>

                </List>
            </Drawer>
            <div>
                <main className={classes.content}>
                    <Route
                        exact
                        path="/"
                        render={(routeprops) => <Home  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/login/"
                        render={(routeprops) => <Login  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/signup/"
                        render={(routeprops) => <Signup  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/profile/"
                        render={(routeprops) => <CollegeDetail  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/contactus/"
                        render={(routeprops) => <Contact  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/home/"
                        render={(routeprops) => <Home  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/help/"
                        render={(routeprops) => <Help  {...routeprops} />}
                    />

                </main>
            </div>
        </Router>
    )
);



const MyDrawer = withStyles(styles)(
    ({ classes, variant, open, onClose, onItemClick, user_type }) => (
        <Router history={history}>
            <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === 'persistent'
                    })}
                />
                {user_type === 'College' ? (
                    <List>
                        <ListItem button component={Link} to="/profile/" onClick={onItemClick('CollegeDetail')}>
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/select_college/" onClick={onItemClick('College')}>
                            <ListItemText>Select College</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/professors_list/" onClick={onItemClick('ProfessorsList')}>
                            <ListItemText>Professors List</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/professors_search/" onClick={onItemClick('Professors Search')}>
                            <ListItemText>Professors Search</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/students_search/" onClick={onItemClick('Students Search')}>
                            <ListItemText>Students Search</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/logout/" onClick={onItemClick()}>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </List>) : (null)}

                {user_type === 'Professor' ? (<List>
                    <ListItem button component={Link} to="/profile/" onClick={onItemClick('CollegeDetail')}>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/select_college/" onClick={onItemClick('College')}>
                        <ListItemText>Select College</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/professors_list/" onClick={onItemClick('ProfessorsList')}>
                        <ListItemText>Professors List</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/students_list/" onClick={onItemClick('StudentsList')}>
                        <ListItemText>Students List</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/professors_search/" onClick={onItemClick('Professors Search')}>
                        <ListItemText>Professors Search</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/students_search/" onClick={onItemClick('Students Search')}>
                        <ListItemText>Students Search</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/logout/" onClick={onItemClick('Logout')}>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>) : (null)}


                {user_type === 'Student' ? (<List>
                    <ListItem button component={Link} to="/profile/" onClick={onItemClick('CollegeDetail')}>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/select_college/" onClick={onItemClick('College')}>
                        <ListItemText>Select College</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/logout/" onClick={onItemClick()}>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>) : (null)}


            </Drawer>
            <div>


                <main className={classes.content}>
                    <Route
                        exact
                        path="/"
                        render={(routeprops) => <Home  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/login/"
                        render={(routeprops) => <Login  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/profile/"
                        render={(routeprops) => <CollegeDetail  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/select_college/"
                        render={(routeprops) => <College  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/professors_list/"
                        render={(routeprops) => <ProfessorList  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/students_list/"
                        render={(routeprops) => <StudentList  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/professors_search/"
                        render={(routeprops) => <Professor_search  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/students_search/"
                        render={(routeprops) => <Student_search  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/student_profile/"
                        render={(routeprops) => <Student_detail  {...routeprops} />}
                    />

                    <Route
                        exact
                        path="/college/"
                        render={(routeprops) => <College  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/contactus/"
                        render={(routeprops) => <Contact  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/home/"
                        render={(routeprops) => <Home  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/help/"
                        render={(routeprops) => <Help  {...routeprops} />}
                    />
                    <Route
                        exact
                        path="/logout/"
                        render={(routeprops) => <Logout  {...routeprops} />}
                    />

                </main>
            </div>
        </Router>
    )
);

function AppBarInteraction({ classes, variant }) {
    const current_user = JSON.parse(localStorage.getItem("current_user"));
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState('Appbar');


    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const onItemClick = title => () => {
        setTitle(title);
        setDrawer(variant === 'temporary' ? drawer : false);
        setDrawer(!drawer);
    };


    if (localStorage.getItem("islogin")) {
        const current_user = JSON.parse(localStorage.getItem("current_user"));
        return (
            <div className="bodycontent">
                <div className={classes.root, classes.bodyContent}>
                    <MyToolbar title={title} onMenuClick={toggleDrawer} />
                    <MyDrawer
                        open={drawer}
                        onClose={toggleDrawer}
                        onItemClick={onItemClick}
                        user_type={current_user.user_type}

                        variant={variant}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className={classes.bodyContent}>
                <div className={classes.root, classes.bodyContent}>
                    <MyToolbar title={title} onMenuClick={toggleDrawer} />
                    <OnlyLoginSignup
                        open={drawer}
                        onClose={toggleDrawer}
                        onItemClick={onItemClick}
                        variant={variant}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AppBarInteraction);
