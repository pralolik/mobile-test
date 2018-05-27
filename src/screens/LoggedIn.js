import React, { Component } from 'react';
import {AsyncStorage, Button, View} from 'react-native';
import Login from '../services/api/Login';
import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Role from "../services/Roles";
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
            autoCorrect: false,
            secureTextEntry: true
        }
    },
};
export default class LoggedIn extends Component {
    state = {
        role: false,
        token: false
    };
    constructor(props){
        super(props);
        this.setSessionValues();
    }
    handleSubmit = () => {
        const value = this._form.getValue();
        if(value){
            Login.login(value.email, value.password, this);
        }
    };

    render() {
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
    }

    setSessionValues()
    {
        AsyncStorage.getItem('role').then((role) =>
        {
            if (role) {
                this.setState(() => {
                    let actionName = '';
                    if (role == Role.ROLE_TEACHER) {
                        actionName = 'TeacherTabs';
                    } else if (role == Role.ROLE_STUDENT) {
                        actionName = 'StudentTabs';
                    }
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: actionName})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                    return { role: role.toString()};
                });
            } else {
                this.setState(() => {
                    return { role: null};
                });
            }

        });
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    spinner: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center'
    }
};
