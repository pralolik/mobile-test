import React, { Component } from 'react';
import {View, StyleSheet, ListView} from 'react-native';
import GenerateForm from 'react-native-form-builder';
import {Button} from "react-native-elements";

export default class EnterInfo extends Component {

    constructor(props){
        super(props);
        this.continue = this.continue.bind(this);
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
                <Button block onPress={() => this.continue()} title='Сохранить' />
            </View>
        );
    };

    getFields()
    {
        let variantsType = ['Один', 'Порядок', 'Случайно'];

        return [
            {
                type: 'text',
                name: 'testName',
                label: 'Название теста'
            },
            {
                type: 'select',
                name: 'lessonName',
                label: 'Предмет',
                options: ['Веб-технологии', 'БД']
            } ,
            {
                type: 'select',
                name: 'type_of_variant',
                label: 'Тип вариантов',
                options: variantsType
            },
            {
                type: 'number',
                name: 'variants_count',
                label: 'Количество вариантов'
            },
            {
                type: 'date',
                mode: 'date',
                minDate: '2018-06-19',
                name: 'dueDate',
                label: 'Дата завершения'
            }

        ]
    }

    continue()
    {
        let resultJson = this.prepareForm();
        var oldTests = this.props.navigation.state.params.parent.state.startData;
        let variants = [];
        for (var i = 0; i < resultJson.variants_count; i++) {
            variants.push({variantName:'Вариант '+(i+1), questions:[]});
        }
        oldTests.push(
            {
                testName: resultJson.testName,
                dueDate: resultJson.dueDate.getFullYear()+'-'+resultJson.dueDate.getMonth()+'-'+resultJson.dueDate.getDate(),
                lessonName: resultJson.lessonName,
                statistic: false,
                release: false,
                variants: variants
            }
        );
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.props.navigation.state.params.parent.setState(
            () => {
                return {
                    dataSource: ds.cloneWithRows(oldTests),
                    startData : oldTests
                }
            }
        );
        this.props.navigation.pop();
    }

    prepareForm()
    {
        const formValues = this.formGenerator.getValues();
        let result =  formValues;

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
