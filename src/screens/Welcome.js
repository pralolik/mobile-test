import React, { Component } from 'react';
import Login from '../services/api/Login';
import StudentTabNav from '../screens/Student/Tabs';
import TeacherLessons from '../screens/Teacher/Lessons';
import ErrorView from '../screens/Error';
import LoggedIn from '../screens/LoggedIn';
import Role from '../services/Roles';
import {AsyncStorage} from "react-native";

export default class Welcome extends Component {
    state = {
        role: false,
    };

    constructor(props) {
        super(props);
        AsyncStorage.getItem('role').then((role) => {
            this.setState(() => {
                return {
                    role: role.toString()
                }
            })
        });
    }

    render() {
        if (this.state.role) {
            if (this.state.role == Role.ROLE_TEACHER) {
                return <TeacherLessons />
            } else if (this.state.role == Role.ROLE_STUDENT) {
                return <StudentTabNav />
            }
            return <ErrorView />
        } else {
            return <LoggedIn />
        }
    }
}