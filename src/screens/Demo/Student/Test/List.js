import React, { Component } from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import TestRow from '../../../../components/common/Demo/TestRow';

export default class List extends Component {

    constructor(props){
        super(props);
        const testData = [
            {
                testName: 'Основы ВТ',
                dueDate: '2018-08-11',
                lessonName: 'Веб-технологии',
                testQData: [
                    {
                        id: '1',
                        question_text: 'Что такое сервер?',
                        question_type: 'INPUT',
                        text_answer:'',
                    },
                    {
                        id: '2',
                        question_text: 'Порт для SSL',
                        question_type: 'SELECT',
                        selected_answer: [],
                        answers: [
                            {
                                id:'1',
                                select_text: '80'
                            },
                            {
                                id:'2',
                                select_text: '443'
                            },
                            {
                                id:'3',
                                select_text: '22'
                            }
                        ]
                    },
                    {
                        id: '3',
                        question_text: 'Протоколами являются',
                        question_type: 'MULTISELECT',
                        text_answer:'',
                        selected_answer: [],
                        answers: [
                            { id:'1',
                                select_text: 'RRs'},
                            { id:'2',
                                select_text: 'TCP'},
                            { id:'3',
                                select_text: 'IoT'},
                            { id:'4',
                                select_text: 'UPD'}
                            ]
                    }
                ]
            },
            // {
            //     testName: 'Контрольная 1',
            //     dueDate: '2018-07-22',
            //     lessonName: 'ТВиМС',
            //     testQData: []
            // },
            // {
            //     testName: 'Контрольная 2',
            //     dueDate: '2018-08-16',
            //     lessonName: 'ТВиМС',
            //     testQData: []
            // }
        ];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testData),
            startData : testData
        };
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <TestRow   {...data} parent={this} navigation={this.props.navigation} />}
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

