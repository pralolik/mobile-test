import React, { Component } from 'react';
import {View, StyleSheet, Picker, ScrollView} from 'react-native';
import {Button} from "react-native-elements";
import TestService from "../../../services/api/Teacher/Test";
import t from 'tcomb-form-native';
const Form = t.form.Form;

export default class TestDetails extends Component {
    state = {
        isLoaded : false,
        questionType : 'INPUT',
        select_count: 1
    };
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.getFields = this.getFields.bind(this);
    }

    render() {
        return (
            <ScrollView>
                <Picker
                    selectedValue={this.state.questionType}
                     style={{ height: 50, width: 100 }}
                     onValueChange={(itemValue, itemIndex) => this.setState({questionType: itemValue, select_count: 1})}>
                    <Picker.Item label="INPUT" value="INPUT" />
                    <Picker.Item label="SELECT" value="SELECT" />
                    <Picker.Item label="MULTISELECT" value="MULTISELECT" />
                </Picker>
                <View>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={this.getFields()}
                    />
                    {this.renderButton()}
                </View>
                <Button block onPress={() => this.save()} title='Save' />
            </ScrollView>
        );
    };

    getFields()
    {
        let defaultField =  {
            question: t.String,
            question_point: t.Number,
        };
        if (this.state.questionType == 'INPUT') {
            return t.struct(defaultField);
        } else if (this.state.questionType == 'MULTISELECT' || this.state.questionType == 'SELECT') {
            for (let i =0; i < this.state.select_count; i++){
                defaultField['question_text_' + i] = t.String;
                defaultField['is_valid_' + i] = t.maybe(t.Boolean);
            }
        }

        return t.struct(defaultField);
    }

    renderButton()
    {
        if (this.state.questionType == 'MULTISELECT' || this.state.questionType == 'SELECT') {
            return <Button title='Add new select' onPress={ this.updateCount} />
        }
    }

    updateCount()
    {
        this.setState(previous => { return { select_count: ++previous.select_count}})
    }

    save()
    {
        let resultJson = this.prepareForm();
        if (resultJson) {
            TestService.saveQuestion(resultJson, this);
        }
    }

    prepareForm()
    {
        const formValues = this._form.getValue();
        if (formValues) {
            let result =  {};
            result.question_type = this.state.questionType;
            result.question_text = formValues.question;
            result.question_point = formValues.question_point;
            result.variant_id = 133;
            if (this.state.questionType != 'INPUT') {
                result.answers = [];
                for (let i =0; i < this.state.select_count; i++){
                    let newAnswer = {};
                    newAnswer.select_text = formValues['question_text_' + i];
                    newAnswer.select_text = formValues['is_valid_' + i];
                    result.answers.push(newAnswer);
                }
            }

            return result;
        }

        return null;
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
