import React, { Component } from 'react';
import {View, StyleSheet, Picker, ScrollView, ListView} from 'react-native';
import {Button} from "react-native-elements";
import t from 'tcomb-form-native';
const Form = t.form.Form;

const options = {
    fields: {
        Оценка_вопроса: {
            error: 'Введите число',
            autoCorrect: false
        }
    },
};
export default class QuestionCreate extends Component {
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
                    <Picker.Item label="Текст" value="INPUT" />
                    <Picker.Item label="Выбор" value="SELECT" />
                    <Picker.Item label="Множественный выбор" value="MULTISELECT" />
                </Picker>
                <View>
                    <Form
                        ref={c => this._form = c} // assign a ref
                        type={this.getFields()}
                        options={options}
                    />
                    {this.renderButton()}
                </View>
                <Button block onPress={this.save.bind(this)} title='Сохранить  ' />
            </ScrollView>
        );
    };

    getFields()
    {
        let defaultField =  {
            Вопрос: t.String,
            Оценка_вопроса: t.Number,
        };
        if (this.state.questionType == 'INPUT') {
            return t.struct(defaultField);
        } else if (this.state.questionType == 'MULTISELECT' || this.state.questionType == 'SELECT') {
            for (let i =0; i < this.state.select_count; i++){
                defaultField['Текст_ответа_' + i] = t.String;
                defaultField['Верный_' + i] = t.maybe(t.Boolean);
            }
        }

        return t.struct(defaultField);
    }

    renderButton()
    {
        if (this.state.questionType == 'MULTISELECT' || this.state.questionType == 'SELECT') {
            return <Button title='Добавить новый выбор' onPress={ this.updateCount} />
        }
    }

    updateCount()
    {
        this.setState(previous => { return { select_count: ++previous.select_count}})
    }

    save = () =>
    {
        let resultJson = this.prepareForm();
        if (resultJson) {
            const testName = this.props.navigation.state.params.testName;
            const oldTests = this.props.navigation.state.params.parent.state.startData;
            const variantName = this.props.navigation.state.params.variantName;
            const parent = this.props.navigation.state.params.parent;
            const view = this.props.navigation.state.params.view;
            let newTests = [];
            oldTests.forEach(function (test) {
                if(test.testName == testName){
                    test.variants.forEach(function (variant) {
                        if(variant.variantName == variantName){
                            variant.questions.push({question_text: resultJson.question_text, question_type: resultJson.question_type})
                        }
                    })
                }
                newTests.push(test);
            });

            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            parent.setState(
                () => {
                    return {
                        dataSource: ds.cloneWithRows(newTests),
                        startData : newTests
                    }
                }
            );
            view.setState(
                (previous) => {
                    return {
                        updated: !previous.updated
                    }
                }
            );
            this.props.navigation.pop();
        }
    }

    prepareForm()
    {
        const formValues = this._form.getValue();
        if (formValues) {
            let result =  {};
            result.question_type = this.state.questionType;
            result.question_text = formValues.Вопрос;

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
