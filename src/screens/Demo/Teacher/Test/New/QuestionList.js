import React, { Component } from 'react';
import {View, ListView, StyleSheet, Button} from 'react-native';
import QuestionRow from "../../../../../components/common/Demo/QuestionRow";

export default class QuestionList extends Component {
    state = {
        updated : false
    };
    constructor(props){
        super(props);
        let testData = this.props.navigation.state.params.testData;
        const testName = this.props.navigation.state.params.testName;
        const variantName = this.props.navigation.state.params.variantName;

        let questions = [];
        testData.forEach(function (test) {
            if(test.testName == testName){
                test.variants.forEach(function (variant) {
                    if (variant.variantName == variantName){
                        variant.questions.forEach(function (question) {
                            questions.push({question_text: question.question_text, question_type: question.question_type});
                        })
                    }
                })
            }
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(questions)
        };
    }

    render() {
        if(this.state.updated) {
            this.updateSource();
        }
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <QuestionRow   {...data} parent={this} navigation={this.props.navigation} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderFooter={this.renderFooter}
            />
        );
    };

    updateSource()
    {
        let testData = this.props.navigation.state.params.testData;
        const testName = this.props.navigation.state.params.testName;
        const variantName = this.props.navigation.state.params.variantName;

        let questions = [];
        testData.forEach(function (test) {
            if(test.testName == testName){
                test.variants.forEach(function (variant) {
                    if (variant.variantName == variantName){
                        variant.questions.forEach(function (question) {
                            questions.push({question_text: question.question_text, question_type: question.question_type});
                        })
                    }
                })
            }
        });
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(questions)
        };
    }

    renderFooter = () => {
        var footer = (
            <Button title='Добавить вопрос' onPress={() => this.props.navigation.navigate('DemoTeacherTestQuestionCreate',
                {
                    testName: this.props.navigation.state.params.testName,
                    variantName: this.props.navigation.state.params.variantName,
                    testData: this.props.navigation.state.params.testData,
                    parent: this.props.navigation.state.params.parent,
                    view: this
                })
            } />
        );
        return footer;
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

