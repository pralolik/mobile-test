import React, { Component } from 'react';
import {View, StyleSheet, ListView} from 'react-native';
import GenerateForm from 'react-native-form-builder';
import {Button} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";
import Role from "../../../../services/Roles";

export default class Info extends Component {
    constructor(props){
        super(props);
    }

    render() {
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
                <Button block onPress={() => this.end()} title='Завершить тест' />
                <Button block onPress={() => this.update()} title='Обновить тест'/>
            </View>
        );
    };

    getFields()
    {
        let result = [];
        this.props.navigation.state.params.testQData.forEach(function (question) {
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
        let newTestQ = this.prepareForm();
        let oldTests =  this.props.navigation.state.params.parent.state.startData;
        let newVariant = [];
        const testName = this.props.navigation.state.params.testName;
        oldTests.forEach(function (oldTest) {
            if(oldTest.testName == testName){
                oldTest.testQData = newTestQ;
            } else {

                newVariant.push(oldTest);
            }
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.navigation.state.params.parent.setState(() => {
            return {
                dataSource: ds.cloneWithRows(newVariant),
                startData : newVariant
            }
        });
        this.props.navigation.pop();
    }

    update()
    {
        let newTestQ = this.prepareForm();
        let oldTests =  this.props.navigation.state.params.parent.state.startData;
        let newVariant = [];
        const testName = this.props.navigation.state.params.testName;
        oldTests.forEach(function (oldTest) {
            if(oldTest.testName == testName){
                oldTest.testQData = newTestQ;
            }
            newVariant.push(oldTest);
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.navigation.state.params.parent.setState(() => {
            return {
                dataSource: ds.cloneWithRows(newVariant),
                startData : newVariant
            }
        });
        this.props.navigation.pop();
    }

    prepareForm()
    {
        const formValues = this.formGenerator.getValues();
        let newTestQ =  this.props.navigation.state.params.testQData;
        this.props.navigation.state.params.testQData.forEach(function (question) {
            let currentQuestion = formValues[question.id];

            newTestQ.forEach(function (questionJson) {
                if (questionJson.id == question.id) {
                    if (question.question_type == 'INPUT') {
                        questionJson.text_answer = currentQuestion;
                    } else if (question.question_type == 'SELECT'){
                        if (currentQuestion != null)
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

        return newTestQ;
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
