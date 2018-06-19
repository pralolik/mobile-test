import React, { Component } from 'react';
import {AsyncStorage, Button, ListView, View} from 'react-native';
import Login from '../services/api/Login';
import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Role from "../services/Roles";
import config from "../Config";
const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String
});

const options = {
    fields: {
        email: {
            error: 'Введите свой email. Пример: example@mail.com',
            autoCorrect: false
        },
        password: {
            error: 'Введите пароль',
            password: true,
            autoCorrect: false,
            secureTextEntry: true
        }
    },
};
export default class Start extends Component {
    constructor(props){
        super(props);
     }

    handleDemo = (view) => {
        view.props.navigation.navigate('DemoStart');
    };

    handleProd = (view) => {
        fetch(`${config.url}:${config.port}/check`,
             {
                method: 'GET',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if(myJson.online){
                    view.props.navigation.navigate('Login');
                } else {
                    alert('Сервер сейчас offline. Используйте Demo.')
                }
            })
            .catch(function(error){
                alert('Сервер сейчас offline. Используйте Demo.')
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Демо"
                    onPress={() => {this.handleDemo(this)}}
                />
                <Button
                    title="Приложение"
                    onPress={() => {this.handleProd(this)}}
                />
            </View>
        );
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
