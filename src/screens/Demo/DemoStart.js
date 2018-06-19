import React, { Component } from 'react';
import {Button, View} from 'react-native';


export default class DemoStart extends Component {
    constructor(props){
        super(props);
    }

    handleStudent = (view) => {
        view.props.navigation.navigate('DemoStudentTabs');
    };

    handleTeacher = (view) => {
        view.props.navigation.navigate('DemoTeacherTabs');
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Студент"
                    onPress={() => {this.handleStudent(this)}}
                />
                <Button
                    title="Преподаватель"
                    onPress={() => {this.handleTeacher(this)}}
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
