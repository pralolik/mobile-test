import React, { Component } from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import LessonRow from '../../../../components/common/Demo/LessonTeacherGroupPeopleRow';


export default class StudentList extends Component {
    constructor(props){
        super(props);
        let teacherData = this.props.navigation.state.params.teacherData;
        const lessonName = this.props.navigation.state.params.lessonName;
        const lessonType = this.props.navigation.state.params.lessonType;
        const groupNumber = this.props.navigation.state.params.groupNumber;
        let curStudents = [];
        teacherData.forEach(function (lesson) {
            if(lesson.lessonName == lessonName && lesson.type == lessonType){
                lesson.groups.forEach(function (group) {
                    if (group.group_number == groupNumber) {
                        group.students.forEach(function (student) {
                            curStudents.push({student_name: student.student_name})
                        })
                    }
                })
            }
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(curStudents)
        };
    }

    render() {

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}

                renderRow={(data) => <LessonRow {...data}
                                                lessonName={this.props.navigation.state.params.lessonName}
                                                lessonType={this.props.navigation.state.params.lessonType}
                                                groupNumber={this.props.navigation.state.params.groupNumber}
                                                teacherData={this.props.navigation.state.params.teacherData}
                                                navigation={this.props.navigation}/>}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    spinner: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center'
    }
});
