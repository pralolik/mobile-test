import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import GenerateForm from 'react-native-form-builder';
import {Button} from "react-native-elements";
import config from "../../../Config";
import TestService from "../../../services/api/Teacher/Test";

export default class TestDetails extends Component {
    state = {
        isLoaded : false,
        lessons : null
    };
    constructor(props){
        super(props);
        this.continue = this.continue.bind(this);
        this.getLessons();
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
                    <Button block onPress={() => this.continue()} title='Continue' />
                </View>
            );
        }
    };

    getFields()
    {
        let teacherLessons = this.state.lessons;
        let variantsType = ['ONE', 'SORT', 'RANDOM'];

        return [
            {
                type: 'text',
                name: 'test_name',
                label: 'Test name'
            },
            {
                type: 'select',
                name: 'lesson',
                label: 'Lesson',
                objectType: true,
                labelKey: 'label',
                primaryKey: 'id',
                options: teacherLessons
            },
            {
                type: 'select',
                name: 'type_of_variant',
                label: 'Type of variants',
                options: variantsType
            },
            {
                type: 'number',
                name: 'variants_count',
                label: 'Count of variants'
            }
        ]
    }

    async getLessons()
    {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${config.url}:${config.port}/teacher/lessons`, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization' : token.toString()}
         });
        const json = await response.json();
        let result = [];
        if (json.errors) {

        } else {
            if(json.length < 1){
                return '';
            }
            json.forEach(function (lesson) {
                let newLesson = {};
                newLesson.label = lesson.lesson_name + ' '+ lesson.lesson_type;
                newLesson.id = lesson.id;
                result.push(newLesson);
            });
            this.setState(() => {
                return {lessons: result, isLoaded: true};
            });
        }
    }

    continue()
    {
        let resultJson = this.prepareForm();
        TestService.saveTest(resultJson, this);
    }

    prepareForm()
    {
        const formValues = this.formGenerator.getValues();
        let result =  formValues;
        result.lesson_id = result.lesson.id;

        return result;
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
