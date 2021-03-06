import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import DemoStudentTestDetails from "../../../screens/Demo/Student/Test/Info";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    button: {
        right: 'right'
    }
});

export default class TestRow extends Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://d1e4pidl3fu268.cloudfront.net/66963e4a-ccba-4fdd-ba18-d5862fb4dba7/test.png'}}
                       style={styles.photo} />
                <Text style={styles.text}>
                    {this.props.testName}{"\n"}
                    {this.props.dueDate}{"\n"}
                    {this.props.lessonName}{"\n"}
                </Text>
                <Button onPress={() => navigate('DemoStudentTestDetails', {testName: this.props.testName,testQData: this.props.testQData, view: this, parent: this.props.parent })} style={styles.text} title={'Начать тест'} />
            </View>
        );
    }
};
