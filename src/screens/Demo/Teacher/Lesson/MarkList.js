import React, { Component } from 'react';
import {View, ListView, StyleSheet, Button} from 'react-native';
import Text from "react-native-elements/src/text/Text";
import t from 'tcomb-form-native';
const Form = t.form.Form;

var MarkType = t.refinement(t.Number, function (n) { return n >= 0 && n <=10; });

MarkType.getValidationErrorMessage = function (value, path, context) {
    return 'Оценка от 0 до 10';
};

const Mark = t.struct({
    Оценка: MarkType
});


const options = {
    fields: {
        Оценка: {
            error: 'Введите оценку'
        }
    },
};

export default class MarkList extends Component {
    constructor(props){
        super(props);
        let teacherData = this.props.navigation.state.params.teacherData;
        const lessonName = this.props.navigation.state.params.lessonName;
        const lessonType = this.props.navigation.state.params.lessonType;
        const groupNumber = this.props.navigation.state.params.groupNumber;
        const studentName = this.props.navigation.state.params.studentName;
        let marks = [];
        teacherData.forEach(function (lesson) {
            if(lesson.lessonName == lessonName && lesson.type == lessonType){
                lesson.groups.forEach(function (group) {
                    if (group.group_number == groupNumber) {
                        group.students.forEach(function (student) {
                            if(student.student_name == studentName){
                                student.student_marks.forEach(function (mark) {
                                    marks.push(mark);
                                })
                            }
                        })
                    }
                })
            }
        });
        this.state = {
            dataSource: marks
        };
    }

    render() {
        const lessonName = this.props.navigation.state.params.lessonName;
        const studentName = this.props.navigation.state.params.studentName;
        return (
            <View style={styles.container}>
                <Text>
                    Студент: {studentName}{"\n"}
                    Предмет: {lessonName}{"\n"}
                </Text>
                {this.state.dataSource.map((value, key) => {
                    return (
                        <View>
                            <Text>
                                {value}
                            </Text>
                            <Button
                                title="Удалить оценку"
                                onPress={() => {this.handleDelete(key)}}
                            />
                            <View style={styles.separator} />
                        </View>
                    );
                })}
                <View style={styles.separator} />
                <Form
                    ref={c => this._form = c}
                    type={Mark}
                    options={options}
                />
                <Button
                    title="Добавить оценку"
                    onPress={this.handleAdd}
                />
            </View>
        );
    };

    handleAdd = () => {
        const value = this._form.getValue();
        if(value){
            let updatedSource = this.state.dataSource;
            updatedSource.push(value.Оценка);
            const newSource = updatedSource;
            this.setState(() => {
                    return {
                        dataSource: newSource
                    };
                }
            )
        }
    };

    handleDelete = (key) => {
        let updatedSource = this.state.dataSource;
        updatedSource.splice(key, 1);
        const newSource = updatedSource;
        this.setState(() => {
                return {
                    dataSource: newSource
                };
            }
        )
    }
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
