import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import TestService from "../../services/api/Student/Test";
import GenerateForm from 'react-native-form-builder';
import {Button, Text} from "react-native-elements";

export default class TestDetails extends Component {
    state = {
        isLoaded : false,
        testData : null
    };
    constructor(props){
        super(props);
        TestService.startTest(this.props.navigation.state.params.testId, this)
    }

    render() {
        if (!this.state.isLoaded){
            return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
        } else {
            const fields = this.getFields();
            return (
                <View>
                    <View>
                        <GenerateForm
                            ref={(c) => {
                                this.formGenerator = c;
                            }}
                            fields={fields}
                        />
                    </View>
                    <Button block onPress={() => this.end()} title='End test' />
                    <Button block onPress={() => this.update()} title='Update test'/>
                </View>
            );
        }
    };

    getFields()
    {
        let result = [];
        this.state.dataSource.forEach(function (question) {
            let newField = {label: question.question_text, name: question.id};
            if (question.question_type == 'INPUT') {
                newField.type = 'text';
                if (question.text_answer) {
                    newField.defaultValue = question.text_answer;
                }
            } else if (question.question_type == 'SELECT'){
                newField.type = 'select';
                newField.objectType = true;
                newField.primaryKey = 'id';
                newField.labelKey = 'select_text';
                if (question.selected_answer && question.selected_answer.length > 0){
                    let selected = question.selected_answer[0];
                    question.answers.forEach(function (answer) {
                        if(answer.id == selected) {
                            newField.defaultValue = answer;
                        }
                    })
                }
                newField.options = question.answers;
            } else if (question.question_type == 'MULTISELECT'){
                newField.type = 'select';
                newField.objectType = true;
                newField.primaryKey = 'id';
                newField.labelKey = 'select_text';
                newField.options = question.answers;
                if (question.selected_answer && question.selected_answer.length > 0){
                    let selected = question.selected_answer;
                    newField.defaultValue = [];
                    question.answers.forEach(function (answer) {
                        if(selected.indexOf(answer.id)) {
                            newField.defaultValue.push(answer);
                        }
                    })
                }
                newField.multiple = true;
            }
            result.push(newField);
        });
       return result;
    }

    end()
    {
       let resultJson = this.prepareForm();
        TestService.endTest(resultJson, this);
    }

    update()
    {
        let resultJson = this.prepareForm();
        TestService.updateTest(resultJson, this);
    }

    prepareForm()
    {
        const formValues = this.formGenerator.getValues();
        let oldJson =  this.state.restData;
        this.state.dataSource.forEach(function (question) {
            let currentQuestion = formValues[question.id];
            oldJson.questions.forEach(function (questionJson) {
                if (questionJson.id == question.id) {
                    if (question.question_type == 'INPUT') {
                        questionJson.text_answer = currentQuestion;
                    } else if (question.question_type == 'SELECT'){
                        questionJson.selected_answer = [currentQuestion.id];
                    } else if (question.question_type == 'MULTISELECT'){

                        questionJson.selected_answer = [];
                        currentQuestion.forEach(function (answer) {
                            questionJson.selected_answer.push(answer.id)
                        })
                    }
                }
            });
        });

        return oldJson;
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
