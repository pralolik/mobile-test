import React, { Component } from 'react';
import {View, ListView, StyleSheet, ActivityIndicator} from 'react-native';
import GroupPeopleRow from '../../components/common/LessonTeacherGroupPeopleRow';
import LessonService from '../../services/api/Teacher/Lessons';

export default class GroupLessonDetails extends Component {
    state = {
        isLoaded : false
    };
    constructor(props){
        super(props);
        LessonService.getGroupPeople(
            this.props.navigation.state.params.lessonId,
            this.props.navigation.state.params.group,
            this
        );
    }

    render() {
        if (!this.state.isLoaded){
            return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
        } else {
            return (
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) =>
                        <GroupPeopleRow
                            {...data} parent={this}
                            lessonId={this.props.navigation.state.params.lessonId}
                            navigation={this.props.navigation}
                        />
                    }
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

