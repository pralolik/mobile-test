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
});

export default class LessonTeacherGroupPeopleRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TouchableHighlight onPress={() => navigate('DemoTeacherLessonMarkList',
                    {lessonName: this.props.lessonName, lessonType: this.props.lessonType, groupNumber: this.props.groupNumber, studentName: this.props.student_name,
                        teacherData: this.props.teacherData, view: this })}>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            {this.props.student_name}{"\n"}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
};
