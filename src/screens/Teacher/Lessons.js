import React, { Component } from 'react';
import {View, ListView, StyleSheet, ActivityIndicator} from 'react-native';
import LessonTeacherRow from '../../components/common/LessonTeacherRow';
import LessonsService from '../../services/api/Teacher/Lessons';

export default class Lessons extends Component {
    state = {
        isLoaded : false
    };
    constructor(props){
        super(props);
        LessonsService.getLessons(this);
    }

    render() {
        if (!this.state.isLoaded){
            return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
        } else {
            return (
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <LessonTeacherRow {...data} navigation={this.props.navigation}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            );
        }
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
