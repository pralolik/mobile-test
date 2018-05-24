import React, { Component } from 'react';
import {Button, View} from 'react-native';
import StudentTabNav from '../screens/Student/Tabs';
import Role from '../services/Roles';
import TeacherLessons from '../screens/Teacher/Lessons';
import Login from '../services/api/Login';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String
});

const options = {
    fields: {
        email: {
            error: 'Without an email address how are you going to reset your password when you forget it?',
            autoCorrect: false
        },
        password: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember',
            password: true,
            autoCorrect: false
        }
    },
};
export default class LoggedIn extends Component {
    state = {
        role: false,
    };
    constructor(props){
        super(props);
    }
    handleSubmit = () => {
        const value = this._form.getValue();
        if(value){
            Login.login(value.email, value.password, this);
        }
    };

    render() {
        var role = this.state.role;
        if (!role) {
            return (
                <View style={styles.container}>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={User}
                        options={options}
                    />
                    <Button
                        title="Sign Up!"
                        onPress={this.handleSubmit}
                    />
                </View>
            );
        } else {
            if (role == Role.ROLE_TEACHER) {
                return <TeacherLessons />
            } else if (role == Role.ROLE_STUDENT) {
                return <StudentTabNav />
            }
        }
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    }
};