import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

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
    constructor(props) {
        super(props);
    }

    render() {
        let navigation = 'DemoTeacherTestVariants';
        if (this.props.statistic){
            navigation = 'DemoTeacherTestInfo';
        } else if (this.props.release) {
            navigation = 'DemoTeacherTestEmpty';
        }
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TouchableHighlight onPress={() => navigate(navigation,
                    {
                        testName: this.props.testName,
                        testData: this.props.testData ,
                        parent: this.props.parent,
                        view: this })
                }
                >
                    <View  style={styles.container}>
                        <Image source={{ uri: 'https://d1e4pidl3fu268.cloudfront.net/66963e4a-ccba-4fdd-ba18-d5862fb4dba7/test.png'}}
                               style={styles.photo} />
                        <Text style={styles.text}>
                            {this.props.testName}{"\n"}
                            {this.props.dueDate}{"\n"}
                            {this.props.lessonName}{"\n"}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
};
