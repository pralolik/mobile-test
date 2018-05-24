import config from '../../Config';
import React, {AsyncStorage} from 'react-native'
import Role from "../Roles";

export default class Login {
    static isLoggedIn() {
        return false;
    }

    static getRole() {
        return false;
    }

    static async login(email, password, stater) {
        const jsonData = JSON.stringify({email: email, password: password});
        const response = await fetch(`${config.url}:${config.port}/authenticate`, {
            method: 'POST',
            body: jsonData,
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        const json = await response.json();
        var result = false;
        if (json.errors) {

            result = false;
        } else {
            AsyncStorage.setItem('token', json.auth_token);
            AsyncStorage.setItem('role', json.user_role);

            result = json.user_role;
        }
        if (result == Role.ROLE_TEACHER){
            stater.setState(() => {
                return {
                    role: Role.ROLE_TEACHER
                }
            });
        } else if (result == Role.ROLE_STUDENT){
            stater.setState(() => {
                return {
                    role: Role.ROLE_STUDENT
                }
            });
        } else {
            alert('Invalid Email or Password');
        }
        AsyncStorage.getItem('token', (role) => {
            alert(role);
        });
    }
}
