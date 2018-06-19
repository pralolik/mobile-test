import React, { Component } from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import LessonRow from '../../../../components/common/Demo/LessonRow';


export default class List extends Component {
       constructor(props){
        super(props);
        const testData = [
            {
                lessonName: 'Веб-технологии',
                teacherName: 'Деменковец Д.В.',
                type: 'ПЗ'
            },
            {
                lessonName: 'КСиС',
                teacherName: 'Перцев И.Ю.',
                type: 'ЛР'
            },
            {
                lessonName: 'ТВиМС',
                teacherName: 'Лапицкая Н.В.',
                type: 'ЛК'
            }
        ];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(testData)
        };
    }

    render() {

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <LessonRow {...data} navigation={this.props.navigation}/>}
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
