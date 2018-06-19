import React, { Component } from 'react';
import {AsyncStorage, Button, ListView, Text, View} from 'react-native';
import Login from '../services/api/Login';
import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Role from "../services/Roles";
import LessonTeacherGroupRow from "../components/common/LessonTeacherGroupRow";
import LessonTeacherGroupPeopleRow from "../components/common/LessonTeacherGroupPeopleRow";
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
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class ResultTotal extends Component {
    state = {
        role: false,
        token: false,

    };
    constructor(props){
        super(props);

        // let result = [];
        // result.push({groupNumber: 451001});
        // result.push({groupNumber: 451001});
        // result.push({groupNumber: 451001});
        const result = [
            {name: 'Каролина', surname: 'Высоцкая'},
            {name: 'Александр', surname: 'Галузо'},
            {name: 'Владислав', surname: 'Крох'},
            {name: 'Евгений', surname: 'Кротов'},
            {name: 'Олег', surname: 'Скрипко'},
        ];
        this.state = {
                dataSource: ds.cloneWithRows(result)
        };
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>
                        <Text style={styles.name}>Моделирование{"\n"}</Text>
                        <Text style={styles.name}>451004{"\n"}</Text>
                        <Text style={styles.name}>Евгений Кротов{"\n"}</Text>
                        <Text style={styles.name}>Вариант 1{"\n"}</Text>
                        <Text style={styles.valid}>
                            {"\t"}Вопрос 1:{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 1{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 4{"\n"}
                        </Text>

                        <Text style={styles.error}>
                            {"\t"}Вопрос 2:{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 2{"\n"}
                            </Text>

                        <Text style={styles.valid}>{"\t"}Вопрос 3:{"\n"}
                            {"\t"}{"\t"}- Ответ на вопрос 3{"\n"}</Text>
                        <Text style={styles.valid}>{"\t"}Вопрос 4:{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 1{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 2{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 3{"\n"}
                            {"\t"}{"\t"}- Вариант ответа 4{"\n"}</Text>

                        <Text style={styles.error}>{"\t"}Вопрос 5:{"\n"}
                            {"\t"}{"\t"}- Ответ на вопрос 5{"\n"}</Text>
                        <Text style={styles.name}>Результат: 23 (б.){"\n"}</Text>
                    </Text>
                </View>
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
    },
    name: {
        fontWeight: 'bold'
    },
    valid: {
        color: 'green'
    },
    error: {
        color: 'red'
    }
};
