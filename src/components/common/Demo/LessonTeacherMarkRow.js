import React, { Component } from 'react';
import {Button, Text, View} from 'react-native';


export default class LessonTeacherMarkRow extends Component {
    state = {
        role: false,
        token: false
    };
    constructor(props){
        super(props);
    }

    render() {
        let markApp = (<Text> Marks: 10, 8, 10{"\n"}</Text>);
        return (
            <View style={styles.container}>
                <Text>
                    Студент: Юлия Филиппова{"\n"}
                    Предмет: Моделирование{"\n"}
                </Text>
                {markApp}
                <Button
                    title="Добавить оценку"
                    onPress={this.handleAdd}
                />
            </View>
        );
    }

    handleAdd(){

    }

    handleDelete() {

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
