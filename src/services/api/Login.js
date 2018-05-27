import config from '../../Config';
import React, {AsyncStorage} from 'react-native'
import Role from "../Roles";
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login {

    static async login(email, password, stater) {
        const jsonData = JSON.stringify({email: email, password: password});
        const response = await fetch(`${config.url}:${config.port}/authenticate`, {
            method: 'POST',
            body: jsonData,
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        const json = await response.json();
        let result = false;
        if (json.errors) {

            result = false;
        } else {
            AsyncStorage.setItem('token', json.auth_token);
            AsyncStorage.setItem('role', json.user_role);

            result = json.user_role;
        }
        alert(result);
        if (result == Role.ROLE_TEACHER){
            stater.setState(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'TeacherTabs'})
                    ]
                });
                stater.props.navigation.dispatch(resetAction);
                return {
                    role: Role.ROLE_TEACHER
                }
            });
        } else if (result == Role.ROLE_STUDENT){
            stater.setState(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'StudentTabs'})
                    ]
                });
                stater.props.navigation.dispatch(resetAction);
                return {
                    role: Role.ROLE_STUDENT
                }
            });
        } else {
            alert('Invalid Email or Password');
        }

    }
}
