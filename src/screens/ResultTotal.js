import React, { Component } from 'react';
import {AsyncStorage, Button, ListView, Text, View} from 'react-native';
import Login from '../services/api/Login';
import t from 'tcomb-form-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Role from "../services/Roles";
import LessonTeacherGroupRow from "../components/common/LessonTeacherGroupRow";
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
            {groupNumber: 451001},
            {groupNumber: 451002},
            {groupNumber: 451003},
            {groupNumber: 451004}
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
                        Вариант 1{"\n"}
                        {"\t"}Вопрос 1:{"\t"}75%{"\n"}
                        {"\t"}Вопрос 2:{"\t"}95%{"\n"}
                        {"\t"}Вопрос 3:{"\t"}25%{"\n"}
                        {"\t"}Вопрос 4:{"\t"}85%{"\n"}
                        {"\t"}Вопрос 5:{"\t"}50%{"\n"}
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <LessonTeacherGroupRow
                        {...data} parent={this}
                        navigation={this.props.navigation} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
    },
    name: {
        fontWeight: 'bold'
    }
};
