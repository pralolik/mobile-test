import React, { Component } from 'react';
import {View, ListView, StyleSheet, Button} from 'react-native';
import TestRow from '../../../../components/common/Demo/TeacherTestRow';
import DemoTeacherTestCreate from "./New/EnterInfo";

export default class List extends Component {
    state = {
        isLoaded : false
    };
    constructor(props){
        super(props);
        const testData = [
            {
                testName: 'Основы ВТ',
                dueDate: '2018-08-11',
                lessonName: 'Веб-технологии',
                statistic: true,
                release: true
            }
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
                renderRow={(data) => <TestRow   {...data} testData={this.state.startData} parent={this} navigation={this.props.navigation} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderFooter={this.renderFooter}
            />
        );
    };

    renderFooter = () => {
        const { navigate } = this.props.navigation;
        var footer = (
            <Button title='Создать тест' onPress={() => this.props.navigation.navigate('DemoTeacherTestCreate', {parent: this})} />
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

