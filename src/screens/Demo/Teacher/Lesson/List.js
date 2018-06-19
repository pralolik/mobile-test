import React, { Component } from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import LessonRow from '../../../../components/common/Demo/LessonTeacherRow';


export default class List extends Component {
    constructor(props){
        super(props);
        const testData = [
            {
                lessonName: 'Веб-технологии',
                type: 'ПЗ',
                groups: [
                    {
                       group_number: '351004',
                       students:
                       [
                           {
                               student_name: 'Павлюченко Иван',
                               student_marks: [10, 5, 8]
                           },
                           {
                               student_name: 'Иванов Евгений',
                               student_marks: [6, 6, 7]
                           },
                           {
                               student_name: 'Добраш Петр',
                               student_marks: [4, 5, 5]
                           }
                       ]
                    }
                ]
            },
            {
                lessonName: 'БД',
                type: 'ЛР',
                groups: [
                    {
                        group_number: '551005',
                        students:
                            [
                                {
                                    student_name: 'Каращук Александр',
                                    student_marks: [10, 10, 10]
                                },
                                {
                                    student_name: 'Крох Владислав',
                                    student_marks: [10, 9, 9]
                                },
                                {
                                    student_name: 'Скрипко Олег',
                                    student_marks: [10, 10, 10]
                                }
                            ]
                    }
                ]
            }
        ];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testData),
            startData: testData
        };
    }

    render() {

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <LessonRow {...data} parent={this} teacherData={this.state.startData} navigation={this.props.navigation}/>}
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
